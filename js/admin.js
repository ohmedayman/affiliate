let adminUser = null, adminData = null;
const LOGO = 'https://assets.wuiltstore.com/cmksv9bcw0ki601gn64lf4joy_Gemini_Generated_Image_8x0fug8x0fug8x0f.webp';
const COLORS = ['#1a73e8','#0f9d58','#ff6d00','#7c4dff','#d93025','#00897b','#e91e63','#ff9800'];

// ===== AUTH CHECK =====
auth.onAuthStateChanged(async (user) => {
  if (!user) { window.location.href = 'auth.html'; return; }
  adminUser = user;
  const doc = await db.collection('affiliates').doc(user.uid).get();
  if (!doc.exists || !doc.data().isAdmin) {
    alert('ليس لديك صلاحية الوصول لهذه الصفحة');
    window.location.href = 'dashboard.html';
    return;
  }
  adminData = doc.data();
  loadAdminPage('dashboard');
  setupAdminListeners();
});

// ===== REALTIME LISTENERS =====
function setupAdminListeners() {
  // Listen to messages count
  db.collection('messages').where('read','==',false).onSnapshot(snap => {
    const countEl = document.getElementById('msg-count');
    if (countEl) {
      countEl.textContent = snap.size > 0 ? snap.size : '';
      countEl.style.display = snap.size > 0 ? 'inline' : 'none';
    }
  });

  // Listen to pending payouts
  db.collection('payouts').where('status','==','pending').onSnapshot(snap => {
    const countEl = document.getElementById('pay-count');
    if (countEl) {
      countEl.textContent = snap.size > 0 ? snap.size : '';
      countEl.style.display = snap.size > 0 ? 'inline' : 'none';
    }
  });

  // Listen to new conversions
  db.collection('conversions').where('status','==','pending').onSnapshot(snap => {
    if (snap.size > 0 && Notification.permission === 'granted') {
      new Notification('مبيعات جديدة!', {body: `${snap.size} مبيعة في انتظار المراجعة`, icon: LOGO});
    }
  });
}

// ===== NAVIGATION =====
document.querySelectorAll('.admin-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    if (page) {
      document.querySelectorAll('.admin-nav a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      loadAdminPage(page);
    }
  });
});

function loadAdminPage(page) {
  const titles = {dashboard:'لوحة التحكم',affiliates:'الشركاء',conversions:'المبيعات',payouts:'المدفوعات',products:'المنتجات',videos:'الفيديوهات',messages:'الرسائل',shortlinks:'الروابط القصيرة',notifications:'الإشعارات',settings:'الإعدادات'};
  document.getElementById('page-title').textContent = titles[page] || page;
  const loaders = {dashboard:loadDashboard,affiliates:loadAffiliates,conversions:loadConversions,payouts:loadAdminPayouts,products:loadAdminProducts,videos:loadAdminVideos,messages:loadAdminMessages,shortlinks:loadShortLinks,notifications:loadAdminNotifications,settings:loadAdminSettings};
  if (loaders[page]) loaders[page]();
}

// ===== DASHBOARD =====
async function loadDashboard() {
  const c = document.getElementById('admin-page-content');
  let totalAff=0,activeAff=0,totalConv=0,totalEarnings=0,pendingPay=0,todayConv=0;
  try {
    const affSnap = await db.collection('affiliates').get();
    totalAff = affSnap.size;
    affSnap.forEach(d => { if(d.data().status==='active') activeAff++; });
    const convSnap = await db.collection('conversions').get();
    totalConv = convSnap.size;
    convSnap.forEach(d => { totalEarnings += d.data().commission||0; });
    const paySnap = await db.collection('payouts').where('status','==','pending').get();
    pendingPay = paySnap.size;
    const today = new Date(); today.setHours(0,0,0,0);
    const todaySnap = await db.collection('conversions').where('createdAt','>=',today).get();
    todayConv = todaySnap.size;
  } catch(e) {}

  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
    const n = new Date(d); n.setDate(n.getDate()+1);
    try {
      const s = await db.collection('conversions').where('createdAt','>=',d).where('createdAt','<',n).get();
      chartData.push({label:d.toLocaleDateString('ar-EG',{weekday:'short'}),value:s.size});
    } catch(e) { chartData.push({label:d.toLocaleDateString('ar-EG',{weekday:'short'}),value:0}); }
  }
  const maxVal = Math.max(...chartData.map(d=>d.value),1);

  let recentActivity = [];
  try {
    const actSnap = await db.collection('conversions').orderBy('createdAt','desc').limit(5).get();
    actSnap.forEach(doc => {
      const d = doc.data();
      recentActivity.push({text:`بيع جديد: ${d.productName||'منتج'} - ${d.commission||0} ج.م`,time:d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'});
    });
  } catch(e) {}

  c.innerHTML = `
    <div class="admin-stats">
      <div class="admin-stat"><div class="stat-icon-wrap blue"><i class="fi fi-sr-users"></i></div><span class="stat-trend up">نشط</span><h3>${totalAff}</h3><p>إجمالي الشركاء</p></div>
      <div class="admin-stat"><div class="stat-icon-wrap green"><i class="fi fi-sr-shopping-cart"></i></div><span class="stat-trend up">+${todayConv}</span><h3>${totalConv}</h3><p>إجمالي المبيعات</p></div>
      <div class="admin-stat"><div class="stat-icon-wrap orange"><i class="fi fi-sr-money-bill-wave"></i></div><h3>${totalEarnings} ج.م</h3><p>إجمالي العمولات</p></div>
      <div class="admin-stat"><div class="stat-icon-wrap purple"><i class="fi fi-sr-clock-three"></i></div><h3>${pendingPay}</h3><p>مدفوعات معلقة</p></div>
    </div>
    <div class="quick-actions">
      <div class="quick-action" onclick="loadAdminPage('affiliates')"><div class="qa-icon" style="background:#e8f0fe;color:#1a73e8"><i class="fi fi-sr-users"></i></div><h4>إدارة الشركاء</h4><p>عرض وإدارة</p></div>
      <div class="quick-action" onclick="loadAdminPage('conversions')"><div class="qa-icon" style="background:#e8f5e9;color:#0f9d58"><i class="fi fi-sr-shopping-cart"></i></div><h4>المبيعات</h4><p>تتبع العمليات</p></div>
      <div class="quick-action" onclick="loadAdminPage('messages')"><div class="qa-icon" style="background:#fce4ec;color:#e91e63"><i class="fi fi-sr-comments"></i></div><h4>الرسائل</h4><p>التواصل مع الشركاء</p></div>
      <div class="quick-action" onclick="loadAdminPage('videos')"><div class="qa-icon" style="background:#ede7f6;color:#7c4dff"><i class="fi fi-sr-video"></i></div><h4>الفيديوهات</h4><p>إدارة المحتوى التعليمي</p></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr;gap:1.5rem">
      <div class="admin-chart">
        <div class="admin-chart-header"><h3>📈 المبيعات - آخر 7 أيام</h3></div>
        <div class="admin-chart-bars">${chartData.map(d => `<div class="admin-chart-bar" style="height:${(d.value/maxVal)*100}%;background:${d.value>0?'linear-gradient(180deg,#1a73e8,#42a5f5)':'#e8f0fe'}"><div class="tooltip">${d.value} مبيعة</div></div>`).join('')}</div>
        <div class="admin-chart-labels">${chartData.map(d => `<span>${d.label}</span>`).join('')}</div>
      </div>
      <div class="admin-table-wrap">
        <div class="admin-table-header"><h2><i class="fi fi-sr-bolt"></i> آخر النشاطات</h2></div>
        <div class="activity-feed" style="padding:1rem">
          ${recentActivity.length ? recentActivity.map(a => `<div class="activity-item"><div class="activity-dot green"></div><div><div class="activity-text">${a.text}</div><div class="activity-time">${a.time}</div></div></div>`).join('') : '<div style="text-align:center;padding:2rem;color:#5f6368">لا توجد نشاطات</div>'}
        </div>
      </div>
    </div>`;
}

// ===== AFFILIATES =====
async function loadAffiliates() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `<div class="admin-table-wrap"><div class="admin-table-header"><h2><i class="fi fi-sr-users"></i> الشركاء</h2><div class="table-actions"><div class="search-box" style="width:200px"><i class="fi fi-sr-search search-icon"></i><input type="text" placeholder="بحث..." oninput="filterAffiliates(this.value)"></div></div></div><div class="table-wrapper"><table class="admin-table"><thead><tr><th>#</th><th>الشريك</th><th>كود الإحالة</th><th>الإحالات</th><th>الأرباح</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody id="affiliates-tbody"><tr><td colspan="7" style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></td></tr></tbody></table></div></div>`;
  try {
    const snap = await db.collection('affiliates').get();
    document.getElementById('aff-count').textContent = snap.size;
    const tbody = document.getElementById('affiliates-tbody');
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:3rem;color:#5f6368">لا يوجد شركاء</td></tr>'; return; }
    let html = '', i = 1;
    const affList = [];
    snap.forEach(doc => { const d = doc.data(); d._id = doc.id; affList.push(d); });
    window._affiliatesList = affList;
    affList.forEach(d => {
      const color = COLORS[i % COLORS.length];
      const sc = d.status==='active'?'status-approved':'status-rejected';
      const st = d.status==='active'?'نشط':'معطل';
      html += `<tr data-name="${(d.name||'').toLowerCase()}" data-email="${(d.email||'').toLowerCase()}"><td>${i++}</td><td><div class="user-cell"><div class="user-avatar" style="background:${color}">${(d.name||'?').charAt(0)}</div><div class="user-info"><div class="name">${d.name||'-'}</div><div class="email">${d.email||'-'}</div></div></div></td><td><code style="background:#f1f3f4;padding:.2rem .5rem;border-radius:4px;font-size:.8rem">${d.referralCode||'-'}</code></td><td><strong>${d.referralsCount||0}</strong></td><td><strong style="color:#0f9d58">${d.totalEarnings||0} ج.م</strong></td><td><span class="status-badge ${sc}">${st}</span></td><td><button class="btn btn-sm btn-ghost" onclick="viewAffiliate('${d._id}')"><i class="fi fi-sr-eye"></i></button> <button class="btn btn-sm btn-ghost" onclick="toggleAffiliateStatus('${d._id}','${d.status}')"><i class="fi fi-sr-${d.status==='active'?'lock':'unlock'}"></i></button></td></tr>`;
    });
    tbody.innerHTML = html;
  } catch(e) { console.error(e); }
}

function filterAffiliates(q) {
  const rows = document.querySelectorAll('#affiliates-tbody tr');
  rows.forEach(r => { r.style.display = (r.dataset.name||'').includes(q.toLowerCase()) || (r.dataset.email||'').includes(q.toLowerCase()) ? '' : 'none'; });
}

async function viewAffiliate(uid) {
  const doc = await db.collection('affiliates').doc(uid).get();
  if (!doc.exists) return;
  const d = doc.data();
  const modal = document.getElementById('modal-content');
  modal.innerHTML = `<div class="admin-modal-header"><h2>${d.name}</h2><button class="btn btn-sm btn-ghost" onclick="closeModal()">✕</button></div><div class="admin-modal-body"><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem"><div style="padding:1rem;background:#f8f9fa;border-radius:10px"><p style="color:#5f6368;font-size:.8rem">البريد</p><p style="font-weight:600">${d.email||'-'}</p></div><div style="padding:1rem;background:#f8f9fa;border-radius:10px"><p style="color:#5f6368;font-size:.8rem">التليفون</p><p style="font-weight:600">${d.phone||'-'}</p></div><div style="padding:1rem;background:#f8f9fa;border-radius:10px"><p style="color:#5f6368;font-size:.8rem">كود الإحالة</p><p style="font-weight:600;font-family:monospace">${d.referralCode||'-'}</p></div><div style="padding:1rem;background:#f8f9fa;border-radius:10px"><p style="color:#5f6368;font-size:.8rem">الإحالات</p><p style="font-weight:600">${d.referralsCount||0}</p></div><div style="padding:1rem;background:#f8f9fa;border-radius:10px"><p style="color:#5f6368;font-size:.8rem">إجمالي الأرباح</p><p style="font-weight:600;color:#0f9d58">${d.totalEarnings||0} ج.م</p></div><div style="padding:1rem;background:#f8f9fa;border-radius:10px"><p style="color:#5f6368;font-size:.8rem">أرباح معلقة</p><p style="font-weight:600;color:#ff6d00">${d.pendingPayout||0} ج.م</p></div></div></div><div class="admin-modal-footer"><button class="btn btn-sm btn-ghost" onclick="closeModal()">إغلاق</button></div>`;
  document.getElementById('modal-overlay').classList.add('active');
}

async function toggleAffiliateStatus(uid, currentStatus) {
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  if (!confirm(`هل تريد ${newStatus === 'active' ? 'تفعيل' : 'تعطيل'} هذا الشريك؟`)) return;
  try {
    await db.collection('affiliates').doc(uid).update({status: newStatus});
    loadAffiliates();
    showToast('تم التحديث بنجاح', 'success');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== CONVERSIONS =====
async function loadConversions() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `<div class="admin-table-wrap"><div class="admin-table-header"><h2><i class="fi fi-sr-shopping-cart"></i> المبيعات</h2></div><div class="table-wrapper"><table class="admin-table"><thead><tr><th>#</th><th>التاريخ</th><th>الشريك</th><th>العميل</th><th>المنتج</th><th>العمولة</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody id="conversions-tbody"><tr><td colspan="8" style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></td></tr></tbody></table></div></div>`;
  try {
    const snap = await db.collection('conversions').orderBy('createdAt','desc').limit(50).get();
    const tbody = document.getElementById('conversions-tbody');
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:3rem;color:#5f6368">لا توجد مبيعات</td></tr>'; return; }
    let html = '', i = 1;
    snap.forEach(doc => {
      const d = doc.data();
      const date = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-';
      const sc = d.status==='approved'?'status-approved':d.status==='paid'?'status-paid':'status-pending';
      const st = d.status==='approved'?'مقبول':d.status==='paid'?'مدفوع':'قيد المراجعة';
      html += `<tr><td>${i++}</td><td>${date}</td><td>${d.affiliateName||'-'}</td><td>${d.customerName||'-'}</td><td>${d.productName||'-'}</td><td><strong style="color:#0f9d58">${d.commission||0} ج.م</strong></td><td><span class="status-badge ${sc}">${st}</span></td><td><button class="btn btn-sm btn-ghost" onclick="approveConversion('${doc.id}','${d.status}')"><i class="fi fi-sr-check"></i></button></td></tr>`;
    });
    tbody.innerHTML = html;
  } catch(e) {}
}

async function approveConversion(docId, currentStatus) {
  if (currentStatus !== 'pending') return;
  try {
    await db.collection('conversions').doc(docId).update({status:'approved'});
    loadConversions();
    showToast('تم قبول المبيعة', 'success');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== ADMIN PAYOUTS =====
async function loadAdminPayouts() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `<div class="admin-table-wrap"><div class="admin-table-header"><h2><i class="fi fi-sr-money-bill-wave"></i> طلبات السحب</h2></div><div class="table-wrapper"><table class="admin-table"><thead><tr><th>#</th><th>التاريخ</th><th>الشريك</th><th>المبلغ</th><th>رقم التليفون</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody id="admin-payouts-tbody"><tr><td colspan="7" style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></td></tr></tbody></table></div></div>`;
  try {
    const snap = await db.collection('payouts').orderBy('createdAt','desc').get();
    const tbody = document.getElementById('admin-payouts-tbody');
    let pendingCount = 0;
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:3rem;color:#5f6368">لا توجد طلبات</td></tr>'; return; }
    let html = '', i = 1;
    snap.forEach(doc => {
      const d = doc.data();
      if (d.status === 'pending') pendingCount++;
      const date = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-';
      const sc = d.status==='paid'?'status-paid':'status-pending';
      const st = d.status==='paid'?'تم الدفع':'قيد المراجعة';
      html += `<tr><td>${i++}</td><td>${date}</td><td>${d.affiliateName||d.affiliateId||'-'}</td><td><strong>${d.amount} ج.م</strong></td><td>${d.phone||'-'}</td><td><span class="status-badge ${sc}">${st}</span></td><td>${d.status==='pending'?`<button class="btn btn-sm btn-success" onclick="approvePayout('${doc.id}','${d.affiliateId}',${d.amount})"><i class="fi fi-sr-check"></i> دفع</button>`:''}</td></tr>`;
    });
    document.getElementById('pay-count').textContent = pendingCount;
    tbody.innerHTML = html;
  } catch(e) {}
}

async function approvePayout(docId, affId, amount) {
  if (!confirm(`هل أنت متأكد من دفع ${amount} ج.م؟`)) return;
  try {
    await db.collection('payouts').doc(docId).update({status:'paid',paidAt:firebase.firestore.FieldValue.serverTimestamp()});
    await db.collection('affiliates').doc(affId).update({paidPayout: firebase.firestore.FieldValue.increment(amount)});
    await db.collection('notifications').add({affiliateId:affId,message:`تم دفع ${amount} ج.م لحسابك! 🎉`,read:false,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    loadAdminPayouts();
    showToast('تم الدفع بنجاح', 'success');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== ADMIN PRODUCTS =====
function loadAdminProducts() {
  const PRODUCTS = [
    {id:'f16-500',name:'اف 16 للصراصير 500مل',price:60,commission:3,img:'https://assets.wuiltstore.com/cmdiu58cl1tl501ks9ehv955z_1750433241132832061.png'},
    {id:'f16-400',name:'اف 16 للصراصير 400مل',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmd7u4z8219le01g5d3noe3f0_1750434193411593051.png'},
    {id:'f16-650',name:'اف 16 جامبو 650مل',price:70,commission:3.5,img:'https://assets.wuiltstore.com/cmd7u5z0v1ac701ksgbt298xa_1750432766294011606.png'},
    {id:'f22-500',name:'اف 22 للنمل 500مل',price:60,commission:3,img:'https://assets.wuiltstore.com/cmd7u4uf619l601g5cufc88nk_1750433228528482556.png'},
    {id:'f22-400',name:'اف 22 للنمل 400مل',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmd7u4v5019l701g5cnbm9rlr_1750434208208242738.png'},
    {id:'f22-650',name:'اف 22 جامبو 650مل',price:70,commission:3.5,img:'https://assets.wuiltstore.com/cmd7u4yly19ld01g57jpf00ev_1750433166133488427.png'},
    {id:'f35-650',name:'مبيد اف 35 للبق',price:70,commission:3.5,img:'https://assets.wuiltstore.com/cmd7u4vuk19l801g5c6103zlq_1750433213166894989.png'},
    {id:'ringo',name:'رينجو للذباب',price:60,commission:3,img:'https://assets.wuiltstore.com/cmd7u4tpy19l501g5fqpbbe6w_1750433182306448668.png'},
    {id:'super777',name:'سوبر 777 المواشي',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmd7u4xzw19lc01g5648d25e0_1750433199283459882.png'},
    {id:'gsuper777',name:'سوبر 777 1 لتر',price:100,commission:5,img:'https://assets.wuiltstore.com/cmqf9has002wk01jn3r8x2g3a_41cOrJRr_eL._AC_.webp'},
    {id:'rocket-mos',name:'الصاروخ ناموس',price:60,commission:3,img:'https://assets.wuiltstore.com/cmitdyi7d031q01kqaq93e5t8_WhatsApp_Image_2025-12-05_at_23.33.20_186c2329.jpg'},
    {id:'rocket-roach',name:'الصاروخ صراصير',price:60,commission:3,img:'https://assets.wuiltstore.com/cmg84mc0c15kp01hn1f3t2iyh__D9_82_D8_B7_D8_B9_D9_87.jpg'},
    {id:'rocket-ant',name:'الصاروخ نمل',price:60,commission:3,img:'https://assets.wuiltstore.com/cmerex8wa4fih01ks3rj791aa__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__3_.jpg'},
    {id:'rocket-bugs',name:'الصاروخ بق',price:60,commission:3,img:'https://assets.wuiltstore.com/cmerhpqh64fpz01ksclji35r9__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__4_.jpg'},
    {id:'lion-roach',name:'اسد صراصير',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmkn1ziyo07bf01gn0z6r4q9e__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__6_.webp'},
    {id:'lion-ant',name:'اسد للنمل',price:50,commission:2.5,img:'https://assets.wuiltstore.com/cmkn1ylzv07b801gn8r0d7svf__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__5_.webp'},
    {id:'giGi',name:'جيجي اسبونج',price:20,commission:1,img:'https://assets.wuiltstore.com/cmevy2pce4pi101ksg08reses__D8_AA_D8_B5_D9_85_D9_8A_D9_85__D8_A8_D8_AF_D9_88_D9_86__D8_B9_D9_86_D9_88_D8_A7_D9_86__6_.jpg'}
  ];
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `<div class="admin-table-wrap"><div class="admin-table-header"><h2><i class="fi fi-sr-box-open"></i> المنتجات (${PRODUCTS.length})</h2></div><div class="table-wrapper"><table class="admin-table"><thead><tr><th>الصورة</th><th>المنتج</th><th>السعر</th><th>العمولة</th><th>النسبة</th></tr></thead><tbody>${PRODUCTS.map(p => `<tr><td><img src="${p.img}" style="width:50px;height:50px;border-radius:10px;object-fit:cover;background:#f1f3f4" loading="lazy"></td><td><strong>${p.name}</strong></td><td>${p.price} ج.م</td><td style="color:#0f9d58;font-weight:600">${p.commission} ج.م</td><td>5%</td></tr>`).join('')}</tbody></table></div></div>`;
}

// ===== ADMIN VIDEOS =====
async function loadAdminVideos() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `
    <div class="admin-table-wrap" style="padding:2rem">
      <h2 style="margin-bottom:1rem"><i class="fi fi-sr-video"></i> إضافة فيديو جديد</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div class="form-group"><label>عنوان الفيديو</label><input type="text" id="vid-title" placeholder="مثال: ازاي تبيع على واتساب"></div>
        <div class="form-group"><label>الوصف</label><input type="text" id="vid-desc" placeholder="وصف مختصر للفيديو"></div>
      </div>
      <div class="form-group"><label>رابط الفيديو (YouTube, Facebook, أو رابط مباشر)</label><input type="url" id="vid-url" placeholder="https://youtube.com/watch?v=..."></div>
      <button class="btn btn-primary" onclick="addVideo()"><i class="fi fi-sr-plus"></i> إضافة الفيديو</button>
    </div>
    <div class="admin-table-wrap">
      <div class="admin-table-header"><h2><i class="fi fi-sr-video"></i> الفيديوهات المحملة</h2></div>
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>#</th><th>العنوان</th><th>الوصف</th><th>المشاهدات</th><th>التاريخ</th><th>إجراءات</th></tr></thead>
          <tbody id="admin-videos-tbody"><tr><td colspan="6" style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></td></tr></tbody>
        </table>
      </div>
    </div>`;
  loadVideosList();
}

async function loadVideosList() {
  const tbody = document.getElementById('admin-videos-tbody');
  if (!tbody) return;
  try {
    const snap = await db.collection('videos').orderBy('createdAt','desc').get();
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:3rem;color:#5f6368">لا توجد فيديوهات بعد</td></tr>'; return; }
    let html = '', i = 1;
    snap.forEach(doc => {
      const d = doc.data();
      const date = d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-';
      html += `<tr><td>${i++}</td><td><strong>${d.title}</strong></td><td>${d.desc||'-'}</td><td>${d.views||0}</td><td>${date}</td><td><button class="btn btn-sm btn-ghost" onclick="deleteVideo('${doc.id}')"><i class="fi fi-sr-trash"></i></button></td></tr>`;
    });
    tbody.innerHTML = html;
  } catch(e) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:3rem;color:#5f6368">خطأ</td></tr>'; }
}

async function addVideo() {
  const title = document.getElementById('vid-title').value.trim();
  const desc = document.getElementById('vid-desc').value.trim();
  const url = document.getElementById('vid-url').value.trim();
  if (!title || !url) { showToast('ادخل العنوان والرابط', 'error'); return; }
  try {
    await db.collection('videos').add({
      title, desc, url,
      views: 0,
      createdBy: adminUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    showToast('تم إضافة الفيديو بنجاح ✅', 'success');
    document.getElementById('vid-title').value = '';
    document.getElementById('vid-desc').value = '';
    document.getElementById('vid-url').value = '';
    loadVideosList();
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

async function deleteVideo(id) {
  if (!confirm('هل تريد حذف هذا الفيديو؟')) return;
  try {
    await db.collection('videos').doc(id).delete();
    loadVideosList();
    showToast('تم الحذف', 'success');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== ADMIN MESSAGES =====
let selectedAffiliate = null;

async function loadAdminMessages() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `
    <div style="display:grid;grid-template-columns:280px 1fr;gap:0;height:calc(100vh - 140px);border-radius:16px;overflow:hidden;background:white;box-shadow:0 2px 12px rgba(0,0,0,0.08)">
      <div class="msg-sidebar" style="border-left:1px solid #e0e0e0;overflow-y:auto;background:#fafafa">
        <div style="padding:1rem;border-bottom:1px solid #e0e0e0"><h3 style="font-size:.95rem">الشركاء</h3></div>
        <div id="msg-affiliates-list" style="padding:.5rem"></div>
      </div>
      <div class="msg-main" style="display:flex;flex-direction:column">
        <div id="msg-header" style="padding:1rem;border-bottom:1px solid #e0e0e0;display:flex;align-items:center;gap:.8rem">
          <div style="width:40px;height:40px;border-radius:50%;background:#e8f0fe;display:flex;align-items:center;justify-content:center;font-weight:700;color:#1a73e8">💬</div>
          <div><h3 style="font-size:.95rem">اختر شريك للبدء</h3><p style="font-size:.75rem;color:#5f6368">ابعت رد على الشريك</p></div>
        </div>
        <div id="msg-chat-area" style="flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.5rem">
          <div style="text-align:center;padding:3rem;color:#5f6368"><div style="font-size:3rem;margin-bottom:1rem">💬</div><p>اختر شريك من القائمة عشان تبدأ المحادثة</p></div>
        </div>
        <div id="msg-input-area" style="padding:.8rem;border-top:1px solid #e0e0e0;display:none;background:white">
          <div style="display:flex;gap:.5rem">
            <textarea id="admin-chat-input" placeholder="اكتب الرد..." rows="1" style="flex:1;padding:.6rem 1rem;border:2px solid #e0e0e0;border-radius:20px;font-size:.9rem;font-family:inherit;resize:none;max-height:80px" oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px'" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendAdminMessage()}"></textarea>
            <button onclick="sendAdminMessage()" style="width:42px;height:42px;border-radius:50%;background:#1a73e8;border:none;color:white;font-size:1.1rem;cursor:pointer;flex-shrink:0">📤</button>
          </div>
        </div>
      </div>
    </div>`;
  loadMsgAffiliates();
}

async function loadMsgAffiliates() {
  const list = document.getElementById('msg-affiliates-list');
  if (!list) return;
  try {
    const snap = await db.collection('affiliates').get();
    let html = '';
    snap.forEach(doc => {
      const d = doc.data();
      html += `<div onclick="selectChatAffiliate('${doc.id}','${d.name||'مستخدم'}')" class="msg-aff-item" style="display:flex;align-items:center;gap:.8rem;padding:.8rem;border-radius:10px;cursor:pointer;transition:all .2s" onmouseover="this.style.background='#e8f0fe'" onmouseout="this.style.background='transparent'">
        <div style="width:36px;height:36px;border-radius:50%;background:#1a73e8;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.85rem;flex-shrink:0">${(d.name||'?').charAt(0)}</div>
        <div style="flex:1;min-width:0"><div style="font-weight:600;font-size:.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.name||'-'}</div><div style="font-size:.7rem;color:#5f6368;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${d.email||'-'}</div></div>
      </div>`;
    });
    list.innerHTML = html || '<div style="text-align:center;padding:2rem;color:#5f6368">لا يوجد شركاء</div>';
  } catch(e) { list.innerHTML = '<div style="text-align:center;padding:2rem;color:#5f6368">خطأ</div>'; }
}

async function selectChatAffiliate(uid, name) {
  selectedAffiliate = {uid, name};
  const header = document.getElementById('msg-header');
  const chatArea = document.getElementById('msg-chat-area');
  const inputArea = document.getElementById('msg-input-area');
  header.innerHTML = `<div style="width:40px;height:40px;border-radius:50%;background:#1a73e8;color:white;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">${name.charAt(0)}</div><div><h3 style="font-size:.95rem">${name}</h3><p style="font-size:.75rem;color:#0f9d58">متصل</p></div>`;
  inputArea.style.display = 'block';
  chatArea.innerHTML = '<div style="text-align:center;padding:2rem"><div class="spinner spinner-dark"></div></div>';

  try {
    db.collection('messages').where('affiliateId','==',uid).orderBy('createdAt','asc').limit(100).onSnapshot(snap => {
      if (snap.empty) {
        chatArea.innerHTML = '<div style="text-align:center;padding:2rem;color:#5f6368"><p>لا توجد رسائل بعد</p></div>';
        return;
      }
      let html = '';
      snap.forEach(doc => {
        const msg = doc.data();
        const time = msg.createdAt?.toDate?.()?.toLocaleTimeString('ar-EG',{hour:'2-digit',minute:'2-digit'})||'';
        const isAdmin = msg.sender === 'admin';
        html += `<div style="max-width:75%;padding:.7rem 1rem;border-radius:16px;font-size:.9rem;line-height:1.5;align-self:${isAdmin?'flex-end':'flex-start'};background:${isAdmin?'#1a73e8':'#f1f3f4'};color:${isAdmin?'white':'#1a1a2e'};border-bottom-${isAdmin?'left':'right'}-radius:4px">
          <div>${msg.text}</div>
          <div style="font-size:.6rem;opacity:.7;margin-top:.3rem;text-align:${isAdmin?'left':'right'}">${time}</div>
        </div>`;
      });
      chatArea.innerHTML = html;
      chatArea.scrollTop = chatArea.scrollHeight;
    });
  } catch(e) {
    chatArea.innerHTML = '<div style="text-align:center;padding:2rem;color:#5f6368">خطأ في تحميل الرسائل</div>';
  }
}

async function sendAdminMessage() {
  if (!selectedAffiliate) { showToast('اختر شريك أولاً', 'error'); return; }
  const input = document.getElementById('admin-chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  input.style.height = 'auto';
  try {
    await db.collection('messages').add({
      affiliateId: selectedAffiliate.uid,
      affiliateName: selectedAffiliate.name,
      sender: 'admin',
      text: text,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('notifications').add({
      affiliateId: selectedAffiliate.uid,
      message: `رسالة جديدة من الإدارة: ${text.substring(0, 50)}...`,
      read: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) {
    showToast('حدث خطأ في إرسال الرسالة', 'error');
  }
}

// ===== SHORT LINKS =====
async function loadShortLinks() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `
    <div class="short-link-card">
      <h3><i class="fi fi-sr-link"></i> اختصار رابط</h3>
      <div class="short-link-form">
        <input type="url" id="long-url" placeholder="الصق الرابط الطويل هنا...">
        <button class="btn btn-primary" onclick="createShortLink()"><i class="fi fi-sr-bolt"></i> اختصار</button>
      </div>
      <div class="short-link-result" id="short-result">
        <input type="text" id="short-url" readonly>
        <button onclick="copyShortLink()"><i class="fi fi-sr-copy"></i> نسخ</button>
      </div>
    </div>
    <div class="admin-table-wrap">
      <div class="admin-table-header"><h2><i class="fi fi-sr-link"></i> الروابط القصيرة</h2></div>
      <div class="table-wrapper">
        <table class="admin-table">
          <thead><tr><th>#</th><th>الرابط القصير</th><th>الرابط الأصلي</th><th>النقرات</th><th>أنشأه</th><th>إجراءات</th></tr></thead>
          <tbody id="shortlinks-tbody"><tr><td colspan="6" style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></td></tr></tbody>
        </table>
      </div>
    </div>`;
  try {
    const snap = await db.collection('shortlinks').orderBy('createdAt','desc').get();
    const tbody = document.getElementById('shortlinks-tbody');
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:3rem;color:#5f6368">لا توجد روابط قصيرة</td></tr>'; return; }
    let html = '', i = 1;
    snap.forEach(doc => {
      const d = doc.data();
      const shortUrl = `${window.location.origin}/go/${d.code}`;
      html += `<tr><td>${i++}</td><td><a href="${shortUrl}" target="_blank" style="color:#1a73e8;font-weight:600;font-family:monospace">${d.code}</a></td><td style="max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.longUrl}</td><td><strong>${d.clicks||0}</strong></td><td>${d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'}</td><td><button class="btn btn-sm btn-ghost" onclick="deleteShortLink('${doc.id}')"><i class="fi fi-sr-trash"></i></button></td></tr>`;
    });
    tbody.innerHTML = html;
  } catch(e) {}
}

async function createShortLink() {
  const longUrl = document.getElementById('long-url').value.trim();
  if (!longUrl) { showToast('ادخل الرابط', 'error'); return; }
  const code = generateCode(6);
  try {
    await db.collection('shortlinks').add({code,longUrl,clicks:0,createdBy:adminUser.uid,createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    const shortUrl = `${window.location.origin}/go/${code}`;
    document.getElementById('short-url').value = shortUrl;
    document.getElementById('short-result').classList.add('show');
    loadShortLinks();
    showToast('تم إنشاء الرابط القصير', 'success');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

function generateCode(len) { const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; let r = ''; for(let i=0;i<len;i++) r += chars.charAt(Math.floor(Math.random()*chars.length)); return r; }
function copyShortLink() { const input = document.getElementById('short-url'); input.select(); navigator.clipboard.writeText(input.value); showToast('تم النسخ', 'success'); }
async function deleteShortLink(id) { if(!confirm('هل تريد حذف هذا الرابط؟'))return; await db.collection('shortlinks').doc(id).delete(); loadShortLinks(); showToast('تم الحذف', 'success'); }

// ===== ADMIN NOTIFICATIONS =====
async function loadAdminNotifications() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `<div class="admin-table-wrap"><div class="admin-table-header"><h2><i class="fi fi-sr-bell"></i> إرسال إشعار للجميع</h2></div><div style="padding:2rem"><div class="form-group"><label>الرسالة</label><textarea id="broadcast-msg" rows="3" placeholder="اكتب الرسالة..."></textarea></div><button class="btn btn-primary" onclick="broadcastNotification()"><i class="fi fi-sr-paper-plane"></i> إرسال للجميع</button></div></div><div class="admin-table-wrap"><div class="admin-table-header"><h2><i class="fi fi-sr-bell"></i> الإشعارات المرسلة</h2></div><div class="table-wrapper"><table class="admin-table"><thead><tr><th>#</th><th>التاريخ</th><th>للشريك</th><th>الرسالة</th></tr></thead><tbody id="admin-notif-tbody"><tr><td colspan="4" style="text-align:center;padding:3rem"><div class="spinner spinner-dark"></div></td></tr></tbody></table></div></div>`;
  try {
    const snap = await db.collection('notifications').orderBy('createdAt','desc').limit(30).get();
    const tbody = document.getElementById('admin-notif-tbody');
    if (snap.empty) { tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:3rem;color:#5f6368">لا توجد إشعارات</td></tr>'; return; }
    let html = '', i = 1;
    snap.forEach(doc => {
      const d = doc.data();
      html += `<tr><td>${i++}</td><td>${d.createdAt?.toDate().toLocaleDateString('ar-EG')||'-'}</td><td>${d.affiliateId||'الجميع'}</td><td>${d.message||'-'}</td></tr>`;
    });
    tbody.innerHTML = html;
  } catch(e) {}
}

async function broadcastNotification() {
  const msg = document.getElementById('broadcast-msg').value.trim();
  if (!msg) { showToast('اكتب الرسالة', 'error'); return; }
  try {
    const affSnap = await db.collection('affiliates').get();
    const batch = db.batch();
    affSnap.forEach(doc => {
      const ref = db.collection('notifications').doc();
      batch.set(ref, {affiliateId:doc.id, message:msg, read:false, createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    });
    await batch.commit();
    showToast('تم إرسال الإشعار للجميع', 'success');
    loadAdminNotifications();
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== ADMIN SETTINGS =====
function loadAdminSettings() {
  const c = document.getElementById('admin-page-content');
  c.innerHTML = `<div class="admin-table-wrap" style="padding:2rem"><h2 style="margin-bottom:1.5rem"><i class="fi fi-sr-settings"></i> إعدادات المنصة</h2><div class="form-group"><label>نسبة العمولة (%)</label><input type="number" id="set-commission" value="5" min="1" max="50"></div><div class="form-group"><label>الحد الأدنى للسحب (ج.م)</label><input type="number" id="set-min-payout" value="50" min="10"></div><div class="form-group"><label>رابط الموقع الرئيسي</label><input type="url" id="set-store-url" value="https://milanof16.com/ar"></div><button class="btn btn-primary" onclick="saveSettings()"><i class="fi fi-sr-disk"></i> حفظ</button></div>`;
}

async function saveSettings() {
  const commission = document.getElementById('set-commission').value;
  const minPayout = document.getElementById('set-min-payout').value;
  const storeUrl = document.getElementById('set-store-url').value;
  try {
    await db.collection('settings').doc('platform').set({commission,minPayout,storeUrl,updatedAt:firebase.firestore.FieldValue.serverTimestamp()});
    showToast('تم حفظ الإعدادات', 'success');
  } catch(e) { showToast('حدث خطأ', 'error'); }
}

// ===== UTILITIES =====
function closeModal() { document.getElementById('modal-overlay').classList.remove('active'); }
function showNotifications() { loadAdminPage('notifications'); }
function showToast(msg, type='info') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
document.getElementById('admin-logout')?.addEventListener('click', async (e) => { e.preventDefault(); await auth.signOut(); window.location.href='auth.html'; });
