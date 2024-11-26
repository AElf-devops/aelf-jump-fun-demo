import React from 'react';
import { Trophy, Cpu } from 'lucide-react';

interface ScoreCardProps {
  currentScore: number;
  highScore: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ currentScore, highScore }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-teal-500/30 bg-gray-900/80 p-6 text-center shadow-[0_0_15px_rgba(79,209,197,0.3)] backdrop-blur-lg transition-transform hover:scale-105">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Cpu size={20} className="text-teal-400" />
          <p className="text-teal-400">CURRENT</p>
        </div>
        <p className="tron-glow text-3xl font-bold text-teal-300">
          {currentScore}
        </p>
      </div>
      <div className="rounded-xl border border-teal-500/30 bg-gray-900/80 p-6 text-center shadow-[0_0_15px_rgba(79,209,197,0.3)] backdrop-blur-lg transition-transform hover:scale-105">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Trophy size={20} className="text-teal-400" />
          <p className="text-teal-400">MAXIMUM</p>
        </div>
        <p className="tron-glow text-3xl font-bold text-teal-300">
          {highScore}
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;
