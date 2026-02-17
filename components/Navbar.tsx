import Link from "next/link";

const NavBar = () => {
  const links = [
    { href: "/#bio", label: "Bio" },
    { href: "/#profiles", label: "Profiles" },
    { href: "/#projects", label: "Projects" },
    { href: "/#articles", label: "Articles" },
  ];

  return (
    <nav className="border-b border-neutral-200 py-3">
      <div className="flex items-center justify-center gap-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-sans text-xs uppercase tracking-[0.2em] font-semibold text-neutral-500 hover:text-ink transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
