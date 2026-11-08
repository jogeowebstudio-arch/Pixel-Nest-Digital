document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1. REVEAL SECTIONS ON SCROLL
  ========================================= */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }


  /* =========================================
     2. MOBILE NAVIGATION
  ========================================= */
  const nav = document.getElementById('mainNavigation');

  document.querySelectorAll('#mainNavigation .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (
        window.innerWidth < 992 &&
        nav &&
        nav.classList.contains('show') &&
        window.bootstrap &&
        window.bootstrap.Collapse
      ) {
        window.bootstrap.Collapse
          .getOrCreateInstance(nav)
          .hide();
      }
    });
  });


  /* =========================================
     3. GALLERY LIGHTBOX
  ========================================= */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeButton = document.getElementById('lightboxClose');

  let lastFocusedElement = null;

  if (lightbox && lightboxImage && lightboxCaption && closeButton) {

    function openLightbox(button) {
      const fullImage = button.dataset.full;
      if (!fullImage) {
        console.warn('Gallery image is missing its data-full attribute:', button);
        return;
      }

      lastFocusedElement = button;

      lightboxImage.src = fullImage;

      const thumbnail = button.querySelector('img');
      lightboxImage.alt = thumbnail
        ? thumbnail.alt
        : 'Wedding gallery image';

      lightboxCaption.textContent = button.dataset.caption || '';

      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';

      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      lightboxImage.removeAttribute('src');
      document.body.style.overflow = '';

      if (lastFocusedElement) {
        lastFocusedElement.focus();
      }
    }

    document.querySelectorAll('.gallery-tile').forEach(button => {
      button.addEventListener('click', () => openLightbox(button));
    });

    closeButton.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !lightbox.hidden) {
        closeLightbox();
      }
    });
  }


  /* =========================================
     4. INVITATION SCROLL LINK
  ========================================= */
  const scrollLink = document.querySelector('.invitation-scroll');

  const nextSection =
    document.querySelector('#venue') ||
    document.querySelector('#nextWeddingSection');

  if (scrollLink && nextSection) {
    scrollLink.addEventListener('click', event => {
      event.preventDefault();

      const reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      nextSection.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  }

});