import '@babel/polyfill';
import '@babel/core';
import { displayMap } from './mapbox';
import { login, logout } from './login';

//DOM
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');
const logOutBtn = document.querySelector('.nav__el--logout');

//values
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
//delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('submit happen');
    login(email, password);
  });
}
if (logOutBtn) logOutBtn.addEventListener('click', logout);
