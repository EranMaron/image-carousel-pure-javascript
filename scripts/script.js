const carousel = document.querySelector('.carousel-slider');
const loadingMsg = document.querySelector('.loading-container');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let imagesArrey = [];

// Fetching images
function fetchImages() {
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=10')
    .then(res => res.json())
    .then(images => {
        loadingMsg.style.display = 'none';
        images.forEach(image => {
            let img = document.createElement('img');
            img.src = image.url
            img.setAttribute('alt', image.title)
            carousel.appendChild(img) 
            leftArrow.disabled = false;  
        })
        imagesArrey = Array.from(carousel.children);
    })
}

// Set timeout before fetching the images 
setTimeout(() => {
    fetchImages();
}, 1000);

let counter = 0;
const size = 600;

rightArrow.disabled = true;  
leftArrow.disabled = true;  

// Left arrow click handler
leftArrow.addEventListener('click', () => {
    if (counter++ === imagesArrey.length - 2) {
        leftArrow.disabled = true   
        carousel.style.transform = 'translateX(' + (-size * counter) + 'px)'; 
        return;
    }
    rightArrow.disabled = false;  
    carousel.style.transition = 'transform .6s ease-in-out';
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)'; 
})

// Right arrow click handler
rightArrow.addEventListener('click', () => {
    if(counter-- <= 1) {
        rightArrow.disabled = true;  
        carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
        return;
    }
    leftArrow.disabled = false; 
    carousel.style.transition = 'transform .6s ease-in-out';
    carousel.style.transform = 'translateX(' + (-size * counter) + 'px)';
})
