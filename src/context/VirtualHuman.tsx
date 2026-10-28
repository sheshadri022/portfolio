import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";

export type VirtualHumanState = "idle" | "greeting" | "explaining" | "projects" | "skills" | "contact";

export const sectionIds = ["home", "about", "services", "product", "projects", "journey", "experience", "education", "skills", "certifications", "contact"];

const sectionToState: Record<string, VirtualHumanState> = {
  home: "greeting",
  about: "idle",
  services: "explaining",
  product: "explaining",
  experience: "idle",
  projects: "projects",
  journey: "projects",
  skills: "skills",
  certifications: "skills",
  education: "idle",
  contact: "contact",
};

type Ctx = {
  state: VirtualHumanState;
  section: string;
  askOpen: boolean;
  setAskOpen: (v: boolean) => void;
  askActive: boolean;
  setAskActive: (v: boolean) => void;
};

const VirtualHumanContext = createContext<Ctx | null>(null);

export function VirtualHumanProvider({ children }: { children: ReactNode }) {
  const section = useActiveSection(sectionIds);
  const [askOpen, setAskOpen] = useState(false);
  const [askActive, setAskActive] = useState(false);

  const state: VirtualHumanState = askOpen || askActive ? "explaining" : sectionToState[section] ?? "idle";

  const value = useMemo(
    () => ({ state, section, askOpen, setAskOpen, askActive, setAskActive }),
    [state, section, askOpen, askActive],
  );
  return <VirtualHumanContext.Provider value={value}>{children}</VirtualHumanContext.Provider>;
}

export function useVirtualHuman() {
  const ctx = useContext(VirtualHumanContext);
  if (!ctx) throw new Error("useVirtualHuman must be used inside VirtualHumanProvider");
  return ctx;
}
