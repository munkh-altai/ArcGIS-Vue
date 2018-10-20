
export function refresh(this_) {
    localStorage.setItem("zoom", this_.mapView.zoom);
    // localStorage.setItem("page", this_.page);
    // localStorage.setItem("showPage", this_.showPage);
    let latLong = this_.mapView.center;
    localStorage.setItem("lat", latLong.latitude);
    localStorage.setItem("lng", latLong.longitude);
    let showedLayers = [];

    window.location.reload();
}
