#!/usr/bin/env python3
"""
Image Optimization Script
Compresses and optimizes large image files to reduce bundle size.
Addresses issue #2121.
"""

from PIL import Image
import os


# CHANGED: List of images to optimize as mentioned in issue #2121
IMAGES_TO_OPTIMIZE = [
    ("gssoc-26.png", 0.85),  # Target quality: 85%
    ("gssoc-algo-banner.png", 0.85),
    ("project_admin.png", 0.85),
]

def optimize_image(image_path, quality=85):
    """
    Optimize an image by compressing it and converting to more efficient format.
    
    Args:
        image_path: Path to the image file
        quality: JPEG quality (1-100), higher = better quality but larger file
    
    Returns:
        Tuple of (original_size_mb, optimized_size_mb, format)
    """
    if not os.path.exists(image_path):
        print(f"❌ File not found: {image_path}")
        return None
    
    # Get original file size
    original_size = os.path.getsize(image_path)
    original_size_mb = original_size / (1024 * 1024)
    
    try:
        # CHANGED: Open image and optimize
        img = Image.open(image_path)
        
        
         # CHANGED: Optimize and save as both PNG (optimized) and WebP (modern format)
        base_name = os.path.splitext(image_path)[0]
        # Save optimized PNG (lossless, transparency preserved)
        img.save(image_path, "PNG", optimize=True)
        # Save WebP version (supports transparency and lossy compression)
        webp_path = f"{base_name}.webp"
        img.save(webp_path, "WebP", quality=quality)
        
        # Get new file sizes
        png_size = os.path.getsize(png_path)
        webp_size = os.path.getsize(webp_path)
        png_size_mb = png_size / (1024 * 1024)
        webp_size_mb = webp_size / (1024 * 1024)
        
        # Determine which format is smaller
        best_format = "PNG" if png_size < webp_size else "WebP"
        best_size_mb = min(png_size_mb, webp_size_mb)
        
        return (original_size_mb, best_size_mb, best_format, png_size_mb, webp_size_mb)
    
    except Exception as e:
        print(f"❌ Error processing {image_path}: {str(e)}")
        return None


def main():
    print("\n" + "="*60)
    print("📊 Image Optimization Report - Issue #2121")
    print("="*60 + "\n")
    
    total_original = 0
    total_optimized = 0
    
    for image_name, quality in IMAGES_TO_OPTIMIZE:
        image_path = os.path.join(os.getcwd(), image_name)
        print(f"\n🔄 Processing: {image_name}")
        print(f"   Target Quality: {int(quality*100)}%")
        
        result = optimize_image(image_path, int(quality*100))
        
        if result:
            original_mb, best_size_mb, best_format, png_mb, webp_mb = result
            reduction = ((original_mb - best_size_mb) / original_mb) * 100
            
            print(f"   ✅ Original Size: {original_mb:.2f} MB")
            print(f"   ✅ PNG (optimized): {png_mb:.2f} MB")
            print(f"   ✅ WebP: {webp_mb:.2f} MB")
            print(f"   ✅ Best Format: {best_format} ({best_size_mb:.2f} MB)")
            print(f"   ✅ Reduction: {reduction:.1f}%")
            
            total_original += original_mb
            total_optimized += best_size_mb
    
    print("\n" + "="*60)
    print("📈 Summary")
    print("="*60)
    print(f"Total Original Size: {total_original:.2f} MB")
    print(f"Total Optimized Size: {total_optimized:.2f} MB")
    total_reduction = ((total_original - total_optimized) / total_original) * 100
    print(f"Total Reduction: {total_reduction:.1f}%")
    print(f"Space Saved: {(total_original - total_optimized):.2f} MB")
    print("="*60 + "\n")
    
    print("✨ Image optimization complete!")
    print("📝 Note: .webp versions have been created for modern browsers")
    print("🎯 Next steps: Update image references in documentation to use webp where appropriate")
    print()


if __name__ == "__main__":
    main()
