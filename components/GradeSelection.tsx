
import React from 'react';
import { Grade } from '../types';
import { Star, GraduationCap, Sparkles } from 'lucide-react';

interface GradeSelectionProps {
  onSelectGrade: (grade: Grade) => void;
}

const GradeCard: React.FC<{ grade: Grade; onClick: () => void; color: string; bgColor: string }> = ({ grade, onClick, color, bgColor }) => (
  <button
    onClick={onClick}
    className={`${bgColor} p-10 rounded-[3rem] shadow-xl active:scale-95 transition-all flex flex-col items-center gap-6 border-b-[12px] ${color} group h-full`}
  >
    <div className="bg-white p-6 rounded-[2rem] shadow-lg group-hover:scale-110 transition-transform border-4 border-white">
      <GraduationCap size={64} className={color.replace('border-', 'text-')} />
    </div>
    <div className="text-center">
      <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm mb-1">Standard</p>
      <h3 className={`text-7xl font-kids ${color.replace('border-', 'text-')} leading-none`}>{grade}</h3>
    </div>
    <div className="flex gap-2">
      {Array.from({ length: grade }).map((_, i) => (
        <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  </button>
);

const GradeSelection: React.FC<GradeSelectionProps> = ({ onSelectGrade }) => {
  return (
    <div className="min-h-full flex flex-col justify-center space-y-16 py-10 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 bg-indigo-100 text-indigo-600 px-6 py-2 rounded-full font-bold text-lg mb-4">
          <Sparkles size={20} /> Welcome to ICSE Academy
        </div>
        <h2 className="text-6xl md:text-7xl font-kids text-indigo-700 leading-tight">Pick Your Class!</h2>
        <p className="text-2xl text-gray-500 font-medium italic">Learning is an adventure!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto w-full">
        <GradeCard grade={1} onClick={() => onSelectGrade(1)} color="border-red-500" bgColor="bg-red-50" />
        <GradeCard grade={2} onClick={() => onSelectGrade(2)} color="border-green-500" bgColor="bg-green-50" />
        <GradeCard grade={3} onClick={() => onSelectGrade(3)} color="border-blue-500" bgColor="bg-blue-50" />
        <GradeCard grade={4} onClick={() => onSelectGrade(4)} color="border-orange-500" bgColor="bg-orange-50" />
        <GradeCard grade={5} onClick={() => onSelectGrade(5)} color="border-purple-500" bgColor="bg-purple-50" />
      </div>

      <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border-2 border-white shadow-inner text-center italic text-gray-400 text-xl font-medium">
        "Education is the most powerful weapon which you can use to change the world."
      </div>
    </div>
  );
};

export default GradeSelection;
