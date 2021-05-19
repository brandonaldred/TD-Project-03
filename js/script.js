const nameInput = document.getElementById('name');
nameInput.focus();

const jobRole = document.getElementById('title');
const jobRoleOther = jobRole.nextElementSibling;
jobRoleOther.style.display = 'none';
jobRole.addEventListener('input', (e) => {
    e.target.value === 'other' ? jobRoleOther.style.display = '' : jobRoleOther.style.display = 'none';
});

const shirtDesign = document.getElementById('design');
const shirtColor = document.getElementById('color');
console.log(shirtColor);
shirtColor.disabled = 'true';


shirtDesign.addEventListener('input', (e) => {
    console.log(e.target.value);
});