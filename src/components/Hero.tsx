import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Download, ArrowRight } from "lucide-react";

const titles = [
  "System Administrator",
  "Google Workspace Admin",
  "L1/L2 Support Specialist",
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-rose-700/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-pink-800/8 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[40vh] bg-rose-700/5 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for new opportunities
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold font-heading leading-tight tracking-tight">
              <span className="text-foreground">
                SHESHADRI N
              </span>
            </h1>
            
            <div className="text-xl lg:text-2xl font-medium h-[1.5em] text-muted-foreground flex items-center">
              <span className="text-slate-400 mr-2">I am a</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 font-bold">
                {titles[titleIndex]}
              </span>
              <motion.span 
                animate={{ opacity: [0, 1, 0] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-0.5 h-6 bg-rose-400 ml-1 block" 
              />
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              System Administrator & Google Workspace professional with 4+ years of experience in IT support, infrastructure management, IT asset management, and enterprise technical support.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                Bengaluru, Karnataka
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                sheshadri022@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                +91 8190062144
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <a 
                href="/resume.pdf" 
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg shadow-primary/20"
                data-testid="button-download-resume"
              >
                <Download size={18} />
                Download Resume
              </a>
              <a 
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:-translate-y-1 border border-border text-foreground hover:border-primary/50 hover:text-primary bg-muted/40 backdrop-blur-sm"
              >
                Contact Me
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/8">
              {[
                { value: "4+", label: "Years Experience" },
                { value: "1", label: "Company" },
                { value: "100%", label: "Uptime Focus" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto w-full max-w-md mx-auto aspect-square"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-700 to-pink-600 blur-2xl opacity-20 animate-pulse" />
            <div className="relative h-full w-full rounded-full border border-rose-600/25 p-1.5 overflow-hidden shadow-2xl bg-[#0d0d0f]">
              <img 
                src="/sheshadri.jpeg" 
                alt="Sheshadri N" 
                className="h-full w-full object-cover object-top rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Sheshadri+N&size=512&background=random';
                }}
              />
            </div>
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 lg:bottom-12 lg:-right-8 bg-card border border-border p-4 rounded-xl shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  IT
                </div>
                <div>
                  <div className="font-semibold text-sm">SysAdmin</div>
                  <div className="text-xs text-muted-foreground">Expertise</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
