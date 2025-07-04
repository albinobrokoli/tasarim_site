# Video Assets Guide

This directory contains the cinematic video assets for the Sinir Bilim Portalı hero section. These files are essential for the immersive visual experience.

## 📁 Asset Structure

```
video/
├── README.md                    # This guide
├── xG03FvN-G9Ozde86.mp4        # Primary 1080p hero video
├── hero-720p.mp4               # Mobile optimized version
├── poster.jpg                  # Fallback poster image
├── boomerang-clip.mp4          # Footer animation loop
└── compression-guide.md        # Detailed compression instructions
```

## 🎥 Primary Video (xG03FvN-G9Ozde86.mp4)

### Specifications
- **Resolution**: 1920 × 1080 (16:9)
- **Frame Rate**: 24 fps
- **Duration**: 15-30 seconds (loop optimized)
- **Codec**: H.265 (HEVC) for optimal compression
- **Bitrate**: Variable (CRF 23-28)
- **File Size**: ≤60 MB maximum
- **Audio**: None (muted video)

### Visual Requirements
- **Style**: Abstract macro photography, slow-motion effects
- **Color Grading**: High contrast with neon edges
- **Elements**: Floating dust particles, luminous contours
- **Color Space**: Deep black-to-indigo gradient background
- **Motion**: Smooth, organic movement patterns

### Content Guidelines
```
Ideal content includes:
✓ Abstract liquid/smoke formations
✓ Macro lens bokeh effects  
✓ Particle/dust interactions
✓ Neon lighting accents
✓ Slow-motion capture (120-240fps source)
✓ High dynamic range
✓ Smooth loop transitions

Avoid:
✗ Recognizable objects/faces
✗ Text overlays
✗ Rapid motion/cuts
✗ Bright/saturated colors
✗ Noise or compression artifacts
```

## 📱 Mobile Version (hero-720p.mp4)

### Specifications
- **Resolution**: 1280 × 720 (16:9)
- **Frame Rate**: 24 fps
- **Codec**: H.264 for broader compatibility
- **Bitrate**: Optimized for cellular networks
- **File Size**: ≤20 MB maximum
- **Quality**: CRF 30-33

### Optimization Commands
```bash
# Generate mobile version from source
ffmpeg -i source-video.mp4 \
  -vf scale=1280:720 \
  -c:v libx264 \
  -crf 30 \
  -preset medium \
  -movflags +faststart \
  -an \
  hero-720p.mp4

# Verify mobile compatibility
ffprobe -v quiet -show_format -show_streams hero-720p.mp4
```

## 🖼️ Poster Image (poster.jpg)

### Specifications
- **Resolution**: 1920 × 1080 (matches video)
- **Format**: JPEG
- **Quality**: 85-90%
- **File Size**: ≤10 KB
- **Frame Source**: Most visually striking frame from video

### Generation Commands
```bash
# Extract poster from video at 2-second mark
ffmpeg -i xG03FvN-G9Ozde86.mp4 \
  -ss 00:00:02 \
  -vframes 1 \
  -q:v 2 \
  -vf scale=1920:1080 \
  poster.jpg

# Optimize poster file size
jpegoptim --size=10k poster.jpg
```

### Poster Requirements
- High contrast for readability
- Central focus area clear of text overlay
- Represents video aesthetic
- Quick loading on slow connections

## 🔄 Boomerang Clip (boomerang-clip.mp4)

### Specifications
- **Duration**: 3 seconds exactly
- **Resolution**: 1920 × 1080
- **Loop**: Seamless forward/reverse
- **Opacity**: Used at 5% in footer
- **Content**: Final swirl/motion from main video

### Creation Process
```bash
# Extract 3-second segment from main video
ffmpeg -i xG03FvN-G9Ozde86.mp4 \
  -ss 00:00:12 \
  -t 00:00:03 \
  -c:v libx264 \
  -crf 28 \
  segment.mp4

# Create boomerang effect (forward + reverse)
ffmpeg -i segment.mp4 \
  -filter_complex "[0:v]reverse,fifo[r];[0:v][r]concat=n=2:v=1:a=0" \
  -c:v libx264 \
  -crf 30 \
  boomerang-clip.mp4
```

## 🛠️ Compression Guidelines

### Primary Video Compression
```bash
# High-quality H.265 compression
ffmpeg -i source-video.mov \
  -c:v libx265 \
  -crf 23 \
  -preset medium \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  -t 20 \
  xG03FvN-G9Ozde86.mp4

# Verify file size and quality
ls -lh xG03FvN-G9Ozde86.mp4
ffprobe -show_format xG03FvN-G9Ozde86.mp4
```

### Quality Control Checklist
- [ ] File size under specified limits
- [ ] No visible compression artifacts
- [ ] Smooth playback at 24fps
- [ ] Proper aspect ratio (16:9)
- [ ] No audio track present
- [ ] Fast start enabled for web streaming
- [ ] Compatible with major browsers

### Testing Commands
```bash
# Test playback compatibility
ffplay -loop 0 xG03FvN-G9Ozde86.mp4

# Analyze video properties
ffprobe -v quiet -print_format json -show_streams xG03FvN-G9Ozde86.mp4

# Check for issues
ffmpeg -v error -i xG03FvN-G9Ozde86.mp4 -f null - 2>error.log
```

## 🎨 Color Grading

The video should maintain consistency with the website's color palette:

### Color Specifications
```css
Primary Colors:
- Electric Purple: #8000FF
- Neon Magenta: #FF006C  
- Digital Blue: #006CFF
- Soft Glow: #F6F6F6

Background:
- Void Dark: #050509
- Indigo Deep: #1a0f3a
```

### Grading Process
1. **Exposure**: Slightly underexposed for mood
2. **Contrast**: High contrast for definition
3. **Highlights**: Controlled, not blown out
4. **Shadows**: Deep blacks, maintaining detail
5. **Saturation**: Selective color enhancement
6. **Color Grade**: Cool temperature with purple/blue bias

## 📊 Performance Optimization

### Loading Strategy
```html
<!-- Preload for instant playback -->
<link rel="preload" 
      href="xG03FvN-G9Ozde86.mp4" 
      as="video" 
      type="video/mp4"
      media="(min-width: 769px)">

<link rel="preload" 
      href="hero-720p.mp4" 
      as="video" 
      type="video/mp4"
      media="(max-width: 768px)">
```

### Responsive Delivery
```html
<video autoplay muted loop playsinline poster="poster.jpg">
  <source src="xG03FvN-G9Ozde86.mp4" 
          type="video/mp4" 
          media="(min-width: 769px)">
  <source src="hero-720p.mp4" 
          type="video/mp4" 
          media="(max-width: 768px)">
</video>
```

## 🔒 License & Rights

### Usage Rights
- ✅ Commercial use permitted
- ✅ Modification allowed
- ✅ Distribution permitted
- ✅ Private use

### Attribution
```
Video assets created for Sinir Bilim Portalı
License: [Specify your license]
Source: [If applicable]
Created: [Date]
```

### Rights Verification
Ensure all video content is:
- [ ] Original creation or properly licensed
- [ ] Free of copyrighted material
- [ ] Clear of model/property releases if needed
- [ ] Compliant with intended usage rights

## 🚨 Troubleshooting

### Common Issues

**Video won't load**
```bash
# Check browser compatibility
# Verify MIME types in server config
# Test with different codecs
```

**Poor performance**
```bash
# Reduce file size
ffmpeg -i input.mp4 -crf 30 output.mp4

# Lower resolution
ffmpeg -i input.mp4 -vf scale=960:540 output.mp4
```

**Audio present (should be muted)**
```bash
# Remove audio track
ffmpeg -i input.mp4 -an output.mp4
```

### Fallback Strategy
If video fails to load:
1. Poster image displays automatically
2. CSS fallback gradients activate
3. Particle system continues (if supported)
4. Layout remains functional

## 📞 Support

For video-related issues:
1. Check browser developer console
2. Verify network connectivity
3. Test on multiple devices
4. Contact development team with:
   - Browser version
   - Device specifications
   - Network conditions
   - Error messages

---

**Note**: Always test video assets across multiple browsers and devices before deployment. Mobile data usage should be considered when serving high-quality video content. 