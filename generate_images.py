"""
Gemini Image Generator - WITH LENS HACK
Uses gemini-3-pro-image-preview with camera specs in prompt to improve realism
Based on Reddit community fixes from Dec 2025
"""

import os
from google import genai
from PIL import Image
import io

# Directories
PREVIEW_DIR = "preview"
OUTPUT_DIR_EN = "public/images/en"
OUTPUT_DIR_FR = "public/images/fr"

# SEO-OPTIMAL IMAGE DIMENSIONS
# Google recommends 1200px+ wide for Discover/Images
# Gemini generates ~1024px, so we upscale after generation
TARGET_WIDTH = 1600
TARGET_HEIGHT = 900  # 16:9 aspect ratio

# THE LENS HACK - Camera specs that force realistic skin rendering
# Plus aspect ratio guidance for consistent 16:9 output
LENS_HACK = """
CAMERA SETTINGS: Shot on 85mm telephoto lens, f/1.8 aperture, sharp focus.
SKIN QUALITY: Visible skin texture with natural pores and fine details.
LIGHTING: Soft diffused studio lighting with gentle shadows.
ASPECT RATIO: Wide format, 16:9 horizontal composition.
"""

# Image prompts WITH lens hack appended
PROMPTS = [
    {
        "name": "Post 10 - Add Referral Code After Signup",
        "filename_en": "add-referral-code-after-signup-9c6dmq.png",
        "filename_fr": "ajouter-code-apres-inscription-9c6dmq.png",
        "prompt_en": """A high-end, photorealistic commercial studio photograph. The background is a clean, premium white surface with subtle, fine elegant gold geometric patterns.

CENTRAL FOCUS: A pair of highly detailed, realistic human hands are holding a modern smartphone. The index finger gently touches the screen. The screen displays a clean white interface with the black 'Wealthsimple' serif logo at the top. Below it, the code '9C6DMQ' is clearly typed in an input field.

HEADLINE TEXT: At the very top center, there is a bold, authoritative black text headline: 'Wealthsimple Add Referral Code After Signup 2026'.

FLOATING ELEMENTS: To the left of the phone is a highly polished, glossy green 3D checkmark icon casting a soft shadow. To the right is a minimalist gold and black circular clock icon with the text '7 DAYS' beneath it. In the top right corner is a small, textured fabric Canadian flag icon.

""" + LENS_HACK,
        "prompt_fr": """A high-end, photorealistic commercial studio photograph. The background is a clean, premium white surface with subtle, fine elegant gold geometric patterns.

CENTRAL FOCUS: A pair of highly detailed, realistic human hands are holding a modern smartphone. The index finger gently touches the screen. The screen displays a clean white interface with the black 'Wealthsimple' serif logo at the top. Below it, the code '9C6DMQ' is clearly typed in an input field.

HEADLINE TEXT: At the very top center, there is a bold, authoritative black text headline: 'Wealthsimple : Ajouter le code de parrainage apres inscription 2026'.

FLOATING ELEMENTS: To the left of the phone is a highly polished, glossy green 3D checkmark icon casting a soft shadow. To the right is a minimalist gold and black circular clock icon with the text '7 JOURS' beneath it. In the top right corner is a small, textured fabric Canadian flag icon.

""" + LENS_HACK,
    },
]


def upscale_image(image, target_width=TARGET_WIDTH, target_height=TARGET_HEIGHT):
    """Upscale image to SEO-optimal dimensions (1600x900) using high-quality Lanczos resampling"""
    original_width, original_height = image.size
    print(f"    Original size: {original_width}x{original_height}")
    
    # Resize to target dimensions (maintains 16:9 if source is 16:9)
    upscaled = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    print(f"    Upscaled to: {target_width}x{target_height}")
    return upscaled


def generate_previews():
    """Generate images with LENS HACK for better realism"""
    
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: Set GEMINI_API_KEY environment variable")
        return
    
    print("="*60)
    print("NANO BANANA PRO + LENS HACK")
    print("="*60)
    print("Model: gemini-3-pro-image-preview")
    print("Fix: Added 85mm lens camera specs to prompt")
    print("="*60)
    
    client = genai.Client(api_key=api_key)
    os.makedirs(PREVIEW_DIR, exist_ok=True)
    
    NUM_CANDIDATES = 4
    
    for prompt_set in PROMPTS:
        print(f"\n[*] Generating {NUM_CANDIDATES} candidates WITH LENS HACK: {prompt_set['name']} (English)")
        for attempt in range(1, NUM_CANDIDATES + 1):
            try:
                response = client.models.generate_content(
                    model="gemini-3-pro-image-preview",
                    contents=prompt_set["prompt_en"],
                )
                
                if response.candidates and response.candidates[0].content.parts:
                    for part in response.candidates[0].content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data:
                            image_data = part.inline_data.data
                            image = Image.open(io.BytesIO(image_data))
                            image = upscale_image(image)  # Upscale to 1600x900 for SEO
                            filename = f"preview_lens_en_{attempt}_{prompt_set['filename_en']}"
                            filepath = os.path.join(PREVIEW_DIR, filename)
                            image.save(filepath)
                            print(f"  [OK] Candidate {attempt} saved: {filename}")
                            break
            except Exception as e:
                print(f"  [X] Candidate {attempt} error: {e}")
        
        print(f"[*] Generating {NUM_CANDIDATES} candidates WITH LENS HACK: {prompt_set['name']} (French)")
        for attempt in range(1, NUM_CANDIDATES + 1):
            try:
                response = client.models.generate_content(
                    model="gemini-3-pro-image-preview",
                    contents=prompt_set["prompt_fr"],
                )
                
                if response.candidates and response.candidates[0].content.parts:
                    for part in response.candidates[0].content.parts:
                        if hasattr(part, 'inline_data') and part.inline_data:
                            image_data = part.inline_data.data
                            image = Image.open(io.BytesIO(image_data))
                            image = upscale_image(image)  # Upscale to 1600x900 for SEO
                            filename = f"preview_lens_fr_{attempt}_{prompt_set['filename_fr']}"
                            filepath = os.path.join(PREVIEW_DIR, filename)
                            image.save(filepath)
                            print(f"  [OK] Candidate {attempt} saved: {filename}")
                            break
            except Exception as e:
                print(f"  [X] Candidate {attempt} error: {e}")
    
    print("\n" + "="*60)
    print("[OK] LENS HACK generation complete!")
    print("="*60)
    print("Check preview/ folder for 'preview_lens_*' files")
    print("Compare to 'preview_pro_*' - lens hack should have better skin texture!")


def approve_images():
    """Move approved previews to final locations"""
    os.makedirs(OUTPUT_DIR_EN, exist_ok=True)
    os.makedirs(OUTPUT_DIR_FR, exist_ok=True)
    
    import shutil
    
    for prompt_set in PROMPTS:
        preview_en = os.path.join(PREVIEW_DIR, f"preview_en_{prompt_set['filename_en']}")
        final_en = os.path.join(OUTPUT_DIR_EN, prompt_set['filename_en'])
        if os.path.exists(preview_en):
            shutil.copy(preview_en, final_en)
            print(f"[OK] Approved: {final_en}")
        else:
            print(f"[!] Skipped: {preview_en} not found")
        
        preview_fr = os.path.join(PREVIEW_DIR, f"preview_fr_{prompt_set['filename_fr']}")
        final_fr = os.path.join(OUTPUT_DIR_FR, prompt_set['filename_fr'])
        if os.path.exists(preview_fr):
            shutil.copy(preview_fr, final_fr)
            print(f"[OK] Approved: {final_fr}")
        else:
            print(f"[!] Skipped: {preview_fr} not found")
    
    print("\n[OK] All approved images moved to public/images/")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "approve":
        approve_images()
    else:
        generate_previews()
