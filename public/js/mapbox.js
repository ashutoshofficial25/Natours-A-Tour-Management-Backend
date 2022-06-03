const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYXNodXRvc2hvZmZpY2lhbDI1IiwiYSI6ImNsM3lmdm8zdjB0bngzY3Fnd3VleHJ2ZXkifQ.a1HzoPgSquXrazGuWKwWDQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
