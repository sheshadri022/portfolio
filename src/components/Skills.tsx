import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud, HeadphonesIcon, Package, Wrench, Building2, X,
  UserPlus, UserMinus, Mail, Users, Globe, Server, Shield,
  Lock, Settings, HardDrive, FolderOpen, KeyRound, ShoppingCart, Video,
  Monitor, Cpu, Printer, MousePointer2, Ticket, Clock, UserCheck,
  AppWindow, Zap, Laptop, Wifi,
  BarChart3, ClipboardList, Tag, Truck, Hammer, Search, FileText,
  RotateCcw, BadgeCheck, PackageX,
  AlertTriangle, Bug, DownloadCloud, Radio, Activity, ShieldAlert,
  Users2, FileCheck, BookOpen, LayoutDashboard, Eye, Phone,
} from "lucide-react";

interface SkillItem {
  icon: React.ReactNode;
  label: string;
}

interface ExpertiseCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  modalTitle: string;
  items: SkillItem[];
  gradient: string;
}

const expertise: ExpertiseCard[] = [
  {
    id: "gws",
    icon: <Cloud size={32} />,
    title: "Google Workspace Admin",
    subtitle: "User management, security & domain config",
    modalTitle: "Google Workspace Administration",
    gradient: "from-blue-500/20 to-cyan-500/20",
    items: [
      { icon: <UserPlus size={16} />, label: "User Onboarding & Offboarding" },
      { icon: <UserCheck size={16} />, label: "User Account Management" },
      { icon: <Mail size={16} />, label: "Email Migration" },
      { icon: <Users size={16} />, label: "Group Creation & Management" },
      { icon: <Globe size={16} />, label: "Domain Setup & Configuration" },
      { icon: <Server size={16} />, label: "DNS Configuration" },
      { icon: <Shield size={16} />, label: "SPF / DKIM / DMARC Record Updates" },
      { icon: <Lock size={16} />, label: "Google Workspace Security Policies" },
      { icon: <Settings size={16} />, label: "Access Control & Permissions" },
      { icon: <LayoutDashboard size={16} />, label: "Google Admin Console Management" },
      { icon: <HardDrive size={16} />, label: "Shared Drive Management" },
      { icon: <KeyRound size={16} />, label: "Password Reset & User Support" },
      { icon: <ShoppingCart size={16} />, label: "Domain Purchase & Renewal Coordination" },
      { icon: <Video size={16} />, label: "Google Meet & Collaboration Setup" },
    ],
  },
  {
    id: "l1l2",
    icon: <HeadphonesIcon size={32} />,
    title: "L1/L2 Technical Support",
    subtitle: "Helpdesk, troubleshooting & SLA management",
    modalTitle: "L1/L2 Technical Support",
    gradient: "from-rose-500/20 to-pink-500/20",
    items: [
      { icon: <Cpu size={16} />, label: "Hardware Troubleshooting" },
      { icon: <DownloadCloud size={16} />, label: "Software Installation & Support" },
      { icon: <Monitor size={16} />, label: "Windows OS Configuration" },
      { icon: <Printer size={16} />, label: "Printer & Peripheral Support" },
      { icon: <MousePointer2 size={16} />, label: "Remote Desktop Support" },
      { icon: <Ticket size={16} />, label: "Ticket Resolution" },
      { icon: <Clock size={16} />, label: "SLA Management" },
      { icon: <Phone size={16} />, label: "End-User Support" },
      { icon: <AppWindow size={16} />, label: "Application Troubleshooting" },
      { icon: <Zap size={16} />, label: "System Performance Optimization" },
      { icon: <Laptop size={16} />, label: "Laptop/Desktop Configuration" },
      { icon: <Wifi size={16} />, label: "Basic Networking Support" },
    ],
  },
  {
    id: "asset",
    icon: <Package size={32} />,
    title: "IT Asset Lifecycle",
    subtitle: "Procurement, tracking & inventory management",
    modalTitle: "IT Asset Lifecycle Management",
    gradient: "from-emerald-500/20 to-teal-500/20",
    items: [
      { icon: <ShoppingCart size={16} />, label: "Asset Procurement" },
      { icon: <ClipboardList size={16} />, label: "Inventory Management" },
      { icon: <Tag size={16} />, label: "Device Allocation" },
      { icon: <BarChart3 size={16} />, label: "Asset Tracking" },
      { icon: <Hammer size={16} />, label: "Hardware Maintenance" },
      { icon: <Search size={16} />, label: "Asset Auditing" },
      { icon: <Truck size={16} />, label: "Vendor Coordination" },
      { icon: <FileText size={16} />, label: "Asset Documentation" },
      { icon: <RotateCcw size={16} />, label: "Device Replacement Planning" },
      { icon: <BadgeCheck size={16} />, label: "Warranty Tracking" },
      { icon: <PackageX size={16} />, label: "Asset Recovery Process" },
    ],
  },
  {
    id: "troubleshoot",
    icon: <Wrench size={32} />,
    title: "Troubleshooting",
    subtitle: "Hardware, software & system diagnostics",
    modalTitle: "Hardware & Software Troubleshooting",
    gradient: "from-orange-500/20 to-amber-500/20",
    items: [
      { icon: <Monitor size={16} />, label: "Windows Troubleshooting" },
      { icon: <AlertTriangle size={16} />, label: "BSOD Issue Fixes" },
      { icon: <Bug size={16} />, label: "Software Error Resolution" },
      { icon: <DownloadCloud size={16} />, label: "Driver Installation" },
      { icon: <Wifi size={16} />, label: "Network Connectivity Issues" },
      { icon: <Zap size={16} />, label: "Performance Optimization" },
      { icon: <Activity size={16} />, label: "System Diagnostics" },
      { icon: <ShieldAlert size={16} />, label: "Virus & Malware Removal" },
      { icon: <Printer size={16} />, label: "Printer Troubleshooting" },
      { icon: <Cpu size={16} />, label: "Hardware Diagnostics" },
    ],
  },
  {
    id: "enterprise",
    icon: <Building2 size={32} />,
    title: "Enterprise IT Management",
    subtitle: "Onboarding, policy & IT operations",
    modalTitle: "Enterprise IT Management",
    gradient: "from-purple-500/20 to-violet-500/20",
    items: [
      { icon: <UserPlus size={16} />, label: "Employee Onboarding" },
      { icon: <UserMinus size={16} />, label: "Employee Offboarding" },
      { icon: <Lock size={16} />, label: "Access Provisioning" },
      { icon: <FileCheck size={16} />, label: "IT Policy Implementation" },
      { icon: <BookOpen size={16} />, label: "IT Documentation" },
      { icon: <Ticket size={16} />, label: "Ticketing System Management" },
      { icon: <Building2 size={16} />, label: "Enterprise Support Operations" },
      { icon: <Eye size={16} />, label: "System Monitoring" },
      { icon: <Users2 size={16} />, label: "User Access Reviews" },
      { icon: <Radio size={16} />, label: "IT Coordination & Support" },
    ],
  },
];

function SkillModal({ card, onClose }: { card: ExpertiseCard; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0f0f11]/90 backdrop-blur-xl shadow-2xl"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/60 to-transparent" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/15 text-primary flex items-center justify-center border border-primary/20">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-heading">{card.modalTitle}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{card.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-muted-foreground hover:text-white transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {card.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCard, setActiveCard] = useState<ExpertiseCard | null>(null);

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 inline-flex items-center gap-4">
            Skills & Expertise
            <span className="h-px w-24 bg-border inline-block"></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Core technical competencies built through 5 years of hands-on enterprise IT experience.
            <span className="text-primary/80 ml-1">Click any card to explore details.</span>
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {expertise.map((card, i) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActiveCard(card)}
              className="group relative text-left p-6 rounded-2xl bg-card border border-border hover:border-primary/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50"
              data-testid={`skill-card-${i}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Glow ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/0 group-hover:ring-primary/30 transition-all duration-300" />

              {/* Animated top border */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/60 transition-all duration-300" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg">
                  {card.icon}
                </div>
                <h3 className="font-bold text-base mb-2 leading-snug">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.subtitle}</p>

                <div className="mt-4 inline-flex items-center gap-1 text-xs text-primary/70 group-hover:text-primary transition-colors font-medium">
                  View details
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCard && (
          <SkillModal card={activeCard} onClose={() => setActiveCard(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
