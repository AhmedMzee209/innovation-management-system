import { Hero } from '@/components/public/home/Hero';

import { Features } from '@/components/public/home/Features';
import { Timeline } from '@/components/public/home/Timeline';
import { Statistics } from '@/components/public/home/Statistics';
import { CallToAction } from '@/components/public/home/CallToAction';
import { motion } from 'framer-motion';
// We would import other sections like FeaturedInnovations, Hubs, etc. here

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />

      <Features />
      <Timeline />
      <Statistics />
      <CallToAction />
    </motion.div>
  );
};
