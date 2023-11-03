
import ExportedImage from "next-image-export-optimizer";
import ProfilePic from "public/images/PierreLepagnol.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMail } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

const AboutPage = () => {

    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 flex justify-center p-8">
                <ExportedImage width={500} src={ProfilePic} alt="Pierre LEPAGNOL" />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center p-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">Pierre Lepagnol</h1>
                    <p className="mt-2">PhD Student in CS  @LISN/Paris-Saclay University & Data Scientist Consultant @SCIAM</p>
                </div>
                <p className="mb-4">Ton dernier combat sera le mien</p>
                <div className="flex space-x-4 mb-4">
                    <Link href="https://github.com/PierreLepagnol" className="inline-flex justify-center items-center">
                        <FontAwesomeIcon width={25} icon={faGithub} />
                    </Link>
                    <Link href="https://www.linkedin.com/in/pierre-lepagnol" className="inline-flex justify-center items-center">
                        <FontAwesomeIcon width={25} icon={faLinkedinIn} />
                    </Link>
                    <Link href="https://twitter.com/LepagnolPierre" className="inline-flex justify-center items-center">
                        <FontAwesomeIcon width={25} icon={faXTwitter} />
                    </Link>
                    <Link href="https://twitter.com/LepagnolPierre" className="inline-flex justify-center items-center">
                        <FontAwesomeIcon width={25} icon={faMail} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

