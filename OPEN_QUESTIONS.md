# Open questions for Lailas Hospital

Things that don't match across the current site, or that need the hospital to confirm before launch.
Each `Q` number matches a `// Qn` comment in `src/content/site.ts`.

## Verification register (updated 16 October 2026)

Nothing on the site has been confirmed by the hospital in writing yet. This register says what
the site does with each unconfirmed item today, so nothing is presented as fact by accident.

### Still shown, awaiting confirmation

These are shown because they come from the previous site or agree across the dataset sources.
They are still unconfirmed.

| Item | Where it appears | Q |
|---|---|---|
| Founded 1994; "over 30 years" | Hero, maternity, footer, meta | Q4 |
| 70,000+ babies born | Hero, maternity, meta | dataset |
| Ultrasound since 1996 (no longer called "the first in our area") | Maternity figures, lab card | Q5 |
| Legal name "Lailas Health Care Limited" | Footer, privacy | Q7 |
| Email `info@lailashospital.com` (now used everywhere, including Privacy) | Footer, contact, privacy, structured data | Q30 |
| Domain `lailashospital.com` | Canonical links, sitemap, share tags, structured data | Q15 |
| Phone numbers and landline labels | Everywhere | Q2, Q3 |
| OPD window Mon to Sat, 9:00 AM to 7:00 PM | Hours, booking days | Q1, Q32 |
| Own OPD hours for Dr. Laila Beegum N, Dr. Geethanjali S, Dr. Amith K, Dr. Jambir (from the previous site) | Doctor cards, booking, structured data | Q11 |
| Doctor names, qualifications and languages, including "Dr. Jambir" and "BCCPM" | Doctor cards, structured data | Q9, Q10, Q31, Q33 |
| Doctor roles. Dr. Laila Beegum N is now shown as "Consultant Obstetrician and Gynaecologist" (from her MBBS, DGO), not "Chief Consultant and Founder" | Doctor cards | Q6, Q8 |
| Services named in copy: IUI, labour room with baby heart monitoring, PCOS care, vaccinations, high-risk pregnancy care | Service cards, IVF page, pregnancy guide | Q13 |
| Dr. Jitha Vineeth's bio (IUI and IVF focus) and Dr. V. J. Sonia's bio (gynaecological surgery) | Doctor cards | Q36 |
| Parking and wheelchair access, ground-floor casualty, lab and pharmacy | Visit section, FAQ | none yet |
| 24-hour casualty, labour room, laboratory and pharmacy | Throughout | dataset |

### Removed or hidden in Phase 1 (restore only after written confirmation)

| Item | What the site does now | Q |
|---|---|---|
| "Chief Consultant and Founder" and the "Founder & Chief Consultant" label | Removed | Q6 |
| "IVF and ICSI" as a listed offering | Shown as "Advice on IVF and ICSI" | Q13 |
| Keyhole (laparoscopic) surgery, menopause care (as offerings) | Removed from the women's health card and from Dr. V. J. Sonia's bio | Q13 |
| Palliative care | Removed from family medicine and Dr. Jambir's bio | Q13 |
| "The first ultrasound in our area" | Removed; the year 1996 stays | Q5 |
| 3D and 4D ultrasound, Doppler studies | Removed from Dr. Sumiya's bio | Q13 |
| "Over 15 years of experience" (Dr. Jitha Vineeth) | Removed (no source found) | Q36 |
| Ultrasound scans "day and night" | Now only the lab and pharmacy are described as 24 hours | Q13 |
| OPD hours for Dr. V. J. Sonia, Dr. Jitha Vineeth, Dr. Sumiya (they were only the hospital window) | Cards show "Please call to confirm OPD timings"; left out of structured data | Q34 |
| Plus Code and map coordinates (the two sources disagree, see Q16) | Hidden on the page and left out of structured data (`flags.showMapPin`) | Q16 |
| Image alt text naming equipment and services ("state of the art", "fully automated", "embryology") | Rewritten to describe the photo brief plainly | Q20 |

### Still to decide

- Q35: which group each consultant sits in on the doctors page.
- Q37: whether fetal medicine and cosmetic gynaecology become services of their own.
- Q27: whether bookings go to a form endpoint (`VITE_BOOKING_ENDPOINT`) as well as WhatsApp.
- Q29: hosting. `public/_redirects` only works on Netlify and Cloudflare Pages.

Sources checked: `src/data/hospitalData.ts`, every page in `src/pages`, `CONTENT.md`, `README.md`, `index.html`, and the newer compiled build `lailas_hospital_2026.html`.

## Contact and hours

**Q1. OPD closing time.** The home page, header and data file say **Mon to Sat, 9 AM to 7 PM**. The Contact page says **Mon to Sat, 9 AM to 5 PM** (`ContactPage.tsx:247`). Which is right? The new site uses 7 PM until confirmed.

**Q2. Landline labels.** The three landlines are labelled differently in different places:
- data file: 2463377 = Reception, 2464193 = OPD and appointments, 2953377 = Alternate helpdesk
- CONTENT.md: "Landline 1: 2463377" and "Landline 2: 2464193 / 2953377"
- the FAQ lists only 2463377 and 2464193

What is each number for, and should 2953377 be published?

**Q3. One number for everything.** +91 8606 800 999 is the emergency line, the booking line and the WhatsApp line. Is WhatsApp on this number answered 24/7? If booking messages and emergency calls arrive on the same phone, could an emergency call be missed?

**Q15. Domain and email.** Does the hospital own `lailashospital.com`, and is `care@lailashospital.com` checked daily?

**Q16. Map pin.** The sources disagree. An earlier note here gave latitude 11.0421, longitude 75.9221 and Plus Code 2WV6+7JH. `site.ts` now holds Plus Code 7J3Q2WV6+9G at latitude 11.0434, longitude 75.91134. Neither is shown on the site or sent to search engines until the hospital confirms the real entrance (`flags.showMapPin`). The embedded map searches by name and address, not by coordinates.

**Q17. Travel times** (hidden on the site until confirmed, see `flags.showTravelTimes`). The 2026 build lists the airport as about 22 km and a 35 minute drive. Please check the distance and times for all four starting points (Tirurangadi 2 km, NH 66 Thalappara 4 km, Parappanangadi station 8 km, Calicut airport 22 km).

**Q18. Road name.** The road appears as "Kozhikode Road (Thalappara Road)", "Chemmad-Thalappara Road", "Kozhikode-Thalappara Road" and "Chemmad-Tirurangadi Road". Which name should patients use?

## History and identity

**Q4. Founding year.** 1994 appears everywhere, but the code says "Confirm the reported 1994 founding milestone", and the IVF page shows "Serving Chemmad since (reported milestone)". Is 1994 confirmed?

**Q5. First ultrasound, 1996.** The wording varies: "1st Ultrasound in Chemmad", "the locality's first", and "first in the Tirurangadi region". Which exact claim can we publish?

**Q6. Founder.** Is Dr. Laila Beegum N the founder? Is "Chief Consultant and Founder" her correct title?

**Q7. Legal name.** Is the legal entity "Lailas Health Care Limited"? It is used for the footer and privacy page.

## Doctors

**Q8. Dr. Laila Beegum N, IVF.** CONTENT.md calls her an "IVF Specialist", but her listed qualifications are MBBS, DGO. Who leads the IVF centre, and what title can we use?

**Q9. Dr. Jambir.** Is this the full name? The avatar used "DJ" in one build and "J" in another. Is "BCCPM" correct?

**Q10. Languages.** Only Dr. Laila Beegum N lists Tamil. Please confirm each doctor's languages, and whether anyone speaks Arabic or Hindi.

**Q11. Consulting days.** Every doctor is listed Mon to Sat, but the old triage text says "paediatric consultation days vary". Please confirm days for each doctor, plus any half days or leave days.

**Q12. Doctor photos and registration numbers.** We need real portraits (see PHOTO_SHOTLIST.md). Do you want Kerala medical council registration numbers shown?

## Clinical claims that need confirming

**Q13. Services named on the old site.** These were listed but never confirmed. Please tick what the hospital really offers today:
- Painless labour (epidural)
- Antenatal classes
- NICU / "newborn and neonatal intensive care" and phototherapy (CONTENT.md said "NICU support")
- IVF and ICSI done on site, blastocyst culture, embryo freezing, an on-site embryology lab
- 3D follicular ultrasound (old IVF text)
- Doppler scans and CTG monitoring
- Laparoscopic (keyhole) surgery: fibroids, ovarian cysts
- Cervical screening and a menopause clinic
- Casualty observation beds
- "Automated" pathology, ECG
- Allergy and asthma care for children, geriatric care

The old IVF page also said procedures are "discussed based on up-to-date hospital capabilities". That suggests some may not be offered on site.

**Q14. Video consultations.** One FAQ says video consultations can be requested. Is this offered? The answer is hidden until confirmed.

**Q25. Newborn care 24/7.** Paediatrics says "newborn care 24/7", but Dr. Amith K's OPD is 9:30 AM to 6 PM. Is a paediatrician on call for deliveries at night?

**Removed claims (we will not publish without data):**
- "Low C-Section" as a headline stat
- "among the lowest caesarean and neonatal mortality rates in the region" (CONTENT.md)

If you have audited figures for C-section or outcome rates, send them and we can discuss.

## Content we are hiding

- **Testimonials:** all three were sample quotes ("Sample patient story"). They stay hidden until real, consented feedback is provided (`flags.showTestimonials`).
- **Accreditations:** all four were "Documentation in progress": Kerala Clinical Establishments registration, biomedical waste, IVF lab protocols, fire safety. They stay hidden until you send proof (`flags.showAccreditations`).
- **Patient portal:** the lab reports and prescriptions were sample data, and there is no records system. Hidden (`flags.showPatientPortal`).
- **Health articles:** these have no author or medical reviewer. Hidden until a doctor reviews and signs them (`flags.showArticles`).
- **Symptom wayfinder / search:** removed to simplify the top of the page. Tell us if you want it back.

## Photos and brand

**Q20. No real photos exist.** All four images in `src/assets/images` are stock or AI renders. The hero image shows **"AMRITA HEALTHCARE"** on the building and in the lobby, which is another hospital's name. All four will be removed. The site will use warm fallback tiles until real photos arrive (see PHOTO_SHOTLIST.md).

**Q21. Logo.** The only logo file is `brand/lailas-logo-source.jpg` (1080px JPG, white background). Can you send the original vector file (AI, SVG, EPS or PDF)? Also please confirm the brand colours. The logo uses slate grey, teal, and pink for the tagline.

## Language

**Q19. Malayalam. Resolved.** The site is English only by decision. The Malayalam source build referenced here is no longer used and `src/content/copy/ml.ts` has been removed.

**Q24. Malayalam review. Resolved.** Not required, since the site is English only.

## Booking

**Q27. Where bookings go.** Today every booking opens WhatsApp with a pre-filled message. Do you also want a form that sends to an email or a system? If so, we need the endpoint (set as `VITE_BOOKING_ENDPOINT`). Who replies, and how fast?

## Website

**Q28. Old URLs.** The current sitemap lists `/about`, `/obstetrics-gynaecology`, `/departments` and `/privacy`. The new site has fewer pages. Should these old URLs redirect, and is the current site live and indexed by Google?

**Q29. Hosting.** Where is lailashospital.com hosted today, and who can deploy? The new site is a static `dist/` folder.

## Added after the Chemmad dataset review (October 2026)

A master dataset for the hospital was supplied, drawn from Instagram, Facebook, Justdial,
Quickerala, Mapcarta and two news articles. It agreed with the site on the name, motto, founding
year, 70,000+ births, website, all four phone numbers, the address and 24 hour services. Those
were applied. The items below still need the hospital's own confirmation.

**Q30. Email address. Needs confirmation.** The site now shows `info@lailashospital.com`, taken
from the Quickerala directory. It previously showed `care@lailashospital.com`. Only one can be
right, and a wrong address on a hospital site loses enquiries. Which one is monitored?
This is also the address used in the `mailto:` link in the footer and on the contact page.

**Q31. Dr. Jambir or Dr. Jabir? Needs confirmation.** The dataset spells this consultant both
ways in the same document. The site currently reads "Dr. Jambir". A misspelled consultant name
is not acceptable to publish.

**Q32. OPD window. Not resolved.** The dataset says 10:00 AM to 7:00 PM. The site uses
9:00 AM to 7:00 PM (`hours.opd` in `site.ts`), and the old Contact page said 5:00 PM (Q1). The closing time
agrees, but the opening time does not. Please confirm the opening time.

**Q33. Dr. Geethanjali S: is she currently practising?** The dataset lists only "MBBS, OBG",
which is not a qualification format used for any other consultant here. Either the credential
is incomplete or she is no longer with the hospital.

**Q34. Consultation hours for the three newly added consultants.** The dataset does not give
per-doctor OP times for Dr. V. J. Sonia, Dr. Jitha Vineeth or Dr. Sumiya. The site currently
shows them on the hospital's general OPD window, 9:00 AM to 7:00 PM, marked in `site.ts` as
"not confirmed per doctor". Please supply their actual hours.

**Q35. Which group should each consultant sit in on the doctors page?** The page groups
consultants by service. Dr. Sumiya is a radiologist and fetal medicine specialist and is
currently listed under "Pregnancy and women's health", which is not a precise fit. Dr. Jitha
Vineeth is also a fertility specialist and should probably appear on the IVF page.

**Q36. Clinical and reputational claims withheld.** These appeared in the dataset and were not
published, because they are third party or promotional and your own content rules require
verification:
- "Gynaec of the poor" and low caesarean rates, attributed to news coverage
- 452 twin births and 4 triplets in the Kodinhi region
- "recognized for low neonatal mortality rates"
- Justdial ratings of 4.0/5 (92 reviews) and 4.4/5 for Dr. Laila
- The nine procedures listed for Dr. Jitha Vineeth, including CO2 laser vaginal rejuvenation,
  HIFEM pelvic floor therapy, Botox and PRP regenerative therapy
- The late Dr. Abdurahiman Ambadi tribute, and the names of Dr. Laila's family members

If the hospital wants any of these on the site, please confirm in writing which are accurate and
current. Ratings in particular are a poor fit for a hospital's own website: they change, and they
belong to the directory rather than the hospital.

**Q37. Departments not yet on the site.** The dataset describes cosmetic gynaecology and
intimate wellness, and fetal medicine and diagnostic radiology, as distinct departments. The
service list currently has no entry for either, so consultants in those areas sit under existing
services. Should these become services of their own?
