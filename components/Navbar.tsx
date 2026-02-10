"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "About" },
    { href: "/posts", label: "Articles" },
  ];

  return (
    <nav className="border-b border-ink flex justify-center">
      {links.map(({ href, label }, i) => {
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`
              px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] font-semibold
              transition-colors duration-200
              ${i > 0 ? "border-l border-ink" : ""}
              ${isActive ? "bg-ink text-newsprint" : "hover:bg-neutral-100"}
            `}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
