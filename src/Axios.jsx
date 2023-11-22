import axios from "axios";
import React, { useState, useEffect } from "react";

const baseURL = "https://api.adviceslip.com/advice";

function Axios() {
  const [post, setPost] = useState('caption');

  const fetchData = () => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.slip);
      console.log(response.data.slip.advice)
    
    });
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchData(); // Fetch every minute
      
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);



  return (
    <div>
      <div className="container">
        <span id="lined">Quote #1</span>
        <p id="texted">{post.advice}</p>
        <div id="pinimage">
        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
  <circle cx="14.5" cy="14.5" r="14.5" transform="matrix(1 0 0 -1 0 29)" fill="#31C4BE"/>
</svg>

        </div>
        <div id="innerpinnerimage">
            
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
  <rect width="6" height="6" fill="#192A32"/>
  <rect x="6" y="6" width="6" height="6" fill="#192A32"/>
</svg>
        </div>
      </div>
    </div>
  );
  }

export default Axios;
