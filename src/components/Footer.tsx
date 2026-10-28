import { Github, Linkedin } from "lucide-react";
import { person } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col items-center justify-between gap-5 text-sm text-faint md:flex-row">
        <p>
          Designed and built by <span className="font-semibold text-text">SHESHADRI N</span>, with AI-assisted development.
        </p>
        <ul className="flex items-center gap-5">
          <li>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-text">
              <Linkedin size={16} aria-hidden />
              LinkedIn
            </a>
          </li>
          <li>
            <a href={person.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-text">
              <Github size={16} aria-hidden />
              GitHub
            </a>
          </li>
        </ul>
        <p>&copy; {new Date().getFullYear()} Sheshadri N</p>
      </div>
    </footer>
  );
}
