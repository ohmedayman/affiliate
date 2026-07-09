let currentUser = null, affiliateData = null, currentPage = 'overview';
const PRODUCTS = [
  {id:'f16-500',name:'اف 16 للصراصير 500مل',price:60,commission:15,emoji:'🪳',sku:'F16-500ML',category:'صراصير',url:'https://milanof16.com/ar/product/all/f16-500ml'},
  {id:'f16-400',name:'اف 16 للصراصير 400مل',price:50,commission:12,emoji:'🪳',sku:'F16-400ML',category:'صراصير',url:'https://milanof16.com/ar/product/all/f16-400ml'},
  {id:'f22-500',name:'اف 22 للنمل 500مل',price:60,commission:15,emoji:'🐜',sku:'F22-500ML',category:'نمل',url:'https://milanof16.com/ar/product/all/f22-500ml'},
  {id:'f22-400',name:'اف 22 للنمل 400مل',price:50,commission:12,emoji:'🐜',sku:'F22-400ML',category:'نمل',url:'https://milanof16.com/ar/product/all/f22-400ml'},
  {id:'f35-650',name:'مبيد اف 35 للبق',price:70,commission:18,emoji:'🐛',sku:'F35-650ML',category:'بق',url:'https://milanof16.com/ar/product/all/f35-650ml'},
  {id:'ringo',name:'رينجو للذباب',price:60,commission:15,emoji:'🪰',sku:'RINGO',category:'ذباب',url:'https://milanof16.com/ar/product/all/ringo'},
  {id:'super777',name:'سوبر 777 لحشرات المواشي',price:50,commission:12,emoji:'🐄',sku:'SUPER777',category:'مواشي',url:'https://milanof16.com/ar/product/all/super777'},
  {id:'giGi',name:'جيجي اسبونج',price:20,commission:5,emoji:'🧽',sku:'GIGI',category:'تنظيف',url:'https://milanof16.com/ar/product/all/جيجي-اسبونج'}
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

auth.onAuthStateChanged(async (user) => {
  if (!user) { window.location.href = 'auth.html'; return; }
  currentUser = user;
  await loadAffiliateData();
  loadPage('overview');
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
  document.getElementById('user-name').textContent = affiliateData.name;
  document.getElementById('user-avatar').textContent = affiliateData.name.charAt(0);
  const tier = getCurrentTier();
  document.getElementById('user-tier').textContent = tier.emoji + ' ' + tier.name;
  document.getElementById('ref-count').textContent = affiliateData.referralsCount || 0;
}

function getCurrentTier() {
  const count = affiliateData?.referralsCount || 0;
  let tier = TIERS[0];
  for (const t of TIERS) { if (count >= t.min) tier = t; }
  return tier;
}

function getShareLink() {
  return `https://affiliate.milanof16.com/?ref=${affiliateData?.referralCode}`;
}

// ===== NAVIGATION =====
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page) { loadPage(page); document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active')); link.classList.add('active'); }
  });
});

function loadPage(page) {
  currentPage = page;
  const content = document.getElementById('page-content');
  const loaders = {overview:loadOverview,referrals:loadReferrals,products:loadProducts,leaderboard:loadLeaderboard,payouts:loadPayouts,coupons:loadCoupons,marketing:loadMarketing,badges:loadBadges,training:loadTraining,notifications:loadNotifications,settings:loadSettings};
  if (loaders[page]) loaders[page](content);
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

  // Chart data (last 7 days)
  const chartData = await getChartData(7);

  c.innerHTML = `
    <div class="page-header"><div><h1>مرحباً ${affiliateData?.name||''} 👋</h1><p class="subtitle">إليك ملخص أرباحك اليوم</p></div></div>
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-bg">💰</div><div class="stat-header"><div class="stat-icon green">💰</div><span class="stat-change up">+12%</span></div><div class="stat-value">${affiliateData?.totalEarnings||0} ج.م</div><div class="stat-label">إجمالي الأرباح</div></div>
      <div class="stat-card"><div class="stat-bg">👥</div><div class="stat-header"><div class="stat-icon blue">👥</div><span class="stat-change up">+${affiliateData?.referralsCount||0}</span></div><div class="stat-value">${affiliateData?.referralsCount||0}</div><div class="stat-label">إجمالي الإحالات</div></div>
      <div class="stat-card"><div class="stat-bg">⏳</div><div class="stat-header"><div class="stat-icon orange">⏳</div></div><div class="stat-value">${affiliateData?.pendingPayout||0} ج.م</div><div class="stat-label">أرباح معلقة</div></div>
      <div class="stat-card"><div class="stat-bg">🔗</div><div class="stat-header"><div class="stat-icon purple">🔗</div><span class="stat-change up">+${todayClicks}</span></div><div class="stat-value">${clicks}</div><div class="stat-label">إجمالي النقرات</div></div>
    </div>
    <div class="referral-box">
      <div class="referral-label">🔗 رابط الإحالة:</div>
      <input type="text" id="referral-link" readonly value="${shareLink}">
      <div class="share-buttons">
        <button class="share-btn whatsapp" onclick="shareWhatsApp()" title="واتساب">💬</button>
        <button class="share-btn facebook" onclick="shareFacebook()" title="فيسبوك">📘</button>
        <button class="share-btn telegram" onclick="shareTelegram()" title="تيليجرام">✈️</button>
        <button class="share-btn twitter" onclick="shareTwitter()" title="تويتر">🐦</button>
        <button class="share-btn copy" onclick="copyLink()" title="نسخ">📋</button>
      </div>
    </div>
    <div class="chart-container">
      <div class="chart-header"><h3>📈 النقرات - آخر 7 أيام</h3></div>
      <div class="chart-area" id="chart-area"></div>
      <div class="chart-labels" id="chart-labels"></div>
    </div>
    <div class="two-col">
      <div class="table-container">
        <div class="table-header"><h2>آخر الإحالات</h2></div>
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
  c.innerHTML = `<div class="page-header"><h1>👥 الإحالات</h1></div><div class="referral-box"><div class="referral-label">🔗 رابط الإحالة:</div><input type="text" id="referral-link" readonly value="${getShareLink()}"><div class="share-buttons"><button class="share-btn whatsapp" onclick="shareWhatsApp()">💬</button><button class="share-btn facebook" onclick="shareFacebook()">📘</button><button class="share-btn copy" onclick="copyLink()">📋</button></div></div><div class="table-container"><div class="table-header"><h2>كل الإحالات</h2></div><div class="table-wrapper"><table><thead><tr><th>#</th><th>التاريخ</th><th>العميل</th><th>المنتج</th><th>الحالة</th><th>العمولة</th></tr></thead><tbody id="all-referrals"><tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-secondary)">جاري التحميل...</td></tr></tbody></table></div></div>`;
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
  c.innerHTML = `<div class="page-header"><div><h1>📦 المنتجات</h1><p class="subtitle">شارك المنتجات واحصل على عمولة من كل عملية بيع</p></div></div><div class="products-grid">${PRODUCTS.map(p => `<div class="product-card"><div class="product-img-wrap" style="background:var(--primary-light)">${p.emoji}</div><div class="product-info"><h3>${p.name}</h3><div class="product-sku">SKU: ${p.sku}</div><div class="product-price">${p.price} ج.م</div><div class="product-commission">عمولتك: ${p.commission} ج.م (${Math.round(p.commission/p.price*100)}%)</div><div class="product-actions"><button class="btn btn-primary btn-sm" onclick="shareProduct('${p.name}',${p.price},'${p.url}')">مشاركة</button><a href="${p.url}" target="_blank" class="btn btn-ghost btn-sm">عرض</a></div></div></div>`).join('')}</div>`;
}

// ===== LEADERBOARD =====
async function loadLeaderboard(c) {
  c.innerHTML = `<div class="page-header"><h1>🏆 الترتيب</h1></div><div class="leaderboard-list" id="leaderboard-list"><div style="text-align:center;padding:3rem;color:var(--text-secondary)"><div class="spinner spinner-dark"></div></div></div>`;
  try {
    const snap = await db.collection('affiliates').orderBy('totalEarnings','desc').limit(20).get();
    const list = document.getElementById('leaderboard-list');
    let html = '', rank = 1;
    snap.forEach(doc => { const d = doc.data(); const topClass = rank<=3?`top-${rank}`:''; const rc = rank===1?'rank-gold':rank===2?'rank-silver':rank===3?'rank-bronze':'rank-default'; const tier = (() => { let t = TIERS[0]; for(const tt of TIERS){if(d.referralsCount>=tt.min)t=tt;} return t; })(); html += `<div class="leaderboard-item ${topClass}"><div class="leaderboard-rank ${rc}">${rank<=3?['🥇','🥈','🥉'][rank-1]:rank}</div><div class="leaderboard-info"><div class="leaderboard-name">${d.name}</div><div class="leaderboard-tier">${tier.emoji} ${tier.name} • ${d.referralsCount||0} إحالة</div></div><div class="leaderboard-earnings">${d.totalEarnings||0} ج.م</div></div>`; rank++; });
    list.innerHTML = html || '<div style="text-align:center;padding:3rem;color:var(--text-secondary)">لا يوجد شركاء بعد</div>';
  } catch(e) {}
}

// ===== PAYOUTS =====
async function loadPayouts(c) {
  c.innerHTML = `<div class="page-header"><h1>💰 المدفوعات</h1><button class="btn btn-primary" onclick="requestPayout()">طلب سحب أرباح</button></div><div class="payout-summary"><div class="payout-card"><div class="amount" style="color:var(--primary)">${affiliateData?.totalEarnings||0}</div><div class="label">إجمالي الأرباح (ج.م)</div></div><div class="payout-card"><div class="amount" style="color:var(--warning)">${affiliateData?.pendingPayout||0}</div><div class="label">أرباح معلقة (ج.م)</div></div><div class="payout-card"><div class="amount" style="color:var(--success)">${affiliateData?.paidPayout||0}</div><div class="label">تم دفعها (ج.م)</div></div></div><div class="table-container"><div class="table-header"><h2>سجل المدفوعات</h2></div><div class="table-wrapper"><table><thead><tr><th>التاريخ</th><th>المبلغ</th><th>طريقة الدفع</th><th>الحالة</th></tr></thead><tbody id="payouts-table"><tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary)">لا توجد مدفوعات بعد</td></tr></tbody></table></div></div>`;
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
  c.innerHTML = `<div class="page-header"><h1>📣 مواد تسويقية</h1></div><p style="color:var(--text-secondary);margin-bottom:2rem">استخدم الرسائل دي في مشاركة المنتجات. كل رسالة جاهزة للنسخ والمشاركة!</p>${messages.map(m => `<div class="table-container" style="margin-bottom:1rem"><div class="table-header"><h2>${m.icon} ${m.title}</h2><button class="btn btn-sm btn-primary" onclick="copyText(this)" data-text="${encodeURIComponent(m.text)}">📋 نسخ</button></div><div style="padding:1.5rem;white-space:pre-line;color:var(--text-secondary);font-size:.9rem;line-height:1.8">${m.text}</div></div>`).join('')}<div class="table-container"><div class="table-header"><h2>🔗 روابط مباشرة للمنتجات</h2></div><div style="padding:1.5rem">${PRODUCTS.map(p => `<div style="display:flex;justify-content:space-between;align-items:center;padding:.8rem 0;border-bottom:1px solid var(--border)"><span>${p.emoji} ${p.name}</span><button class="btn btn-sm btn-ghost" onclick="copyText(this)" data-text="${encodeURIComponent(link)}">نسخ الرابط</button></div>`).join('')}</div></div>`;
}

// ===== BADGES =====
function loadBadges(c) {
  const count = affiliateData?.referralsCount||0;
  const earnings = affiliateData?.totalEarnings||0;
  c.innerHTML = `<div class="page-header"><h1>🏅 الشارات والإنجازات</h1></div><div class="badges-grid">${BADGES.map(b => { let progress = 0; if (b.field==='referralsCount') progress = count; else if (b.field==='totalEarnings') progress = earnings; else if (b.field==='rank') progress = 0; else progress = 0; const earned = progress >= b.requirement; const pct = Math.min((progress/b.requirement)*100,100); return `<div class="badge-card ${earned?'earned':'locked'}"><div class="badge-icon">${b.icon}</div><div class="badge-name">${b.name}</div><div class="badge-desc">${b.desc}</div><div class="badge-progress"><div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div><p style="font-size:.7rem;color:var(--text-secondary);margin-top:.3rem">${earned?'تم الإنجاز ✅':`${progress}/${b.requirement}`}</p></div></div>`; }).join('')}</div>`;
}

// ===== TRAINING =====
function loadTraining(c) {
  const lessons = [
    {title:'ازاي تبدأ في برنامج العمولة',desc:'دليل المبتدئين للاستخدام',icon:'📚',time:'5 دقائق',level:'مبتدئ'},
    {title:'كيف تشارك على فيسبوك',desc:'أسرار المبيعات على السوشيال ميديا',icon:'📘',time:'8 دقائق',level:'متوسط'},
    {title:'واتساب كورس تسويق',desc:'ازاي تستخدم واتساب في البيع',icon:'💬',time:'10 دقائق',level:'متوسط'},
    {title:'بناء استراتيجية تسويقية',desc:'خطط تسويق احترافية',icon:'🎯',time:'15 دقيقة',level:'متقدم'},
    {title:'تحسين معدلات التحويل',desc:'ازاي تزود مبيعاتك',icon:'📈',time:'12 دقيقة',level:'متقدم'},
    {title:'التعامل مع العملاء',desc:'فن إتمام عملية البيع',icon:'🤝',time:'7 دقائق',level:'متوسط'},
  ];
  c.innerHTML = `<div class="page-header"><h1>📚 التدريب والتطوير</h1></div><div class="training-grid">${lessons.map(l => `<div class="training-card"><div class="training-thumb" style="background:var(--primary-light)">${l.icon}<div class="play-btn">▶</div></div><div class="training-info"><h3>${l.title}</h3><p>${l.desc}</p><div class="training-meta"><span>⏱️ ${l.time}</span><span>📊 ${l.level}</span></div></div></div>`).join('')}</div>`;
}

// ===== NOTIFICATIONS =====
function loadNotifications(c) {
  c.innerHTML = `<div class="page-header"><h1>🔔 الإشعارات</h1></div><div id="notifications-page"><div style="text-align:center;padding:3rem;color:var(--text-secondary)">جاري تحميل الإشعارات...</div></div>`;
  loadNotificationsList('notifications-page');
}

async function loadNotificationsList(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  try {
    const snap = await db.collection('notifications').where('affiliateId','==',currentUser.uid).orderBy('createdAt','desc').limit(20).get();
    if (snap.empty) { el.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-secondary)"><div style="font-size:3rem;margin-bottom:1rem">🔔</div><p>لا توجد إشعارات بعد</p></div>'; return; }
    let html = '';
    snap.forEach(doc => { const d = doc.data(); const time = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'; html += `<div class="notification-item ${d.read?'':'unread'}"><div class="notification-dot" style="display:${d.read?'none':'block'}"></div><div class="notification-content"><div class="notification-text">${d.message}</div><div class="notification-time">${time}</div></div></div>`; });
    el.innerHTML = html;
  } catch(e) { el.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-secondary)">لا توجد إشعارات</div>'; }
}

function closeNotifications() { document.getElementById('notification-panel').classList.remove('active'); }

// ===== SETTINGS =====
function loadSettings(c) {
  c.innerHTML = `<div class="page-header"><h1>⚙️ الإعدادات</h1></div><div class="two-col"><div class="table-container" style="padding:2rem"><h2 style="margin-bottom:1.5rem">تعديل البيانات</h2><form id="settings-form" onsubmit="handleUpdateProfile(event)"><div class="form-group"><label>الاسم</label><input type="text" id="settings-name" value="${affiliateData?.name||''}"></div><div class="form-group"><label>رقم الهاتف</label><input type="tel" id="settings-phone" value="${affiliateData?.phone||''}"></div><div class="form-group"><label>البريد الإلكتروني</label><input type="email" value="${affiliateData?.email||''}" disabled style="background:#f5f5f5"></div><button type="submit" class="btn btn-primary">حفظ التعديلات</button></form></div><div><div class="table-container" style="padding:2rem"><h2 style="margin-bottom:1.5rem">تغيير كلمة المرور</h2><form onsubmit="handleChangePassword(event)"><div class="form-group"><label>كلمة المرور الجديدة</label><input type="password" id="new-password" placeholder="6 أحرف على الأقل"></div><div class="form-group"><label>تأكيد كلمة المرور</label><input type="password" id="confirm-new-password"></div><button type="submit" class="btn btn-secondary">تغيير كلمة المرور</button></form></div><div style="margin-top:1.5rem"><button class="btn btn-danger" onclick="handleLogout()">🚪 تسجيل الخروج</button></div></div></div>`;
}

async function handleUpdateProfile(e) {
  e.preventDefault();
  const name = document.getElementById('settings-name').value.trim();
  const phone = document.getElementById('settings-phone').value.trim();
  try { await db.collection('affiliates').doc(currentUser.uid).update({name,phone}); affiliateData.name=name; affiliateData.phone=phone; updateUserUI(); showToast('تم حفظ التعديلات ✅','success'); } catch(e) { showToast('حدث خطأ','error'); }
}

async function handleChangePassword(e) {
  e.preventDefault();
  const p = document.getElementById('new-password').value;
  const cp = document.getElementById('confirm-new-password').value;
  if (p.length < 6) { showToast('كلمة المرور 6 أحرف على الأقل','error'); return; }
  if (p !== cp) { showToast('كلمتا المرور غير متطابقتين','error'); return; }
  try { await currentUser.updatePassword(p); showToast('تم تغيير كلمة المرور ✅','success'); } catch(e) { showToast('حدث خطأ - قد تحتاج تسجيل الدخول تاني','error'); }
}

async function handleLogout() { await auth.signOut(); window.location.href='auth.html'; }

// ===== SHARING =====
function shareWhatsApp() { const t = `🔥 ميلانو F16 - الحل الأقوى للقضاء على الحشرات!\n📦 شحن مجاني فوق 3000 جنيه\n🛒 اطلب دلوقتي:\n${getShareLink()}`; window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,'_blank'); logShare('whatsapp'); }
function shareFacebook() { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareLink())}`,'_blank'); logShare('facebook'); }
function shareTelegram() { const t = `milano F16 - أقوى مبيد حشري في مصر 🛡️\n${getShareLink()}`; window.open(`https://t.me/share/url?url=${encodeURIComponent(getShareLink())}&text=${encodeURIComponent(t)}`,'_blank'); logShare('telegram'); }
function shareTwitter() { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('ميلانو F16 - أقوى مبيد حشري 🛡️')}&url=${encodeURIComponent(getShareLink())}`,'_blank'); logShare('twitter'); }
function copyLink() { navigator.clipboard.writeText(getShareLink()); showToast('تم نسخ الرابط ✅','success'); logShare('copy'); }

function shareProduct(name, price, url) {
  const link = `${url}?ref=${affiliateData?.referralCode}`;
  const text = `🔥 ${name} بسعر ${price} ج.م من ميلانو F16!\n📦 شحن مجاني\n${link}`;
  if (navigator.share) { navigator.share({title:name,text}); } else { navigator.clipboard.writeText(text); showToast('تم نسخ رابط المشاركة ✅','success'); }
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
    await db.collection('payouts').add({affiliateId:currentUser.uid,amount:affiliateData.pendingPayout,method:'فودافون كаш',phone,status:'pending',createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    await db.collection('affiliates').doc(currentUser.uid).update({pendingPayout:0});
    await db.collection('notifications').add({affiliateId:currentUser.uid,message:`تم طلب سحب ${affiliateData.pendingPayout} ج.م`,read:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    affiliateData.pendingPayout=0;
    showToast('تم طلب السحب بنجاح! ✅','success');
    loadPage('payouts');
  } catch(e) { showToast('حدث خطأ','error'); }
}

// ===== TOAST =====
function showToast(msg, type='info') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ===== SIDEBAR LOGOUT =====
document.getElementById('sidebar-logout')?.addEventListener('click', async (e) => { e.preventDefault(); await handleLogout(); });

// Track page clicks
document.addEventListener('click', async (e) => {
  if (e.target.closest('a[href*="milanof16.com"]')) {
    try { await db.collection('clicks').add({affiliateId:currentUser.uid,type:'product_click',createdAt:firebase.firestore.FieldValue.serverTimestamp()}); } catch(e){}
  }
});
