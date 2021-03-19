//Grab namefield & focus
document.getElementById('name').focus();

//Hide 'other' jobrole input field until other is selected
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
            shirt.style.display = '';
        } else {
            shirt.style.display = 'none';
        }
    }
    if (change) {
        let pleaseSelect = document.createElement('option');
        pleaseSelect.innerText = 'Select A Color';
        shirtColor.prepend(pleaseSelect);
        shirtColor.selectedIndex = 0;
    }
}

//Adding event listener to the design selector and updating shirt color changes
shirtDesign.addEventListener('change', () => {
    displayShirtColor(shirtDesign.value, true);
});