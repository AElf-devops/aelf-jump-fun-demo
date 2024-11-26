'use client';
import React, { useState, useEffect } from 'react';
import {
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Trophy,
  RotateCcw,
} from 'lucide-react';
import {
  onConnectBtnClickHandler,
  WalletConnectWithRTK,
} from '@/app/dice/Account';
import { useConnectWallet } from '@aelf-web-login/wallet-adapter-react';
import { useDiceMethods } from '@/app/dice/useDiceMethods';
import Bignumber from 'bignumber.js';

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

let isPlaying = true;
let playerInfoGlobal: any = {};
export function DiceCard() {
  const { connectWallet, walletInfo } = useConnectWallet();
  const { play, reset, getPlayerInfo, getSeason } = useDiceMethods();

  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('');

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

  const rollDice = async () => {
    if (isRolling) return;

    setIsRolling(true);
    setMessage('');
    isPlaying = true;

    // Play rolling sound
    new Audio('https://www.soundjay.com/misc/sounds/dice-roll-01.mp3')
      .play()
      .catch(() => {});

    // Animate dice roll
    let rolls = 0;
    const maxRolls = 10;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      rolls++;

      if (rolls >= maxRolls && !isPlaying) {
        clearInterval(interval);
        // const finalDice1 = Math.floor(Math.random() * 6) + 1;
        // const finalDice2 = Math.floor(Math.random() * 6) + 1;
        const finalDice1 = parseInt(playerInfoGlobal.dice1, 10);
        const finalDice2 = parseInt(playerInfoGlobal.dice2, 10);
        setDice1(finalDice1);
        setDice2(finalDice2);
        setIsRolling(false);

        // Calculate score
        const total = finalDice1 + finalDice2;
        if (finalDice1 === finalDice2) {
          // setScore((prev) => prev + total * 2);
          setMessage('Double! Score multiplied by 2! 🎉');
        } else {
          setScore((prev) => prev + total);
        }
      }
    }, 100);
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
        isPlaying = false;
        console.log('Time used: ', Date.now() - startTime);
        console.log('Time used with play: ', Date.now() - startTimePlay);
      }
    }, 500);
  };

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

  const DiceIcon1 = diceIcons[dice1 - 1];
  const DiceIcon2 = diceIcons[dice2 - 1];

  // console.log('sss', new Bignumber(playerInfo?.rolledTimes || 0).isGreaterThan(5));
  const diceDisable =
    isRolling ||
    new Bignumber(playerInfo?.rolledTimes || 0).isGreaterThan(5) ||
    isResetting;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="flex h-[100px] w-full justify-end">
        <WalletConnectWithRTK />
      </div>
      <div className="flex w-full flex-1  flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-4xl font-bold text-gray-800">
              Dice Master
            </h1>
            <p className="text-gray-600">Roll the dice to score points!</p>
          </div>

          <div className="mb-8 flex justify-center gap-8">
            <div
              className={`transition-all duration-150${isRolling ? 'rotate-12' : ''}`}
            >
              <DiceIcon1 size={80} className="text-purple-600" />
            </div>
            <div
              className={`transition-all duration-150${isRolling ? '-rotate-12' : ''}`}
            >
              <DiceIcon2 size={80} className="text-blue-600" />
            </div>
          </div>

          {message && (
            <div className="mb-6 animate-bounce text-center text-lg font-semibold text-green-600">
              {message}
            </div>
          )}

          <div className="mb-8 flex justify-between">
            <div className="text-center">
              <p className="text-gray-600">Score</p>
              <p className="text-2xl font-bold text-gray-800">
                {playerInfo?.score || 0}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Trophy size={20} className="text-yellow-500" />
                <p className="text-gray-600">High Score</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {playerInfo?.highscore || 0}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            {walletInfo ? (
              <>
                <button
                  onClick={rollDice}
                  disabled={diceDisable}
                  className={`flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-150${
                    diceDisable
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:scale-105 hover:shadow-xl'
                  }`}
                >
                  {isRolling ? 'Rolling...' : 'Roll Dice'}
                </button>
                <button
                  onClick={resetGame}
                  className="rounded-lg bg-gray-200 p-3 transition-colors hover:bg-gray-300"
                >
                  <RotateCcw size={24} className="text-gray-600" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onConnectBtnClickHandler(connectWallet)}
                  className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl"
                >
                  Login
                </button>
              </>
            )}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Get doubles to multiply your score!</p>
          </div>
        </div>
      </div>
      <div className="h-[100px]">
        {/*<div>{JSON.stringify(playerInfo)}</div>*/}
      </div>
    </div>
  );
}
