import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Github, Linkedin, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { person } from "@/data/profile";
import { needs, type Need } from "@/data/services";
import SectionHeading from "./SectionHeading";

const channels = [
  { label: "WhatsApp", value: "Chat with me on WhatsApp", href: person.whatsapp, Icon: MessageCircle },
  { label: "Email", value: person.email, href: `mailto:${person.email}`, Icon: Mail },
  { label: "Phone", value: person.phone, href: person.phoneHref, Icon: Phone },
  { label: "LinkedIn", value: "Sheshadri N on LinkedIn", href: person.linkedin, Icon: Linkedin },
  { label: "GitHub", value: "github.com/sheshadri022", href: person.github, Icon: Github },
];

const field =
  "w-full rounded-xl border border-line bg-ink-2/70 px-4 py-3 text-text placeholder:text-faint transition-colors focus:border-magenta/70";

// The form sends through Web3Forms (free) when VITE_WEB3FORMS_KEY is set at
// build time; the key is a public form key, safe to ship. Without a key, or if
// sending fails, it falls back to opening the visitor's email app.
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
type Status = "idle" | "sending" | "sent" | "mailto" | "error";
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", need: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  // Service and demo buttons elsewhere on the page preselect "What do you need?".
  useEffect(() => {
    const onPrefill = (e: Event) => setForm((f) => ({ ...f, need: (e as CustomEvent<Need>).detail }));
    window.addEventListener("prefill-contact", onPrefill);
    return () => window.removeEventListener("prefill-contact", onPrefill);
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `${form.need || "Portfolio enquiry"}: ${form.name}`;
    const body = `${form.need ? `What I need: ${form.need}\n\n` : ""}${form.message}\n\n${form.name}\n${form.email}`;
    const openMail = () => {
      window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };
    if (!FORM_KEY) {
      openMail();
      setStatus("mailto");
      return;
    }
    const bot = (e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null)?.checked;
    if (bot) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `snscloud.in: ${subject}`,
          from_name: "snscloud.in portfolio",
          name: form.name,
          email: form.email,
          need: form.need || "Not chosen",
          message: form.message,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("send failed");
      setStatus("sent");
      setForm({ name: "", email: "", need: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <SectionHeading id="contact-title" title="Get in touch">
          Have a role, a project or an IT setup in mind? Reach out.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ul className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-ink-2/60 p-5 transition-colors hover:border-magenta/50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-magenta/10 text-magenta">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-faint">{label}</span>
                    <span className="block truncate font-semibold text-text group-hover:text-magenta">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <form onSubmit={onSubmit} className="glass flex flex-col gap-5 rounded-[var(--radius-panel)] p-6 sm:p-8">
            <div>
              <label htmlFor="c-name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input id="c-name" name="name" required autoComplete="name" value={form.name} onChange={onChange} className={field} />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input id="c-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} className={field} />
            </div>
            <div>
              <label htmlFor="c-need" className="mb-2 block text-sm font-medium">
                What do you need?
              </label>
              <select id="c-need" name="need" value={form.need} onChange={onChange} className={`${field} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b9b4c8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
                <option value="">Choose one (optional)</option>
                {needs.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea id="c-msg" name="message" required rows={5} value={form.message} onChange={onChange} className={`${field} resize-none`} />
            </div>
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
            <p className="text-sm text-faint">
              {FORM_KEY ? "Your message comes straight to my inbox. I usually reply within a day." : "Sending opens your email app with this message ready to go."}
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary flex-1 justify-center disabled:opacity-60">
                <Send size={18} aria-hidden />
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <a href={person.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost flex-1 justify-center">
                <MessageCircle size={18} aria-hidden />
                WhatsApp me
              </a>
            </div>
            <p role="status" className={`text-sm ${status === "error" ? "text-magenta" : "text-ice"}`}>
              {status === "sent" && "Thanks, your message is on its way. I’ll get back to you soon."}
              {status === "mailto" && `Your email app should be open with the message. If it didn’t open, email me at ${person.email}.`}
              {status === "error" && `That didn’t go through. Please email me at ${person.email} or message me on WhatsApp.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
