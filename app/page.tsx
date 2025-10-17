import ExportedImage from "next-image-export-optimizer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Home = () => {
  const network_links = [
    {
      url: "https://github.com/PierreLepagnol",
      icon: faGithub,
      label: "GitHub",
    },
    {
      url: "https://www.linkedin.com/in/pierre-lepagnol",
      icon: faLinkedinIn,
      label: "LinkedIn",
    },
    {
      url: "https://twitter.com/LepagnolPierre",
      icon: faXTwitter,
      label: "Twitter",
    },
  ];
  const mail_links = [
    {
      adress: "pierre.lepagnol[at]lisn.upsaclay.fr",
      image: "logoLISN.svg",
      style: "mr-2",
      width: 60,
      height: 60,
      alt: "LISN Logo",
    },
    {
      adress: "pierre.lepagnol[at]sciam.fr",
      image: "logoSciam.png",
      style: "mr-2 invert",
      width: 45,
      height: 45,
      alt: "SCIAM Logo",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 max-w-6xl mx-auto">
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl">
          <ExportedImage
            width={500}
            height={500}
            src="PierreLepagnol.jpg"
            alt="Pierre LEPAGNOL"
            className="object-cover"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center lg:text-left">
            Pierre Lepagnol
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 text-center lg:text-left leading-relaxed">
            PhD Student in Computer Science at LISN/Paris-Saclay University &
            Data Scientist Consultant at SCIAM
          </p>
        </div>

        <blockquote className="text-center lg:text-left italic text-gray-600 dark:text-gray-400 border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2">
          Ton dernier combat sera le mien
        </blockquote>

        <div className="space-y-6">
          <div className="flex justify-center lg:justify-start gap-6">
            {network_links.map(({ url, icon, label }) => (
              <Link
                key={url}
                href={url}
                className="group"
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all transform group-hover:scale-110">
                  <FontAwesomeIcon
                    className="text-gray-700 dark:text-gray-300"
                    width={20}
                    icon={icon}
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {mail_links.map(({ adress, image, style, width, height, alt }) => (
              <div
                key={adress}
                className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ExportedImage
                  className={style}
                  width={width}
                  height={height}
                  src={image}
                  alt={alt}
                  unoptimized
                />
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    className="text-gray-600 dark:text-gray-400"
                    width={16}
                    icon={faEnvelope}
                  />
                  <span className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
                    {adress}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
