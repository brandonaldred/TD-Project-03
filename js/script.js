//Grab namefield & focus
document.getElementById('name').focus();

//Hide 'other' jobrole input field until other is selected
const jobRoleOther = document.getElementById('other-job-role');
const jobRole = document.getElementById('title');
jobRoleOther.style.display = 'none';
jobRole.addEventListener('input', (e) => {
    if (jobRole.value === 'other') { jobRoleOther.style.display = '' };
}); 

//Hide Designs until designs are clicked
const shirtDesign = document.getElementById('design');
const shirtColors = document.getElementById('shirt-colors');
const shirtThemes = document.getElementById('color');
if (shirtDesign.value === 'Select Theme') { }

