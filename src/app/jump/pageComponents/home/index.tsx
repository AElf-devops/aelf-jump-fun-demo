"use client";
import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [cards, setCards] = useState(
    Array(10).fill({
      name: "MemeCat",
      marketCap: "$45k",
      createdBy: "ZB9SAT",
      progress: 66,
      likes: 234,
    })
  );

  // Auto-scrolling logic for the card list
  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prevCards => {
        const [first, ...rest] = prevCards;
        return [...rest, first]; // Move the first card to the end
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative overflow-hidden bg-gray-700 py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...cards, ...cards].map((item, index) => (
            <div
              key={index}
              className="mx-2 bg-green-500 px-4 py-1 rounded-md inline-block"
            >
              {item.name} {item.change}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="p-4">
        <h2 className="text-xl font-bold mb-4">Anna AI Agent Tokens</h2>
        <button className="px-4 py-2 mb-4 bg-green-500 rounded-lg">
          Create Agent
        </button>

        <div className="overflow-hidden">
          <div className="grid grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg p-4 flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src="https://via.placeholder.com/50"
                    alt={card.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{card.name}</h3>
                    <p className="text-sm text-gray-400">{card.marketCap}</p>
                    <p className="text-sm text-gray-400">
                      created by {card.createdBy}
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="h-2 bg-blue-500 w-32 rounded-full mb-2 relative">
                    <div
                      className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                  <button className="px-2 py-1 bg-blue-500 rounded-md text-sm">
                    Buy
                  </button>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-400">{card.likes}</p>
                  <button className="ml-2">❤️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
