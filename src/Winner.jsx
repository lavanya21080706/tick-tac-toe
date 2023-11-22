import React, { useState } from 'react';
import Homepage from './homepage';

function Winner({ winnerSVG, activeSVG, inactiveSVG, onPlayAgain, onNextRound }) {
  const [quit, quitgame] = useState(false);

  const playAgain = () => {
    console.log("Next round button clicked!");
    onPlayAgain();
  };

  const nextRound = () => {
    onNextRound();
  };

  function exit() {
    quitgame(true);
  }

  return (
    <div>
      <div className='frame'>
        <span id='won'> &nbsp; YOU WON!</span>
        <span id='win'> {winnerSVG === 'user' ? activeSVG : inactiveSVG} TAKES THE ROUND</span>
        <button id='winbut1' onClick={exit}>Quit</button>
        <button id='winbut2' onClick={nextRound}>NEXT ROUND</button>
        {quit && <Homepage />}

      </div>
    </div>
  );
}

export default Winner;
