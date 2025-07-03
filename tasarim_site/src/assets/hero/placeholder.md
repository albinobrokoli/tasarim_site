# Video Assets Directory

Place your video files here:

## Required Files:

1. **xG03FvN-G9Ozde86.mp4** (Primary hero video)
   - 1920×1080, H.265, 24fps, ≤60MB
   
2. **hero-720p.mp4** (Mobile optimized)
   - 1280×720, H.264, ≤20MB
   
3. **poster.jpg** (Fallback poster)
   - 1920×1080 JPEG, ≤10KB
   
4. **boomerang-clip.mp4** (Footer loop)
   - 3-second seamless loop

## Video Processing Commands:

```bash
# Generate mobile version
ffmpeg -i your-source-video.mp4 -vf scale=1280:720 -crf 30 hero-720p.mp4

# Extract poster frame
ffmpeg -i your-source-video.mp4 -ss 00:00:02 -vframes 1 -q:v 2 poster.jpg

# Create boomerang clip
ffmpeg -i your-source-video.mp4 -ss 00:00:12 -t 00:00:03 boomerang-clip.mp4
```

See `/video/README.md` for detailed specifications and compression guidelines. 