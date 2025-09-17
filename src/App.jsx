import React, { useEffect, useState } from "react";

/** Quick sanity tests */
function runSanityTests() {
  const testRevenue = 15000 * 2;
  const fee = 1500;
  const roi = (testRevenue - fee) / fee;
  console.assert(testRevenue === 30000, "Revenue calc should be 30,000");
  console.assert(Number(roi.toFixed(1)) === 19.0, "ROI multiple should be 19.0 when fee is 1500");
}

export default function App() {
  useEffect(() => {
    try { runSanityTests(); } catch (e) { console.warn("Sanity tests failed", e); }
  }, []);

  // Smooth scroll
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = prev || "auto"; };
  }, []);

  const [caseValue, setCaseValue] = useState(15000);
  const [extraClients, setExtraClients] = useState(1);

  const revenue = caseValue * extraClients;
  const fee = 1500;
  const roi = revenue > 0 ? (revenue - fee) / fee : 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-neutral-950/70">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-xl bg-emerald-500" />
            <span className="font-bold tracking-tight">InjuryAutomation</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#how" className="hover:text-white">How It Works</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-3 py-1 rounded-lg border border-emerald-400/40 text-emerald-300 text-xs">
              30-Day Money-Back
            </span>
            {/* CTA → Scrolls to Calendly embed */}
            <a
              href="#demo"
              className="px-3 py-2 rounded-xl bg-emerald-500 text-neutral-900 text-sm font-semibold hover:opacity-90 shadow"
            >
              Book a free demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 w-[420px] h-[420px] rounded-full blur-3xl bg-emerald-500/10" />
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Never lose another personal injury client to voicemail again.
            </h1>
            <p className="mt-5 text-white/80 text-lg">
              Every call answered 24/7, every lead followed up, and more reviews that bring in cases — all done for you.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#demo"
                className="px-5 py-3 rounded-2xl bg-emerald-500 text-neutral-900 font-semibold hover:opacity-90"
              >
                Book your free demo
              </a>
              <a
                href="#pricing"
                className="px-5 py-3 rounded-2xl border border-white/20 hover:bg-white/5"
              >
                See pricing
              </a>
            </div>
            <div className="mt-6 text-sm text-white/70 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                30-Day Money-Back Guarantee
              </span>
              <span><span className="font-semibold text-white">$1,500/month</span> · One flat fee. One signed client pays for it 10× over.</span>
            </div>
          </div>

          {/* ROI calculator (unchanged) */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <h3 className="font-semibold mb-3">ROI quick calculator</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <label className="flex flex-col gap-1">
                  <span className="text-white/70">Average fee per case ($)</span>
                  <input
                    type="number"
                    className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2"
                    value={caseValue}
                    onChange={(e) => setCaseValue(Number(e.target.value) || 0)}
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-white/70">Extra clients/month</span>
                  <input
                    type="number"
                    className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2"
                    value={extraClients}
                    onChange={(e) => setExtraClients(Number(e.target.value) || 0)}
                  />
                </label>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-neutral-900 p-4 border border-white/10">
                  <div className="text-xs uppercase text-white/60">Monthly revenue</div>
                  <div className="text-xl font-bold">${revenue.toLocaleString()}</div>
                </div>
                <div className="rounded-2xl bg-neutral-900 p-4 border border-white/10">
                  <div className="text-xs uppercase text-white/60">Your fee</div>
                  <div className="text-xl font-bold">${fee.toLocaleString()}</div>
                </div>
                <div className="rounded-2xl bg-neutral-900 p-4 border border-white/10">
                  <div className="text-xs uppercase text-white/60">ROI multiple</div>
                  <div className="text-xl font-bold">{roi > 0 ? `${roi.toFixed(1)}×` : "—"}</div>
                </div>
              </div>
              <p className="mt-3 text-xs text-white/60">* Calculator is illustrative. Actual results vary by market and intake quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ...How It Works, Features, Pricing, FAQ, etc. remain unchanged... */}

      {/* Pricing CTA (also scrolls to demo embed now) */}
      <a
        href="#demo"
        className="mt-6 inline-block w-full text-center px-5 py-3 rounded-xl bg-emerald-500 text-neutral-900 font-semibold hover:opacity-90"
      >
        Start your free demo
      </a>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/60 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} InjuryAutomation. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
          </div>
        </div>
      </footer>

      {/* Mobile sticky CTA → Scrolls to demo embed */}
      <a
        href="#demo"
        className="md:hidden fixed bottom-4 inset-x-4 px-5 py-3 rounded-2xl bg-emerald-500 text-neutral-900 font-semibold text-center shadow-2xl"
      >
        Book your free demo
      </a>
    </div>
  );
} 
