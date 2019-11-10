'use strict';

import mapService from '../../../services/miss-keep-services/map-service.js';

export default {
    name: 'map-note',
    props: ['note'],
    template: `
        <section class="flex column align-center justify-center width-all">  
            <form @submit.prevent="onSearchMap">
                <input type="text" placeholder="Search a place" v-model="mapSearchStr"/>
                <button class="map-search-btn">Search</button>
            </form>
            <div :ref="'googleMap'+note.id" style="height: 200px; width: 100%"></div>
        </section>
    `,
    data() {
        return {
            mapSearchStr: '',
            map: {},
            marker: null
        }
    },
    methods: {
        setMap() {
            mapService.initMap(this.$refs['googleMap'+this.note.id], this.note.pos.lat, this.note.pos.lng)
                .then(map => {
                    this.map = map;
                    this.marker = mapService.addMarker(this.map, this.map.center);
                })
        },
        onSearchMap() {
            this.note.SearchStr = this.SearchStr;
            mapService.getCoordJsonByStr(this.mapSearchStr)
                .then(data => {
                    this.note.pos = data.results[0].geometry.location;
                    console.log(this.note.pos)
                    var laLatLng = new google.maps.LatLng(this.note.pos.lat, this.note.pos.lng);
                    this.map.panTo(laLatLng);
                    this.marker = mapService.addMarker(this.map, this.map.center);
                })
        }
    },
    mounted() {
        this.setMap()
    }
}