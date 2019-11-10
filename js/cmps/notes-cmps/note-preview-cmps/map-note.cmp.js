'use strict';

import mapService from '../../../services/miss-keep-services/map-service.js';

export default {
    name: 'map-note',
    props: ['note'],
    template: `
        <section class="flex column align-center justify-center">
            <!-- <div hidden :ref="'googleMap'+note.id" style="height: 200px; width: 100%;" class="google-map"></div> -->
            <iframe ref="mapFrame" :src="googleMapApi" style="height: 200px; width: 100%;"></iframe>
        </section>
    `,
    data() {
        return {
            map: {},
            marker: null,
            googleMapApi: ''
        }
    },
    methods: {
        setMap1() {
            mapService.initMap(this.$refs['googleMap'+this.note.id], this.note.pos.lat, this.note.pos.lng)
                .then(map => {
                    this.map = map;
                    this.marker = mapService.addMarker(this.map, this.map.center);
                })
        },
        setMap() {
            this.googleMapApi = mapService.createGeocodeAPI(this.note.searchStr)
        },
    },
    mounted() {
        this.setMap();
    },
    watch: {
        googleMapApi() {
            this.$refs.mapFrame.src = this.googleMapApi;
        }
    }
}