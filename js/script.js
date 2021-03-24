//Grab namefield & focus
const userName = document.getElementById('name');
userName.focus();

//Grab email field
let emailEl = document.getElementById('email');

//Validate Email Address
function emailValidate(email) {
    const regEx = /^\w*@\w*\.\w{2,}$/g;
    if (!regEx.test(email)) {
        //Do Something
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
function displayShirtColor(data, change) {
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

function removeTimeConflict (time) {
   for (let i = 0; i < times.length; i++) {
       if(times[i].getAttribute('data-day-and-time') === time && !times[i].checked) {
           times[i].disabled = true;
       }
   }
}

function restoreActivities(time) {
    for (let i = 0; i <times.length; i++) {
        if(times[i].getAttribute('data-day-and-time') === time && times[i].disabled) {
            times[i].disabled = false;
        }
    }
}

courses.addEventListener('change', (e) => {
    let time = e.target.getAttribute('data-day-and-time');
    let cost = e.target.getAttribute('data-cost');
    e.target.checked ? addCost(cost, true, time) : addCost(cost, false, time);
});







//Change/hide fields depending on payment method selected
function paymentMethods (type) {
    if (type === 'credit-card') {
        document.getElementById('credit-card').style.display = '';
        document.getElementById('paypal').style.display = 'none';
        document.getElementById('bitcoin').style.display = 'none';
    } else if(type === 'paypal') {
        document.getElementById('credit-card').style.display = 'none';
        document.getElementById('paypal').style.display = '';
        document.getElementById('bitcoin').style.display = 'none';
    } else if(type === 'bitcoin') {
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