document.addEventListener('DOMContentLoaded', () => {
  // Hero animation elements
  const heroElements = [
    { selector: '.hero-greeting', delay: 100 },
    { selector: '.wave', delay: 600, animationClass: 'animate-wave' },
    { selector: 'h1', delay: 300 },
    { selector: '.tagline', delay: 500 },
    { selector: '.intro', delay: 700 },
    { selector: '.hero-cta', delay: 900 },
    { selector: '.code-block', delay: 1200, animationClass: 'animate-code-block' },
    { selector: '.code-line:nth-child(1)', delay: 1500, animationClass: 'animate-type-line-1' },
    { selector: '.code-line:nth-child(2)', delay: 1800, animationClass: 'animate-type-line-2' },
    { selector: '.code-line:nth-child(3)', delay: 2100, animationClass: 'animate-type-line-3' },
    { selector: '.code-line:nth-child(4)', delay: 2400, animationClass: 'animate-type-line-4' },
    { selector: '.code-line:nth-child(5)', delay: 2700, animationClass: 'animate-type-line-5' },
    { selector: '.code-line:nth-child(6)', delay: 3000, animationClass: 'animate-type-line-6' }
  ];

  // Function to trigger hero animations
  function playHeroAnimations() {
    heroElements.forEach(({ selector, delay, animationClass }) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const className = animationClass || 'animate-fade-in-up';
        setTimeout(() => {
          elements.forEach(el => el.classList.add(className));
        }, delay);
      }
    });
  }

  // Function to reset hero animations
  function resetHeroAnimations() {
    heroElements.forEach(({ selector, animationClass }) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const className = animationClass || 'animate-fade-in-up';
        elements.forEach(el => el.classList.remove(className));
      }
    });
  }

  // Initial hero animation
  playHeroAnimations();

  // Observer for hero section to replay animations on scroll back
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reset and replay animations when coming back into view
        resetHeroAnimations();
        setTimeout(() => playHeroAnimations(), 50);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px'
  });

  // Observe the header element
  const header = document.querySelector('header');
  if (header) {
    heroObserver.observe(header);
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-fade-in');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('h2').forEach(el => observer.observe(el));
  document.querySelectorAll('.project').forEach(el => observer.observe(el));
  document.querySelectorAll('.experience-item').forEach(el => observer.observe(el));
  document.querySelectorAll('.certification-item').forEach(el => observer.observe(el));
  document.querySelectorAll('.contact-card').forEach(el => observer.observe(el));
  document.querySelectorAll('.contact-intro').forEach(el => observer.observe(el));

  // Modal functionality
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalType = document.getElementById('modalType');
  const modalIcon = document.getElementById('modalIcon');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  const modalLinks = document.getElementById('modalLinks');
  const modalClose = document.querySelector('.modal-close');

  function openModal(projectData) {
    modalTitle.textContent = projectData.title;
    modalType.textContent = projectData.type;
    modalIcon.textContent = projectData.icon;
    modalDescription.textContent = projectData.description;

    // Set tech stack
    modalTechStack.innerHTML = projectData.techStack
      .map(tech => `<span class="tech-tag">${tech}</span>`)
      .join('');

    // Set links
    modalLinks.innerHTML = projectData.links
      .map(link => `<a href="${link.url}" class="project-link ${link.disabled ? 'disabled' : ''}" ${link.external && !link.disabled ? 'target="_blank"' : ''}>
        <i class="${link.icon}"></i>
        <span>${link.text}</span>
      </a>`)
      .join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Extract project data and open modal when project card is clicked
  document.querySelectorAll('.project').forEach(projectCard => {
    projectCard.addEventListener('click', (e) => {
      // Don't open modal if clicking on a link (unless it's disabled)
      const clickedLink = e.target.closest('.project-link');
      if (clickedLink && !clickedLink.classList.contains('disabled')) {
        return;
      }

      const projectData = {
        title: projectCard.querySelector('h3').textContent,
        type: projectCard.querySelector('.project-type').textContent,
        icon: projectCard.querySelector('.placeholder').textContent,
        description: projectCard.querySelector('.project-description').textContent.trim(),
        techStack: Array.from(projectCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent),
        links: Array.from(projectCard.querySelectorAll('.project-link')).map(link => ({
          url: link.getAttribute('href'),
          text: link.querySelector('span').textContent,
          icon: link.querySelector('i').className,
          external: link.hasAttribute('target'),
          disabled: link.classList.contains('disabled')
        }))
      };
      openModal(projectData);
    });
  });

  // Close modal on close button click
  modalClose.addEventListener('click', closeModal);

  // Close modal on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Scroll to top button functionality
  const scrollToTopBtn = document.getElementById('scrollToTop');

  // Show/hide scroll to top button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top on button click
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Experience toggle functionality
  document.querySelectorAll('.experience-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      const isExpanded = details.classList.contains('expanded');

      if (isExpanded) {
        details.classList.remove('expanded');
        btn.classList.remove('expanded');
        btn.innerHTML = '<span>Read more</span><i class="fas fa-chevron-down"></i>';
      } else {
        details.classList.add('expanded');
        btn.classList.add('expanded');
        btn.innerHTML = '<span>Show less</span><i class="fas fa-chevron-up"></i>';
      }
    });
  });
});
