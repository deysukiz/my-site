// ==================== //
// Smooth Scrolling
// ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== //
// Gallery Lightbox
// ==================== //
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;

// Open lightbox when clicking on gallery item
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    
    // Check if item has an actual image or is a placeholder
    const img = item.querySelector('img');
    if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
    } else {
        // If it's a placeholder, create a temporary image from the gradient
        const placeholder = item.querySelector('.gallery-placeholder');
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 800;
        const ctx = canvas.getContext('2d');
        
        // Get gradient colors from the placeholder
        const bgStyle = window.getComputedStyle(placeholder).background;
        ctx.fillStyle = bgStyle;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = '#ffffff';
        ctx.font = '30px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Replace with your artwork', canvas.width/2, canvas.height/2);
        
        lightboxImg.src = canvas.toDataURL();
        lightboxImg.alt = 'Placeholder';
    }
    
    lightboxCaption.textContent = item.dataset.title || 'Untitled';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

// Event listeners for lightbox controls
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
});

// ==================== //
// Navigation Background on Scroll
// ==================== //
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ==================== //
// Add loading animation for gallery images
// ==================== //
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('.gallery-item img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            });
        }
    });
}

// Call when page loads
window.addEventListener('load', addImageLoadingAnimation);

// ==================== //
// HOW TO ADD YOUR IMAGES TO THE GALLERY
// ==================== //
/*
To add your actual artwork images to the gallery:

1. Create an 'images' folder in the same directory as this HTML file
2. Add your artwork images to that folder (jpg, png, etc.)
3. Replace the gallery placeholder divs in index.html with actual images like this:

<div class="gallery-item" data-title="Your Artwork Title">
    <img src="images/your-artwork.jpg" alt="Description of your artwork">
</div>

Example:
<div class="gallery-item" data-title="Sunset Landscape">
    <img src="images/sunset.jpg" alt="Oil painting of a sunset over mountains">
</div>

You can add as many gallery items as you want!
*/
