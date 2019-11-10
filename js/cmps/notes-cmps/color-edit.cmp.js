'use strict';

import notesService from '../../services/miss-keep-services/notes-service.js';

console.log('note edit was loded successfully');

export default {
    name: 'color-palate-edit',
    template: `
        <section class="flex column align-center justify-center colors-edit-modal">
            <h3>Choose your colors</h3>
            <div v-for="(colors, key) in colorPalate" class="color-palate-container flex column">
                <h5>{{key}}</h5> 
                <div class="color-palate flex space-between">
                    <input :id="'editColorInput'+key" type="color" v-model="colorPalate[key][currEditColorIdx]">
                    <label class="palate-color" v-for="(color, idx) in colorPalate[key]" :for="'editColorInput'+key" @click="onSetCurrColorIdx(idx)" :style="{'background-color': color}"></label>
                </div>
            </div>
            <div class="flex space-around width-all">
                <button @click="onSaveColorPalate">Save</button>
                <button @click="onClose">&#10005;</button>
            </div>
        </section>
    `,
    data() {
        return {
            colorPalate: null,
            currEditColorIdx: -1
        }
    },
    methods: {
        onClose() {
            this.$emit('closeColorPalate')
        },
        getColorPalate() {
            notesService.getColorPalate()
            .then(colorPalate => {
                this.colorPalate ={...colorPalate};
                console.log(this.colorPalate);
            });
        },
        onSetCurrColorIdx(idx) {
            this.currEditColorIdx = idx;
        },
        onSaveColorPalate() {
            notesService.saveColorPalate(this.colorPalate)
                .then(() => {
                    console.log('color palate was saved')
                    // this.isEditColorPalate = false;
                    this.$emit('saveColorPalate')
                })
        }
    },
    created() {
        this.getColorPalate()
    }
};