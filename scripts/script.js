    document.addEventListener('DOMContentLoaded', function() {
      AOS.init({ duration: 800, once: true });

      // Hero slideshow with 8 images
      const heroImages = [
        'j16.jpg', 'j17.jpg', 'j18.jpg', 'j19.jpg',
        'j20.jpg', 'j21.jpg', 'j22.jpg', 'j23.jpg'
      ];

      const heroSlider = document.querySelector('.hero-slider');
      const sliderControls = document.getElementById('sliderControls');

      heroImages.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = `hero-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url('${img}')`;
        heroSlider.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener('click', () => {
          showSlide(index);
          clearInterval(slideInterval);
          slideInterval = setInterval(nextSlide, 5000);
        });
        sliderControls.appendChild(dot);
      });

      const slides = document.querySelectorAll('.hero-slide');
      const dots = document.querySelectorAll('.slider-dot');
      let currentSlide = 0;

      function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
      }

      function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
      }

      let slideInterval = setInterval(nextSlide, 5000);

      // Mobile menu
      const mobileBtn = document.getElementById('mobileMenuBtn');
      const navLinks = document.getElementById('navLinks');
      
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          const icon = mobileBtn.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        });
      });

      // Back to top
      const backToTop = document.getElementById('backToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      });
      
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      // Villa thumbnails
      document.querySelectorAll('.villa-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
          const gallery = this.closest('.villa-gallery');
          const mainImage = gallery.querySelector('.villa-main-image');
          const newSrc = this.dataset.src;
          
          if (mainImage && newSrc) {
            mainImage.src = newSrc;
            gallery.querySelectorAll('.villa-thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
          }
        });
      });

      // Gallery images
      const galleryGrid = document.getElementById('galleryGrid');
      const galleryImages = [
        { src: 'j24.jpg', caption: 'Mountain gorilla in Volcanoes National Park' },
        { src: 'j25.jpg', caption: 'Forest Villa exterior' },
        { src: 'j26.jpg', caption: 'Dining area' },
        { src: 'j27.jpg', caption: 'Villa interior with fireplace' },
        { src: 'j28.jpg', caption: 'Volcano views from the lodge' },
        { src: 'j29.jpg', caption: 'Gorilla trekking experience' },
        { src: 'j30.jpg', caption: 'Community engagement' },
        { src: 'j31.jpg', caption: 'Traditional dance performance' }
      ];

      galleryImages.forEach((item) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
          <img src="${item.src}" alt="${item.caption}" loading="lazy">
          <div class="gallery-overlay">
            <div class="gallery-caption">${item.caption}</div>
          </div>
        `;
        
        galleryItem.addEventListener('click', () => {
          const modal = document.getElementById('imageModal');
          const modalImg = document.getElementById('modalImage');
          const modalCaption = document.getElementById('modalCaption');
          modal.classList.add('active');
          modalImg.src = item.src;
          modalCaption.textContent = item.caption;
          document.body.style.overflow = 'hidden';
        });
        
        galleryGrid.appendChild(galleryItem);
      });

      // Modal close
      const modal = document.getElementById('imageModal');
      const modalClose = document.getElementById('modalClose');

      modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
      });

      // Booking form
      const villaSelect = document.getElementById('villaSelect');
      const totalPrice = document.getElementById('totalPrice');

      function calculateTotal() {
        const price = parseInt(villaSelect.value) || 1800;
        totalPrice.textContent = `$${(price * 3).toLocaleString()}`;
      }

      villaSelect.addEventListener('change', calculateTotal);
      calculateTotal();

      const bookingForm = document.getElementById('bookingForm');
      const bookingMessage = document.getElementById('bookingMessage');

      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        bookingMessage.textContent = 'Thank you for your booking request. A travel designer will contact you within 24 hours.';
        bookingMessage.className = 'booking-message success';
        
        bookingForm.reset();
        calculateTotal();

        setTimeout(() => {
          bookingMessage.textContent = '';
          bookingMessage.className = 'booking-message';
        }, 5000);
      });

      // Date inputs
      const checkin = document.getElementById('checkin');
      const checkout = document.getElementById('checkout');
      const today = new Date().toISOString().split('T')[0];
      checkin.min = today;
      checkout.min = today;
      
      checkin.addEventListener('change', () => {
        checkout.min = checkin.value;
      });
    });
