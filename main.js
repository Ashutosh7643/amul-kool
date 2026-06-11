const frameCount = 240;
const images = [];
let loadedCount = 0;
let currentFrameIndex = 0;
let tick = false;

// Generate frame image paths (from public/frames/)
const getFramePath = (index) => {
    return `/frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;
};

// Canvas drawing function with high-DPI retina display support and Contain fit
const drawImage = (img) => {
    if (!img) return;
    const canvas = document.getElementById('scroll-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Fill white background to match the animation frame background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Calculate aspect ratios
    const canvasRatio = width / height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    // Adjust logic to fit the image perfectly within the canvas (Contain)
    if (canvasRatio > imgRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        drawX = (width - drawWidth) / 2;
        drawY = 0;
    } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        drawX = 0;
        drawY = (height - drawHeight) / 2;
    }
    
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
};

// Resize canvas to match window and device pixel ratio for sharp rendering
const resizeCanvas = () => {
    const canvas = document.getElementById('scroll-canvas');
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    drawImage(images[currentFrameIndex]);
};

// Preload all 240 frame images
const preloadImages = () => {
    return new Promise((resolve) => {
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                const percent = Math.round((loadedCount / frameCount) * 100);
                const loaderBar = document.getElementById('loader-bar');
                const loaderStatus = document.getElementById('loader-status');
                
                if (loaderBar) loaderBar.style.width = `${percent}%`;
                if (loaderStatus) loaderStatus.innerText = `Preloading the deliciousness... ${percent}%`;
                
                if (loadedCount === frameCount) {
                    resolve();
                }
            };
            img.onerror = () => {
                console.error(`Failed to load frame: ${getFramePath(i)}`);
                loadedCount++;
                if (loadedCount === frameCount) {
                    resolve();
                }
            };
            img.src = getFramePath(i);
            images.push(img);
        }
    });
};

// Calculate normalized animation progress (0.0 to 1.0)
const getAnimationProgress = () => {
    const tailwindRoot = document.getElementById('tailwind-root');
    if (!tailwindRoot) return 0;
    
    const startScroll = 0;
    const endScroll = tailwindRoot.offsetTop;
    const currentScroll = window.scrollY;
    
    if (currentScroll <= startScroll) return 0;
    if (currentScroll >= endScroll) return 1;
    
    return (currentScroll - startScroll) / (endScroll - startScroll);
};

// Render current frame onto the canvas based on scroll position
const render = () => {
    const progress = getAnimationProgress();
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
    );
    
    if (frameIndex !== currentFrameIndex) {
        currentFrameIndex = frameIndex;
        drawImage(images[currentFrameIndex]);
    }
};

// Update CSS classes for nav and sections based on active section
const updateActiveSections = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll('.scroll-section, #benefits, #flavors');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        
        // Check if the middle of the viewport is inside the section
        if (rect.top <= windowHeight / 2 && rect.bottom > windowHeight / 2) {
            section.classList.add('active-section');
            
            // Update navbar link highlighting
            const activeId = section.getAttribute('id');
            navLinks.forEach((link) => {
                if (link.getAttribute('id') === `nav-${activeId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

    // Make header backdrop blur look opaque when scrolled down
    const header = document.querySelector('.main-header');
    if (header) {
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
};



// Initialization entry point
const init = async () => {
    // 1. Preload frames
    await preloadImages();
    
    // 2. Clear preloader overlay
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.remove('preloader-active');
        preloader.classList.add('fade-out');
    }
    
    // 3. Set up canvas sizes
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 4. Initial frame draw
    drawImage(images[0]);
    updateActiveSections();
    
    
    // 5. Scroll listener using requestAnimationFrame for peak performance
    window.addEventListener('scroll', () => {
        updateActiveSections();
        if (!tick) {
            window.requestAnimationFrame(() => {
                render();
                tick = false;
            });
            tick = true;
        }
    });
};

document.addEventListener('DOMContentLoaded', init);
