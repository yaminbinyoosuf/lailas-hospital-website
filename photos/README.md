# Original photos

Put full-size original photos here, named by image id, for example `hero-main.jpg`.
The list of ids is in `src/content/images.ts` and `PHOTO_SHOTLIST.md`.

Then run:

    npm run photos

This writes AVIF and WebP sizes plus a blur preview to `src/assets/photos/`.
Originals in this folder are not committed (they are large). Keep a backup.
