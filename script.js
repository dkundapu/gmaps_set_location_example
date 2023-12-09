let map = undefined;
let draggableMarker = undefined;

function fetchGeoLocation() {
    if (!navigator.geolocation) {
        alert('GeoLocation not available. Please select location manually.');
        return false;
    }
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition((position) => {
        setMarker(position.coords.latitude, position.coords.longitude);
    },
    (err) => console.log(err),
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    });
}

function setMarker(lat, lng) {
    document.getElementById("location").innerHTML = lat + ',' + lng;
    map.setCenter({lat, lng});
    draggableMarker.position = {lat, lng};
}

async function initMap() {

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: { lat: 12.88, lng: 77.66 },
        mapId: "demo-map"
    });

    draggableMarker = new AdvancedMarkerElement({
        map,
        position: {lat: 12.88, lng: 77.66},
        gmpDraggable: true,
        title: "Location",
    });

    draggableMarker.addListener("dragend", (e) => {
        const position = draggableMarker.position;
        document.getElementById("location").innerHTML = position.lat + "," + position.lng;
    });

    fetchGeoLocation();
}

window.initMap = initMap;
