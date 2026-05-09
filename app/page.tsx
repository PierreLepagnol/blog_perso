import { allPosts, allProjects } from "content-collections";
import { compareDesc, format, parseISO } from "date-fns";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { AtSignIcon, ArrowRightIcon, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

const Eyebrow = ({ children, className }: EyebrowProps) => (
  <p
    className={cn(
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
  <Tooltip>
    <TooltipTrigger asChild>
      <Button asChild variant="outline" size="icon-lg" aria-label={label}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-700 no-underline hover:text-editorial-red hover:no-underline"
        >
          <Icon className="text-base" />
        </a>
      </Button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
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
      <div className="flex flex-col gap-10">
        <section id="bio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <Card
              id="profile-photo"
              className="md:row-span-3 bg-muted/50 p-0"
            >
              <ExportedImage
                width={1024}
                height={1024}
                src="PierreLepagnol.webp"
                alt="Pierre Lepagnol"
                loading="eager"
                priority
                className="h-full min-h-[280px] w-full object-cover grayscale"
              />
            </Card>

            <Card id="bio-summary">
              <CardContent className="flex flex-col gap-4 p-5 md:p-6">
                <p className="mb-0 font-body leading-relaxed text-neutral-700">
                  Freshly graduated PhD at LISN/Paris-Saclay University while
                  being AI Scientist consultant at SCIAM. My research sits at the
                  intersection of machine learning and natural language
                  processing.
                </p>
                <p className="mb-0 font-body leading-relaxed text-neutral-700">
                  I write about practical NLP, experimentation methods, and
                  lessons learned from research to production work.
                </p>
                <Button asChild variant="outline" className="w-fit font-sans text-xs uppercase tracking-[0.15em]">
                  <a
                    href="/CV_PierreLepagnol2026.pdf"
                    download
                    className="no-underline hover:no-underline"
                  >
                    <DownloadIcon data-icon="inline-start" />
                    Download CV (PDF)
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card id="current-roles" className="bg-muted/40">
              <CardHeader className="p-5 pb-0 md:p-6 md:pb-0">
                <CardTitle>
                  <Eyebrow className="mb-0">Current Roles</Eyebrow>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:p-6">
                <div className="flex flex-col gap-3 text-sm text-neutral-700">
                  <div className="flex items-center justify-between gap-3">
                    <p className="mb-0">PhD, LISN / Paris-Saclay University</p>
                    <ExportedImage
                      width={72}
                      height={24}
                      src="logoLISN.svg"
                      alt="LISN logo"
                      className="h-5 w-auto shrink-0"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="mb-0">AI Scientist, SCIAM</p>
                    <ExportedImage
                      width={72}
                      height={24}
                      src="logoSciam.webp"
                      alt="SCIAM logo"
                      className="h-5 w-auto shrink-0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card id="profiles">
              <CardHeader className="p-5 pb-0 md:p-6 md:pb-0">
                <div className="flex items-center gap-2 text-neutral-500">
                  <AtSignIcon aria-hidden />
                  <CardTitle>
                    <Eyebrow className="mb-0 text-inherit">Profiles</Eyebrow>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5 md:p-6">
                <p className="mb-4 text-sm text-neutral-700">
                  Reach me for research collaborations, consulting opportunities,
                  or technical discussions.
                </p>
                <div className="flex items-center gap-3">
                  {profiles.map(({ url, label, Icon }) => (
                    <ProfileLink key={url} url={url} label={label} Icon={Icon} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <section id="articles">
        <Card id="projects" className="mb-8 bg-muted/30">
          <CardHeader className="p-5 pb-0 md:p-6 md:pb-0">
            <CardTitle>
              <Eyebrow className="mb-0">Projects</Eyebrow>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 md:p-6">
            <Separator />
            {projects.map((project) => (
              <article key={project.title} className="py-4 first:pt-4 last:pb-4">
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
            <Separator />
          </CardContent>
        </Card>

        <Card id="articles-list" className="bg-muted/30">
          <CardHeader className="p-5 pb-0 md:p-6 md:pb-0">
            <CardTitle>
              <Eyebrow className="mb-0">Articles</Eyebrow>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 md:p-6">

          {posts.length === 0 ? (
            <p className="text-neutral-500 py-2">No articles yet.</p>
          ) : (
            <div>
              <Separator />
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
              <Separator />
            </div>
          )}

          {posts.length > 0 && (
            <div className="mt-5">
              <Button asChild variant="outline" className="font-sans text-xs uppercase tracking-[0.15em]">
                <Link href="/posts" className="no-underline hover:no-underline">
                  Voir tous les articles
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
            </div>
          )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
