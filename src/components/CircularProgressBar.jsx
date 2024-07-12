import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ value, text }) => {
  return (
    <div style={{ width: '30px', height: '30px' }}>
    <CircularProgressbar
      value={value}
      text={text}
      styles={
        buildStyles({
        textColor: "#212121",
        pathColor: "#4A90E2",
        trailColor: "#ddd",
        textSize: "40px"
      })}
    />
  </div>
  );
};

export default CircularProgressBar;
