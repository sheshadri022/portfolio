import { useEffect, useState } from "react";

// Tracks which section is in the middle band of the viewport.
// Sections are found by id, so lazily loaded sections are picked up
// when they mount (a MutationObserver re-scans the DOM).
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const seen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const scan = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && !seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      }
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [ids.join("|")]);

  return active;
}
