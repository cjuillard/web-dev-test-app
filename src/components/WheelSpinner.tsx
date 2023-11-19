"use client"

import { useState } from 'react';

type WheelSpinnerProps = {
  userId: number,
  userCoins: number,
  updateCoins: (userId: number, coins: number) => void
};

export function WheelSpinner({ userId, userCoins, updateCoins }: WheelSpinnerProps) {
    const [rotation, setRotation] = useState(0);
    const [coins, setCoins] = useState(userCoins);

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

    async function spin() {
        console.log(rotation)

        let newRotation = rotation + 720 + 1080 * Math.random()
        setRotation(newRotation)

        let reward = getCurrCoinReward(newRotation)
        let newCoins = coins
        if(reward == -1)
          newCoins = 0
        else
          newCoins = coins + reward

        setTimeout(function() {
          setCoins(newCoins)
          updateCoins(userId, newCoins)
        }, spinDelay);
    }

    
    const rotStr = 'rotate(' + rotation + 'deg)'
    const transform = 'rotate(' + rotation + 'deg)'
    
    const rotate_style = {
        //transform: {rotStr},  // TODO figure out how to do this
        transform,
        transition: 'transform 4000ms ease', // smooth transition
      }
      rotate_style['transition'] = 'transform ' + spinDelay + 'ms ease'
      console.log(rotate_style)

    return (
    <>
      <center>
        <div className='spinner-parent'>
          <img style={rotate_style} src="./spinning_wheel.png" />
          <img className='spinner-arrow-img' src="./arrow.png" />
        </div>
        
        <br/>
        <button className="border border-slate-300 text-slate-200 bg-green-700 px-10 py-2
        hover:bg-green-600 focus-within:bg-green-600 rounded flex text-xl" onClick={spin}>
            Spin!
        </button>
        <br/>
        <label className="text-xl">
          Coins: ${coins}
        </label>
      </center>
    </>
  );
}
