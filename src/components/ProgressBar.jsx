import React from 'react';
import Progress from 'react-circle-progress-bar'



const ProgressBar = ({progress,transitionDuration	,background,subtitle,gradient}) => {
  return (
    <Progress progress={progress} subtitle={subtitle}  transitionDuration={transitionDuration}  background={background} gradient={gradient} strokeWidth="8" ballStrokeWidth="18" reduction="0" />
  )
}

export default ProgressBar;