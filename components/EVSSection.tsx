
import React, { useState, useEffect } from 'react';
import { getEVSTopic, generateKidImage } from '../services/geminiService.ts';
import { ActivityContent, Grade } from '../types.ts';
import { RefreshCw, Leaf, Sun, Heart, ShieldCheck, Map, Sparkles, Book } from 'lucide-react';

const EVSSection: React.FC<{ grade: Grade; onBack: () => void }> = ({ grade, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ActivityContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [illustration, setIllustration] = useState<string | null>(null);

  // ICSE Syllabus Topics per Grade
  const syllabusTopics: Record<number, {id: string, icon: any}[]> = {
    1: [{ id: 'My Body', icon: <Heart size={18}/> }, { id: 'Family', icon: <Book size={18}/> }],
    2: [{ id: 'Internal Organs', icon: <Heart size={18}/> }, { id: 'Plants', icon: <Leaf size={18}/> }, { id: 'Safety', icon: <ShieldCheck size={18}/> }],
    3: [{ id: 'Solar System', icon: <Sun size={18}/> }, { id: 'Early Man', icon: <Map size={18}/> }],
    4: [{ id: 'Environment', icon: <Leaf size={18}/> }, { id: 'Transport', icon: <Map size={18}/> }],
    5: [{ id: 'India', icon: <Map size={18}/> }, { id: 'Health', icon: <Heart size={18}/> }]
  };

  const currentTopics = syllabusTopics[grade] || syllabusTopics[2];

  const loadTopic = async (topic: string) => {
    setLoading(true);
    setShowResult(false);
    setSelectedOption(null);
    setIllustration(null);
    try {
      const data = await getEVSTopic(grade, topic);
      setContent(data);
      const img = await generateKidImage(data.title);
      setIllustration(img);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentTopics.length > 0) {
      const initialTopic = currentTopics[0].id;
      setSelectedTopic(initialTopic);
      loadTopic(initialTopic);
    }
  }, [grade]);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin text-orange-500"><RefreshCw size={48} /></div>
        <p className="text-xl font-kids text-orange-600">Exploring Standard {grade} EVS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-wrap gap-3 justify-center">
        {currentTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => { setSelectedTopic(topic.id); loadTopic(topic.id); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl transition-all shadow-sm font-bold ${
              selectedTopic === topic.id
                ? 'bg-orange-500 text-white shadow-md scale-105'
                : 'bg-white text-orange-600 border border-orange-100 hover:bg-orange-50'
            }`}
          >
            {topic.icon}
            {topic.id}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-orange-400 space-y-4">
            <h2 className="text-3xl font-kids text-orange-600">{content?.title}</h2>
            <div className="text-lg leading-relaxed text-gray-700 bg-orange-50/30 p-4 rounded-xl">
              {content?.description}
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-3xl space-y-4 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-orange-800">Quick Quiz:</h3>
            <p className="text-lg text-orange-900 font-medium">{content?.question}</p>
            <div className="space-y-2">
              {content?.options?.map((option, idx) => (
                <button
                  key={idx}
                  disabled={showResult}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 rounded-xl text-left font-bold transition-all border-2 ${
                    showResult
                      ? option === content.answer
                        ? 'bg-green-500 text-white border-green-600'
                        : option === selectedOption
                        ? 'bg-red-500 text-white border-red-600'
                        : 'bg-white/50 text-gray-400 border-gray-200'
                      : 'bg-white hover:bg-orange-50 text-orange-700 border-white hover:border-orange-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-dashed border-orange-300">
            <h3 className="text-xl font-kids text-orange-600 flex items-center gap-2 mb-2">
               <Sparkles size={20} /> Fun Fact
            </h3>
            <p className="text-gray-700 italic leading-relaxed">"{content?.funFact}"</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-square bg-orange-50 border-4 border-white">
             {illustration && <img src={illustration} alt="EVS Lesson" className="w-full h-full object-cover" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVSSection;
