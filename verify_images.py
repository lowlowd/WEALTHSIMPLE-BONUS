"""
Image Text Verification Script
Uses Google Cloud Vision API to extract text from images and verify correctness.

Setup:
1. Install: pip install google-cloud-vision
2. Set environment variable: GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account-key.json
   OR set GOOGLE_CLOUD_API_KEY for API key auth
"""

import os
import sys

# Set credentials path directly
CREDENTIALS_PATH = r"C:\Users\Fhstl\vision-key.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = CREDENTIALS_PATH

from google.cloud import vision
from google.oauth2 import service_account

# Expected text for each image (add more as needed)
EXPECTED_TEXT = {
    "wealthsimple-referral-code": {
        "required": ["Wealthsimple", "9C6DMQ", "$25", "2026"],
        "language": "en"
    },
    "code-parrainage-wealthsimple": {
        "required": ["Wealthsimple", "9C6DMQ", "25 $", "2026"],
        "language": "fr"
    },
    "add-referral-code-after-signup": {
        "required": ["Wealthsimple", "9C6DMQ", "Referrals", "7 DAYS", "$25"],
        "language": "en"
    },
    "ajouter-code-apres-inscription": {
        "required": ["Wealthsimple", "9C6DMQ", "Parrainages", "7 JOURS", "25 $"],
        "language": "fr"
    },
    "promo-code-vs-referral-code": {
        "required": ["Promo", "Referral", "9C6DMQ", "VS"],
        "language": "en"
    },
    "code-promo-vs-code-parrainage": {
        "required": ["Promo", "Parrainage", "9C6DMQ", "VS"],
        "language": "fr"
    },
}


def get_vision_client():
    """Initialize Vision API client"""
    # Try service account credentials first
    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if creds_path and os.path.exists(creds_path):
        credentials = service_account.Credentials.from_service_account_file(creds_path)
        return vision.ImageAnnotatorClient(credentials=credentials)
    
    # Fall back to default credentials
    return vision.ImageAnnotatorClient()


def extract_text_from_image(image_path):
    """Extract all text from an image using Cloud Vision API"""
    client = get_vision_client()
    
    with open(image_path, "rb") as image_file:
        content = image_file.read()
    
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    
    if response.error.message:
        raise Exception(f"Vision API Error: {response.error.message}")
    
    texts = response.text_annotations
    
    if not texts:
        return {"full_text": "", "words": []}
    
    # First annotation contains full text, rest are individual words
    full_text = texts[0].description if texts else ""
    words = [text.description for text in texts[1:]] if len(texts) > 1 else []
    
    return {
        "full_text": full_text,
        "words": words
    }


def verify_image(image_path, expected_key=None):
    """Verify image text against expected content"""
    print(f"\n{'='*60}")
    print(f"ANALYZING: {os.path.basename(image_path)}")
    print(f"{'='*60}")
    
    # Extract text
    result = extract_text_from_image(image_path)
    
    print(f"\n📝 DETECTED TEXT:")
    print("-" * 40)
    print(result["full_text"])
    print("-" * 40)
    
    print(f"\n📋 INDIVIDUAL WORDS DETECTED ({len(result['words'])}):")
    print(result["words"])
    
    # If we have expected text to check against
    if expected_key and expected_key in EXPECTED_TEXT:
        expected = EXPECTED_TEXT[expected_key]
        print(f"\n✅ VERIFICATION CHECK (expected for '{expected_key}'):")
        
        full_text_lower = result["full_text"].lower()
        missing = []
        found = []
        
        for required in expected["required"]:
            if required.lower() in full_text_lower:
                found.append(required)
                print(f"   ✓ Found: '{required}'")
            else:
                missing.append(required)
                print(f"   ✗ MISSING: '{required}'")
        
        if missing:
            print(f"\n⚠️  WARNING: Missing {len(missing)} required text(s): {missing}")
        else:
            print(f"\n🎉 SUCCESS: All required text found!")
        
        return {
            "image": image_path,
            "detected": result,
            "expected": expected["required"],
            "found": found,
            "missing": missing,
            "passed": len(missing) == 0
        }
    
    return {
        "image": image_path,
        "detected": result,
        "expected": None,
        "passed": None
    }


def scan_directory(directory):
    """Scan all images in a directory"""
    supported_extensions = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp')
    
    results = []
    for filename in os.listdir(directory):
        if filename.lower().endswith(supported_extensions):
            filepath = os.path.join(directory, filename)
            
            # Try to match to expected text key
            expected_key = None
            for key in EXPECTED_TEXT.keys():
                if key in filename.lower():
                    expected_key = key
                    break
            
            result = verify_image(filepath, expected_key)
            results.append(result)
    
    return results


def main():
    """Main entry point"""
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python verify_images.py <image_path>       - Verify single image")
        print("  python verify_images.py <directory>        - Scan all images in directory")
        print("  python verify_images.py --all              - Scan public/images/en and fr")
        return
    
    arg = sys.argv[1]
    
    if arg == "--all":
        # Scan both EN and FR directories
        print("\n🔍 Scanning English images...")
        en_results = scan_directory("public/images/en")
        
        print("\n🔍 Scanning French images...")
        fr_results = scan_directory("public/images/fr")
        
        all_results = en_results + fr_results
        
        # Summary
        print("\n" + "="*60)
        print("📊 SUMMARY")
        print("="*60)
        passed = sum(1 for r in all_results if r.get("passed") == True)
        failed = sum(1 for r in all_results if r.get("passed") == False)
        unchecked = sum(1 for r in all_results if r.get("passed") is None)
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"⚪ Unchecked: {unchecked}")
        
    elif os.path.isdir(arg):
        scan_directory(arg)
    elif os.path.isfile(arg):
        verify_image(arg)
    else:
        print(f"Error: '{arg}' is not a valid file or directory")


if __name__ == "__main__":
    main()
