import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "./components/Hero";
import UnderHood from "./components/UnderHood";
import Quiz from "./components/Quiz";
import { Capabilities, Playbook, Money, Creative } from "./components/Sections";

const NAV = [
  ["#capabilities", "Capabilities"],
  ["#under-hood", "Under the Hood"],
  ["#playbook", "Playbook"],
  ["#money", "Earn"],
  ["#creative", "Create"],
  ["#quiz", "Quiz"],
] as const;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-[5vw] py-4 backdrop-blur-xl transition-colors ${
        scrolled ? "hairline bg-ink/70" : "border-transparent bg-ink/70"
      }`}
    >
      <a href="#top" className="font-serif text-xl font-semibold tracking-wide">
        Claude <em className="text-gold italic">Fable&nbsp;5</em>
      </a>
      <ul className="hidden gap-7 md:flex">
        {NAV.map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              className="text-[0.85rem] tracking-wider text-paper-dim uppercase transition hover:text-gold"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-gold to-ember"
        style={{ scaleX: progress }}
      />
      <Nav />
      <Hero />
      <Capabilities />
      <UnderHood />
      <Playbook />
      <Money />
      <Creative />
      <Quiz />
      <footer className="hairline border-t px-[6vw] py-14 text-center text-[0.85rem] text-paper-dim">
        <p className="mb-3.5 font-serif text-2xl italic">
          Now go give it something <span className="text-gold">hard</span>.
        </p>
        <p>
          Built with Claude · React + Three.js + Framer Motion · Model ID{" "}
          <span className="font-mono text-gold">claude-fable-5</span> · Docs at{" "}
          <a
            href="https://platform.claude.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold"
          >
            platform.claude.com
          </a>
        </p>
        <p className="mx-auto mt-3.5 max-w-3xl text-[0.74rem] opacity-70">
          This is an independent educational guide. Pricing ($10/$50 per 1M
          tokens), limits, and behavior described here reflect documentation as
          of mid-2026 and may change — verify against official Anthropic
          documentation before building. Income figures are illustrative;
          nothing here is financial advice.
        </p>
      </footer>
    </>
  );
}
