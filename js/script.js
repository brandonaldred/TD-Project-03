//Created an unecessary object to cut down on typing for snagging elements.
let grabEl = {
    id: function (id) {
        return document.getElementById(id);
    },
    class: function (id) {
        return document.getElementById(id);
    },
    query: function (id) {
        return document.querySelector(id);
    },
    queryAll: function (id) {
        return document.querySelectorAll(id);
    },
    tag: function (id) {
        return document.getElementsByTagName(id);
    }
}

//Declaration of all elements
const userName = grabEl.id('name');
const userEmail = grabEl.id('email');
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

const validations = {
    name: (name) => name.length >= 1 && / \w{2}/.test(name),
    email: (email) => { (email.length > 1) || grabEl.query('.enter-valid-email') },
    cost: (cost) => { Number(cost.match(/\d+/)) > 0 },
    cc: (ccNum) => { ccNum.length > 13 },
    zip: (zip) => { zip.length === 5 },
    cvv: (cvv) => { cvv.length === 3; }
}

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
    if (data === 'Select Theme') {
        shirtColor.disabled = true;
    } else {
        shirtColor.disabled = false;
    }
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
    remove: function (time) {
        for (let i = 0; i < times.length; i++) {
            if (attributeGrabber(times[i], 'data-day-and-time') === time && !times[i].checked) {
                times[i].disabled = true;
            }
        }
    },
    restore: function (time) {
        for (let i = 0; i < times.length; i++) {
            if (attributeGrabber(times[i], 'data-day-and-time') === time && times[i].disabled) {
                times[i].disabled = false;
            }
        }
    }
}

function attributeGrabber(element, attribute) {
    return element.getAttribute(attribute);
}

function addCost(amount, bool, time) {
    let total;
    let match = Number(totalCost.innerText.match(/\d+/));
    bool ? total = match + Number(amount) : total = match - Number(amount);
    bool ? activities.remove(time) : activities.restore(time);
    totalCost.innerHTML = `Total: $${total}`;
}

function digitOnly(target) {
    if (/\D/.test(target.value)) {
        target.value = target.value.replace(/\D/, '');
    }
}

//Event listeners on items that update real time
email.addEventListener('input', () => {
    emailValidate(email.value);
});

jobRole.addEventListener('input', (e) => {
    jobRole.value === 'other' ? jobRoleOther.style.display = '' : jobRoleOther.style.display = 'none';
});

zipInput.addEventListener('input', (e) => {
    digitOnly(e.target);
});

cvvInput.addEventListener('input', (e) => {
    digitOnly(e.target);
});

ccInput.addEventListener('input', (e) => {
    digitOnly(e.target);
});

shirtDesign.addEventListener('change', (e) => {
    displayShirtColor(e.target.value, true);
});

courses.addEventListener('change', (e) => {
    let time = attributeGrabber(e.target, 'data-day-and-time');
    let cost = attributeGrabber(e.target, 'data-cost');
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
    //Run through all of the validations and if there are errors, display the messages. Then prevent the default action for submit.
    e.preventDefault();
    const testItem = document.querySelectorAll('.hint');
    const keys = Object.keys(validations);
    for (let i = 0; i < testItem.length; i++) {
        let sibling = testItem[i].previousSibling;
        //console.log(testItem[i].previousElementSibling.id);
        testItem[i].style.display = 'inline-block';
    }
});


//Change/hide fields depending on payment method selected
function paymentMethods(type) {
    const pmtMethods = ['credit-card', 'paypal', 'bitcoin'];
    for (let i = 0; i < pmtMethods.length; i++) {
        let method = pmtMethods[i];
        method === type ? grabEl.id(method).style.display = '' : grabEl.id(method).style.display = 'none';
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
/*
Form cannot be submitted (the page does not refresh when the submit button is clicked) until the following requirements have been met:
"Name" field isn’t blank.
"Email" field contains a correctly formatted email address.
At least one activity has been selected.
If "Credit Card" is the selected payment option, the three credit card fields accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 3-digit CVV value.
When all the required fields are filled out correctly, the form submits (the page refreshes on its own when the submit button is clicked).

On submission, the validation error message, icon and color are displayed on invalid required fields:
"Name"
"Email Address"
"Register for Activities"
If "Credit Card" is the selected payment method:
"Card Number"
"Zip Code"
"CVV"


At least one required form field provides validation error messages that differ depending on the reason the field is invalid.
Form fields that have real time validation and conditional error messages are detailed in the project’s README.me file.


*/

userName.focus();