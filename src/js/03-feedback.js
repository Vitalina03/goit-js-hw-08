import throttle from 'lodash.throttle';

import '../css/03-feedback.css';
import '../css/common.css';

const LOCAL_KEY = 'feedback-form-state';
let formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form  input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('input', throttle(onInputData, 500));
refs.form.addEventListener('submit', onFormSubmit);

populateFeedbackForm();

function onInputData() {
  formData = {
    email: refs.input.value,
    message: refs.textarea.value,
  };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (localStorage.getItem(LOCAL_KEY)) {
    let data = JSON.parse(localStorage.getItem(LOCAL_KEY));
    console.log(data);
  }
  e.currentTarget.reset();
  localStorage.removeItem(LOCAL_KEY);
}

function populateFeedbackForm() {
  const savedMassage = localStorage.getItem(LOCAL_KEY);
  if (savedMassage) {
    formData = JSON.parse(savedMassage);
    refs.input.value = formData.email;
    refs.textarea.value = formData.message;
  }
}
