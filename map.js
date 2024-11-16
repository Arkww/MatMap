const key = 'XiLl9tt8t9Q3O9lwzsz3';

var color1 = "#f8f9fa";
var color2 = "#caf0f8";
var color3 = "#ade8f4";
var color4 = "#90e0ef";
var color5 = "#48cae4";
var color6 = "#00b4d8";
var color7 = "#0096c7";
var color8 = "#0077b6";
var color9 = "#023e8a";
var color10 = "#03045e";


const map = L.map('map', {
  center: [0, 0],
  zoom: 2.5,
  minZoom: 2.5,
  maxZoom: 7,
  maxBounds: [
    [-60, -180],
    [85, 165]
  ],
  maxBoundsViscosity: 1.0,
  keepBuffer: 3
});

function endGame() {
  console.log("Game ended")

  const answerElements = document.querySelectorAll('.answer');
    answerElements.forEach((element, index) => {
      element.innerHTML = " Game ended ! Your score " + score ;})
  
  document.getElementById("choice1").hidden = true;
  document.getElementById("choice2").hidden = true;
  document.getElementById("choice3").hidden = true;
  document.getElementById("choice4").hidden = true;

  let highscore = getCookie("highscore");

  if (!highscore || score > highscore) {
    highscore = score;
    document.cookie = "highscore=" + highscore + "; path=/; max-age=31536000"; 
  }

  document.getElementById("highScore").innerText = highscore;

  document.getElementById("menu").style.display = "flex";

}

function startGame() {
  enableButtons()
  score = 0
  alreadyGuessed = []
  

  const answerElements = document.querySelectorAll('.answer');
  answerElements.forEach((element, index) => {
    element.innerHTML = " "})
    score1.innerHTML = 0
    score2.innerHTML = 0

  document.getElementById("menu").style.display = "none";
  document.getElementById("score").style.display = "flex";

  setRandomValue();
  changeButtons();

}


document.getElementById("menu").addEventListener("click", () => {
  startGame()
});


crossOrigin: true
function getColor(value, threshold) {
  if (value === null || value === undefined) {
    return '#000000'; 
  }


  return value > threshold[9] ? color10 :
    value > threshold[8] ? color9 :
    value > threshold[7] ? color8 :
    value > threshold[6] ? color7 :
    value > threshold[5] ? color6 :
    value > threshold[4] ? color5 :
    value > threshold[3] ? color4 :
    value > threshold[2] ? color3 :
    value > threshold[1] ? color2 :
    value > threshold[0] ? color1 :
    '#000000'; 
}



function onEachFeature(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindTooltip(feature.properties.name, {
      permanent: true,
      direction: "center",
      className: "country-label"
    });
  }
}


function getThreshold(geojson, property) {

  const values = geojson.features.map(feature => feature.properties[property]);


  values.sort((a, b) => a - b);


  const thresholds = [];
  for (let i = 1; i <= 10; i++) {
    const index = Math.floor(i * values.length / 10) - 1;  
    thresholds.push(values[index]);
  }

  return thresholds;
}



function loadmap(current) {
  console.log(current);
  

  loadGeoJSON('world.geojson') 
    .then(geojson => {

      const threshold = getThreshold(geojson, current);
      console.log("Threshold:", threshold);

  
      const geojsonLayer = new L.GeoJSON.AJAX('world.geojson', {
        style: function (feature) {
          return getStyle(feature, current, threshold);
        },
        onEachFeature: onEachFeature
      }).addTo(map);
    })
    .catch(error => {
      console.error("Error loading or processing GeoJSON:", error);
    });
  

  function getStyle(feature, current, threshold) {
    return {
      weight: 0.7,
      opacity: 0.5,
      color: 'black',
      fillOpacity: 1,
      fillColor: getColor(feature.properties[current], threshold),
    };
  }
}


var choice1 = "pop"
var choice2 = "pop"
var choice3 = "pop"
var choice4 = "pop"
var current = " ";
var score = 0
const cooldownTime = "1000"


var listButtons = ["pop_est", "gdp_md_est", "lastcensus", "name_len"]
var alreadyGuessed = []

function setRandomValue() {
  if (alreadyGuessed.length == listButtons.length) {
    endGame()
    return;
  }


  let randomValue;
  do {
    randomValue = listButtons[Math.floor(Math.random() * listButtons.length)];
  } while (alreadyGuessed.includes(randomValue));

  alreadyGuessed.push(randomValue);
  current = randomValue;
  loadmap(current);
}

// Event listeners for the buttons
const button1 = document.getElementById('choice1');
button1.addEventListener("click", () => {
  disableButtons();
  updateScore(button1.innerHTML);
  setRandomValue();
  changeButtons();
  setTimeout(enableButtons, cooldownTime);
});

const button2 = document.getElementById('choice2');
button2.addEventListener("click", () => {
  disableButtons();
  updateScore(button2.innerHTML);
  setRandomValue();
  changeButtons();
  setTimeout(enableButtons, cooldownTime);
});

const button3 = document.getElementById('choice3');
button3.addEventListener("click", () => {
  disableButtons();
  updateScore(button3.innerHTML);
  setRandomValue();
  changeButtons();
  setTimeout(enableButtons, cooldownTime);
});

const button4 = document.getElementById('choice4');
button4.addEventListener("click", () => {
  disableButtons();
  updateScore(button4.innerHTML);
  setRandomValue();
  changeButtons();
  setTimeout(enableButtons, cooldownTime);
});

function updateScore(guess) {
  var score1 = document.getElementById("score1");
  var score2 = document.getElementById("score2");
  const answerElements = document.querySelectorAll('.answer');

  if (guess == current) {
    score = score + 1
    answerElements.forEach((element, index) => {
      element.innerHTML = " Good answer ! " ;
    });
  } else {
  
    answerElements.forEach((element, index) => {
      element.innerHTML = " Wrong answer ! " ;
    });

  }

  score1.innerHTML = score
  score2.innerHTML = alreadyGuessed.length
}

function disableButtons() {
  document.getElementById("choice1").hidden = true;
  document.getElementById("choice2").hidden = true;
  document.getElementById("choice3").hidden = true;
  document.getElementById("choice4").hidden = true;

}

function enableButtons() {

  document.getElementById("choice1").hidden = false;
  document.getElementById("choice2").hidden = false;
  document.getElementById("choice3").hidden = false;
  document.getElementById("choice4").hidden = false;


}





document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-checkbox');
  disableButtons();
  document.getElementById("score").style.display = "none";
  themeToggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark');
    document.body.classList.toggle('light', !isDarkMode);



  });
});

function getUniqueChoices(list) {
  const choices = [];
  while (choices.length < list.length) {
    const randomChoice = list[Math.floor(Math.random() * list.length)];
    if (!choices.includes(randomChoice)) {
      choices.push(randomChoice);
    }
  }
  return choices;
}

function changeButtons() {
  const uniqueChoices = getUniqueChoices(listButtons);

  choice1 = uniqueChoices[0];
  choice2 = uniqueChoices[1];
  choice3 = uniqueChoices[2];
  choice4 = uniqueChoices[3];

  document.getElementById("choice1").innerHTML = choice1;
  document.getElementById("choice2").innerHTML = choice2;
  document.getElementById("choice3").innerHTML = choice3;
  document.getElementById("choice4").innerHTML = choice4;
}


document.addEventListener('DOMContentLoaded', () => {
  let highscore = getCookie("highscore");
  if (highscore !== null) {
    document.getElementById("highScore").innerText = highscore;
  } else {
    document.getElementById("highScore").innerText = "0";
  }
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme === 'dark' ? 'dark' : 'light');
  }

  const savedColorScheme = localStorage.getItem('colorScheme');
  if (savedColorScheme) {
    applyColorScheme(savedColorScheme);
  }

  const themeToggleButton = document.getElementById('theme-checkbox');
  themeToggleButton.checked = savedTheme === 'dark';
  themeToggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('light');
    document.body.classList.toggle('light', !isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
});

function applyColorScheme(scheme) {
  if (scheme === 'scheme1') {
    color1 = "#f8f9fa";
    color2 = "#caf0f8";
    color3 = "#ade8f4";
    color4 = "#90e0ef";
    color5 = "#48cae4";
    color6 = "#00b4d8";
    color7 = "#0096c7";
    color8 = "#0077b6";
    color9 = "#023e8a";
    color10 = "#03045e";
    createLegend()
  } else if (scheme === 'scheme2') {
    color1 = "#fff0f3";
    color2 = "#ffccd5";
    color3 = "#ffccd5";
    color4 = "#ff8fa3";
    color5 = "#ff758f";
    color6 = "#ff4d6d";
    color7 = "#c9184a";
    color8 = "#a4133c";
    color9 = "#800f2f";
    color10 = "#590d22";
    createLegend()
  } else if (scheme === 'scheme3') {
    color1 = "#ffff3f";
    color2 = "#eeef20";
    color3 = "#dddf00";
    color4 = "#d4d700";
    color5 = "#bfd200";
    color6 = "#aacc00";
    color7 = "#80b918";
    color8 = "#55a630";
    color9 = "#2b9348";
    color10 = "#007f5f";
    createLegend()
  }

  loadmap(current)
}

document.getElementById("btn1").addEventListener('click', () => {
  applyColorScheme('scheme1');
});

document.getElementById("btn2").addEventListener('click', () => {
  applyColorScheme('scheme2');
});

document.getElementById("btn3").addEventListener('click', () => {
  applyColorScheme('scheme3');
});


const legend = L.control({ position: 'bottomright' });

function createLegend() {
  legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.style.backgroundColor = '#f0f0f0'; // Change to any color you want
    div.style.padding = '10px'; // Optional: add padding for better spacing
    div.style.borderRadius = '5px'; // Optional: add rounded corners
    div.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)'; // Optional: add shadow for depth

    const ranges = [
      { limit: "> 90 %", color: color10 },
      { limit: "> 80 %", color: color9 },
      { limit: "> 70 %", color: color8 },
      { limit: "> 60 %", color: color7 },
      { limit: "> 50 %", color: color6 },
      { limit: "> 40 %", color: color5 },
      { limit: "> 30 %", color: color4 },
      { limit: "> 20 %", color: color3 },
      { limit: "> 10 %", color: color2 },
      { limit: "> 00 %", color: color1 },
      { limit: "No Data", color: '#000000' }
    ];

    div.innerHTML += "<h4 style>TOP</h4>";
    ranges.forEach(range => {
      div.innerHTML +=
        `<i style="display:inline-block; width: 18px; height: 18px; background-color:${range.color};"></i> ${range.limit}<br>`;
    });

    return div;
  };

  legend.addTo(map);
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return parseInt(cookie.substring(name.length + 1));
    }
  }
  return null; 
}

createLegend()

function loadGeoJSON(url) {
  return fetch(url) 
    .then(response => response.json()) 
    .then(data => {
      return data; 
    })
    .catch(error => {
      console.error("Error loading GeoJSON:", error);
    });
}