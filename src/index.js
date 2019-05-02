import {
  map as initMap,
  tileLayer,
  icon,
  marker,
} from 'leaflet'

import zoological from './tourism_zoo_data.geojson'

const map = initMap('map').setView([46.7785, 6.6412], 13)

const osmCH = tileLayer('https://tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  bounds: [[45, 5], [48, 11]]
})

const zoo = geoJSON(zoological, {
  onEachFeature:(feature, layer) => layer.bindPopup(feature.properties.name)
})

// création de l'icone
const zooIcon = icon({
  iconUrl: 'animal-track.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})


const markers = zoological.features
  .map(feature => {
    const [longitude, latitude] = feature.geometry.coordinates
    return marker([latitude, longitude], { icon: zooIcon })
      .bindPopup(feature.properties.name || 'NO NAME')
  })


osmCH.addTo(map)
markers.forEach(marker => marker.addTo(map))
// zoo.addTo(map)
