/* ==========================================================================
   OctopusAve - Interactivity and Visual Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global App State
  let blogPosts = [];
  const activeFilters = { category: 'all' };

  // DOM Elements
  const navMenu = document.getElementById('nav-menu');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const mapPins = document.querySelectorAll('.map-pin');
  const infoPanels = document.querySelectorAll('.guide-info-panel');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const blogGrid = document.getElementById('blog-grid');
  
  // Modal Elements
  const blogModal = document.getElementById('blog-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCategory = document.getElementById('modal-category');
  const modalDate = document.getElementById('modal-date');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalShareBtn = document.getElementById('modal-share-btn');
  
  // Newsletter Elements
  const newsletterForm = document.getElementById('newsletter-form');
  const subscriberEmail = document.getElementById('subscriber-email');
  const newsletterError = document.getElementById('newsletter-error');
  const newsletterSuccess = document.getElementById('newsletter-success');

  // Hardcoded Fallback Database (Ensures the site works even when loaded via file:// protocol without a server)
  const fallbackBlogPosts = [
    {
      "id": 1,
      "title": "Finding Sanctuary on Octopus Ave: Our Shore House Journey",
      "summary": "We're starting a lifestyle blog! Here is the story of how we found our dream shore house in West Seattle and why we decided to share our daily slice of Puget Sound heaven.",
      "date": "May 25, 2026",
      "category": "shore-life",
      "categoryLabel": "Shore Life",
      "image": "assets/hero_beach.png",
      "content": "<h2>Welcome to Octopus Ave!</h2><p>My wife and I have always felt a deep, magnetic pull to the water. There is something about the salty breeze, the cry of the gulls, and the rhythmic sound of waves crashing against the shore that recalibrates the soul. For years, we dreamed of finding a sanctuary—a place where we could open our doors and feel the ocean directly in our front yard. That dream became a reality when we moved onto the street we now call home: <strong>Octopus Ave in West Seattle</strong>.</p><p>Our shore house is more than just a home; it is a canvas for our lifestyle, our design projects, and our daily adventures. From watching container ships glide across the Puget Sound to watching beautiful orange sunsets drop behind the Olympic Mountains, every single day feels like an inspired retreat.</p><h3>Why We're Starting This Journey</h3><p>We are starting this blog and our social channels (<strong>@OctopusAve</strong> on TikTok and Instagram) to document our life on the water and share the magic of West Seattle with the world. Through this platform, we want to share:</p><ul><li><strong>PNW Coastal Design:</strong> How we style our modern coastal shore house using local, sustainable, and chic beach aesthetics.</li><li><strong>Local Treasures:</strong> The local bakeries, hidden shore walks, and independent shops that make West Seattle the best community in the Northwest.</li><li><strong>Shoreline Living:</strong> The realities, joys, and daily routines of beachside living.</li></ul><p>We are so thrilled to have you along for the ride. Make sure to follow our Instagram and TikTok for daily video updates, reels, and behind-the-scenes shore house fun!</p>"
    },
    {
      "id": 2,
      "title": "The Ultimate West Seattle Weekend: Local Eats & Beach Walks",
      "summary": "From early morning walks at Alki Point to vinyl shopping at Easy Street Records, here is our perfect 48-hour itinerary in our favorite coastal neighborhood.",
      "date": "May 20, 2026",
      "category": "seattle-guides",
      "categoryLabel": "Seattle Guides",
      "image": "assets/hero_beach.png",
      "content": "<h2>48 Hours in West Seattle</h2><p>West Seattle feels like a cozy beach town quietly tucked away from the hustle of downtown Seattle. It has its own unique cadence, a spectacular shoreline, and a tight-knit community of creators, baristas, and ocean lovers. Whether you are visiting for the first time or are a local looking to rediscover your backyard, here is our personal weekend itinerary.</p><h3>Saturday: Beachside Vibes & Classic Tunes</h3><p><strong>9:00 AM – Coffee & Sunrise Walk at Alki Beach</strong><br>Start your morning exactly like we do. Grab a lavender latte from a local coffee roaster along Alki Ave and walk the paved trail. The view of the Seattle skyline reflecting off the water is unmatched, especially in the crisp morning light.</p><p><strong>12:00 PM – Lunch at Marination Ma Kai</strong><br>Head to the Seacrest Ferry dock and enjoy Hawaiian-Korean fusion tacos. Sit outside on their deck and enjoy spicy pork tacos with a panoramic view of the skyline. It's an absolute local staple!</p><p><strong>3:00 PM – Digging Crate at Easy Street Records</strong><br>Take a short drive up to the Junction and spend a couple of hours browsing through vinyl at Easy Street Records. Grab a drink at their in-store cafe and enjoy the rich musical history of Seattle plastered across the walls.</p><h3>Sunday: Forest Trails & Sunset Dinners</h3><p><strong>10:00 AM – Walk the Canopy at Lincoln Park</strong><br>Put on some comfortable shoes and walk the majestic trails at Lincoln Park. You will be surrounded by towering Douglas firs that lead down to a rocky beach looking out toward Vashon Island. Keep your eyes peeled—we often spot seals and sea lions floating near the shore!</p><p><strong>6:00 PM – Dinner with a Sound View</strong><br>Finish the weekend strong with a cozy dinner at a seafood joint in the Junction or along Alki Beach, taking in a warm Pacific Northwest sunset behind the Olympic Mountains.</p>"
    },
    {
      "id": 3,
      "title": "Designing a Coastal Modern Living Room: Shore House Decor Tips",
      "summary": "A sneak peek inside our living room redesign. Learn how we balance high-end coastal luxury with cozy, lived-in Pacific Northwest textures and organic elements.",
      "date": "May 15, 2026",
      "category": "decor",
      "categoryLabel": "Decor & DIY",
      "image": "assets/living_room.png",
      "content": "<h2>PNW Coastal Modern Styling</h2><p>When people think of \"coastal decor,\" their minds often jump to anchors, bright navy blue stripes, and plastic starfish. But for our Octopus Ave shore house, we wanted a much more refined, organic, and modern aesthetic. We call it <strong>PNW Coastal Modern</strong>.</p><p>It blends the airy, sun-drenched feel of Southern California beaches with the moody, organic, and structural elements of the Pacific Northwest forest and shore.</p><h3>1. The Foundation: Organic Textures</h3><p>Instead of relying on heavy colors, we build visual interest through texture. We started with soft white linen sofas, a large hand-woven jute rug, and light oak ceilings to create warmth. We then layered in:</p><ul><li><strong>Driftwood Accents:</strong> Sculptural pieces of authentic PNW driftwood collected from our beach walks, styled on open shelving.</li><li><strong>Cozy Knits:</strong> Soft, chunky knit blankets that invite you to curl up on a rainy Seattle afternoon.</li><li><strong>Handmade Ceramics:</strong> Organic stoneware vases finished in sand-like glazes.</li></ul><h3>2. The Color Palette: Sea and Sky</h3><p>Our palette is inspired directly by our view out the window. We use neutral cream and soft gray foundations, then accent with muted seafoam, soft aquamarine, and warm amber tones. These colors echo the water, the beach rocks, and the sunset glow behind the Olympic peaks.</p><h3>3. Maximizing the View</h3><p>Our best piece of decor is the view! We kept our window treatments incredibly minimalist and transparent, allowing the shifting blue tones of the Puget Sound to serve as a living painting. If you have big windows, let them shine and design your seating arrangement to frame the natural landscapes.</p>"
    },
    {
      "id": 4,
      "title": "Behind the Scenes: Starting OctopusAve on TikTok and Instagram",
      "summary": "Why we decided to hit 'record' on our daily lives. The tools we use, the aesthetic we're building, and what you can expect from our channels.",
      "date": "May 10, 2026",
      "category": "vlog",
      "categoryLabel": "Social & Vlog",
      "image": "assets/logo_octopus.png",
      "content": "<h2>Why We Hit Record</h2><p>Sharing your life online is both exciting and a little vulnerable. For a long time, we kept our DIY projects, beach beach walks, and shore house styling to ourselves. But as we completed our living room redesign and spent countless evenings watching beautiful sunsets on our deck, we realized something: <em>we wanted to build a community.</em></p><p>And so, <strong>OctopusAve</strong> was born! Named after the beautiful street we live on, our TikTok and Instagram channels are spaces where we can express our creativity, share our favorite local spots, and connect with people who share our love for coastal living.</p><h3>Our Tech & Setup</h3><p>We believe in high-quality storytelling with minimal friction. Here is the exact compact gear kit we are using to film our high-aesthetic reels and vlogs:</p><ul><li><strong>Camera:</strong> DJI Osmo Pocket 3. It's incredibly small, has an amazing 1-inch sensor, and handles sunset lighting beautifully.</li><li><strong>Audio:</strong> DJI Mic 2 for crisp, clear voice recordings even on windy beach walks.</li><li><strong>Editing:</strong> CapCut Pro on iPad, using custom color grades that keep our feeds warm, sandy, and modern.</li></ul><h3>What to Expect Next</h3><p>We will be posting 3-4 reels and TikToks a week, along with weekly articles here on the blog. Expect visual aesthetic vlogs, step-by-step DIY tutorials, room transformations, and hyper-local West Seattle recommendations.</p><p>Thank you so much for subscribing and joining us at the very start of this adventure. Drop by our socials and say hi—we'd love to meet you!</p>"
    }
  ];

  /* ==========================================================================
     1. Responsive Mobile Menu
     ========================================================================== */
  const toggleMobileMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  };

  const closeMobileMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
  };

  menuToggle.addEventListener('click', toggleMobileMenu);
  
  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Close menu if user clicks outside of nav while open
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     2. Interactive Local Guide (Pins & Info panels)
     ========================================================================== */
  mapPins.forEach(pin => {
    pin.addEventListener('click', () => {
      // 1. Remove active state from pins
      mapPins.forEach(p => p.classList.remove('active'));
      // 2. Add active to clicked pin
      pin.classList.add('active');
      
      // 3. Deactivate current info panels
      infoPanels.forEach(panel => panel.classList.remove('active'));
      
      // 4. Activate target info panel
      const targetId = pin.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     3. Fetch & Render Blog Posts
     ========================================================================== */
  const loadBlogPosts = async () => {
    try {
      const response = await fetch('blog-posts.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      blogPosts = await response.json();
    } catch (error) {
      console.warn('Could not fetch blog-posts.json. Falling back to local data.', error);
      blogPosts = fallbackBlogPosts;
    } finally {
      renderBlogGrid(blogPosts);
    }
  };

  const renderBlogGrid = (posts) => {
    blogGrid.innerHTML = '';
    
    const filteredPosts = posts.filter(post => {
      if (activeFilters.category === 'all') return true;
      return post.category === activeFilters.category;
    });

    if (filteredPosts.length === 0) {
      blogGrid.innerHTML = `
        <div class="loading-state">
          <p>No waves found for this tide. Check back soon!</p>
        </div>
      `;
      return;
    }

    filteredPosts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'blog-card glass-card';
      
      // Use dark containing box if it is the logo post
      const imgContainerClass = post.id === 4 ? 'blog-card-img-box dark-contain-box' : 'blog-card-img-box';
      
      card.innerHTML = `
        <div class="${imgContainerClass}">
          <img src="${post.image}" alt="${post.title}" class="blog-card-img">
          <span class="blog-card-badge">${post.categoryLabel}</span>
        </div>
        <div class="blog-card-content">
          <span class="blog-card-date">${post.date}</span>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-summary">${post.summary}</p>
          <div class="blog-card-footer">
            <span class="blog-card-readmore">Read Article <span>→</span></span>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => openArticleModal(post.id));
      blogGrid.appendChild(card);
    });
  };

  /* ==========================================================================
     4. Blog Filters
     ========================================================================== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Update active class in UI
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // 2. Set filter state
      activeFilters.category = btn.getAttribute('data-filter');
      
      // 3. Animate grid fade-out/fade-in
      blogGrid.style.opacity = '0';
      blogGrid.style.transform = 'translateY(15px)';
      blogGrid.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      
      setTimeout(() => {
        renderBlogGrid(blogPosts);
        blogGrid.style.opacity = '1';
        blogGrid.style.transform = 'translateY(0)';
      }, 250);
    });
  });

  /* ==========================================================================
     5. Immersive Modal dialog Reader
     ========================================================================== */
  const openArticleModal = (postId) => {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;
    
    // Populate Modal Details
    modalCategory.textContent = post.categoryLabel;
    modalDate.textContent = post.date;
    modalImage.src = post.image;
    modalImage.alt = post.title;
    modalTitle.textContent = post.title;
    modalContent.innerHTML = post.content;
    
    // Lock background scroll
    document.body.style.overflow = 'hidden';
    
    // Open Dialog
    blogModal.showModal();
  };

  const closeArticleModal = () => {
    blogModal.close();
  };

  // Close modal when close button is clicked
  modalClose.addEventListener('click', closeArticleModal);

  // Close modal when custom transition closes dialog
  blogModal.addEventListener('close', () => {
    document.body.style.overflow = '';
  });

  // Custom Backdrop click light-dismiss fallback for full browser support
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    blogModal.addEventListener('click', (e) => {
      // If clicking directly on the dialog tag (which covers the backdrop), dismiss
      if (e.target === blogModal) {
        const rect = blogModal.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        
        if (!isDialogContent) {
          closeArticleModal();
        }
      }
    });
  }

  // Escape key automatically calls dialog.close(), so we just restore body scrolling
  blogModal.addEventListener('cancel', () => {
    document.body.style.overflow = '';
  });

  // Simple Web Share API attachment on Share Button click
  modalShareBtn.addEventListener('click', () => {
    const title = modalTitle.textContent;
    if (navigator.share) {
      navigator.share({
        title: `OctopusAve | ${title}`,
        text: `Check out our shore house blog: "${title}"`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      const originalText = modalShareBtn.textContent;
      modalShareBtn.textContent = 'Link Copied! ✓';
      modalShareBtn.classList.add('btn-primary');
      modalShareBtn.classList.remove('btn-secondary');
      
      setTimeout(() => {
        modalShareBtn.textContent = originalText;
        modalShareBtn.classList.add('btn-secondary');
        modalShareBtn.classList.remove('btn-primary');
      }, 2000);
    }
  });

  /* ==========================================================================
     6. Newsletter Subscriptions
     ========================================================================== */
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailVal = subscriberEmail.value.trim();
    newsletterError.style.display = 'none';
    
    // 1. Validation check
    if (!emailVal) {
      newsletterError.textContent = 'Please enter an email address.';
      newsletterError.style.display = 'block';
      return;
    }
    
    if (!validateEmail(emailVal)) {
      newsletterError.textContent = 'Please enter a valid email address.';
      newsletterError.style.display = 'block';
      return;
    }
    
    // 2. Loading state active
    newsletterForm.classList.add('loading');
    subscriberEmail.disabled = true;
    newsletterForm.querySelector('.btn-submit').disabled = true;
    
    // 3. Simulating network post (1.5 seconds)
    setTimeout(() => {
      // 4. Success State transitions
      newsletterForm.style.display = 'none';
      newsletterSuccess.style.display = 'flex';
    }, 1500);
  });

  /* ==========================================================================
     7. Intersection Observer for Scroll Animations
     ========================================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const onScrollReveal = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Unobserve once shown
        observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(onScrollReveal, observerOptions);

  // Apply scroll reveal base classes and observers to structural sections
  const animatedSections = [
    document.getElementById('about'),
    document.getElementById('guide'),
    document.getElementById('blog'),
    document.getElementById('socials'),
    document.getElementById('newsletter')
  ];

  // Set up CSS dynamic transition delays on initialization
  const addScrollTransitionStyles = () => {
    const styleTag = document.createElement('style');
    styleTag.textContent = `
      .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .section.reveal-active {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(styleTag);
  };

  addScrollTransitionStyles();

  animatedSections.forEach(section => {
    if (section) {
      scrollObserver.observe(section);
    }
  });

  // Initialize Blog Grid
  loadBlogPosts();
});
