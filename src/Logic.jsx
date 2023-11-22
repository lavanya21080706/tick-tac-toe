import React, { useState, useEffect } from 'react';
import './Homepage.css';
import { ToastContainer, toast } from 'react-toastify';
import Score from './score';
import Secscore from './secscore';
import Quit   from './Quit';
import Winner from './Winner';

function Logic({ activeSVG, inactiveSVG, svgButton2, isVector1Clicked, logic }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [turn, setTurn] = useState(activeSVG);
  const [xscore, winnerupdate] = useState(0);
  const [oscore, loserupdate] = useState(0);
  const [cpuscore, drawupdate] = useState(0);
  const [hasWinner, setHasWinner] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [winnerSVG, setWinnerSVG] = useState(null);
  const [showQuit, setShowQuit] = useState(false);
  const [refresh, setRefresh] = useState(false); // State for triggering re-render

  useEffect(() => {
    const winner = calculateWinner(board);

    const makeDelayedPCMove = () => {
      const pcMove = calculateRandomPCMove(board);
      handleSquareClick(pcMove);
    };

    if (winner && !hasWinner) {
      console.log(`${winner} wins!`);
      setWinnerSVG(winner);

      if (winner === 'user') {
        winnerupdate(xscore + 1);
        setShowWinner(true);
      } else if (winner === 'pc') {
        loserupdate(oscore + 1);
        setShowWinner(true);
      } else {
        drawupdate(cpuscore + 1);
        setShowWinner(true);
      }

      setHasWinner(true);
    } else if (!board.includes(null)) {
      if (!hasWinner) {
        console.log("It's a draw!");
        drawupdate(cpuscore + 1);
        setHasWinner(true);
        setShowWinner(true);
      }
    } else if (!isUserTurn) {
      setTimeout(makeDelayedPCMove, 1000);
      setTurn(inactiveSVG);
    } else {
      setTurn(activeSVG);
    }
  }, [board, isUserTurn, activeSVG, inactiveSVG, xscore, oscore, cpuscore, hasWinner, refresh]);

  const handleRestartClick = () => {
    console.log('Restart button clicked');
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setTurn(activeSVG);
    setHasWinner(false);
    setShowWinner(true);
    setShowQuit(false);
    setShowGame(true);

    // Trigger a re-render
    setRefresh(true);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const calculateRandomPCMove = (currentBoard) => {
    const emptySquares = currentBoard.reduce((acc, square, index) => {
      if (!square) acc.push(index);
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  };

  const handleSquareClick = (index) => {
    if (!hasWinner && index >= 0 && index < 9 && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = isUserTurn ? 'user' : 'pc';
      setBoard(newBoard);
      setIsUserTurn(!isUserTurn);
      setShowWinner(false); // Set showWinner to false
      setShowQuit(true); // Set showQuit to true
    }
  };
  
  const handleNextRound = () => {
    // Reset the game state
    setBoard(Array(9).fill(null));
    setIsUserTurn(true);
    setTurn(activeSVG);
    setHasWinner(false);
    setShowWinner(false); // Set showWinner to false
    setShowQuit(false); // Set showQuit to false
    setShowGame(true);
  };
  
  const ResultComponent = isVector1Clicked ? Score :Secscore;
  return (
    <div>
      <div className='maincontainer'>
      <div className='smallimage'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19.7188 4.28125L4.28125 19.7188M4.28125 4.28125L19.7188 19.7188" stroke="#32C4C3" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          &nbsp;&nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M7.97449 18.0255C9.30734 19.3584 11.1151 20.1071 13 20.1071C14.8849 20.1071 16.6927 19.3584 18.0255 18.0255C19.3584 16.6927 20.1071 14.8849 20.1071 13C20.1071 11.1151 19.3584 9.30734 18.0255 7.97449C16.6927 6.64164 14.8849 5.89286 13 5.89286C11.1151 5.89286 9.30734 6.64164 7.97449 7.97449C6.64164 9.30734 5.89286 11.1151 5.89286 13C5.89286 14.8849 6.64164 16.6927 7.97449 18.0255ZM21.3085 4.6915C23.5121 6.89505 24.75 9.88371 24.75 13C24.75 16.1163 23.5121 19.105 21.3085 21.3085C19.1049 23.5121 16.1163 24.75 13 24.75C9.88371 24.75 6.89505 23.5121 4.69149 21.3085C2.48794 19.105 1.25 16.1163 1.25 13C1.25 9.88371 2.48794 6.89505 4.69149 4.6915C6.89505 2.48794 9.88371 1.25 13 1.25C16.1163 1.25 19.1049 2.48794 21.3085 4.6915Z" fill="#F7B336" stroke="#F7B336" stroke-width="1.5"/>
          </svg>
        </div>
        <div className='turn'>
          {turn} TURN
        </div>
        <div className='restart'onClick={handleRestartClick}><span id='restart'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <g clip-path="url(#clip0_5_38)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.32 0.0289756C8.70071 -0.0888534 10.0884 0.153982 11.347 0.733693C12.6056 1.31341 13.6921 2.21011 14.5 3.33598V1.74998C14.5 1.55106 14.579 1.3603 14.7197 1.21965C14.8603 1.07899 15.0511 0.999976 15.25 0.999976C15.4489 0.999976 15.6397 1.07899 15.7803 1.21965C15.921 1.3603 16 1.55106 16 1.74998V5.99998H11.75C11.5511 5.99998 11.3603 5.92096 11.2197 5.78031C11.079 5.63965 11 5.44889 11 5.24998C11 5.05106 11.079 4.8603 11.2197 4.71965C11.3603 4.57899 11.5511 4.49998 11.75 4.49998H13.477C12.7931 3.42988 11.8107 2.58356 10.6512 2.06556C9.4917 1.54757 8.20584 1.38058 6.95248 1.58524C5.69912 1.7899 4.53316 2.35723 3.59864 3.21715C2.66412 4.07708 2.00198 5.19192 1.694 6.42398C1.67128 6.52076 1.62955 6.61206 1.57123 6.69257C1.51291 6.77308 1.43917 6.84119 1.35429 6.89294C1.26942 6.9447 1.1751 6.97906 1.07682 6.99403C0.97854 7.00901 0.878265 7.0043 0.781825 6.98017C0.685385 6.95604 0.594703 6.91298 0.515053 6.8535C0.435404 6.79401 0.368375 6.71928 0.317865 6.63366C0.267355 6.54803 0.234371 6.45322 0.220832 6.35473C0.207293 6.25625 0.213469 6.15605 0.239 6.05998C0.643544 4.4424 1.5434 2.99166 2.81279 1.91052C4.08218 0.82939 5.65766 0.171906 7.319 0.0299756L7.32 0.0289756ZM3.92 14.881C4.99199 15.5164 6.19758 15.8925 7.44068 15.9795C8.68378 16.0665 9.93001 15.8618 11.08 15.3819C12.23 14.902 13.252 14.1601 14.0646 13.2153C14.8771 12.2704 15.4577 11.1489 15.76 9.93997C15.805 9.74817 15.7728 9.54635 15.6702 9.37814C15.5676 9.20993 15.403 9.08883 15.2119 9.04101C15.0207 8.9932 14.8185 9.02251 14.6488 9.12261C14.4791 9.22271 14.3556 9.38557 14.305 9.57598C13.9969 10.8078 13.3347 11.9223 12.4002 12.782C11.4658 13.6417 10.3 14.2089 9.04688 14.4136C7.79373 14.6182 6.50809 14.4513 5.34871 13.9336C4.18933 13.4158 3.20699 12.5698 2.523 11.5H4.25C4.44891 11.5 4.63968 11.421 4.78033 11.2803C4.92098 11.1397 5 10.9489 5 10.75C5 10.5511 4.92098 10.3603 4.78033 10.2196C4.63968 10.079 4.44891 9.99998 4.25 9.99998H0V14.25C0 14.4489 0.0790176 14.6397 0.21967 14.7803C0.360322 14.921 0.551088 15 0.75 15C0.948912 15 1.13968 14.921 1.28033 14.7803C1.42098 14.6397 1.5 14.4489 1.5 14.25V12.664C2.14478 13.5623 2.96879 14.3172 3.92 14.881Z" fill="#3F5560"/>
  </g>
  <defs>
    <clipPath id="clip0_5_38">
      <rect width="16" height="16" fill="white"/>
    </clipPath>
  </defs>
</svg></span></div>
      
        <div id="buttonrow1">
          {/* Use activeSVG here */}
          <button
            className={`logicbuttons ${board[0] === 'user' ? 'user' : (board[0] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(0)}
          >
            {board[0] === 'user' ? activeSVG : (board[0] === 'pc' ? inactiveSVG : null)}
          </button>
          <button
            className={`logicbuttons ${board[1] === 'user' ? 'user' : (board[1] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(1)}
          >
            {board[1] === 'user' ? activeSVG : (board[1] === 'pc' ? inactiveSVG : null)}
          </button>
          <button
            className={`logicbuttons ${board[2] === 'user' ? 'user' : (board[2] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(2)}
          >
            {board[2] === 'user' ? activeSVG : (board[2] === 'pc' ? inactiveSVG : null)}
          </button>
        </div>

        <div id="buttonrow2">
          <button
            className={`logicbuttons ${board[3] === 'user' ? 'user' : (board[3] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(3)}
          >
            {board[3] === 'user' ? activeSVG : (board[3] === 'pc' ? inactiveSVG : null)}
          </button>
          <button
            className={`logicbuttons ${board[4] === 'user' ? 'user' : (board[4] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(4)}
          >
            {board[4] === 'user' ? activeSVG : (board[4] === 'pc' ? inactiveSVG : null)}
          </button>
          <button
            className={`logicbuttons ${board[5] === 'user' ? 'user' : (board[5] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(5)}
          >
            {board[5] === 'user' ? activeSVG : (board[5] === 'pc' ? inactiveSVG : null)}
          </button>
        </div>

        <div id="buttonrow3">
          <button
            className={`logicbuttons ${board[6] === 'user' ? 'user' : (board[6] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(6)}
          >
            {board[6] === 'user' ? activeSVG : (board[6] === 'pc' ? inactiveSVG : null)}
          </button>
          <button
            className={`logicbuttons ${board[7] === 'user' ? 'user' : (board[7] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(7)}
          >
            {board[7] === 'user' ? activeSVG : (board[7] === 'pc' ? inactiveSVG : null)}
          </button>
          <button
            className={`logicbuttons ${board[8] === 'user' ? 'user' : (board[8] === 'pc' ? 'pc' : '')}`}
            onClick={() => handleSquareClick(8)}
          >
            {board[8] === 'user' ? activeSVG : (board[8] === 'pc' ? inactiveSVG : null)}
          </button>
         
          {showWinner && hasWinner && (
  <Winner
    winnerSVG={winnerSVG}
    activeSVG={activeSVG}
    inactiveSVG={inactiveSVG}
    onPlayAgain={() => setShowWinner(false)}
    onNextRound={handleNextRound} // Pass the handleNextRound function
  />
)}


          {showWinner && !showQuit && <Quit onPlayAgain={() => setShowWinner(false)} />}
          {logic && <ResultComponent xscore={xscore} cpuscore={cpuscore} oscore={oscore} />}


          
        
         
        </div>
      
       
         
      


        
      </div>
    </div>
  );
}

export default Logic; 