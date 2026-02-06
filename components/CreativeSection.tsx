
import React, { useState, useRef, useEffect } from 'react';
import { Palette, Trash2, Download, Star, Rocket, Heart, Sun } from 'lucide-react';
import { Grade } from '../types';

const TEMPLATES = [
  { name: 'Space Rocket', icon: <Rocket size={20} />, prompt: 'Draw a rocket flying to the moon!' },
  { name: 'Happy Sun', icon: <Sun size={20} />, prompt: 'Draw a sun with cool sunglasses!' },
  { name: 'Flower Power', icon: <Heart size={20} />, prompt: 'Draw a field of colorful flowers!' }
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
        ctx.lineWidth = 6;
      }
    }
  }, [brushColor]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    // Account for scale if CSS size differs from internal resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.beginPath();
    ctx.moveTo(x * scaleX, y * scaleY);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.lineTo(x * scaleX, y * scaleY);
    ctx.stroke();
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
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-kids text-pink-600 flex items-center justify-center gap-3">
          <Palette size={40} /> Magic Drawing Board
        </h2>
        <p className="text-gray-600 italic">No AI needed—just your wonderful imagination!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="space-y-4">
           <h3 className="font-bold text-gray-700 flex items-center gap-2">
             <Star className="text-yellow-500" size={18} /> Choice of activity:
           </h3>
           <div className="space-y-2">
             {TEMPLATES.map(t => (
               <button 
                key={t.name}
                onClick={() => setActiveTemplate(t)}
                className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${
                  activeTemplate.name === t.name ? 'bg-pink-500 text-white shadow-lg scale-105' : 'bg-white text-pink-600 hover:bg-pink-50'
                }`}
               >
                 {t.icon}
                 <span className="font-bold">{t.name}</span>
               </button>
             ))}
           </div>

           <div className="bg-white p-6 rounded-3xl shadow-md space-y-4">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Magic Colors:</p>
              <div className="grid grid-cols-3 gap-3">
                {['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#ec4899', '#000000'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setBrushColor(c)}
                    className={`w-full aspect-square rounded-full border-4 transition-transform hover:scale-110 ${brushColor === c ? 'border-gray-800' : 'border-white shadow-sm'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
           </div>

           <button 
            onClick={clearCanvas}
            className="w-full p-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
           >
             <Trash2 size={20} /> Clear Board
           </button>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <div className="bg-pink-100 p-4 rounded-2xl border-2 border-pink-200 text-center font-kids text-xl text-pink-800">
             Today's Challenge: {activeTemplate.prompt}
          </div>
          <div className="bg-white rounded-[2rem] shadow-2xl p-4 border-t-8 border-pink-400 aspect-[4/3] relative touch-none">
            <canvas 
              ref={canvasRef}
              width={1200}
              height={900}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair rounded-xl bg-gray-50/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeSection;
