import { motion } from "framer-motion";
import { Heart, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 border-t border-border bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span>Designed & Developed by</span>
            <span className="font-semibold text-foreground">SHESHADRI N</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sheshadri-n"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/sheshadri022"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>

          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>using React & Framer Motion</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Sheshadri N. All rights reserved.
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
