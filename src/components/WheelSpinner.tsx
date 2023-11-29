"use client"

import { updateCoins } from '@/db-api';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring';

type WheelSpinnerProps = {
  userId: number,
  userName: string,
  userCoins: number,
};

export function WheelSpinner({ userId, userName, userCoins }: WheelSpinnerProps) {
    const [rotation, setRotation] = useState(0);
    const [coins, setCoins] = useState(userCoins);
    const [prevCoins, setPrevCoins] = useState(userCoins);
    const [isSpinning, setIsSpinning] = useState(false);

    const spinDelay = 4000

    function getCurrCoinReward(rotation: number) {
      const normalizedRot = (rotation + 30) % 360
      console.log(rotation)
      console.log(normalizedRot)
      if(normalizedRot < 60)
        return 100
      else if(normalizedRot < 120)
        return 2000
      else if(normalizedRot < 180)
        return -1
      else if(normalizedRot < 240)
        return 600
      else if(normalizedRot < 300)
        return 400
      else
        return 200
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    async function spin() {
        let newRotation = rotation + 720 + 1080 * Math.random()
        setIsSpinning(true);
        setRotation(newRotation)

        let reward = getCurrCoinReward(newRotation)
        let newCoins = coins
        if(reward == -1)
          newCoins = 0
        else
          newCoins = coins + reward

        await timeout(spinDelay);
        setIsSpinning(false);

        setPrevCoins(coins);
        setCoins(newCoins);
        await updateCoins(userId, newCoins);
    }

    const rotate_style = {
        transform: `rotate(${rotation}deg)`,
        transition: `transform ${spinDelay}ms ease`, // smooth transition
      }
      console.log(rotate_style)

    return (
    <>
      <center>
        <br/>
        <div className='spinner-parent'>
          <img style={rotate_style} src="./spinning_wheel.png" />
          <img className='spinner-arrow-img' src="./arrow.png" />
          <br/>
          <button className="spinner-button border border-slate-300 text-slate-200 bg-green-700 px-10 py-2
          hover:bg-green-600 focus-within:bg-green-600 disabled:opacity-50 rounded flex text-3xl" onClick={spin} disabled={isSpinning}>
              Spin!
          </button>
        </div>
        
        <br/>
        <br/>
        <br/>
        <span className="text-4xl">💰</span>
        <span className="text-3xl">$<AnimatedNumber startNumber={prevCoins} endNumber={coins} /></span>
      </center>
    </>
  );
}

type AnimatedNumberProps = {
  startNumber: number
  endNumber: number
}
function AnimatedNumber({startNumber, endNumber}: AnimatedNumberProps) {
  const { number } = useSpring({
    from: { number: startNumber },
    to: { number: endNumber},
  });
  return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
}

function AnimatedMoney(numberOfIcons: number) {

}