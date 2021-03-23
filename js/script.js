//Grab namefield & focus
document.getElementById('name').focus();

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
const totalCost = document.getElementById('activities-cost');

function addCost(amount, bool) {
    let total;
    let match = Number(totalCost.innerText.match(/\d+/));
    if (bool) {
        total = match + Number(amount);
    } else {
        total = match - Number(amount);
    }
    totalCost.innerHTML = `Total: $${total}`;

}


//Get boxes checked value to know what to add or subtract
const courses = document.getElementById('activities');
courses.addEventListener('change', (e) => {
    let cost = e.target.getAttribute('data-cost');
    e.target.checked ? addCost(cost, true) : addCost(cost, false);
});