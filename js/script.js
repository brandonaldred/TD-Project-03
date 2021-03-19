//Grab namefield & focus
document.getElementById('name').focus();

//Hide 'other' jobrole input field until other is selected
const jobRoleOther = document.getElementById('other-job-role');
const jobRole = document.getElementById('title');
jobRoleOther.style.display = 'none';
jobRole.addEventListener('input', (e) => {
    jobRole.value === 'other' ? jobRoleOther.style.display = '' : jobRoleOther.style.display = 'none';
});

//Hide Designs until designs are clicked
const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
displayShirtColor(shirtDesign.value);


function displayShirtColor(data) {
    for (let i = 0; i < shirtColor.length; i++) {
        let shirt = shirtColor[i];
        if(shirt.getAttribute('data-theme') === data) {
            shirt.style.display = '';
        } else {
            shirt.style.display = 'none';
        }
    }
}

shirtDesign.addEventListener('input', (e) => {
    displayShirtColor(shirtDesign.value);
});