<template>
    <div>
        <SideBar>
        </SideBar>
        <a href="javascript:void(0)" v-if="index != localeIndex"
           :class="index == localeIndex ? 'locale-active nav-language' : 'nav-language'"
           v-for="(language, index) in languages" v-on:click="changeLanguage(language.code)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                 preserveAspectRatio="xMidYMid" class="lds-globe" style="background: none;">
                <g transform="rotate(-23.5 50 50)">
                    <circle cx="50" cy="50" r="40" fill="rgba(0,0,0,0)" stroke="#666" stroke-width="2"></circle>
                    <ellipse cx="50" cy="50" ry="0.1" fill="none" rx="40" stroke="#666" stroke-width="2"></ellipse>
                    <!--<ellipse cx="50" cy="50" fill="none"  ry="40" stroke="#666" stroke-width="2" rx="31.3816">-->
                    <!--<animate attributeName="rx" calcMode="linear" values="40;0;40" keyTimes="0;0.5;1" dur="1.8" begin="0s" repeatCount="1"></animate>-->
                    <!--</ellipse>-->
                    <ellipse cx="50" cy="50" fill="none" ry="40" stroke="#666" stroke-width="2" rx="4.74163">
                        <animate attributeName="rx" calcMode="linear" values="40;0;40" keyTimes="0;0.5;1" dur="1.8"
                                 begin="-0.5994s" repeatCount="1"></animate>
                    </ellipse>
                    <ellipse cx="50" cy="50" fill="none" ry="40" stroke="#666" stroke-width="2" rx="21.9544">
                        <animate attributeName="rx" calcMode="linear" values="40;0;40" keyTimes="0;0.5;1" dur="1.8"
                                 begin="-1.20006s" repeatCount="1"></animate>
                    </ellipse>
                </g>
            </svg>
            {{language.code}}</a>
        <button id="zoom-extend" @click="drawExtend = true">
            <i class="esri-icon-zoom-in-magnifying-glass"></i>
        </button>
        <div id="overview" :class="showOverview ? 'show-overview' : ''">
            <button class="" @click="showOverview = true" v-if="!showOverview">
                <i class="esri-icon-applications"></i>
            </button>
            <button class="" @click="showOverview = false" v-if="showOverview">
                <i class="esri-icon-overview-arrow-bottom-right"></i>
            </button>
            <div id="overview-container">
                <div id="extentDiv"></div>
            </div>
        </div>
        <div id="map-box" :class="drawExtend ? 'draw-extend' : ''">
            <div id="map">
                <div id="draw-polygon" class="esri-widget-button esri-widget esri-interactive"
                     title="Draw and measure polygon">
                    <img src="/images/rulers_@2X.png" alt="" class="draw-rule">
                </div>

            </div>
            <div id="infoDiv">
                <input class="esri-component esri-widget-button esri-widget esri-interactive" type="button"
                       id="switch-btn" value="3D">
            </div>
            <div id="info" >
                <span class="go-to-coordinates">

                </span>
                <span id="info-container" >

                </span>
                <div>
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="demo-ruleForm">
                        <el-form-item label="Password" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Confirm" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="Age" prop="age">
                            <el-input v-model.number="ruleForm2.age"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">Submit</el-button>
                            <el-button @click="resetForm('ruleForm2')">Reset</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getStaticWords, getAimags, changeLanguageServer} from '../../common/resources/resources';

    import {translatorNew} from '../../utils/Translator'

    import Header from '../layouts/Header.vue';
    import SideBar from './SideBar.vue';


    import MapViewCreator from "esri/views/MapView";


    import {infoBar, measure, createDrawExtend, createOverView, createSearch, createScaleBar, createInfoBar} from "../../utils/Map"





    export default {
        methods: {

            changeDrawExtend(value){
                this.drawExtend = value;
            },
            getdrawExtend(){
                return this.drawExtend;
            },
            getShowOverview(){
                return this.showOverview;
            },
            changeLanguage(locale) {

                this.loading = true;

//                    me.$store.commit('setStaticWords', words.data);
                this.$store.commit('changeLanguage', locale);
//                    window.init.locale = locale;

                getStaticWords(locale).then((words) => {
                    this.$store.commit('setStaticWords', words.data);

                    this.loading = false;


                });


            },
            esriInit() {





                // Create a MapView that displays map data
                let mapView = new MapViewCreator({
                    container: "map",
                    center: [this.center.lng, this.center.lat],
                    zoom: this.zoom,
                    map: this.map,
                    popup: {
                        highlightEnabled: false,
                    },
                });
                this.$store.commit('setMapView', mapView);


                this.mapView.when(() => {

                    this.$store.commit('setViewReady', true);


                    /* measure*/
                    measure(this.mapView);

                    /* Overview */
                    createOverView(this.mapView, this.center, this.getShowOverview, MapViewCreator);



                });


                /* widgets */
                infoBar(this.mapView);
                createSearch(this.mapView, this.staticWords.geocode);
                createScaleBar(this.mapView);
                createInfoBar(this.mapView, this.staticWords.gotocoordinates);
                createDrawExtend(this.mapView, this.getdrawExtend, this.changeDrawExtend);




            },
            createMap() {

                this.$store.commit('init', window.init);
                this.esriInit();


            }
        },

        components: {
            SideBar,
            HeaderC: Header,

        },
        data() {
            return {
                translatorNew: translatorNew,
                currentSource: {},
                loading: false,
                goToCoordinate: null,
                scale: null,
                scaleFactor: null,
                drawExtend: false,
                showOverview: false,


            }
        },
        computed: {
            ...mapGetters({
                staticWords: 'staticWords',
                widgets: 'widgets',
                page: 'page',
                map: 'map',
                baseMaps: 'baseMaps',
                center: 'center',
                baseMap: 'baseMap',
                zoom: 'zoom',
                locale: 'locale',
                connections: 'connections',
                showElement: 'showElement',
                layers: 'layers',
                mapLayers: 'mapLayers',
                localeIndex: 'localeIndex',
                local_basemaps: 'local_basemaps',
                username: 'username',
                overMaps: 'overMaps',
                overview: 'overview',
                languages: 'languages',
                mapView: 'mapView',

            })
        },

        mounted() {
            this.createMap();

        },
        beforeDestroy() {

            this.$store.state.watchHandle.remove()
        },
        watch: {},
        updated() {


        }
    };
</script>
