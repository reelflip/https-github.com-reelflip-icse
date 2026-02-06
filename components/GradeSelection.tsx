
import React from 'react';
import { Grade } from '../types';
import { Star, GraduationCap } from 'lucide-react';

interface GradeSelectionProps {
  onSelectGrade: (grade: Grade) => void;
}

const GradeCard: React.FC<{ grade: Grade; onClick: () => void; color: string; bgColor: string }> = ({ grade, onClick, color, bgColor }) => (
  <button
    onClick={onClick}
    className={`${bgColor} p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 flex flex-col items-center gap-4 border-b-8 ${color} group`}
  >
    <div className="bg-white p-4 rounded-full shadow-inner group-hover:scale-110 transition-transform">
      <GraduationCap size={48} className={color.replace('border-', 'text-')} />
    </div>
    <div className="text-center">
      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Standard</p>
      <h3 className={`text-5xl font-kids ${color.replace('border-', 'text-')}`}>{grade}</h3>
    </div>
    <div className="flex gap-1">
      {Array.from({ length: grade }).map((_, i) => (
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  </button>
);

const GradeSelection: React.FC<GradeSelectionProps> = ({ onSelectGrade }) => {
  return (
    <div className="space-y-12 animate-fadeIn py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-kids text-indigo-700">Choose Your Class!</h2>
        <p className="text-xl text-gray-600">Which grade are you in today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        <GradeCard grade={1} onClick={() => onSelectGrade(1)} color="border-red-500" bgColor="bg-red-50" />
        <GradeCard grade={2} onClick={() => onSelectGrade(2)} color="border-green-500" bgColor="bg-green-50" />
        <GradeCard grade={3} onClick={() => onSelectGrade(3)} color="border-blue-500" bgColor="bg-blue-50" />
        <GradeCard grade={4} onClick={() => onSelectGrade(4)} color="border-orange-500" bgColor="bg-orange-50" />
        <GradeCard grade={5} onClick={() => onSelectGrade(5)} color="border-purple-500" bgColor="bg-purple-50" />
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md border-l-4 border-indigo-500 text-center italic text-gray-600">
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go!" — Dr. Seuss
      </div>
    </div>
  );
};

export default GradeSelection;
