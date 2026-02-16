import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES, LEADERBOARD_DATA, NEWS_DATA } from '../constants';
import { 
  Play, CheckCircle, Trophy, Clock, X, BarChart2, UploadCloud, FileText, 
  Download, Lock, Check, ChevronRight, Globe, TrendingUp, Medal, Video, 
  AlertCircle, LayoutDashboard, Target, BookOpen, Radio, Settings, LogOut,
  Menu, Bell, Search, AlertTriangle, PlayCircle as PlayCircleIcon
} from 'lucide-react';
import Button from '../components/Button';
import { Course } from '../types';

const MotionDiv = motion.div as any;

// --- 0. CONSTANTS & CONFIGURATION ---
const VIEWS = {
  OVERVIEW: 'overview',
  VISION: 'vision',
  COURSES: 'courses',
  LIVE: 'live',
  SETTINGS: 'settings'
};

// --- 1. THE "AIRBAG" (Error Boundary) ---
interface ErrorBoundaryProps {
  children?: ReactNode;
  resetView: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class DashboardErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Dashboard Module Crash:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    this.props.resetView(); // Reset to overview to recover
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center border-2 border-dashed border-red-500/30 bg-red-500/5 rounded-3xl m-8">
           <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <AlertTriangle size={32} className="text-red-500" />
           </div>
           <h2 className="text-2xl font-bold text-white mb-2">MODULE OFFLINE</h2>
           <p className="text-silver max-w-md mb-6">
              The requested view encountered a critical error. The safety protocol has isolated this crash to prevent a full system failure.
           </p>
           <button 
              onClick={this.handleReset}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]"
           >
              REBOOT MODULE
           </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// --- 2. THE "SAFE-NAV" COMPONENT (SidebarButton) ---
interface SidebarButtonProps {
  label: string;
  icon: any;
  isActive: boolean;
  onClick: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ label, icon: Icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-4 transition-all duration-300 border-l-4 group relative overflow-hidden ${
        isActive 
          ? 'bg-neon-green/10 border-neon-green text-neon-green' 
          : 'border-transparent text-silver hover:bg-white/5 hover:text-white'
      }`}
    >
      {/* Active Glow Background */}
      {isActive && (
         <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-transparent opacity-50" />
      )}
      
      <div className="relative z-10 flex items-center gap-3">
         <Icon size={20} className={`transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_5px_rgba(0,255,163,0.8)]' : 'group-hover:scale-110'}`} />
         <span className={`font-bold font-grotesk tracking-wide uppercase text-sm ${isActive ? 'text-neon-green' : ''}`}>
            {label}
         </span>
      </div>
    </button>
  );
};

// --- 3. THE MAIN DASHBOARD LAYOUT ---
const Dashboard = () => {
  const [currentView, setCurrentView] = useState(VIEWS.OVERVIEW);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Shared Data State
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const toggleComplete = (courseId: string) => {
    if (completedCourses.includes(courseId)) {
      setCompletedCourses(prev => prev.filter(id => id !== courseId));
    } else {
      setCompletedCourses(prev => [...prev, courseId]);
    }
  };

  const handleSidebarClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-navy-900 text-white font-inter overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#05070A] border-r border-white/5 transform transition-transform duration-300 lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <span className="text-2xl font-black tracking-tighter text-white cursor-pointer" onClick={() => setCurrentView(VIEWS.OVERVIEW)}>
             FX <span className="text-neon-green">TEEN</span>
          </span>
        </div>

        {/* Safe Navigation */}
        <div className="flex flex-col py-6 space-y-1 h-[calc(100vh-160px)] overflow-y-auto">
          <div className="px-6 pb-2 text-[10px] text-silver/50 font-mono uppercase tracking-widest">Main Terminal</div>
          
          <SidebarButton 
             label="Overview" 
             icon={LayoutDashboard} 
             isActive={currentView === VIEWS.OVERVIEW} 
             onClick={() => handleSidebarClick(VIEWS.OVERVIEW)} 
          />
          <SidebarButton 
             label="Academy" 
             icon={BookOpen} 
             isActive={currentView === VIEWS.COURSES} 
             onClick={() => handleSidebarClick(VIEWS.COURSES)} 
          />
          <SidebarButton 
             label="Vision Board" 
             icon={Target} 
             isActive={currentView === VIEWS.VISION} 
             onClick={() => handleSidebarClick(VIEWS.VISION)} 
          />
          <SidebarButton 
             label="Live Room" 
             icon={Radio} 
             isActive={currentView === VIEWS.LIVE} 
             onClick={() => handleSidebarClick(VIEWS.LIVE)} 
          />
          
          <div className="px-6 py-4 text-[10px] text-silver/50 font-mono uppercase tracking-widest">System</div>
          
          <SidebarButton 
             label="Settings" 
             icon={Settings} 
             isActive={currentView === VIEWS.SETTINGS} 
             onClick={() => handleSidebarClick(VIEWS.SETTINGS)} 
          />
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 bg-[#05070A]">
          <button 
            onClick={() => console.log("Logging out safely...")}
            className="flex items-center gap-3 text-silver hover:text-red-500 transition-colors w-full group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            <span className="text-sm font-bold">Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-navy-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 shrink-0 z-40">
           <div className="flex items-center gap-4">
              <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                 <Menu size={24} />
              </button>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider hidden md:block">
                 {currentView}
              </h2>
           </div>

           <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center bg-navy-800 rounded-full px-4 py-2 border border-white/5">
                 <Search size={14} className="text-silver mr-2" />
                 <input type="text" placeholder="Search terminal..." className="bg-transparent border-none text-xs text-white focus:outline-none w-48" />
              </div>
              <button className="relative text-silver hover:text-white">
                 <Bell size={20} />
                 <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center text-neon-green font-bold text-xs">
                 JD
              </div>
           </div>
        </header>

        {/* Viewport with Error Boundary */}
        <main className="flex-1 overflow-y-auto p-6 scroll-smooth bg-navy-900">
           <DashboardErrorBoundary resetView={() => setCurrentView(VIEWS.OVERVIEW)}>
              <AnimatePresence mode="wait">
                 <MotionDiv 
                   key={currentView}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.2 }}
                   className="max-w-7xl mx-auto pb-20"
                 >
                    {currentView === VIEWS.OVERVIEW && (
                       <DashboardOverview 
                          completedCourses={completedCourses} 
                          totalCourses={COURSES.length} 
                          onSelectCourse={setSelectedCourse}
                       />
                    )}
                    {currentView === VIEWS.COURSES && (
                       <CoursesList 
                          completedCourses={completedCourses} 
                          onSelectCourse={setSelectedCourse} 
                       />
                    )}
                    {currentView === VIEWS.VISION && <VisionBoard />}
                    {currentView === VIEWS.LIVE && <LiveTradingRoom />}
                    {currentView === VIEWS.SETTINGS && <ProfileSettings />}
                 </MotionDiv>
              </AnimatePresence>
           </DashboardErrorBoundary>
        </main>
      </div>

      {/* Global Modals */}
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

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

// --- VIEW COMPONENTS ---

const DashboardOverview = ({ completedCourses, totalCourses, onSelectCourse }: any) => {
   const progress = Math.round((completedCourses.length / totalCourses) * 100);

   return (
      <div className="space-y-8">
         {/* Welcome Banner */}
         <div className="bg-gradient-to-r from-[#05070A] to-navy-800 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
               <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-white mb-2">
                  WELCOME BACK, <span className="text-neon-green">TRADER</span>
               </h1>
               <p className="text-silver max-w-xl">
                  Market volatility is high today. Check the live feed for updated zones before entering any positions.
               </p>
            </div>
         </div>

         {/* Stats Grid */}
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

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Access to Courses */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                     <BookOpen size={18} className="text-neon-green" /> CONTINUE LEARNING
                  </h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COURSES.slice(0, 2).map((course, idx) => (
                     <div 
                        key={course.id}
                        onClick={() => onSelectCourse(course)}
                        className="bg-navy-800 p-4 rounded-xl border border-white/5 hover:border-neon-green/50 cursor-pointer group transition-all"
                     >
                        <div className="aspect-video bg-black rounded-lg mb-4 overflow-hidden relative">
                           <img src={course.thumbnail} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <PlayCircleIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-0 group-hover:scale-100" />
                           </div>
                        </div>
                        <h4 className="font-bold text-white text-sm mb-1 group-hover:text-neon-green transition-colors">{course.title}</h4>
                        <p className="text-xs text-silver">{course.duration} • {course.level}</p>
                     </div>
                  ))}
               </div>
            </div>

            {/* Mini Leaderboard */}
            <div className="bg-navy-800 rounded-2xl border border-white/5 p-6">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                     <Medal size={18} className="text-yellow-500" /> TOP PERFORMERS
                  </h3>
               </div>
               <div className="space-y-4">
                  {LEADERBOARD_DATA.slice(0, 5).map((trader) => (
                     <div key={trader.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${trader.rank === 1 ? 'bg-yellow-500 text-black' : 'bg-white/10 text-silver'}`}>
                              {trader.rank}
                           </div>
                           <span className="text-sm font-medium text-white">{trader.name}</span>
                        </div>
                        <span className="text-xs font-mono text-neon-green">{trader.profit}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

const VisionBoard = () => {
   const goals = [
      { id: 1, text: "Funded Account ($100k)", image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000", status: "In Progress" },
      { id: 2, text: "Dubai Penthouse", image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?auto=format&fit=crop&q=80&w=1000", status: "Locked" },
      { id: 3, text: "Freedom", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000", status: "Loading..." },
      { id: 4, text: "Dream Car", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1000", status: "Target 2025" },
   ];

   return (
      <div className="space-y-8">
         <div className="text-center mb-12">
            <h2 className="text-4xl font-grotesk font-bold text-white mb-4">MANIFEST <span className="text-neon-green">REALITY</span></h2>
            <p className="text-silver">Visualise the target. Execute the plan.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {goals.map((goal) => (
               <div key={goal.id} className="group relative aspect-video rounded-3xl overflow-hidden border border-white/5 hover:border-neon-green transition-all duration-500 cursor-pointer">
                  <img src={goal.image} alt={goal.text} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                     <h3 className="text-3xl font-black text-white uppercase tracking-tighter shadow-black drop-shadow-lg">{goal.text}</h3>
                     <span className="mt-2 px-3 py-1 bg-neon-green text-navy-900 text-xs font-bold uppercase rounded">{goal.status}</span>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

const CoursesList = ({ completedCourses, onSelectCourse }: any) => {
   return (
      <div className="space-y-8">
         <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">ACADEMY <span className="text-neon-green">CURRICULUM</span></h2>
            <p className="text-silver">Institutional grade education. Phase by phase.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.map((course) => {
               const isCompleted = completedCourses.includes(course.id);
               return (
                  <div 
                     key={course.id}
                     onClick={() => onSelectCourse(course)}
                     className={`
                        group relative bg-navy-800 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer
                        ${isCompleted ? 'border-neon-green/30 opacity-75' : 'border-white/5 hover:border-neon-green/50 hover:-translate-y-2'}
                     `}
                  >
                     <div className="aspect-video bg-black relative overflow-hidden">
                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover" />
                        {isCompleted && (
                           <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <CheckCircle size={48} className="text-neon-green" />
                           </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded font-mono">
                           {course.duration}
                        </div>
                     </div>
                     <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                           <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/5 ${
                              course.level === 'Beginner' ? 'text-neon-green' : course.level === 'Intermediate' ? 'text-neon-blue' : 'text-purple-500'
                           }`}>
                              {course.level}
                           </span>
                        </div>
                        <h3 className="font-bold text-white text-lg mb-2 leading-tight group-hover:text-neon-green transition-colors">
                           {course.title}
                        </h3>
                        <p className="text-xs text-silver line-clamp-2">
                           {course.description || "Master the markets with this essential module."}
                        </p>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
};

const LiveTradingRoom = () => (
   <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 bg-navy-800/50 rounded-3xl border border-white/5 border-dashed">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
         <Radio size={40} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">TRADING FLOOR OFFLINE</h2>
      <p className="text-silver max-w-md mb-8">
         The New York session has ended. Next live session starts in <span className="text-neon-green font-mono">08:14:22</span>.
      </p>
      <Button variant="outline">View Session Schedule</Button>
   </div>
);

const ProfileSettings = () => (
   <div className="max-w-2xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-white">SYSTEM PREFERENCES</h2>
      
      <div className="bg-navy-800 p-6 rounded-2xl border border-white/5 space-y-6">
         <div className="space-y-2">
            <label className="text-sm text-silver font-bold uppercase">Display Name</label>
            <input type="text" defaultValue="Jason Doe" className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-green outline-none" />
         </div>
         <div className="space-y-2">
            <label className="text-sm text-silver font-bold uppercase">Email Uplink</label>
            <input type="email" defaultValue="jason@fxteen.com" disabled className="w-full bg-navy-900 border border-white/10 rounded-lg px-4 py-3 text-silver/50 cursor-not-allowed" />
         </div>
         <div className="pt-4 border-t border-white/5">
            <h3 className="text-white font-bold mb-4">Notifications</h3>
            <div className="space-y-3">
               <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-neon-green w-4 h-4" />
                  <span className="text-sm text-silver">Live Signal Alerts</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-neon-green w-4 h-4" />
                  <span className="text-sm text-silver">Mentorship Reminders</span>
               </label>
            </div>
         </div>
         <div className="pt-4">
            <Button>Save Configuration</Button>
         </div>
      </div>
   </div>
);

// --- SHARED SUB-COMPONENTS ---

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
            <MotionDiv 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 1, delay: 0.5 }}
               className={`h-full ${color.replace('text-', 'bg-')}`}
            />
         </div>
      )}
   </div>
);

// --- COURSE INTERFACE (REUSED) ---
const CourseInterface = ({ course, onClose, isCompleted, onToggleComplete }: { course: Course, onClose: () => void, isCompleted: boolean, onToggleComplete: () => void }) => {
   const [activeTab, setActiveTab] = useState<'curriculum' | 'resources' | 'assignment'>('curriculum');
   const [uploadProgress, setUploadProgress] = useState(0);
   const [isUploading, setIsUploading] = useState(false);
   const [uploadComplete, setUploadComplete] = useState(false);

   const handleUpload = () => {
      setIsUploading(true);
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
      <MotionDiv
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 z-[200] bg-navy-900/95 backdrop-blur-xl overflow-y-auto"
      >
         <div className="min-h-screen flex flex-col">
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
               <div className="w-full lg:w-2/3 space-y-6">
                  <MotionDiv 
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
                  </MotionDiv>

                  <div className="bg-navy-800 rounded-2xl p-6 border border-white/5">
                     <h3 className="text-xl font-bold text-white mb-4">Module Overview</h3>
                     <p className="text-gray-300 leading-relaxed text-sm">
                        {course.description || "In this intensive module, we break down the core concepts required to execute this strategy with institutional precision. Pay close attention to the entry criteria defined in the second half of the lesson."}
                     </p>
                  </div>
               </div>

               <div className="w-full lg:w-1/3 flex flex-col h-[600px] bg-navy-800 rounded-2xl border border-white/5 overflow-hidden">
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

                  <div className="flex-1 overflow-y-auto p-6 relative">
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
      </MotionDiv>
   );
};

export default Dashboard;