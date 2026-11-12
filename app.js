const STORAGE = {
  listings: "unimart_listings_v1",
  profile: "unimart_profile_v1",
  wishlist: "unimart_wishlist_v1",
  enquiries: "unimart_enquiries_v1",
  recently: "unimart_recent_v1",
  theme: "unimart_theme_v1"
};

const categories = [
  ["Books & Study Material", "📚"], ["Electronics & Gadgets", "🎧"], ["Calculators", "🧮"],
  ["Lab Coats & Equipment", "🥼"], ["Cycles & Accessories", "🚲"], ["Hostel Essentials", "🪴"],
  ["Furniture", "🪑"], ["Clothing & Accessories", "🧢"], ["Sports Equipment", "🏸"], ["Other", "✨"]
];
const sampleListings = [
  { id: "sample-1", title: "Engineering Mathematics Vol. 1", category: "Books & Study Material", price: 350, originalPrice: 620, condition: "Good", description: "A well-kept copy with a few helpful notes in the margins. Great for first-year engineering maths. Happy to meet near the library.", location: "Central Library", seller: "Isha Mehta", branch: "Electronics & Communication", year: "3rd Year", sellerId: "sample-student-1", verified: true, status: "Available", createdAt: "2026-11-08T10:00:00.000Z", featured: true, emoji: "📚", image: "images/engineering-mathematics.png", images: [] },
  { id: "sample-2", title: "Casio fx-991EX Calculator", category: "Calculators", price: 850, originalPrice: 1295, condition: "Like New", description: "Fully functional scientific calculator, used for one semester. Includes the original protective cover.", location: "Student Centre", seller: "Kabir Singh", branch: "Computer Engineering", year: "2nd Year", sellerId: "sample-student-2", verified: true, status: "Available", createdAt: "2026-11-09T14:00:00.000Z", featured: true, emoji: "🧮", image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=700&q=80", images: [] },
  { id: "sample-3", title: "Decathlon Rockrider Cycle", category: "Cycles & Accessories", price: 4800, originalPrice: 7200, condition: "Good", description: "Comfortable 26-inch cycle, recently serviced and ready to ride around campus. Includes a sturdy lock.", location: "Sports Complex Gate", seller: "Rohan Kapoor", branch: "Mechanical Engineering", year: "4th Year", sellerId: "sample-student-3", verified: true, status: "Available", createdAt: "2026-11-10T09:00:00.000Z", featured: false, emoji: "🚲", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=700&q=80", images: [] },
  { id: "sample-4", title: "Sony WH-CH520 Headphones", category: "Electronics & Gadgets", price: 2100, originalPrice: 4490, condition: "Like New", description: "Wireless headphones with excellent battery life. Lightly used and comes with its charging cable.", location: "Library Lawn", seller: "Simran Kaur", branch: "Electrical Engineering", year: "3rd Year", sellerId: "sample-student-4", verified: true, status: "Available", createdAt: "2026-11-10T16:30:00.000Z", featured: false, emoji: "🎧", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80", images: [] },
  { id: "sample-5", title: "Lab Coat — Size M", category: "Lab Coats & Equipment", price: 280, originalPrice: 450, condition: "Good", description: "Clean, full-sleeve lab coat in size M. Perfect for practical sessions; freshly washed.", location: "Academic Block A", seller: "Dev Malhotra", branch: "Chemical Engineering", year: "2nd Year", sellerId: "sample-student-5", verified: true, status: "Available", createdAt: "2026-11-07T12:15:00.000Z", featured: false, emoji: "🥼", image: "images/folded-lab-coat.png", images: [] },
  { id: "sample-6", title: "Study Desk Lamp", category: "Hostel Essentials", price: 400, originalPrice: 750, condition: "Good", description: "Warm LED desk lamp with adjustable neck. A quiet companion for late-night study sessions.", location: "Student Centre", seller: "Ananya Verma", branch: "Civil Engineering", year: "2nd Year", sellerId: "sample-student-6", verified: true, status: "Available", createdAt: "2026-11-06T08:30:00.000Z", featured: false, emoji: "💡", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80", images: [] },
  { id: "sample-7", title: "Principles of Physics Textbook", category: "Books & Study Material", price: 500, originalPrice: 850, condition: "Fair", description: "Useful reference for mechanics and waves. Some underlining, but all pages are intact.", location: "Central Library", seller: "Arjun Bhatia", branch: "Computer Engineering", year: "3rd Year", sellerId: "sample-student-7", verified: true, status: "Available", createdAt: "2026-11-05T11:00:00.000Z", featured: false, emoji: "📖", image: "images/engineering-physics-book.png", images: [] },
  { id: "sample-8", title: "Badminton Racket + Cover", category: "Sports Equipment", price: 600, originalPrice: 1550, condition: "Like New", description: "Lightweight racket, great for a casual match at the courts. Protective cover included.", location: "Sports Complex Gate", seller: "Mehak Gill", branch: "Biotechnology", year: "2nd Year", sellerId: "sample-student-8", verified: true, status: "Available", createdAt: "2026-11-04T15:00:00.000Z", featured: false, emoji: "🏸", image: "images/badminton-racket.png", images: [] }
];

const getStored = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    console.error(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
};
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Could not save ${key} to local storage.`, error);
    toast("Browser storage is full. Remove some photos or listings and try again.", "error");
    return false;
  }
};
let listings = getStored(STORAGE.listings, null);
if (!Array.isArray(listings)) {
  listings = sampleListings;
  save(STORAGE.listings, listings);
}
const sampleImageUpdates = {
  "sample-1": {
    previous: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
    next: "images/engineering-mathematics.png"
  },
  "sample-5": {
    previous: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=700&q=80",
      "images/folded-lab-coat.svg"
    ],
    next: "images/folded-lab-coat.png"
  },
  "sample-7": {
    previous: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=700&q=80",
      "images/engineering-physics-book.svg"
    ],
    next: "images/engineering-physics-book.png"
  },
  "sample-8": {
    previous: [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=700&q=80",
      "images/badminton-racket.svg"
    ],
    next: "images/badminton-racket.png"
  }
};
let migratedSampleListings = false;
listings = listings.map(item => {
  const imageUpdate = sampleImageUpdates[item.id];
  let updated = item;
  if (imageUpdate && (Array.isArray(imageUpdate.previous) ? imageUpdate.previous : [imageUpdate.previous]).includes(item.image)) {
    updated = { ...updated, image: imageUpdate.next };
  }
  if (item.id === "sample-8" && item.price !== 600) {
    updated = { ...updated, price: 600 };
  }
  if (updated !== item) migratedSampleListings = true;
  return updated;
});
if (migratedSampleListings) save(STORAGE.listings, listings);
let profile = getStored(STORAGE.profile, { name: "Aditi", email: "aarav.sharma@thapar.edu", branch: "Computer Engineering", year: "2nd Year", verified: true });
let wishlist = getStored(STORAGE.wishlist, []);
let enquiries = getStored(STORAGE.enquiries, []);
if (profile.name === "Aarav Sharma") {
  profile = { ...profile, name: "Aditi" };
  listings = listings.map(item => item.sellerId === (profile.id || "current-user") && item.seller === "Aarav Sharma" ? { ...item, seller: "Aditi" } : item);
  enquiries = enquiries.map(item => item.buyerId === (profile.id || "current-user") && item.buyer === "Aarav Sharma" ? { ...item, buyer: "Aditi" } : item);
  save(STORAGE.profile, profile);
  save(STORAGE.listings, listings);
  save(STORAGE.enquiries, enquiries);
}
let recently = getStored(STORAGE.recently, []);
let page = "dashboard";
let editingId = null;
let draftPhotos = [];
let currentDetailImage = 0;
let currentDetailId = null;
let gridView = "grid";
let filters = { category: "", condition: "", min: "", max: "", search: "", sort: "newest" };

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const initials = name => String(name || "Student").split(/\s+/).slice(0, 2).map(part => part[0] || "").join("").toUpperCase();
const money = amount => `₹${Number(amount || 0).toLocaleString("en-IN")}`;
const categoryIcon = name => (categories.find(item => item[0] === name) || ["", "✨"])[1];
const isMine = listing => listing.sellerId === (profile.id || "current-user");
const availableListings = () => listings.filter(item => item.status !== "Sold");
const discountPercent = item => item.originalPrice > item.price ? Math.round((1 - item.price / item.originalPrice) * 100) : 0;
const timeLabel = date => {
  const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86400000));
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
};

function toast(message, type = "success") {
  const node = document.createElement("div");
  node.className = `toast ${type}`;
  node.textContent = message;
  $("#toast-region").append(node);
  window.setTimeout(() => node.remove(), 3500);
}

function syncProfile() {
  $("#sidebar-name").textContent = profile.name || "Thapar student";
  $("#sidebar-branch").textContent = profile.branch || "Thapar student";
  $("#sidebar-avatar").textContent = initials(profile.name);
  $("#top-avatar").textContent = initials(profile.name);
  $("#wishlist-count").textContent = wishlist.length;
}

function updateProfile(nextProfile) {
  const existing = profile;
  profile = { ...existing, ...nextProfile, id: existing.id || "current-user", verified: true };
  if (save(STORAGE.profile, profile)) {
    syncProfile();
    toast("Student profile saved and verified.");
  }
}

function productPhoto(item, index = 0) {
  const photos = item.images?.length ? item.images : [item.image].filter(Boolean);
  return photos[index] || "";
}

function photoMarkup(item, index = 0, large = false) {
  const src = productPhoto(item, index);
  if (src) return `<img src="${escapeHTML(src)}" alt="${escapeHTML(item.title)}" loading="${large ? "eager" : "lazy"}" onerror="this.parentElement.innerHTML='<div class=&quot;product-placeholder&quot;>${escapeHTML(item.emoji || "📦")}</div>'">`;
  return `<div class="product-placeholder" aria-label="No photo uploaded">${escapeHTML(item.emoji || categoryIcon(item.category))}</div>`;
}

function cardMarkup(item) {
  const saved = wishlist.includes(item.id);
  const discount = discountPercent(item);
  return `<article class="product-card">
    <div class="product-media" data-open-product="${escapeHTML(item.id)}">
      ${photoMarkup(item)}
      <span class="product-tag ${item.status === "Sold" ? "sold" : ""}">${item.status === "Sold" ? "SOLD" : escapeHTML(item.condition)}</span>
      <button class="heart-button ${saved ? "saved" : ""}" type="button" data-wishlist="${escapeHTML(item.id)}" aria-label="${saved ? "Remove from" : "Add to"} wishlist">${saved ? "♥" : "♡"}</button>
    </div>
    <div class="product-body">
      <div class="product-title-row"><h3 class="product-title" data-open-product="${escapeHTML(item.id)}">${escapeHTML(item.title)}</h3><span class="condition">${item.status === "Sold" ? "" : "● " + escapeHTML(item.condition)}</span></div>
      <div class="price-row"><span class="price">${money(item.price)}</span>${item.originalPrice ? `<span class="old-price">${money(item.originalPrice)}</span>` : ""}${discount ? `<span class="discount">${discount}% off</span>` : ""}</div>
      <div class="product-meta"><span>${escapeHTML(item.category)}</span><span>${timeLabel(item.createdAt)}</span></div>
      <div class="seller-line"><span class="avatar">${initials(item.seller)}</span><span>${escapeHTML(item.seller)}</span>${item.verified ? '<span class="verified" title="Verified Thapar student">✓</span>' : ""}</div>
    </div>
  </article>`;
}

function cards(items, emptyTitle = "Nothing here just yet", emptyText = "Check back soon for new campus finds.") {
  if (!items.length) return `<div class="grid-empty"><strong>${escapeHTML(emptyTitle)}</strong>${escapeHTML(emptyText)}</div>`;
  return items.map(cardMarkup).join("");
}

function setPage(nextPage) {
  page = nextPage;
  $$(".nav-link").forEach(link => link.classList.toggle("active", link.dataset.page === page));
  $("#breadcrumb-current").textContent = ({ dashboard: "Dashboard", marketplace: "Marketplace", listings: "My listings", create: "Create listing", wishlist: "Wishlist", enquiries: "My enquiries", profile: "My profile", settings: "Settings" })[page] || "Dashboard";
  $("#content").innerHTML = "";
  renderPage();
  $("#content").focus({ preventScroll: true });
  $("#sidebar").classList.remove("open");
  $("#mobile-backdrop").classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function heading(kicker, title, subtitle, action = "") {
  return `<div class="page-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action}</div>`;
}

function renderDashboard() {
  const active = listings.filter(item => item.status !== "Sold");
  const yours = active.filter(isMine);
  const yourEnquiries = enquiries.filter(item => item.buyerId === (profile.id || "current-user") || item.sellerId === (profile.id || "current-user"));
  const featured = availableListings().filter(item => item.featured).slice(0, 4);
  const recent = [...availableListings()].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  const viewed = recently.map(id => listings.find(item => item.id === id)).filter(item => item && item.status !== "Sold").slice(0, 4);
  $("#content").innerHTML = `
    <section class="hero"><div class="hero-copy"><span class="eyebrow">YOUR CAMPUS, YOUR MARKET</span><h1>Good finds. <em>Good people.</em><br>All nearby.</h1><p>Pass on what you no longer need. Find something useful from a fellow Thapar student.</p><button class="button" data-page="marketplace">Explore marketplace <span>↗</span></button></div><div class="hero-decoration" aria-hidden="true">🪴</div><span class="hero-sticker">Made for Thapar, with ♥</span></section>
    <section class="dashboard-stats">
      <div class="stat-card"><span class="stat-icon">▤</span><div><strong>${yours.length}</strong><small>Active listings</small></div></div>
      <div class="stat-card"><span class="stat-icon">♡</span><div><strong>${wishlist.length}</strong><small>Saved items</small></div></div>
      <div class="stat-card"><span class="stat-icon">✉</span><div><strong>${yourEnquiries.length}</strong><small>My enquiries</small></div></div>
      <div class="stat-card"><span class="stat-icon">♧</span><div><strong>${listings.filter(item => item.status === "Sold" && isMine(item)).length}</strong><small>Items passed on</small></div></div>
    </section>
    <section class="section"><div class="section-heading"><div><h2>Browse by category</h2><p>A little something for every campus need</p></div><button class="text-button" data-page="marketplace">All categories ↗</button></div><div class="category-row">
      ${categories.slice(0, 5).map(([name, icon]) => `<button class="category-tile" data-category="${escapeHTML(name)}"><span class="category-icon">${icon}</span><span><strong>${escapeHTML(name)}</strong><small>${listings.filter(item => item.category === name && item.status !== "Sold").length} finds</small></span></button>`).join("")}
    </div></section>
    <section class="section"><div class="section-heading"><div><h2>Handpicked for campus</h2><p>Student-loved finds worth a second look</p></div><button class="text-button" data-page="marketplace">See all ↗</button></div><div class="product-grid">${cards(featured, "No featured finds yet", "New listings will show up here.")}</div></section>
    <section class="section"><div class="section-heading"><div><h2>Fresh on campus</h2><p>Recently listed by your fellow students</p></div><button class="text-button" data-page="marketplace">Browse all ↗</button></div><div class="product-grid">${cards(recent)}</div></section>
    ${viewed.length ? `<section class="section"><div class="section-heading"><div><h2>Pick up where you left off</h2><p>Your recently viewed finds on this device</p></div></div><div class="product-grid">${cards(viewed)}</div></section>` : ""}
    <div class="section notice">A friendly reminder: meet in a public campus spot and arrange payment directly with the seller. UniMart doesn't process payments or guarantee transactions.</div>`;
}

function filteredListings() {
  let result = [...availableListings()];
  if (filters.category) result = result.filter(item => item.category === filters.category);
  if (filters.condition) result = result.filter(item => item.condition === filters.condition);
  if (filters.min) result = result.filter(item => Number(item.price) >= Number(filters.min));
  if (filters.max) result = result.filter(item => Number(item.price) <= Number(filters.max));
  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase();
    result = result.filter(item => `${item.title} ${item.description} ${item.category} ${item.seller}`.toLowerCase().includes(query));
  }
  if (filters.sort === "low") result.sort((a, b) => a.price - b.price);
  else if (filters.sort === "high") result.sort((a, b) => b.price - a.price);
  else result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return result;
}

function renderMarketplace() {
  const result = filteredListings();
  $("#content").innerHTML = `
    ${heading("FIND YOUR NEXT FAVOURITE", "The marketplace", "Second-hand treasures, just a campus stroll away.", '<button class="button" data-page="create">＋ List an item</button>')}
    <div class="filter-layout">
      <aside class="filter-panel"><h3>Filters</h3><button class="text-button" id="clear-filters">Clear all</button>
        <div class="filter-group"><label class="filter-label" for="filter-category">Category</label><select id="filter-category"><option value="">All categories</option>${categories.map(([name]) => `<option ${filters.category === name ? "selected" : ""}>${escapeHTML(name)}</option>`).join("")}</select></div>
        <div class="filter-group"><label class="filter-label">Price range (₹)</label><div class="price-inputs"><input id="filter-min" type="number" min="0" placeholder="Min" value="${escapeHTML(filters.min)}"><input id="filter-max" type="number" min="0" placeholder="Max" value="${escapeHTML(filters.max)}"></div></div>
        <div class="filter-group"><label class="filter-label" for="filter-condition">Condition</label><select id="filter-condition"><option value="">Any condition</option>${["New", "Like New", "Good", "Fair"].map(name => `<option ${filters.condition === name ? "selected" : ""}>${name}</option>`).join("")}</select></div>
      </aside>
      <div><div class="filter-toolbar">
        <div class="search-wrap"><label class="search-field"><span>⌕</span><input id="market-search" type="search" value="${escapeHTML(filters.search)}" placeholder="Search books, cycles, gadgets..." autocomplete="off"><button type="button" class="search-clear" id="search-clear" aria-label="Clear search">×</button></label><div class="suggestions" id="suggestions"></div></div>
        <div class="toolbar-right"><span class="result-count">${result.length} finds</span><select id="sort-listing" aria-label="Sort listings"><option value="newest" ${filters.sort === "newest" ? "selected" : ""}>Newest</option><option value="low" ${filters.sort === "low" ? "selected" : ""}>Price: low to high</option><option value="high" ${filters.sort === "high" ? "selected" : ""}>Price: high to low</option></select><div class="view-toggle"><button class="${gridView === "grid" ? "selected" : ""}" data-view="grid" aria-label="Grid view">▦</button><button class="${gridView === "list" ? "selected" : ""}" data-view="list" aria-label="List view">☷</button></div></div>
      </div><div class="product-grid ${gridView === "list" ? "list-view" : ""}" id="market-grid">${cards(result, "No matching finds", "Try changing your search or clearing a filter.")}</div></div>
    </div>
    <p class="notice section">Trade thoughtfully: meet in safe public campus locations. UniMart connects students only; payments are arranged directly between buyer and seller.</p>`;
}

function renderListings() {
  const mine = listings.filter(isMine).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  $("#content").innerHTML = `${heading("YOUR CAMPUS STALL", "My listings", "Keep your listings fresh and let fellow students know what's available.", '<button class="button" data-page="create">＋ Create listing</button>')}
    <div class="dashboard-stats">
      <div class="stat-card"><span class="stat-icon">▤</span><div><strong>${mine.filter(item => item.status === "Available").length}</strong><small>Available</small></div></div>
      <div class="stat-card"><span class="stat-icon">✓</span><div><strong>${mine.filter(item => item.status === "Sold").length}</strong><small>Marked sold</small></div></div>
      <div class="stat-card"><span class="stat-icon">♡</span><div><strong>${mine.reduce((sum, item) => sum + enquiries.filter(enquiry => enquiry.listingId === item.id).length, 0)}</strong><small>Enquiries received</small></div></div>
      <div class="stat-card"><span class="stat-icon">◷</span><div><strong>${mine.length}</strong><small>Total listings</small></div></div>
    </div>
    <section class="section"><div class="section-heading"><div><h2>Your items</h2><p>Edit details or update availability anytime</p></div></div>
    ${mine.length ? `<div class="product-grid">${mine.map(item => `<div>${cardMarkup(item)}<div class="listing-actions"><button class="button secondary small" data-edit="${escapeHTML(item.id)}">Edit</button><button class="button secondary small" data-toggle-sold="${escapeHTML(item.id)}">${item.status === "Sold" ? "Mark available" : "Mark sold"}</button><button class="text-button" data-delete="${escapeHTML(item.id)}">Delete</button></div></div>`).join("")}</div>` : `<div class="grid-empty"><strong>Your first listing is waiting</strong>Give a useful item a second life with another Thapar student.<p style="margin-top:14px"><button class="button" data-page="create">＋ Create a listing</button></p></div>`}
    </section>`;
}

function renderCreate() {
  const item = editingId ? listings.find(listing => listing.id === editingId) : null;
  draftPhotos = item ? [...(item.images || [])] : [];
  $("#content").innerHTML = `${heading("A BETTER SECOND LIFE", item ? "Edit your listing" : "List something lovely", item ? "Update the details students see in your listing." : "Share a useful find with your Thapar community.")}
    <form class="form-card" id="listing-form">
      <div class="form-grid">
        <div class="field full"><label for="item-title">Item name</label><input id="item-title" name="title" required maxlength="70" placeholder="e.g. Casio scientific calculator" value="${escapeHTML(item?.title || "")}"></div>
        <div class="field"><label for="item-category">Category</label><select id="item-category" name="category" required><option value="">Choose a category</option>${categories.map(([name]) => `<option ${item?.category === name ? "selected" : ""}>${escapeHTML(name)}</option>`).join("")}</select></div>
        <div class="field"><label for="item-condition">Condition</label><select id="item-condition" name="condition" required>${["New", "Like New", "Good", "Fair"].map(name => `<option ${item?.condition === name ? "selected" : ""}>${name}</option>`).join("")}</select></div>
        <div class="field"><label for="item-price">Selling price (₹)</label><input id="item-price" name="price" type="number" min="1" max="1000000" required placeholder="e.g. 850" value="${escapeHTML(item?.price || "")}"></div>
        <div class="field"><label for="item-original">Original price (₹) <span>optional</span></label><input id="item-original" name="originalPrice" type="number" min="1" max="1000000" placeholder="e.g. 1295" value="${escapeHTML(item?.originalPrice || "")}"></div>
        <div class="field full"><label for="item-description">Description</label><textarea id="item-description" name="description" required maxlength="1000" placeholder="Tell students about the item, how you used it, and anything they should know...">${escapeHTML(item?.description || "")}</textarea></div>
        <div class="field"><label for="item-location">Campus pickup location</label><select id="item-location" name="location" required>${["Central Library", "Student Centre", "Academic Block A", "Sports Complex Gate", "Library Lawn", "Main Gate / Visitor Area", "Other public campus spot"].map(name => `<option ${item?.location === name ? "selected" : ""}>${name}</option>`).join("")}</select><small class="field-hint">Choose a public campus spot. Don't share hostel room numbers.</small></div>
        <div class="field"><label for="item-contact">Preferred contact method</label><select id="item-contact" name="contactMethod"><option>UniMart enquiry</option><option ${item?.contactMethod === "In-person on campus" ? "selected" : ""}>In-person on campus</option></select><small class="field-hint">Keep contact on-platform; personal details stay private.</small></div>
        <div class="field"><label for="item-status">Availability</label><select id="item-status" name="status"><option ${item?.status !== "Sold" ? "selected" : ""}>Available</option><option ${item?.status === "Sold" ? "selected" : ""}>Sold</option></select></div>
        <div class="field full"><label>Item photos <span>up to 6 · JPG, PNG or WEBP · max 5 MB each</span></label><label class="upload-zone" id="upload-zone" for="item-photos"><span style="font-size:22px">↥</span><strong>Drop photos here or browse</strong><span class="field-hint">Images are resized and stored in this browser only.</span><input id="item-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple></label><div class="upload-previews" id="upload-previews"></div></div>
      </div>
      <div class="notice" style="margin-top:17px">UniMart is a student-to-student connector, not a payment or delivery service. Arrange a safe public campus meetup directly with the buyer.</div>
      <div class="form-actions"><button type="button" class="button secondary" data-page="listings">Cancel</button><button type="submit" class="button">${item ? "Save changes" : "Publish listing"}</button></div>
    </form>`;
  renderPhotoPreviews();
  const zone = $("#upload-zone");
  ["dragenter", "dragover"].forEach(name => zone.addEventListener(name, event => {
    event.preventDefault();
    zone.classList.add("dragging");
  }));
  ["dragleave", "drop"].forEach(name => zone.addEventListener(name, event => {
    event.preventDefault();
    zone.classList.remove("dragging");
  }));
  zone.addEventListener("drop", event => processPhotos(event.dataTransfer.files));
}

function renderWishlist() {
  const items = wishlist.map(id => listings.find(item => item.id === id)).filter(Boolean);
  $("#content").innerHTML = `${heading("YOUR SAVED FINDS", "Wishlist", "A little shortlist of things you might love.", '<button class="button secondary" data-page="marketplace">Explore marketplace</button>')}<div class="product-grid">${cards(items, "Your wishlist is taking a breather", "Tap the heart on a listing to save it for later.")}</div>`;
}

function renderEnquiries() {
  const userId = profile.id || "current-user";
  const mine = enquiries.filter(item => item.buyerId === userId || item.sellerId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  $("#content").innerHTML = `${heading("KEEP THE CONVERSATION GOING", "My enquiries", "Your buyer and seller conversations stay right here.", '<button class="button secondary" data-page="marketplace">Find something</button>')}
    ${mine.length ? `<div class="settings-list">${mine.map(enquiry => {
      const listing = listings.find(item => item.id === enquiry.listingId);
      const outgoing = enquiry.buyerId === userId;
      return `<div class="setting-row"><div><strong>${outgoing ? "You asked about" : "Enquiry for"} ${escapeHTML(listing?.title || "a listing")}</strong><small>${outgoing ? "Seller" : "Buyer"}: ${escapeHTML(outgoing ? enquiry.seller : enquiry.buyer)} · ${timeLabel(enquiry.createdAt)}</small><small style="color:var(--text);margin-top:7px">“${escapeHTML(enquiry.message)}”</small></div><span class="badge">${listing?.status === "Sold" ? "Item sold" : escapeHTML(enquiry.status || "Sent")}</span></div>`;
    }).join("")}</div>` : `<div class="grid-empty"><strong>No enquiries yet</strong>When you enquire about a listing, you'll find your message and its status here.<p style="margin-top:14px"><button class="button" data-page="marketplace">Browse marketplace</button></p></div>`}
    <p class="notice section">Replies are simulated for this browser prototype. Personal contact information is never shown publicly.</p>`;
}

function renderProfile() {
  $("#content").innerHTML = `${heading("YOUR STUDENT PROFILE", "My profile", "A little about you, visible to fellow campus shoppers.", '<button class="button" id="edit-profile">Edit profile</button>')}
    <div class="profile-layout"><div class="profile-card"><span class="avatar profile-large-avatar">${initials(profile.name)}</span><h2>${escapeHTML(profile.name || "Thapar student")}</h2><p>${escapeHTML(profile.branch || "Thapar Institute")}</p>${profile.verified ? '<span class="badge">✓ Verified Thapar student</span>' : ""}<p style="margin-top:15px">No profile photo needed. Your initials keep things simple.</p></div>
    <div class="profile-info"><h3>Student details</h3><div class="info-row"><span>Name</span><strong>${escapeHTML(profile.name || "—")}</strong></div><div class="info-row"><span>Thapar email / student ID</span><strong>${escapeHTML(maskIdentifier(profile.email || profile.studentId || ""))}</strong></div><div class="info-row"><span>Branch</span><strong>${escapeHTML(profile.branch || "—")}</strong></div><div class="info-row"><span>Year</span><strong>${escapeHTML(profile.year || "—")}</strong></div><div class="info-row"><span>Verification</span><strong class="verified">${profile.verified ? "✓ Verified student" : "Not verified"}</strong></div><p class="field-hint" style="margin-top:13px">Your complete student ID and email are never displayed on public listings.</p></div></div>`;
}

function maskIdentifier(value) {
  const text = String(value);
  if (text.includes("@")) {
    const [name, domain] = text.split("@");
    return `${name.slice(0, 1)}•••@${domain}`;
  }
  if (text.length > 3) return `••••${text.slice(-3)}`;
  return text ? "••••" : "—";
}

function renderSettings() {
  $("#content").innerHTML = `${heading("MAKE IT YOURS", "Settings", "Tune your UniMart experience on this device.")}
    <div class="settings-list">
      <div class="setting-row"><div><strong>Switch to ${document.documentElement.dataset.theme === "dark" ? "Light" : "Dark"} theme</strong></div><button class="switch ${document.documentElement.dataset.theme === "dark" ? "on" : ""}" id="theme-switch" role="switch" aria-checked="${document.documentElement.dataset.theme === "dark"}" aria-label="Toggle theme"></button></div>
      <div class="setting-row"><div><strong>Browser-only storage</strong><small>Your profile, listings, photos, and wishlist live in this browser's local storage. They are not shared across devices or with other users.</small></div><span class="badge">This device</span></div>
      <div class="setting-row"><div><strong>Reset demo data</strong><small>Restore the sample campus listings and clear your local demo activity.</small></div><button class="button secondary small" id="reset-demo">Reset data</button></div>
      <div class="setting-row"><div><strong>Safe campus exchanges</strong><small>Meet in a public campus location. UniMart does not process payments or guarantee transactions.</small></div><span class="verified">✳</span></div>
    </div>`;
}

function renderPage() {
  const renderers = { dashboard: renderDashboard, marketplace: renderMarketplace, listings: renderListings, create: renderCreate, wishlist: renderWishlist, enquiries: renderEnquiries, profile: renderProfile, settings: renderSettings };
  (renderers[page] || renderDashboard)();
}

function toggleWishlist(id) {
  wishlist = wishlist.includes(id) ? wishlist.filter(saved => saved !== id) : [...wishlist, id];
  if (save(STORAGE.wishlist, wishlist)) {
    syncProfile();
    toast(wishlist.includes(id) ? "Saved to your wishlist." : "Removed from your wishlist.");
    renderPage();
  }
}

function handleLoginSubmit(form) {
  const data = new FormData(form);
  const identifier = String(data.get("identifier")).trim().toLowerCase();
  const expected = String(profile.email || profile.studentId || "").trim().toLowerCase();
  if (!data.get("password") || !expected || identifier !== expected) {
    toast("No matching saved student profile in this browser. Register this device first.", "error");
    return;
  }
  closeModal();
  toast(`Signed in as ${profile.name || "your saved Thapar profile"}.`);
  syncProfile();
  renderPage();
}

function openProduct(id) {
  const item = listings.find(listing => listing.id === id);
  if (!item) return;
  recently = [id, ...recently.filter(old => old !== id)].slice(0, 8);
  save(STORAGE.recently, recently);
  currentDetailImage = 0;
  currentDetailId = id;
  renderProductModal(item);
}

function renderProductModal(item) {
  const sold = item.status === "Sold";
  const imageCount = Math.max(1, (item.images?.length ? item.images : [item.image].filter(Boolean)).length);
  const related = availableListings().filter(candidate => candidate.id !== item.id && candidate.category === item.category).slice(0, 3);
  const modal = $("#modal-root");
  modal.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${escapeHTML(item.title)}"><button class="modal-close" data-close-modal aria-label="Close">×</button><div class="product-detail">
    <div class="detail-gallery"><div class="detail-main-image" id="detail-main-image" title="View larger">${photoMarkup(item, currentDetailImage, true)}</div>
    ${imageCount > 1 ? `<div class="thumb-strip">${Array.from({ length: imageCount }, (_, index) => `<button class="detail-thumb ${currentDetailImage === index ? "active" : ""}" data-thumb="${index}">${photoMarkup(item, index)}</button>`).join("")}</div>` : ""}</div>
    <div class="detail-info"><span class="eyebrow">${escapeHTML(item.category)}</span><h2>${escapeHTML(item.title)}</h2><span class="badge">${sold ? "Marked sold" : escapeHTML(item.condition)}</span><div class="detail-price">${money(item.price)} ${item.originalPrice ? `<span class="old-price">${money(item.originalPrice)}</span>` : ""}</div>
    ${sold ? '<p class="notice">This listing has been marked as sold and is no longer available.</p>' : ""}
    <p class="detail-description">${escapeHTML(item.description)}</p><div class="detail-facts"><div class="detail-fact"><span>Category</span><strong>${escapeHTML(item.category)}</strong></div><div class="detail-fact"><span>Pickup spot</span><strong>${escapeHTML(item.location || "Public campus spot")}</strong></div><div class="detail-fact"><span>Listed</span><strong>${timeLabel(item.createdAt)}</strong></div></div>
    <div class="detail-seller"><span class="avatar">${initials(item.seller)}</span><div><strong>${escapeHTML(item.seller)} ${item.verified ? '<span class="verified">✓ Verified</span>' : ""}</strong><small>${escapeHTML(item.branch || "Thapar student")} · ${escapeHTML(item.year || "")}</small></div></div>
    ${!sold && !isMine(item) ? `<button class="button" style="width:100%" data-enquire="${escapeHTML(item.id)}">✉ Contact seller</button>` : sold ? "" : '<button class="button secondary" style="width:100%" disabled>Your listing</button>'}
    <p class="field-hint" style="margin-top:11px">No payment on UniMart. Agree on a safe public meetup directly.</p></div></div>
    ${related.length ? `<section class="related-items"><h3>Related items</h3><div class="product-grid">${related.map(cardMarkup).join("")}</div></section>` : ""}
    </div>`;
}

function openEnquiry(id) {
  const item = listings.find(listing => listing.id === id);
  if (!item) return;
  $("#modal-root").innerHTML = `<div class="modal form-modal" role="dialog" aria-modal="true"><button class="modal-close" data-close-modal aria-label="Close">×</button><span class="eyebrow">SAY HELLO</span><h2>Enquire about this find</h2><p>${escapeHTML(item.title)} · ${money(item.price)}<br>Your message stays in this browser prototype. No personal contact details are shared.</p>
    <form id="enquiry-form" data-listing-id="${escapeHTML(id)}"><div class="field"><label for="enquiry-message">Your message</label><textarea id="enquiry-message" name="message" maxlength="500" required placeholder="Hi! Is this still available? I'd be happy to meet at the student centre."></textarea></div><div class="form-actions"><button class="button secondary" type="button" data-close-modal>Cancel</button><button class="button" type="submit">Send enquiry</button></div></form></div>`;
}

function showImageViewer(item, index) {
  const src = productPhoto(item, index);
  if (!src) return;
  $("#modal-root").innerHTML = `<div class="modal image-viewer" role="dialog" aria-modal="true"><button class="modal-close" data-close-modal aria-label="Close">×</button><img src="${escapeHTML(src)}" alt="${escapeHTML(item.title)}"></div>`;
}

function renderPhotoPreviews() {
  const region = $("#upload-previews");
  if (!region) return;
  region.innerHTML = draftPhotos.map((photo, index) => `<div class="upload-thumb"><img src="${escapeHTML(photo)}" alt="Photo ${index + 1} preview"><button type="button" data-remove-photo="${index}" aria-label="Remove photo">×</button></div>`).join("");
}

async function resizeImage(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG, or WEBP image.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Each photo must be smaller than 5 MB.");
  const source = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read that image."));
    reader.readAsDataURL(file);
  });
  const image = await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("That image could not be opened."));
    img.src = source;
  });
  const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const context = canvas.getContext("2d");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", .78);
}

async function processPhotos(files) {
  const chosen = [...files];
  for (const file of chosen) {
    if (draftPhotos.length >= 6) {
      toast("You can add up to 6 photos.", "error");
      break;
    }
    try {
      draftPhotos.push(await resizeImage(file));
      renderPhotoPreviews();
    } catch (error) {
      toast(error.message, "error");
    }
  }
}

function submitListing(form) {
  const data = new FormData(form);
  const title = String(data.get("title")).trim();
  const price = Number(data.get("price"));
  const originalPrice = Number(data.get("originalPrice")) || 0;
  if (!title || !Number.isFinite(price) || price <= 0 || (originalPrice && originalPrice < price)) {
    toast("Check the item name and prices. Original price should be at least the selling price.", "error");
    return;
  }
  const existing = editingId ? listings.find(item => item.id === editingId) : null;
  const item = {
    ...(existing || {}),
    id: existing?.id || `listing-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title, category: data.get("category"), condition: data.get("condition"), price, originalPrice,
    description: String(data.get("description")).trim(), location: data.get("location"),
    contactMethod: data.get("contactMethod"), status: data.get("status"), images: [...draftPhotos],
    image: draftPhotos[0] || (existing?.image && existing.image.startsWith("data:") ? "" : existing?.image || ""),
    emoji: existing?.emoji || categoryIcon(data.get("category")), seller: profile.name || "Thapar student",
    branch: profile.branch || "Thapar student", year: profile.year || "", sellerId: profile.id || "current-user",
    verified: true, featured: false, createdAt: existing?.createdAt || new Date().toISOString()
  };
  const next = existing ? listings.map(listing => listing.id === existing.id ? item : listing) : [item, ...listings];
  if (!save(STORAGE.listings, next)) return;
  listings = next;
  editingId = null;
  draftPhotos = [];
  toast(existing ? "Your listing has been updated." : "Your item is now listed.");
  setPage("listings");
}

function openProfileForm() {
  $("#modal-root").innerHTML = `<div class="modal form-modal" role="dialog" aria-modal="true"><button class="modal-close" data-close-modal aria-label="Close">×</button><span class="eyebrow">THAPAR STUDENT CHECK</span><h2>${profile.name ? "Register or update your profile" : "Join the campus community"}</h2><p>Demo verification checks for a Thapar email address or student ID format. This is a frontend simulation and does not contact Thapar systems. Your full identifier remains private.</p>
    <form id="profile-form"><div class="form-grid"><div class="field full"><label for="profile-name">Full name</label><input id="profile-name" name="name" required maxlength="70" value="${escapeHTML(profile.name || "")}" placeholder="Your name"></div><div class="field full"><label for="profile-identifier">Thapar email or student ID</label><input id="profile-identifier" name="identifier" required value="${escapeHTML(profile.email || profile.studentId || "")}" placeholder="name@thapar.edu"></div><div class="field"><label for="profile-branch">Branch</label><select id="profile-branch" name="branch" required>${["Computer Engineering", "Electronics & Communication", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Biotechnology", "Other"].map(branch => `<option ${profile.branch === branch ? "selected" : ""}>${branch}</option>`).join("")}</select></div><div class="field"><label for="profile-year">Year</label><select id="profile-year" name="year" required>${["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"].map(year => `<option ${profile.year === year ? "selected" : ""}>${year}</option>`).join("")}</select></div></div><div class="form-actions"><button type="button" class="button secondary" data-close-modal>Cancel</button><button type="submit" class="button">Verify & save</button></div></form></div>`;
  const form = $("#modal-root form");
  form.insertAdjacentHTML("beforebegin", `<button type="button" class="text-button" data-auth-action="login" style="padding:0 0 14px">Already registered on this browser? Sign in ↗</button>`);
}

function openLoginForm() {
  $("#modal-root").innerHTML = `<div class="modal form-modal" role="dialog" aria-modal="true"><button class="modal-close" data-close-modal aria-label="Close">×</button><span class="eyebrow">WELCOME BACK</span><h2>Sign in to UniMart</h2><p>This prototype signs in to the student profile saved in this browser only. Passwords are not stored or verified by a server.</p>
    <form id="login-form"><div class="form-grid"><div class="field full"><label for="login-identifier">Thapar email or student ID</label><input id="login-identifier" name="identifier" required value="${escapeHTML(profile.email || profile.studentId || "")}" autocomplete="username" placeholder="name@thapar.edu"></div><div class="field full"><label for="login-password">Password</label><input id="login-password" name="password" type="password" required autocomplete="current-password" placeholder="Enter any password for this demo"></div></div><div class="form-actions"><button type="button" class="button secondary" data-auth-action="register">Create student profile</button><button type="submit" class="button">Sign in</button></div></form></div>`;
}

function handleProfileSubmit(form) {
  const data = new FormData(form);
  const identifier = String(data.get("identifier")).trim();
  const isThaparEmail = /^[^\s@]+@(?:thapar\.edu|thapar\.ac\.in)$/i.test(identifier);
  const isStudentId = /^[a-z0-9-]{5,20}$/i.test(identifier);
  if (!isThaparEmail && !isStudentId) {
    toast("Use a Thapar student email (@thapar.edu / @thapar.ac.in) or a valid student ID.", "error");
    return;
  }
  const next = { name: String(data.get("name")).trim(), email: isThaparEmail ? identifier : "", studentId: isStudentId ? identifier : "", branch: data.get("branch"), year: data.get("year"), verified: true };
  updateProfile(next);
  closeModal();
  renderPage();
}

function closeModal() {
  $("#modal-root").innerHTML = "";
}

document.addEventListener("click", event => {
  if (event.target === $("#modal-root")) {
    closeModal();
    return;
  }
  const target = event.target.closest("button, a, [data-open-product], .detail-main-image, #mobile-backdrop");
  if (!target) return;
  if (target.matches("[data-page]")) {
    event.preventDefault();
    const next = target.dataset.page;
    if (next === "create") editingId = null;
    setPage(next);
    return;
  }
  if (target.matches(".nav-link")) return;
  if (target.matches("[data-category]")) {
    filters.category = target.dataset.category;
    filters.search = "";
    setPage("marketplace");
    return;
  }
  if (target.matches("[data-wishlist]")) {
    event.stopPropagation();
    toggleWishlist(target.dataset.wishlist);
    return;
  }
  if (target.matches("[data-open-product]")) { openProduct(target.dataset.openProduct); return; }
  if (target.matches("[data-enquire]")) { openEnquiry(target.dataset.enquire); return; }
  if (target.matches("[data-close-modal]")) { closeModal(); return; }
  if (target.matches(".modal-root")) { closeModal(); return; }
  if (target.matches("[data-thumb]")) {
    currentDetailImage = Number(target.dataset.thumb);
    const currentItem = listings.find(listing => listing.id === currentDetailId);
    if (currentItem) renderProductModal(currentItem);
    return;
  }
  if (target.matches("#detail-main-image")) {
    const currentItem = listings.find(listing => listing.id === currentDetailId);
    if (currentItem) showImageViewer(currentItem, currentDetailImage);
    return;
  }
  if (target.matches("[data-remove-photo]")) {
    draftPhotos.splice(Number(target.dataset.removePhoto), 1);
    renderPhotoPreviews();
    return;
  }
  if (target.matches("[data-view]")) {
    gridView = target.dataset.view;
    renderMarketplace();
    return;
  }
  if (target.matches("#clear-filters")) {
    filters = { category: "", condition: "", min: "", max: "", search: "", sort: "newest" };
    renderMarketplace();
    return;
  }
  if (target.matches("#search-clear")) {
    filters.search = "";
    renderMarketplace();
    $("#market-search").focus();
    return;
  }
  if (target.matches("[data-edit]")) {
    editingId = target.dataset.edit;
    setPage("create");
    return;
  }
  if (target.matches("[data-toggle-sold]")) {
    const id = target.dataset.toggleSold;
    const updated = listings.map(item => item.id === id ? { ...item, status: item.status === "Sold" ? "Available" : "Sold" } : item);
    if (save(STORAGE.listings, updated)) { listings = updated; renderPage(); toast("Listing availability updated."); }
    return;
  }
  if (target.matches("[data-delete]")) {
    const id = target.dataset.delete;
    if (window.confirm("Delete this listing? This cannot be undone.")) {
      const updated = listings.filter(item => item.id !== id);
      if (save(STORAGE.listings, updated)) { listings = updated; wishlist = wishlist.filter(saved => saved !== id); save(STORAGE.wishlist, wishlist); syncProfile(); renderPage(); toast("Listing deleted."); }
    }
    return;
  }
  if (target.matches("#mobile-menu")) {
    $("#sidebar").classList.add("open");
    $("#mobile-backdrop").classList.add("show");
    return;
  }
  if (target.matches("#mobile-backdrop")) {
    $("#sidebar").classList.remove("open");
    $("#mobile-backdrop").classList.remove("show");
    return;
  }
  if (target.matches("#theme-toggle") || target.matches("#theme-switch")) { toggleTheme(); return; }
  if (target.matches("#profile-shortcut") || target.matches("#top-avatar") || target.matches("#edit-profile")) { openProfileForm(); return; }
  if (target.matches("[data-auth-action='login']")) { openLoginForm(); return; }
  if (target.matches("[data-auth-action='register']")) { openProfileForm(); return; }
  if (target.matches("#notification-button")) { setPage("enquiries"); return; }
  if (target.matches("#reset-demo")) {
    if (window.confirm("Reset local listings, wishlist, enquiries, and recent views to the original sample data? Your profile and theme will stay.")) {
      listings = sampleListings;
      wishlist = [];
      enquiries = [];
      recently = [];
      save(STORAGE.listings, listings); save(STORAGE.wishlist, wishlist); save(STORAGE.enquiries, enquiries); save(STORAGE.recently, recently);
      syncProfile(); renderPage(); toast("Demo data restored.");
    }
  }
});

document.addEventListener("submit", event => {
  if (event.target.matches("#listing-form")) {
    event.preventDefault();
    submitListing(event.target);
  } else if (event.target.matches("#profile-form")) {
    event.preventDefault();
    handleProfileSubmit(event.target);
  } else if (event.target.matches("#login-form")) {
    event.preventDefault();
    handleLoginSubmit(event.target);
  } else if (event.target.matches("#enquiry-form")) {
    event.preventDefault();
    const id = event.target.dataset.listingId;
    const item = listings.find(listing => listing.id === id);
    const message = String(new FormData(event.target).get("message")).trim();
    if (!item || item.status === "Sold") { toast("This listing is no longer available.", "error"); closeModal(); return; }
    const enquiry = { id: `enquiry-${Date.now()}`, listingId: id, buyerId: profile.id || "current-user", sellerId: item.sellerId, buyer: profile.name || "Thapar student", seller: item.seller, message, status: "Sent", createdAt: new Date().toISOString() };
    const next = [...enquiries, enquiry];
    if (save(STORAGE.enquiries, next)) { enquiries = next; closeModal(); toast("Enquiry sent. The seller can follow up on campus."); renderPage(); }
  }
});

document.addEventListener("change", async event => {
  if (event.target.matches("#filter-category")) filters.category = event.target.value;
  else if (event.target.matches("#filter-condition")) filters.condition = event.target.value;
  else if (event.target.matches("#filter-min")) filters.min = event.target.value;
  else if (event.target.matches("#filter-max")) filters.max = event.target.value;
  else if (event.target.matches("#sort-listing")) filters.sort = event.target.value;
  else if (event.target.matches("#item-photos")) {
    await processPhotos(event.target.files);
    event.target.value = "";
    return;
  } else return;
  renderMarketplace();
});

document.addEventListener("input", event => {
  if (event.target.matches("#global-search")) {
    filters.search = event.target.value;
    if (page !== "marketplace") setPage("marketplace");
    const marketSearch = $("#market-search");
    if (marketSearch) marketSearch.value = filters.search;
    const grid = $("#market-grid");
    if (grid) {
      const results = filteredListings();
      grid.innerHTML = cards(results, "No matching finds", "Try changing your search or clearing a filter.");
      const count = $(".result-count");
      if (count) count.textContent = `${results.length} finds`;
    }
  } else if (event.target.matches("#market-search")) {
    filters.search = event.target.value;
    const suggestions = $("#suggestions");
    const term = filters.search.trim().toLowerCase();
    if (suggestions) {
      const matches = term ? availableListings().filter(item => `${item.title} ${item.category}`.toLowerCase().includes(term)).slice(0, 4) : [];
      suggestions.innerHTML = matches.map(item => `<button class="suggestion" data-open-product="${escapeHTML(item.id)}">${escapeHTML(item.title)} <span class="muted">· ${escapeHTML(item.category)}</span></button>`).join("");
      suggestions.classList.toggle("open", matches.length > 0);
    }
    const grid = $("#market-grid");
    if (grid) {
      const results = filteredListings();
      grid.innerHTML = cards(results, "No matching finds", "Try changing your search or clearing a filter.");
      const count = $(".result-count");
      if (count) count.textContent = `${results.length} finds`;
    }
  }
});

document.addEventListener("click", event => {
  if (event.target.matches("#global-search") && page !== "marketplace") {
    filters.search = event.target.value;
    setPage("marketplace");
    const marketSearch = $("#market-search");
    marketSearch.value = filters.search;
    marketSearch.focus();
  }
  if (!event.target.closest(".search-wrap")) $("#suggestions")?.classList.remove("open");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (page !== "marketplace") setPage("marketplace");
    $("#market-search")?.focus();
  }
});

function toggleTheme() {
  const dark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  save(STORAGE.theme, dark ? "dark" : "light");
  renderPage();
}

function init() {
  const theme = getStored(STORAGE.theme, "light");
  document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
  syncProfile();
  renderDashboard();
  document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    setPage(link.dataset.page);
  }));
}

init();
