
import React from 'react';
import { BookOpen, Calculator, Leaf, Palette, Microscope, RotateCcw } from 'lucide-react';
import { Subject, Grade } from '../types';

interface DashboardProps {
  grade: Grade;
  onSelectSubject: (subject: Subject) => void;
  onChangeGrade: () => void;
}

const SubjectCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  onClick: () => void;
}> = ({ title, icon, color, description, onClick }) => (
  <button 
    onClick={onClick}
    className={`group relative overflow-hidden bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border-b-8 ${color}`}
  >
    <div className={`p-6 rounded-full mb-6 transition-transform group-hover:scale-110 duration-300`}>
        {icon}
    </div>
    <h3 className="text-2xl font-kids mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
    <div className="absolute top-0 right-0 p-2 opacity-10">
       {icon}
    </div>
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ grade, onSelectSubject, onChangeGrade }) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left space-y-1">
          <h2 className="text-4xl font-kids text-indigo-700">Standard {grade} Explorer!</h2>
          <p className="text-xl text-gray-600">Ready for some brainy fun?</p>
        </div>
        <button 
          onClick={onChangeGrade}
          className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-full shadow-md hover:bg-indigo-50 transition-all font-bold"
        >
          <RotateCcw size={18} />
          Change Grade
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <SubjectCard 
          title="English Adventure"
          description={`Grade ${grade} Reading & Choices`}
          icon={<BookOpen size={48} className="text-blue-500" />}
          color="border-blue-500"
          onClick={() => onSelectSubject('English')}
        />
        <SubjectCard 
          title="Math Magic"
          description={`Grade ${grade} Challenges`}
          icon={<Calculator size={48} className="text-green-500" />}
          color="border-green-500"
          onClick={() => onSelectSubject('Mathematics')}
        />
        <SubjectCard 
          title="Science Zone"
          description={`Standard ${grade} Lab`}
          icon={<Microscope size={48} className="text-purple-500" />}
          color="border-purple-500"
          onClick={() => onSelectSubject('Science')}
        />
        <SubjectCard 
          title="EVS Explorer"
          description={`Discover the World`}
          icon={<Leaf size={48} className="text-orange-500" />}
          color="border-orange-500"
          onClick={() => onSelectSubject('EVS')}
        />
        <SubjectCard 
          title="Creative Corner"
          description="Art & Inspiration"
          icon={<Palette size={48} className="text-pink-500" />}
          color="border-pink-500"
          onClick={() => onSelectSubject('Creative')}
        />
      </div>

      <div className="bg-gradient-to-r from-indigo-100 to-blue-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-inner border border-white">
        <div className="flex-1 space-y-4">
          <h3 className="text-2xl font-kids text-indigo-800">Learning never stops!</h3>
          <p className="text-lg text-indigo-900 leading-relaxed">
            Every grade brings new wonders. Whether you are adding tiny numbers in Grade 1 or exploring complex ecosystems in Grade 5, you are doing an amazing job!
          </p>
        </div>
        <div className="w-full md:w-48 h-48 bg-white rounded-2xl flex items-center justify-center shadow-md overflow-hidden p-2">
           <img src={`https://picsum.photos/seed/icse-grade-${grade}/200/200`} alt="Class Activity" className="w-full h-full object-cover rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
