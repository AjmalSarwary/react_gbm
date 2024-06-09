// app/components/GbmSimulation.js
import styles from '../../styles/GbmSimulation.module.css';
import React, { useState, useEffect } from 'react';
import Plotly from 'plotly.js-dist-min';

const GbmSimulation = () => {
  // State for slider values
  const [s0, setS0] = useState(100);
  const [nScenarios, setNScenarios] = useState(10);
  const [mu, setMu] = useState(0.07);
  const [sigma, setSigma] = useState(0.15);

    // Box-Muller transform for normal distribution
    function randomNormal() {
        var u = 0, v = 0;
        while (u === 0) u = Math.random(); 
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    // GBM function translated from Python to JavaScript
    function gbm(n_years, n_scenarios, mu, sigma, steps_per_year, s_0) {
        var dt = 1 / steps_per_year;
        var n_steps = n_years * steps_per_year;
        var paths = [];

        for (var i = 0; i < n_scenarios; i++) {
            var path = [s_0];
            for (var j = 1; j < n_steps; j++) {
                var last = path[j - 1];
                var rnd = randomNormal();
                // Apply the discretization correction as in the Python function
                var change = last * ((1 + mu) ** dt - 1) + sigma * last * Math.sqrt(dt) * rnd;
                path.push(path[j - 1] + change);
            }
            paths.push(path);
        }
        return paths;
    }


    // Get slider elements
	var s_0Slider = document.getElementById('s_0');
    var n_scenariosSlider = document.getElementById('n_scenarios');
    var muSlider = document.getElementById('mu');
    var sigmaSlider = document.getElementById('sigma');

    // Get display elements for slider values
	var s_0ValueDisplay = document.getElementById('s_0_value')
    var n_scenariosValueDisplay = document.getElementById('n_scenarios_value');
    var muValueDisplay = document.getElementById('mu_value');
    var sigmaValueDisplay = document.getElementById('sigma_value');

    function updateGraph() {
        // Get current values from sliders
		var e = parseInt(s_0Slider.value);
        var n = parseInt(n_scenariosSlider.value);
        var m = parseFloat(muSlider.value);
        var s = parseFloat(sigmaSlider.value);

        // Update slider value displays
		s_0ValueDisplay.textContent = e.toString();
        n_scenariosValueDisplay.textContent = n;
        muValueDisplay.textContent = m.toFixed(2);
        sigmaValueDisplay.textContent = s.toFixed(2);

        // Run Geometric Brownian Motion simulation
        var data = gbm(10, n, m, s, 12, e);

		// Create the plot data with the paths
		var plotData = data.map(function(path, index) {
			return {
			  x: Array.from({ length: path.length }, (v, k) => k / 12),
			  y: path,
			  mode: 'lines',
			  type: 'scatter',
			  name: 'Scenario ' + (index + 1),
			  line: {
				//color: getComputedStyle(document.documentElement)
				 // .getPropertyValue('--primary-color'), 
				width: 1,
				dash: 'dot'
			  }
			};
		});

		// Define the plot layout
		var layout = {
			title: 'Simulated Investment Paths Over 10 Years - Geometric Brownian Motion',
			xaxis: { title: 'Years' },
			yaxis: { title: 'Stock Price' },
			shapes: [{
				type: 'line',
				x0: 0,
				y0: e,
				x1: 10,
				y1: e,
				line: {
					color: 'black',
					width: 1,
					dash: 'dash'
				}
			}],
			showlegend: false
		};

        // Draw the plot
        Plotly.newPlot('graph', plotData, layout);
    }


	s_0Slider.oninput=updateGraph;
    n_scenariosSlider.oninput = updateGraph;
    muSlider.oninput = updateGraph;
    sigmaSlider.oninput = updateGraph;

    // Initial graph plot
    updateGraph();

  useEffect(() => {
    const data = gbm(10, numScenarios, avgReturn, volatility, 12, initialInvestment);
    const plotData = data.map((path, index) => ({
      x: Array.from({ length: path.length }, (_, k) => k / 12),
      y: path,
      mode: 'lines',
      type: 'scatter',
      name: 'Scenario ' + (index + 1),
      line: { width: 1, dash: 'dot' }
    }));

    const layout = {
      title: 'Simulated Investment Paths Over 10 Years - Geometric Brownian Motion',
      xaxis: { title: 'Years' },
      yaxis: { title: 'Stock Price' },
      shapes: [{
        type: 'line',
        x0: 0,
        y0: initialInvestment,
        x1: 10,
        y1: initialInvestment,
        line: { color: 'black', width: 1, dash: 'dash' }
      }],
      showlegend: false
    };

    Plotly.newPlot('graph', plotData, layout);
  }, [initialInvestment, numScenarios, avgReturn, volatility]);
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
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(Number(e.target.value))}
      />
      <span>{initialInvestment}</span>
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
        value={numScenarios}
        onChange={(e) => setNumScenarios(Number(e.target.value))}
      />
      <span>{numScenarios}</span>
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
        value={avgReturn}
        onChange={(e) => setAvgReturn(Number(e.target.value))}
      />
      <span>{avgReturn.toFixed(2)}</span>
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
        value={volatility}
        onChange={(e) => setVolatility(Number(e.target.value))}
      />
      <span>{volatility.toFixed(2)}</span>
    </div>

    {/* Graph Container */}
    <div id="graph" />

  </div>
);
