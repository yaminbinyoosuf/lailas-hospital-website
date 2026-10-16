# Photo shot list for Lailas Hospital

The website is designed around real photography. Until a photo exists, that position shows a
tonal placeholder panel that carries the brand motif, so the layout stays intact and nothing
pretends to be a finished photograph.

## Current status

**All 26 positions are unfilled** (`src/assets/photos/manifest.json` is empty).
Every one renders as a deliberate tonal placeholder, or initials for doctors,
which is why the site currently shows no photographs at all.

23 of the 26 positions appear on the site today. Three (`hero-secondary`,
`staff-team`, `visit-entrance`) are registered in `src/content/images.ts` but
**not used on any page yet**; only shoot them if those sections are planned.

This is intentional, not an oversight. Seven of these positions carry the names of
real consultants (`doctor-laila-beegum`, `doctor-geethanjali-s`, `doctor-amith-k`,
`doctor-jambir`, `doctor-v-j-sonia`, `doctor-jitha-vineeth`, `doctor-sumiya`) and
several represent this hospital's own rooms. Those cannot be
filled with borrowed imagery without misrepresenting a person or a place, and the
project carries no licence to use third party stock photography.

The earlier build of this site did substitute curated stock photographs, including
portraits for the named consultants. That has been removed.

To fill a position, drop the original at `photos/<id>.jpg` and run `npm run photos`.
The placeholder is replaced for that id only, so the site can go live with some
photographs present and the rest still waiting.

### Priority order

If photography has to be staged in batches, this order gives the most improvement
per frame:

1. `hero-main` and the seven `doctor-*` portraits. The hero and the consultant
   portraits carry the most credibility.
2. The three service images in the default Women tab (`service-maternity`,
   `service-ivf`, `service-gynaecology`), then `service-paediatrics`.
3. `maternity-story`, `page-maternity`, `page-ivf`, `ivf-consultation`.
4. The remainder.


**Rules for every photo**
- Real Lailas Hospital places and people only. No stock photos, no AI images.
- No other brand names, logos or signs in the frame (except Lailas).
- Written consent from every patient and staff member who can be recognised. For newborns, consent from a parent.
- Natural daylight where possible. Warm, calm and uncluttered. Avoid showing medical equipment up close.
- Shoot at least 2400 px on the long side, as JPG or HEIC.
- Save each photo as `photos/<id>.jpg` and run `npm run photos`.
- After adding a photo, check its alt text in `src/content/images.ts` against what the
  photo actually shows. The current alt text describes the brief below, not a real photo.

| id | What to shoot | Shape on site | Orientation |
|---|---|---|---|
| `hero-main` | A mother holding her newborn in a recovery room. Soft window light, faces relaxed. The most important photo. | Tall arch | Portrait 4:5 |
| `hero-secondary` | *Not used on any page yet.* The front entrance or building exterior at golden hour (late afternoon), Lailas sign visible | Circle | Square |
| `visit-entrance` | *Not used on any page yet.* Entrance plus parking area, with the wheelchair ramp visible | Rounded | Landscape 4:3 |
| `staff-team` | *Not used on any page yet.* Whole team (doctors, nurses, lab, pharmacy, reception) together outside or in the lobby | Wide | 16:9 (shoot wider) |
| `maternity-story` | Newborn resting in the nursery, a nurse's hands nearby | Tall arch | Portrait 4:5 |
| `maternity-checkup` | An antenatal check-up: doctor talking with a pregnant woman | Rounded | Landscape 4:3 |
| `maternity-labour` | A clean, empty labour room, softly lit | Leaf | Landscape 4:3 |
| `maternity-newborn` | Paediatrician gently checking a newborn | Rounded | Landscape 4:3 |
| `page-maternity` | Mother and newborn, different moment from `hero-main` | Tall arch | Portrait 4:5 |
| `ivf-consultation` | The private fertility consultation room. A couple seen from behind or out of focus (privacy matters) | Cradle | Portrait 4:5 |
| `page-ivf` | Fertility consultation room, empty and calm | Tall arch | Portrait 4:5 |
| `service-maternity` | Nurse with a mother after birth | Card | Landscape 3:2 |
| `service-ivf` | Fertility consultation room detail | Card | Landscape 3:2 |
| `service-gynaecology` | Gynaecologist in a consultation | Card | Landscape 3:2 |
| `service-paediatrics` | Paediatrician with a young child | Card | Landscape 3:2 |
| `service-general` | Family doctor with an older patient | Card | Landscape 3:2 |
| `service-emergency` | Emergency entrance at dusk, lights on | Wide card | Landscape 4:3 |
| `service-laboratory` | Laboratory with a technician at work | Card | Landscape 3:2 |
| `service-pharmacy` | Pharmacy counter with the pharmacist | Card | Landscape 3:2 |
| `doctor-laila-beegum` | Portrait of Dr. Laila Beegum N | Tall arch | Portrait 4:5 |
| `doctor-geethanjali-s` | Portrait of Dr. Geethanjali S | Tall arch | Portrait 4:5 |
| `doctor-amith-k` | Portrait of Dr. Amith K | Tall arch | Portrait 4:5 |
| `doctor-jambir` | Portrait of Dr. Jambir (spelling to be confirmed, Q31) | Tall arch | Portrait 4:5 |
| `doctor-v-j-sonia` | Portrait of Dr. V. J. Sonia | Tall arch | Portrait 4:5 |
| `doctor-jitha-vineeth` | Portrait of Dr. Jitha Vineeth | Tall arch | Portrait 4:5 |
| `doctor-sumiya` | Portrait of Dr. Sumiya | Tall arch | Portrait 4:5 |

**Doctor portraits:** same background and the same light for all seven (a plain warm wall works well). Chest-up, looking at the camera, relaxed smile, usual work clothes. Leave space above the head, because the arch crops the top.
