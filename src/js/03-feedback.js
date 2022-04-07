import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  emailText: document.querySelector('.feedback-form input'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

refs.form.addEventListener('submit', addFormSubmit);

refs.form.addEventListener('input', throttle(addTextAndEmailInput, 500));

feedbackTextArea();

function addTextAndEmailInput(event) {
  formData[event.target.name] = event.target.value;

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
  if (parsedMessage.message) {
    refs.textarea.value = parsedMessage.message;
  }
  if (parsedMessage.email) {
    refs.emailText.value = parsedMessage.email;
  }
}
