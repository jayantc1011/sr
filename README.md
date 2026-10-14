# Shalini Rathod — website and Speakathon course

Open `index.html` for the website.

The About page has a photo-led redesign with three portraits from the user-provided Shalini website, a fuller coaching profile, and responsive layouts.

- Course catalog: `lms.html`
- Course overview: `lms-course.html?course=speakathon`
- Learning studio: `lms-learn.html?course=speakathon&lesson=1`

The learning studio includes all 21 challenge videos and worksheets, Day 2 and Day 3 example recordings, plus welcome and closing videos. The welcome and closing links are listed separately in the lesson outline. Day 12 uses the downloaded `Challenge 12.mp4` recording at `assets/lms/videos/day-12.mp4`.

The learning studio has responsive tablet and phone layouts, native video controls, and Space-bar play/pause when the video player is focused. A TEST ONLY skip control can advance to the next lesson without marking skipped videos watched or completed. Saved v3 progress is cleared once because that version could mark a lesson complete without watching it. New progress is stored locally in this browser under v4; this package does not sync progress between devices.

`MEDIA_STATUS.json` records the media included and identifies the additional course-resource files still absent from the package.
