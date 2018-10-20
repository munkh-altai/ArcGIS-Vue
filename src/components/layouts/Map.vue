<template>
    <div>
        <div id="map-box">
            <div id="map">
            </div>
            <div id="infoDiv">
                <input class="esri-component esri-widget-button esri-widget esri-interactive" type="button"
                       @click="switchMode" id="switch-btn" :value="mode == '3D' ? '2D' : '3D'">
            </div>
            <div id="base_map"></div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    import GraphicsLayer from "esri/layers/GraphicsLayer";
    import MapViewCreator from "esri/views/MapView";
    import SceneView from "esri/views/SceneView";

    import Point from "esri/geometry/Point";
    import BasemapGallery from "esri/widgets/BasemapGallery";

    import Basemap from "esri/Basemap";
    import LocalBasemapsSource from "esri/widgets/BasemapGallery/support/LocalBasemapsSource";
    import Extent from "esri/geometry/Extent";

    import {
        infoBar,
        measure,
        createDrawExtend,
        createOverView,
        createSearch,
        createScaleBar,
        createInfoBar,
        refresh
    } from "../../utils/Map";

    export default {
        methods: {
            switchMode() {
                if (this.mode == "2D") {
                    localStorage.setItem("mode", "3D");
                } else {
                    localStorage.setItem("mode", "2D");
                }
                refresh(this);
            },
            esriInit() {
                let viewCreator = this.mode == "2D" ? MapViewCreator : SceneView;

                // Create a MapView that displays map data

                let mapView = new viewCreator({
                    container: "map",
                    center: [this.center.lng, this.center.lat],
                    zoom: this.zoom,
                    map: this.map,
                    popup: {
                        highlightEnabled: false
                    }
                });


                this.$store.commit("setMapView", mapView);


                /*Main basemaps start*/
                var localSource = new LocalBasemapsSource({
                    basemaps: this.baseMaps
                });
                var basemapGallery = new BasemapGallery({
                    view: this.mapView,
                    container: "base_map",
                    source: localSource
                });
                /*Main basemaps end*/


                this.mapView.when(() => {
                    this.$store.commit("setViewReady", true);


                });

            },
            createMap() {

                this.$store.commit("init", window.init);

                this.esriInit();
            }
        },

        components: {},
        data() {
            return {

                currentSource: {},
                loading: false,
                goToCoordinate: null,
                scale: null,
                scaleFactor: null,
                drawExtend: false,
                showOverview: false,
                showGoTo: false,
            };
        },
        computed: {
            ...mapGetters({

                map: "map",
                baseMaps: "baseMaps",
                center: "center",
                baseMap: "baseMap",
                zoom: "zoom",

                mapView: "mapView",
                mode: "mode",
            })
        },
        mounted() {
            this.createMap();
        },
        beforeDestroy() {
            this.$store.state.watchHandle.remove();
        },
        watch: {},
        updated() {
        }
    };
</script>
