'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Zap } from 'lucide-react';
import Die3D from './components/Die3D';
import ScoreCard from './components/ScoreCard';
import ParticleSystem from './components/ParticleSystem';
import './index.css';
import { useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { useDiceMethods } from '@/app/dice/useDiceMethods';
import {
  onConnectBtnClickHandler,
  WalletConnectWithRTK,
} from '@/app/dice/Account';
import Bignumber from 'bignumber.js';

let isPlaying = true;
let playerInfoGlobal: any = {};

export default function DiceGame() {
  const { connectWallet, walletInfo } = useConnectWallet();
  const { play, reset, getPlayerInfo, getSeason } = useDiceMethods();

  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');
  const [sequence, setSequence] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [particlePosition, setParticlePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [playerInfo, setPlayerInfo] = useState({
    score: 0,
    highscore: 0,
    rolledTimes: 0,
    dice1: '1',
    dice2: '1',
  });
  useEffect(() => {
    if (!walletInfo) {
      return;
    }
    const loopGetPlayInfo = async () => {
      const result: any = await getPlayerInfo();
      setPlayerInfo({
        ...playerInfo,
        ...result,
      });
    };
    loopGetPlayInfo();
    // const interval = setInterval(() => {
    //   loopGetPlayInfo();
    // }, 10000);
    // return () => clearInterval(interval);
  }, [walletInfo]);

  const createParticle = useCallback(
    (x: number, y: number, container: HTMLDivElement, type: string) => {
      const particle = document.createElement('div');
      particle.className = `particle ${type}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Random spread for different directions
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      particle.style.setProperty(
        '--spread-x',
        `${Math.cos(angle) * distance}px`,
      );
      particle.style.setProperty(
        '--spread-y',
        `${Math.sin(angle) * distance}px`,
      );

      // Random trail effect
      particle.style.setProperty(
        '--trail-x',
        `${(Math.random() - 0.5) * 100}px`,
      );
      particle.style.setProperty('--trail-y', `${-Math.random() * 100 - 50}px`);

      container.appendChild(particle);

      const animations = {
        'particle-basic': [
          { transform: 'scale(1) translate(0, 0)', opacity: 1 },
          {
            transform: `scale(0) translate(${Math.random() * 100 - 50}px, ${-Math.random() * 100}px)`,
            opacity: 0,
          },
        ],
        'particle-star': [
          { transform: 'rotate(0deg) scale(1)', opacity: 1 },
          { transform: 'rotate(360deg) scale(0)', opacity: 0 },
        ],
        'particle-spark': [
          {
            transform: `rotate(${Math.random() * 360}deg) translateX(0)`,
            opacity: 1,
          },
          {
            transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 + 50}px)`,
            opacity: 0,
          },
        ],
        'particle-ring': [
          { transform: 'scale(1)', opacity: 1, borderWidth: '2px' },
          { transform: 'scale(2)', opacity: 0, borderWidth: '0px' },
        ],
        'particle-trail': {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
          iterations: 1,
        },
      };

      const animation = particle.animate(
        animations[type as keyof typeof animations] ||
          animations['particle-basic'],
        {
          duration: 1000 + Math.random() * 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );

      animation.onfinish = () => particle.remove();
    },
    [],
  );

  const spawnParticles = useCallback(
    (x: number, y: number) => {
      const container = document.querySelector(
        '.particle-container',
      ) as HTMLDivElement;
      if (!container) return;

      const particleTypes = [
        'particle-basic',
        'particle-star',
        'particle-spark',
        'particle-ring',
        'particle-trail',
      ];

      // Spawn multiple waves of particles
      for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
          for (let i = 0; i < 8; i++) {
            particleTypes.forEach((type) => {
              const offsetX = (Math.random() - 0.5) * 20;
              const offsetY = (Math.random() - 0.5) * 20;
              createParticle(x + offsetX, y + offsetY, container, type);
            });
          }
        }, wave * 100);
      }
    },
    [createParticle],
  );

  const rollDice = async () => {
    if (isRolling) return;

    setIsRolling(true);
    setMessage('');
    const sequenceNumber = Math.floor(Math.random() * 3) + 1;
    setSequence(sequenceNumber);
    isPlaying = true;

    new Audio('https://www.soundjay.com/misc/sounds/dice-roll-01.mp3')
      .play()
      .catch(() => {});

    const startTimePlay = Date.now();
    await play();
    const prePlayScore = playerInfo?.score || 0;
    const startTime = Date.now();
    const getPlayInfoInterval = setInterval(async () => {
      const result = await getPlayerInfo();
      if (result.score !== prePlayScore) {
        clearInterval(getPlayInfoInterval);
        setPlayerInfo({
          ...playerInfo,
          ...result,
        });
        playerInfoGlobal = result;

        const finalDice1 = parseInt(playerInfoGlobal.dice1, 10);
        const finalDice2 = parseInt(playerInfoGlobal.dice2, 10);
        setDice1(finalDice1);
        setDice2(finalDice2);
        setIsRolling(false);
        setIsShaking(true);

        // Get dice positions for particle effects
        const dice1El = document.querySelector('.dice-container:first-child');
        const dice2El = document.querySelector('.dice-container:last-child');

        if (dice1El) {
          const rect1 = dice1El.getBoundingClientRect();
          spawnParticles(
            rect1.left + rect1.width / 2,
            rect1.top + rect1.height / 2,
          );
        }

        if (dice2El) {
          const rect2 = dice2El.getBoundingClientRect();
          spawnParticles(
            rect2.left + rect2.width / 2,
            rect2.top + rect2.height / 2,
          );
        }

        const total = finalDice1 + finalDice2;
        if (finalDice1 === finalDice2) {
          setScore((prev) => prev + total * 2);
          setMessage('CRITICAL HIT! Score multiplied by 2! ⚡');
        } else {
          setScore((prev) => prev + total);
        }

        // Remove screen shake after animation
        setTimeout(() => setIsShaking(false), 500);

        isPlaying = false;
        console.log('Time used: ', Date.now() - startTime);
        console.log('Time used with play: ', Date.now() - startTimePlay);
      }
    }, 500);

    // setTimeout(() => {
    //   const finalDice1 = Math.floor(Math.random() * 6) + 1;
    //   const finalDice2 = Math.floor(Math.random() * 6) + 1;
    //   setDice1(finalDice1);
    //   setDice2(finalDice2);
    //   setIsRolling(false);
    //   setIsShaking(true);
    //
    //   // Get dice positions for particle effects
    //   const dice1El = document.querySelector('.dice-container:first-child');
    //   const dice2El = document.querySelector('.dice-container:last-child');
    //
    //   if (dice1El) {
    //     const rect1 = dice1El.getBoundingClientRect();
    //     spawnParticles(
    //       rect1.left + rect1.width / 2,
    //       rect1.top + rect1.height / 2,
    //     );
    //   }
    //
    //   if (dice2El) {
    //     const rect2 = dice2El.getBoundingClientRect();
    //     spawnParticles(
    //       rect2.left + rect2.width / 2,
    //       rect2.top + rect2.height / 2,
    //     );
    //   }
    //
    //   const total = finalDice1 + finalDice2;
    //   if (finalDice1 === finalDice2) {
    //     setScore((prev) => prev + total * 2);
    //     setMessage('CRITICAL HIT! Score multiplied by 2! ⚡');
    //   } else {
    //     setScore((prev) => prev + total);
    //   }
    //
    //   // Remove screen shake after animation
    //   setTimeout(() => setIsShaking(false), 500);
    // }, 13000);
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem('diceHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('diceHighScore', highScore.toString());
  }, [highScore]);

  const [isResetting, setIsResetting] = useState(false);
  const resetGame = async () => {
    setIsResetting(true);
    await reset();
    const res = await getPlayerInfo();
    setPlayerInfo({
      ...playerInfo,
      ...res,
    });
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    setDice1(1);
    setDice2(1);
    setMessage('');
    setIsResetting(false);
  };

  const diceDisable =
    isRolling ||
    new Bignumber(playerInfo?.rolledTimes || 0).isGreaterThan(5) ||
    isResetting;
  return (
    <div className="tron-bg min-h-screen bg-gray-900 text-teal-300">
      <div
        className={`container relative mx-auto px-4 py-8 ${isShaking ? 'screen-shake' : ''}`}
      >
        <ParticleSystem active={isRolling} position={particlePosition} />
        <div className="flex h-[100px] w-full justify-end">
          <WalletConnectWithRTK />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="tron-glow mb-2 bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-4xl font-bold text-transparent">
              AELF DICE
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Zap className="size-5" />
              <p className="text-teal-400">
                Initialize sequence for critical hits
              </p>
              <Zap className="size-5" />
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-teal-500/30 bg-gray-900/80 p-8 shadow-[0_0_15px_rgba(79,209,197,0.3)] backdrop-blur-lg">
            <div className="mb-8 flex justify-center gap-16">
              <Die3D value={dice1} isRolling={isRolling} sequence={sequence} />
              <Die3D
                value={dice2}
                isRolling={isRolling}
                delay="0.1s"
                sequence={sequence}
              />
            </div>

            <div className="mb-6 flex justify-center gap-4">
              {walletInfo ? (
                <>
                  <button
                    onClick={rollDice}
                    disabled={diceDisable}
                    // disabled={isRolling}
                    className="rounded-lg border-2 border-teal-400 bg-teal-500/20 px-6 py-3 font-bold text-teal-300 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(79,209,197,0.5)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {/*{isRolling ? 'PROCESSING...' : 'INITIALIZE'}*/}
                    {diceDisable ? 'PROCESSING...' : 'INITIALIZE'}
                  </button>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 rounded-lg border-2 border-teal-400/50 bg-gray-800/50 px-6 py-3 font-bold text-teal-300 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                  >
                    <RotateCcw size={20} />
                    RESET
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onConnectBtnClickHandler(connectWallet)}
                    className="flex items-center gap-2 rounded-lg border-2 border-teal-400/50 bg-gray-800/50 px-6 py-3 font-bold text-teal-300 transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                  >
                    <RotateCcw size={20} />
                    Login
                  </button>
                </>
              )}
            </div>

            {message && (
              <div className="tron-glow mb-4 animate-pulse text-center text-lg font-bold text-teal-300">
                {message}
              </div>
            )}
          </div>

          {/*<ScoreCard currentScore={score} highScore={highScore} />*/}
          <ScoreCard
            currentScore={playerInfo?.score || 0}
            highScore={playerInfo?.highscore || 0}
          />
        </div>
      </div>
    </div>
  );
}
