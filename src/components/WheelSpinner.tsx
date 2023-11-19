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

    function getCurrCoinReward() {
      const normalizedRot = rotation % 360
      if(normalizedRot < 60)
        return -1
      else if(normalizedRot < 120)
        return 1000
      else if(normalizedRot < 180)
        return 200
      else if(normalizedRot < 240)
        return 100
      else if(normalizedRot < 300)
        return 400
      else
        return 1000
    }


    function spin() {
        console.log(rotation)
        setRotation(rotation + 720 + 1080 * Math.random())

        let reward = getCurrCoinReward()
        let newCoins = coins
        if(reward == -1)
          newCoins = 0
        else
          newCoins = coins + reward

        setCoins(newCoins)
        updateCoins(userId, newCoins)
    }

    
    const rotStr = 'rotate(' + rotation + 'deg)'
    const transform = 'rotate(' + rotation + 'deg)'
    
    const rotate_style = {
        //transform: {rotStr},  // TODO figure out how to do this
        transform,
        transition: 'transform 4000ms ease', // smooth transition
      }
      console.log(rotate_style)

    return (
    <>
        <img style={rotate_style} src="./spinning_wheel.png" />
        <button onClick={spin}>
            Spin
        </button>
        <br/>
        <label>
          {coins}
        </label>
    </>
  );
}
