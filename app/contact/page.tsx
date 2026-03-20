import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — ACME Agent Supply Co.",
  description: "Get in touch with ACME Agent Supply Co. for product questions, early access, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#1E2226] text-[#E6E6E6]">
      <main className="mx-auto max-w-[640px] px-6 py-16">
        <div className="text-[10px] uppercase tracking-[0.4em] text-[#D98A2B] mb-2">ACME Agent Supply Co.</div>
        <h1 className="text-[28px] font-semibold text-[#E6E6E6]">Contact Us</h1>
        <p className="mt-3 text-[15px] leading-7 text-[#9AA3AD]">
          Questions about the stack, early access, or something else — drop us a note and we&apos;ll get back to you.
        </p>

        <form
          action="https://formspree.io/f/acme-contact"
          method="POST"
          className="mt-10 space-y-5"
        >
          <div>
            <label htmlFor="name" className="block text-[12px] uppercase tracking-[0.2em] text-[#5A6E80] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="w-full rounded-[6px] border border-[#2E3640] bg-[#242A30] px-4 py-3 text-[15px] text-[#E6E6E6] placeholder-[#3A4858] outline-none focus:border-[#D98A2B] transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[12px] uppercase tracking-[0.2em] text-[#5A6E80] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-[6px] border border-[#2E3640] bg-[#242A30] px-4 py-3 text-[15px] text-[#E6E6E6] placeholder-[#3A4858] outline-none focus:border-[#D98A2B] transition"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-[12px] uppercase tracking-[0.2em] text-[#5A6E80] mb-2">
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full rounded-[6px] border border-[#2E3640] bg-[#242A30] px-4 py-3 text-[15px] text-[#E6E6E6] outline-none focus:border-[#D98A2B] transition appearance-none"
            >
              <option value="product">Product question</option>
              <option value="early-access">Early access</option>
              <option value="partnership">Partnership</option>
              <option value="press">Press inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-[12px] uppercase tracking-[0.2em] text-[#5A6E80] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="What's on your mind?"
              className="w-full rounded-[6px] border border-[#2E3640] bg-[#242A30] px-4 py-3 text-[15px] text-[#E6E6E6] placeholder-[#3A4858] outline-none focus:border-[#D98A2B] transition resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-[6px] bg-[#D98A2B] px-6 py-3 text-[15px] font-medium text-[#1E2226] transition hover:bg-[#C47A22]"
          >
            Send message
          </button>
        </form>
      </main>
    </div>
  );
}
