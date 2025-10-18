import React, { useMemo, useState } from "react";

/**
 * FIX: The previous document contained Markdown text at the top-level, which caused
 * "SyntaxError: /index.tsx: Unexpected token (1:0)" because a TSX file must contain valid JSX/TSX code.
 * This file now exports a valid React component with no stray Markdown.
 *
 * File role: single‑file landing page for "Vánoce bez starostí" (stromky domů).
 * - Tailwind utility classes for styling (works in most online sandboxes that pre-wire Tailwind).
 * - No external libs required.
 * - Safe default placeholders for prices.
 * - Small built‑in runtime tests (sanity checks) at the bottom.
 */

// ====== CONFIGURABLE DATA ======
const SIZES: { id: string; label: string; price: string }[] = [
  { id: "s", label: "S – 120–150 cm", price: "? Kč" },
  { id: "m", label: "M – 150–180 cm", price: "? Kč" },
  { id: "l", label: "L – 180–220 cm", price: "? Kč" },
  { id: "xl", label: "XL – 220+ cm", price: "? Kč" },
];

const ADDONS: { id: string; label: string; price: string }[] = [
  { id: "decor", label: "Profesionální ozdobení na místě", price: "+ ? Kč" },
  { id: "stand", label: "Stojan (zapůjčení / prodej)", price: "+ ? Kč" },
  { id: "pickup", label: "Odvoz a recyklace po svátcích", price: "+ ? Kč" },
];

const DELIVERY_DATES = [
  "1.–3. prosince",
  "4.–10. prosince",
  "11.–17. prosince",
  "18.–23. prosince",
];

// ====== PAGE ======
export default function VanocniStromkyLanding() {
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Derived info for a (future) price recap (still placeholders)
  const recap = useMemo(() => {
    const size = SIZES.find((s) => s.id === selectedSize);
    const addons = ADDONS.filter((a) => selectedAddons.includes(a.id));
    return { size, addons };
  }, [selectedSize, selectedAddons]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-slate-800">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-600 text-white font-bold">
              V
            </span>
            <span className="font-semibold">Vánoce bez starostí</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#ceny" className="hover:text-emerald-700">
              Ceník
            </a>
            <a href="#objednavka" className="hover:text-emerald-700">
              Objednat
            </a>
            <a href="#faq" className="hover:text-emerald-700">
              FAQ
            </a>
            <a href="#kontakt" className="hover:text-emerald-700">
              Kontakt
            </a>
          </nav>
          <a
            href="#objednavka"
            className="inline-flex rounded-2xl bg-emerald-600 px-4 py-2 text-white text-sm shadow hover:bg-emerald-700"
          >
            Objednat stromek
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Vánoce bez starostí
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Dovezeme vám <strong>živý vánoční stromek až domů</strong>, na přání ho
                <strong> ozdobíme</strong> a po svátcích <strong>odvezeme a zrecyklujeme</strong>. Jednoduše,
                ekologicky a v termínu, který si vyberete.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
                {["Výběr z více velikostí", "Přesné časové okno doručení", "Možnost instalace a stojanu", "Odvoz a recyklace po Vánocích"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                      {t}
                    </li>
                  )
                )}
              </ul>
              <div className="mt-8 flex gap-3">
                <a
                  href="#objednavka"
                  className="inline-flex rounded-2xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:-translate-y-0.5 transition"
                >
                  Objednat stromek
                </a>
                <a
                  href="#ceny"
                  className="inline-flex rounded-2xl bg-white px-5 py-3 text-slate-900 font-medium shadow hover:-translate-y-0.5 transition border"
                >
                  Zobrazit ceník
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">Doručujeme: Praha a okolí (doplňte dle potřeby).</p>
            </div>
            <div className="relative">
              <div
                className="aspect-[4/3] rounded-3xl bg-[url('https://images.unsplash.com/photo-1512389142860-9c449e58a543?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center shadow-xl"
                aria-label="Vánoční stromek"
              />
              <div className="absolute -bottom-6 -left-6 hidden md:block h-24 w-24 rounded-3xl bg-emerald-100 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="ceny" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Velikosti a orientační ceny</h2>
        <p className="mt-2 text-slate-600">
          Ceny jsou uvedeny jako placeholdery — upravte je podle reálné nabídky. Doprava v rámci města od ? Kč.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SIZES.map((s) => (
            <div key={s.id} className="rounded-3xl bg-white p-6 shadow border hover:shadow-md transition">
              <div className="text-lg font-semibold">{s.label}</div>
              <div className="mt-2 text-2xl font-extrabold">{s.price}</div>
              <ul className="mt-4 text-sm space-y-1 text-slate-600">
                <li>Čerstvý, voňavý smrk/jedle (doplňte)</li>
                <li>Na přání úprava délky</li>
                <li>Možnost instalace + stojan</li>
              </ul>
              <a
                href="#objednavka"
                className="mt-6 inline-flex rounded-2xl bg-emerald-600 px-4 py-2 text-white text-sm shadow hover:bg-emerald-700"
              >
                Objednat
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="objednavka" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-bold">Nezávazná objednávka</h2>
            <p className="mt-2 text-slate-600">Vyplňte prosím informace — ozveme se s potvrzením a přesným termínem.</p>
            <form className="mt-6 grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="text-sm">Jméno a příjmení</span>
                <input className="mt-1 w-full rounded-xl border p-3" placeholder="Jana Nováková" required />
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm">E‑mail</span>
                  <input type="email" className="mt-1 w-full rounded-xl border p-3" placeholder="jana@email.cz" required />
                </label>
                <label className="block">
                  <span className="text-sm">Telefon</span>
                  <input className="mt-1 w-full rounded-xl border p-3" placeholder="+420 …" required />
                </label>
              </div>
              <label className="block">
                <span className="text-sm">Adresa doručení</span>
                <input className="mt-1 w-full rounded-xl border p-3" placeholder="Ulice, číslo, město" required />
              </label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm">Preferovaný termín</span>
                  <select className="mt-1 w-full rounded-xl border p-3">
                    {DELIVERY_DATES.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm">Velikost stromku</span>
                  <select
                    className="mt-1 w-full rounded-xl border p-3"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {SIZES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <fieldset className="mt-2">
                <legend className="text-sm mb-2">Doplňkové služby</legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADDONS.map((a) => (
                    <label key={a.id} className="flex items-center gap-3 rounded-xl border p-3 bg-white">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(a.id)}
                        onChange={() => toggleAddon(a.id)}
                      />
                      <span className="text-sm flex-1">{a.label}</span>
                      <span className="text-xs text-slate-500">{a.price}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="block">
                <span className="text-sm">Poznámka</span>
                <textarea className="mt-1 w-full rounded-xl border p-3" rows={4} placeholder="Napište specifika — patro, výtah, časové okno…" />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-white font-medium shadow hover:bg-emerald-700"
              >
                Odeslat poptávku
              </button>
              <p className="text-xs text-slate-500">
                Odesláním souhlasíte se zpracováním údajů pro účely vyřízení objednávky. (Doplňte odkaz na zásady.)
              </p>
            </form>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow border">
            <h3 className="text-xl font-semibold">Co je v ceně</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>✔️ Doručení až ke dveřím (vynesení do bytu dle domluvy)</li>
              <li>✔️ Možnost instalace a rovného seříznutí</li>
              <li>✔️ Odvoz a ekologická recyklace po svátcích</li>
              <li>✔️ Potvrzení termínu a 30min časové okno v den doručení</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm">
              <p>
                <strong>Tip:</strong> Poptávka je nezávazná. Cenu potvrdíme podle velikosti, dostupnosti a adresy doručení.
              </p>
            </div>
            {/* Lightweight recap preview */}
            <div className="mt-6 text-sm text-slate-700">
              <div className="font-semibold">Rekapitulace (náhled):</div>
              <div className="mt-1">Velikost: {recap.size?.label ?? "—"}</div>
              <div className="mt-1">
                Doplňky: {recap.addons.length ? recap.addons.map((a) => a.label).join(", ") : "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold">Časté dotazy</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Jaké typy stromků nabízíte?",
              a: "Standardně smrk a jedli (doplňte přesný druh). Každý strom je čerstvě řezaný a skladovaný ve vlhku.",
            },
            {
              q: "Kdy probíhá doručení?",
              a: "Doručujeme v předem domluveném časovém okně v rámci vybraného termínu. O přesném čase informujeme den předem.",
            },
            {
              q: "Zajistíte i ozdobení?",
              a: "Ano, nabízíme profesionální ozdobení přímo u vás doma či ve firmě. V případě zájmu připište do poznámky.",
            },
            {
              q: "Co když nejsem doma?",
              a: "Můžeme domluvit předání sousedovi, recepci nebo bezpečné uložení na místě. Stačí napsat do poznámky.",
            },
          ].map((item) => (
            <div key={item.q} className="rounded-3xl bg-white p-6 shadow border">
              <div className="font-semibold">{item.q}</div>
              <p className="mt-2 text-slate-700 text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <footer id="kontakt" className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-lg font-semibold">Vánoce bez starostí</div>
            <p className="mt-2 text-sm text-slate-600">
              Lokální služba doručení stromků. Fakturační údaje a obchodní podmínky doplníte.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold">Kontakt</div>
            <ul className="mt-2 text-sm text-slate-700">
              <li>E‑mail: info@vasefirma.cz</li>
              <li>Telefon: +420 123 456 789</li>
              <li>Instagram: @vanocestromky</li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Praktické odkazy</div>
            <ul className="mt-2 text-sm text-slate-700">
              <li>
                <a href="#objednavka" className="hover:text-emerald-700">
                  Nezávazná poptávka
                </a>
              </li>
              <li>
                <a href="#ceny" className="hover:text-emerald-700">
                  Ceník
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-700">
                  FAQ
                </a>
              </li>
              <li>
                <span className="text-slate-400">Zásady ochrany osobních údajů (doplňte)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-500 pb-8">
          © {new Date().getFullYear()} Vánoce bez starostí. Všechna práva vyhrazena.
        </div>
      </footer>
    </div>
  );
}

// ====== BUILT-IN RUNTIME TESTS (simple sanity checks) ======
// These are not Jest tests, but quick assertions to catch obvious mistakes.
if (typeof window !== "undefined") {
  try {
    console.assert(Array.isArray(SIZES) && SIZES.length >= 3, "SIZES must contain 3+ items");
    console.assert(SIZES.every((s) => s.id && s.label), "Each size needs id and label");
    console.assert(Array.isArray(ADDONS), "ADDONS must be an array");
    console.assert(
      DELIVERY_DATES.length > 0 && DELIVERY_DATES.every((d) => typeof d === "string"),
      "DELIVERY_DATES must be non-empty array of strings"
    );
    // Additional UI existence check after mount
    window.requestAnimationFrame(() => {
      const hero = document.querySelector("h1");
      console.assert(hero && /Vánoce bez starostí/i.test(hero.textContent || ""), "Hero heading should render");
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Runtime sanity tests failed", e);
  }
}
