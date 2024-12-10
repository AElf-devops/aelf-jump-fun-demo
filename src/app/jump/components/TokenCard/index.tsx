import React from "react";
type CardProps = {
  title: string;
  marketCap: string;
  timeAgo: string;
  creator: string;
  progress: number;
  onBuy: () => void;
  likes: number;
  imageUrl: string;
};
const Card: React.FC<CardProps> = ({
  title,
  marketCap,
  timeAgo,
  creator,
  progress,
  onBuy,
  likes,
  imageUrl,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white space-y-4">
      {/* Image and Title */}
      <div className="flex items-center space-x-4">
        <img src={imageUrl} alt={title} className="w-16 h-16 rounded-md" />
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-400">market cap: {marketCap}</p>
        </div>
      </div>
      {/* Metadata */}
      <div className="text-sm text-gray-400">
        <p>{timeAgo}</p>
        <p>
          created by <span className="text-blue-400">{creator}</span>
        </p>
      </div>
      {/* Progress Bar */}
      <div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400 mt-1">{progress}%</p>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold py-1 px-4 rounded-full"
          onClick={onBuy}
        >
          buy
        </button>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v16m16-16v16M12 4v16M3 4h18"
            />
          </svg>
          <span className="text-sm">{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
