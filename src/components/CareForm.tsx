/**
 * Decorative CSS 3D signature for the homepage. It uses layered, softly
 * translucent forms rather than WebGL so the hero stays resilient and light.
 */
export function CareForm() {
  return (
    <div className="care-form" aria-hidden="true">
      <div className="care-form__plane care-form__plane--back" />
      <div className="care-form__ring care-form__ring--outer" />
      <div className="care-form__ring care-form__ring--inner" />
      <div className="care-form__core" />
      <div className="care-form__plane care-form__plane--front" />
    </div>
  );
}
