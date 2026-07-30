// ==========================================================
// Nila Herbals - Main Interactive Functions & Animations
// ==========================================================

// 1. Product Recommendation Tab Swapping
function showProduct(productName, button) {
    // Hide all product cards
    const products = document.querySelectorAll(".product");
    products.forEach(function(product) {
        product.classList.remove("active");
    });

    // Show selected product
    const selected = document.querySelector("." + productName);
    if (selected) {
        selected.classList.add("active");
    }

    // Remove active class from all buttons
    const buttons = document.querySelectorAll(".options button");
    buttons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    // Highlight clicked button
    button.classList.add("active");
}

// 2. Optimized GPU-Accelerated Falling Leaves Particle Generator
function initFallingLeaves() {
    const container = document.createElement('div');
    container.className = 'falling-leaves-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const leafIcons = ['🍃', '🌿', '🌱'];

    const spawnLeaf = () => {
        // Stop spawning if page is hidden
        if (document.hidden) return;
        
        // Cap max leaf count to save memory
        if (container.children.length > 20) return;

        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        leaf.textContent = leafIcons[Math.floor(Math.random() * leafIcons.length)];
        
        // Randomize physics characteristics using CSS custom properties
        const left = Math.random() * 100; // vw
        const size = Math.random() * 14 + 12; // px (12px to 26px)
        const duration = Math.random() * 8 + 6; // seconds (6s to 14s)
        const sway = Math.random() * 140 - 70; // px (sway left/right)
        const rotate = Math.random() * 720 - 360; // degrees rotation
        const opacity = Math.random() * 0.4 + 0.15; // opacity levels

        leaf.style.left = `${left}vw`;
        leaf.style.fontSize = `${size}px`;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.setProperty('--leaf-opacity', opacity);
        leaf.style.setProperty('--leaf-sway', `${sway}px`);
        leaf.style.setProperty('--leaf-rotate', `${rotate}deg`);

        container.appendChild(leaf);

        // Remove element from DOM when animation completes
        leaf.addEventListener('animationend', () => {
            leaf.remove();
        });
    };

    // Spawn first few leaves immediately
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnLeaf, Math.random() * 3000);
    }

    // Keep spawning new leaves
    setInterval(spawnLeaf, 2000);
}

// 3. Scroll Entrance Reveal Animation (using Intersection Observer)
function initScrollReveal() {
    const targets = document.querySelectorAll('.animate-on-scroll');
    if (targets.length === 0) return;

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        targets.forEach(t => t.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before hitting viewport
    });

    targets.forEach(target => observer.observe(target));
}

// 4. Mobile Navigation Menu Toggle Handler
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on any nav link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// 5. Document Loaded Initialization
window.addEventListener('DOMContentLoaded', () => {
    // Set first recommendation active if page contains them
    const firstProduct = document.querySelector(".aloe");
    const firstButton = document.querySelector(".options button");
    if (firstProduct) firstProduct.classList.add("active");
    if (firstButton) firstButton.classList.add("active");

    // Initialize interactive systems
    initFallingLeaves();
    initScrollReveal();
    initMobileNav();
    initStatsCounter();
    initIngredientExplorer();
    initProductSpotlight();
    initNavbarScroll();

    // 6. Promo Video Controls
    const promoVideo = document.getElementById('promoVideo');
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    if (promoVideo && videoPlayBtn) {
        // Toggle play/pause
        videoPlayBtn.addEventListener('click', () => {
            if (promoVideo.paused) {
                promoVideo.play();
                videoPlayBtn.textContent = '❚❚';
            } else {
                promoVideo.pause();
                videoPlayBtn.textContent = '▶';
            }
        });
        
        // Keep button visible when hovering video area
        const videoWrapper = document.querySelector('.showcase-video-wrapper');
        if (videoWrapper) {
            videoWrapper.addEventListener('mouseenter', () => {
                videoPlayBtn.style.opacity = '1';
            });
        }
    }
});

// 7. Dynamic Stats Counter Animation on Scroll
function initStatsCounter() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    const counters = document.querySelectorAll('.stat-num');
    let animated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const decimals = +counter.getAttribute('data-decimals') || 0;
            const start = 0;
            const duration = 2000; // 2 seconds
            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                
                // Ease out quad formula
                const easeProgress = progress * (2 - progress);
                
                let currentVal = easeProgress * target;
                
                // Format with decimals if needed
                let displayVal = currentVal.toFixed(decimals);
                
                // Add commas for thousands
                if (decimals === 0 && target >= 1000) {
                    displayVal = Math.floor(currentVal).toLocaleString();
                }
                
                // Custom formatting tags
                if (target === 15000) {
                    counter.textContent = displayVal + "+";
                } else if (target === 25) {
                    counter.textContent = displayVal + "+";
                } else if (target === 100) {
                    counter.textContent = displayVal + "%";
                } else {
                    counter.textContent = displayVal;
                }

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    // Final precise value
                    if (target === 15000) {
                        counter.textContent = target.toLocaleString() + "+";
                    } else if (target === 25) {
                        counter.textContent = target + "+";
                    } else if (target === 100) {
                        counter.textContent = "100%";
                    } else {
                        counter.textContent = target.toFixed(decimals);
                    }
                }
            };

            window.requestAnimationFrame(step);
        });
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(statsContainer);
    } else {
        // Fallback
        animateCounters();
    }
}

// 8. Interactive Ingredient Explorer
function initIngredientExplorer() {
    const items = document.querySelectorAll('.ie-item');
    const detailCards = document.querySelectorAll('.ie-detail-card');

    if (items.length === 0) return;

    items.forEach(item => {
        item.addEventListener('click', () => {
            const ingredientId = item.getAttribute('data-ingredient');

            // Remove active from all items
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Show corresponding detail card
            detailCards.forEach(card => card.classList.remove('active'));
            const targetCard = document.getElementById('detail-' + ingredientId);
            if (targetCard) {
                targetCard.classList.add('active');
            }
        });
    });

    // Auto-cycle through ingredients
    let currentIndex = 0;
    const itemsArray = Array.from(items);

    setInterval(() => {
        currentIndex = (currentIndex + 1) % itemsArray.length;
        const item = itemsArray[currentIndex];
        const ingredientId = item.getAttribute('data-ingredient');

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        detailCards.forEach(card => card.classList.remove('active'));
        const targetCard = document.getElementById('detail-' + ingredientId);
        if (targetCard) {
            targetCard.classList.add('active');
        }
    }, 4000);
}

// 9. Product Spotlight Auto-Rotating Carousel
function initProductSpotlight() {
    const slides = document.querySelectorAll('.ps-slide');
    const dots = document.querySelectorAll('.ps-dot');

    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval;

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    // Start auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    // Dot click navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(autoPlayInterval);
            goToSlide(parseInt(dot.getAttribute('data-dot')));
            startAutoPlay();
        });
    });

    // Pause on hover
    const carousel = document.querySelector('.ps-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        carousel.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }

    startAutoPlay();
}

// 10. Navbar Scroll Hide/Show Logic
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add styling class when scrolled past top
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('hidden-nav');
        } else {
            navbar.classList.remove('hidden-nav');
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}
