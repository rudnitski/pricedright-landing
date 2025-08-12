import { Trigger as UploadTrigger, Container as UploadContainer } from '@/components/UploadDialog';
import { Trigger as SampleReportTrigger } from '@/components/SampleReportModal';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 glass border-b border-[var(--platinum)]">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-tight">PricedRight <span className="text-xs align-top text-neutral-500">Beta</span></div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#how" className="hover:underline">How it Works</a>
            <a href="#sample" className="hover:underline">Sample Report</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="#privacy" className="hover:underline">Privacy</a>
          </nav>
          <UploadTrigger className="btn rounded-2xl bg-[var(--onyx)] text-white px-4 py-2 text-sm">
            Try the Beta
          </UploadTrigger>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">Price your jewelry with confidence.</h1>
          <p className="mt-4 text-lg text-neutral-700">
            Upload a photo — <b>Humans + AI</b> send a pricing report in <b>12–24 hours</b>.
            Free during beta. Limited slots daily.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <UploadTrigger className="btn rounded-2xl bg-[var(--onyx)] text-white px-5 py-3 text-base">
              Upload your piece
            </UploadTrigger>
            <a href="#cheatsheet" className="btn rounded-2xl border border-[var(--platinum)] px-5 py-3">Get the Pricing Cheat Sheet</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-neutral-600">
            <span className="px-2.5 py-1 rounded-full bg-white ring-gold">Beta</span>
            <span className="px-2.5 py-1 rounded-full bg-white ring-gold">Humans + AI</span>
            <span className="px-2.5 py-1 rounded-full bg-white ring-gold">No payments today</span>
            <span className="px-2.5 py-1 rounded-full bg-white ring-gold">Private by default</span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl bg-white shadow-soft p-5 border border-[var(--platinum)]">
            <img
              src="https://images.unsplash.com/photo-1603569283847-2778687b2c2f?q=80&w=1080&auto=format&fit=crop"
              alt="Jewelry example"
              className="rounded-xl object-cover w-full h-64 border border-[var(--platinum)]"
            />
            <div className="mt-3">
              <div className="text-sm text-neutral-500">Suggested price</div>
              <div className="text-2xl font-semibold">$48–$59</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[var(--ivory)] border border-[var(--platinum)]">Materials • $9.10</div>
                <div className="p-3 rounded-xl bg-[var(--ivory)] border border-[var(--platinum)]">Labor • 1.5h</div>
                <div className="p-3 rounded-xl bg-[var(--ivory)] border border-[var(--platinum)]">Fees • Etsy</div>
                <div className="p-3 rounded-xl bg-[var(--ivory)] border border-[var(--platinum)]">Margin • 60%</div>
              </div>
              <SampleReportTrigger className="btn mt-3 inline-block text-sm rounded-xl px-3 py-2 border border-[var(--platinum)]">View sample report</SampleReportTrigger>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--platinum)]">
        <h2 className="text-2xl font-semibold mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Step n="1" t="Upload your piece" d="Photo + basic details (materials, time, channel)." />
          <Step n="2" t="Humans + AI analyze" d="Materials, complexity, and market comps." />
          <Step n="3" t="Get a PDF report" d="Clear price range & rationale in 12–24h." />
        </div>
        <p className="mt-3 text-sm text-neutral-600">Not a formal appraisal—practical pricing guidance for makers.</p>
      </section>

      <section id="sample" className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--platinum)]">
        <h2 className="text-2xl font-semibold mb-6">What’s in the report</h2>
        <ul className="list-disc pl-6 space-y-2 text-neutral-800">
          <li>Price range + rationale</li>
          <li>Cost & fee breakdown</li>
          <li>Channel-specific guidance (Etsy, Shopify, fairs)</li>
          <li>Levers to go premium (materials, photos, packaging)</li>
        </ul>
        <SampleReportTrigger className="btn mt-4 inline-block rounded-xl border border-[var(--platinum)] px-4 py-2">See full sample (PDF)</SampleReportTrigger>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--platinum)]">
        <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
        <div className="space-y-4 text-neutral-800">
          <Faq q="Is this an appraisal?" a="No—practical pricing guidance for selling." />
          <Faq q="How long does it take?" a="12–24h in beta; limited daily slots." />
          <Faq q="Is it free?" a="Yes during beta. No payment today." />
          <Faq q="Will you use my photos?" a="Only to create your report. You can request deletion." />
        </div>
      </section>

      <section id="cheatsheet" className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--platinum)]">
        <h2 className="text-2xl font-semibold mb-3">Not ready to upload?</h2>
        <p className="text-neutral-800">Get our Pricing Cheat Sheet + COGS template.</p>
        <iframe
          className="mt-4 w-full h-36 rounded-xl border border-[var(--platinum)]"
          src="https://embeds.beehiiv.com/placeholder" title="Email capture"
        />
      </section>

      <footer id="privacy" className="mx-auto max-w-6xl px-4 py-12 border-t border-[var(--platinum)] text-sm text-neutral-600">
        © PricedRight Beta. Humans + AI. No payments today.
      </footer>

      {/* Upload Dialog Modal Container */}
      <UploadContainer />
    </main>
  );
}

function Step({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-2xl border border-[var(--platinum)] bg-white p-5 shadow-soft">
      <div className="w-7 h-7 rounded-full bg-[#0E0E0F] text-white flex items-center justify-center text-xs font-semibold">{n}</div>
      <div className="mt-3 font-medium">{t}</div>
      <div className="text-sm text-neutral-700">{d}</div>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-xl border border-[var(--platinum)] bg-white p-4 shadow-soft">
      <summary className="cursor-pointer font-medium">{q}</summary>
      <p className="mt-2 text-neutral-700">{a}</p>
    </details>
  );
}
