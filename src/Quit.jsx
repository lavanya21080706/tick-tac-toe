import React, {useState } from 'react';
import Homepage from './homepage';


function Quit({ onPlayAgain }) {
  const [showWinner, setShowWinner] = useState(true);
  const[quite,quitegame]=useState(false);

  const playAgain = () => {
    setShowWinner(false); // Hide Quit component
    onPlayAgain(); // Trigger the onPlayAgain callback
  };
  function exit(){
    quitegame(true);
  }
  return (
    <div>
      {showWinner && (
        <div className='win'>
          <span id='quittext'> Do you want to quit ?</span>
          <button className='played' onClick={playAgain}>
            <span id='playagain'> PLAY AGAIN</span>
          </button>
          <button className='quited' onClick={exit}>
            <span id='quit'> QUIT</span>
          </button>
          {quite && <Homepage />}
        </div>
        
      )}
    </div>
  );
}

export default Quit;
