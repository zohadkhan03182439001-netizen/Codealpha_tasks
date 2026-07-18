// --- DOM Element Selectors ---
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let activeItems = [...galleryItems]; // Track visible items inside the current filter
let currentIndex = 0;

// --- 1. Category Filtering Logic ---
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Change button active states
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        activeItems = []; // Clear previous visible items list

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                activeItems.push(item); // Keep visible item for lightbox navigation
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// --- 2. Lightbox Functionality ---
function openLightbox(index) {
    currentIndex = index;
    const imgSrc = activeItems[currentIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function nextImage() {
    currentIndex = (currentIndex + 1) % activeItems.length;
    lightboxImg.src = activeItems[currentIndex].querySelector('img').src;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + activeItems.length) % activeItems.length;
    lightboxImg.src = activeItems[currentIndex].querySelector('img').src;
}

// --- 3. Event Listeners ---

// Initialize item click listeners based on current visibility status
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const indexInActive = activeItems.indexOf(item);
        if (indexInActive !== -1) {
            openLightbox(indexInActive);
        }
    });
});

// UI Control buttons
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

// Close lightbox on dark background clicks
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Keyboard Controls (Esc, Left & Right Arrow keys)
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});