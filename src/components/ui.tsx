import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/** Fade-up reveal wrapper driven by Framer Motion. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section header with number kicker. */
export function SectionHead({
  num,
  title,
  children,
}: {
  num: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <div className="font-mono text-[0.8rem] tracking-[0.3em] text-ember">
        {num}
      </div>
      <h2 className="mt-3 mb-4 font-serif text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1] font-[420] tracking-tight">
        {title}
      </h2>
      {children && (
        <p className="text-[1.05rem] font-light text-paper-dim">{children}</p>
      )}
    </Reveal>
  );
}

/** Animated number counter that springs up when scrolled into view. */
export function Counter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1400, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      }),
    [spring, suffix],
  );

  return <span ref={ref}>0{suffix}</span>;
}
