// Homepage.jsx

import React, { useState } from 'react';
import './Homepage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logic from './logic';
import Quit from './Quit';
import Winner from './Winner';
import svgButton1Image from './images/Vector (1).svg';
import svgButton2Image from './images/Vector.svg';

function Homepage() {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSecondButtonClicked, setIsSecondButtonClicked] = useState(false);
  const [logic, setLogicComponentUpdate] = useState(false);
  const [activeSVG, setActiveSVG] = useState(null);
  const [inactiveSVG, setInactiveSVG] = useState(null);
  

  const handleButtonClick = () => {
    setIsButtonClicked(true);
    setIsSecondButtonClicked(false);
    checkBothButtons();
  };

  const handleSecondButtonClick = () => {
    setIsButtonClicked(false);
    setIsSecondButtonClicked(true);
    checkBothButtons();
  };

  const handleNewGameClick = () => {
    setLogicComponentUpdate(true);
    setActiveSVG(isButtonClicked ? svgButton1 : svgButton2);
    setInactiveSVG(isButtonClicked ? svgButton2 : svgButton1);
  };

  const handleInviteClick = () => {
    const inviteText = 'deploylinkpast_here';

    navigator.clipboard.writeText(inviteText).then(() => {
      toast('Invite link copied ', {
        position: 'top-right',
        autoClose: 2000,
        icon: null,
        closeButton: false,
        hideProgressBar: true,
        style: {
          width: '220px',
          height: '41px',
          flexShrink: 0,
          borderRadius: '10px',
          background: '#192A32',
          color: '#F2B237',
          textAlign: 'center',
          fontFamily: 'DM Sans',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 800,
          lineHeight: 'normal',
        },
      });
    });
  };
  
  const svgButton1 = <img src={svgButton1Image}alt="Button 1" width="26" height="26" />;;

  const svgButton2 = <img src={svgButton2Image}alt="Button 1" width="26" height="26" />;

  return (
  
    <div className='maincontainer'>
       
      {logic ? (
        <Logic activeSVG={activeSVG} inactiveSVG={inactiveSVG} svgButton2={svgButton2} isVector1Clicked={isButtonClicked} logic={logic}/>
      ) : (
        <div>
          <div className='vectors'>
            <span className={`vector ${isButtonClicked ? 'active' : 'inactive'}`} style={{ padding: '10px', margin: '1px 0px 0px 0px' }}>
              {svgButton1}
            </span>
            <span className={`vector1 ${isSecondButtonClicked ? 'active' : 'inactive'}`} style={{ padding: '10px' }}>
              {svgButton2}
            </span>
          </div>

          <div className='rectangle'>
            <span id='text'>PICK PLAYER</span>
          </div>

          <div className='smallrectangle'>
            <div id='buttons'>
              <button
                className={`button ${isButtonClicked ? 'active' : 'inactive'}`}
                onClick={handleButtonClick}
              >
                {svgButton1}
              </button>

              <button
                className={`button ${isSecondButtonClicked ? 'active' : 'inactive'}`}
                onClick={handleSecondButtonClick}
              >
                {svgButton2}
              </button>
            </div>
          </div>

          <button className='newgame' onClick={handleNewGameClick}>
            NEW GAME ( VS CPU )
          </button>
          <button className='human'>
            <span>NEW GAME ( VS HUMAN ) Coming soon</span>
          </button>
          <button className='invite' onClick={handleInviteClick}>
            Invite your friend
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Homepage;