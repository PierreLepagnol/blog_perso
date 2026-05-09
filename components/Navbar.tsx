import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NavBar = () => {
  const links = [
    { href: "/#bio", label: "Bio" },
    { href: "/#profiles", label: "Profiles" },
    { href: "/#projects", label: "Projects" },
    { href: "/#articles", label: "Articles" },
  ];

  return (
    <nav className="border-b border-border py-3">
      <NavigationMenu className="mx-auto" viewport={false}>
        <NavigationMenuList className="flex-wrap gap-1">
        {links.map(({ href, label }) => (
          <NavigationMenuItem key={href}>
            <NavigationMenuLink asChild className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Link href={href}>{label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;
