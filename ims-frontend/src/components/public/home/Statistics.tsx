import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { STATISTICS } from '@/data/dummy';

const AnimatedCounter = ({ value, isFloat = false }: { value: number; isFloat?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { 
    duration: 2500, 
    bounce: 0,
    damping: 20,
    stiffness: 45
  });
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  const displayValue = useTransform(springValue, (latest) => {
    return isFloat ? latest.toFixed(1) : Math.floor(latest).toString();
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const Statistics = () => {
  return (
    <section className="py-14" style={{ background: 'linear-gradient(135deg, #0d2137 0%, #0098c8 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {STATISTICS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center bg-white/10 rounded-xl py-6 px-3 backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1 flex items-center justify-center">
                {stat.prefix}
                <AnimatedCounter value={stat.value} isFloat={stat.value % 1 !== 0} />
                {stat.suffix}
              </div>
              <div
                className="w-6 h-0.5 my-2"
                style={{ backgroundColor: '#e8b800' }}
              />
              <div className="text-xs text-blue-100 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
