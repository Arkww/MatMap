const key = 'XiLl9tt8t9Q3O9lwzsz3';

var color1 = "#f8f9fa";
var color2 = "#caf0f8" ;
var color3  = "#ade8f4";
var color4  = "#90e0ef";
var color5  = "#48cae4";
var color6 = "#00b4d8";
var color7 = "#0096c7";
var color8 = "#0077b6";
var color9 = "#023e8a";
var color10 = "#03045e" ;

//style: "https://api.maptiler.com/maps/winter-v2/style.json?key=XiLl9tt8t9Q3O9lwzsz3",
//style: "https://api.maptiler.com/maps/toner-v2/style.json?key=XiLl9tt8t9Q3O9lwzsz3"
//style : "https://api.maptiler.com/maps/openstreetmap/style.json?key=XiLl9tt8t9Q3O9lwzsz3"

// Créer la carte avec un zoom initial et les options de zoom min/max
const map = L.map('map', {
  center: [0, 0],
  zoom: 2.5, // Niveau de zoom initial
  minZoom: 2.9,  // Zoom minimum
  maxZoom: 6, // Zoom maximum (ajustez selon vos besoins)
  maxBounds: [
    [-60, -180], // Sud-Ouest (lat, lng)
    [85, 165]    // Nord-Est (lat, lng)
  ],
  maxBoundsViscosity: 1.0, // résistance maximale au-delà des limites
  keepBuffer: 3 // Keep extra tiles in memory around the view
});



crossOrigin: true
function getColor(data) {
  if (data === null || data === undefined) {
    return '#000000'; // Black for missing data
  }
  return data > 100000000 ? color10 :
         data > 10000000  ? color9 :
         data > 1000000    ? color8 :
         data > 100000   ? color7 :
         data > 10000      ? color6 :
         data > 1000    ? color5 :
         data > 24       ? color4 :
         data > 24       ? color3 :
         data > 24       ? color2 :
         data > 24       ? color1 :
         '#000000';
}

      function onEachFeature(feature, layer) {
        // Vérifie si la propriété 'name' existe dans le fichier GeoJSON
        if (feature.properties && feature.properties.name) {
          // Ajoute une infobulle contenant le nom du pays
          layer.bindTooltip(feature.properties.name, {
            permanent: true, // Afficher en permanence
            direction: "center", // Centrer le label
            className: "country-label" // Classe CSS pour personnaliser le style
          });
        }
      }
      
function getStyle(feature) {
          return {
              weight: 0.7, //size of outline
              opacity: 0.5, //outline opacity
              color: 'black', //colour of outline
              fillOpacity: 1,
              fillColor: getColor(feature.properties.pop_est),
          };
      }
const geojson = new L.GeoJSON.AJAX(`world.geojson`,{
  style: getStyle,
  onEachFeature: onEachFeature
}).addTo(map);












document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-checkbox');


  // Toggle theme on button click
  themeToggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark');
    document.body.classList.toggle('light', !isDarkMode);



  });
});

document.getElementById("btn1").addEventListener('click', () => {
  color1 = "#f8f9fa";
  color2 = "#caf0f8" ;
  color3  = "#ade8f4";
  color4  = "#90e0ef";
  color5  = "#48cae4";
  color6 = "#00b4d8";
  color7 = "#0096c7";
  color8 = "#0077b6";
  color9 = "#023e8a";
  color10 = "#03045e" ;
  const geojson = new L.GeoJSON.AJAX(`world.geojson`,{
    style: getStyle,
    onEachFeature: onEachFeature
  }).addTo(map);
})

document.getElementById("btn2").addEventListener('click', () => {
  color1 = "#fff0f3";
  color2 = "#ffccd5" ;
  color3  = "#ffccd5";
  color4  = "#ff8fa3";
  color5  = "#ff758f";
  color6 = "#ff4d6d";
  color7 = "#c9184a";
  color8 = "#a4133c";
  color9 = "#800f2f";
  color10 = "#590d22" ;
  const geojson = new L.GeoJSON.AJAX(`world.geojson`,{
    style: getStyle,
    onEachFeature: onEachFeature
  }).addTo(map);
})

document.getElementById("btn3").addEventListener('click', () => {
  color1 = "#ffff3f";
  color2 = "#eeef20" ;
  color3  = "#dddf00";
  color4  = "#d4d700";
  color5  = "#bfd200";
  color6 = "#aacc00";
  color7 = "#80b918";
  color8 = "#55a630";
  color9 = "#2b9348";
  color10 = "#007f5f" ;
  const geojson = new L.GeoJSON.AJAX(`world.geojson`,{
    style: getStyle,
    onEachFeature: onEachFeature
  }).addTo(map);
})