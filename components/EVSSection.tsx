
import React, { useState, useEffect } from 'react';
import { getEVSTopic, generateKidImage } from '../services/geminiService';
import { ActivityContent, Grade } from '../types';
import { RefreshCw, Leaf, Sun, Heart, Coffee, ShieldCheck, Map, Sparkles } from 'lucide-react';

const EVS_TOPICS = [
  { id: 'Environment', icon: <Leaf className="text-green-500" /> },
  { id: 'Human Body', icon: <Heart className="text-red-500" /> },
  { id: 'Safety', icon: <ShieldCheck className="text-blue-500" /> },
  { id: 'The Sun', icon: <Sun className="text-yellow-500" /> },
  { id: 'Landmarks', icon: <Map className="text-purple-500" /> }
];

const EVSSection: React.FC<{ grade: Grade; onBack: () => void }> = ({ grade, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ActivityContent | null>(null);
  const [selectedTopic, setSelectedTopic] = useState('Environment');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  // Landmark Explorer State
  const [landmarkImage, setLandmarkImage] = useState<string | null>(null);
  const [generatingImg, setGeneratingImg] = useState(false);

  const loadTopic = async (topic: string) => {
    setLoading(true);
    setShowResult(false);
    setSelectedOption(null);
    setLandmarkImage(null);
    try {
      const data = await getEVSTopic(grade, topic);
      setContent(data);
      
      // Auto-generate image for Landmarks topic
      if (topic === 'Landmarks') {
        setGeneratingImg(true);
        const img = await generateKidImage(`A famous world landmark: ${data.title}`);
        setLandmarkImage(img);
        setGeneratingImg(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopic(selectedTopic);
  }, [selectedTopic, grade]);

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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {EVS_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all shadow-sm ${
              selectedTopic === topic.id
                ? 'bg-orange-500 text-white shadow-md scale-105'
                : 'bg-white text-orange-600 border border-orange-100 hover:bg-orange-50'
            }`}
          >
            {topic.icon}
            <span className="font-bold text-xs sm:text-sm">{topic.id}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-orange-400 space-y-4">
            <h2 className="text-3xl font-kids text-orange-600">{content?.title}</h2>
            <div className="text-lg leading-relaxed text-gray-700 bg-orange-50/30 p-4 rounded-xl whitespace-pre-wrap">
              {content?.description}
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-3xl space-y-4 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-orange-800">Knowledge Check:</h3>
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
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-dashed border-orange-300 flex flex-col items-center gap-4">
            <h3 className="text-xl font-kids text-orange-600 text-center flex items-center gap-2">
               <Sparkles size={20} /> Fun Fact
            </h3>
            <p className="text-gray-700 italic text-center leading-relaxed">"{content?.funFact}"</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg aspect-square border-4 border-white relative bg-orange-50 flex items-center justify-center">
             {landmarkImage ? (
               <img src={landmarkImage} alt={content?.title} className="w-full h-full object-cover" />
             ) : (
               <div className="flex flex-col items-center gap-2 text-orange-300">
                  <RefreshCw className={generatingImg ? 'animate-spin' : ''} />
                  <p className="text-sm font-bold">Painting illustration...</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVSSection;
