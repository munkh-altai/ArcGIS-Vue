// import createPersistedState from 'vuex-persistedstate'
import actions from "./actions"
import mutations from "./mutations"
import getters from "./getters";

let zoom = stored('zoom');
let mode = stored('mode');
let lng = stored('lng');
let lat = stored('lat');
export default {
    state:{
        mode:mode ? mode : '3D',
        mainColor:'#225ba5',
        page: null,
        hexagonLayer: null,
        hexagonLayer_filtered: null,
        hexagonsSet:false,
        showSideBar:false,
        showPage:false,
        showElement:false,
        map:null,
        mapView:null,
        viewReady:false,
        center:{
            lat:lat ? lat : 47.4429,
            lng:lng ? lng : 104.1284
        },
        baseMap:0,
        zoom: zoom ? zoom : 4,
        layers:[],
        baseMaps:[]
     },
    getters,
    mutations,
    actions,
};
function stored(key){
   return localStorage.getItem(key);
}
