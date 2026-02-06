
import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Smile, GraduationCap } from 'lucide-react';
import { Subject, Grade } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import EnglishSection from './components/EnglishSection.tsx';
import MathSection from './components/MathSection.tsx';
import EVSSection from './components/EVSSection.tsx';
import ScienceSection from './components/ScienceSection.tsx';
import GradeSelection from './components/GradeSelection.tsx';
import CreativeSection from './components/CreativeSection.tsx';

const App: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  const renderContent = () => {
    if (!selectedGrade) {
      return <GradeSelection onSelectGrade={setSelectedGrade} />;
    }

    switch (activeSubject) {
      case 'English':
        return <EnglishSection grade={selectedGrade} onBack={() => setActiveSubject(null)} />;
      case 'Mathematics':
        return <MathSection grade={selectedGrade} onBack={() => setActiveSubject(null)} />;
      case 'EVS':
        return <EVSSection grade={selectedGrade} onBack={() => setActiveSubject(null)} />;
      case 'Science':
        return <ScienceSection grade={selectedGrade} onBack={() => setActiveSubject(null)} />;
      case 'Creative':
        return <CreativeSection grade={selectedGrade} onBack={() => setActiveSubject(null)} />;
      default:
        return <Dashboard grade={selectedGrade} onSelectSubject={setActiveSubject} onChangeGrade={() => setSelectedGrade(null)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-yellow-50">
      {/* Header */}
      <header className={`p-4 transition-colors duration-500 ${
        !selectedGrade ? 'bg-indigo-600' :
        activeSubject === 'English' ? 'bg-blue-400' :
        activeSubject === 'Mathematics' ? 'bg-green-400' :
        activeSubject === 'EVS' ? 'bg-orange-400' :
        activeSubject === 'Science' ? 'bg-purple-400' :
        activeSubject === 'Creative' ? 'bg-pink-400' : 'bg-indigo-500'
      } text-white shadow-lg sticky top-0 z-50`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {(activeSubject || selectedGrade) && (
              <button 
                onClick={() => activeSubject ? setActiveSubject(null) : setSelectedGrade(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                title="Go Back"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <h1 className="text-2xl md:text-3xl font-kids tracking-wider flex items-center gap-2">
              <Sparkles className="hidden md:block" />
              ICSE Kiddo Explorer
              <Smile className="hidden md:block" />
            </h1>
          </div>
          
          {selectedGrade && (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedGrade(null)}
                className="hidden md:flex bg-white/20 px-3 py-1 rounded-full items-center gap-2 hover:bg-white/30 transition-all"
              >
                <GraduationCap size={18} className="text-yellow-300" />
                <span className="font-bold">Standard {selectedGrade}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 p-4 text-center text-gray-500 text-sm">
        <p>© 2024 Kiddo Explorer - Fun learning for ICSE Standards 1 to 5!</p>
      </footer>
    </div>
  );
};

export default App;
