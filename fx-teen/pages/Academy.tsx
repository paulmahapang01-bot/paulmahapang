import React from 'react';
import { motion } from 'framer-motion';
import { COURSES } from '../constants';
import { PlayCircle, Clock, BarChart } from 'lucide-react';
import Layout from '../components/Layout';

const MotionDiv = motion.div as any;

const Academy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-grotesk font-bold text-white mb-4">FX <span className="text-neon-green">ACADEMY</span></h1>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            From market basics to institutional order flow. Master the skillset that pays you forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COURSES.map((course, index) => (
            <MotionDiv
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-navy-800 rounded-2xl overflow-hidden border border-white/5 group hover:border-neon-green/50 transition-all duration-300"
            >
              <div className="relative aspect-video bg-navy-900 overflow-hidden">
                 <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                    <PlayCircle className="text-white opacity-80 group-hover:text-neon-green group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" size={48} />
                 </div>
                 <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-xs font-mono text-white flex items-center">
                    <Clock size={12} className="mr-1" /> {course.duration}
                 </div>
              </div>
              
              <div className="p-6">
                 <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/5 
                      ${course.level === 'Beginner' ? 'text-neon-green' : course.level === 'Intermediate' ? 'text-neon-blue' : 'text-alert'}
                    `}>
                      {course.level}
                    </span>
                 </div>
                 <h3 className="text-xl font-grotesk font-bold text-white mb-2">{course.title}</h3>
                 <p className="text-sm text-silver line-clamp-2 mb-4">
                    Learn the foundational elements required to execute this strategy with precision.
                 </p>
                 <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-neon-green group-hover:w-full transition-all duration-700 ease-out" />
                 </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Academy;