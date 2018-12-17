// ===========================================
//  game intializing buttons
// ===========================================
const spaceElement = document.querySelector('[data-space]');
const dogElement = document.querySelector('[data-dogs]');
const catElement = document.querySelector('[data-cats]');
let level = 1;

function initialize(queryStr) {
    let pageSize = 100;
    let numImages = 6 + level * 2;
    let numSounds = 6 + level * 2;
    let durationEnd = 3;
    modalElement.classList.toggle('modal-hidden');
    button(queryStr, pageSize, numImages, numSounds, durationEnd);
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window['pJSDom'] = [];
}

spaceElement.addEventListener('click', () => {
    initialize('space');
});

dogElement.addEventListener('click', () => {
    initialize('dog');
});

catElement.addEventListener('click', () => {
    initialize('cat');
});
