
import React, { useState, useEffect } from 'react';
import { getMathChallenge } from '../services/geminiService.ts';
import { ActivityContent, Grade } from '../types.ts';
import { Calculator, CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';

const MathSection: React.FC<{ grade: Grade; onBack: () => void }> = ({ grade, onBack }) => {
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState<ActivityContent | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mathType, setMathType] = useState<'addition' | 'subtraction' | 'multiplication' | 'shapes'>('addition');
  const [score, setScore] = useState(() => Number(localStorage.getItem(`mathScore_g${grade}`)) || 0);

  const loadProblem = async (type: typeof mathType) => {
    setLoading(true);
    setShowResult(false);
    setSelectedOption(null);
    try {
      const data = await getMathChallenge(grade, type);
      setProblem(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProblem(mathType);
  }, [mathType, grade]);

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    setShowResult(true);
    if (option === problem?.answer) {
      const newScore = score + 10;
      setScore(newScore);
      localStorage.setItem(`mathScore_g${grade}`, newScore.toString());
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin text-green-500"><RefreshCw size={48} /></div>
        <p className="text-xl font-kids text-green-600">Setting up Standard {grade} puzzles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white px-6 py-3 rounded-2xl sm:rounded-full shadow-md border-b-4 border-green-200 gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          {(['addition', 'subtraction', 'multiplication', 'shapes'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMathType(type)}
              className={`px-4 py-1 rounded-full font-bold whitespace-nowrap transition-all text-sm sm:text-base ${
                mathType === type 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : 'text-green-600 hover:bg-green-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 px-4 py-1 rounded-full">
          <Trophy className="text-yellow-500" size={20} />
          <span>{score} pts</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border-t-8 border-green-500 space-y-6">
        <div className="flex items-center gap-4">
          <Calculator className="text-green-500" size={40} />
          <h2 className="text-3xl font-kids text-green-600">{problem?.title}</h2>
        </div>
        <div className="text-2xl font-medium text-gray-800 leading-relaxed text-center py-10 px-4 bg-green-50 rounded-2xl border border-green-100 shadow-inner">
          {problem?.question}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problem?.options?.map((option, idx) => (
            <button
              key={idx}
              disabled={showResult}
              onClick={() => handleAnswer(option)}
              className={`p-6 rounded-2xl text-2xl font-bold transition-all border-2 ${
                showResult
                  ? option === problem.answer
                    ? 'bg-green-500 text-white border-green-600 scale-105'
                    : option === selectedOption
                    ? 'bg-red-500 text-white border-red-600'
                    : 'bg-gray-100 text-gray-400 border-gray-200 opacity-50'
                  : 'bg-white border-green-100 hover:border-green-500 text-green-700 hover:bg-green-50 shadow-sm'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="pt-6 border-t border-gray-100 space-y-6 animate-fadeIn">
             <div className="flex flex-col items-center gap-2">
                {selectedOption === problem?.answer ? (
                   <div className="text-green-600 text-2xl font-kids flex items-center gap-2">
                      <CheckCircle2 size={32} /> Standard {grade} Genius!
                   </div>
                ) : (
                   <div className="text-red-600 text-2xl font-kids flex items-center gap-2">
                      <XCircle size={32} /> Almost! Keep trying!
                   </div>
                )}
             </div>
             <div className="bg-yellow-50 p-4 rounded-xl text-yellow-800 italic border border-yellow-200">
                <span className="font-bold">Fact:</span> {problem?.funFact}
             </div>
             <button 
                onClick={() => loadProblem(mathType)}
                className="w-full py-4 bg-green-500 text-white rounded-full font-bold text-xl shadow-lg hover:bg-green-600 transition-all active:scale-95"
              >
                Next Problem
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathSection;
