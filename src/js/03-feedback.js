import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

form.addEventListener('submit', addFormSubmit);
form.addEventListener('input', throttle(addTextAndEmailInput, 500));

feedbackTextArea();

function addTextAndEmailInput() {
  formData.email = form.email.value;
  formData.message = form.message.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function addFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function feedbackTextArea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);

  if (parsedMessage) {
    form.message.value = parsedMessage.message;
    form.email.value = parsedMessage.email;
  }
}
