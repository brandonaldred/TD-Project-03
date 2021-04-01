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

//Different RegEx's depending on type of card and digit pattern
const ccRegEx = /^(\d{4})[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4})$/;
const amRegEx = /^(\d{4})[ -]?(\d{6})[ -]?(\d{5})/;

const emailHint = document.getElementById('cc-hint');
const ccInput = document.getElementById('cc-num');
insertLogo(1);

function ccType (number) {
    let type = '';
    if (/^4/.test(number)) {
        type = 'visa'
    }
    if (/^6/.test(number)) {
        type = 'discover'
    }
    if (/^34/.test(number) || /^37/.test(number)) {
        type = 'amex';
    }
    if (/^5[1-5]/.test(number)) {
        type = 'mastercard';
    }
    if (/\D/.test(number)) {
        type = 'invalid';
    }
    if (type == '') {
        type = 'cc';
    }
    return type;
}


function insertLogo(number) {
    ccInput.style.backgroundImage = `url('img/${ccType(number)}.png')`;
    ccInput.style.backgroundRepeat = "no-repeat";
    ccInput.style.backgroundSize = "35px";
    ccInput.style.backgroundPosition = "left";
    ccInput.style.paddingLeft = "40px";
}

function ccValidate(number) {
    let type = ccType(number);
    let output = '';
    let spanText = '';
    if ((type === 'Visa' || type === 'Mastercard' || type === 'Discover') && ccNumber.length === 16) {
        output = ccNumber.match(ccRegEx);
        spanText = `${output[1]}-${output[2]}-${output[3]}-${output[4]}`
    } else if (type === 'American express' && ccNumber.length === 15) {
        output = ccNumber.match(amRegEx);
        spanText = `${output[1]}-${output[2]}-${output[3]}`;
    } else {
        if (!output && type === 'Visa') {

            spanText = 'Please enter a valid Visa credit card number';
        }
        if (!output && type === 'American express') {
            spanText = 'Please enter a valid American Express credit card number';
        }
        if (!output && type === 'Mastercard') {
            spanText = 'Please enter a valid Mastercard credit card number';
        }
    }
    return spanText;
}

ccInput.addEventListener('input',(e) => {
    ccNumber = e.target.value;
    insertLogo(ccNumber);
    ccValidate(ccNumber);
});


const zipInput = document.getElementById('zip');
zipInput.setAttribute('maxlength', 5);

zipInput.addEventListener('input', (e) => {
    if(/\D/.test(e.target.value)) {
        zipInput.value = zipInput.value.replace(/\D/,'');
    }
});

const cvvInput = document.getElementById('cvv');
cvvInput.setAttribute('maxlength', 3);

cvvInput.addEventListener('input', (e) => {
    if(/\D/.test(e.target.value)) {
        cvvInput.value = cvvInput.value.replace(/\D/,'');
    }
});