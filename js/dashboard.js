let currentUser = null, affiliateData = null, currentPage = 'overview';
const LOGO_URL = 'https://assets.wuiltstore.com/cmksv9bcw0ki601gn64lf4joy_Gemini_Generated_Image_8x0fug8x0fug8x0f.webp';

const PRODUCTS = [
  {id:'f16-500',name:'اف 16 للصراصير 500مل',price:60,commission:3,img:'https://assets.wuiltstore.com/cmdiu58cl1tl501ks9ehv955z_1750433241132832061.png',sku:'F16-500ML',category:'صراصير',url:'https://milanof16.com/ar/product/all/f16-500ml'},
  {id:'f16-400',name:'اف 16 للصراصير 400مل',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmd7u4z8219le01g5d3noe3f0_1750434193411593051.png',sku:'F16-400ML',category:'صراصير',url:'https://milanof16.com/ar/product/all/f16-400ml'},
  {id:'f16-650',name:'اف 16 جامبو للصراصير 650مل',price:70,commission:3.5,img:'https://assets.wuiltstore.com/cmd7u5z0v1ac701ksgbt298xa_1750432766294011606.png',sku:'F16-650ML',category:'صراصير',url:'https://milanof16.com/ar/product/all/f16-650ml'},
  {id:'f22-500',name:'اف 22 للنمل 500مل',price:60,commission:3,img:'https://assets.wuiltstore.com/cmd7u4uf619l601g5cufc88nk_1750433228528482556.png',sku:'F22-500ML',category:'نمل',url:'https://milanof16.com/ar/product/all/f22-500ml'},
  {id:'f22-400',name:'اف 22 للنمل 400مل',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmd7u4v5019l701g5cnbm9rlr_1750434208208242738.png',sku:'F22-400ML',category:'نمل',url:'https://milanof16.com/ar/product/all/f22-400ml'},
  {id:'f22-650',name:'اف 22 جامبو للنمل 650مل',price:70,commission:3.5,img:'https://assets.wuiltstore.com/cmd7u4yly19ld01g57jpf00ev_1750433166133488427.png',sku:'F22-650ML',category:'نمل',url:'https://milanof16.com/ar/product/all/f22-650ml'},
  {id:'f35-650',name:'مبيد اف 35 للبق',price:70,commission:3.5,img:'https://assets.wuiltstore.com/cmd7u4vuk19l801g5c6103zlq_1750433213166894989.png',sku:'F35-650ML',category:'بق',url:'https://milanof16.com/ar/product/all/f35-650ml'},
  {id:'ringo',name:'رينجو للذباب',price:60,commission:3,img:'https://assets.wuiltstore.com/cmd7u4tpy19l501g5fqpbbe6w_1750433182306448668.png',sku:'RINGO',category:'ذباب',url:'https://milanof16.com/ar/product/all/ringo'},
  {id:'super777',name:'سوبر 777 لحشرات المواشي',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmd7u4xzw19lc01g5648d25e0_1750433199283459882.png',sku:'SUPER777',category:'مواشي',url:'https://milanof16.com/ar/product/all/super777'},
  {id:'gsuper777',name:'سوبر 777 حشرات المواشي 1 لتر',price:100,commission:5,img:'https://assets.wuiltstore.com/cmqf9has002wk01jn3r8x2g3a_41cOrJRr_eL._AC_.webp',sku:'GSUPER777',category:'مواشي',url:'https://milanof16.com/ar/product/all/gsuper777'},
  {id:'rocket-mosquito',name:'الصاروخ ناموس',price:60,commission:3,img:'https://assets.wuiltstore.com/cmitdyi7d031q01kqaq93e5t8_WhatsApp_Image_2025-12-05_at_23.33.20_186c2329.jpg',sku:'ROCKET-MOS',category:'ناموس',url:'https://milanof16.com/ar/product/all/الصاروخ ناموس'},
  {id:'rocket-roach',name:'الصاروخ صراصير',price:60,commission:3,img:'https://assets.wuiltstore.com/cmg84mc0c15kp01hn1f3t2iyh__D9_82_D8_B7_D8_B9_D9_87.jpg',sku:'ROCKET-ROACH',category:'صراصير',url:'https://milanof16.com/ar/product/all/الصاروخ صراصير'},
  {id:'rocket-ant',name:'الصاروخ نمل',price:60,commission:3,img:'https://assets.wuiltstore.com/cmerex8wa4fih01ks3rj791aa__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__3_.jpg',sku:'ROCKET-ANT',category:'نمل',url:'https://milanof16.com/ar/product/all/الصاروخ نمل'},
  {id:'rocket-bugs',name:'الصاروخ بق',price:60,commission:3,img:'https://assets.wuiltstore.com/cmerhpqh64fpz01ksclji35r9__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__4_.jpg',sku:'ROCKET-BUG',category:'بق',url:'https://milanof16.com/ar/product/all/الصاروخ بق'},
  {id:'lion-roach',name:'اسد صراصير',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmkn1ziyo07bf01gn0z6r4q9e__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__6_.webp',sku:'LION-ROACH',category:'صراصير',url:'https://milanof16.com/ar/product/all/اسد للصراصير'},
  {id:'lion-ant',name:'مبيد اسد للنمل',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmkn1ylzv07b801gn8r0d7svf__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__5_.webp',sku:'LION-ANT',category:'نمل',url:'https://milanof16.com/ar/product/all/lion'},
  {id:'giGi',name:'جيجي اسبونج',price:20,commission:1,img:'https://assets.wuiltstore.com/cmevy2pce4pi101ksg08reses__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__6_.jpg',sku:'GIGI',category:'تنظيف',url:'https://milanof16.com/ar/product/all/جيجي-اسبونج'}
];

const TIERS = [
  {name:'برونزي',emoji:'🥉',min:0,color:'#cd7f32',commission:10},
  {name:'فضي',emoji:'🥈',min:10,color:'#c0c0c0',commission:15},
  {name:'ذهبي',emoji:'🥇',min:25,color:'#ffd700',commission:20},
  {name:'بلاتين',emoji:'💠',min:50,color:'#e5e4e2',commission:25},
  {name:'الماس',emoji:'💎',min:100,color:'#b9f2ff',commission:30},
  {name:'سماوي',emoji:'🌟',min:200,color:'#00ced1',commission:35}
];

const BADGES = [
  {id:'first-sale',name:'أول بيع',desc:'حقق أول عملية بيع',icon:'🎯',requirement:1,field:'referralsCount'},
  {id:'ten-sales',name:'10 مبيعات',desc:'حقق 10 مبيعات',icon:'🔟',requirement:10,field:'referralsCount'},
  {id:'fifty-sales',name:'50 مبيعات',desc:'حقق 50 مبيعات',icon:'🔥',requirement:50,field:'referralsCount'},
  {id:'hundred-sales',name:'100 مبيعات',desc:'حقق 100 مبيعات',icon:'💯',requirement:100,field:'referralsCount'},
  {id:'first-earning',name:'أول أرباح',desc:'حقق أول أرباح',icon:'💵',requirement:1,field:'totalEarnings'},
  {id:'thousand',name:'1000 جنيه',desc:'حقق 1000 جنيه أرباح',icon:'💰',requirement:1000,field:'totalEarnings'},
  {id:'five-thousand',name:'5000 جنيه',desc:'حقق 5000 جنيه أرباح',icon:'🏆',requirement:5000,field:'totalEarnings'},
  {id:'top-seller',name:'أفضل بائع',desc:'ادخل أول 3 في الترتيب',icon:'👑',requirement:3,field:'rank'},
  {id:'share-master',name:'سيد المشاركة',desc:'شارك 50 رابط',icon:'📣',requirement:50,field:'sharesCount'},
  {id:'social-star',name:'نجم السوشيال',desc:'شارك على 3 منصات مختلفة',icon:'⭐',requirement:3,field:'platformsCount'}
];

let unsubscribers = [];

function setupRealtimeListeners() {
  unsubscribers.forEach(u => { try{u()}catch(e){} });
  unsubscribers = [];

  const affUnsub = db.collection('affiliates').doc(currentUser.uid).onSnapshot(doc => {
    if (doc.exists) { affiliateData = doc.data(); updateUserUI(); }
  }, e => console.error(e));
  unsubscribers.push(affUnsub);

  const notifUnsub = db.collection('notifications').where('affiliateId','==',currentUser.uid).onSnapshot(snap => {
    let unread = 0;
    snap.forEach(d => { if (!d.data().read) unread++; });
    const badge = document.getElementById('notif-badge');
    const topBadge = document.getElementById('topbar-notif-badge');
    if (badge) { badge.textContent = unread || ''; badge.style.display = unread ? 'flex' : 'none'; }
    if (topBadge) { topBadge.textContent = unread || ''; topBadge.style.display = unread ? 'inline' : 'none'; }
  }, e => console.error(e));
  unsubscribers.push(notifUnsub);
}

auth.onAuthStateChanged(async (user) => {
  if (!user) { window.location.href = 'auth.html'; return; }
  currentUser = user;
  await loadAffiliateData();
  setupRealtimeListeners();
  loadPage('overview');
  registerServiceWorker();
  setupNavigation();
});

async function loadAffiliateData() {
  try {
    const doc = await db.collection('affiliates').doc(currentUser.uid).get();
    if (doc.exists) {
      affiliateData = doc.data();
      const updates = {};
      if (!affiliateData.hasOwnProperty('governorate')) updates.governorate = '';
      if (!affiliateData.hasOwnProperty('address')) updates.address = '';
      if (!affiliateData.hasOwnProperty('birthday')) updates.birthday = '';
      if (!affiliateData.hasOwnProperty('gender')) updates.gender = '';
      if (!affiliateData.hasOwnProperty('facebook')) updates.facebook = '';
      if (!affiliateData.hasOwnProperty('instagram')) updates.instagram = '';
      if (!affiliateData.hasOwnProperty('tiktok')) updates.tiktok = '';
      if (!affiliateData.hasOwnProperty('emailNotifications')) updates.emailNotifications = true;
      if (Object.keys(updates).length > 0) {
        await db.collection('affiliates').doc(currentUser.uid).update(updates);
        Object.assign(affiliateData, updates);
      }
    } else {
      const refCode = (currentUser.displayName || 'user').replace(/\s+/g,'').toLowerCase() + Math.floor(Math.random()*10000);
      const data = {
        name: currentUser.displayName || 'مستخدم',
        phone: '',
        email: currentUser.email,
        referralCode: refCode,
        referralsCount: 0,
        totalEarnings: 0,
        pendingPayout: 0,
        paidPayout: 0,
        totalClicks: 0,
        sharesCount: 0,
        platformsCount: 0,
        governorate: '',
        address: '',
        birthday: '',
        gender: '',
        facebook: '',
        instagram: '',
        tiktok: '',
        emailNotifications: true,
        status: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await db.collection('affiliates').doc(currentUser.uid).set(data);
      affiliateData = data;
    }
    updateUserUI();
  } catch(e) { console.error(e); }
}

function updateUserUI() {
  if (!affiliateData) return;
  const nameEl = document.getElementById('user-name');
  const avatarEl = document.getElementById('user-avatar');
  const tierEl = document.getElementById('user-tier');
  if (nameEl) nameEl.textContent = affiliateData.name;
  if (avatarEl) avatarEl.textContent = affiliateData.name.charAt(0);
  const tier = getCurrentTier();
  if (tierEl) tierEl.innerHTML = `${tier.emoji} ${tier.name}`;
}

function getCurrentTier() {
  const count = affiliateData?.referralsCount || 0;
  let tier = TIERS[0];
  for (const t of TIERS) { if (count >= t.min) tier = t; }
  return tier;
}

function getShareLink() {
  return `https://affiliate.milanof16.com/go/${affiliateData?.referralCode}`;
}

function getProductShareLink(productUrl) {
  const code = btoa(productUrl).replace(/=/g,'').substring(0,10);
  return `https://affiliate.milanof16.com/go/${affiliateData?.referralCode}/${code}`;
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  showToast('تم النسخ ✅');
}

// ===== NAVIGATION =====
function setupNavigation() {
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      if (page) {
        loadPage(page);
        closeSidebar();
      }
    });
  });

  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (page) loadPage(page);
    });
  });

  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) overlay.addEventListener('click', closeSidebar);

  const logout = document.getElementById('sidebar-logout');
  if (logout) logout.addEventListener('click', (e) => { e.preventDefault(); handleLogout(); });
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

function updateBottomNav(page) {
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
}

function updateActiveNav(page) {
  document.querySelectorAll('.sidebar-nav a').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  updateBottomNav(page);
}

// ===== PAGE LOADER =====
function loadPage(page) {
  currentPage = page;
  const content = document.getElementById('page-content');
  content.classList.remove('page-enter');
  void content.offsetWidth;
  content.classList.add('page-enter');
  updateActiveNav(page);

  const loaders = {
    overview: loadOverview,
    products: loadProducts,
    leaderboard: loadLeaderboard,
    payouts: loadPayouts,
    referrals: loadReferrals,
    coupons: loadCoupons,
    marketing: loadMarketing,
    badges: loadBadges,
    videos: loadVideos,
    chat: loadChat,
    notifications: loadNotifications,
    settings: loadSettings
  };
  if (loaders[page]) loaders[page](content);
}

async function loadChartData() {
  const area = document.getElementById('chart-area');
  const labels = document.getElementById('chart-labels');
  if (!area) return;
  try {
    const today = new Date();
    const weekAgo = new Date(today); weekAgo.setDate(weekAgo.getDate() - 7);
    const snap = await db.collection('clicks')
      .where('affiliateId','==',currentUser.uid)
      .get();
    const dailyCounts = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today); d.setDate(d.getDate()-i);
      const key = d.toLocaleDateString('ar-EG',{weekday:'short'});
      dailyCounts[key] = 0;
    }
    snap.forEach(doc => {
      const cd = doc.data().createdAt?.toDate();
      if (cd && cd >= weekAgo) {
        const key = cd.toLocaleDateString('ar-EG',{weekday:'short'});
        if (dailyCounts.hasOwnProperty(key)) dailyCounts[key]++;
      }
    });
    const data = Object.entries(dailyCounts).map(([label, value]) => ({label, value}));
    const max = Math.max(...data.map(d=>d.value), 1);
    area.innerHTML = data.map(d => {
      const height = Math.max((d.value/max)*100, 4);
      return `<div class="chart-bar-wrap"><div class="chart-bar" style="height:${height}%;background:${d.value>0?'linear-gradient(180deg,#4f46e5,#818cf8)':'var(--border)'}"><div class="bar-tooltip">${d.value} نقرة</div></div></div>`;
    }).join('');
    labels.innerHTML = data.map(d => `<span>${d.label}</span>`).join('');
  } catch(e) {
    area.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-secondary);width:100%">لا توجد بيانات كافية</div>';
  }
}

function renderTierProgress() {
  const el = document.getElementById('tier-progress');
  if (!el) return;
  const count = affiliateData?.referralsCount || 0;
  let nextTier = null;
  for (const t of TIERS) { if (count < t.min) { nextTier = t; break; } }

  if (!nextTier) {
    el.innerHTML = `
      <div class="tier-complete">
        <div class="tier-complete-icon">💎</div>
        <h3>وصلت أعلى مستوى!</h3>
        <p>مبروك! أنت في مستوى الماس</p>
      </div>`;
    return;
  }

  const prevMin = TIERS[TIERS.indexOf(nextTier)-1]?.min || 0;
  const progress = ((count - prevMin) / (nextTier.min - prevMin)) * 100;

  el.innerHTML = `
    <div class="tier-progress-info">
      <div class="tier-current">${getCurrentTier().emoji} ${getCurrentTier().name}</div>
      <div class="tier-arrow">→</div>
      <div class="tier-next">${nextTier.emoji} ${nextTier.name}</div>
    </div>
    <div class="progress-bar" style="height:8px">
      <div class="progress-bar-fill" style="width:${Math.min(progress,100)}%"></div>
    </div>
    <div class="tier-progress-stats">
      <span>${count} إحالة</span>
      <span>${nextTier.min - count} متبقي</span>
    </div>`;
}

async function loadRecentReferrals() {
  const container = document.getElementById('recent-referrals');
  if (!container) return;
  try {
    const snap = await db.collection('conversions').where('affiliateId','==',currentUser.uid).get();
    if (snap.empty) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><p>لا توجد إحالات بعد</p><button class="btn btn-primary btn-sm" onclick="loadPage('products')">شارك رابطك الآن</button></div>`;
      return;
    }
    const items = [];
    snap.forEach(doc => items.push({id:doc.id,...doc.data()}));
    items.sort((a,b) => (b.createdAt?.toMillis?.()||0) - (a.createdAt?.toMillis?.()||0));
    const top5 = items.slice(0,5);
    let html = '<div class="referral-list">';
    top5.forEach(d => {
      const date = d.createdAt?.toDate()?.toLocaleDateString('ar-EG') || '-';
      const statusClass = d.status === 'approved' ? 'approved' : d.status === 'paid' ? 'paid' : 'pending';
      const statusText = d.status === 'approved' ? 'مقبول' : d.status === 'paid' ? 'مدفوع' : 'قيد المراجعة';
      html += `
        <div class="referral-item">
          <div class="referral-info">
            <div class="referral-customer">${d.customerName || 'عميل'}</div>
            <div class="referral-date">${date}</div>
          </div>
          <div class="referral-status">
            <span class="status-badge ${statusClass}">${statusText}</span>
            <div class="referral-amount">${d.commission || 0} ج.م</div>
          </div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  } catch(e) { container.innerHTML = '<div class="empty-state"><p>خطأ في التحميل</p></div>'; }
}

// ===== PRODUCTS =====
function loadProducts(c) {
  const categories = [...new Set(PRODUCTS.map(p => p.category))];
  c.innerHTML = `
    <div class="page-header">
      <h1>📦 المنتجات</h1>
      <p class="subtitle">شارك رابط المنتج واحصل على 20 ج.م لكل 1000 زائر</p>
    </div>

    <div class="filter-bar">
      <button class="filter-chip active" onclick="filterProducts('all', this)">الكل</button>
      ${categories.map(cat => `<button class="filter-chip" onclick="filterProducts('${cat}', this)">${cat}</button>`).join('')}
    </div>

    <div class="products-grid" id="products-grid">
      ${renderProducts(PRODUCTS)}
    </div>`;
}

function renderProducts(products) {
  return products.map(p => {
    const shareLink = getProductShareLink(p.url);
    return `
      <div class="product-card" data-category="${p.category}">
        <div class="product-img-wrap">
          <img src="${p.img}" alt="${p.name}" loading="lazy"
               onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\\'product-img-fallback\\'>📦</div>'">
          <div class="product-category-tag">${p.category}</div>
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <div class="product-meta">
            <span class="product-sku">SKU: ${p.sku}</span>
            <span class="product-price">${p.price} ج.م</span>
          </div>
          <div class="product-commission-badge">20 ج.م / 1000 زائر</div>
          <div class="product-actions">
            <button class="btn btn-primary btn-block" onclick="copyProductLink('${shareLink}','${p.name}')">
              <i class="fi fi-rr-link"></i> نسخ رابط الربح
            </button>
            <a href="${p.url}" target="_blank" class="btn btn-ghost btn-block">عرض المنتج</a>
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterProducts(category, btn) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('products-grid');
  if (category === 'all') {
    grid.innerHTML = renderProducts(PRODUCTS);
  } else {
    grid.innerHTML = renderProducts(PRODUCTS.filter(p => p.category === category));
  }
}

function copyProductLink(link, name) {
  copyToClipboard(link);
  showToast(`تم نسخ رابط ${name} ✅`);
}

// ===== LEADERBOARD =====
async function loadLeaderboard(c) {
  c.innerHTML = `
    <div class="page-header">
      <h1>🏆 الترتيب</h1>
      <div class="live-dot"></div>
    </div>
    <div class="leaderboard-podium" id="leaderboard-podium"></div>
    <div class="leaderboard-list" id="leaderboard-list">
      <div class="loading-state"><div class="spinner spinner-dark"></div></div>
    </div>`;

  try {
    const snap = await db.collection('affiliates').orderBy('totalEarnings','desc').limit(20).get();
    const podium = document.getElementById('leaderboard-podium');
    const list = document.getElementById('leaderboard-list');
    const affiliates = [];
    snap.forEach(doc => affiliates.push({id: doc.id, ...doc.data()}));

    if (affiliates.length === 0) {
      podium.innerHTML = '';
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">🏆</div><p>لا يوجد شركاء بعد</p></div>';
      return;
    }

    const top3 = affiliates.slice(0, 3);
    const rest = affiliates.slice(3);

    podium.innerHTML = top3.map((a, i) => {
      const medals = ['🥇','🥈','🥉'];
      const tier = (() => { let t = TIERS[0]; for(const tt of TIERS){if(a.referralsCount>=tt.min)t=tt;} return t; })();
      return `
        <div class="podium-item rank-${i+1}">
          <div class="podium-avatar">${a.name.charAt(0)}</div>
          <div class="podium-medal">${medals[i]}</div>
          <div class="podium-name">${a.name}</div>
          <div class="podium-earnings">${a.totalEarnings || 0} ج.م</div>
          <div class="podium-tier">${tier.emoji} ${tier.name}</div>
        </div>`;
    }).join('');

    list.innerHTML = rest.map((a, i) => {
      const tier = (() => { let t = TIERS[0]; for(const tt of TIERS){if(a.referralsCount>=tt.min)t=tt;} return t; })();
      return `
        <div class="leaderboard-item">
          <div class="leaderboard-rank">${i + 4}</div>
          <div class="leaderboard-avatar">${a.name.charAt(0)}</div>
          <div class="leaderboard-info">
            <div class="leaderboard-name">${a.name}</div>
            <div class="leaderboard-tier">${tier.emoji} ${tier.name} • ${a.referralsCount || 0} إحالة</div>
          </div>
          <div class="leaderboard-earnings">${a.totalEarnings || 0} ج.م</div>
        </div>`;
    }).join('');
  } catch(e) { console.error(e); }
}

// ===== PAYOUTS =====
async function loadPayouts(c) {
  const totalEarnings = Math.floor((affiliateData?.totalClicks || 0) / 1000) * 20;
  c.innerHTML = `
    <div class="page-header">
      <h1>💰 المدفوعات</h1>
    </div>

    <div class="payout-cards">
      <div class="payout-card total">
        <div class="payout-card-icon">💰</div>
        <div class="payout-card-amount">${totalEarnings}</div>
        <div class="payout-card-label">إجمالي الأرباح (ج.م)</div>
      </div>
      <div class="payout-card pending">
        <div class="payout-card-icon">⏳</div>
        <div class="payout-card-amount">${affiliateData?.pendingPayout || 0}</div>
        <div class="payout-card-label">أرباح معلقة (ج.م)</div>
      </div>
      <div class="payout-card paid">
        <div class="payout-card-icon">✅</div>
        <div class="payout-card-amount">${affiliateData?.paidPayout || 0}</div>
        <div class="payout-card-label">تم دفعها (ج.م)</div>
      </div>
    </div>

    <button class="btn btn-primary btn-block btn-lg" onclick="requestPayout()">
      💸 طلب سحب أرباح
    </button>

    <div class="payout-info">
      <div class="info-item"><span class="info-icon">ℹ️</span><span>الحد الأدنى للسحب: 50 ج.م</span></div>
      <div class="info-item"><span class="info-icon">📱</span><span>طريقة الدفع: فودافون كاش</span></div>
      <div class="info-item"><span class="info-icon">⏱️</span><span>وقت المعالجة: 24-48 ساعة</span></div>
    </div>

    <div class="table-container">
      <div class="table-header">
        <h2>📋 سجل المدفوعات</h2>
        <div class="live-dot"></div>
      </div>
      <div id="payouts-table"></div>
    </div>`;

  loadPayoutsHistory();
}

async function loadPayoutsHistory() {
  const container = document.getElementById('payouts-table');
  if (!container) return;
  try {
    const snap = await db.collection('payouts').where('affiliateId','==',currentUser.uid).get();
    if (snap.empty) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">💸</div><p>لا توجد مدفوعات بعد</p></div>';
      return;
    }
    const items = [];
    snap.forEach(doc => items.push({id:doc.id,...doc.data()}));
    items.sort((a,b) => (b.createdAt?.toMillis?.()||0) - (a.createdAt?.toMillis?.()||0));
    let html = '<div class="payout-list">';
    items.forEach(d => {
      const date = d.createdAt?.toDate()?.toLocaleDateString('ar-EG') || '-';
      const statusClass = d.status === 'paid' ? 'paid' : 'pending';
      const statusText = d.status === 'paid' ? 'تم الدفع' : 'قيد المعالجة';
      html += `
        <div class="payout-item">
          <div class="payout-item-info">
            <div class="payout-item-amount">${d.amount} ج.م</div>
            <div class="payout-item-date">${date}</div>
          </div>
          <div class="payout-item-status">
            <span class="status-badge ${statusClass}">${statusText}</span>
            <div class="payout-item-method">${d.method || 'فودافون كاش'}</div>
          </div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  } catch(e) { container.innerHTML = '<div class="empty-state"><p>خطأ في التحميل</p></div>'; }
}

// ===== REFERRALS =====
async function loadReferrals(c) {
  c.innerHTML = `
    <div class="page-header"><h1>👥 الإحالات</h1></div>

    <div class="referral-box">
      <div class="referral-header">
        <span>🔗 رابط الإحالة</span>
        <span class="copy-hint">اضغط للنسخ</span>
      </div>
      <div class="referral-link-row">
        <input type="text" readonly value="${getShareLink()}" onclick="copyToClipboard(this.value); this.select();">
        <button class="btn btn-primary btn-sm" onclick="copyToClipboard('${getShareLink()}')">نسخ</button>
      </div>
    </div>

    <div class="referral-stats">
      <div class="ref-stat">
        <div class="ref-stat-value">${affiliateData?.referralsCount || 0}</div>
        <div class="ref-stat-label">إجمالي الإحالات</div>
      </div>
      <div class="ref-stat">
        <div class="ref-stat-value">${affiliateData?.totalClicks || 0}</div>
        <div class="ref-stat-label">إجمالي الزوار</div>
      </div>
    </div>

    <div class="table-container">
      <div class="table-header">
        <h2>📋 كل الإحالات</h2>
        <div class="live-dot"></div>
      </div>
      <div id="all-referrals">
        <div class="loading-state"><div class="spinner spinner-dark"></div></div>
      </div>
    </div>`;

  loadAllReferrals();
}

async function loadAllReferrals() {
  const container = document.getElementById('all-referrals');
  if (!container) return;
  try {
    const snap = await db.collection('conversions').where('affiliateId','==',currentUser.uid).get();
    if (snap.empty) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon">👥</div><p>لا توجد إحالات بعد</p><button class="btn btn-primary btn-sm" onclick="loadPage(\'products\')">شارك رابطك الآن</button></div>';
      return;
    }
    const items = [];
    snap.forEach(doc => items.push({id:doc.id,...doc.data()}));
    items.sort((a,b) => (b.createdAt?.toMillis?.()||0) - (a.createdAt?.toMillis?.()||0));
    let html = '<div class="referral-list">';
    let i = 1;
    items.forEach(d => {
      const date = d.createdAt?.toDate()?.toLocaleDateString('ar-EG') || '-';
      const statusClass = d.status === 'approved' ? 'approved' : d.status === 'paid' ? 'paid' : d.status === 'rejected' ? 'rejected' : 'pending';
      const statusText = d.status === 'approved' ? 'مقبول' : d.status === 'paid' ? 'مدفوع' : d.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة';
      html += `
        <div class="referral-item">
          <div class="referral-number">#${i++}</div>
          <div class="referral-info">
            <div class="referral-customer">${d.customerName || 'عميل'}</div>
            <div class="referral-date">${date}</div>
          </div>
          <div class="referral-status">
            <span class="status-badge ${statusClass}">${statusText}</span>
            <div class="referral-amount">${d.commission || 0} ج.م</div>
          </div>
        </div>`;
    });
    html += '</div>';
    container.innerHTML = html;
  } catch(e) { container.innerHTML = '<div class="empty-state"><p>خطأ</p></div>'; }
}

// ===== COUPONS =====
function loadCoupons(c) {
  const code = (affiliateData?.referralCode || 'USER').toUpperCase();
  c.innerHTML = `
    <div class="page-header"><h1>🎟️ كوبوناتي</h1></div>

    <div class="coupon-card">
      <div class="coupon-header">كوبون خصم خاص</div>
      <div class="coupon-code" onclick="copyToClipboard('${code}')">${code}</div>
      <div class="coupon-discount">خصم <strong>5%</strong> على كل المنتجات</div>
      <p class="coupon-hint">شارك الكوبون مع أصحابك واكسب عمولة إضافية!</p>
    </div>

    <div class="alert alert-info">
      <span class="alert-icon">💡</span>
      <span>الكوبون بتاعك بيخلي العميل ياخد خصم 5% وأنت بتاخد عمولتك العادية!</span>
    </div>

    <div class="coupon-usage">
      <h3>📊 طريقة الاستخدام</h3>
      <div class="usage-steps">
        <div class="usage-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>شارك الكوبون</h4>
            <p>ابعت الكوبون لصحابك على واتساب أو السوشيال ميديا</p>
          </div>
        </div>
        <div class="usage-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>العميل يستخدمه</h4>
            <p>العميل يدخل الكوبون في صفحة الدفع وياخد خصم 5%</p>
          </div>
        </div>
        <div class="usage-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>أنت بتاخد عمولتك</h4>
            <p>أنت بتاخد 20 ج.م لكل 1000 زائر من رابط الإحالة</p>
          </div>
        </div>
      </div>
    </div>`;
}

// ===== MARKETING =====
function loadMarketing(c) {
  const link = getShareLink();
  const messages = [
    {title:'رسالة واتساب',icon:'💬',text:`🔥 ميلانو F16 - الحل الأقوى للقضاء على الحشرات!\n\n✅ شحن مجاني فوق 3000 جنيه\n✅ منتجات أصلية مضمونة\n✅ أسعار تبدأ من 20 جنيه\n\n📦 اطلب دلوقتي:\n${link}`},
    {title:'منشور فيسبوك',icon:'📘',text:`🛡️ ميلانو F16 - مش هتلاقي منتج أقوى من كده للقضاء على الصراصير والبق والنمل!\n\n📦 شحن مجاني\n💰 أسعار تبدأ من 20 جنيه\n🔒 منتجات أصلية\n\n🛒 اطلب من هنا:\n${link}`},
    {title:'رسالة تيليجرام',icon:'✈️',text:`🪳 عايز تخلص من الحشرات نهائياً؟\n\nميلانو F16 - المبيد الأقوى في مصر!\n\n📦 شحن مجاني | 💰 أسعار من 20 ج.م\n\n🔗 ${link}`}
  ];

  c.innerHTML = `
    <div class="page-header"><h1>📣 مواد تسويقية</h1></div>
    <p class="section-desc">استخدم الرسائل دي في مشاركة المنتجات. كل رسالة جاهزة للنسخ والمشاركة!</p>

    <div class="marketing-messages">
      ${messages.map(m => `
        <div class="marketing-card">
          <div class="marketing-card-header">
            <span>${m.icon} ${m.title}</span>
            <button class="btn btn-primary btn-sm" onclick="copyToClipboard(decodeURIComponent('${encodeURIComponent(m.text)}'))">📋 نسخ</button>
          </div>
          <div class="marketing-card-body">${m.text}</div>
        </div>`).join('')}
    </div>

    <div class="table-container">
      <div class="table-header"><h2>🔗 روابط مباشرة للمنتجات</h2></div>
      <div class="product-links-list">
        ${PRODUCTS.map(p => `
          <div class="product-link-item">
            <span class="product-link-name">${p.name}</span>
            <button class="btn btn-ghost btn-sm" onclick="copyToClipboard('${getProductShareLink(p.url)}')">نسخ</button>
          </div>`).join('')}
      </div>
    </div>`;
}

// ===== BADGES =====
function loadBadges(c) {
  const count = affiliateData?.referralsCount || 0;
  const earnings = affiliateData?.totalEarnings || 0;

  c.innerHTML = `
    <div class="page-header"><h1>🏅 الشارات والإنجازات</h1></div>

    <div class="badges-summary">
      <div class="badges-count">
        <span class="badges-earned">${BADGES.filter(b => {
          if (b.field==='referralsCount') return count >= b.requirement;
          if (b.field==='totalEarnings') return earnings >= b.requirement;
          return false;
        }).length}</span>
        <span>/ ${BADGES.length} شارة</span>
      </div>
    </div>

    <div class="badges-grid">
      ${BADGES.map(b => {
        let progress = 0;
        if (b.field === 'referralsCount') progress = count;
        else if (b.field === 'totalEarnings') progress = earnings;
        const earned = progress >= b.requirement;
        const pct = Math.min((progress / b.requirement) * 100, 100);
        return `
          <div class="badge-card ${earned ? 'earned' : 'locked'}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-name">${b.name}</div>
            <div class="badge-desc">${b.desc}</div>
            <div class="badge-progress">
              <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
              <p class="badge-progress-text">${earned ? 'تم الإنجاز ✅' : `${progress}/${b.requirement}`}</p>
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

// ===== VIDEOS =====
function loadVideos(c) {
  c.innerHTML = `
    <div class="page-header">
      <div>
        <h1>🎓 أكاديمية ميلانو</h1>
        <p class="subtitle">اتعلم أزاي تبقى مسوّق احترافي وتكسب أكتر</p>
      </div>
    </div>
    <div class="filter-bar" id="video-filters">
      <button class="filter-chip active" onclick="filterVideos('all',this)">الكل</button>
      <button class="filter-chip" onclick="filterVideos('getting-started',this)">🚀 البدء</button>
      <button class="filter-chip" onclick="filterVideos('social',this)">📱 السوشيال ميديا</button>
      <button class="filter-chip" onclick="filterVideos('sales',this)">💰 المبيعات</button>
      <button class="filter-chip" onclick="filterVideos('tips',this)">💡 نصائح</button>
    </div>
    <div class="video-grid" id="video-grid">
      <div class="loading-state"><div class="spinner spinner-dark"></div></div>
    </div>`;
  loadVideosGrid();
}

let allVideos = [];

async function loadVideosGrid() {
  const grid = document.getElementById('video-grid');
  if (!grid) return;
  try {
    const snap = await db.collection('videos').orderBy('createdAt','desc').get();
    allVideos = [];
    if (snap.empty) {
      DEFAULT_VIDEOS.forEach(v => allVideos.push(v));
    } else {
      snap.forEach(doc => allVideos.push({id: doc.id, ...doc.data()}));
    }
    renderVideoCards(allVideos);
  } catch(e) { 
    DEFAULT_VIDEOS.forEach(v => allVideos.push(v));
    renderVideoCards(allVideos);
  }
}

function renderVideoCards(videos) {
  const grid = document.getElementById('video-grid');
  if (!grid) return;
  if (videos.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🎬</div>
        <h3>لا توجد فيديوهات</h3>
        <p>قريباً هننزل محتوى تعليمي احترافي</p>
      </div>`;
    return;
  }
  const categoryLabels = {'getting-started':'🚀 البدء','social':'📱 السوشيال ميديا','sales':'💰 المبيعات','tips':'💡 نصائح'};
  grid.innerHTML = videos.map(v => {
    const embedUrl = convertToEmbedUrl(v.url);
    const cat = v.category || 'tips';
    const badge = categoryLabels[cat] || '💡 نصائح';
    return `
      <div class="video-card" onclick="playVideo('${embedUrl}','${(v.title||'').replace(/'/g,"\\'")}')">
        <div class="video-thumb">
          ${v.thumbnail ? `<img src="${v.thumbnail}" alt="${v.title}" style="width:100%;height:100%;object-fit:cover">` : `<iframe src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>`}
          <div class="video-play-btn">▶</div>
          <div class="video-category-badge">${badge}</div>
        </div>
        <div class="video-info">
          <h3>${v.title}</h3>
          <p>${v.desc || ''}</p>
          <div class="video-meta">
            <span>👁️ ${v.views || 0} مشاهدة</span>
            ${v.duration ? `<span>⏱️ ${v.duration}</span>` : ''}
            ${v.createdAt?.toDate ? `<span>📅 ${v.createdAt.toDate().toLocaleDateString('ar-EG')}</span>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');
}

function filterVideos(category, btn) {
  document.querySelectorAll('#video-filters .filter-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (category === 'all') {
    renderVideoCards(allVideos);
  } else {
    renderVideoCards(allVideos.filter(v => v.category === category));
  }
}

function playVideo(embedUrl, title) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="padding:0;position:relative;background:#000;border-radius:16px;overflow:hidden">
      <button onclick="closeModal()" style="position:absolute;top:12px;left:12px;z-index:10;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,0.6);border:none;color:white;font-size:1.2rem;cursor:pointer">✕</button>
      <div style="padding-top:56.25%;position:relative">
        <iframe src="${embedUrl}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen></iframe>
      </div>
      <div style="padding:1rem;background:white">
        <h3 style="font-size:1rem;font-weight:700">${title}</h3>
      </div>
    </div>`;
  modal.classList.add('active');
  incrementVideoViews(title);
}

async function incrementVideoViews(title) {
  try {
    const snap = await db.collection('videos').where('title','==',title).limit(1).get();
    snap.forEach(async doc => {
      await doc.ref.update({views:(doc.data().views||0)+1});
    });
  } catch(e){}
}

function convertToEmbedUrl(url) {
  if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  if (url.includes('/embed/')) return url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const fbMatch = url.match(/facebook\.com\/.*\/videos\/(\d+)/);
  if (fbMatch) return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
  return url;
}

// ===== CHAT =====
let chatUnsub = null;

function loadChat(c) {
  c.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;width:100%">
        <div>
          <h1>💬 الرسائل</h1>
          <p class="subtitle">تواصل مع فريق الدعم</p>
        </div>
        <div class="chat-status">
          <div class="live-dot"></div>
          <span>متصل</span>
        </div>
      </div>
    </div>
    <div class="chat-container">
      <div class="chat-messages" id="chat-messages">
        <div class="chat-empty">
          <div class="chat-empty-icon">💬</div>
          <h3>ابدأ محادثة</h3>
          <p>ابعت رسالة لأدمن ميلانو وهرد عليك في أقرب وقت</p>
          <div class="chat-quick-replies">
            <button class="quick-reply-btn" onclick="sendQuickReply('عندي سؤال عن المنتجات')">❓ سؤال عن المنتجات</button>
            <button class="quick-reply-btn" onclick="sendQuickReply('عندي مشكلة في الحساب')">🔧 مشكلة في الحساب</button>
            <button class="quick-reply-btn" onclick="sendQuickReply('عايز أعرف عن طريقة السحب')">💰 طريقة السحب</button>
            <button class="quick-reply-btn" onclick="sendQuickReply('عايز أعرف أكتر عن برنامج العمولة')">📋 برنامج العمولة</button>
          </div>
        </div>
      </div>
      <div class="chat-input-area">
        <button class="chat-emoji-btn" onclick="toggleEmojiPicker()">😊</button>
        <textarea id="chat-input" placeholder="اكتب رسالتك هنا..." rows="1"
                  oninput="autoResizeTextarea(this)"
                  onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendChatMessage();}"></textarea>
        <button class="chat-send-btn" id="chat-send-btn" onclick="sendChatMessage()">
          <i class="fi fi-rr-paper-plane"></i>
        </button>
      </div>
    </div>`;

  if (chatUnsub) { try{chatUnsub()}catch(e){} }
  chatUnsub = db.collection('messages').where('affiliateId','==',currentUser.uid).onSnapshot(snap => {
    const msgs = [];
    let unread = 0;
    snap.forEach(doc => {
      const d = doc.data();
      msgs.push({id:doc.id,...d});
      if (!d.read && d.sender === 'admin') unread++;
    });
    msgs.sort((a,b) => {
      const ta = a.createdAt?.toMillis?.() || 0;
      const tb = b.createdAt?.toMillis?.() || 0;
      return ta - tb;
    });
    renderChatMessagesFromDocs(msgs);
    const badge = document.getElementById('chat-badge');
    if (badge) { badge.textContent = unread || ''; badge.style.display = unread ? 'flex' : 'none'; }
  }, e => console.error(e));
  unsubscribers.push(() => { if(chatUnsub) try{chatUnsub()}catch(e){} });
}

function renderChatMessages(snap) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  if (snap.empty) {
    container.innerHTML = `
      <div class="chat-empty">
        <div class="chat-empty-icon">💬</div>
        <h3>ابدأ محادثة</h3>
        <p>ابعت رسالة لأدمن ميلانو وهرد عليك في أقرب وقت</p>
        <div class="chat-quick-replies">
          <button class="quick-reply-btn" onclick="sendQuickReply('عندي سؤال عن المنتجات')">❓ سؤال عن المنتجات</button>
          <button class="quick-reply-btn" onclick="sendQuickReply('عندي مشكلة في الحساب')">🔧 مشكلة في الحساب</button>
          <button class="quick-reply-btn" onclick="sendQuickReply('عايز أعرف عن طريقة السحب')">💰 طريقة السحب</button>
          <button class="quick-reply-btn" onclick="sendQuickReply('عايز أعرف أكتر عن برنامج العمولة')">📋 برنامج العمولة</button>
        </div>
      </div>`;
    return;
  }
  let html = '';
  let lastDate = '';
  snap.forEach(doc => {
    const msg = doc.data();
    const time = msg.createdAt?.toDate?.()?.toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'}) || '';
    const msgDate = msg.createdAt?.toDate?.()?.toLocaleDateString('ar-EG',{day:'numeric',month:'long',year:'numeric'}) || '';
    const isSent = msg.sender === 'affiliate';
    if (msgDate !== lastDate) {
      html += `<div class="chat-date-divider"><span>${msgDate}</span></div>`;
      lastDate = msgDate;
    }
    html += `
      <div class="chat-msg ${isSent ? 'sent' : 'received'}">
        ${!isSent ? '<div class="chat-msg-avatar">M</div>' : ''}
        <div>
          <div class="chat-msg-bubble">${msg.text}</div>
          <div class="chat-msg-time">
            <span>${time}</span>
            ${isSent ? (msg.read ? '<span class="msg-status">✓✓</span>' : '<span class="msg-status">✓</span>') : ''}
          </div>
        </div>
        ${isSent ? `<div class="chat-msg-avatar">${(affiliateData?.name||'?').charAt(0)}</div>` : ''}
      </div>`;
  });
  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

function renderChatMessagesFromDocs(msgs) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  if (msgs.length === 0) {
    container.innerHTML = `
      <div class="chat-empty">
        <div class="chat-empty-icon">💬</div>
        <h3>ابدأ محادثة</h3>
        <p>ابعت رسالة لأدمن ميلانو وهرد عليك في أقرب وقت</p>
        <div class="chat-quick-replies">
          <button class="quick-reply-btn" onclick="sendQuickReply('عندي سؤال عن المنتجات')">❓ سؤال عن المنتجات</button>
          <button class="quick-reply-btn" onclick="sendQuickReply('عندي مشكلة في الحساب')">🔧 مشكلة في الحساب</button>
          <button class="quick-reply-btn" onclick="sendQuickReply('عايز أعرف عن طريقة السحب')">💰 طريقة السحب</button>
          <button class="quick-reply-btn" onclick="sendQuickReply('عايز أعرف أكتر عن برنامج العمولة')">📋 برنامج العمولة</button>
        </div>
      </div>`;
    return;
  }
  let html = '';
  let lastDate = '';
  msgs.forEach(msg => {
    const time = msg.createdAt?.toDate?.()?.toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'}) || '';
    const msgDate = msg.createdAt?.toDate?.()?.toLocaleDateString('ar-EG',{day:'numeric',month:'long',year:'numeric'}) || '';
    const isSent = msg.sender === 'affiliate';
    if (msgDate !== lastDate) {
      html += `<div class="chat-date-divider"><span>${msgDate}</span></div>`;
      lastDate = msgDate;
    }
    html += `
      <div class="chat-msg ${isSent ? 'sent' : 'received'}">
        ${!isSent ? '<div class="chat-msg-avatar">M</div>' : ''}
        <div>
          <div class="chat-msg-bubble">${msg.text}</div>
          <div class="chat-msg-time">
            <span>${time}</span>
            ${isSent ? (msg.read ? '<span class="msg-status">✓✓</span>' : '<span class="msg-status">✓</span>') : ''}
          </div>
        </div>
        ${isSent ? `<div class="chat-msg-avatar">${(affiliateData?.name||'?').charAt(0)}</div>` : ''}
      </div>`;
  });
  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

function sendQuickReply(text) {
  const input = document.getElementById('chat-input');
  input.value = text;
  sendChatMessage();
}

async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';
  try {
    await db.collection('messages').add({
      affiliateId: currentUser.uid,
      affiliateName: affiliateData?.name || 'مستخدم',
      sender: 'affiliate',
      text: text,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('admin_notifications').add({
      type: 'new_message',
      affiliateId: currentUser.uid,
      affiliateName: affiliateData?.name || 'مستخدم',
      message: text,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { showToast('حدث خطأ في إرسال الرسالة', 'error'); }
}

function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 80) + 'px';
}

// ===== NOTIFICATIONS =====
function loadNotifications(c) {
  c.innerHTML = `
    <div class="page-header"><h1>🔔 الإشعارات</h1></div>
    <div id="notifications-list">
      <div class="loading-state"><div class="spinner spinner-dark"></div></div>
    </div>`;
  loadNotificationsList();
  setTimeout(async () => {
    try {
      const snap = await db.collection('notifications').where('affiliateId','==',currentUser.uid).get();
      snap.forEach(async doc => {
        if (!doc.data().read) await doc.ref.update({read:true});
      });
    } catch(e){}
  }, 2000);
}

function formatNotifTime(date) {
  if (!date) return '-';
  const d = date.toDate ? date.toDate() : new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'الآن';
  if (diff < 3600) return `منذ ${Math.floor(diff/60)} دقيقة`;
  if (diff < 86400) return `منذ ${Math.floor(diff/3600)} ساعة`;
  if (diff < 604800) return `منذ ${Math.floor(diff/86400)} يوم`;
  return d.toLocaleDateString('ar-EG',{day:'numeric',month:'short'});
}

async function loadNotificationsList() {
  const el = document.getElementById('notifications-list');
  if (!el) return;
  try {
    const snap = await db.collection('notifications').where('affiliateId','==',currentUser.uid).get();
    if (snap.empty) {
      el.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔔</div>
          <h3>لا توجد إشعارات</h3>
          <p>هنا هتلاقي كل التحديثات والأرباح الجديدة</p>
        </div>`;
      return;
    }
    const notifs = [];
    snap.forEach(doc => notifs.push({id:doc.id,...doc.data()}));
    notifs.sort((a,b) => {
      const ta = a.createdAt?.toMillis?.() || 0;
      const tb = b.createdAt?.toMillis?.() || 0;
      return tb - ta;
    });
    const notifIcons = {earnings:'💰',payout:'🏦',badge:'🏆',welcome:'👋',alert:'⚠️',info:'ℹ️',promotion:'🎉',message:'💬'};
    let html = '';
    notifs.forEach(d => {
      const time = formatNotifTime(d.createdAt);
      const icon = notifIcons[d.type] || '🔔';
      const notifType = d.type || 'info';
      const borderColor = notifType === 'earnings' ? 'var(--success)' : notifType === 'payout' ? 'var(--primary)' : notifType === 'badge' ? 'var(--warning)' : notifType === 'alert' ? 'var(--danger)' : 'var(--primary)';
      html += `
        <div class="notif-item ${d.read ? '' : 'unread'}" onclick="markNotifRead('${d.id}')">
          <div class="notif-icon-wrap" style="width:42px;height:42px;border-radius:12px;background:${borderColor}15;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0">${icon}</div>
          <div class="notif-content">
            <div class="notif-text">${d.message}</div>
            <div class="notif-time">${time}</div>
          </div>
          ${!d.read ? '<div class="notif-dot"></div>' : ''}
        </div>`;
    });
    el.innerHTML = html;
  } catch(e) { 
    el.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔔</div>
        <h3>لا توجد إشعارات</h3>
        <p>هنا هتلاقي كل التحديثات والأرباح الجديدة</p>
      </div>`; 
  }
}

async function markNotifRead(id) {
  try {
    await db.collection('notifications').doc(id).update({read:true});
  } catch(e){}
}

async function clearAllNotifications() {
  try {
    const snap = await db.collection('notifications').where('affiliateId','==',currentUser.uid).get();
    const batch = db.batch();
    snap.forEach(doc => {
      if (!doc.data().read) batch.update(doc.ref,{read:true});
    });
    await batch.commit();
    loadNotificationsList();
    showToast('تم قراءة كل الإشعارات ✅');
  } catch(e){ showToast('حدث خطأ','error'); }
}

// ===== SETTINGS =====
function loadSettings(c) {
  const pct = getProfileCompletion();
  c.innerHTML = `
    <div class="page-header"><h1>⚙️ الإعدادات</h1></div>

    <div class="settings-section profile-header-section">
      <div class="profile-avatar-large">${(affiliateData?.name||'?').charAt(0)}</div>
      <h2 class="profile-name">${affiliateData?.name || 'مستخدم'}</h2>
      <p class="profile-email">${affiliateData?.email || ''}</p>
      <div class="profile-tier-badge">${getCurrentTier().emoji} ${getCurrentTier().name}</div>
      <div class="profile-completion-bar">
        <div class="profile-completion-track">
          <div class="profile-completion-fill" style="width:${pct}%"></div>
        </div>
        <span class="profile-completion-text">${pct}% مكتمل</span>
      </div>
    </div>

    <div class="settings-section">
      <h2>📝 الملف الشخصي</h2>
      <form id="settings-form" onsubmit="handleUpdateProfile(event)">
        <div class="form-group">
          <label><i class="fi fi-rr-user"></i> الاسم الكامل</label>
          <input type="text" id="settings-name" value="${affiliateData?.name || ''}" placeholder="اسمك الكامل" required>
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-phone"></i> رقم التليفون</label>
          <input type="tel" id="settings-phone" value="${affiliateData?.phone || ''}" placeholder="01XXXXXXXXX" dir="ltr" style="text-align:right">
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-map-marker"></i> العنوان / المحافظة</label>
          <select id="settings-governorate">
            <option value="">اختر المحافظة</option>
            <option value="القاهرة" ${affiliateData?.governorate==='القاهرة'?'selected':''}>القاهرة</option>
            <option value="الجيزة" ${affiliateData?.governorate==='الجيزة'?'selected':''}>الجيزة</option>
            <option value="الإسكندرية" ${affiliateData?.governorate==='الإسكندرية'?'selected':''}>الإسكندرية</option>
            <option value="القليوبية" ${affiliateData?.governorate==='القليوبية'?'selected':''}>القليوبية</option>
            <option value="الشرقية" ${affiliateData?.governorate==='الشرقية'?'selected':''}>الشرقية</option>
            <option value="الدقهلية" ${affiliateData?.governorate==='الدقهلية'?'selected':''}>الدقهلية</option>
            <option value="المنوفية" ${affiliateData?.governorate==='المنوفية'?'selected':''}>المنوفية</option>
            <option value="الغربية" ${affiliateData?.governorate==='الغربية'?'selected':''}>الغربية</option>
            <option value="البحيرة" ${affiliateData?.governorate==='البحيرة'?'selected':''}>البحيرة</option>
            <option value="كفر الشيخ" ${affiliateData?.governorate==='كفر الشيخ'?'selected':''}>كفر الشيخ</option>
            <option value="الفيوم" ${affiliateData?.governorate==='الفيوم'?'selected':''}>الفيوم</option>
            <option value="بني سويف" ${affiliateData?.governorate==='بني سويف'?'selected':''}>بني سويف</option>
            <option value="الفيوم" ${affiliateData?.governorate==='الفيوم'?'selected':''}>الفيوم</option>
            <option value="أسيوط" ${affiliateData?.governorate==='أسيوط'?'selected':''}>أسيوط</option>
            <option value="سوهاج" ${affiliateData?.governorate==='سوهاج'?'selected':''}>سوهاج</option>
            <option value="قنا" ${affiliateData?.governorate==='قنا'?'selected':''}>قنا</option>
            <option value="الأقصر" ${affiliateData?.governorate==='الأقصر'?'selected':''}>الأقصر</option>
            <option value="أسوان" ${affiliateData?.governorate==='أسوان'?'selected':''}>أسوان</option>
            <option value="البحر الأحمر" ${affiliateData?.governorate==='البحر الأحمر'?'selected':''}>البحر الأحمر</option>
            <option value="الوادي الجديد" ${affiliateData?.governorate==='الوادي الجديد'?'selected':''}>الوادي الجديد</option>
            <option value="مطروح" ${affiliateData?.governorate==='مطروح'?'selected':''}>مطروح</option>
            <option value="شمال سيناء" ${affiliateData?.governorate==='شمال سيناء'?'selected':''}>شمال سيناء</option>
            <option value="جنوب سيناء" ${affiliateData?.governorate==='جنوب سيناء'?'selected':''}>جنوب سيناء</option>
          </select>
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-home"></i> العنوان التفصيلي</label>
          <input type="text" id="settings-address" value="${affiliateData?.address || ''}" placeholder="الشارع، المنطقة، المدينة">
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-envelope"></i> البريد الإلكتروني</label>
          <input type="email" value="${affiliateData?.email || ''}" disabled style="opacity:.6">
          <small style="color:var(--text-secondary);font-size:.75rem;margin-top:.3rem;display:block">لا يمكن تغيير البريد الإلكتروني</small>
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-birthday-cake"></i> تاريخ الميلاد</label>
          <input type="date" id="settings-birthday" value="${affiliateData?.birthday || ''}">
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-venus-mars"></i> النوع</label>
          <select id="settings-gender">
            <option value="">اختر</option>
            <option value="male" ${affiliateData?.gender==='male'?'selected':''}>ذكر</option>
            <option value="female" ${affiliateData?.gender==='female'?'selected':''}>أنثى</option>
          </select>
        </div>
        <div class="form-group">
          <label><i class="fi fi-rr-share-alt"></i> وسائل التواصل الاجتماعي</label>
          <input type="text" id="settings-facebook" value="${affiliateData?.facebook || ''}" placeholder="رابط فيسبوك" style="margin-bottom:.5rem">
          <input type="text" id="settings-instagram" value="${affiliateData?.instagram || ''}" placeholder="رابط انستجرام" style="margin-bottom:.5rem">
          <input type="text" id="settings-tiktok" value="${affiliateData?.tiktok || ''}" placeholder="رابط تيك توك">
        </div>
        <button type="submit" class="btn btn-primary btn-block">
          <i class="fi fi-rr-check"></i> حفظ التعديلات
        </button>
      </form>
    </div>

    <div class="settings-section">
      <h2>🎨 المظهر</h2>
      <div class="settings-toggle-row">
        <span><i class="fi fi-rr-moon"></i> الوضع الليلي</span>
        <button class="toggle-btn ${document.body.classList.contains('dark-mode') ? 'active' : ''}" onclick="toggleDarkMode()">
          <div class="toggle-knob"></div>
        </button>
      </div>
      <div class="settings-toggle-row">
        <span><i class="fi fi-rr-bell"></i> إشعارات البريد</span>
        <button class="toggle-btn ${affiliateData?.emailNotifications ? 'active' : ''}" onclick="toggleEmailNotifications()">
          <div class="toggle-knob"></div>
        </button>
      </div>
    </div>

    <div class="settings-section">
      <h2>📊 أدوات متقدمة</h2>
      <div class="settings-tools-grid">
        <button class="tool-card" onclick="showEarningsCalculator()">
          <div class="tool-icon">🧮</div>
          <span>حاسبة الأرباح</span>
        </button>
        <button class="tool-card" onclick="showQRCode()">
          <div class="tool-icon">📱</div>
          <span>كود QR</span>
        </button>
        <button class="tool-card" onclick="showWeeklySummary()">
          <div class="tool-icon">📊</div>
          <span>ملخص الأسبوع</span>
        </button>
        <button class="tool-card" onclick="exportToCSV()">
          <div class="tool-icon">📥</div>
          <span>تصدير CSV</span>
        </button>
      </div>
    </div>

    <div class="settings-section">
      <h2>🔒 تغيير كلمة المرور</h2>
      <form onsubmit="handleChangePassword(event)">
        <div class="form-group">
          <label>كلمة المرور الجديدة</label>
          <input type="password" id="new-password" placeholder="6 أحرف على الأقل" required>
        </div>
        <div class="form-group">
          <label>تأكيد كلمة المرور</label>
          <input type="password" id="confirm-new-password" required>
        </div>
        <button type="submit" class="btn btn-secondary btn-block">
          <i class="fi fi-rr-lock"></i> تغيير كلمة المرور
        </button>
      </form>
    </div>

    <div class="settings-section">
      <h2>🚪 الحساب</h2>
      <div class="account-info">
        <div class="account-item"><span>البريد الإلكتروني</span><span>${affiliateData?.email || ''}</span></div>
        <div class="account-item"><span>رمز الإحالة</span><span style="font-family:monospace;color:var(--primary)">${affiliateData?.referralCode || ''}</span></div>
        <div class="account-item"><span>المستوى الحالي</span><span>${getCurrentTier().emoji} ${getCurrentTier().name}</span></div>
        <div class="account-item"><span>تاريخ الانضمام</span><span>${affiliateData?.createdAt?.toDate?.()?.toLocaleDateString('ar-EG') || '-'}</span></div>
      </div>
      <button class="btn btn-danger btn-block" onclick="handleLogout()">
        <i class="fi fi-rr-sign-out-alt"></i> تسجيل الخروج
      </button>
    </div>`;
}

async function handleUpdateProfile(e) {
  e.preventDefault();
  const name = document.getElementById('settings-name').value.trim();
  const phone = document.getElementById('settings-phone').value.trim();
  const governorate = document.getElementById('settings-governorate').value;
  const address = document.getElementById('settings-address').value.trim();
  const birthday = document.getElementById('settings-birthday').value;
  const gender = document.getElementById('settings-gender').value;
  const facebook = document.getElementById('settings-facebook').value.trim();
  const instagram = document.getElementById('settings-instagram').value.trim();
  const tiktok = document.getElementById('settings-tiktok').value.trim();
  try {
    await db.collection('affiliates').doc(currentUser.uid).update({name, phone, governorate, address, birthday, gender, facebook, instagram, tiktok});
    affiliateData.name = name;
    affiliateData.phone = phone;
    affiliateData.governorate = governorate;
    affiliateData.address = address;
    affiliateData.birthday = birthday;
    affiliateData.gender = gender;
    affiliateData.facebook = facebook;
    affiliateData.instagram = instagram;
    affiliateData.tiktok = tiktok;
    updateUserUI();
    showToast('تم حفظ التعديلات ✅');
    loadSettings(document.getElementById('page-content'));
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

function toggleEmailNotifications() {
  const val = !affiliateData?.emailNotifications;
  db.collection('affiliates').doc(currentUser.uid).update({emailNotifications:val}).then(() => {
    affiliateData.emailNotifications = val;
    showToast(val ? 'تم تفعيل إشعارات البريد ✅' : 'تم إيقاف إشعارات البريد');
  });
}

async function handleChangePassword(e) {
  e.preventDefault();
  const p = document.getElementById('new-password').value;
  const cp = document.getElementById('confirm-new-password').value;
  if (p.length < 6) { showToast('كلمة المرور 6 أحرف على الأقل', 'error'); return; }
  if (p !== cp) { showToast('كلمتا المرور غير متطابقتين', 'error'); return; }
  try { await currentUser.updatePassword(p); showToast('تم تغيير كلمة المرور ✅'); }
  catch(e) { showToast('حدث خطأ - قد تحتاج تسجيل الدخول تاني', 'error'); }
}

async function handleLogout() {
  unsubscribers.forEach(u => { try{u()}catch(e){} });
  unsubscribers = [];
  await auth.signOut();
  window.location.href = 'auth.html';
}

// ===== SHARING =====
function shareWhatsApp() {
  const text = `🔥 ميلانو F16 - الحل الأقوى للقضاء على الحشرات!\n📦 شحن مجاني فوق 3000 جنيه\n🛒 اطلب دلوقتي:\n${getShareLink()}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function shareFacebook() {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareLink())}`, '_blank');
}

function shareTelegram() {
  const text = `milano F16 - أقوى مبيد حشري في مصر 🛡️\n${getShareLink()}`;
  window.open(`https://t.me/share/url?url=${encodeURIComponent(getShareLink())}&text=${encodeURIComponent(text)}`, '_blank');
}

function copyLink() { copyToClipboard(getShareLink()); }

// ===== PAYOUT REQUEST =====
async function requestPayout() {
  if (!affiliateData || affiliateData.pendingPayout < 50) {
    showToast('الحد الأدنى للسحب هو 50 ج.م', 'error');
    return;
  }
  const phone = prompt('ادخل رقم فودافون كاش:');
  if (!phone) return;
  try {
    await db.collection('payouts').add({
      affiliateId: currentUser.uid,
      amount: affiliateData.pendingPayout,
      method: 'فودافون كاش',
      phone: phone,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('affiliates').doc(currentUser.uid).update({pendingPayout: 0});
    await db.collection('notifications').add({
      affiliateId: currentUser.uid,
      message: `تم طلب سحب ${affiliateData.pendingPayout} ج.م`,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    affiliateData.pendingPayout = 0;
    showToast('تم طلب السحب بنجاح! ✅');
    loadPage('payouts');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== TOAST =====
function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ===== SERVICE WORKER =====
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

const DEFAULT_VIDEOS = [
  {id:'v1',title:'إزاي تبدأ في برنامج العمولة',desc:'دليل المبتدئين الكامل - اعرف أزاي تسجل وتبدأ تكسب',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',category:'getting-started',duration:'8:30',thumbnail:''},
  {id:'v2',title:'أسرار البيع على فيسبوك',desc:'إزاي تعمل محتوى يجذب الزبون ويزيد مبيعاتك',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',category:'social',duration:'12:15',thumbnail:''},
  {id:'v3',title:'واتساب كورس تسويق احترافي',desc:'ازاي تستخدم واتساب في البيع من غير ما تزعج الناس',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',category:'sales',duration:'10:45',thumbnail:''},
  {id:'v4',title:'بناء استراتيجية تسويقية ناجحة',desc:'خطط تسويق احترافية تضاعف أرباحك',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',category:'tips',duration:'15:20',thumbnail:''},
  {id:'v5',title:'إزاي تكتب وصف منتج يبيع',desc:' secrets لكتابة أوصاف تقنع الزبون يشتري',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',category:'sales',duration:'7:50',thumbnail:''},
  {id:'v6',title:' instagram marketing دورة',desc:'إزاي تكبر صفحتك على انستجرام وتبيع',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',category:'social',duration:'11:30',thumbnail:''}
];

// ===== DARK MODE =====
function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark);
  showToast(isDark ? 'الوضع الليلي مفعّل 🌙' : 'الوضع النهاري مفعّل ☀️');
}

// ===== EARNINGS CALCULATOR =====
function showEarningsCalculator() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="padding:1.5rem">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem">
        🧮 حاسبة الأرباح
      </h2>
      <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:1.5rem">
        احسب أرباحك المتوقعة بناءً على عدد الزوار
      </p>
      <div class="form-group">
        <label>عدد الزوار المتوقع</label>
        <input type="number" id="calc-visitors" placeholder="10000" oninput="calculateEarnings()">
      </div>
      <div style="background:var(--bg);border-radius:10px;padding:1rem;margin-top:1rem">
        <div style="display:flex;justify-content:space-between;margin-bottom:.5rem">
          <span style="color:var(--text-secondary);font-size:.85rem">الأرباح المتوقعة:</span>
          <span id="calc-result" style="font-weight:700;font-size:1.2rem;color:var(--success)">0 ج.م</span>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span style="color:var(--text-secondary);font-size:.85rem">الأرباح لكل 1000 زائر:</span>
          <span style="font-weight:600;font-size:.9rem">20 ج.م</span>
        </div>
      </div>
      <button class="btn btn-ghost btn-block" style="margin-top:1rem" onclick="closeModal()">إغلاق</button>
    </div>`;
  modal.classList.add('active');
}

function calculateEarnings() {
  const visitors = parseInt(document.getElementById('calc-visitors').value) || 0;
  const earnings = Math.floor(visitors / 1000) * 20;
  document.getElementById('calc-result').textContent = earnings + ' ج.م';
}

// ===== QR CODE GENERATOR =====
function showQRCode() {
  const link = getShareLink();
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`;
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="padding:1.5rem;text-align:center">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem">📱 كود QR لرابط الإحالة</h2>
      <img src="${qrUrl}" alt="QR Code" style="width:200px;height:200px;border-radius:12px;margin:1rem 0;box-shadow:0 4px 20px rgba(0,0,0,0.1)">
      <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:1rem">
        امسح الكود بالموبايل عشان تفتح رابط الإحالة
      </p>
      <div style="background:var(--bg);border-radius:10px;padding:.8rem;margin-bottom:1rem">
        <code style="font-size:.75rem;color:var(--text-secondary);word-break:break-all">${link}</code>
      </div>
      <div style="display:flex;gap:.8rem">
        <button class="btn btn-primary" style="flex:1" onclick="downloadQR('${qrUrl}')">📥 تحميل</button>
        <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">إغلاق</button>
      </div>
    </div>`;
  modal.classList.add('active');
}

function downloadQR(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = 'milano-f16-qr.png';
  a.click();
  showToast('تم تحميل الكود ✅');
}

// ===== EXPORT DATA =====
async function exportToCSV() {
  try {
    const snap = await db.collection('conversions').where('affiliateId','==',currentUser.uid).get();
    if (snap.empty) {
      showToast('لا توجد بيانات للتصدير', 'error');
      return;
    }
    const items = [];
    snap.forEach(doc => items.push(doc.data()));
    items.sort((a,b) => (b.createdAt?.toMillis?.()||0) - (a.createdAt?.toMillis?.()||0));
    let csv = 'التاريخ,العميل,المنتج,الحالة,العمولة\n';
    items.forEach(d => {
      const date = d.createdAt?.toDate()?.toLocaleDateString('ar-EG') || '-';
      const status = d.status === 'approved' ? 'مقبول' : d.status === 'paid' ? 'مدفوع' : 'قيد المراجعة';
      csv += `${date},${d.customerName || 'عميل'},${d.productName || '-'},${status},${d.commission || 0}\n`;
    });
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `milano-referrals-${new Date().toLocaleDateString('ar-EG')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('تم تصدير البيانات ✅');
  } catch(e) {
    showToast('حدث خطأ في التصدير', 'error');
  }
}

// ===== PROFILE COMPLETION =====
function getProfileCompletion() {
  if (!affiliateData) return 0;
  let completed = 0;
  let total = 8;
  if (affiliateData.name) completed++;
  if (affiliateData.phone) completed++;
  if (affiliateData.email) completed++;
  if (affiliateData.referralCode) completed++;
  if (affiliateData.governorate) completed++;
  if (affiliateData.address) completed++;
  if (affiliateData.facebook || affiliateData.instagram || affiliateData.tiktok) completed++;
  if (affiliateData.totalClicks > 0) completed++;
  return Math.round((completed / total) * 100);
}

function getSetupProgress() {
  if (!affiliateData) return { percentage: 0, steps: [] };
  
  const steps = [
    { text: 'إنشاء الحساب', completed: !!affiliateData.email },
    { text: 'إضافة رقم التليفون', completed: !!affiliateData.phone },
    { text: 'إكمال الملف الشخصي', completed: !!(affiliateData.governorate && affiliateData.address) },
    { text: 'مشاركة رابط الإحالة', completed: (affiliateData.totalClicks || 0) > 0 },
    { text: 'الحصول على أول إحالة', completed: (affiliateData.referralsCount || 0) > 0 }
  ];
  
  const completedCount = steps.filter(s => s.completed).length;
  const percentage = Math.round((completedCount / steps.length) * 100);
  
  return { percentage, steps };
}

function showProfileCompletion() {
  const pct = getProfileCompletion();
  const items = [
    {label:'الاسم',done:!!affiliateData?.name,icon:'👤'},
    {label:'رقم التليفون',done:!!affiliateData?.phone,icon:'📱'},
    {label:'البريد الإلكتروني',done:!!affiliateData?.email,icon:'📧'},
    {label:'المحافظة',done:!!affiliateData?.governorate,icon:'📍'},
    {label:'العنوان التفصيلي',done:!!affiliateData?.address,icon:'🏠'},
    {label:'وسائل التواصل',done:!!(affiliateData?.facebook||affiliateData?.instagram||affiliateData?.tiktok),icon:'🔗'},
    {label:'مشاركة رابط إحالة',done:(affiliateData?.totalClicks||0)>0,icon:'📤'}
  ];
  
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="padding:1.5rem;text-align:center">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem">📋 إكمال الملف الشخصي</h2>
      <div style="position:relative;width:120px;height:120px;margin:1rem auto">
        <svg style="width:120px;height:120px;transform:rotate(-90deg)">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" stroke-width="8"/>
          <circle cx="60" cy="60" r="50" fill="none" stroke="${pct === 100 ? '#10b981' : '#3b82f6'}" stroke-width="8" 
                  stroke-dasharray="${314}" stroke-dashoffset="${314 - (314 * pct / 100)}" stroke-linecap="round"/>
        </svg>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:1.5rem;font-weight:800">
          ${pct}%
        </div>
      </div>
      <p style="color:var(--text-secondary);font-size:.85rem;margin-bottom:1.2rem">
        ${pct === 100 ? 'ملفك الشخصي مكتمل! 🎉' : 'كمّل ملفك عشان تحصل على شارة إضافية'}
      </p>
      <div style="text-align:right;background:var(--bg);border-radius:12px;padding:1rem;max-height:300px;overflow-y:auto">
        ${items.map(item => `
          <div style="display:flex;align-items:center;gap:.8rem;padding:.6rem 0;border-bottom:1px solid var(--border)">
            <span style="font-size:1.1rem">${item.icon}</span>
            <span style="flex:1;font-size:.85rem">${item.label}</span>
            <span style="color:${item.done ? 'var(--success)' : 'var(--text-secondary)'}; font-size:1rem">${item.done ? '✅' : '⭕'}</span>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;gap:.8rem;margin-top:1.2rem">
        <button class="btn btn-ghost" style="flex:1" onclick="closeModal()">إغلاق</button>
        ${pct < 100 ? '<button class="btn btn-primary" style="flex:1" onclick="closeModal();loadPage(\'settings\')">كمّل الآن</button>' : ''}
      </div>
    </div>`;
  modal.classList.add('active');
}

// ===== WEEKLY SUMMARY =====
async function showWeeklySummary() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="padding:1.5rem">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem;display:flex;align-items:center;gap:.5rem">
        📊 ملخص الأسبوع
      </h2>
      <div style="text-align:center;padding:2rem">
        <div class="spinner spinner-dark"></div>
        <p style="color:var(--text-secondary);font-size:.85rem;margin-top:.5rem">جاري تحميل البيانات...</p>
      </div>
    </div>`;
  modal.classList.add('active');

  try {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const clicksSnap = await db.collection('clicks')
      .where('affiliateId','==',currentUser.uid)
      .where('createdAt','>=',weekAgo)
      .get();
    
    let dailyClicks = {};
    clicksSnap.forEach(doc => {
      const date = doc.data().createdAt?.toDate()?.toLocaleDateString('ar-EG');
      dailyClicks[date] = (dailyClicks[date] || 0) + 1;
    });

    const totalClicks = clicksSnap.size;
    const avgDaily = Math.round(totalClicks / 7);
    const earnings = Math.floor(totalClicks / 1000) * 20;

    content.innerHTML = `
      <div style="padding:1.5rem">
        <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem">📊 ملخص الأسبوع</h2>
        
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.8rem;margin-bottom:1.5rem">
          <div style="background:var(--bg);border-radius:10px;padding:1rem;text-align:center">
            <div style="font-size:1.5rem;font-weight:800;color:var(--primary)">${totalClicks}</div>
            <div style="font-size:.75rem;color:var(--text-secondary)">نقرات هذا الأسبوع</div>
          </div>
          <div style="background:var(--bg);border-radius:10px;padding:1rem;text-align:center">
            <div style="font-size:1.5rem;font-weight:800;color:var(--success)">${earnings} ج.م</div>
            <div style="font-size:.75rem;color:var(--text-secondary)">أرباح هذا الأسبوع</div>
          </div>
        </div>

        <div style="background:var(--bg);border-radius:10px;padding:1rem;margin-bottom:1rem">
          <div style="font-size:.85rem;font-weight:600;margin-bottom:.5rem">متوسط النقرات اليومي:</div>
          <div style="font-size:1.2rem;font-weight:800;color:var(--primary)">${avgDaily} نقرة/يوم</div>
        </div>

        <div style="background:var(--bg);border-radius:10px;padding:1rem">
          <div style="font-size:.85rem;font-weight:600;margin-bottom:.5rem">اليوم الأعلى نقرات:</div>
          <div style="font-size:.9rem;color:var(--text)">
            ${Object.keys(dailyClicks).length > 0 
              ? Object.entries(dailyClicks).sort((a,b) => b[1] - a[1])[0]?.join(' - ') + ' (' + Object.entries(dailyClicks).sort((a,b) => b[1] - a[1])[0]?.[1] + ' نقرة)'
              : 'لا توجد بيانات'}
          </div>
        </div>

        <button class="btn btn-ghost btn-block" style="margin-top:1rem" onclick="closeModal()">إغلاق</button>
      </div>`;
  } catch(e) {
    content.innerHTML = `
      <div style="padding:1.5rem;text-align:center">
        <p style="color:var(--text-secondary)">خطأ في تحميل البيانات</p>
        <button class="btn btn-ghost btn-block" style="margin-top:1rem" onclick="closeModal()">إغلاق</button>
      </div>`;
  }
}

// ===== MODAL HELPERS =====
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
}

function toggleEmojiPicker() {
  const emojis = ['😊','😂','❤️','🔥','👍','💯','💰','🎉','📱','✨','🙏','💪','🛒','📦','🎯','⭐'];
  const modal = document.getElementById('modal-content');
  const overlay = document.getElementById('modal-overlay');
  modal.innerHTML = `
    <div style="padding:1.5rem">
      <h3 style="font-size:1rem;font-weight:700;margin-bottom:1rem;text-align:center">اختر إيموجي</h3>
      <div style="display:grid;grid-template-columns:repeat(8,1fr);gap:.5rem">
        ${emojis.map(e => `<button onclick="insertEmoji('${e}')" style="width:100%;aspect-ratio:1;border:1px solid var(--border);border-radius:10px;background:var(--card-bg);font-size:1.5rem;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">${e}</button>`).join('')}
      </div>
      <button class="btn btn-ghost btn-block" style="margin-top:1rem" onclick="closeModal()">إغلاق</button>
    </div>`;
  overlay.classList.add('active');
}

function insertEmoji(emoji) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value += emoji;
    input.focus();
  }
  closeModal();
}

// ===== TOP PRODUCTS =====
async function getTopProducts() {
  try {
    const snap = await db.collection('clicks').where('affiliateId','==',currentUser.uid).get();
    const productClicks = {};
    snap.forEach(doc => {
      const d = doc.data();
      if (d.productId) {
        productClicks[d.productId] = (productClicks[d.productId] || 0) + 1;
      }
    });
    const sorted = Object.entries(productClicks).sort((a,b) => b[1] - a[1]).slice(0, 5);
    return sorted.map(([id, clicks]) => {
      const product = PRODUCTS.find(p => p.id === id);
      return product ? { ...product, clicks } : null;
    }).filter(Boolean);
  } catch(e) { return []; }
}

// ===== STREAK SYSTEM =====
function getStreak() {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  const streak = parseInt(localStorage.getItem('streak') || '0');
  
  if (lastVisit === today) return streak;
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastVisit === yesterday.toDateString()) {
    const newStreak = streak + 1;
    localStorage.setItem('streak', newStreak);
    localStorage.setItem('lastVisit', today);
    return newStreak;
  } else {
    localStorage.setItem('streak', 1);
    localStorage.setItem('lastVisit', today);
    return 1;
  }
}

function showStreak() {
  const streak = getStreak();
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  content.innerHTML = `
    <div style="padding:1.5rem;text-align:center">
      <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1rem">🔥 سلسلة الحضور</h2>
      <div style="font-size:4rem;margin:1rem 0;animation:pulse 2s infinite">🔥</div>
      <div style="font-size:2.5rem;font-weight:800;color:var(--primary);margin-bottom:.5rem">${streak}</div>
      <p style="color:var(--text-secondary);font-size:.9rem;margin-bottom:1.5rem">يوم متتالي</p>
      
      <div style="display:flex;justify-content:center;gap:.5rem;margin-bottom:1.5rem">
        ${[1,2,3,4,5,6,7].map(d => `
          <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;
            background:${d <= streak ? 'var(--primary)' : 'var(--bg)'};color:${d <= streak ? 'white' : 'var(--text-secondary)'}">
            ${d}
          </div>
        `).join('')}
      </div>
      
      <div style="background:var(--bg);border-radius:10px;padding:1rem;margin-bottom:1rem">
        <p style="font-size:.85rem;color:var(--text-secondary)">
          ${streak >= 7 ? '🎉 مبروك! وصلت 7 أيام!' : 
            streak >= 3 ? '💪 كمّل كده! متبقي ' + (7-streak) + ' أيام' :
            '🚀 ابدأ سلسلتك! دخّل كل يوم عشان تاخد مكافآت'}
        </p>
      </div>
      
      <button class="btn btn-ghost btn-block" onclick="closeModal()">إغلاق</button>
    </div>`;
  modal.classList.add('active');
}

// ===== SOCIAL PROOF =====
async function getSocialProof() {
  try {
    const affSnap = await db.collection('affiliates').orderBy('totalEarnings','desc').limit(3).get();
    const recent = [];
    affSnap.forEach(doc => {
      const d = doc.data();
      if (d.name && d.totalEarnings > 0) {
        recent.push({ name: d.name, earnings: d.totalEarnings });
      }
    });
    return recent;
  } catch(e) { return []; }
}

// ===== OVERVIEW - HIGH PERFORMANCE =====
async function loadOverview(c) {
  const af = affiliateData || {};
  const streak = getStreak();
  const profilePct = getProfileCompletion();
  const tier = getCurrentTier();
  const setupSteps = getSetupProgress();

  c.innerHTML = `
    <div class="overview-skeleton">
      <div class="page-header">
        <h1>مرحباً ${af.name || ''} 👋</h1>
        <p class="subtitle">إليك ملخص أرباحك اليوم</p>
      </div>

      <!-- SETUP WIZARD -->
      <div class="setup-wizard">
        <div class="setup-header">
          <div class="setup-icon-circle">
            <i class="fi fi-sr-check-circle"></i>
          </div>
          <div class="setup-info">
            <h3>سجّل حسابك</h3>
            <p>سجّل بياناتك هي تأسي واحداً على كود إحالة خاص بك.</p>
          </div>
        </div>
        <div class="setup-progress-bar">
          <div class="setup-progress-fill" style="width:${setupSteps.percentage}%"></div>
        </div>
        <div class="setup-steps-grid">
          ${setupSteps.steps.map(step => `
            <div class="setup-step ${step.completed ? 'completed' : ''}">
              <div class="setup-step-icon">
                ${step.completed ? '<i class="fi fi-sr-check"></i>' : '<i class="fi fi-sr-plus"></i>'}
              </div>
              <span class="setup-step-text">${step.text}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="streak-banner" onclick="showStreak()">
        <div class="streak-icon">🔥</div>
        <div class="streak-info">
          <div class="streak-count">${streak} يوم</div>
          <div class="streak-text">سلسلة الحضور</div>
        </div>
        <div class="streak-arrow">←</div>
      </div>

      <div class="stats-grid" id="stats-grid">
        <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon green">💰</div><span class="stat-card-trend up">...</span></div><div class="stat-card-value skeleton-box">&nbsp;</div><div class="stat-card-label">إجمالي الأرباح</div></div>
        <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon blue">👥</div></div><div class="stat-card-value skeleton-box">&nbsp;</div><div class="stat-card-label">إجمالي الإحالات</div></div>
        <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon purple">⏳</div></div><div class="stat-card-value skeleton-box">&nbsp;</div><div class="stat-card-label">أرباح معلقة</div></div>
        <div class="stat-card"><div class="stat-card-header"><div class="stat-card-icon orange">🔗</div></div><div class="stat-card-value skeleton-box">&nbsp;</div><div class="stat-card-label">إجمالي الزوار</div></div>
      </div>

      <!-- COMMISSION LEVELS -->
      <div class="commission-levels-card">
        <div class="commission-header">
          <h3>📊 مستويات العمولة</h3>
          <span class="commission-current">عمولتك: ${tier.commission}%</span>
        </div>
        <div class="commission-tiers">
          ${TIERS.map(t => `
            <div class="commission-tier ${getCurrentTier().name === t.name ? 'active' : ''}">
              <div class="tier-emoji">${t.emoji}</div>
              <div class="tier-name">${t.name}</div>
              <div class="tier-commission">${t.commission}%</div>
              <div class="tier-req">${t.min} إحالة</div>
            </div>
          `).join('')}
        </div>
      </div>

      ${profilePct < 100 ? `
      <div class="profile-alert" onclick="showProfileCompletion()">
        <div class="profile-alert-icon">📋</div>
        <div class="profile-alert-info">
          <div class="profile-alert-text">أكمل ملفك الشخصي (${profilePct}%)</div>
          <div class="profile-alert-bar"><div class="profile-alert-fill" style="width:${profilePct}%"></div></div>
        </div>
        <div class="profile-alert-arrow">←</div>
      </div>` : ''}

      <div class="referral-box">
        <div class="referral-header">
          <span>🔗 رابط الإحالة الخاص بك</span>
          <span class="copy-hint">اضغط للنسخ</span>
        </div>
        <div class="referral-link-row">
          <input type="text" id="referral-link" readonly value="${getShareLink()}" onclick="copyToClipboard(this.value);this.select()">
          <button class="btn btn-primary btn-sm" onclick="copyToClipboard(document.getElementById('referral-link').value)">
            <i class="fi fi-rr-duplicate"></i> نسخ
          </button>
        </div>
      </div>

      <div class="quick-actions">
        <h3>⚡ إجراءات سريعة</h3>
        <div class="actions-row">
          <button class="action-btn" onclick="shareWhatsApp()"><span class="action-icon">💬</span><span>واتساب</span></button>
          <button class="action-btn" onclick="shareFacebook()"><span class="action-icon">📘</span><span>فيسبوك</span></button>
          <button class="action-btn" onclick="copyLink()"><span class="action-icon">📋</span><span>نسخ الرابط</span></button>
          <button class="action-btn" onclick="loadPage('products')"><span class="action-icon">📦</span><span>المنتجات</span></button>
        </div>
      </div>
    </div>

    <div id="overview-dynamic"></div>
  `;

  loadOverviewData();
}

let overviewCache = null;

async function loadOverviewData() {
  if (overviewCache && Date.now() - overviewCache.time < 30000) {
    renderOverviewStats(overviewCache.data);
    return;
  }
  const dyn = document.getElementById('overview-dynamic');
  if (dyn) dyn.innerHTML = `
    <div class="tier-progress-section">
      <div class="section-header"><h3>🏅 التقدم نحو المستوى التالي</h3></div>
      <div class="tier-progress-card" id="tier-progress"></div>
    </div>
    <div class="chart-container">
      <div class="chart-header"><h3>📈 النقرات - آخر 7 أيام</h3><div class="live-dot"></div></div>
      <div class="chart-area" id="chart-area"></div>
      <div class="chart-labels" id="chart-labels"></div>
    </div>
    <div class="recent-section">
      <div class="section-header"><h3>📋 آخر الإحالات</h3><button class="btn btn-ghost btn-sm" onclick="loadPage('referrals')">عرض الكل</button></div>
      <div id="recent-referrals"></div>
    </div>`;
  try {
    const today = new Date(); today.setHours(0,0,0,0);
    const [clicksSnap] = await Promise.all([
      db.collection('clicks').where('affiliateId','==',currentUser.uid).get()
    ]);
    let clicks = 0, todayClicks = 0;
    clicksSnap.forEach(d => {
      clicks++;
      const cd = d.data().createdAt?.toDate();
      if (cd && cd >= today) todayClicks++;
    });

    const data = {
      clicks, todayClicks,
      earnings: Math.floor(clicks / 1000) * 20,
      pending: ((clicks % 1000) / 1000 * 20).toFixed(2),
      nextPayout: 1000 - (clicks % 1000) || 1000,
      referrals: affiliateData?.referralsCount || 0
    };
    overviewCache = {data, time: Date.now()};
    renderOverviewStats(data);
    renderTierProgress();
    loadChartData();
    loadRecentReferrals();

    Promise.all([getTopProducts(), getSocialProof()]).then(([top, social]) => {
      renderTopProducts(top);
      renderSocialProof(social);
    });
  } catch(e) {
    const data = {
      clicks: 0, todayClicks: 0, earnings: 0, pending: '0.00',
      nextPayout: 1000, referrals: affiliateData?.referralsCount || 0
    };
    renderOverviewStats(data);
    renderTierProgress();
  }
}

function renderOverviewStats(d) {
  const grid = document.getElementById('stats-grid');
  if (!grid) return;
  grid.innerHTML = `
    <div class="stat-card" onclick="loadPage('payouts')">
      <div class="stat-card-header">
        <div class="stat-card-icon green">💰</div>
        <span class="stat-card-trend up">${d.todayClicks}</span>
      </div>
      <div class="stat-card-value">${d.earnings} <small>ج.م</small></div>
      <div class="stat-card-label">إجمالي الأرباح</div>
    </div>
    <div class="stat-card" onclick="loadPage('referrals')">
      <div class="stat-card-header">
        <div class="stat-card-icon blue">👥</div>
        <span class="stat-card-trend up">+${d.todayClicks}</span>
      </div>
      <div class="stat-card-value">${d.referrals}</div>
      <div class="stat-card-label">إجمالي الإحالات</div>
    </div>
    <div class="stat-card" onclick="loadPage('products')">
      <div class="stat-card-header">
        <div class="stat-card-icon purple">⏳</div>
      </div>
      <div class="stat-card-value">${d.pending} <small>ج.م</small></div>
      <div class="stat-card-label">أرباح معلقة</div>
      <div class="stat-card-progress">متبقي ${d.nextPayout} زائر للدفعة التالية</div>
    </div>
    <div class="stat-card" onclick="loadPage('products')">
      <div class="stat-card-header">
        <div class="stat-card-icon orange">🔗</div>
        <span class="stat-card-trend up">+${d.todayClicks}</span>
      </div>
      <div class="stat-card-value">${d.clicks.toLocaleString()}</div>
      <div class="stat-card-label">إجمالي الزوار</div>
    </div>`;
}

function renderTopProducts(products) {
  const container = document.getElementById('overview-dynamic');
  if (!container || products.length === 0) return;
  const html = `
    <div class="section">
      <div class="section-header">
        <h3>🔥 المنتجات الأكثر طلباً</h3>
      </div>
      <div class="top-products-list">
        ${products.map((p, i) => `
          <div class="top-product-item" onclick="copyProductLink('${getProductShareLink(p.url)}','${p.name}')">
            <div class="top-product-rank">#${i + 1}</div>
            <img src="${p.img}" alt="${p.name}" class="top-product-img" onerror="this.style.display='none'">
            <div class="top-product-info">
              <div class="top-product-name">${p.name}</div>
              <div class="top-product-clicks">${p.clicks} نقرة</div>
            </div>
            <div class="top-product-price">${p.price} ج.م</div>
          </div>
        `).join('')}
      </div>
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
}

function renderSocialProof(affiliates) {
  const container = document.getElementById('overview-dynamic');
  if (!container || affiliates.length === 0) return;
  const html = `
    <div class="section">
      <div class="section-header">
        <h3>🏆 أفضل الشريكاء</h3>
      </div>
      <div class="social-proof-list">
        ${affiliates.map(a => `
          <div class="social-proof-item">
            <div class="social-proof-avatar">${a.name.charAt(0)}</div>
            <div class="social-proof-info">
              <div class="social-proof-name">${a.name}</div>
              <div class="social-proof-earnings">${a.earnings} ج.م أرباح</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  container.insertAdjacentHTML('beforeend', html);
}

// ===== INIT DARK MODE ON LOAD =====
initDarkMode();
