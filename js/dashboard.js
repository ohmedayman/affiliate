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
  {name:'برونزي',emoji:'🥉',min:0,color:'#cd7f32',commissionRate:0.25},
  {name:'فضي',emoji:'🥈',min:10,color:'#c0c0c0',commissionRate:0.27},
  {name:'ذهبي',emoji:'🥇',min:25,color:'#ffd700',commissionRate:0.29},
  {name:'الماس',emoji:'💎',min:50,color:'#b9f2ff',commissionRate:0.30}
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
const DEFAULT_VIDEOS = [
  {id:'v1',title:'ازاي تبدأ في برنامج العمولة',desc:'دليل المبتدئين الكامل للاستخدام',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',views:0,createdAt:new Date()},
  {id:'v2',title:'كيف تشارك على فيسبوك',desc:'أسرار المبيعات على السوشيال ميديا',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',views:0,createdAt:new Date()},
  {id:'v3',title:'واتساب كورس تسويق',desc:'ازاي تستخدم واتساب في البيع',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',views:0,createdAt:new Date()},
  {id:'v4',title:'بناء استراتيجية تسويقية',desc:'خطط تسويق احترافية',url:'https://www.youtube.com/embed/dQw4w9WgXcQ',views:0,createdAt:new Date()},
];

// ===== FIREBASE REALTIME LISTENERS =====
let unsubscribers = [];
function setupRealtimeListeners() {
  unsubscribers.forEach(u => { try{u()}catch(e){} });
  unsubscribers = [];

  // Listen to affiliate data changes
  const affUnsub = db.collection('affiliates').doc(currentUser.uid).onSnapshot(doc => {
    if (doc.exists) {
      affiliateData = doc.data();
      updateUserUI();
      if (currentPage === 'overview') loadPage('overview');
    }
  }, e => console.error('Affiliate listener error:', e));
  unsubscribers.push(affUnsub);

  // Listen to notifications
  const notifUnsub = db.collection('notifications').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').limit(50).onSnapshot(snap => {
    let unread = 0;
    snap.forEach(d => { if (!d.data().read) unread++; });
    document.getElementById('notif-count').textContent = unread > 0 ? unread : '';
    document.getElementById('notif-count').style.display = unread > 0 ? 'inline' : 'none';
  }, e => console.error('Notifications listener error:', e));
  unsubscribers.push(notifUnsub);

  // Listen to messages
  const chatUnsub = db.collection('messages').where('affiliateId','==',currentUser.uid).orderBy('createdAt','asc').onSnapshot(snap => {
    if (currentPage === 'chat') renderChatMessages(snap);
  }, e => console.error('Chat listener error:', e));
  unsubscribers.push(chatUnsub);

  // Listen to videos
  const vidUnsub = db.collection('videos').orderBy('createdAt','desc').onSnapshot(snap => {
    if (currentPage === 'videos') renderVideos(snap);
  }, e => console.error('Videos listener error:', e));
  unsubscribers.push(vidUnsub);

  // Listen to conversions for live stats
  const convUnsub = db.collection('conversions').where('affiliateId','==',currentUser.uid).onSnapshot(snap => {
    let earnings = 0, conversions = 0;
    snap.forEach(d => { earnings += d.data().commission||0; conversions++; });
    if (currentPage === 'overview') updateOverviewStats(conversions, earnings);
  }, e => console.error('Conversions listener error:', e));
  unsubscribers.push(convUnsub);
}

function updateOverviewStats(conversions, earnings) {
  const earningsEl = document.querySelector('.stat-value.earnings');
  const convEl = document.querySelector('.stat-value.conversions');
  if (earningsEl) earningsEl.textContent = earnings + ' ج.م';
  if (convEl) convEl.textContent = conversions;
}

// ===== AUTH =====
auth.onAuthStateChanged(async (user) => {
  if (!user) { window.location.href = 'auth.html'; return; }
  currentUser = user;
  await loadAffiliateData();
  setupRealtimeListeners();
  loadPage('overview');
  setupPullToRefresh();
  setupGestures();
  registerServiceWorker();
});

async function loadAffiliateData() {
  try {
    const doc = await db.collection('affiliates').doc(currentUser.uid).get();
    if (doc.exists) {
      affiliateData = doc.data();
    } else {
      const refCode = (currentUser.displayName || 'user').replace(/\s+/g,'').toLowerCase() + Math.floor(Math.random()*10000);
      const data = {name:currentUser.displayName||'مستخدم',phone:'',email:currentUser.email,referralCode:refCode,referralsCount:0,totalEarnings:0,pendingPayout:0,paidPayout:0,totalClicks:0,sharesCount:0,platformsCount:0,status:'active',createdAt:firebase.firestore.FieldValue.serverTimestamp()};
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
  const refEl = document.getElementById('ref-count');
  if (nameEl) nameEl.textContent = affiliateData.name;
  if (avatarEl) avatarEl.textContent = affiliateData.name.charAt(0);
  const tier = getCurrentTier();
  if (tierEl) tierEl.textContent = tier.emoji + ' ' + tier.name;
  if (refEl) refEl.textContent = affiliateData.referralsCount || 0;
}

function getCurrentTier() {
  const count = affiliateData?.referralsCount || 0;
  let tier = TIERS[0];
  for (const t of TIERS) { if (count >= t.min) tier = t; }
  return tier;
}

function getShareLink() {
  return `https://affiliate.milanof16.com/go.html?ref=${affiliateData?.referralCode}`;
}

function getProductShareLink(productUrl) {
  return `https://affiliate.milanof16.com/go.html?ref=${affiliateData?.referralCode}&url=${encodeURIComponent(productUrl)}`;
}

// ===== NAVIGATION =====
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page) {
      loadPage(page);
      document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // Close mobile nav
      document.querySelector('.sidebar').classList.remove('mobile-open');
    }
  });
});

function loadPage(page) {
  currentPage = page;
  const content = document.getElementById('page-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(10px)';
  setTimeout(() => {
    const loaders = {overview:loadOverview,referrals:loadReferrals,products:loadProducts,leaderboard:loadLeaderboard,payouts:loadPayouts,coupons:loadCoupons,marketing:loadMarketing,badges:loadBadges,training:loadTraining,videos:loadVideos,chat:loadChat,notifications:loadNotifications,settings:loadSettings};
    if (loaders[page]) loaders[page](content);
    content.style.transition = 'all 0.3s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }, 150);
}

// ===== OVERVIEW =====
async function loadOverview(c) {
  const shareLink = getShareLink();
  let clicks = 0, conversions = 0, earnings = 0, todayClicks = 0;
  try {
    const today = new Date(); today.setHours(0,0,0,0);
    const clicksSnap = await db.collection('clicks').where('affiliateId','==',currentUser.uid).get();
    clicks = clicksSnap.size;
    clicksSnap.forEach(d => { if (d.data().createdAt?.toDate() >= today) todayClicks++; });
    const convSnap = await db.collection('conversions').where('affiliateId','==',currentUser.uid).get();
    conversions = convSnap.size;
    convSnap.forEach(d => { earnings += d.data().commission||0; });
  } catch(e){}

  // Calculate earnings based on clicks (20 EGP per 1000 clicks)
  const calculatedEarnings = Math.floor(clicks / 1000) * 20;
  const pendingEarnings = (clicks % 1000) * 0.02; // 0.02 EGP per click

  const chartData = await getChartData(7);

  c.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;gap:.5rem">
        <div class="live-dot"></div>
        <div><h1>مرحباً ${affiliateData?.name||''} 👋</h1><p class="subtitle">إليك ملخص أرباحك - 20 ج.م لكل 1000 زائر</p></div>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card touch-feedback" onclick="loadPage('payouts')">
        <div class="stat-bg">💰</div>
        <div class="stat-header"><div class="stat-icon green">💰</div><span class="stat-change up">+12%</span></div>
        <div class="stat-value earnings">${calculatedEarnings} ج.م</div>
        <div class="stat-label">إجمالي الأرباح</div>
      </div>
      <div class="stat-card touch-feedback" onclick="loadPage('referrals')">
        <div class="stat-bg">👥</div>
        <div class="stat-header"><div class="stat-icon blue">👥</div><span class="stat-change up">+${affiliateData?.referralsCount||0}</span></div>
        <div class="stat-value conversions">${affiliateData?.referralsCount||0}</div>
        <div class="stat-label">إجمالي الإحالات</div>
      </div>
      <div class="stat-card touch-feedback" onclick="loadPage('payouts')">
        <div class="stat-bg">⏳</div>
        <div class="stat-header"><div class="stat-icon orange">⏳</div></div>
        <div class="stat-value">${pendingEarnings.toFixed(2)} ج.م</div>
        <div class="stat-label">أرباح معلقة (${clicks % 1000} زائر)</div>
      </div>
      <div class="stat-card touch-feedback" onclick="loadPage('referrals')">
        <div class="stat-bg">🔗</div>
        <div class="stat-header"><div class="stat-icon purple">🔗</div><span class="stat-change up">+${todayClicks}</span></div>
        <div class="stat-value">${clicks}</div>
        <div class="stat-label">إجمالي الزوار</div>
      </div>
    </div>
    <div class="referral-box">
      <div class="referral-label">🔗 رابط الإحالة:</div>
      <input type="text" id="referral-link" readonly value="${shareLink}" onclick="this.select()">
      <div class="share-buttons">
        <button class="share-btn whatsapp touch-feedback" onclick="shareWhatsApp()" title="واتساب">💬</button>
        <button class="share-btn facebook touch-feedback" onclick="shareFacebook()" title="فيسبوك">📘</button>
        <button class="share-btn telegram touch-feedback" onclick="shareTelegram()" title="تيليجرام">✈️</button>
        <button class="share-btn twitter touch-feedback" onclick="shareTwitter()" title="تويتر">🐦</button>
        <button class="share-btn copy touch-feedback" onclick="copyLink()" title="نسخ">📋</button>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-header"><h3>📈 النقرات - آخر 7 أيام</h3><div class="live-dot"></div></div>
      <div class="chart-area" id="chart-area"></div>
      <div class="chart-labels" id="chart-labels"></div>
    </div>
    <div class="two-col">
      <div class="table-container">
        <div class="table-header"><h2>آخر الإحالات</h2><div class="live-dot"></div></div>
        <div class="table-wrapper"><table><thead><tr><th>التاريخ</th><th>العميل</th><th>الحالة</th><th>العمولة</th></tr></thead><tbody id="recent-referrals"></tbody></table></div>
      </div>
      <div class="table-container">
        <div class="table-header"><h2>🏅 التقدم نحو الشارة التالية</h2></div>
        <div style="padding:1.5rem" id="tier-progress"></div>
      </div>
    </div>`;
  renderChart(chartData);
  renderTierProgress();
  loadRecentReferrals();
}

async function getChartData(days) {
  const data = [];
  const today = new Date();
  for (let i = days-1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate()-i);
    d.setHours(0,0,0,0);
    const next = new Date(d); next.setDate(next.getDate()+1);
    try {
      const snap = await db.collection('clicks').where('affiliateId','==',currentUser.uid).where('createdAt','>=',d).where('createdAt','<',next).get();
      data.push({label:d.toLocaleDateString('ar-EG',{weekday:'short'}),value:snap.size});
    } catch(e) { data.push({label:d.toLocaleDateString('ar-EG',{weekday:'short'}),value:0}); }
  }
  return data;
}

function renderChart(data) {
  const area = document.getElementById('chart-area');
  const labels = document.getElementById('chart-labels');
  if (!area || !data.length) return;
  const max = Math.max(...data.map(d=>d.value),1);
  area.innerHTML = data.map(d => `<div class="chart-bar" style="height:${(d.value/max)*100}%;background:${d.value>0?'linear-gradient(180deg,#1a73e8,#42a5f5)':'#e8f0fe'}"><div class="bar-tooltip">${d.value} نقرة</div></div>`).join('');
  labels.innerHTML = data.map(d => `<span>${d.label}</span>`).join('');
}

function renderTierProgress() {
  const el = document.getElementById('tier-progress');
  if (!el) return;
  const count = affiliateData?.referralsCount||0;
  let nextTier = null;
  for (const t of TIERS) { if (count < t.min) { nextTier = t; break; } }
  if (!nextTier) { el.innerHTML = '<div style="text-align:center;padding:1rem"><div style="font-size:3rem">💎</div><h3 style="margin:.5rem 0">وصلت أعلى مستوى!</h3><p style="color:var(--text-secondary)">مبروك! أنت في مستوى الماس</p></div>'; return; }
  const prevMin = TIERS[TIERS.indexOf(nextTier)-1]?.min||0;
  const progress = ((count-prevMin)/(nextTier.min-prevMin))*100;
  el.innerHTML = `<div style="text-align:center;margin-bottom:1rem"><p>متبقي <strong>${nextTier.min-count}</strong> إحالة تاني عشان توصل مستوى <strong>${nextTier.emoji} ${nextTier.name}</strong></p></div><div class="progress-bar" style="height:12px"><div class="progress-bar-fill" style="width:${Math.min(progress,100)}%"></div></div><p style="text-align:center;margin-top:.5rem;font-size:.8rem;color:var(--text-secondary)">${count}/${nextTier.min} إحالة</p>`;
}

async function loadRecentReferrals() {
  const tbody = document.getElementById('recent-referrals');
  if (!tbody) return;
  try {
    const snap = await db.collection('conversions').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').limit(5).get();
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-secondary);padding:2rem">لا توجد إحالات بعد</td></tr>'; return; }
    let html = '';
    snap.forEach(doc => { const d = doc.data(); const date = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'; const sc = d.status==='approved'?'status-approved':d.status==='paid'?'status-paid':'status-pending'; const st = d.status==='approved'?'مقبول':d.status==='paid'?'مدفوع':'قيد المراجعة'; html += `<tr><td>${date}</td><td>${d.customerName||'عميل'}</td><td><span class="status-badge ${sc}">${st}</span></td><td>${d.commission||0} ج.م</td></tr>`; });
    tbody.innerHTML = html;
  } catch(e) { tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary)">خطأ</td></tr>'; }
}

// ===== REFERRALS =====
async function loadReferrals(c) {
  c.innerHTML = `<div class="page-header"><h1>👥 الإحالات</h1></div><div class="referral-box"><div class="referral-label">🔗 رابط الإحالة:</div><input type="text" id="referral-link" readonly value="${getShareLink()}" onclick="this.select()"><div class="share-buttons"><button class="share-btn whatsapp touch-feedback" onclick="shareWhatsApp()">💬</button><button class="share-btn facebook touch-feedback" onclick="shareFacebook()">📘</button><button class="share-btn copy touch-feedback" onclick="copyLink()">📋</button></div></div><div class="table-container"><div class="table-header"><h2>كل الإحالات</h2><div class="live-dot"></div></div><div class="table-wrapper"><table><thead><tr><th>#</th><th>التاريخ</th><th>العميل</th><th>المنتج</th><th>الحالة</th><th>العمولة</th></tr></thead><tbody id="all-referrals"><tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-secondary)">جاري التحميل...</td></tr></tbody></table></div></div>`;
  try {
    const snap = await db.collection('conversions').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').get();
    const tbody = document.getElementById('all-referrals');
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-secondary)">لا توجد إحالات بعد. شارك رابط الإحالة!</td></tr>'; return; }
    let html = '', i = 1;
    snap.forEach(doc => { const d = doc.data(); const date = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'; const sc = d.status==='approved'?'status-approved':d.status==='paid'?'status-paid':d.status==='rejected'?'status-rejected':'status-pending'; const st = d.status==='approved'?'مقبول':d.status==='paid'?'مدفوع':d.status==='rejected'?'مرفوض':'قيد المراجعة'; html += `<tr><td>${i++}</td><td>${date}</td><td>${d.customerName||'عميل'}</td><td>${d.productName||'-'}</td><td><span class="status-badge ${sc}">${st}</span></td><td>${d.commission||0} ج.م</td></tr>`; });
    tbody.innerHTML = html;
  } catch(e) {}
}

// ===== PRODUCTS =====
function loadProducts(c) {
  c.innerHTML = `<div class="page-header"><div><h1>📦 المنتجات</h1><p class="subtitle">شارك رابط المنتج واحصل على 20 ج.م لكل 1000 زائر</p></div></div><div class="products-grid">${PRODUCTS.map(p => {
    const shareLink = getProductShareLink(p.url);
    return `<div class="product-card touch-feedback">
      <div class="product-img-wrap" style="background:#f8f9fa;padding:.5rem;border-radius:var(--radius-sm)">
        <img src="${p.img}" alt="${p.name}" style="max-height:170px;object-fit:contain;border-radius:8px" loading="lazy" onerror="this.style.display='none';this.parentElement.innerHTML='<div style=\\'font-size:4rem\\'>📦</div>'">
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="product-sku">SKU: ${p.sku}</div>
        <div class="product-price">${p.price} ج.م</div>
        <div class="product-commission">20 ج.م لكل 1000 زائر</div>
        <div class="product-actions" style="flex-direction:column;gap:.5rem">
          <button class="btn btn-primary btn-sm btn-block" onclick="copyProductLink('${shareLink}','${p.name}')">
            <i class="fi fi-rr-link"></i> نسخ رابط الربح
          </button>
          <a href="${p.url}" target="_blank" class="btn btn-ghost btn-sm btn-block">عرض المنتج</a>
        </div>
      </div>
    </div>`;
  }).join('')}</div>`;
}

function copyProductLink(link, productName) {
  navigator.clipboard.writeText(link).then(() => {
    showToast(`تم نسخ رابط ${productName} ✅`, 'success');
    logShare('product_link');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast(`تم نسخ رابط ${productName} ✅`, 'success');
  });
}

// ===== LEADERBOARD =====
async function loadLeaderboard(c) {
  c.innerHTML = `<div class="page-header"><h1>🏆 الترتيب</h1><div class="live-dot"></div></div><div class="leaderboard-list" id="leaderboard-list"><div style="text-align:center;padding:3rem;color:var(--text-secondary)"><div class="spinner spinner-dark"></div></div></div>`;
  try {
    const snap = await db.collection('affiliates').orderBy('totalEarnings','desc').limit(20).get();
    const list = document.getElementById('leaderboard-list');
    let html = '', rank = 1;
    snap.forEach(doc => { const d = doc.data(); const topClass = rank<=3?`top-${rank}`:''; const rc = rank===1?'rank-gold':rank===2?'rank-silver':rank===3?'rank-bronze':'rank-default'; const tier = (() => { let t = TIERS[0]; for(const tt of TIERS){if(d.referralsCount>=tt.min)t=tt;} return t; })(); html += `<div class="leaderboard-item ${topClass} touch-feedback"><div class="leaderboard-rank ${rc}">${rank<=3?['🥇','🥈','🥉'][rank-1]:rank}</div><div class="leaderboard-info"><div class="leaderboard-name">${d.name}</div><div class="leaderboard-tier">${tier.emoji} ${tier.name} • ${d.referralsCount||0} إحالة</div></div><div class="leaderboard-earnings">${d.totalEarnings||0} ج.م</div></div>`; rank++; });
    list.innerHTML = html || '<div style="text-align:center;padding:3rem;color:var(--text-secondary)">لا يوجد شركاء بعد</div>';
  } catch(e) {}
}

// ===== PAYOUTS =====
async function loadPayouts(c) {
  c.innerHTML = `<div class="page-header"><h1>💰 المدفوعات</h1></div><div class="payout-summary"><div class="payout-card"><div class="amount" style="color:var(--primary)">${affiliateData?.totalEarnings||0}</div><div class="label">إجمالي الأرباح (ج.م)</div></div><div class="payout-card"><div class="amount" style="color:var(--warning)">${affiliateData?.pendingPayout||0}</div><div class="label">أرباح معلقة (ج.م)</div></div><div class="payout-card"><div class="amount" style="color:var(--success)">${affiliateData?.paidPayout||0}</div><div class="label">تم دفعها (ج.م)</div></div></div><button class="btn btn-primary btn-block" onclick="requestPayout()" style="margin-bottom:1.2rem">💸 طلب سحب أرباح</button><div class="table-container"><div class="table-header"><h2>سجل المدفوعات</h2><div class="live-dot"></div></div><div class="table-wrapper"><table><thead><tr><th>التاريخ</th><th>المبلغ</th><th>طريقة الدفع</th><th>الحالة</th></tr></thead><tbody id="payouts-table"><tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary)">لا توجد مدفوعات بعد</td></tr></tbody></table></div></div>`;
  try {
    const snap = await db.collection('payouts').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').get();
    if (!snap.empty) { const tbody = document.getElementById('payouts-table'); let html = ''; snap.forEach(doc => { const d = doc.data(); const date = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'; const sc = d.status==='paid'?'status-paid':'status-pending'; const st = d.status==='paid'?'تم الدفع':'قيد المعالجة'; html += `<tr><td>${date}</td><td>${d.amount} ج.م</td><td>${d.method||'فودافون كاش'}</td><td><span class="status-badge ${sc}">${st}</span></td></tr>`; }); tbody.innerHTML = html; }
  } catch(e) {}
}

// ===== COUPONS =====
function loadCoupons(c) {
  const code = (affiliateData?.referralCode||'USER').toUpperCase();
  c.innerHTML = `<div class="page-header"><h1>🎟️ كوبوناتي</h1></div><div class="coupon-card"><div style="font-size:1.2rem;position:relative;margin-bottom:.5rem">كوبون خصم خاص</div><div class="coupon-code">${code}</div><div class="coupon-discount">خصم <strong>5%</strong> على كل المنتجات</div><p style="text-align:center;margin-top:1rem;opacity:.8;position:relative;font-size:.9rem">شارك الكوبون مع أصحابك واكسب عمولة إضافية!</p></div><div class="alert alert-info" style="margin-top:1rem">💡 الكوبون بتاعك بيخلي العميل ياخد خصم 5% وأنت بتاخد عمولتك العادية!</div>`;
}

// ===== MARKETING =====
function loadMarketing(c) {
  const link = getShareLink();
  const messages = [
    {title:'رسالة واتساب',icon:'💬',text:`🔥 ميلانو F16 - الحل الأقوى للقضاء على الحشرات!\n\n✅ شحن مجاني فوق 3000 جنيه\n✅ منتجات أصلية مضمونة\n✅ أسعار تبدأ من 20 جنيه\n\n📦 اطلب دلوقتي:\n${link}`,class:'whatsapp'},
    {title:'منشور فيسبوك',icon:'📘',text:`🛡️ ميلانو F16 - مش هتلاقي منتج أقوى من كده للقضاء على الصراصير والبق والنمل!\n\n📦 شحن مجاني\n💰 أسعار تبدأ من 20 جنيه\n🔒 منتجات أصلية\n\n🛒 اطلب من هنا:\n${link}`,class:'facebook'},
    {title:'رسالة تيليجرام',icon:'✈️',text:`🪳 عايز تخلص من الحشرات نهائياً؟\n\nميلانو F16 - المبيد الأقوى في مصر!\n\n📦 شحن مجاني | 💰 أسعار من 20 ج.م\n\n🔗 ${link}`,class:'telegram'},
  ];
  c.innerHTML = `<div class="page-header"><h1>📣 مواد تسويقية</h1></div><p style="color:var(--text-secondary);margin-bottom:1.5rem">استخدم الرسائل دي في مشاركة المنتجات. كل رسالة جاهزة للنسخ والمشاركة!</p>${messages.map(m => `<div class="table-container" style="margin-bottom:1rem"><div class="table-header"><h2>${m.icon} ${m.title}</h2><button class="btn btn-sm btn-primary touch-feedback" onclick="copyText(this)" data-text="${encodeURIComponent(m.text)}">📋 نسخ</button></div><div style="padding:1.5rem;white-space:pre-line;color:var(--text-secondary);font-size:.9rem;line-height:1.8">${m.text}</div></div>`).join('')}<div class="table-container"><div class="table-header"><h2>🔗 روابط مباشرة للمنتجات</h2></div><div style="padding:1rem">${PRODUCTS.map(p => `<div style="display:flex;justify-content:space-between;align-items:center;padding:.8rem 0;border-bottom:1px solid var(--border)"><span style="font-size:.85rem">${p.name}</span><button class="btn btn-sm btn-ghost touch-feedback" onclick="copyText(this)" data-text="${encodeURIComponent(link)}">نسخ</button></div>`).join('')}</div></div>`;
}

// ===== BADGES =====
function loadBadges(c) {
  const count = affiliateData?.referralsCount||0;
  const earnings = affiliateData?.totalEarnings||0;
  c.innerHTML = `<div class="page-header"><h1>🏅 الشارات والإنجازات</h1></div><div class="badges-grid">${BADGES.map(b => { let progress = 0; if (b.field==='referralsCount') progress = count; else if (b.field==='totalEarnings') progress = earnings; else if (b.field==='rank') progress = 0; else progress = 0; const earned = progress >= b.requirement; const pct = Math.min((progress/b.requirement)*100,100); return `<div class="badge-card ${earned?'earned':'locked'} touch-feedback"><div class="badge-icon">${b.icon}</div><div class="badge-name">${b.name}</div><div class="badge-desc">${b.desc}</div><div class="badge-progress"><div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div><p style="font-size:.7rem;color:var(--text-secondary);margin-top:.3rem">${earned?'تم الإنجاز ✅':`${progress}/${b.requirement}`}</p></div></div>`; }).join('')}</div>`;
}

// ===== TRAINING =====
function loadTraining(c) {
  c.innerHTML = `<div class="page-header"><h1>📚 التدريب والتطوير</h1></div><p style="color:var(--text-secondary);margin-bottom:1.5rem">شوف الفيديوهات التعليمية عشان تزود مبيعاتك!</p><div class="training-grid" id="training-grid"><div style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></div></div>`;
  loadTrainingVideos();
}

async function loadTrainingVideos() {
  const grid = document.getElementById('training-grid');
  if (!grid) return;
  try {
    const snap = await db.collection('videos').orderBy('createdAt','desc').get();
    if (snap.empty) {
      grid.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-secondary)"><div style="font-size:3rem;margin-bottom:1rem">📚</div><p>لا توجد فيديوهات بعد. راجع تاني بعدين!</p></div>`;
      return;
    }
    let html = '';
    snap.forEach(doc => {
      const v = doc.data();
      const embedUrl = convertToEmbedUrl(v.url);
      html += `<div class="training-card touch-feedback">
        <div class="training-thumb" style="background:#000">
          <iframe src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="training-info">
          <h3>${v.title}</h3>
          <p>${v.desc||''}</p>
          <div class="training-meta">
            <span>👁️ ${v.views||0} مشاهدة</span>
            <span>📅 ${v.createdAt?.toDate?.()?.toLocaleDateString('ar-EG')||''}</span>
          </div>
        </div>
      </div>`;
    });
    grid.innerHTML = html;
  } catch(e) {
    grid.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-secondary)">خطأ في تحميل الفيديوهات</div>`;
  }
}

function convertToEmbedUrl(url) {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const fbMatch = url.match(/facebook\.com.*\/videos\/(\d+)/);
  if (fbMatch) return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
  return url;
}

// ===== VIDEOS (standalone page) =====
function loadVideos(c) {
  c.innerHTML = `<div class="page-header"><h1>🎬 الفيديوهات التعليمية</h1></div><p style="color:var(--text-secondary);margin-bottom:1.5rem">شوف الفيديوهات التعليمية عشان تlearn أزاي تبيع أكتر!</p><div class="video-grid" id="video-grid"><div style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></div></div>`;
  loadVideosGrid();
}

async function loadVideosGrid() {
  const grid = document.getElementById('video-grid');
  if (!grid) return;
  try {
    const snap = await db.collection('videos').orderBy('createdAt','desc').get();
    if (snap.empty) {
      grid.innerHTML = DEFAULT_VIDEOS.map(v => {
        const embedUrl = convertToEmbedUrl(v.url);
        return `<div class="video-card touch-feedback">
          <div class="video-thumb">
            <iframe src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>
          </div>
          <div class="video-info">
            <h3>${v.title}</h3>
            <p>${v.desc}</p>
            <div class="video-meta"><span>👁️ 0 مشاهدة</span></div>
          </div>
        </div>`;
      }).join('');
      return;
    }
    let html = '';
    snap.forEach(doc => {
      const v = doc.data();
      const embedUrl = convertToEmbedUrl(v.url);
      html += `<div class="video-card touch-feedback">
        <div class="video-thumb">
          <iframe src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="video-info">
          <h3>${v.title}</h3>
          <p>${v.desc||''}</p>
          <div class="video-meta">
            <span>👁️ ${v.views||0} مشاهدة</span>
            <span>📅 ${v.createdAt?.toDate?.()?.toLocaleDateString('ar-EG')||''}</span>
          </div>
        </div>
      </div>`;
    });
    grid.innerHTML = html;
  } catch(e) {
    grid.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-secondary)">خطأ في تحميل الفيديوهات</div>`;
  }
}

function renderVideos(snap) {
  const grid = document.getElementById('video-grid');
  if (!grid) return;
  if (snap.empty) {
    grid.innerHTML = DEFAULT_VIDEOS.map(v => {
      const embedUrl = convertToEmbedUrl(v.url);
      return `<div class="video-card touch-feedback">
        <div class="video-thumb">
          <iframe src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>
        <div class="video-info">
          <h3>${v.title}</h3>
          <p>${v.desc}</p>
          <div class="video-meta"><span>👁️ 0 مشاهدة</span></div>
        </div>
      </div>`;
    }).join('');
    return;
  }
  let html = '';
  snap.forEach(doc => {
    const v = doc.data();
    const embedUrl = convertToEmbedUrl(v.url);
    html += `<div class="video-card touch-feedback">
      <div class="video-thumb">
        <iframe src="${embedUrl}" frameborder="0" allowfullscreen loading="lazy"></iframe>
      </div>
      <div class="video-info">
        <h3>${v.title}</h3>
        <p>${v.desc||''}</p>
        <div class="video-meta">
          <span>👁️ ${v.views||0} مشاهدة</span>
          <span>📅 ${v.createdAt?.toDate?.()?.toLocaleDateString('ar-EG')||''}</span>
        </div>
      </div>
    </div>`;
  });
  grid.innerHTML = html;
}

// ===== CHAT / MESSAGING =====
let chatUnsubRealtime = null;

function loadChat(c) {
  c.innerHTML = `<div class="page-header"><h1>💬 الرسائل</h1><div style="display:flex;align-items:center;gap:.5rem"><div class="live-dot"></div><span style="font-size:.8rem;color:var(--text-secondary)">متصل</span></div></div><div class="chat-container"><div class="chat-messages" id="chat-messages"><div style="text-align:center;padding:2rem;color:var(--text-secondary)"><p>ابعت رسالة للأدمن وهرد عليك!</p></div></div><div class="chat-input-area"><textarea id="chat-input" placeholder="اكتب رسالتك هنا..." rows="1" oninput="autoResizeTextarea(this)" onkeydown="handleChatKeydown(event)"></textarea><button class="chat-send-btn" onclick="sendChatMessage()" id="chat-send">📤</button></div></div>`;
  setupChatListener();
  setupRealtimeChat();
}

function setupChatListener() {
  if (chatUnsubRealtime) { try{chatUnsubRealtime()}catch(e){} }
  chatUnsubRealtime = db.collection('messages').where('affiliateId','==',currentUser.uid).orderBy('createdAt','asc').onSnapshot(snap => {
    renderChatMessages(snap);
  }, e => console.error('Chat listener error:', e));
  unsubscribers.push(() => { if(chatUnsubRealtime) try{chatUnsubRealtime()}catch(e){} });
}

function setupRealtimeChat() {
  // Additional listener for real-time updates
  db.collection('messages').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').limit(1).onSnapshot(snap => {
    snap.forEach(doc => {
      const msg = doc.data();
      if (msg.sender === 'admin') {
        // Show notification for new admin messages
        if (Notification.permission === 'granted') {
          new Notification('رسالة جديدة من الإدارة', {body: msg.text, icon: LOGO_URL});
        }
      }
    });
  });
}

function renderChatMessages(snap) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  if (snap.empty) {
    container.innerHTML = `<div style="text-align:center;padding:2rem"><div style="font-size:3rem;margin-bottom:1rem">💬</div><p style="color:var(--text-secondary)">ابعت رسالة للأدمن وهرد عليك!</p><p style="font-size:.8rem;color:var(--text-secondary);margin-top:.5rem">ممكن تبعت سؤال، مشكلة، أو أي حاجة</p></div>`;
    return;
  }
  let html = '';
  snap.forEach(doc => {
    const msg = doc.data();
    const time = msg.createdAt?.toDate?.()?.toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'})||'';
    const isSent = msg.sender === 'affiliate';
    html += `<div class="chat-msg ${isSent?'sent':'received'}">
      <div>${msg.text}</div>
      <span class="msg-time">${time}</span>
    </div>`;
  });
  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
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
    // Add to notifications for admin
    await db.collection('admin_notifications').add({
      type: 'new_message',
      affiliateId: currentUser.uid,
      affiliateName: affiliateData?.name || 'مستخدم',
      message: text,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) {
    showToast('حدث خطأ في إرسال الرسالة', 'error');
  }
}

function handleChatKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendChatMessage();
  }
}

function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 100) + 'px';
}

// ===== NOTIFICATIONS =====
function loadNotifications(c) {
  c.innerHTML = `<div class="page-header"><h1>🔔 الإشعارات</h1></div><div id="notifications-page"><div style="text-align:center;padding:3rem;color:var(--text-secondary)">جاري تحميل الإشعارات...</div></div>`;
  loadNotificationsList('notifications-page');
  // Mark as read
  setTimeout(async () => {
    try {
      const snap = await db.collection('notifications').where('affiliateId','==',currentUser.uid).where('read','==',false).get();
      snap.forEach(async doc => { await doc.ref.update({read:true}); });
    } catch(e){}
  }, 2000);
}

async function loadNotificationsList(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const snap = await db.collection('notifications').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').limit(50).get();
    if (snap.empty) { el.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-secondary)"><div style="font-size:3rem;margin-bottom:1rem">🔔</div><p>لا توجد إشعارات بعد</p></div>'; return; }
    let html = '';
    snap.forEach(doc => { const d = doc.data(); const time = d.createdAt?.toDate()?.toLocaleDateString('ar-EG',{hour:'2-digit',minute:'2-digit'})||'-'; html += `<div class="notif-item ${d.read?'':'unread'}"><div class="notif-dot" style="display:${d.read?'none':'block'}"></div><div class="notif-content" style="flex:1"><div class="notif-text">${d.message}</div><div class="notif-time">${time}</div></div></div>`; });
    el.innerHTML = html;
  } catch(e) { el.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-secondary)">لا توجد إشعارات</div>'; }
}

// ===== SETTINGS =====
function loadSettings(c) {
  c.innerHTML = `<div class="page-header"><h1>⚙️ الإعدادات</h1></div><div class="two-col"><div class="table-container" style="padding:2rem"><h2 style="margin-bottom:1.5rem">📝 تعديل البيانات</h2><form id="settings-form" onsubmit="handleUpdateProfile(event)"><div class="form-group"><label>الاسم</label><input type="text" id="settings-name" value="${affiliateData?.name||''}" required></div><div class="form-group"><label>رقم الهاتف</label><input type="tel" id="settings-phone" value="${affiliateData?.phone||''}"></div><div class="form-group"><label>البريد الإلكتروني</label><input type="email" value="${affiliateData?.email||''}" disabled style="background:#f5f5f5"></div><button type="submit" class="btn btn-primary btn-block">💾 حفظ التعديلات</button></form></div><div><div class="table-container" style="padding:2rem"><h2 style="margin-bottom:1.5rem">🔒 تغيير كلمة المرور</h2><form onsubmit="handleChangePassword(event)"><div class="form-group"><label>كلمة المرور الجديدة</label><input type="password" id="new-password" placeholder="6 أحرف على الأقل" required></div><div class="form-group"><label>تأكيد كلمة المرور</label><input type="password" id="confirm-new-password" required></div><button type="submit" class="btn btn-secondary btn-block">🔐 تغيير كلمة المرور</button></form></div><div style="margin-top:1.5rem"><button class="btn btn-danger btn-block" onclick="handleLogout()">🚪 تسجيل الخروج</button></div></div></div>`;
}

async function handleUpdateProfile(e) {
  e.preventDefault();
  const name = document.getElementById('settings-name').value.trim();
  const phone = document.getElementById('settings-phone').value.trim();
  try {
    await db.collection('affiliates').doc(currentUser.uid).update({name,phone});
    affiliateData.name = name;
    affiliateData.phone = phone;
    updateUserUI();
    showToast('تم حفظ التعديلات ✅','success');
  } catch(e) { showToast('حدث خطأ','error'); }
}

async function handleChangePassword(e) {
  e.preventDefault();
  const p = document.getElementById('new-password').value;
  const cp = document.getElementById('confirm-new-password').value;
  if (p.length < 6) { showToast('كلمة المرور 6 أحرف على الأقل','error'); return; }
  if (p !== cp) { showToast('كلمتا المرور غير متطابقتين','error'); return; }
  try { await currentUser.updatePassword(p); showToast('تم تغيير كلمة المرور ✅','success'); } catch(e) { showToast('حدث خطأ - قد تحتاج تسجيل الدخول تاني','error'); }
}

async function handleLogout() {
  unsubscribers.forEach(u => { try{u()}catch(e){} });
  unsubscribers = [];
  await auth.signOut();
  window.location.href = 'auth.html';
}

// ===== SHARING =====
function shareWhatsApp() { const t = `🔥 ميلانو F16 - الحل الأقوى للقضاء على الحشرات!\n📦 شحن مجاني فوق 3000 جنيه\n🛒 اطلب دلوقتي:\n${getShareLink()}`; window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,'_blank'); logShare('whatsapp'); }
function shareFacebook() { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareLink())}`,'_blank'); logShare('facebook'); }
function shareTelegram() { const t = `milano F16 - أقوى مبيد حشري في مصر 🛡️\n${getShareLink()}`; window.open(`https://t.me/share/url?url=${encodeURIComponent(getShareLink())}&text=${encodeURIComponent(t)}`,'_blank'); logShare('telegram'); }
function shareTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('ميلانو F16 - أقوى مبيد حشري 🛡️')}&url=${encodeURIComponent(getShareLink())}`,'_blank'); logShare('twitter'); }
function copyLink() { navigator.clipboard.writeText(getShareLink()); showToast('تم نسخ الرابط ✅','success'); logShare('copy'); }

function shareProduct(name, price, url) {
  const link = getProductShareLink(url);
  const text = `🔥 ${name} بسعر ${price} ج.م من ميلانو F16!\n📦 شحن مجاني\n${link}`;
  if (navigator.share) { navigator.share({title:name,text}).catch(()=>{}); } else { navigator.clipboard.writeText(text); showToast('تم نسخ رابط المشاركة ✅','success'); }
  logShare('product');
}

async function logShare(platform) {
  try {
    await db.collection('clicks').add({affiliateId:currentUser.uid,type:'share',platform,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    const updates = {sharesCount:(affiliateData.sharesCount||0)+1};
    if (!affiliateData.platformsCount) updates.platformsCount = 1;
    await db.collection('affiliates').doc(currentUser.uid).update(updates);
    affiliateData.sharesCount = (affiliateData.sharesCount||0)+1;
  } catch(e) {}
}

function copyText(btn) { const text = decodeURIComponent(btn.dataset.text); navigator.clipboard.writeText(text); showToast('تم النسخ ✅','success'); }

// ===== PAYOUT =====
async function requestPayout() {
  if (!affiliateData || affiliateData.pendingPayout < 50) { showToast('الحد الأدنى للسحب هو 50 ج.م','error'); return; }
  const phone = prompt('ادخل رقم فودافون كاش:');
  if (!phone) return;
  try {
    await db.collection('payouts').add({affiliateId:currentUser.uid,amount:affiliateData.pendingPayout,method:'فودافون كاش',phone,status:'pending',createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    await db.collection('affiliates').doc(currentUser.uid).update({pendingPayout:0});
    await db.collection('notifications').add({affiliateId:currentUser.uid,message:`تم طلب سحب ${affiliateData.pendingPayout} ج.م`,read:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    affiliateData.pendingPayout = 0;
    showToast('تم طلب السحب بنجاح! ✅','success');
    loadPage('payouts');
  } catch(e) { showToast('حدث خطأ','error'); }
}

// ===== TOAST =====
function showToast(msg, type='info') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = msg;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('removing'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ===== PULL TO REFRESH =====
function setupPullToRefresh() {
  let startY = 0, pulling = false;
  const content = document.querySelector('.main-content');
  if (!content) return;

  content.addEventListener('touchstart', e => {
    if (content.scrollTop === 0) { startY = e.touches[0].clientY; pulling = true; }
  }, {passive:true});

  content.addEventListener('touchmove', e => {
    if (!pulling) return;
    const diff = e.touches[0].clientY - startY;
    if (diff > 80 && content.scrollTop === 0) {
      showRefreshIndicator();
    }
  }, {passive:true});

  content.addEventListener('touchend', () => {
    const indicator = document.getElementById('ptr-indicator');
    if (indicator && indicator.classList.contains('active')) {
      setTimeout(() => { loadPage(currentPage); hideRefreshIndicator(); }, 1000);
    }
    pulling = false;
  });
}

function showRefreshIndicator() {
  let indicator = document.getElementById('ptr-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'ptr-indicator';
    indicator.className = 'ptr-indicator';
    indicator.innerHTML = '🔄 جاري التحديث...';
    document.body.appendChild(indicator);
  }
  indicator.classList.add('active');
}

function hideRefreshIndicator() {
  const indicator = document.getElementById('ptr-indicator');
  if (indicator) indicator.classList.remove('active');
}

// ===== GESTURES =====
function setupGestures() {
  let touchStartX = 0, touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, {passive:true});

  document.addEventListener('touchend', e => {
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = Math.abs(e.changedTouches[0].clientY - touchStartY);
    if (Math.abs(diffX) > 100 && diffY < 50) {
      if (diffX > 0) {
        // Swipe right - go back
        const pages = ['overview','referrals','products','leaderboard','payouts','coupons','marketing','badges','training','videos','chat','notifications','settings'];
        const idx = pages.indexOf(currentPage);
        if (idx > 0) { loadPage(pages[idx-1]); updateActiveNav(pages[idx-1]); }
      } else {
        // Swipe left - go forward
        const pages = ['overview','referrals','products','leaderboard','payouts','coupons','marketing','badges','training','videos','chat','notifications','settings'];
        const idx = pages.indexOf(currentPage);
        if (idx < pages.length-1) { loadPage(pages[idx+1]); updateActiveNav(pages[idx+1]); }
      }
    }
  });
}

function updateActiveNav(page) {
  document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
  const active = document.querySelector(`.sidebar-nav a[data-page="${page}"]`);
  if (active) active.classList.add('active');
}

// ===== SERVICE WORKER =====
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(e => console.log('SW registration failed'));
  }
}

// ===== PUSH NOTIFICATIONS =====
async function requestNotificationPermission() {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      showToast('تم تفعيل الإشعارات ✅', 'success');
    }
  }
}

// Track page clicks
document.addEventListener('click', async (e) => {
  if (e.target.closest('a[href*="milanof16.com"]')) {
    try { await db.collection('clicks').add({affiliateId:currentUser.uid,type:'product_click',createdAt:firebase.firestore.FieldValue.serverTimestamp()}); } catch(e){}
  }
});

// ===== LIVE SYNC STATUS =====
function showSyncStatus(status) {
  const existing = document.getElementById('sync-status');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.id = 'sync-status';
  el.style.cssText = 'position:fixed;top:0;left:0;right:0;padding:.3rem;text-align:center;font-size:.7rem;z-index:9999;transition:all .3s';
  el.style.background = status === 'connected' ? '#0f9d58' : status === 'syncing' ? '#f9ab00' : '#d93025';
  el.style.color = 'white';
  el.textContent = status === 'connected' ? '✅ متصل - بيانات مباشرة' : status === 'syncing' ? '🔄 جاري المزامنة...' : '❌ غير متصل';
  document.body.appendChild(el);
  if (status !== 'syncing') setTimeout(() => el.remove(), 2000);
}
