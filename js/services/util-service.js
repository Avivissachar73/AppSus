'use strict';

export default {
    saveToLocalStorage,
    loadFromLocalStorage,
    getRandomInt,
    getRandomId
}

function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(100, 999).toString(16);
    var pt3 = getRandomInt(100, 999).toString(16);
    return pt3 + pt1 + pt2;
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


//get random init
function getRandomInt(num1, num2) {
    var maxNum = (num1 > num2)? num1+1 : num2+1;
    var minNum = (num1 < num2)? num1 : num2;
    var randomNumber = (Math.floor(Math.random()*(maxNum - minNum)) + minNum);
    return randomNumber;
}