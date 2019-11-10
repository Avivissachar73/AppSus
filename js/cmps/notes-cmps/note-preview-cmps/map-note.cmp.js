'use strict';

import mapService from '../../../services/miss-keep-services/map-service.js';

export default {
    name: 'map-note',
    props: ['note'],
    template: `
        <section class="flex column align-center justify-center">
            <h2 style="text-align:center;">MAPS ARE SHEET</h2>
            <div hidden id="googleMap" :ref="'googleMap'+note.id" style="height: 200px; width: 100%;"></div>
        </section>
    `,
    data() {
        return {
            map: {},
            marker: null,
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
    },
    mounted() {
        this.setMap();
    },
}