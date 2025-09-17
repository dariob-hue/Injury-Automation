import React, { useEffect, useState } from "react";

const CALENDLY_URL = "https://calendly.com/dariob-injuryautomation/15min?month=2025-09";

function runSanityTests() {
  const testRevenue = 15000 * 2;
  const fee = 1500;
  const roi = (testRevenue - fee) / fee;
  console.assert(testRevenue === 300000, "Revenue calc should be 30,000");
  console.assert(Number(roi.toFixed(1)) === 19.0, "ROI multiple should be 19.0 when fee is 1500");

  const zeroRevenue = 0;
  const zeroRoi = zeroRevenue > 0 ? (zeroRevenue - fee) / fee : 0;
  console.assert(zeroRoi === 0, "ROI should be 0 when revenue is 0");

  const oneClientRevenue = 15000 * 1;
  const oneClientRoi = (oneClientRevenue - fee) / fee;
  console.assert(Number(oneClientRoi.toFixed(1)) === 9.0, "ROI should be 9.0 for one $15k case with $1.5k fee");
}

export default function App() {
  useEffect(() => {
    try { runSanityTests(); } catch (e) { console.warn("Sanity tests failed", e); }
  }, []);

  // Smooth scroll for in-page anchors (How It Works / Features / Pricing / FAQ / See pricing)
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = prev || "auto"; };
  }, []);

  // Load Calendly embed script once for the inline widget
  useEffect(() => {
    const src = "https://assets.calendly.com/assets/external/widget.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const [caseValue, setCaseValue] = useState(15000);
  const [extraClients, setExtraClients] = useState(1);

  const revenue = caseValue * extraClients;
  const fee = 1500; // monthly price
  const roi = revenue > 0 ? (revenue - fee) / fee : 0;

  const openCalendly = (e) => {
    e?.preventDefault?.();
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

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
            <a href="#faq" clas
