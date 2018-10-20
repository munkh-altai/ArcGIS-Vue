import EsriMap from "esri/Map";

import GroupLayer from "esri/layers/GroupLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import MapImageLayer from "esri/layers/MapImageLayer";

import GraphicsLayer from "esri/layers/GraphicsLayer";

import WebTileLayer from "esri/layers/WebTileLayer";
import TileLayer from "esri/layers/TileLayer";
import Basemap from "esri/Basemap";
import esriConfig from "esri/config"


export default {
    init(state, init) {


        esriConfig.request.corsEnabledServers.push(
            "http://mt0.google.com",
            "http://mt1.google.com",
            "http://mt2.google.com",
            "http://mt3.google.com",
            "http://a.tile.openstreetmap.org",
            "http://b.tile.openstreetmap.org",
            "http://c.tile.openstreetmap.org",
        );

        state.baseMaps = [
            new Basemap({
                baseLayers: [new WebTileLayer({
                    urlTemplate: "http://{subDomain}.google.com/vt/lyrs=m&x={col}&y={row}&z={level}",
                    subDomains: ["mt0", "mt1", "mt2", "mt3"],
                })],
                title: 'Google Streets',
                id: "google Streets",
                thumbnailUrl: "/map/images/baseMaps/googleStreets.jpg"
            }),
            new Basemap({
                baseLayers: [new WebTileLayer({
                    urlTemplate: "http://{subDomain}.google.com/vt/lyrs=s,h&x={col}&y={row}&z={level}",
                    subDomains: ["mt0", "mt1", "mt2", "mt3"],
                })],
                title: 'Google Satellite',
                id: "googleSatellite",

                thumbnailUrl: "/map/images/baseMaps/googleSatellite.jpg"
            }),
            new Basemap({
                baseLayers: [new WebTileLayer({
                    urlTemplate: "https://{subDomain}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{level}/{row}/{col}",
                    subDomains: ["server", "services"]
                })],
                title: 'Esri Imagery',
                id: "imagery",
                thumbnailUrl: "/map/images/baseMaps/tempimagery.jpg"
            }),
            new Basemap({
                baseLayers: [new WebTileLayer({
                    urlTemplate: "http://{subDomain}.tile.openstreetmap.org/{level}/{col}/{row}.png",
                    subDomains: ["a", "b", "c"]
                })],
                title: 'Open Street Map',
                id: "OpenStreetMap",
                thumbnailUrl: "/map/images/baseMaps/openstreet.jpg"
            }),
        ];

        state.map = new EsriMap({
            basemap: state.baseMaps[1]
        });








    },
    setMapView(state, MapView) {
        state.mapView = MapView
    },
    setViewReady(state, viewReady) {
        state.viewReady = viewReady
    },

    setMap(state, map) {
        state.map = map
    },
    setBaseMap(state, index) {
        state.baseMap = index
    },

}


