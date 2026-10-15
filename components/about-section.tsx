export function AboutSection() {
  return (
    <section
      id="about"
      className="py-[120px] px-[60px] max-md:py-[80px] max-md:px-6"
    >
      <div className="section-heading relative">
        <p className="section-backdrop">About me</p>
        <h2 className="reveal relative z-10 font-bold tracking-[-0.03em] leading-[1.1] text-oatmeal">
          <span className="section-heading-line">Obsessed with the</span><span className="section-heading-line"><em className="not-italic text-apex">craft</em> of building.</span>
        </h2>

        <p className="reveal reveal-delay-1 relative z-10 mt-6 max-w-[520px] text-[17px] leading-[1.75] text-muted tracking-[-0.01em]">
          I&apos;m an <em>Application Software Developer</em> with 3+ years of professional experience building React-based dashboards and data visualisation applications.
          I have always loved digging deep into the details because I am a strong believer that <span className="text-apex">details matter</span>.
        </p>
        <p className="reveal reveal-delay-2 relative z-10 mt-6 max-w-[520px] text-[17px] leading-[1.75] text-muted tracking-[-0.01em]">
          Currently at SOCAutomation, where I work on the frontend of their SaaS product — data visualisations, day-to-day interaction animations, and making sure our customers are always front and centre.
        <br/>
        <span className="text-apex underline"><a href="https://socautomation.com/" target="_blank">Learn more</a></span>
        </p>
      </div>
    </section>
  );
}
