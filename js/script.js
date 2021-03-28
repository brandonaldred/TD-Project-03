//Grab namefield & focus
const userName = document.getElementById('name');
userName.focus();

//Grab email field
let emailEl = document.getElementById('email');


//Creating an element to enter for valid email
function enterValidEmail() {
    const emailHint = document.getElementById('email-hint');
    const span = document.createElement('span');
    span.className = 'enter-valid-email';
    if (emailHint.parentNode.querySelectorAll('.enter-valid-email').length === 0) {
        span.style.color = 'red';
        span.textContent = 'Please insert a valid e-mail';
        emailHint.parentNode.insertBefore(span, emailHint);
    }
}

//Validate Email Address

//Split into 3 matches by excluding @ and . before com or net, etc.
function emailValidate(email) {
    const regEx = /^\w*@\w*\.\w{2,}$/g;
    if (!regEx.test(email)) {
        ;
        enterValidEmail();
    } else {
        const span = document.querySelector('.enter-valid-email');
        if (span) {
            span.parentNode.removeChild(span);
        }
    }
}

//Hide 'other' job role input field until other is selected
const jobRoleOther = document.getElementById('other-job-role');
const jobRole = document.getElementById('title');
jobRoleOther.style.display = 'none';
jobRole.addEventListener('input', (e) => {
    jobRole.value === 'other' ? jobRoleOther.style.display = '' : jobRoleOther.style.display = 'none';
});

//Getting the shirt design value and updating color drop down
const shirtDesign = document.getElementById('design');
displayShirtColor(shirtDesign.value, false);

//Function to change shirt color options based on the design selected
function displayShirtColor(data) {
    const shirtColor = document.getElementById('color');
    for (let i = 0; i < shirtColor.length; i++) {
        let shirt = shirtColor[i];
        if (shirt.getAttribute('data-theme') === data) {
            shirt.selected = true;
            shirt.hidden = false;
        } else {
            shirt.hidden = true;
        }
    }
}

//Adding listener for email address
email.addEventListener('input', () => {
    emailValidate(email.value);
});

//Adding event listener to the design selector and updating shirt color changes
shirtDesign.addEventListener('change', () => {
    displayShirtColor(shirtDesign.value, true);
});


//Add up selected courses
//Get boxes checked value to know what to add or subtract
const courses = document.getElementById('activities');
const times = courses.querySelectorAll('input');
const totalCost = document.getElementById('activities-cost');

function addCost(amount, bool, time) {
    let total;
    let match = Number(totalCost.innerText.match(/\d+/));
    if (bool) {
        total = match + Number(amount);
        removeTimeConflict(time);
    } else {
        total = match - Number(amount);
        restoreActivities(time);
    }
    totalCost.innerHTML = `Total: $${total}`;
}

function removeTimeConflict(time) {
    for (let i = 0; i < times.length; i++) {
        if (times[i].getAttribute('data-day-and-time') === time && !times[i].checked) {
            times[i].disabled = true;
        }
    }
}

function restoreActivities(time) {
    for (let i = 0; i < times.length; i++) {
        if (times[i].getAttribute('data-day-and-time') === time && times[i].disabled) {
            times[i].disabled = false;
        }
    }
}

courses.addEventListener('change', (e) => {
    let time = e.target.getAttribute('data-day-and-time');
    let cost = e.target.getAttribute('data-cost');
    e.target.checked ? addCost(cost, true, time) : addCost(cost, false, time);
});

courses.addEventListener('focusin', (e) => {
    e.target.parentNode.style.borderColor = 'rgb(9, 73, 250)';
});

courses.addEventListener('focusout', (e) => {
    e.target.parentNode.style.borderColor = '';
});






//Change/hide fields depending on payment method selected
function paymentMethods(type) {
    if (type === 'credit-card') {
        document.getElementById('credit-card').style.display = '';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'none';
    } else if (type === 'paypal') {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('paypal').style.display = '';
        document.getElementById('bitcoin').style.display = 'none';
    } else if (type === 'bitcoin') {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('bitcoin').style.display = '';
    }
}

const paymentMethod = document.getElementById('payment');
paymentMethod[1].selected = true;
paymentMethods(paymentMethod[1].value);
paymentMethod.addEventListener('change', (e) => {
    paymentMethods(paymentMethod.value);
});

const form = document.getElementsByTagName('form');
const submit = document.getElementsByTagName('button');
submit[0].addEventListener('click', (e) => {
    if (!userName.value) {
        console.log('enter name');
        e.preventDefault();
    }
});


//Credit card validation
const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();

function removeExpYear(selectedMonth) {
    const expYear = document.getElementById('exp-year');
    const options = expYear.querySelectorAll('option');
    if (options[1].value == year && selectedMonth < month) {
        options[1].hidden = true;
    } else {
        options[1].hidden = false;
    }

}

const expMonth = document.getElementById('exp-month');
const currentYear = document.createElement('option');
expMonth.addEventListener('change', (e) => {
    removeExpYear(e.target.value);
});

//Validate CC Number
function ccValidate(ccNumber,format) {
    const regEx = /^(\d{4})-?(\d{4})-?(\d{4})-?(\d{4})$/g;
    if (!regEx.test(ccNumber)) {
        ;
        enterValidCC();
    } else {
        const span = document.querySelector('.enter-valid');
        if (span) {
            span.parentNode.removeChild(span);
            format.value = `$1-$2-$3-$4`;
        }
    }
}

//Creating an element to enter for valid CC
function enterValidCC() {
    const emailHint = document.getElementById('cc-hint');
    const span = document.createElement('span');
    span.className = 'enter-valid';
    if (emailHint.parentNode.querySelectorAll('.enter-valid').length === 0) {
        span.style.color = 'red';
        span.textContent = 'Please insert a valid credit card number';
        emailHint.parentNode.insertBefore(span, emailHint);
    }
}

const creditCardNum = document.getElementById('cc-num');
creditCardNum.addEventListener('input', (e) => {
    let ccNumber =  e.target.value;
    let format = e.target;
    ccValidate(ccNumber, format);
});


/////Custom CC Validator with card type
const input = document.querySelector('input');
const div = document.querySelector('div');
const p = document.querySelector('p');

const ccRegEx = /^(\d{4})[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4})$/;
const amRegEx = /^(\d{4})[ -]?(\d{6})[ -]?(\d{5})/;

function ccFormat(ccNumber) {
    let type = '';
    div.textContent = '';
    if (/^4/.test(ccNumber)) {
        type = 'Visa'
    }
    if (/^6/.test(ccNumber)) {
        type = 'Discover'
    }
    if (/^34/.test(ccNumber) || /^37/.test(ccNumber)) {
        type = 'American express';
    }
    if (/^5[1-5]/.test(ccNumber)) {
        type = 'Mastercard';
    }
    if (!ccNumber || /\D/.test(ccNumber)) {
        type = 'A valid credit card is required';
    }
    p.textContent = type;
    let output = '';
    if ((type === 'Visa' || type === 'Mastercard' || type === 'Discover') && ccNumber.length === 16) {
        output = ccNumber.match(ccRegEx);
        div.textContent = `${output[1]}-${output[2]}-${output[3]}-${output[4]}`
    } else if (type === 'American express' && ccNumber.length === 15) {
        output = ccNumber.match(amRegEx);
        div.textContent = `${output[1]}-${output[2]}-${output[3]}`;
    } else {
        if (!output && type === 'Visa') {
            div.textContent = 'Please enter a valid Visa credit card number';
        }
        if (!output && type === 'American express') {
            div.textContent = 'Please enter a valid American Express credit card number';
        }
        if (!output && type === 'Mastercard') {
            div.textContent = 'Please enter a valid Mastercard credit card number';
        }
    }
}

//To be applied
// background: url('') no-repeat 0;
// background-size: contain;
// background-position: right;
// padding-right: 75px;

input.addEventListener('input', (e) => {
    ccFormat(e.target.value);
});