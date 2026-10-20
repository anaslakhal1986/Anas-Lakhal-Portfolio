export default function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-[#070805]">
      <div
        className="absolute inset-0 bg-cover bg-[center_top] bg-no-repeat lg:bg-center"
        style={{ backgroundImage: "url('/images/backgroundImage.png')" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,3,0.80)_0%,rgba(4,6,3,0.57)_30%,rgba(4,6,3,0.08)_62%,rgba(3,4,2,0.30)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-[#050504]/90 via-[#050504]/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay [background-image:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(226,193,88,0.12)_4px)]" />
      <div className="absolute left-[5%] top-0 h-full w-px bg-dirty-yellow/15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_43%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  )
}
