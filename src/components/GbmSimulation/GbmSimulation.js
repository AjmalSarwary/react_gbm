import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';
import styles from './gbm_styles.css';


const GbmSimulation = () => {
  // State for slider values
  const [s0, setS0] = useState(100);
  const [nScenarios, setNScenarios] = useState(10);
  const [mu, setMu] = useState(0.07);
  const [sigma, setSigma] = useState(0.15);

  // Function for Box-Muller transform for normal distribution
  function randomNormal() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  }

  // GBM function 
  function gbm(n_years, n_scenarios, mu, sigma, steps_per_year, s_0) {
    var dt = 1 / steps_per_year;
    var n_steps = n_years * steps_per_year;
    var paths = [];

    for (var i = 0; i < n_scenarios; i++) {
      var path = [s_0];
      for (var j = 1; j < n_steps; j++) {
        var last = path[j - 1];
        var rnd = randomNormal();
        var change = last * ((1 + mu) ** dt - 1) + sigma * last * Math.sqrt(dt) * rnd;
        path.push(last + change);
      }
      paths.push(path);
    }
    return paths;
  }

  // Updates Graph based on state
  const updateGraph = () => {
    var data = gbm(10, nScenarios, mu, sigma, 12, s0);

    var plotData = data.map(function (path, index) {
      return {
        x: Array.from({ length: path.length }, (v, k) => k / 12),
        y: path,
        mode: 'lines',
        type: 'scatter',
        name: 'Scenario ' + (index + 1),
        line: {
          width: 1,
          dash: 'dot'
        }
      };
    });

    var layout = {
      title: 'Simulated Investment Paths Over 10 Years - Geometric Brownian Motion',
      xaxis: { title: 'Years' },
      yaxis: { title: 'Stock Price' },
      shapes: [{
        type: 'line',
        x0: 0,
        y0: s0,
        x1: 10,
        y1: s0,
        line: {
          color: 'black',
          width: 1,
          dash: 'dash'
        }
      }],
      showlegend: false
    };

    Plotly.newPlot('graph', plotData, layout);
  };

  // useEffect updates the graph when state changes
  useEffect(() => {
    updateGraph();
  }, [s0, nScenarios, mu, sigma]);

  return (

    <div className={styles.container}>
      {/* Slider for Initial Investment */}
      <div className={styles.sliderContainer}>
        <label htmlFor="s_0">Select Initial Investment (EUR)</label>
        <input
          type="range"
          id="s_0"
          name="s_0"
          min="1"
          max="10000"
          step="100"
          value={s0}
          onChange={(e) => setS0(Number(e.target.value))}
        />
        <span>{s0}</span>
      </div>

      {/* Slider for Number of Scenarios */}
      <div className={styles.sliderContainer}>
        <label htmlFor="n_scenarios">Select Number of Scenarios</label>
        <input
          type="range"
          id="n_scenarios"
          name="n_scenarios"
          min="1"
          max="100"
          value={nScenarios}
          onChange={(e) => setNScenarios(Number(e.target.value))}
        />
        <span>{nScenarios}</span>
      </div>

      {/* Slider for Average Return (mu) */}
      <div className={styles.sliderContainer}>
        <label htmlFor="mu">Select Avg Return (mu)</label>
        <input
          type="range"
          id="mu"
          name="mu"
          min="0"
          max="0.2"
          step="0.01"
          value={mu}
          onChange={(e) => setMu(Number(e.target.value))}
        />
        <span>{mu.toFixed(2)}</span>
      </div>

      {/* Slider for Volatility (sigma) */}
      <div className={styles.sliderContainer}>
        <label htmlFor="sigma">Select Volatility (sigma)</label>
        <input
          type="range"
          id="sigma"
          name="sigma"
          min="0"
          max="0.3"
          step="0.01"
          value={sigma}
          onChange={(e) => setSigma(Number(e.target.value))}
        />
        <span>{sigma.toFixed(2)}</span>
      </div>

      {/* Graph Container */}
      <div id="graph" />
    </div>
  );
};

export default GbmSimulation;
