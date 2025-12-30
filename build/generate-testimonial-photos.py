#!/usr/bin/env python3
"""
Generate placeholder profile photos for testimonials with initials.
These are temporary until you manually download real photos from LinkedIn.
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory
os.makedirs('../assets/testimonials', exist_ok=True)

# Testimonial data: (filename, initials, name)
testimonials = [
    ('jeffrey-lai.jpg', 'JL', 'Jeffrey Lai'),
    ('abdelrahman-karrar.jpg', 'AK', 'Abdelrahman Karrar'),
    ('jonathan-zhang.jpg', 'JZ', 'Jonathan Zhang'),
    ('robert-citorik.jpg', 'RC', 'Robert Citorik'),
    ('shuang-tu.jpg', 'ST', 'Shuang Z. Tu'),
]

# Color palette (professional, muted tones matching the website's amber theme)
colors = [
    ('#d4a853', '#0d0b09'),  # Amber background, dark text
    ('#b8965a', '#0d0b09'),  # Amber-muted background, dark text
    ('#8b7355', '#f5f2ed'),  # Brown background, cream text
    ('#c9a961', '#0d0b09'),  # Gold background, dark text
    ('#a68a5e', '#f5f2ed'),  # Tan background, cream text
]

def create_placeholder(filename, initials, name, color_bg, color_text):
    """Create a circular placeholder image with initials"""
    size = 400  # High resolution for quality

    # Create square image
    img = Image.new('RGB', (size, size), color_bg)
    draw = ImageDraw.Draw(img)

    # Try to use a nice font, fallback to default
    try:
        # Try different font paths (works on macOS, Linux, Windows)
        font_paths = [
            '/System/Library/Fonts/Helvetica.ttc',  # macOS
            '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',  # Linux
            'C:\\Windows\\Fonts\\arial.ttf',  # Windows
        ]
        font = None
        for font_path in font_paths:
            if os.path.exists(font_path):
                font = ImageFont.truetype(font_path, 160)
                break
        if font is None:
            font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    # Get text bounding box for centering
    bbox = draw.textbbox((0, 0), initials, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Calculate position to center text
    x = (size - text_width) / 2
    y = (size - text_height) / 2 - 20  # Slight upward adjustment

    # Draw initials
    draw.text((x, y), initials, fill=color_text, font=font)

    # Save
    output_path = f'../assets/testimonials/{filename}'
    img.save(output_path, 'JPEG', quality=95)
    print(f"✓ Created {filename} for {name}")

# Generate all placeholders
print("Generating testimonial placeholder photos...\n")
for i, (filename, initials, name) in enumerate(testimonials):
    color_bg, color_text = colors[i % len(colors)]
    create_placeholder(filename, initials, name, color_bg, color_text)

print(f"\n✅ Generated {len(testimonials)} placeholder photos in assets/testimonials/")
print("\n📝 Next steps:")
print("1. These are professional placeholders with initials")
print("2. To add real photos:")
print("   - Go to each person's LinkedIn profile")
print("   - Right-click their profile photo → 'Save image as...'")
print("   - Save to assets/testimonials/ with the same filename")
print("   - Or keep the placeholders - they look clean and professional!")
print("\nLinkedIn profiles verified:")
print("- Jeffrey Lai: https://www.linkedin.com/in/jeffreylai1/")
print("- Abdelrahman Karrar: UTC faculty page (photo available)")
print("- Jonathan Zhang: https://www.linkedin.com/in/zhangj150/")
print("- Robert Citorik: https://www.linkedin.com/in/rcitorik/")
print("- Shuang Z. Tu: https://www.linkedin.com/in/rightcfd/")
