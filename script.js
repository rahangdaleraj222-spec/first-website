/* ==========================================================================
   ReviewSphere 3D - Sketchfab-Inspired 3D Particle Canvas & App Logic
   ========================================================================== */

// Initial Seed Dataset for rich demonstration across categories
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    category: 'movies',
    itemName: 'Inception 2: Beyond Reality',
    rating: 5,
    headline: 'Mind-blowing sci-fi experience!',
    text: 'The visual effects, dream logic, and storyline are on another level. The soundtrack gives goosebumps throughout the movie. A true cinematic masterpiece!',
    authorName: 'Aarav Sharma',
    avatar: 'violet',
    pros: ['Stunning Visuals', 'Mind-bending Plot', 'Hans Zimmer BGM'],
    cons: ['3 Hours runtime'],
    upvotes: 42,
    upvoted: false,
    timestamp: '2 days ago',
    comments: [
      { author: 'Rahul_Cinema', text: 'Agree 100%! The climax dream scene was unbelievable.', time: '1 day ago' },
      { author: 'Neha Verma', text: 'Visuals were top notch indeed!', time: '12 hours ago' }
    ]
  },
  {
    id: 'rev-2',
    category: 'games',
    itemName: 'Cyberpunk 2077: Phantom Liberty',
    rating: 5,
    headline: 'Best RPG expansion ever created!',
    text: 'Night City feels genuinely alive now. Dogtown is packed with rich side quests and incredible storytelling. Performance is rock solid on modern GPUs.',
    authorName: 'Rohan_Gamer',
    avatar: 'cyan',
    pros: ['Gripping Story', 'Next-Gen Raytracing', 'Deep Skill Tree'],
    cons: ['Demands heavy hardware'],
    upvotes: 67,
    upvoted: false,
    timestamp: '1 day ago',
    comments: [
      { author: 'TechGeek99', text: 'Phantom Liberty saved Cyberpunk! Keanu Reeves performance was epic.', time: '18 hours ago' }
    ]
  },
  {
    id: 'rev-3',
    category: 'tech',
    itemName: 'iPhone 16 Pro Max',
    rating: 4,
    headline: 'Insane Camera & 1.5-Day Battery',
    text: '4K 120fps video recording is a game changer for content creators. Titanium build feels super light in hand. Battery easily lasts 1.5 days of heavy usage.',
    authorName: 'Priya Tech Reviews',
    avatar: 'emerald',
    pros: ['Camera Quality', 'Battery Life', 'Lightweight Build'],
    cons: ['High Price', 'Slow charging speed'],
    upvotes: 28,
    upvoted: false,
    timestamp: '3 days ago',
    comments: []
  },
  {
    id: 'rev-4',
    category: 'food',
    itemName: 'The Gourmet Pizza Hub (Delhi)',
    rating: 5,
    headline: 'Authentic Neapolitan Wood-Fired Pizza!',
    text: 'Crispy crust with fresh Mozzarella and truffle oil. The Truffle Mushroom pizza is to die for! Great cozy vibe for weekend dinners with friends.',
    authorName: 'FoodieKaran',
    avatar: 'amber',
    pros: ['Fresh Dough', 'Truffle Mushroom', 'Cozy Ambiance'],
    cons: ['Long weekend queue'],
    upvotes: 35,
    upvoted: false,
    timestamp: '4 days ago',
    comments: []
  },
  {
    id: 'rev-5',
    category: 'books',
    itemName: 'Atomic Habits by James Clear',
    rating: 5,
    headline: 'Life-changing book for daily routines',
    text: 'Practical 1% daily improvement formula. Really helps build small sustainable habits without feeling overwhelmed. A must-read for everyone!',
    authorName: 'Neha Verma',
    avatar: 'rose',
    pros: ['Easy to understand', 'Actionable frameworks', 'Inspiring examples'],
    cons: ['A few repetitive chapters'],
    upvotes: 89,
    upvoted: false,
    timestamp: '5 days ago',
    comments: []
  },
  {
    id: 'rev-6',
    category: 'anime',
    itemName: 'Demon Slayer: Hashira Training Arc',
    rating: 5,
    headline: 'Ufotable animation quality is unmatched!',
    text: 'The climax episode visual fight direction set a new benchmark for anime industry. Emotional connection and sound design were absolute 10/10.',
    authorName: 'AnimeFreak_99',
    avatar: 'violet',
    pros: ['Top-tier Animation', 'Epic Sound Design'],
    cons: ['Shorter season length'],
    upvotes: 51,
    upvoted: false,
    timestamp: '1 week ago',
    comments: []
  }
];

// Category Metadata Map
const CATEGORIES_MAP = {
  all: { name: 'All Reviews', icon: 'fa-globe', tagClass: 'tag-all' },
  movies: { name: 'Movies & Shows', icon: 'fa-film', tagClass: 'tag-movies' },
  games: { name: 'Gaming & Esports', icon: 'fa-gamepad', tagClass: 'tag-games' },
  tech: { name: 'Tech & Gadgets', icon: 'fa-mobile-screen', tagClass: 'tag-tech' },
  food: { name: 'Food & Restaurants', icon: 'fa-utensils', tagClass: 'tag-food' },
  books: { name: 'Books & Literature', icon: 'fa-book', tagClass: 'tag-books' },
  anime: { name: 'Anime & Pop Culture', icon: 'fa-tv', tagClass: 'tag-anime' }
};

// Rating Labels
const RATING_LABELS = {
  1: '1/5 Terrible 😞',
  2: '2/5 Below Average 😐',
  3: '3/5 Average / Decent 🙂',
  4: '4/5 Really Good 😊',
  5: '5/5 Masterpiece! 🤩'
};

// Application State
let state = {
  reviews: [],
  bookmarks: [],
  theme: 'dark',
  activeCategory: 'all',
  searchQuery: '',
  ratingFilter: 'all',
  sortFilter: 'newest'
};

// DOM Elements
const elements = {
  reviewsContainer: document.getElementById('reviews-container'),
  emptyState: document.getElementById('empty-state'),
  emptyTitle: document.getElementById('empty-title'),
  emptyDesc: document.getElementById('empty-desc'),
  activeCatTitle: document.getElementById('active-category-title'),
  resultsCount: document.getElementById('results-count'),
  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  searchDropdown: document.getElementById('search-dropdown'),
  filterRating: document.getElementById('filter-rating'),
  filterSort: document.getElementById('filter-sort'),
  
  // Scorecard
  itemScorecard: document.getElementById('item-scorecard'),
  scorecardTitle: document.getElementById('scorecard-item-title'),
  scorecardCategory: document.getElementById('scorecard-category'),
  scorecardRating: document.getElementById('scorecard-rating'),
  scorecardCount: document.getElementById('scorecard-count'),
  scorecardBadge: document.getElementById('scorecard-badge'),
  scorecardReviewBtn: document.getElementById('scorecard-review-btn'),
  scorecardBtnItem: document.getElementById('scorecard-btn-item'),

  // Theme & Bookmarks
  themeToggle: document.getElementById('theme-toggle'),
  openBookmarksBtn: document.getElementById('open-bookmarks-btn'),
  bookmarkCount: document.getElementById('bookmark-count'),
  bookmarksModal: document.getElementById('bookmarks-modal'),
  bookmarksModalBody: document.getElementById('bookmarks-modal-body'),
  closeBookmarksBtn: document.getElementById('close-bookmarks-modal'),
  bmModalCount: document.getElementById('bm-modal-count'),
  
  // Modals
  writeModal: document.getElementById('write-modal'),
  openWriteBtn: document.getElementById('open-write-modal'),
  closeWriteBtn: document.getElementById('close-write-modal'),
  cancelWriteBtn: document.getElementById('cancel-write-modal'),
  emptyWriteBtn: document.getElementById('empty-write-btn'),
  reviewForm: document.getElementById('review-form'),
  
  detailModal: document.getElementById('detail-modal'),
  detailModalBody: document.getElementById('detail-modal-body'),
  closeDetailBtn: document.getElementById('close-detail-modal'),

  profileModal: document.getElementById('profile-modal'),
  profileModalBody: document.getElementById('profile-modal-body'),
  closeProfileBtn: document.getElementById('close-profile-modal'),
  openMyProfileBtn: document.getElementById('open-my-profile-btn'),
  
  // Star input
  starInputGroup: document.getElementById('star-input-group'),
  starRatingValInput: document.getElementById('form-rating-val'),
  ratingTextHint: document.getElementById('rating-text-hint'),
  
  // Stat counters
  statTotalReviews: document.getElementById('stat-total-reviews'),
  toastContainer: document.getElementById('toast-container')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  loadStateFromLocalStorage();
  setupEventListeners();
  updateCategoryCounts();
  updateBookmarkUI();
  applyTheme(state.theme);
  render();
});

// Sketchfab 3D Particle & Node Canvas Background Animation
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: Math.random() * 2 + 1
  }));

  let mouseX = width / 2;
  let mouseY = height / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw particle connections (Sketchfab cyber-mesh effect)
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      p1.x += p1.vx;
      p1.y += p1.vy;

      if (p1.x < 0 || p1.x > width) p1.vx *= -1;
      if (p1.y < 0 || p1.y > height) p1.vy *= -1;

      // Draw node particle
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 - dist / 140 * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// Load state from localStorage or seed
function loadStateFromLocalStorage() {
  const savedReviews = localStorage.getItem('reviewsphere_data');
  if (savedReviews) {
    try { state.reviews = JSON.parse(savedReviews); } catch (e) { state.reviews = INITIAL_REVIEWS; }
  } else {
    state.reviews = INITIAL_REVIEWS;
    saveStateToLocalStorage();
  }

  const savedBookmarks = localStorage.getItem('reviewsphere_bookmarks');
  if (savedBookmarks) {
    try { state.bookmarks = JSON.parse(savedBookmarks); } catch (e) { state.bookmarks = []; }
  }

  const savedTheme = localStorage.getItem('reviewsphere_theme');
  if (savedTheme) { state.theme = savedTheme; }
}

function saveStateToLocalStorage() {
  localStorage.setItem('reviewsphere_data', JSON.stringify(state.reviews));
  localStorage.setItem('reviewsphere_bookmarks', JSON.stringify(state.bookmarks));
  localStorage.setItem('reviewsphere_theme', state.theme);
}

// Theme Switcher
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const icon = elements.themeToggle.querySelector('.theme-icon');
  if (icon) {
    icon.className = theme === 'light' ? 'fa-solid fa-sun theme-icon' : 'fa-solid fa-moon theme-icon';
  }
  saveStateToLocalStorage();
}

// Event Listeners Setup
function setupEventListeners() {
  elements.themeToggle.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    showToast(`Switched to ${state.theme.toUpperCase()} Mode`, 'info');
  });

  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      render();
    });
  });

  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.dataset.cat;
      state.activeCategory = cat;
      document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.dataset.category === cat);
      });
      document.querySelector('.reviews-section').scrollIntoView({ behavior: 'smooth' });
      render();
    });
  });

  document.querySelectorAll('.cat-footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.category;
      state.activeCategory = cat;
      document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.dataset.category === cat);
      });
      document.querySelector('.reviews-section').scrollIntoView({ behavior: 'smooth' });
      render();
    });
  });

  const handleSearch = (e) => {
    const val = e.target.value.trim();
    state.searchQuery = val.toLowerCase();
    elements.searchClear.style.display = val ? 'block' : 'none';
    
    if (val.length >= 1) {
      renderSearchAutocomplete(val);
    } else {
      elements.searchDropdown.style.display = 'none';
    }

    render();
  };

  elements.searchInput.addEventListener('input', handleSearch);
  elements.searchInput.addEventListener('keyup', handleSearch);

  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.style.display = 'none';
    elements.searchDropdown.style.display = 'none';
    render();
  });

  document.addEventListener('click', (e) => {
    if (!elements.searchInput.contains(e.target) && !elements.searchDropdown.contains(e.target)) {
      elements.searchDropdown.style.display = 'none';
    }
  });

  elements.filterRating.addEventListener('change', (e) => {
    state.ratingFilter = e.target.value;
    render();
  });

  elements.filterSort.addEventListener('change', (e) => {
    state.sortFilter = e.target.value;
    render();
  });

  const openModal = (defaultItemName = '') => {
    if (defaultItemName) {
      document.getElementById('form-item-name').value = defaultItemName;
    }
    elements.writeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    elements.writeModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  elements.openWriteBtn.addEventListener('click', () => openModal());
  elements.closeWriteBtn.addEventListener('click', closeModal);
  elements.cancelWriteBtn.addEventListener('click', closeModal);
  elements.emptyWriteBtn.addEventListener('click', () => openModal(state.searchQuery));
  
  elements.scorecardReviewBtn.addEventListener('click', () => {
    const itemName = elements.scorecardTitle.textContent;
    openModal(itemName);
  });

  elements.writeModal.addEventListener('click', (e) => {
    if (e.target === elements.writeModal) closeModal();
  });

  elements.openBookmarksBtn.addEventListener('click', () => {
    renderBookmarksModal();
    elements.bookmarksModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  elements.closeBookmarksBtn.addEventListener('click', () => {
    elements.bookmarksModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  elements.bookmarksModal.addEventListener('click', (e) => {
    if (e.target === elements.bookmarksModal) {
      elements.bookmarksModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  elements.closeDetailBtn.addEventListener('click', () => {
    elements.detailModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  elements.detailModal.addEventListener('click', (e) => {
    if (e.target === elements.detailModal) {
      elements.detailModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  elements.openMyProfileBtn.addEventListener('click', () => {
    openProfileModal('Aarav Sharma');
  });

  elements.closeProfileBtn.addEventListener('click', () => {
    elements.profileModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  elements.profileModal.addEventListener('click', (e) => {
    if (e.target === elements.profileModal) {
      elements.profileModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  const starBtns = elements.starInputGroup.querySelectorAll('.star-btn');
  starBtns.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.dataset.value);
      highlightStars(val);
      elements.ratingTextHint.textContent = RATING_LABELS[val];
    });

    star.addEventListener('mouseout', () => {
      const currentVal = parseInt(elements.starRatingValInput.value) || 0;
      highlightStars(currentVal);
      elements.ratingTextHint.textContent = currentVal ? RATING_LABELS[currentVal] : 'Rating chunnein';
    });

    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.value);
      elements.starRatingValInput.value = val;
      highlightStars(val);
      elements.ratingTextHint.textContent = RATING_LABELS[val];
    });
  });

  function highlightStars(count) {
    starBtns.forEach((s, idx) => {
      if (idx < count) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  }

  elements.reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const category = document.getElementById('form-category').value;
    const itemName = document.getElementById('form-item-name').value.trim();
    const rating = parseInt(elements.starRatingValInput.value);
    const headline = document.getElementById('form-headline').value.trim();
    const text = document.getElementById('form-text').value.trim();
    const authorName = document.getElementById('form-author-name').value.trim();
    const avatar = document.getElementById('form-author-avatar').value;
    
    const prosRaw = document.getElementById('form-pros').value.trim();
    const consRaw = document.getElementById('form-cons').value.trim();
    
    if (!rating) {
      showToast('⚠️ Please select a Star Rating (1 to 5 Stars)!', 'warning');
      return;
    }

    const pros = prosRaw ? prosRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const cons = consRaw ? consRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

    const newReview = {
      id: 'rev-' + Date.now(),
      category,
      itemName,
      rating,
      headline,
      text,
      authorName,
      avatar,
      pros,
      cons,
      upvotes: 1,
      upvoted: true,
      timestamp: 'Just now',
      comments: []
    };

    state.reviews.unshift(newReview);
    saveStateToLocalStorage();
    updateCategoryCounts();
    
    elements.reviewForm.reset();
    elements.starRatingValInput.value = '0';
    highlightStars(0);
    elements.ratingTextHint.textContent = 'Rating chunnein';

    closeModal();
    render();
    showToast('🎉 Review Published Successfully!', 'success');
  });

  document.getElementById('logo-btn').addEventListener('click', (e) => {
    e.preventDefault();
    state.activeCategory = 'all';
    state.searchQuery = '';
    elements.searchInput.value = '';
    document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.category === 'all'));
    render();
  });
}

function renderSearchAutocomplete(query) {
  const q = query.toLowerCase();
  const itemMap = new Map();
  
  state.reviews.forEach(r => {
    if (r.itemName.toLowerCase().includes(q)) {
      if (!itemMap.has(r.itemName)) {
        itemMap.set(r.itemName, { category: r.category, count: 1, sumRating: r.rating });
      } else {
        const item = itemMap.get(r.itemName);
        item.count++;
        item.sumRating += r.rating;
      }
    }
  });

  const matches = Array.from(itemMap.entries());

  if (matches.length === 0) {
    elements.searchDropdown.style.display = 'none';
    return;
  }

  elements.searchDropdown.style.display = 'block';
  elements.searchDropdown.innerHTML = matches.slice(0, 5).map(([itemName, data]) => {
    const avg = (data.sumRating / data.count).toFixed(1);
    const catName = CATEGORIES_MAP[data.category]?.name || data.category;
    return `
      <div class="search-autocomplete-item" onclick="selectSearchSuggestion('${escapeHTML(itemName)}')">
        <div>
          <div class="ac-title">${escapeHTML(itemName)}</div>
          <div class="ac-meta">${catName} &bull; ${data.count} review${data.count === 1 ? '' : 's'}</div>
        </div>
        <div style="font-weight:700; color:var(--gold-star);">${avg} <i class="fa-solid fa-star gold"></i></div>
      </div>
    `;
  }).join('');
}

function selectSearchSuggestion(itemName) {
  elements.searchInput.value = itemName;
  state.searchQuery = itemName.toLowerCase();
  elements.searchDropdown.style.display = 'none';
  elements.searchClear.style.display = 'block';
  render();
}

function updateCategoryCounts() {
  const counts = { movies: 0, games: 0, tech: 0, food: 0, books: 0, anime: 0 };
  state.reviews.forEach(r => {
    if (counts[r.category] !== undefined) {
      counts[r.category]++;
    }
  });

  Object.keys(counts).forEach(cat => {
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = `${counts[cat]} review${counts[cat] === 1 ? '' : 's'}`;
  });

  if (elements.statTotalReviews) {
    elements.statTotalReviews.textContent = `${state.reviews.length}+`;
  }
}

function updateBookmarkUI() {
  elements.bookmarkCount.textContent = state.bookmarks.length;
  elements.bmModalCount.textContent = state.bookmarks.length;
}

function render() {
  let list = state.reviews.filter(r => {
    if (state.activeCategory !== 'all' && r.category !== state.activeCategory) return false;
    return true;
  });

  if (state.searchQuery) {
    list = list.filter(r => 
      r.itemName.toLowerCase().includes(state.searchQuery) ||
      r.headline.toLowerCase().includes(state.searchQuery) ||
      r.text.toLowerCase().includes(state.searchQuery) ||
      r.authorName.toLowerCase().includes(state.searchQuery)
    );
  }

  if (state.searchQuery && list.length > 0) {
    const targetItemName = list[0].itemName;
    const itemReviews = state.reviews.filter(r => r.itemName.toLowerCase().trim() === targetItemName.toLowerCase().trim());
    const avgScore = (itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length).toFixed(1);
    const catName = CATEGORIES_MAP[list[0].category]?.name || list[0].category;
    
    elements.scorecardTitle.textContent = targetItemName;
    elements.scorecardCategory.textContent = catName;
    elements.scorecardRating.innerHTML = `${avgScore} <i class="fa-solid fa-star gold"></i>`;
    elements.scorecardCount.textContent = `${itemReviews.length} Review${itemReviews.length === 1 ? '' : 's'}`;
    elements.scorecardBtnItem.textContent = targetItemName;
    elements.scorecardBadge.textContent = `${parseFloat(avgScore) >= 4.0 ? '96% Verified Positive' : '75% Community Score'}`;

    elements.itemScorecard.style.display = 'block';
  } else {
    elements.itemScorecard.style.display = 'none';
  }

  if (state.ratingFilter !== 'all') {
    const minRating = parseInt(state.ratingFilter);
    list = list.filter(r => r.rating >= minRating);
  }

  if (state.sortFilter === 'highest') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (state.sortFilter === 'popular') {
    list.sort((a, b) => b.upvotes - a.upvotes);
  }

  const catMeta = CATEGORIES_MAP[state.activeCategory] || CATEGORIES_MAP.all;
  elements.activeCatTitle.innerHTML = `<i class="fa-solid ${catMeta.icon} text-accent"></i> ${catMeta.name}`;
  elements.resultsCount.textContent = `${list.length} Review${list.length === 1 ? '' : 's'} found`;

  if (list.length === 0) {
    elements.reviewsContainer.style.display = 'none';
    elements.emptyState.style.display = 'block';
    if (state.searchQuery) {
      elements.emptyTitle.textContent = `No reviews found for "${state.searchQuery}"!`;
      elements.emptyDesc.textContent = `Be the first to review "${state.searchQuery}" and share your experience with the community!`;
    } else {
      elements.emptyTitle.textContent = `Is category me abhi koi review nahi hai!`;
      elements.emptyDesc.textContent = `Aap pehle audience hain jo yahan review likh sakte hain!`;
    }
  } else {
    elements.reviewsContainer.style.display = 'grid';
    elements.emptyState.style.display = 'none';
    elements.reviewsContainer.innerHTML = list.map(r => createReviewCardHTML(r)).join('');

    elements.reviewsContainer.querySelectorAll('.review-card').forEach(card => {
      const id = card.dataset.id;
      
      card.addEventListener('click', (e) => {
        if (e.target.closest('.upvote-btn') || e.target.closest('.author-info') || e.target.closest('.bookmark-btn')) return;
        openDetailModal(id);
      });

      const bookmarkBtn = card.querySelector('.bookmark-btn');
      if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleBookmark(id);
        });
      }

      const authorInfo = card.querySelector('.author-info');
      if (authorInfo) {
        authorInfo.addEventListener('click', (e) => {
          e.stopPropagation();
          const author = authorInfo.dataset.author;
          openProfileModal(author);
        });
      }

      const upvoteBtn = card.querySelector('.upvote-btn');
      if (upvoteBtn) {
        upvoteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleUpvote(id);
        });
      }
    });
  }
}

function createReviewCardHTML(r) {
  const catMeta = CATEGORIES_MAP[r.category] || CATEGORIES_MAP.all;
  const isBookmarked = state.bookmarks.includes(r.id);
  
  const prosHTML = (r.pros || []).slice(0, 2).map(p => 
    `<span class="pill-tag pill-pro"><i class="fa-solid fa-check"></i> ${escapeHTML(p)}</span>`
  ).join('');

  const consHTML = (r.cons || []).slice(0, 1).map(c => 
    `<span class="pill-tag pill-con"><i class="fa-solid fa-xmark"></i> ${escapeHTML(c)}</span>`
  ).join('');

  const authorInit = r.authorName.charAt(0).toUpperCase();

  return `
    <div class="review-card" data-id="${r.id}">
      <div>
        <div class="card-top">
          <span class="category-tag ${catMeta.tagClass}">
            <i class="fa-solid ${catMeta.icon}"></i> ${catMeta.name.split(' ')[0]}
          </span>
          <div class="card-top-right">
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="${isBookmarked ? 'Remove Bookmark' : 'Save Review'}">
              <i class="fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark"></i>
            </button>
            <div class="card-rating">
              <i class="fa-solid fa-star gold"></i>
              <span>${r.rating}.0</span>
            </div>
          </div>
        </div>

        <h3 class="item-name-heading">${escapeHTML(r.itemName)}</h3>
        <p class="review-headline">"${escapeHTML(r.headline)}"</p>
        <p class="review-body-text">${escapeHTML(r.text)}</p>

        <div class="pros-cons-wrap">
          ${prosHTML}
          ${consHTML}
        </div>
      </div>

      <div class="card-footer">
        <div class="author-info" data-author="${escapeHTML(r.authorName)}" title="View ${escapeHTML(r.authorName)}'s Profile">
          <div class="avatar-circle avatar-${r.avatar || 'violet'}">
            ${authorInit}
          </div>
          <div>
            <div class="author-name">
              ${escapeHTML(r.authorName)}
              <i class="fa-solid fa-circle-check verified-icon"></i>
            </div>
            <div class="review-time">${r.timestamp}</div>
          </div>
        </div>

        <button class="upvote-btn ${r.upvoted ? 'upvoted' : ''}" title="Helpful review">
          <i class="fa-solid fa-thumbs-up"></i>
          <span>${r.upvotes}</span>
        </button>
      </div>
    </div>
  `;
}

function toggleBookmark(id) {
  const index = state.bookmarks.indexOf(id);
  if (index >= 0) {
    state.bookmarks.splice(index, 1);
    showToast('Bookmark removed', 'info');
  } else {
    state.bookmarks.push(id);
    showToast('Review Saved to Bookmarks!', 'success');
  }
  saveStateToLocalStorage();
  updateBookmarkUI();
  render();
}

function renderBookmarksModal() {
  const savedReviews = state.reviews.filter(r => state.bookmarks.includes(r.id));
  if (savedReviews.length === 0) {
    elements.bookmarksModalBody.innerHTML = `
      <div style="text-align:center; padding:40px 20px;">
        <div style="font-size:3rem; margin-bottom:12px;"><i class="fa-solid fa-bookmark text-accent"></i></div>
        <h3 style="font-size:1.2rem; margin-bottom:6px;">Koi review saved nahi hai!</h3>
        <p style="color:var(--text-muted);">Kisi bhi review card par bookmark icon dabakar save karein.</p>
      </div>
    `;
  } else {
    elements.bookmarksModalBody.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:14px;">
        ${savedReviews.map(r => `
          <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border-glow); padding:16px; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="openDetailModal('${r.id}'); elements.bookmarksModal.classList.remove('active');">
            <div>
              <span style="font-size:0.75rem; color:var(--primary-cyan); font-weight:700; text-transform:uppercase;">${r.category}</span>
              <h4 style="font-size:1.1rem; color:var(--text-main); font-weight:700; margin-top:2px;">${escapeHTML(r.itemName)}</h4>
              <p style="font-size:0.85rem; color:var(--text-muted);">"${escapeHTML(r.headline)}"</p>
            </div>
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-weight:800; color:var(--gold-star); font-size:1rem;">${r.rating}.0 <i class="fa-solid fa-star gold"></i></span>
              <button onclick="event.stopPropagation(); toggleBookmark('${r.id}'); renderBookmarksModal();" style="background:transparent; color:var(--red-alert); font-size:1.1rem;"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function toggleUpvote(id) {
  const rev = state.reviews.find(r => r.id === id);
  if (!rev) return;

  if (rev.upvoted) {
    rev.upvotes--;
    rev.upvoted = false;
    showToast('Upvote removed', 'info');
  } else {
    rev.upvotes++;
    rev.upvoted = true;
    showToast('👍 Thanks! Review marked as Helpful.', 'success');
  }

  saveStateToLocalStorage();
  render();
}

// Open Detail View Modal with Interactive Spinning 3D Canvas Preview & Comments
function openDetailModal(id) {
  const r = state.reviews.find(item => item.id === id);
  if (!r) return;

  const catMeta = CATEGORIES_MAP[r.category] || CATEGORIES_MAP.all;
  const starsHTML = Array.from({length: 5}, (_, i) => 
    `<i class="fa-solid fa-star ${i < r.rating ? 'gold' : ''}"></i>`
  ).join('');

  const prosList = (r.pros || []).map(p => `<li><i class="fa-solid fa-circle-check text-green"></i> ${escapeHTML(p)}</li>`).join('');
  const consList = (r.cons || []).map(c => `<li><i class="fa-solid fa-circle-xmark text-red"></i> ${escapeHTML(c)}</li>`).join('');

  const commentsList = (r.comments || []).map(cm => `
    <div class="comment-item">
      <div class="comment-top">
        <span class="comment-author">${escapeHTML(cm.author)}</span>
        <span class="comment-time">${cm.time}</span>
      </div>
      <p class="comment-text">${escapeHTML(cm.text)}</p>
    </div>
  `).join('');

  elements.detailModalBody.innerHTML = `
    <div style="padding: 24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <span class="category-tag ${catMeta.tagClass}">
          <i class="fa-solid ${catMeta.icon}"></i> ${catMeta.name}
        </span>
        <span style="font-size:0.85rem; color:var(--text-muted);">${r.timestamp}</span>
      </div>

      <!-- Sketchfab 3D Interactive Item Model Canvas Box -->
      <div class="model-3d-box">
        <canvas id="detail-3d-canvas"></canvas>
        <div class="model-3d-badge"><i class="fa-solid fa-cube"></i> Interactive 3D Preview</div>
      </div>

      <h1 style="font-size:1.8rem; font-weight:800; color:var(--text-main); margin-bottom:8px;">${escapeHTML(r.itemName)}</h1>
      
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
        <div style="font-size:1.3rem;">${starsHTML}</div>
        <span style="font-weight:700; font-size:1.1rem; color:var(--gold-star);">${r.rating} out of 5 Stars</span>
      </div>

      <h3 style="font-size:1.1rem; font-weight:700; color:var(--primary-cyan); margin-bottom:14px; line-height:1.4;">
        "${escapeHTML(r.headline)}"
      </h3>

      <div style="font-size:1rem; line-height:1.7; color:var(--text-main); background:rgba(255,255,255,0.03); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-glow); margin-bottom:24px;">
        ${escapeHTML(r.text)}
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
        ${r.pros && r.pros.length ? `
          <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.2); padding:16px; border-radius:var(--radius-md);">
            <h4 style="color:var(--green-success); margin-bottom:10px; font-size:0.95rem;"><i class="fa-solid fa-thumbs-up"></i> What Users Loved (Pros)</h4>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.9rem;">
              ${prosList}
            </ul>
          </div>
        ` : ''}

        ${r.cons && r.cons.length ? `
          <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2); padding:16px; border-radius:var(--radius-md);">
            <h4 style="color:var(--red-alert); margin-bottom:10px; font-size:0.95rem;"><i class="fa-solid fa-thumbs-down"></i> Areas for Improvement (Cons)</h4>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; font-size:0.9rem;">
              ${consList}
            </ul>
          </div>
        ` : ''}
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; padding-top:16px; border-top:1px solid var(--border-glow);">
        <div class="author-info" onclick="openProfileModal('${escapeHTML(r.authorName)}')">
          <div class="avatar-circle avatar-${r.avatar || 'violet'}">
            ${r.authorName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div class="author-name" style="font-size:1rem;">
              ${escapeHTML(r.authorName)}
              <i class="fa-solid fa-circle-check verified-icon"></i>
            </div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Verified Reviewer</div>
          </div>
        </div>

        <button class="upvote-btn ${r.upvoted ? 'upvoted' : ''}" onclick="toggleUpvote('${r.id}'); openDetailModal('${r.id}');">
          <i class="fa-solid fa-thumbs-up"></i>
          <span>${r.upvotes} Helpful</span>
        </button>
      </div>

      <!-- Community Discussion / Comments Section -->
      <div class="comments-section">
        <h3 class="comments-header"><i class="fa-solid fa-comments text-accent"></i> Community Discussion (${(r.comments || []).length})</h3>
        
        <form onsubmit="postComment(event, '${r.id}')" class="comment-input-box">
          <input type="text" id="comment-text-input" placeholder="Join the discussion... Type your comment" required>
          <button type="submit" class="btn btn-primary" style="padding:8px 18px;">Post</button>
        </form>

        <div id="comments-list-container">
          ${commentsList || '<p style="color:var(--text-muted); font-size:0.9rem;">No comments yet. Be the first to start the discussion!</p>'}
        </div>
      </div>
    </div>
  `;

  elements.detailModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Render spinning 3D mesh model inside modal canvas
  setTimeout(init3DModelCanvas, 50);
}

// 3D Spinning Mesh Viewer Animation (Sketchfab-Style Model Canvas)
function init3DModelCanvas() {
  const canvas = document.getElementById('detail-3d-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  let angleX = 0;
  let angleY = 0;

  // 3D Cube Vertices
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1]
  ];

  const edges = [
    [0,1], [1,2], [2,3], [3,0],
    [4,5], [5,6], [6,7], [7,4],
    [0,4], [1,5], [2,6], [3,7]
  ];

  function project(x, y, z) {
    const radX = angleX;
    const radY = angleY;

    // Rotate Y
    let x1 = x * Math.cos(radY) + z * Math.sin(radY);
    let z1 = -x * Math.sin(radY) + z * Math.cos(radY);

    // Rotate X
    let y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
    let z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

    const fov = 150;
    const scale = fov / (fov + z2 + 3);
    const px = x1 * scale * 45 + canvas.width / 2;
    const py = y2 * scale * 45 + canvas.height / 2;

    return [px, py];
  }

  function draw3DCube() {
    if (!elements.detailModal.classList.contains('active')) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    angleX += 0.01;
    angleY += 0.015;

    const projected = vertices.map(v => project(v[0], v[1], v[2]));

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00f0ff';

    edges.forEach(([i, j]) => {
      const p1 = projected[i];
      const p2 = projected[j];
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();
    });

    requestAnimationFrame(draw3DCube);
  }

  draw3DCube();
}

function postComment(e, reviewId) {
  e.preventDefault();
  const input = document.getElementById('comment-text-input');
  const val = input.value.trim();
  if (!val) return;

  const rev = state.reviews.find(r => r.id === reviewId);
  if (!rev) return;

  if (!rev.comments) rev.comments = [];
  
  rev.comments.push({
    author: 'You (Community Member)',
    text: val,
    time: 'Just now'
  });

  saveStateToLocalStorage();
  openDetailModal(reviewId);
  showToast('Comment posted!', 'success');
}

function openProfileModal(authorName) {
  const userReviews = state.reviews.filter(r => r.authorName === authorName);
  const reviewCount = userReviews.length || 1;
  const totalUpvotes = userReviews.reduce((sum, r) => sum + (r.upvotes || 0), 0);
  const avgRating = userReviews.length ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1) : '5.0';
  
  const sampleAvatar = userReviews.length ? userReviews[0].avatar : 'violet';
  const authorInit = authorName.charAt(0).toUpperCase();

  const isTopCritic = reviewCount >= 1;
  const isCommunityHero = totalUpvotes >= 20;
  const isStarReviewer = parseFloat(avgRating) >= 4.0;
  const isVerified = true;

  elements.profileModalBody.innerHTML = `
    <div style="padding: 24px;">
      <div class="profile-banner">
        <div class="profile-avatar-lg avatar-${sampleAvatar}">
          ${authorInit}
        </div>
        <div class="profile-title-group">
          <h2>${escapeHTML(authorName)} <span class="profile-rank-badge"><i class="fa-solid fa-trophy"></i> Level 2 Reviewer</span></h2>
          <p class="profile-joined-text"><i class="fa-solid fa-shield-halved text-accent"></i> Verified Reviewer &bull; Joined 2026</p>
        </div>
      </div>

      <div class="profile-stats-grid">
        <div class="p-stat-card">
          <div class="p-stat-val">${reviewCount}</div>
          <div class="p-stat-lbl">Reviews Published</div>
        </div>
        <div class="p-stat-card">
          <div class="p-stat-val">${totalUpvotes} 👍</div>
          <div class="p-stat-lbl">Upvotes Received</div>
        </div>
        <div class="p-stat-card">
          <div class="p-stat-val">${avgRating} ★</div>
          <div class="p-stat-lbl">Avg Score Given</div>
        </div>
      </div>

      <h3 class="badges-header"><i class="fa-solid fa-award text-accent"></i> Achievement Badges</h3>
      <div class="badges-grid">
        <div class="badge-card ${isTopCritic ? 'unlocked' : 'locked'}">
          <div class="badge-icon">👑</div>
          <div class="badge-info">
            <h4>Top Critic</h4>
            <p>${isTopCritic ? 'Unlocked: Active reviewer' : 'Publish reviews to unlock'}</p>
          </div>
        </div>

        <div class="badge-card ${isCommunityHero ? 'unlocked' : 'locked'}">
          <div class="badge-icon">👍</div>
          <div class="badge-info">
            <h4>Community Hero</h4>
            <p>${isCommunityHero ? 'Unlocked: 20+ upvotes received' : 'Earn 20+ upvotes to unlock'}</p>
          </div>
        </div>

        <div class="badge-card ${isStarReviewer ? 'unlocked' : 'locked'}">
          <div class="badge-icon">🌟</div>
          <div class="badge-info">
            <h4>Master Reviewer</h4>
            <p>${isStarReviewer ? 'Unlocked: High quality reviews' : 'Maintain 4+ star avg'}</p>
          </div>
        </div>

        <div class="badge-card ${isVerified ? 'unlocked' : 'locked'}">
          <div class="badge-icon">⚡</div>
          <div class="badge-info">
            <h4>Early Adopter</h4>
            <p>Unlocked: Foundation member</p>
          </div>
        </div>
      </div>

      <h3 class="badges-header"><i class="fa-solid fa-newspaper text-accent"></i> Published Reviews by ${escapeHTML(authorName)}</h3>
      <div style="display:flex; flex-direction:column; gap:12px;">
        ${userReviews.length ? userReviews.map(r => `
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glow); padding:14px; border-radius:var(--radius-md); display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="openDetailModal('${r.id}'); elements.profileModal.classList.remove('active');">
            <div>
              <h4 style="font-size:0.95rem; color:var(--text-main); font-weight:700;">${escapeHTML(r.itemName)}</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">"${escapeHTML(r.headline)}"</p>
            </div>
            <span style="background:rgba(255,215,0,0.15); color:var(--gold-star); padding:4px 10px; border-radius:var(--radius-full); font-weight:700; font-size:0.85rem;">
              ${r.rating}.0 <i class="fa-solid fa-star gold"></i>
            </span>
          </div>
        `).join('') : '<p style="color:var(--text-muted);">No reviews written yet.</p>'}
      </div>
    </div>
  `;

  elements.detailModal.classList.remove('active');
  elements.profileModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  
  elements.toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
