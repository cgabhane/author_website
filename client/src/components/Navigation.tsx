import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#books", label: "Books" },
    { href: "/#insights", label: "Insights" },
    { href: "/blog", label: "Blog" },
    { href: "/press-kit", label: "Press Kit" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (path === location || path === "") {
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-primary-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <span className="font-serif text-xl font-semibold hover-elevate active-elevate-2 px-2 py-1 rounded-md cursor-pointer">
              Chetan Gabhane
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}>
                  <span
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium hover-elevate active-elevate-2 px-3 py-2 rounded-md cursor-pointer transition-all"
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-primary-border bg-primary">
          <ul className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    onClick={() => handleNavClick(link.href)}
                    className="block px-4 py-2 rounded-md hover-elevate active-elevate-2 text-sm font-medium cursor-pointer"
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
