document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired: Script execution started.');

    // Typewriter Effect - UPDATED WORDS FOR DATA SCIENTIST
    const words = ["Data Scientist", "Problem Solver", "Data Analyst"];
    let wordIndex = 0;
    let charIndex = 0;
    const typewriterTextElement = document.getElementById('typewriter-text');
    const cursorElement = document.querySelector('.cursor');
    let isTyping = false; // Flag to prevent multiple calls

    function type() {
        console.log('Type function called.');
        if (!typewriterTextElement || isTyping) {
            if (isTyping) console.log('Type function exited: already typing.');
            else console.log('Type function exited: typewriterTextElement not found.');
            return;
        }
        isTyping = true; // Set typing flag

        function typeChar() {
            if (wordIndex < words.length) {
                if (charIndex < words[wordIndex].length) {
                    typewriterTextElement.textContent += words[wordIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 100); // Typing speed
                } else {
                    setTimeout(erase, 1500); // Pause before erasing
                }
            } else {
                wordIndex = 0; // Loop back to the first word
                setTimeout(typeChar, 500); // Pause before starting over
            }
        }
        typeChar(); // Start the typing process
    }

    function erase() {
        if (charIndex > 0) {
            typewriterTextElement.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50); // Erasing speed
        } else {
            wordIndex++;
            isTyping = false; // Reset typing flag after erasing
            type(); // Start typing the next word
        }
    }


    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            console.log('Mobile menu toggled.');
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    console.log('Nav link clicked, mobile menu closed.');
                }
            });
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
        console.log('Current year set in footer.');
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Smooth scroll link clicked:', this.getAttribute('href'));

            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenu.classList.remove('active');
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Text Reveal Animations ---

    // Function to trigger animations for a collection of elements
    function animateElementsIn(elements, isStaggered = false, staggerDelay = 120) {
        console.log(`Animating ${elements.length} elements (staggered: ${isStaggered}, delay: ${staggerDelay}ms).`);
        elements.forEach((el, index) => {
            if (isStaggered) {
                el.style.setProperty('--stagger-delay', `${index * staggerDelay}ms`);
            }
            el.classList.add('animate-in');
            // console.log(`Added animate-in to element:`, el); // Log each element animated
        });
    }

    // 1. Hero Section Initial Load Reveal
    const heroElements = document.querySelectorAll(
        '.hero-content .animate-slide-up-delay, ' +
        '.hero-content .animate-slide-up-delay-2, ' +
        '.hero-content .animate-slide-up-delay-3, ' +
        '.hero-content .animate-slide-up-delay-4, ' +
        '.hero-content .animate-slide-up-delay-5'
    );
    console.log(`Found ${heroElements.length} hero elements to animate.`);

    // Animate hero section elements after a short delay
    setTimeout(() => {
        console.log('Starting hero section animation and typewriter effect.');
        // No need to animate logo here, it's visible by default now.
        animateElementsIn(heroElements); // Animate the hero content
        type(); // Start typewriter effect after hero content reveals
    }, 500); // Increased initial delay slightly to ensure DOM is ready


    // 2. Scroll-triggered Section Reveals
    const sectionsToAnimate = document.querySelectorAll('.section.animate-section-fade');
    console.log(`Found ${sectionsToAnimate.length} sections to animate on scroll.`);

    const sectionObserverOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // Section becomes visible when 15% is in view
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Section "${entry.target.id}" is intersecting. Adding animate-in.`);
                entry.target.classList.add('animate-in'); // Animate the section itself
                // Now, animate child elements with stagger
                const childElements = entry.target.querySelectorAll(
                    '.animate-slide-up, .animate-slide-up-item'
                );
                console.log(`Found ${childElements.length} child elements in "${entry.target.id}" to stagger animate.`);
                setTimeout(() => {
                    animateElementsIn(childElements, true, 120); // Stagger children by 120ms
                }, 300); // Delay children animation after section starts animating

                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, sectionObserverOptions);

    sectionsToAnimate.forEach(section => {
        sectionObserver.observe(section);
    });
});
