import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { COURSES } from '../constants';
import { Play, CheckCircle, Trophy, Clock, X, BarChart2, UploadCloud, FileText, Download, Lock, Check, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import { Course } from '../types';

const Dashboard = () => {
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCelebration, setShowCelebration] = useState<string | null>(null);

  const totalCourses = COURSES.length;
  const progress = Math.round((completedCourses.length / totalCourses) * 100);

  const toggleComplete = (courseId: string) => {
    if (completedCourses.includes(courseId)) {
      setCompletedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      setCompletedCourses(prev => [...prev, courseId]);
      setShowCelebration(courseId);
      setTimeout(() => setShowCelebration(null), 3000);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-navy-900 pb-20">
        {/* Header Stats */}
        <div className="bg-[#05070A] border-b border-white/5 py-8 md:py-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                   <span className="text-xs font-mono text-neon-green tracking-widest uppercase">Terminal Online</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-grotesk font-bold text-white">
                  COMMAND <span className="text-silver/50">CENTER</span>
                </h1>
              </div>
              <div className="bg-navy-800 px-6 py-3 rounded-xl border border-white/10 flex items-center gap-4 shadow-lg">
                 <div className="text-right">
                    <div className="text-[10px] text-silver font-mono uppercase">Current Status</div>
                    <div className="text-sm font-bold text-white">VIP ACTIVE</div>
                 </div>
                 <div className="h-8 w-px bg-white/10"></div>
                 <Trophy className="text-neon-green" size={24} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard 
                 icon={Trophy} 
                 label="Total Progress" 
                 value={`${progress}%`} 
                 subValue="Mastery Level"
                 color="text-neon-green"
                 progress={progress}
              />
              <StatCard 
                 icon={Clock} 
                 label="Hours Studied" 
                 value="12h 45m" 
                 subValue="+2.5h this week"
                 color="text-neon-blue"
              />
              <StatCard 
                 icon={BarChart2} 
                 label="Trading Rank" 
                 value="APPRENTICE" 
                 subValue="Next: JUNIOR"
                 color="text-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-1 h-8 bg-neon-green rounded-full"></span>
                ACTIVE CURRICULUM
             </h2>
             <span className="text-sm text-silver font-mono">{completedCourses.length} / {totalCourses} COMPLETED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course, index) => {
              const isCompleted = completedCourses.includes(course.id);
              return (
                <motion.div
                  key={course.id}
                  layoutId={`course-card-${course.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCourse(course)}
                  className={`
                    relative bg-navy-800 rounded-3xl overflow-hidden border transition-all duration-300 group cursor-pointer
                    ${isCompleted ? 'border-neon-green/30 shadow-[0_0_20px_rgba(0,255,163,0.1)]' : 'border-white/5 hover:border-neon-green/50 hover:shadow-xl hover:-translate-y-2'}
                  `}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-navy-900 overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isCompleted ? 'grayscale opacity-50' : ''}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80" />
                    
                    {/* Floating Status Badge */}
                    <div className="absolute top-4 right-4">
                       {isCompleted ? (
                          <div className="bg-neon-green text-navy-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                             <CheckCircle size={12} /> COMPLETE
                          </div>
                       ) : (
                          <div className="bg-black/50 backdrop-blur text-white px-3 py-1 rounded-full text-xs font-mono border border-white/10">
                             {course.duration}
                          </div>
                       )}
                    </div>

                    {/* Play Icon Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <div className="w-16 h-16 rounded-full bg-neon-green text-navy-900 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,163,0.6)] transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                          <Play size={24} fill="currentColor" className="ml-1" />
                       </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    {/* Progress Bar Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? '100%' : '0%' }}
                          className="h-full bg-neon-green"
                       />
                    </div>

                    <div className="mb-3 flex items-center gap-2">
                       <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 
                         ${course.level === 'Beginner' ? 'text-neon-green' : course.level === 'Intermediate' ? 'text-neon-blue' : 'text-alert'}
                       `}>
                         {course.level}
                       </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-neon-green transition-colors">{course.title}</h3>
                    <p className="text-sm text-silver line-clamp-2 mb-6">{course.description || "Master this module to level up."}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                       <span className="text-xs text-silver font-mono flex items-center gap-1">
                          <FileText size={12} /> {course.modules?.length || 4} Modules
                       </span>
                       <span className="text-xs font-bold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          OPEN INTERFACE <ChevronRight size={14} className="text-neon-green" />
                       </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DETAILED COURSE INTERFACE (LMS OVERLAY) */}
      <AnimatePresence>
        {selectedCourse && (
          <CourseInterface 
             course={selectedCourse} 
             onClose={() => setSelectedCourse(null)} 
             isCompleted={completedCourses.includes(selectedCourse.id)}
             onToggleComplete={() => toggleComplete(selectedCourse.id)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

// --- SUB-COMPONENT: STAT CARD ---
const StatCard = ({ icon: Icon, label, value, subValue, color, progress }: any) => (
   <div className="bg-navy-800 p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
      <div className={`absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
         <Icon size={80} />
      </div>
      <div className="relative z-10">
         <div className="text-xs text-silver font-mono uppercase mb-2 tracking-wider">{label}</div>
         <div className="text-3xl font-bold text-white mb-2 font-grotesk">{value}</div>
         <div className={`text-xs ${color} font-medium`}>{subValue}</div>
      </div>
      {progress !== undefined && (
         <div className="mt-4 w-full h-1.5 bg-navy-900 rounded-full overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1, delay: 0.5 }}
               className={`h-full ${color.replace('text-', 'bg-')}`}
            />
         </div>
      )}
   </div>
);

// --- MAIN SUB-COMPONENT: COURSE INTERFACE ---
const CourseInterface = ({ course, onClose, isCompleted, onToggleComplete }: { course: Course, onClose: () => void, isCompleted: boolean, onToggleComplete: () => void }) => {
   const [activeTab, setActiveTab] = useState<'curriculum' | 'resources' | 'assignment'>('curriculum');
   const [uploadProgress, setUploadProgress] = useState(0);
   const [isUploading, setIsUploading] = useState(false);
   const [uploadComplete, setUploadComplete] = useState(false);

   const handleUpload = () => {
      setIsUploading(true);
      // Simulate upload
      let prog = 0;
      const interval = setInterval(() => {
         prog += 10;
         setUploadProgress(prog);
         if (prog >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadComplete(true);
         }
      }, 300);
   };

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 z-[200] bg-navy-900/95 backdrop-blur-xl overflow-y-auto"
      >
         <div className="min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <div className="h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-12 bg-navy-900 sticky top-0 z-50">
               <div className="flex items-center gap-4">
                  <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-silver hover:text-white transition-colors">
                     <X size={24} />
                  </button>
                  <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>
                  <div>
                     <h2 className="text-white font-bold font-grotesk text-lg md:text-xl">{course.title}</h2>
                     <div className="flex items-center gap-2 text-xs text-silver font-mono">
                        <span className="uppercase">{course.level}</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                     </div>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <Button 
                     onClick={onToggleComplete}
                     variant={isCompleted ? 'outline' : 'primary'}
                     className={`px-4 py-2 text-xs ${isCompleted ? 'border-neon-green text-neon-green' : ''}`}
                  >
                     {isCompleted ? <><CheckCircle size={16} className="mr-2" /> COMPLETED</> : 'MARK COMPLETE'}
                  </Button>
               </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row container mx-auto max-w-7xl p-6 gap-8">
               {/* LEFT COLUMN: PLAYER & INFO */}
               <div className="w-full lg:w-2/3 space-y-6">
                  {/* Video Player Container */}
                  <motion.div 
                     layoutId={`course-card-${course.id}`}
                     className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group"
                  >
                     <iframe 
                        width="100%" 
                        height="100%" 
                        src={`${course.videoUrl}?autoplay=1`} 
                        title="Course Video" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full"
                     ></iframe>
                  </motion.div>

                  <div className="bg-navy-800 rounded-2xl p-6 border border-white/5">
                     <h3 className="text-xl font-bold text-white mb-4">Module Overview</h3>
                     <p className="text-gray-300 leading-relaxed text-sm">
                        {course.description || "In this intensive module, we break down the core concepts required to execute this strategy with institutional precision. Pay close attention to the entry criteria defined in the second half of the lesson."}
                     </p>
                  </div>
               </div>

               {/* RIGHT COLUMN: INTERFACE TABS */}
               <div className="w-full lg:w-1/3 flex flex-col h-[600px] bg-navy-800 rounded-2xl border border-white/5 overflow-hidden">
                  {/* Tabs Header */}
                  <div className="flex border-b border-white/5">
                     {['curriculum', 'resources', 'assignment'].map((tab) => (
                        <button
                           key={tab}
                           onClick={() => setActiveTab(tab as any)}
                           className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 
                              ${activeTab === tab 
                                 ? 'border-neon-green text-white bg-white/5' 
                                 : 'border-transparent text-silver hover:text-white hover:bg-white/5'
                              }`}
                        >
                           {tab}
                        </button>
                     ))}
                  </div>

                  {/* Tabs Content */}
                  <div className="flex-1 overflow-y-auto p-6 relative">
                     {/* CURRICULUM TAB */}
                     {activeTab === 'curriculum' && (
                        <div className="space-y-4">
                           <div className="flex justify-between items-center text-xs text-silver mb-4">
                              <span>PROGRESS</span>
                              <span>0%</span>
                           </div>
                           {(course.modules || [{ title: 'Introduction', duration: '5:00' }, { title: 'Core Concepts', duration: '15:00' }, { title: 'Live Examples', duration: '20:00' }]).map((mod: any, idx: number) => (
                              <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                 <div className="w-8 h-8 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-silver text-xs group-hover:border-neon-green group-hover:text-neon-green transition-colors">
                                    {idx + 1}
                                 </div>
                                 <div className="flex-1">
                                    <div className="text-sm font-bold text-white group-hover:text-neon-green transition-colors">{mod.title}</div>
                                    <div className="text-xs text-silver font-mono">{mod.duration}</div>
                                 </div>
                                 {idx === 0 ? <Play size={14} className="text-neon-green" /> : <Lock size={14} className="text-white/20" />}
                              </div>
                           ))}
                        </div>
                     )}

                     {/* RESOURCES TAB */}
                     {activeTab === 'resources' && (
                        <div className="space-y-4">
                           {(course.resources || [{ title: 'Lesson PDF Summary', type: 'PDF', size: '1.2MB' }, { title: 'Trading Checklist', type: 'IMG', size: '500KB' }]).map((res: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-navy-900 rounded-xl border border-white/5">
                                 <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/5 rounded text-neon-blue"><FileText size={18} /></div>
                                    <div>
                                       <div className="text-sm font-bold text-white">{res.title}</div>
                                       <div className="text-[10px] text-silver font-mono">{res.type} • {res.size}</div>
                                    </div>
                                 </div>
                                 <button className="p-2 hover:bg-white/10 rounded-full text-silver hover:text-white transition-colors">
                                    <Download size={16} />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}

                     {/* ASSIGNMENT TAB (UPLOAD) */}
                     {activeTab === 'assignment' && (
                        <div className="h-full flex flex-col">
                           <div className="text-center mb-6">
                              <h4 className="text-white font-bold mb-2">Module Assessment</h4>
                              <p className="text-xs text-silver">Upload a screenshot of your chart markup identifying the zones discussed in this lesson.</p>
                           </div>

                           {!uploadComplete ? (
                              <div className="flex-1 border-2 border-dashed border-white/10 rounded-xl bg-navy-900/50 flex flex-col items-center justify-center p-6 hover:border-neon-green/50 transition-colors group">
                                 <div className="w-16 h-16 bg-navy-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                    <UploadCloud size={32} className="text-neon-green" />
                                 </div>
                                 <p className="text-sm font-bold text-white mb-1">Drag & Drop or Click to Upload</p>
                                 <p className="text-[10px] text-silver mb-6">Supports JPG, PNG (Max 5MB)</p>
                                 
                                 {isUploading ? (
                                    <div className="w-full max-w-[200px]">
                                       <div className="flex justify-between text-xs text-silver mb-1">
                                          <span>Uploading...</span>
                                          <span>{uploadProgress}%</span>
                                       </div>
                                       <div className="h-2 bg-navy-900 rounded-full overflow-hidden border border-white/10">
                                          <div className="h-full bg-neon-green transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                       </div>
                                    </div>
                                 ) : (
                                    <Button onClick={handleUpload} className="py-2 text-xs">Select File</Button>
                                 )}
                              </div>
                           ) : (
                              <div className="flex-1 flex flex-col items-center justify-center bg-green-500/10 rounded-xl border border-green-500/30">
                                 <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                                    <Check size={32} className="text-navy-900" />
                                 </div>
                                 <h4 className="text-green-500 font-bold text-lg mb-1">Submission Received</h4>
                                 <p className="text-xs text-silver mb-6">+500 XP Earned</p>
                                 <Button variant="outline" onClick={() => setUploadComplete(false)} className="text-xs">Upload Another</Button>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </motion.div>
   );
};

export default Dashboard;