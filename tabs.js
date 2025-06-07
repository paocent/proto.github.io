// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all tab links and content
  const tabLinks = document.querySelectorAll('.nav-menu a');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Set default tab (Home)
  const defaultTab = document.querySelector('.nav-menu a[href="#home"]');
  if (defaultTab) {
    defaultTab.classList.add('active');
    document.getElementById('home').classList.add('active');
  }
  
  // Add click event to each tab link
  tabLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target tab ID from href attribute
      const targetTabId = this.getAttribute('href');
      const targetTab = document.querySelector(targetTabId);
      
      // Return if target tab doesn't exist
      if (!targetTab) return;
      
      // Remove active class from all tab links and contents
      tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked tab link and target content
      this.classList.add('active');
      targetTab.classList.add('active');
      
      // Smooth scroll to top of the tab content
      window.scrollTo({
        top: targetTab.offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
  
  // Handle page load with hash in URL
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetTabLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
    
    if (targetTabLink) {
      // Remove active class from all tab links and contents
      tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to target tab link and content
      targetTabLink.classList.add('active');
      document.querySelector(hash).classList.add('active');
      
      // Smooth scroll to target tab
      setTimeout(() => {
        document.querySelector(hash).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
});

// Feedback form functionality
document.addEventListener('DOMContentLoaded', function() {
  const feedbackForm = document.getElementById('feedbackForm');
  
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      // You can add form validation here if needed
      const rating = document.querySelector('input[name="Rating"]:checked');
      
      if (!rating) {
        e.preventDefault();
        alert('Please provide a rating');
        return false;
      }
      
      // Form will submit to Formspree as configured
    });
    
    // Initialize star rating hover effect
    const stars = document.querySelectorAll('.rating-stars label');
    stars.forEach(star => {
      star.addEventListener('mouseover', function() {
        const value = this.getAttribute('for').replace('star', '');
        highlightStars(value);
      });
      
      star.addEventListener('mouseout', function() {
        const checked = document.querySelector('.rating-stars input:checked');
        if (checked) {
          highlightStars(checked.value);
        } else {
          resetStars();
        }
      });
    });
  }
  
  function highlightStars(value) {
    const stars = document.querySelectorAll('.rating-stars label');
    stars.forEach(star => {
      const starValue = star.getAttribute('for').replace('star', '');
      if (starValue <= value) {
        star.style.color = 'var(--secondary-color)';
      } else {
        star.style.color = 'var(--gray-color)';
      }
    });
  }
  
  function resetStars() {
    const stars = document.querySelectorAll('.rating-stars label');
    stars.forEach(star => {
      star.style.color = 'var(--gray-color)';
    });
  }
});