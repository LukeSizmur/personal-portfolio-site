import Image from "next/image";
import PhotographyFan from "@/components/ui/photography-fan";

const FILMS = [
  "BlackBerry 2023",
  "Interstellar",
  "Project Hail Mary",
  "Spider-Man: Across The Spider-Verse",
  "Spider-Man: Into The Spider-Verse",
  "Star Wars: Episode III - Revenge of the Sith",
];

const HOBBIES = ["Football", "Gaming", "Movies", "Substack Newsletter"];

const BOOKS = ["Project Hail Mary", "Ultra 85", "Steve Jobs", "The Oddysey"];

export function PersonalSection() {
  return (
    <section id="personal" className="bg-oatmeal py-[120px] px-[60px] max-md:py-[80px] max-md:px-6">
      <div className="relative mb-0">
        <div className="pointer-events-none absolute top-[-20px] left-[-10px] z-0 select-none text-[140px] leading-none font-bold tracking-[-0.05em] text-smoke">
          04
        </div>
        <p className="relative z-10 mb-6 text-[10px] font-semibold tracking-[0.18em] uppercase text-muted">
          Beyond the code
        </p>
        <h2 className="reveal relative z-10 text-[clamp(36px,4vw,56px)] font-bold tracking-[-0.03em] leading-[1.1] text-black">
          Get To<br />Know Me
        </h2>
        <p className="reveal reveal-delay-1 relative z-10 mt-6 max-w-[520px] text-[17px] leading-[1.75] tracking-[-0.01em] text-[#5a5650]">
          A little more about me! I spend my spare time engaging in various things from films, gaming to my newsletter!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-16 max-md:grid-cols-1">
        {/* Film — wide */}
        <div className="reveal col-span-2 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light max-md:col-span-1">
          <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full">
            <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
              Film
            </div>
            <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">A proper cinephile.</div>
            <div className="text-[14px] leading-[1.7] text-muted">
              I love watching movies and tv shows, to the point that I track all the movies and shows via some awesome apps called{" "}
              <a className="text-blue-600 underline" href="https://apps.apple.com/app/id1630746993">Sequel</a>{" "}
              and{" "}
              <a className="text-blue-600 underline" href="https://apps.apple.com/app/id6504503117">Flix</a>.
              {" "}My favourite film within the last few years has to be <span className="text-apex">BlackBerry 2023</span>, it just embodies all of what I love about the tech industry.
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {FILMS.map((film) => (
                <span
                  key={film}
                  className="inline-flex items-center text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[rgba(43,43,43,0.06)] border border-[rgba(43,43,43,0.08)] text-[#5a5650] transition-all duration-[400ms] hover:bg-[rgba(232,62,11,0.08)] hover:border-[rgba(232,62,11,0.15)] hover:text-apex cursor-default"
                >
                  {film}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="reveal reveal-delay-1 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light">
          <div className="relative rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 pb-[130px] xl:pb-9 h-full">
            <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
              Interests
            </div>
            <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">In my spare time</div>
            <div className="text-[14px] leading-[1.7] text-muted">Outside of my day to day work, I&apos;m usually keeping up with the latest tech trends, deep in a game, or running a small newsletter curating interesting corners of the internet.</div>
            <ul className="personal-list list-none mt-5 flex flex-col gap-2.5">
              {HOBBIES.map((hobby) => (
                <li key={hobby} className="flex items-center gap-3 text-[14px] text-[#5a5650] font-medium">
                  {hobby}
                </li>
              ))}
            </ul>
            {/* Curved dashed guide arrow */}
            <svg
              width="140"
              height="80"
              viewBox="0 0 130 80"
              fill="none"
              className="annotation-appear absolute bottom-[8px] right-[96px] pointer-events-none select-none hidden xl:block"
            >
              <defs>
                <marker id="qr-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                  <path d="M 1 1 L 6 4 L 1 7" stroke="#8a8580" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </marker>
              </defs>
              <text x="4" y="62" fontSize="10.5" fontStyle="italic" fontWeight="500" fill="#8a8580" transform="rotate(10, 4, 22)">
                Click Me!
              </text>
              <path
                d="M 22 54 C 45 5, 85 -8, 122 12"
                stroke="#8a8580"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="4.5 3.5"
                markerEnd="url(#qr-arrow)"
              />
            </svg>

            <div className="group absolute bottom-2 right-2 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105">
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-muted lg:hidden">Click Me!</span>
              <div className="p-1.5 rounded-2xl bg-black/5 ring-1 ring-black/[0.06]">
                <div className="relative p-2 rounded-[calc(1rem-0.375rem)] bg-white overflow-hidden">
                  <a href="https://lukesizmur.substack.com/">
                    <Image
                      src="/substack-qr-code.svg"
                      alt="Substack newsletter QR code"
                      className="w-14 h-14 block"
                      width={14}
                      height={14}
                    />
                  </a>
                  <div className="qr-shimmer pointer-events-none absolute inset-0 rounded-[calc(1rem-0.375rem)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reading */}
        <div className="reveal reveal-delay-1 rounded-[20px] bg-smoke border border-smoke p-0.5 card-hover-light">
          <div className="rounded-[18px] bg-cream shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] p-9 h-full">
            <div className="personal-eyebrow flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-apex mb-5">
              Reading
            </div>
            <div className="text-[26px] font-bold tracking-[-0.03em] text-black mb-3 leading-[1.15]">My current library</div>
            <div className="text-[14px] leading-[1.7] text-muted">I gravitate towards fiction as a way to explore new worlds and ideas. I particularly enjoy sci-fi.</div>
            <ul className="personal-list list-none mt-5 flex flex-col gap-2.5">
              {BOOKS.map((book) => (
                <li key={book} className="flex items-center gap-3 text-[14px] text-[#5a5650] font-medium">
                  {book}
                  {book === "Project Hail Mary" && <span className="text-[10px] font-semibold tracking-[0.08em] uppercase text-apex bg-[rgba(232,62,11,0.08)] border border-[rgba(232,62,11,0.2)] px-2 py-0.5 rounded-full">read</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Photography — wide, with fan animation */}
        <PhotographyFan />
      </div>
    </section>
  );
}
