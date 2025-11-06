// Set your contact email here
const CONTACT_EMAIL = 'hetvishukla2@gmail.com'; // TODO: replace with your actual email

// Mobile menu toggle + accessibility + behavior
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    const toggleMenu = (open) => {
        const willOpen = open !== undefined ? open : !navMenu.classList.contains('active');
        navMenu.classList.toggle('active', willOpen);
        hamburger.classList.toggle('active', willOpen);
        hamburger.setAttribute('aria-expanded', String(willOpen));
        document.body.classList.toggle('no-scroll', willOpen);
    };

    hamburger.addEventListener('click', () => toggleMenu());

    // Close menu when a nav link is clicked (on mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') toggleMenu(false);
    });

    // Reset state on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) toggleMenu(false);
    });
}

// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Download CV function
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'Hetvi Shukla - Resume.pdf';  // Path to your PDF file
    link.download = 'Hetvi_Shukla.pdf';   // Name the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Skills navigation functionality
let currentSkillIndex = 1; // Start with Frontend (index 1)
const skillCategories = ['ui-ux', 'frontend', 'backend', 'cloud'];
const totalSkills = skillCategories.length;

function navigateSkills(direction, event = null) {
    // Hide current skill
    document.getElementById(skillCategories[currentSkillIndex]).classList.remove('active');
    document.querySelectorAll('.dot')[currentSkillIndex].classList.remove('active');

    // Calculate new index
    if (direction === 'up') {
        currentSkillIndex = (currentSkillIndex - 1 + totalSkills) % totalSkills;
    } else {
        currentSkillIndex = (currentSkillIndex + 1) % totalSkills;
    }

    // Show new skill
    document.getElementById(skillCategories[currentSkillIndex]).classList.add('active');
    document.querySelectorAll('.dot')[currentSkillIndex].classList.add('active');

    // Update arrow button states
    updateArrowStates(event);
}

function updateArrowStates(event = null) {
    const upArrow = document.getElementById('upArrow');
    const downArrow = document.getElementById('downArrow');
    
    // Add active animation class temporarily
    if (event && event.currentTarget && event.currentTarget.id === 'upArrow') {
        upArrow.classList.add('clicked');
        setTimeout(() => upArrow.classList.remove('clicked'), 200);
    }
    if (event && event.currentTarget && event.currentTarget.id === 'downArrow') {
        downArrow.classList.add('clicked');
        setTimeout(() => downArrow.classList.remove('clicked'), 200);
    }
}

// Add event listeners for arrow buttons
const upArrowBtn = document.getElementById('upArrow');
const downArrowBtn = document.getElementById('downArrow');
if (upArrowBtn && downArrowBtn) {
    upArrowBtn.addEventListener('click', function(event) {
        navigateSkills('up', event);
    });
    downArrowBtn.addEventListener('click', function(event) {
        navigateSkills('down', event);
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateSkills('up');
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateSkills('down');
    }
});

// Dot indicator click functionality
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', function() {
        // Hide current skill
        document.getElementById(skillCategories[currentSkillIndex]).classList.remove('active');
        document.querySelectorAll('.dot')[currentSkillIndex].classList.remove('active');

        // Set new skill
        currentSkillIndex = index;
        document.getElementById(skillCategories[currentSkillIndex]).classList.add('active');
        this.classList.add('active');
    });
});

// Portfolio filtering functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Filter functionality
function filterProjects(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Animate in
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            // Hide after animation
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Filter button click events
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Filter projects
        const filterValue = btn.dataset.filter;
        filterProjects(filterValue);
    });
});

// Contact form functionality -> send via email client (mailto)
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Fallback if CONTACT_EMAIL is not set
    if (!CONTACT_EMAIL || CONTACT_EMAIL === 'your-email@example.com') {
        alert('Contact email is not configured yet. Please set CONTACT_EMAIL in portfolio.js.');
        return;
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Optional UX feedback toast
    setTimeout(() => {
        showToast('Opening your email app to send the message...');
    }, 200);

    // Reset form
    this.reset();
});

// Smooth scroll for CTA button (only if it's an in-page link)
const ctaBtn = document.querySelector('.cta-button');
if (ctaBtn) {
    ctaBtn.addEventListener('click', function(e) {
        const href = ctaBtn.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector('.form-container')?.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // If it's a mailto link, allow default behavior (no preventDefault)
    });
}

// Lightweight toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.8)';
    toast.style.color = '#fff';
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '9999';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.transition = 'opacity 300ms ease';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 320);
    }, 2000);
}

// Add parallax effect to floating elements
window.addEventListener('mousemove', function(e) {
    const elements = document.querySelectorAll('.floating-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    elements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 50;
        const yPos = (y - 0.5) * speed * 50;
        element.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-arrow');
if (scrollIndicator) {
    setInterval(() => {
        scrollIndicator.style.transform = 'translateY(5px)';
        setTimeout(() => {
            scrollIndicator.style.transform = 'translateY(0)';
        }, 300);
    }, 2000);
}

// Navigation link active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize on load
window.addEventListener('load', function() {
    // Initialize portfolio items with animation
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
