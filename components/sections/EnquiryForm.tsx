"use client";
import { useId, useRef, useState } from "react";
import Link from "next/link";
import { submitEnquiry } from "@/lib/enquiry";

export default function EnquiryForm({
  source = "contact",
  initialMessage = ""
}: {
  source?: string;
  initialMessage?: string;
}) {
  const id = useId();
  const lock = useRef(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (lock.current) return;
    lock.current = true;
    setBusy(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      await submitEnquiry(data, source);
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error && err.name !== "TimeoutError"
          ? err.message
          : "Delivery could not be confirmed. Please try again or call us."
      );
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="border border-line p-10 bg-white">
        <h4 className="font-outfit font-semibold text-xl text-slate-900 mb-2">Thank you!</h4>
        <p className="text-slate text-[15px] leading-relaxed">
          Your enquiry has been received. One of our engineers will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6" aria-busy={busy}>
      {([
        ["name", "Your name", "text"],
        ["phone", "Phone number", "tel"],
        ["email", "Email (optional)", "email"]
      ] as const).map(([name, label, type]) => (
        <div key={name} className="group transition-colors">
          <label
            htmlFor={id + name}
            className="block text-xs text-slate group-focus-within:text-brand transition-colors mb-2 tracking-wide uppercase font-semibold"
          >
            {label}
          </label>
          <input
            id={id + name}
            name={name}
            type={type}
            required={name !== "email"}
            minLength={name === "name" ? 2 : undefined}
            maxLength={name === "name" ? 100 : name === "phone" ? 22 : 254}
            autoComplete={name === "phone" ? "tel" : name}
            className="field transition-all duration-300"
            placeholder={label}
          />
        </div>
      ))}

      <div className="group transition-colors">
        <label
          htmlFor={id + "type"}
          className="block text-xs text-slate group-focus-within:text-brand transition-colors mb-2 tracking-wide uppercase font-semibold"
        >
          What are you building?
        </label>
        <div className="relative">
          <select
            id={id + "type"}
            name="type"
            className="field transition-all duration-300 appearance-none cursor-pointer"
          >
            {["Residential", "Commercial", "Multi-storey Building", "Renovation"].map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate group-focus-within:text-brand transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="group transition-colors">
        <label
          htmlFor={id + "message"}
          className="block text-xs text-slate group-focus-within:text-brand transition-colors mb-2 tracking-wide uppercase font-semibold"
        >
          Location & Project Details
        </label>
        <textarea
          id={id + "message"}
          name="message"
          defaultValue={initialMessage}
          maxLength={2000}
          rows={4}
          className="field min-h-[110px] transition-all duration-300 resize-y"
          placeholder="Plot location, size, budget, or timeline"
        />
      </div>

      <div hidden>
        <label>
          Leave blank
          <input name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-slate cursor-pointer">
        <input type="checkbox" name="consent" required className="mt-1 accent-brand" />
        <span>
          I agree to be contacted regarding this enquiry. See our{" "}
          <Link href="/privacy" className="underline text-brand hover:text-slate-900">
            privacy notice
          </Link>.
        </span>
      </label>

      {error && <p role="alert" className="text-red-600 text-sm">{error}</p>}

      <button className="btn btn-cta w-full justify-center mt-2" disabled={busy}>
        {busy ? "Sending…" : "Send enquiry"}
      </button>

      <p className="text-sm text-slate text-center mt-4">
        Prefer to talk? <a href="tel:+918248362020" className="underline font-medium text-slate-900 hover:text-brand">Call 82483 62020</a>.
      </p>
    </form>
  );
}

