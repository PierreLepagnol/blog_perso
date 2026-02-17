import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, allProjects } from "content-collections";
import { IoAtOutline } from "react-icons/io5";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import type { ComponentType, ReactNode } from "react";

const cx = (...classes: Array<string | undefined>) =>
  classes.filter(Boolean).join(" ");

type CardProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const Card = ({ children, className, id }: CardProps) => (
  <article
    id={id}
    className={cx("border border-neutral-200 bg-white", className)}
  >
    {children}
  </article>
);

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

const Eyebrow = ({ children, className }: EyebrowProps) => (
  <p
    className={cx(
      "font-sans text-[11px] uppercase tracking-[0.18em] text-neutral-500",
      className,
    )}
  >
    {children}
  </p>
);

type ProfileLinkProps = {
  url: string;
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

const ProfileLink = ({ url, label, Icon }: ProfileLinkProps) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-700 hover:text-editorial-red hover:border-editorial-red transition-colors"
  >
    <Icon className="text-base" />
  </a>
);

const Home = () => {
  const posts = [...allPosts].sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const profiles = [
    {
      url: "https://github.com/PierreLepagnol",
      label: "GitHub",
      Icon: FaGithub,
    },
    {
      url: "https://twitter.com/LepagnolPierre",
      label: "X",
      Icon: FaXTwitter,
    },
    {
      url: "https://www.linkedin.com/in/pierre-lepagnol",
      label: "LinkedIn",
      Icon: FaLinkedinIn,
    },
  ];

  const projects = allProjects[0]?.projects ?? [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-start">
      <div className="space-y-10">
        <section id="bio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <Card
              id="profile-photo"
              className="md:row-span-3 bg-neutral-50/50 overflow-hidden"
            >
              <ExportedImage
                width={600}
                height={750}
                src="PierreLepagnol.jpg"
                alt="Pierre Lepagnol"
                className="grayscale object-cover w-full h-full min-h-[280px]"
              />
            </Card>

            <Card id="bio-summary" className="p-5 md:p-6">
              <p className="font-body text-neutral-700 leading-relaxed mb-4">
                Currently pursuing a PhD at LISN/Paris-Saclay University while
                consulting as a Data Scientist at SCIAM. My research sits at the
                intersection of machine learning and natural language
                processing.
              </p>
              <p className="font-body text-neutral-700 leading-relaxed mb-4">
                I write about practical NLP, experimentation methods, and
                lessons learned from research to production work.
              </p>
              <a
                href="/cv.pdf"
                download
                className="inline-flex items-center border border-neutral-300 px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:border-editorial-red hover:text-editorial-red"
              >
                Download CV (PDF)
              </a>
            </Card>

            <Card id="current-roles" className="p-5 md:p-6 bg-neutral-50/60">
              <Eyebrow className="mb-2">Current Roles</Eyebrow>
              <div className="space-y-3 text-sm text-neutral-700">
                <div className="flex items-center justify-between gap-3">
                  <p className="mb-0">
                    PhD Student, LISN / Paris-Saclay University
                  </p>
                  <ExportedImage
                    width={72}
                    height={24}
                    src="logoLISN.svg"
                    alt="LISN logo"
                    className="h-5 w-auto shrink-0"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <p className="mb-0">Data Scientist Consultant, SCIAM</p>
                  <ExportedImage
                    width={72}
                    height={24}
                    src="logoSciam.png"
                    alt="SCIAM logo"
                    className="h-5 w-auto shrink-0"
                  />
                </div>
              </div>
            </Card>
            <Card id="profiles" className="p-5 md:p-6">
              <div className="flex items-center gap-2 mb-3 text-neutral-500">
                <IoAtOutline aria-hidden className="text-sm" />
                <Eyebrow className="mb-0 text-inherit">Profiles</Eyebrow>
              </div>
              <p className="text-neutral-700 text-sm mb-4">
                Reach me for research collaborations, consulting opportunities,
                or technical discussions.
              </p>
              <div className="flex items-center gap-3">
                {profiles.map(({ url, label, Icon }) => (
                  <ProfileLink key={url} url={url} label={label} Icon={Icon} />
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>

      <section id="articles">
        <Card id="projects" className="p-5 md:p-6 bg-neutral-50/40 mb-8">
          <Eyebrow className="mb-3">Projects</Eyebrow>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {projects.map((project) => (
              <article key={project.title} className="py-4">
                <h3 className="font-serif text-xl font-bold tracking-tight mb-2">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-editorial-red transition-colors"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed mb-0">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </Card>

        <Card id="articles-list" className="p-5 md:p-6 bg-neutral-50/40">
          <Eyebrow className="mb-3">Articles</Eyebrow>

          {posts.length === 0 ? (
            <p className="text-neutral-500 py-2">No articles yet.</p>
          ) : (
            <div className="divide-y divide-neutral-200 border-y border-neutral-200">
              {posts.map((post) => (
                <article key={post._meta.path} className="py-4">
                  <div className="font-sans text-xs uppercase tracking-[0.15em] text-neutral-500 mb-2">
                    <time dateTime={post.date}>
                      {format(parseISO(post.date), "LLLL d, yyyy")}
                    </time>
                    <span className="mx-2">&middot;</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold tracking-tight mb-2">
                    <Link
                      href={post.url}
                      className="hover:text-editorial-red transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-0">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-5">
              <Link
                href="/posts"
                className="inline-flex items-center border border-neutral-300 px-4 py-2 font-sans text-xs uppercase tracking-[0.15em] text-neutral-600 transition-colors hover:border-editorial-red hover:text-editorial-red"
              >
                Voir tous les articles &rarr;
              </Link>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};

export default Home;
