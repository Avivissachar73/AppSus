'use strict';

export default {
    saveToLocalStorage,
    loadFromLocalStorage,
    getRandomInt,
    getRandomId,
    getCurrency
}

function getRandomId() {
    var pt1 = Date.now().toString(16);
    var pt2 = getRandomInt(1000, 9999).toString(16);
    var pt3 = getRandomInt(1000, 9999).toString(16);
    return `${pt3}${pt1}${pt2}`.toUpperCase();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
}

function loadFromLocalStorage(key) {
    return new Promise((resolve, reject) => {
        let data = JSON.parse(localStorage.getItem(key));
        if (data) {
            resolve(data);
        }
        else reject(`${key} was not found in local storage`);
    }) 
}


function getCurrency(currencyCode) {
    if (currencyCode === 'USD') return '$';
    if (currencyCode === 'EUR') return '€';
    if (currencyCode === 'ILS') return '₪';
    else return '#';
}


//get random init
function getRandomInt(num1, num2) {
    var maxNum = (num1 > num2)? num1+1 : num2+1;
    var minNum = (num1 < num2)? num1 : num2;
    var randomNumber = (Math.floor(Math.random()*(maxNum - minNum)) + minNum);
    return randomNumber;
}