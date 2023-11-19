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
    { url: "https://github.com/PierreLepagnol", icon: faGithub },
    { url: "https://www.linkedin.com/in/pierre-lepagnol", icon: faLinkedinIn },
    { url: "https://twitter.com/LepagnolPierre", icon: faXTwitter },
  ];
  const mail_links = [
    {
      adress: "pierre.lepagnol[at]lisn.upsaclay.fr",
      image: "logoLISN.svg",
      style: "mr-2",
      width: 60,
      height: 60,
    },
    {
      adress: "pierre.lepagnol[at]sciam.fr",
      image: "logoSciam.png",
      style: "mr-2 invert",
      width: 45,
      height: 45,
    },
  ];
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 flex justify-center p-8">
        <ExportedImage
          width={500}
          height={500}
          src="PierreLepagnol.jpg"
          alt="Pierre LEPAGNOL"
        />
      </div>
      <div className="md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Pierre Lepagnol</h1>
          <p className="mt-2">
            PhD Student in CS @LISN/Paris-Saclay University & Data Scientist
            Consultant @SCIAM
          </p>
        </div>
        <p className="mb-4">Ton dernier combat sera le mien</p>
        <div className="flex flex-col mb-4 gap-5 ">
          {network_links.map(({ url, icon }) => (
            <Link key={url} href={url} className="inline-flex justify-center">
              <FontAwesomeIcon width={25} icon={icon} />
            </Link>
          ))}
          {mail_links.map(({ adress, image, style, width, height }) => (
            <Link
              href="#"
              key={adress}
              className="inline-flex flex-col gap-2 justify-center items-center"
            >
              <ExportedImage
                className={style}
                width={width}
                height={height}
                src={image}
                alt="Pierre LEPAGNOL"
                unoptimized
              />
              <span className="font-bold">{adress}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
