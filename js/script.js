//Grab namefield & focus
document.getElementById('name').focus();

//Grab email field
let emailEl = document.getElementById('email');

//Validate Email Address
function emailValidate(email) {
    const regEx = /^\w*@\w*\.\w{2,}$/g;
    if (!regEx.test(email)) {
        emailEl.previousSibling.previousSibling.previousSibling.textContent = 'Email Address (Must be a valid Email):';
    } else {
        emailEl.previousSibling.previousSibling.previousSibling.textContent = 'Email Address:';
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

