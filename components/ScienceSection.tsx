
import React, { useState, useEffect } from 'react';
import { Beaker, RefreshCw, Zap, Microscope, Info } from 'lucide-react';
import { getScienceExperiment } from '../services/geminiService.ts';
import { ScienceExperiment, Grade } from '../types.ts';

const ScienceSection: React.FC<{ grade: Grade; onBack: () => void }> = ({ grade, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [experiment, setExperiment] = useState<ScienceExperiment | null>(null);
  const [topic, setTopic] = useState('');

  const syllabusScience: Record<number, string[]> = {
    1: ['Living Things'],
    2: ['States of Matter', 'Animal Habitats'],
    3: ['Force and Motion'],
    4: ['Digestive System'],
    5: ['Simple Machines']
  };

  const currentTopics = syllabusScience[grade] || syllabusScience[2];

  const loadExperiment = async (newTopic: string) => {
    setLoading(true);
    try {
      const data = await getScienceExperiment(grade, newTopic);
      setExperiment(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialTopic = currentTopics[0];
    setTopic(initialTopic);
    loadExperiment(initialTopic);
  }, [grade]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin text-purple-500"><RefreshCw size={48} /></div>
        <p className="text-xl font-kids text-purple-600">Entering Standard {grade} Science Lab...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex gap-4 overflow-x-auto pb-4 justify-center no-scrollbar">
        {currentTopics.map((t) => (
          <button
            key={t}
            onClick={() => { setTopic(t); loadExperiment(t); }}
            className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-md whitespace-nowrap ${
              topic === t ? 'bg-purple-600 text-white scale-105' : 'bg-white text-purple-600 border border-purple-100'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-purple-500 space-y-6">
          <div className="flex items-center gap-3">
            <Beaker className="text-purple-500" size={32} />
            <h2 className="text-3xl font-kids text-purple-600">{experiment?.title}</h2>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 text-indigo-700">
              <Zap className="text-yellow-500" size={20} /> What you need:
            </h3>
            <div className="flex flex-wrap gap-2">
              {experiment?.materials.map((m, i) => (
                <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-bold border border-purple-100">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-indigo-700">The Discovery Plan:</h3>
            <ol className="space-y-3">
              {experiment?.steps.map((s, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="bg-purple-100 text-purple-700 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 pt-1">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl text-white space-y-4">
            <h3 className="text-2xl font-kids flex items-center gap-2">
              <Microscope size={28} /> The Science Secret
            </h3>
            <p className="text-lg leading-relaxed opacity-90 italic">
              {experiment?.explanation}
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-dashed border-purple-200 flex flex-col items-center justify-center text-center gap-4">
            <img 
              src={`https://picsum.photos/seed/${encodeURIComponent(experiment?.title || 'sci')}/400/400`} 
              className="w-full rounded-2xl shadow-md border-4 border-white"
              alt="Science Observation" 
            />
            <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
              <Info size={14} /> ICSE Standard {grade} Discovery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceSection;
