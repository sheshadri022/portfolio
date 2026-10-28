import type { LucideIcon } from "lucide-react";
import {
  Activity, AlertTriangle, AppWindow, BadgeCheck, BarChart3, Bot, BookOpen, Bug, Building2, ClipboardList,
  Clock, Cloud, Code2, Cpu, Database, DownloadCloud, Eye, FileCheck, FileText, GitBranch, Globe, Hammer,
  HardDrive, Headphones, KeyRound, Laptop, LayoutDashboard, Layers, Lock, Mail, Monitor, MousePointer2,
  Package, PackageX, Palette, Phone, Printer, Radio, Rocket, RotateCcw, Search, Server, Settings, Shield,
  ShieldAlert, ShoppingCart, Sparkles, Tag, Ticket, Truck, UserCheck, UserMinus, UserPlus, Users, Users2,
  Video, Wand2, Wifi, Wrench, Zap,
} from "lucide-react";

// Skill cards for the Skills section. Each card opens a panel that explains
// the skill: a short summary, a narrated step-by-step "how it works", and
// everything the skill covers. Items come from Sheshadri's own skill list.

export type Tone = "magenta" | "ice" | "orchid" | "sun";
export type SkillItem = { icon: LucideIcon; label: string };
export type SkillCard = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  tone: Tone;
  summary: string;
  explainer: {
    audio: string;
    script: string;
    steps: { title: string; detail: string }[];
  };
  items: SkillItem[];
};

export const skillCards: SkillCard[] = [
  {
    id: "gws",
    icon: Cloud,
    title: "Google Workspace Admin",
    subtitle: "User management, security & domain config",
    tone: "ice",
    summary:
      "I run Google Workspace end to end in the Admin Console: accounts, groups and shared drives, security policies, and the domain, DNS and email records behind it.",
    explainer: {
      audio: "/assets/voice/workspace.mp3",
      script:
        "When someone joins, I create their Google account, add them to the right groups and shared drives, and apply security policies. When they leave, I transfer their data and close their access.",
      steps: [
        { title: "Account created", detail: "User added in Google Admin Console" },
        { title: "Groups and drives", detail: "Right groups and shared drives assigned" },
        { title: "Policies applied", detail: "Security policies and access controls" },
        { title: "Offboarded", detail: "Data transferred, access closed" },
      ],
    },
    items: [
      { icon: UserPlus, label: "User Onboarding & Offboarding" },
      { icon: UserCheck, label: "User Account Management" },
      { icon: Mail, label: "Email Migration" },
      { icon: Users, label: "Group Creation & Management" },
      { icon: Globe, label: "Domain Setup & Configuration" },
      { icon: Server, label: "DNS Configuration" },
      { icon: Shield, label: "SPF / DKIM / DMARC Record Updates" },
      { icon: Lock, label: "Google Workspace Security Policies" },
      { icon: Settings, label: "Access Control & Permissions" },
      { icon: LayoutDashboard, label: "Google Admin Console Management" },
      { icon: HardDrive, label: "Shared Drive Management" },
      { icon: KeyRound, label: "Password Reset & User Support" },
      { icon: ShoppingCart, label: "Domain Purchase & Renewal Coordination" },
      { icon: Video, label: "Google Meet & Collaboration Setup" },
    ],
  },
  {
    id: "l1l2",
    icon: Headphones,
    title: "L1/L2 Technical Support",
    subtitle: "Helpdesk, troubleshooting & SLA management",
    tone: "magenta",
    summary:
      "I am the first and second line of help for staff: tickets come in, I fix them remotely or at the desk, and I keep each one inside its SLA.",
    explainer: {
      audio: "/assets/voice/support.mp3",
      script:
        "Someone raises a ticket. I check what is wrong and fix it remotely when I can. For hardware, printers or Windows problems, I go to the desk. I keep every ticket inside its SLA, and I close it only when the user confirms it works.",
      steps: [
        { title: "Ticket raised", detail: "Logged in the helpdesk" },
        { title: "Diagnosed", detail: "Checked remotely or at the desk" },
        { title: "Fixed", detail: "Hardware, printer, Windows or app issue" },
        { title: "Within SLA", detail: "Tracked against the agreed time" },
        { title: "Closed", detail: "Once the user confirms it works" },
      ],
    },
    items: [
      { icon: Cpu, label: "Hardware Troubleshooting" },
      { icon: DownloadCloud, label: "Software Installation & Support" },
      { icon: Monitor, label: "Windows OS Configuration" },
      { icon: Printer, label: "Printer & Peripheral Support" },
      { icon: MousePointer2, label: "Remote Desktop Support" },
      { icon: Ticket, label: "Ticket Resolution" },
      { icon: Clock, label: "SLA Management" },
      { icon: Phone, label: "End-User Support" },
      { icon: AppWindow, label: "Application Troubleshooting" },
      { icon: Zap, label: "System Performance Optimization" },
      { icon: Laptop, label: "Laptop/Desktop Configuration" },
      { icon: Wifi, label: "Basic Networking Support" },
    ],
  },
  {
    id: "asset",
    icon: Package,
    title: "IT Asset Lifecycle",
    subtitle: "Procurement, tracking & inventory management",
    tone: "magenta",
    summary:
      "I own company devices from purchase to return: buying them, recording them, assigning them to people, keeping warranties tracked and recovering them at exit.",
    explainer: {
      audio: "/assets/voice/workplace.mp3",
      script:
        "A new laptop arrives. I log it in the asset register, set up Windows, and assign it to the employee with its warranty tracked. If it fails, a ticket is raised and I repair or replace it. When someone leaves, I recover it.",
      steps: [
        { title: "Asset logged", detail: "Added to the register with serial, warranty and location" },
        { title: "Device set up", detail: "Windows installed and configured" },
        { title: "Assigned", detail: "Handed to the employee and recorded" },
        { title: "Supported", detail: "Ticket raised, repaired or replaced" },
        { title: "Recovered", detail: "Collected back at offboarding" },
      ],
    },
    items: [
      { icon: ShoppingCart, label: "Asset Procurement" },
      { icon: ClipboardList, label: "Inventory Management" },
      { icon: Tag, label: "Device Allocation" },
      { icon: BarChart3, label: "Asset Tracking" },
      { icon: Hammer, label: "Hardware Maintenance" },
      { icon: Search, label: "Asset Auditing" },
      { icon: Truck, label: "Vendor Coordination" },
      { icon: FileText, label: "Asset Documentation" },
      { icon: RotateCcw, label: "Device Replacement Planning" },
      { icon: BadgeCheck, label: "Warranty Tracking" },
      { icon: PackageX, label: "Asset Recovery Process" },
    ],
  },
  {
    id: "troubleshoot",
    icon: Wrench,
    title: "Troubleshooting",
    subtitle: "Hardware, software & system diagnostics",
    tone: "magenta",
    summary:
      "When a machine misbehaves I find the real cause, not just the symptom: Windows errors, blue screens, drivers, malware, network drops and slow systems.",
    explainer: {
      audio: "/assets/voice/troubleshoot.mp3",
      script:
        "I start by reproducing the problem. Then I run diagnostics on the hardware, the drivers and the network. I fix the cause, whether it is a blue screen, a driver, malware or a slow system, and I test it before the device goes back.",
      steps: [
        { title: "Reproduce", detail: "See the problem happen" },
        { title: "Diagnose", detail: "Hardware, drivers and network checked" },
        { title: "Fix the cause", detail: "Blue screen, driver, malware or slowness" },
        { title: "Test", detail: "Checked before the device goes back" },
      ],
    },
    items: [
      { icon: Monitor, label: "Windows Troubleshooting" },
      { icon: AlertTriangle, label: "BSOD Issue Fixes" },
      { icon: Bug, label: "Software Error Resolution" },
      { icon: DownloadCloud, label: "Driver Installation" },
      { icon: Wifi, label: "Network Connectivity Issues" },
      { icon: Zap, label: "Performance Optimization" },
      { icon: Activity, label: "System Diagnostics" },
      { icon: ShieldAlert, label: "Virus & Malware Removal" },
      { icon: Printer, label: "Printer Troubleshooting" },
      { icon: Cpu, label: "Hardware Diagnostics" },
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise IT Management",
    subtitle: "Onboarding, policy & IT operations",
    tone: "magenta",
    summary:
      "I run the day-to-day IT operation: joiners and leavers, access, IT policy, documentation and the ticketing system, across all three companies.",
    explainer: {
      audio: "/assets/voice/enterprise.mp3",
      script:
        "When someone joins, I give them the right access, accounts and device, following our IT policy. I keep the documentation and the ticketing system up to date, and I review who has access. When someone leaves, I remove it.",
      steps: [
        { title: "Joiner set up", detail: "Access, accounts and device, per IT policy" },
        { title: "Documented", detail: "Docs and ticketing system kept current" },
        { title: "Access reviewed", detail: "Who has access is checked" },
        { title: "Leaver closed", detail: "Access removed at exit" },
      ],
    },
    items: [
      { icon: UserPlus, label: "Employee Onboarding" },
      { icon: UserMinus, label: "Employee Offboarding" },
      { icon: Lock, label: "Access Provisioning" },
      { icon: FileCheck, label: "IT Policy Implementation" },
      { icon: BookOpen, label: "IT Documentation" },
      { icon: Ticket, label: "Ticketing System Management" },
      { icon: Building2, label: "Enterprise Support Operations" },
      { icon: Eye, label: "System Monitoring" },
      { icon: Users2, label: "User Access Reviews" },
      { icon: Radio, label: "IT Coordination & Support" },
    ],
  },
  {
    id: "dev",
    icon: Code2,
    title: "Development & Automation",
    subtitle: "Full-stack apps for real IT problems",
    tone: "orchid",
    summary:
      "I turn problems I see in IT operations into working apps, like the IT Asset & Helpdesk Portal: a React frontend, an Express API and PostgreSQL, shipped from GitHub to Render.",
    explainer: {
      audio: "/assets/voice/dev.mp3",
      script:
        "I start from a real IT problem and design the workflow. Then I build it with a React frontend, an Express API and a PostgreSQL database. GitHub stores the code and Render deploys it.",
      steps: [
        { title: "IT problem", detail: "Seen in day-to-day operations" },
        { title: "Workflow", detail: "Mapped step by step" },
        { title: "Build", detail: "React frontend, Express API, PostgreSQL" },
        { title: "Ship", detail: "Code on GitHub, deployed on Render" },
      ],
    },
    items: [
      { icon: Sparkles, label: "AI-Assisted Full-Stack Development" },
      { icon: Layers, label: "React, TypeScript & Vite" },
      { icon: Palette, label: "Tailwind CSS & Framer Motion" },
      { icon: Server, label: "Node.js & Express" },
      { icon: Globe, label: "REST APIs" },
      { icon: Database, label: "PostgreSQL, Drizzle ORM & Supabase" },
      { icon: Lock, label: "Authentication" },
      { icon: GitBranch, label: "GitHub" },
      { icon: Rocket, label: "Render deployment" },
      { icon: AppWindow, label: "WordPress" },
    ],
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Tools",
    subtitle: "How the building actually happens",
    tone: "sun",
    summary:
      "AI tools speed up how I build: I describe the problem, review and test what they write, and fix what breaks. The decisions stay mine.",
    explainer: {
      audio: "/assets/voice/ai.mp3",
      script:
        "I describe the problem to AI tools like Replit, review the code they write, test it, and fix what breaks. The AI speeds me up. I make the decisions.",
      steps: [
        { title: "Describe", detail: "Explain the problem to the AI tool" },
        { title: "Review", detail: "Read the code it writes" },
        { title: "Test", detail: "Run it against real cases" },
        { title: "Fix", detail: "Debug what breaks, then ship" },
      ],
    },
    items: [
      { icon: Bot, label: "Replit AI" },
      { icon: Code2, label: "AI-assisted coding" },
      { icon: Bug, label: "AI-assisted debugging" },
      { icon: Wand2, label: "Prompting for app builds" },
    ],
  },
];
