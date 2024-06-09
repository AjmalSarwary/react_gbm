// IntroductionComponent.js
import React from 'react';
import styles from './gbm_styles.css';

const IntroductionComponent = () => {
  return (
    <div id="introduction">
      <br />
      <p><b> Basic Investment Simulation </b></p>
      <br />
      <p>This is an interactive dashboard, featuring a simulation of the Geometric Brownian Motion in investment management.</p>
      <p></p><br />
      <div className="tags">
        <span className="tag">Investment Modeling</span>
        <span className="tag">Javascript</span>
        <span className="tag">AWS</span>
        <span className="tag">Interactive Dashboard</span>
        <span className="tag">HTML/CSS</span>
        <span className="tag">Monte Carlo</span>
      </div><br />
      <p>This application simulates the wealth evolution of an investment using a stochastic model, presenting the data through an interactive web interface.</p>
    </div>
  );
};

export default IntroductionComponent;
