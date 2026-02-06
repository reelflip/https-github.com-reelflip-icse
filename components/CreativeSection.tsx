
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Trash2, Rocket, Heart, Sun, Star } from 'lucide-react';
import { Grade } from '../types';

const TEMPLATES = [
  { name: 'Space Rocket', icon: <Rocket size={24} />, prompt: 'Draw a rocket flying to the moon!' },
  { name: 'Happy Sun', icon: <Sun size={24} />, prompt: 'Draw a sun with cool sunglasses!' },
  { name: 'Flower Power', icon: <Heart size={24} />, prompt: 'Draw a field of colorful flowers!' }
];

const CreativeSection: React.FC<{ grade: Grade; onBack: () => void }> = ({ grade, onBack }) => {
  const [activeTemplate, setActiveTemplate] = useState(TEMPLATES[0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#4f46e5');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = 10; // Thicker lines for kids
      }
    }
  }, [brushColor]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: x * scaleX, y: y * scaleY };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    e.preventDefault(); // Prevent scrolling while drawing
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn h-full flex flex-col">
      <div className="text-center space-y-2">
        <h2 className="text-5xl font-kids text-pink-600 flex items-center justify-center gap-4">
          <Palette size={50} /> Magic Drawing Board
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        <div className="space-y-6 flex flex-col h-full">
           <div className="bg-white p-6 rounded-[2rem] shadow-xl border-b-8 border-pink-100 flex-1 space-y-6">
              <h3 className="font-bold text-gray-500 uppercase tracking-[0.1em] text-sm flex items-center gap-2">
                <Star size={16} className="text-yellow-400" /> Choose What to Draw:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {TEMPLATES.map(t => (
                  <button 
                    key={t.name}
                    onClick={() => setActiveTemplate(t)}
                    className={`w-full p-5 rounded-2xl flex items-center gap-4 transition-all shadow-sm ${
                      activeTemplate.name === t.name ? 'bg-pink-500 text-white shadow-pink-200 scale-105' : 'bg-gray-50 text-pink-600'
                    }`}
                  >
                    {t.icon}
                    <span className="font-bold text-lg">{t.name}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                 <p className="text-sm font-bold text-gray-400 uppercase">Magic Colors:</p>
                 <div className="grid grid-cols-4 gap-3">
                   {['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#000000'].map(c => (
                     <button 
                       key={c}
                       onClick={() => setBrushColor(c)}
                       className={`w-full aspect-square rounded-full border-4 transition-transform active:scale-125 ${brushColor === c ? 'border-gray-800 scale-110 shadow-lg' : 'border-white shadow-sm'}`}
                       style={{ backgroundColor: c }}
                     />
                   ))}
                 </div>
              </div>
           </div>

           <button 
            onClick={clearCanvas}
            className="w-full p-6 bg-red-100 text-red-600 rounded-3xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all text-xl shadow-lg border-b-8 border-red-200"
           >
             <Trash2 size={24} /> Clear Board
           </button>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-pink-50 p-5 rounded-2xl border-2 border-pink-100 text-center font-kids text-2xl text-pink-800 shadow-inner">
             ✨ {activeTemplate.prompt}
          </div>
          <div className="bg-white rounded-[3rem] shadow-2xl p-4 border-t-8 border-pink-400 aspect-[4/3] relative touch-none border-x border-gray-100">
            <canvas 
              ref={canvasRef}
              width={1600}
              height={1200}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair rounded-[2.5rem] bg-pink-50/20 shadow-inner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeSection;
