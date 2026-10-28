import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { person } from "@/data/profile";
import { useVirtualHuman } from "@/context/VirtualHuman";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Certifications", id: "certifications" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

// Sections that are not in the menu highlight their nearest parent link.
const alias: Record<string, string> = { journey: "projects" };

export default function ResponsiveNavbar() {
  const { section } = useVirtualHuman();
  const active = alias[section] ?? section;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/75 py-3 backdrop-blur-xl" : "border-b border-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#home" className="font-display text-lg font-bold tracking-tight text-text">
          SHESHADRI N
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const isActive = active === l.id;
              return (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-text" : "text-muted hover:text-text"
                    }`}
                  >
                    {l.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-magenta"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={person.resume} download className="btn btn-primary hidden sm:inline-flex !min-h-10 !px-4 text-sm">
            <Download size={16} aria-hidden />
            Download Resume
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-text lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="container-x h-[calc(100dvh-68px)] overflow-y-auto pb-10 pt-6 lg:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block border-b border-line py-4 font-display text-2xl ${
                      active === l.id ? "text-magenta" : "text-text"
                    }`}
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
            <a href={person.resume} download className="btn btn-primary mt-8 w-full justify-center">
              <Download size={18} aria-hidden />
              Download Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
