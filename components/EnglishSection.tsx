
import React, { useState, useEffect } from 'react';
import { getStoryNode, speakText } from '../services/geminiService.ts';
import { StoryNode, Grade } from '../types.ts';
import { RefreshCw, PlayCircle, Volume2 } from 'lucide-react';

const EnglishSection: React.FC<{ grade: Grade; onBack: () => void }> = ({ grade, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [speaking, setSpeaking] = useState(false);

  const startStory = async () => {
    setLoading(true);
    try {
      const node = await getStoryNode(grade, "start", []);
      setCurrentNode(node);
      setHistory([node.text]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async (prompt: string) => {
    setLoading(true);
    try {
      const node = await getStoryNode(grade, prompt, history);
      setCurrentNode(node);
      setHistory([...history, node.text]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    if (!currentNode || speaking) return;
    setSpeaking(true);
    speakText(currentNode.text).then(() => {
      // Simulate end of speech for UI feedback
      setTimeout(() => setSpeaking(false), currentNode.text.length * 60);
    });
  };

  useEffect(() => {
    startStory();
  }, [grade]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin text-blue-500"><RefreshCw size={48} /></div>
        <p className="text-xl font-kids text-blue-600">Opening Standard {grade} Storybook...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-b-8 border-blue-500">
        <div className="relative h-64 bg-blue-100 flex items-center justify-center overflow-hidden">
           <img 
            src={`https://picsum.photos/seed/${currentNode?.illustrationPrompt.replace(/\s/g, '')}/800/400`} 
            alt="Story illustration" 
            className="w-full h-full object-cover" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <h2 className="text-white text-3xl font-kids">Standard {grade} Story Time</h2>
           </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start gap-4">
            <div className="text-xl leading-relaxed text-gray-800 font-medium">
              {currentNode?.text}
            </div>
            <button 
              onClick={handleSpeak} 
              disabled={speaking}
              className={`p-3 rounded-full flex-shrink-0 ${speaking ? 'bg-blue-100 text-blue-400' : 'bg-blue-500 text-white hover:bg-blue-600'} transition-all`}
            >
              <Volume2 size={24} className={speaking ? 'animate-pulse' : ''} />
            </button>
          </div>

          {!currentNode?.isEnd ? (
            <div className="space-y-4 pt-6">
              <h3 className="text-blue-600 font-bold uppercase tracking-widest text-sm">What happens next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentNode?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => nextStep(opt.nextPrompt)}
                    className="p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl text-left hover:bg-blue-100 hover:border-blue-400 transition-all font-bold text-blue-800 flex items-center gap-3"
                  >
                    <PlayCircle size={20} className="flex-shrink-0" />
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 pt-8 border-t border-gray-100">
              <div className="text-center">
                <h3 className="text-2xl font-kids text-indigo-600 mb-2">The End!</h3>
                <p className="text-gray-500 italic">Well done on finishing this adventure!</p>
              </div>
              <button 
                onClick={startStory}
                className="px-10 py-4 bg-blue-500 text-white rounded-full font-bold shadow-xl hover:bg-blue-600 transition-transform active:scale-95"
              >
                Read Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnglishSection;
