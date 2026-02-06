
import React from 'react';
import { BookOpen, Calculator, Leaf, Palette, Microscope, RotateCcw, ChevronRight } from 'lucide-react';
import { Subject, Grade } from '../types.ts';

interface DashboardProps {
  grade: Grade;
  onSelectSubject: (subject: Subject) => void;
  onChangeGrade: () => void;
}

const SubjectCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  onClick: () => void;
}> = ({ title, icon, color, bgColor, description, onClick }) => (
  <button 
    onClick={onClick}
    className={`group relative overflow-hidden bg-white p-8 rounded-[2.5rem] shadow-xl active:scale-95 transition-all duration-200 flex flex-col items-center text-center border-b-[10px] ${color} h-full`}
  >
    <div className={`p-8 rounded-3xl mb-6 ${bgColor} transition-transform group-hover:scale-110 duration-300 shadow-sm`}>
        {icon}
    </div>
    <h3 className="text-3xl font-kids mb-2 text-gray-800 leading-tight">{title}</h3>
    <p className="text-gray-500 text-base font-medium mb-4">{description}</p>
    
    <div className="mt-auto w-full bg-gray-50 py-3 rounded-2xl flex items-center justify-center gap-2 font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
      <span>Let's Start!</span>
      <ChevronRight size={18} />
    </div>

    <div className="absolute -top-4 -right-4 p-2 opacity-5 scale-150 rotate-12">
       {icon}
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ grade, onSelectSubject, onChangeGrade }) => {
  return (
    <div className="space-y-10 animate-fadeIn h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-5xl font-kids text-indigo-700 leading-tight">Welcome, Explorer!</h2>
          <p className="text-2xl text-gray-500 font-medium italic">Standard {grade} ICSE Adventure</p>
        </div>
        <button 
          onClick={onChangeGrade}
          className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-600 rounded-3xl shadow-lg border-2 border-indigo-50 active:scale-95 transition-all font-bold text-lg"
        >
          <RotateCcw size={22} />
          Change My Grade
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        <SubjectCard 
          title="English Story"
          description="Read & Adventure"
          icon={<BookOpen size={64} className="text-blue-500" />}
          color="border-blue-500"
          bgColor="bg-blue-50"
          onClick={() => onSelectSubject('English')}
        />
        <SubjectCard 
          title="Math Magic"
          description="Fun Number Puzzles"
          icon={<Calculator size={64} className="text-green-500" />}
          color="border-green-500"
          bgColor="bg-green-50"
          onClick={() => onSelectSubject('Mathematics')}
        />
        <SubjectCard 
          title="Science Lab"
          description="Magic Experiments"
          icon={<Microscope size={64} className="text-purple-500" />}
          color="border-purple-500"
          bgColor="bg-purple-50"
          onClick={() => onSelectSubject('Science')}
        />
        <SubjectCard 
          title="EVS World"
          description="Nature & Our Body"
          icon={<Leaf size={64} className="text-orange-500" />}
          color="border-orange-500"
          bgColor="bg-orange-50"
          onClick={() => onSelectSubject('EVS')}
        />
        <SubjectCard 
          title="Art Studio"
          description="Draw & Create"
          icon={<Palette size={64} className="text-pink-500" />}
          color="border-pink-500"
          bgColor="bg-pink-50"
          onClick={() => onSelectSubject('Creative')}
        />
      </div>

      <div className="mt-auto bg-white/60 rounded-[3rem] p-10 flex flex-col lg:flex-row items-center gap-10 border-2 border-white shadow-xl">
        <div className="flex-1 space-y-6">
          <h3 className="text-4xl font-kids text-indigo-800">You're doing great!</h3>
          <p className="text-xl text-indigo-900/70 font-medium leading-relaxed">
            In Standard {grade}, we learn so many wonderful things. Pick a box above to start your lesson. Don't forget to take a break and drink some water!
          </p>
        </div>
        <div className="w-full lg:w-64 h-64 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl overflow-hidden p-3 border-4 border-indigo-100 rotate-2">
           <img src={`https://picsum.photos/seed/icse-grade-${grade}/400/400`} alt="Class Activity" className="w-full h-full object-cover rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
