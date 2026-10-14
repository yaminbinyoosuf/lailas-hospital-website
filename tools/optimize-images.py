"""Optimise the site photography for fast first paint.

Outputs per source image, into src/assets/images/:
  <slug>-<width>.webp   modern format, stripped metadata
  <slug>-<width>.jpg    broadly-compatible fallback (hero only)

The Vite build hashes whatever is actually imported, so images that are never
imported simply are not shipped.
"""

import os

from PIL import Image

SRC_DIR = "src/assets/images"
WEBP_QUALITY = 80
JPEG_QUALITY = 82

# (source file, output slug, target widths, also emit jpg fallbacks?)
PLAN = [
    ("hero_lailas_hospital_1791662162412.jpg", "hero-lobby", [960, 1376], True),
    ("fertility_consultation_1791662174156.jpg", "consultation", [600, 1200], False),
    ("maternity_newborn_care_1791662185628.jpg", "maternity", [600, 1200], False),
    ("hospital_facilities_lab_1791662196230.jpg", "laboratory", [600, 1200], False),
]


def resize_to_width(im: Image.Image, width: int) -> Image.Image:
    """Never upscale — clamp to the source width."""
    target = min(width, im.width)
    if target == im.width:
        return im
    height = round(im.height * target / im.width)
    return im.resize((target, height), Image.LANCZOS)


def main() -> None:
    total_before = 0
    total_after = 0

    for src_name, slug, widths, jpg_fallback in PLAN:
        src_path = os.path.join(SRC_DIR, src_name)
        before = os.path.getsize(src_path)
        total_before += before

        with Image.open(src_path) as raw:
            im = raw.convert("RGB")
            emitted = 0
            for w in widths:
                out = resize_to_width(im, w)
                base = os.path.join(SRC_DIR, f"{slug}-{min(w, im.width)}")

                webp_path = f"{base}.webp"
                out.save(webp_path, "webp", quality=WEBP_QUALITY, method=6)
                emitted += os.path.getsize(webp_path)

                if jpg_fallback:
                    jpg_path = f"{base}.jpg"
                    out.save(jpg_path, "jpeg", quality=JPEG_QUALITY, optimize=True, progressive=True)
                    emitted += os.path.getsize(jpg_path)

            # Report the saving against the single largest derivative.
            largest = os.path.join(
                SRC_DIR, f"{slug}-{min(widths[-1], im.width)}.webp"
            )
            after = os.path.getsize(largest)
            total_after += after
            print(
                f"{src_name[:40]:42} {before/1024:7.0f} KB -> "
                f"{after/1024:6.0f} KB webp  ({100 - after/before*100:4.0f}% smaller)"
            )

    print(
        f"\nprimary payload: {total_before/1024:.0f} KB -> {total_after/1024:.0f} KB "
        f"({100 - total_after/total_before*100:.0f}% smaller)"
    )


if __name__ == "__main__":
    main()
