"""
Image Editor - Using Gemini API for image editing
Tests watermark removal and other image edits
"""

import os
from google import genai
from PIL import Image
import io
import sys

# Your Gemini API key
API_KEY = os.environ.get("GEMINI_API_KEY")

def edit_image(image_path, instruction, output_path=None):
    """
    Edit an image using Gemini's image understanding + generation
    
    Args:
        image_path: Path to the image to edit
        instruction: What to do (e.g., "Remove the watermark")
        output_path: Where to save the result (optional)
    """
    if not API_KEY:
        print("Error: Set GEMINI_API_KEY environment variable")
        print("  PowerShell: $env:GEMINI_API_KEY='your-key-here'")
        return None
    
    print(f"\n{'='*60}")
    print(f"IMAGE EDITOR")
    print(f"{'='*60}")
    print(f"Input: {image_path}")
    print(f"Instruction: {instruction}")
    print(f"{'='*60}\n")
    
    # Load the image
    image = Image.open(image_path)
    print(f"Loaded image: {image.size[0]}x{image.size[1]}")
    
    # Initialize client
    client = genai.Client(api_key=API_KEY)
    
    # Try different models for image editing (newest first)
    models_to_try = [
        "gemini-3-pro-image-preview",   # Newest - same as generation script
        "gemini-2.5-pro",               # Latest if available
        "gemini-2.0-flash-exp",         # Known to work for editing
        "imagen-3.0-capability-preview", # Dedicated image model
    ]
    
    for model_name in models_to_try:
        print(f"\n[*] Trying model: {model_name}")
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=[
                    image,  # Pass the PIL image directly
                    instruction
                ],
                config={
                    "response_modalities": ["IMAGE", "TEXT"],
                }
            )
            
            # Check for image in response
            if response.candidates and response.candidates[0].content.parts:
                for part in response.candidates[0].content.parts:
                    if hasattr(part, 'inline_data') and part.inline_data:
                        # Got an image back!
                        print(f"✅ SUCCESS! Got image from {model_name}")
                        
                        # Save the result
                        image_data = part.inline_data.data
                        result_image = Image.open(io.BytesIO(image_data))
                        
                        if output_path:
                            result_image.save(output_path)
                            print(f"Saved to: {output_path}")
                        else:
                            # Auto-generate output path
                            base, ext = os.path.splitext(image_path)
                            auto_output = f"{base}_edited{ext}"
                            result_image.save(auto_output)
                            print(f"Saved to: {auto_output}")
                        
                        return result_image
                    
                    elif hasattr(part, 'text') and part.text:
                        print(f"Text response: {part.text[:200]}...")
            
            print(f"No image in response from {model_name}")
            
        except Exception as e:
            print(f"❌ Error with {model_name}: {str(e)[:100]}")
            continue
    
    print("\n❌ All models failed to return an edited image")
    return None


def remove_watermark(image_path, output_path=None):
    """Convenience function specifically for watermark removal"""
    instruction = """
    Edit this image to remove any visible watermarks, logos, or text overlays 
    that appear to be added on top of the original content. 
    Keep everything else exactly the same - same composition, colors, and content.
    Only remove the watermark/overlay elements.
    """
    return edit_image(image_path, instruction, output_path)


def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  py edit_image.py <image_path>                    - Remove watermark")
        print("  py edit_image.py <image_path> '<instruction>'    - Custom edit")
        print("")
        print("Examples:")
        print("  py edit_image.py watermarked.png")
        print("  py edit_image.py photo.jpg 'Make the background blue'")
        return
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(f"Error: File not found: {image_path}")
        return
    
    if len(sys.argv) >= 3:
        # Custom instruction
        instruction = sys.argv[2]
        edit_image(image_path, instruction)
    else:
        # Default: remove watermark
        remove_watermark(image_path)


if __name__ == "__main__":
    main()
