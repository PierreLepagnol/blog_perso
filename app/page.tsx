import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      {/* Portrait */}
      <div className="lg:col-span-5">
        <div className="border border-ink overflow-hidden">
          <ExportedImage
            width={600}
            height={750}
            src="PierreLepagnol.jpg"
            alt="Pierre Lepagnol"
            className="grayscale hover:grayscale-0 transition-all duration-500 object-cover w-full"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="lg:col-span-7 flex flex-col justify-center">
        <h2 className="font-serif text-3xl lg:text-4xl font-black tracking-tight leading-[0.95] mb-6">
          PhD Student in Computer Science &amp; Data Scientist
        </h2>

        <p className="font-body text-neutral-700 leading-relaxed mb-6">
          Currently pursuing a PhD at LISN/Paris-Saclay University while consulting as a Data Scientist at SCIAM. My research sits at the intersection of machine learning and natural language processing.
        </p>

        <blockquote className="border-l-4 border-ink pl-4 mb-8">
          <p className="font-serif italic text-lg mb-0">
            &ldquo;Ton dernier combat sera le mien&rdquo;
          </p>
        </blockquote>

        {/* Affiliations & Socials — masthead style */}
        <div className="border-t-2 border-b border-ink pt-4 pb-4 mt-2">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Affiliations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-ink">
            {[
              { name: "LISN / Paris-Saclay", role: "PhD Student", email: "pierre.lepagnol[at]lisn.upsaclay.fr", logo: "logoLISN.svg", w: 28, h: 28 },
              { name: "SCIAM", role: "Data Scientist", email: "pierre.lepagnol[at]sciam.fr", logo: "logoSciam.png", w: 24, h: 24, cls: "invert" },
            ].map(({ name, role, email, logo, w, h, cls }, i) => (
              <div key={name} className={`flex items-start gap-3 py-2 sm:py-0 ${i > 0 ? "sm:pl-5" : ""}`}>
                <ExportedImage
                  className={`mt-0.5 shrink-0 ${cls || ""}`}
                  width={w}
                  height={h}
                  src={logo}
                  alt={name}
                  unoptimized
                />
                <div className="min-w-0">
                  <p className="font-serif font-bold text-sm leading-tight mb-0">{role}</p>
                  <p className="font-sans text-xs text-neutral-600 mb-0">{name}</p>
                  <p className="font-mono text-[11px] text-neutral-500 mb-0 truncate">{email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social links — inline editorial */}
        <div className="flex items-center gap-1 mt-4 font-sans text-xs text-neutral-500">
          <span className="uppercase tracking-[0.15em] mr-2">Find me on</span>
          {[
            { url: "https://github.com/PierreLepagnol", label: "GitHub" },
            { url: "https://www.linkedin.com/in/pierre-lepagnol", label: "LinkedIn" },
            { url: "https://twitter.com/LepagnolPierre", label: "Twitter" },
          ].map(({ url, label }, i, arr) => (
            <span key={url}>
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink font-medium underline decoration-1 underline-offset-3 hover:decoration-editorial-red transition-colors"
              >
                {label}
              </Link>
              {i < arr.length - 1 && <span className="mx-1.5 text-neutral-400">/</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
