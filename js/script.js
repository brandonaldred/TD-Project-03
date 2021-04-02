//Created an unecessary object to cut down on typing for snagging elements. 
let grabEl = {
    id: function(id) {return document.getElementById(id);},
    class: function(id) {return document.getElementById(id);},
    query: function(id) {return document.querySelectorAll(id);},
    queryAll: function(id) {return document.querySelectorAll(id);},
    tag: function(id) {return document.getElementsByTagName(id);}
}

//Declaration of all elements
const userName = grabEl.id('name');
const emailEl = grabEl.id('email');
const jobRoleOther = grabEl.id('other-job-role');
const jobRole = grabEl.id('title');
const shirtDesign = grabEl.id('design');
const courses = grabEl.id('activities');
const times = courses.querySelectorAll('input');
const totalCost = grabEl.id('activities-cost');
const paymentMethod = grabEl.id('payment');
const form = grabEl.tag('form');
const submit = grabEl.tag('button');
const date = new Date();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const expMonth = grabEl.id('exp-month');
const currentYear = document.createElement('option');
const cvvInput = grabEl.id('cvv');
const ccRegEx = /^(\d{4})[ -]?(\d{4})[ -]?(\d{4})[ -]?(\d{4})$/;
const amRegEx = /^(\d{4})[ -]?(\d{6})[ -]?(\d{5})/;
const email = grabEl.id('email');
const emailHint = grabEl.id('cc-hint');
const ccInput = grabEl.id('cc-num');
const zipInput = grabEl.id('zip');

//Intial modifications for selections and inputs
jobRoleOther.style.display = 'none';
paymentMethod[1].selected = true;
ccInput.setAttribute('maxlength', 16);
cvvInput.setAttribute('maxlength', 3);
zipInput.setAttribute('maxlength', 5);
displayShirtColor(shirtDesign.value, false);
paymentMethods(paymentMethod[1].value);

//Validate Email Address | Split into 3 matches by excluding @ and . before com or net, etc.
function emailValidate(email) {
    const regEx = /^\w*@\w*\.\w{2,}$/g;
    if (!regEx.test(email)) {
        ;
        enterValidEmail();
    } else {
        const span = grabEl.query('.enter-valid-email');
        if (span) {
            span.parentNode.removeChild(span);
        }
    }
}

function enterValidEmail() {
    const emailHint = grabEl.id('email-hint');
    const span = document.createElement('span');
    span.className = 'enter-valid-email';
    if (emailHint.parentNode.querySelectorAll('.enter-valid-email').length === 0) {
        span.style.color = 'red';
        span.textContent = 'Please insert a valid e-mail';
        emailHint.parentNode.insertBefore(span, emailHint);
    }
}

//Function to change shirt color options based on the design selected
function displayShirtColor(data) {
    const shirtColor = grabEl.id('color');
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

//Functions that add up cost of courses and remove any conflics
let activities = {
    remove: function(time) {
        for (let i = 0; i < times.length; i++) {
            if (times[i].getAttribute('data-day-and-time') === time && !times[i].checked) {
                times[i].disabled = true;
            }
        }
    },
    restore: function(time) {
        for (let i = 0; i < times.length; i++) {
            if (times[i].getAttribute('data-day-and-time') === time && times[i].disabled) {
                times[i].disabled = false;
            }
        }
    }
}

function addCost(amount, bool, time) {
    let total;
    let match = Number(totalCost.innerText.match(/\d+/));
    if (bool) {
        total = match + Number(amount);
        activities.remove(time);
    } else {
        total = match - Number(amount);
        activities.restore(time);
    }
    totalCost.innerHTML = `Total: $${total}`;
}

//Event listeners on items that update real time
email.addEventListener('input', () => {
    emailValidate(email.value);
});

jobRole.addEventListener('input', (e) => {
    jobRole.value === 'other' ? jobRoleOther.style.display = '' : jobRoleOther.style.display = 'none';
});

zipInput.addEventListener('input', (e) => {
    if(/\D/.test(e.target.value)) {
        zipInput.value = zipInput.value.replace(/\D/,'');
    }
});

cvvInput.addEventListener('input', (e) => {
    if(/\D/.test(e.target.value)) {
        cvvInput.value = cvvInput.value.replace(/\D/,'');
    }
});

ccInput.addEventListener('input',(e) => {
    ccNumber = e.target.value;
    insertLogo(ccNumber);
    ccValidate(ccNumber);
});

shirtDesign.addEventListener('change', () => {
    displayShirtColor(shirtDesign.value, true);
});

courses.addEventListener('change', (e) => {
    let time = e.target.getAttribute('data-day-and-time');
    let cost = e.target.getAttribute('data-cost');
    e.target.checked ? addCost(cost, true, time) : addCost(cost, false, time);
});

paymentMethod.addEventListener('change', (e) => {
    paymentMethods(paymentMethod.value);
});

expMonth.addEventListener('change', (e) => {
    removeExpYear(e.target.value);
});

courses.addEventListener('focusin', (e) => {
    e.target.parentNode.style.borderColor = 'rgb(9, 73, 250)';
});

courses.addEventListener('focusout', (e) => {
    e.target.parentNode.style.borderColor = '';
});

submit[0].addEventListener('click', (e) => {
    if (!userName.value) {
        console.log('enter name');
        e.preventDefault();
    }
});

//Change/hide fields depending on payment method selected
function paymentMethods(type) {
    if (type === 'credit-card') {
        grabEl.id('credit-card').style.display = '';
        grabEl.id('paypal').style.display = 'none';
        grabEl.id('bitcoin').style.display = 'none';
    } else if (type === 'paypal') {
        grabEl.id('credit-card').style.display = 'none';
        grabEl.id('paypal').style.display = '';
        grabEl.id('bitcoin').style.display = 'none';
    } else if (type === 'bitcoin') {
        grabEl.id('credit-card').style.display = 'none';
        grabEl.id('paypal').style.display = 'none';
        grabEl.id('bitcoin').style.display = '';
    }
}

function removeExpYear(selectedMonth) {
    const expYear = grabEl.id('exp-year');
    const options = expYear.querySelectorAll('option');
    if (options[1].value == year && selectedMonth < month) {
        options[1].hidden = true;
    } else {
        options[1].hidden = false;
    }

}

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
    if ((type === 'visa' || type === 'mastercard' || type === 'discover') || ccNumber.length === 16) {
        output = ccNumber.match(ccRegEx);
        ccInput.value = `${output[1]}-${output[2]}-${output[3]}-${output[4]}`
    } else if (type === 'amex' && ccNumber.length === 15) {
        output = ccNumber.match(amRegEx);
        ccInput.value = `${output[1]}-${output[2]}-${output[3]}`;
    } 
}

userName.focus();
insertLogo(1);