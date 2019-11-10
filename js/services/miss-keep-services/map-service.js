'use strict';


export default {
    initMap,
    addMarker,
    getCoordJsonByStr,
    connectGoogleApi,
    createGeocodeAPI
}


const API_KEY = 'AIzaSyClJEGatJZ5nsl0wqdDZ3KLGNHKVUsY9WA';

export var currPos = {lat: 31.768319, lng: 35.21371};
getCurrLoc();

function getCurrLoc() {
    navigator.geolocation.getCurrentPosition(
        loc => {currPos.lat = loc.coords.latitude; currPos.lng = loc.coords.longitude;})
}

function addMarker(map, loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title: 'Hello World!'
    });
    return marker;
}

function initMap(element, lat = 32.0749831, lng = 34.9120554) {
    return new Promise((resolve, reject) => {
        resolve(new google.maps.Map(
            element, {
                center: {lat, lng},
                zoom: 15
        }))})
}

function connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function getCoordJsonByStr(locationSearchStr) {
    return fetch(createGeocodeAPI(locationSearchStr))
            .then(data => data.json())
}


function createGeocodeAPI(locationSearchStr) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${locationSearchStr}&key=${API_KEY}`;
}