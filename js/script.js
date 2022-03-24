// variables targetting the name and job title elements

const names = document.getElementById('name')
names.focus();
const jobRole = document.getElementById('title');
const design = document.getElementById('design');
const colors = document.getElementById('color');


// select 'other' input and set it's native display to none

const otherRole = document.getElementById('other-job-role');
otherRole.style.display = 'none';


// if 'other' input is selected, display it

jobRole.addEventListener( 'change', (e) =>  {
 if (e.target.value === 'other') {
   otherRole.style.display = 'block';
 } else if (e.target.value !== 'other') {
   otherRole.style.display = 'none';
 }
});

colors.disabled = true;

design.addEventListener( 'change', (e) =>  {
  colors.disabled = false;
  const options = colors.children
  for ( let option of options ) {
    let optionValue = e.target.value
    let optionTheme = option.getAttribute('data-theme')
    if (optionValue !== optionTheme) {
      option.hidden = true
      option.removeAttribute('selected')
    } else {
      option.hidden = false
      option.setAttribute('selected', 'true')
    }
  }
});

// variables for activities and the total cost of them when selected

const activities = document.querySelectorAll('.activities-box input');
const register = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let total = 0;

register.addEventListener('change', (e) => {
  let price = +e.target.getAttribute('data-cost')
  if (e.target.checked) {
    total += price;
  } else {
    total -= price;
  }
  activitiesCost.innerHTML = `Total: $${total}`;
});

// variables for payment methods

const paying = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const coin = document.getElementById('bitcoin');
paying.children[1].setAttribute('selected', 'selected');
paypal.hidden = 'true';
coin.hidden = 'true';
// event listener for payment types, displaying only the one selected, with credit as the default

paying.addEventListener('change', (e) => {
  if (e.target.value === 'credit-card') {
    credit.hidden = false;
    paypal.hidden = true;
    coin.hidden = true;
  } else if (e.target.value === 'paypal') {
    credit.hidden = true;
    paypal.hidden = false;
    coin.hidden = true;
  } else if (e.target.value === 'bitcoin') {
    credit.hidden = true;
    paypal.hidden = true;
    coin.hidden = false;
  }
});

const email = document.getElementById('email');
const creditNumber = document.getElementById('cc-num');
const zip = document.getElementById('zip')
const cardVerify = document.getElementById('cvv');
const form = document.querySelector('form');

//const nameValidator = () => {
//  let nameValue = names.value;
//  const nameValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue)
//  return nameValid
//};

const nameValidator = (name) => {
  const element = names.parentNode
  if (!/\S/.test(name)) {
    invalidStyle(element)
    return false
  } else {
    validStyle(element)
    return true
  }
};

const emailValidator = () => {
  let emailValue = email.value;
  const emailValid = /^[^@]+@[^@.]+\.com+$/i.test(emailValue)
  return emailValid;
};

const ccVerify = () => {
  let ccValue = creditNumber.value;
  const ccValid = /^\d{13,16}$/.test(ccValue);
  return ccValid;
};

const zipVerify = () => {
  let zipValue = zip.value;
  const zipValid = /^\d{5}$/.test(zipValue);
  return zipValid;
};

const cvvVerify = () => {
  let cvvValue = cardVerify.value;
  const cvvValid = /^\d{3}$/.test(cvvValue);
  return cvvValid;
};

const registerValidator = () => {
  const registerValid = total > 0;
  return registerValid;
};

function validStyle(inputField) {
  inputField.parentNode.classList.remove('not-valid');
  inputField.parentNode.classList.add('valid');
  inputField.parentElement.lastElementChild.style.display = 'none';
};

function invalidStyle(inputField) {
  inputField.parentNode.classList.add('not-valid');
  inputField.parentNode.classList.remove('valid');
  inputField.parentElement.lastElementChild.style.display = 'block';
};

// this is the event listener that checks for inputs and displays if they are invalid or valid

form.addEventListener( 'submit', (e) => {
  if (!nameValidator()) {
    e.preventDefault();
    console.log('Form failed to submit due to an invalid name input.');
    invalidStyle(names);
  } else if (nameValidator()) {
    validStyle(names);
  };

  if(!emailValidator()) {
    e.preventDefault();
    console.log('Please enter a valid email.');
    invalidStyle(email);
  } else if (emailValidator()) {
    validStyle(email);
  };

  if(!registerValidator()) {
    e.preventDefault()
    console.log('Please select at least one activity.')
    register.classList.add('not-valid');
        register.classList.remove('valid');
        register.lastElementChild.style.display = 'block';
    } else if (registerValidator()) {
        register.classList.remove('not-valid');
        register.classList.add('valid');
        register.lastElementChild.style.display = 'none';
    };

    if (credit.hidden === false) {
      if (!ccVerify()) {
        e.preventDefault();
        console.log('Please enter a credit card number between 13 and 16 numbers.')
        invalidStyle(creditNumber);
      } else if (ccVerify()) {
        validStyle(creditNumber)
      }
    };

    if (!zipVerify()) {
      e.preventDefault();
      console.log('Please enter a valid zip code.')
      invalidStyle(zip);
    } else if (zipVerify()) {
      validStyle(zip);
    };

    if (!cvvVerify()) {
      e.preventDefault();
      console.log('Please enter a 3 digit CVV.')
      invalidStyle(cardVerify);
    } else if (cvvVerify()) {
      validStyle(cardVerify);
    };
});

// loop through activities list in order to prominently display which one is selected

for (let i = 0; i < activities.length; i++) {
  activities[i].addEventListener('focus', (e) => {
    activities[i].parentNode.classList.add('focus');
  });
  activities[i].addEventListener('blur', (e) => {
    activities[i].parentNode.classList.remove('focus');
  });
};
