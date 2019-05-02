import {
  map as initMap,
  tileLayer,
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


osmCH.addTo(map)

zoo.addTo(map)