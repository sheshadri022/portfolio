import { useState, type ChangeEvent, type FormEvent } from "react";
import { Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { person } from "@/data/profile";
import SectionHeading from "./SectionHeading";

const channels = [
  { label: "Email", value: person.email, href: `mailto:${person.email}`, Icon: Mail },
  { label: "Phone", value: person.phone, href: person.phoneHref, Icon: Phone },
  { label: "LinkedIn", value: "Sheshadri N on LinkedIn", href: person.linkedin, Icon: Linkedin },
  { label: "GitHub", value: "github.com/sheshadri022", href: person.github, Icon: Github },
];

const field =
  "w-full rounded-xl border border-line bg-ink-2/70 px-4 py-3 text-text placeholder:text-faint transition-colors focus:border-magenta/70";

// There is no backend for the form: sending opens the visitor's email app
// with the message filled in, so nothing is lost silently.
export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [opened, setOpened] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${form.name}`;
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="contact-title" title="Get in touch">
            Have a role, a project or an IT setup in mind? Reach out.
          </SectionHeading>
          <div className="mb-12 hidden items-center gap-4 md:mb-16 md:flex">
            <span className="h-32 w-24 overflow-hidden rounded-2xl bg-ink-3 ring-2 ring-ice/50">
              <img src="/assets/avatars/greeting.webp" alt="Sheshadri N waving hello" width={96} height={128} loading="lazy" className="h-full w-full object-cover object-top" />
            </span>
            <p className="hand -rotate-3 text-3xl text-ice" aria-hidden>
              say hello
            </p>
          </div>
        </div>

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
                    <span className="block truncate font-semibold text-text group-hover:text-white">{value}</span>
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
              <label htmlFor="c-msg" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea id="c-msg" name="message" required rows={5} value={form.message} onChange={onChange} className={`${field} resize-none`} />
            </div>
            <p className="text-sm text-faint">Sending opens your email app with this message ready to go.</p>
            <button type="submit" className="btn btn-primary justify-center">
              <Send size={18} aria-hidden />
              Send message
            </button>
            <p role="status" className="text-sm text-ice">
              {opened ? "Your email app should be open with the message. If it didn’t open, email me directly at " + person.email + "." : ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
