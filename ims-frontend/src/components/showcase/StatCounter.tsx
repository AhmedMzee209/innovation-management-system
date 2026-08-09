import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export const StatCounter = ({ end, label, suffix = '', prefix = '', duration = 2 }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="text-4xl font-black text-white tracking-tight">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="text-sm font-semibold text-white/70 mt-1 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
};
