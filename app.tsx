
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw, AlertCircle } from 'lucide-react';

// Use standard lucide-react icons by importing their types/components if available, 
// but since we are using Tailwind and raw HTML/CSS approach, we'll use inline SVG for reliability in this environment.

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load initial state from LocalStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('zen_counter_val');
    if (savedCount !== null) {
      setCount(parseInt(savedCount, 10));
    }
    setIsInitialized(true);
  }, []);

  // Save state to LocalStorage whenever count changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('zen_counter_val', count.toString());
    }
  }, [count, isInitialized]);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  
  const handleResetRequest = () => {
    setShowConfirm(true);
  };

  const confirmReset = () => {
    setCount(0);
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 flex flex-col items-center border border-slate-100">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-xl font-semibold text-slate-400 uppercase tracking-widest mb-1">Tally Counter</h1>
          <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full"></div>
        </div>

        {/* Counter Display */}
        <div className="relative mb-12">
          <span className="text-[120px] font-extrabold tabular-nums leading-none text-slate-800 drop-shadow-sm">
            {count}
          </span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <button 
            onClick={decrement}
            className="flex flex-col items-center justify-center py-8 rounded-2xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-all active:scale-95 group"
            aria-label="Decrease count"
          >
            <Minus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Subtract</span>
          </button>

          <button 
            onClick={increment}
            className="flex flex-col items-center justify-center py-8 rounded-2xl bg-slate-800 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all active:scale-95 group"
            aria-label="Increase count"
          >
            <Plus size={32} className="mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Add One</span>
          </button>
        </div>

        {/* Reset Button */}
        <button 
          onClick={handleResetRequest}
          className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-95"
          aria-label="Reset counter"
        >
          <RotateCcw size={18} />
          <span className="text-sm font-semibold">Reset Counter</span>
        </button>
      </div>

      {/* Confirmation Modal Overlay */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Are you sure?</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                This will reset your tally to zero. This action cannot be undone.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={confirmReset}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-red-200"
                >
                  Yes, Reset Everything
                </button>
                <button 
                  onClick={cancelReset}
                  className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-colors"
                >
                  No, Keep Counting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-8 text-slate-400 text-sm flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
        Progress automatically saved
      </div>
    </div>
  );
};

export default App;
