
import React, { useState } from 'react';
import { Home, Sparkles, Smile, GraduationCap, ChevronLeft } from 'lucide-react';
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

  const handleBack = () => {
    if (activeSubject) {
      setActiveSubject(null);
    } else {
      setSelectedGrade(null);
    }
  };

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

  const headerColorClass = !selectedGrade ? 'bg-indigo-600' :
    activeSubject === 'English' ? 'bg-blue-500' :
    activeSubject === 'Mathematics' ? 'bg-green-500' :
    activeSubject === 'EVS' ? 'bg-orange-500' :
    activeSubject === 'Science' ? 'bg-purple-500' :
    activeSubject === 'Creative' ? 'bg-pink-500' : 'bg-indigo-600';

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* App Header - Optimized for Touch */}
      <header className={`px-6 py-4 transition-colors duration-500 ${headerColorClass} text-white shadow-xl z-50 flex-shrink-0`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {(activeSubject || selectedGrade) && (
              <button 
                onClick={handleBack}
                className="w-12 h-12 flex items-center justify-center bg-white/20 active:bg-white/40 rounded-2xl transition-all shadow-inner"
              >
                {activeSubject ? <ChevronLeft size={32} /> : <Home size={28} />}
              </button>
            )}
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-kids tracking-wide leading-none flex items-center gap-2">
                Kiddo Explorer
              </h1>
              {selectedGrade && !activeSubject && (
                <span className="text-sm font-bold text-white/80 uppercase tracking-tighter">ICSE Standard {selectedGrade}</span>
              )}
              {activeSubject && (
                <span className="text-sm font-bold text-white/80 uppercase tracking-tighter">{activeSubject}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!selectedGrade && <Sparkles className="animate-pulse text-yellow-300" />}
            {selectedGrade && (
              <div className="bg-white/20 p-2 rounded-xl flex items-center gap-2 border border-white/30">
                <GraduationCap size={20} className="text-yellow-300" />
                <span className="font-bold text-sm hidden sm:inline">Grade {selectedGrade}</span>
              </div>
            )}
            <Smile size={28} className="text-white/80" />
          </div>
        </div>
      </header>

      {/* App Content Area - Prevent elastic scrolling outside content */}
      <main className="scroll-container bg-yellow-50/50">
        <div className="max-w-7xl mx-auto w-full p-6 md:p-10 h-full">
          {renderContent()}
        </div>
      </main>

      {/* App Footer - Minimal */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-2 text-center text-gray-400 text-xs flex-shrink-0">
        ICSE Primary Portal • Kiddo Friendly Shell
      </footer>
    </div>
  );
};

export default App;
