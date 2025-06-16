// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

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

// Contact form functionality
document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show success message
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    this.reset();
});

// Smooth scroll for CTA button
document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.form-container').scrollIntoView({
        behavior: 'smooth'
    });
});

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