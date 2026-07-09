// ===== DASHBOARD LOGIC =====

let currentUser = null;
let affiliateData = null;
let currentPage = 'overview';

// ===== AUTH CHECK =====
auth.onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = 'auth.html';
    return;
  }
  currentUser = user;
  await loadAffiliateData();
  loadPage('overview');
});

// ===== LOAD AFFILIATE DATA =====
async function loadAffiliateData() {
  try {
    const doc = await db.collection('affiliates').doc(currentUser.uid).get();
    if (doc.exists) {
      affiliateData = doc.data();
      updateUserUI();
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// ===== UPDATE USER UI =====
function updateUserUI() {
  if (!affiliateData) return;

  document.getElementById('user-name').textContent = affiliateData.name;
  document.getElementById('user-email').textContent = affiliateData.email;

  const referralLink = `${window.location.origin}?ref=${affiliateData.referralCode}`;
  document.getElementById('referral-link').value = referralLink;
}

// ===== SIDEBAR NAVIGATION =====
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const page = link.dataset.page;
    loadPage(page);

    document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===== LOAD PAGE =====
function loadPage(page) {
  currentPage = page;
  const content = document.getElementById('page-content');

  switch(page) {
    case 'overview': loadOverview(content); break;
    case 'referrals': loadReferrals(content); break;
    case 'products': loadProducts(content); break;
    case 'payouts': loadPayouts(content); break;
    case 'settings': loadSettings(content); break;
  }
}

// ===== OVERVIEW PAGE =====
async function loadOverview(container) {
  // Get real-time stats
  let clicks = 0, conversions = 0, earnings = 0;

  try {
    const clicksSnap = await db.collection('clicks')
      .where('affiliateId', '==', currentUser.uid).get();
    clicks = clicksSnap.size;

    const conversionsSnap = await db.collection('conversions')
      .where('affiliateId', '==', currentUser.uid).get();
    conversions = conversionsSnap.size;

    conversionsSnap.forEach(doc => {
      earnings += doc.data().commission || 0;
    });
  } catch(e) {}

  container.innerHTML = `
    <div class="page-header">
      <h1>مرحباً ${affiliateData?.name || ''} 👋</h1>
      <div>
        <span style="color:var(--text-secondary);font-size:0.9rem;">كود الإحالة: <strong>${affiliateData?.referralCode || ''}</strong></span>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon">👥</div>
        <div class="stat-value" id="stat-referrals">${affiliateData?.referralsCount || 0}</div>
        <div class="stat-label">إجمالي الإحالات</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon">💰</div>
        <div class="stat-value" id="stat-earnings">${affiliateData?.totalEarnings || 0} ج.م</div>
        <div class="stat-label">إجمالي الأرباح</div>
      </div>
      <div class="stat-card orange">
        <div class="stat-icon">⏳</div>
        <div class="stat-value" id="stat-pending">${affiliateData?.pendingPayout || 0} ج.م</div>
        <div class="stat-label">أرباح معلقة</div>
      </div>
      <div class="stat-card red">
        <div class="stat-icon">🔗</div>
        <div class="stat-value" id="stat-clicks">${clicks}</div>
        <div class="stat-label">النقرات</div>
      </div>
    </div>

    <div class="referral-box">
      <span style="font-weight:600;white-space:nowrap;">رابط الإحالة الخاص بيك:</span>
      <input type="text" id="referral-link" readonly value="${window.location.origin}?ref=${affiliateData?.referralCode || ''}">
      <button class="btn btn-primary" onclick="copyReferralLink()">نسخ الرابط</button>
    </div>

    <div class="table-container">
      <div class="table-header">
        <h2>آخر الإحالات</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>العميل</th>
            <th>الحالة</th>
            <th>العمولة</th>
          </tr>
        </thead>
        <tbody id="recent-referrals-table">
          <tr>
            <td colspan="4" style="text-align:center;color:var(--text-secondary);padding:2rem;">جاري التحميل...</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // Load recent referrals
  loadRecentReferrals();
}

// ===== LOAD RECENT REFERRALS =====
async function loadRecentReferrals() {
  const tbody = document.getElementById('recent-referrals-table');
  if (!tbody) return;

  try {
    const snap = await db.collection('conversions')
      .where('affiliateId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();

    if (snap.empty) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-secondary);padding:2rem;">لا توجد إحالات بعد</td></tr>';
      return;
    }

    let html = '';
    snap.forEach(doc => {
      const data = doc.data();
      const date = data.createdAt?.toDate().toLocaleDateString('ar-EG') || '-';
      const statusClass = data.status === 'approved' ? 'status-approved' :
                         data.status === 'paid' ? 'status-paid' : 'status-pending';
      const statusText = data.status === 'approved' ? 'مقبول' :
                        data.status === 'paid' ? 'مدفوع' : 'قيد المراجعة';

      html += `<tr>
        <td>${date}</td>
        <td>${data.customerName || 'عميل'}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>${data.commission || 0} ج.م</td>
      </tr>`;
    });

    tbody.innerHTML = html;
  } catch(e) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-secondary);padding:2rem;">خطأ في تحميل البيانات</td></tr>';
  }
}

// ===== REFERRALS PAGE =====
async function loadReferrals(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>الإحالات</h1>
    </div>

    <div class="referral-box">
      <span style="font-weight:600;white-space:nowrap;">رابط الإحالة:</span>
      <input type="text" id="referral-link" readonly value="${window.location.origin}?ref=${affiliateData?.referralCode || ''}">
      <button class="btn btn-primary" onclick="copyReferralLink()">نسخ</button>
    </div>

    <div class="table-container">
      <div class="table-header">
        <h2>كل الإحالات</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>التاريخ</th>
            <th>العميل</th>
            <th>المنتج</th>
            <th>الحالة</th>
            <th>العمولة</th>
          </tr>
        </thead>
        <tbody id="all-referrals-table">
          <tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-secondary);">جاري التحميل...</td></tr>
        </tbody>
      </table>
    </div>
  `;

  try {
    const snap = await db.collection('conversions')
      .where('affiliateId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const tbody = document.getElementById('all-referrals-table');

    if (snap.empty) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-secondary);">لا توجد إحالات بعد. شارك رابط الإحالة وابدأ اكسب!</td></tr>';
      return;
    }

    let html = '';
    let i = 1;
    snap.forEach(doc => {
      const data = doc.data();
      const date = data.createdAt?.toDate().toLocaleDateString('ar-EG') || '-';
      const statusClass = data.status === 'approved' ? 'status-approved' :
                         data.status === 'paid' ? 'status-paid' :
                         data.status === 'rejected' ? 'status-rejected' : 'status-pending';
      const statusText = data.status === 'approved' ? 'مقبول' :
                        data.status === 'paid' ? 'مدفوع' :
                        data.status === 'rejected' ? 'مرفوض' : 'قيد المراجعة';

      html += `<tr>
        <td>${i++}</td>
        <td>${date}</td>
        <td>${data.customerName || 'عميل'}</td>
        <td>${data.productName || '-'}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        <td>${data.commission || 0} ج.م</td>
      </tr>`;
    });

    tbody.innerHTML = html;
  } catch(e) {
    document.getElementById('all-referrals-table').innerHTML =
      '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--danger);">خطأ في تحميل البيانات</td></tr>';
  }
}

// ===== PRODUCTS PAGE =====
function loadProducts(container) {
  const products = [
    { name: 'اف 16 للصراصير 500مل', price: 60, commission: 15, img: '🪳' },
    { name: 'اف 16 للصراصير 400مل', price: 50, commission: 12, img: '🪳' },
    { name: 'اف 22 للنمل 500مل', price: 60, commission: 15, img: '🐜' },
    { name: 'اف 22 للنمل 400مل', price: 50, commission: 12, img: '🐜' },
    { name: 'مبيد اف 35 للبق', price: 70, commission: 18, img: '🐛' },
    { name: 'رينجو للذباب', price: 60, commission: 15, img: '🪰' },
    { name: 'سوبر 777 لحشرات المواشي', price: 50, commission: 12, img: '🐄' },
    { name: 'جيجي اسبونج', price: 20, commission: 5, img: '🧽' }
  ];

  container.innerHTML = `
    <div class="page-header">
      <h1>المنتجات</h1>
      <p style="color:var(--text-secondary);">شارك المنتجات واحصل على عمولة من كل عملية بيع</p>
    </div>

    <div class="products-grid">
      ${products.map(p => `
        <div class="product-card">
          <div style="height:200px;display:flex;align-items:center;justify-content:center;background:var(--primary-light);font-size:4rem;">
            ${p.img}
          </div>
          <div class="product-info">
            <h3>${p.name}</h3>
            <div class="product-price">${p.price} ج.م</div>
            <div class="product-commission">عمولتك: ${p.commission} ج.م (${Math.round(p.commission/p.price*100)}%)</div>
            <button class="btn btn-primary btn-sm btn-block" style="margin-top:0.8rem;" onclick="shareProduct('${p.name}', ${p.price})">
              مشاركة المنتج
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ===== SHARE PRODUCT =====
function shareProduct(productName, price) {
  const link = `${window.location.origin}?ref=${affiliateData?.referralCode}`;
  const text = `🔥 اكتشف ${productName} بسعر ${price} ج.م من ميلانو F16!\n📦 شحن مجاني فوق 3000 ج.م\n\n${link}`;

  if (navigator.share) {
    navigator.share({ title: productName, text: text });
  } else {
    navigator.clipboard.writeText(text);
    alert('تم نسخ رابط المشاركة!');
  }
}

// ===== PAYOUTS PAGE =====
async function loadPayouts(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>المدفوعات</h1>
      <button class="btn btn-primary" onclick="requestPayout()">طلب سحب أرباح</button>
    </div>

    <div class="payout-summary">
      <div class="payout-card">
        <div class="amount">${affiliateData?.totalEarnings || 0}</div>
        <div class="label">إجمالي الأرباح (ج.م)</div>
      </div>
      <div class="payout-card">
        <div class="amount" style="color:var(--warning)">${affiliateData?.pendingPayout || 0}</div>
        <div class="label">أرباح معلقة (ج.م)</div>
      </div>
      <div class="payout-card">
        <div class="amount" style="color:var(--success)">${affiliateData?.paidPayout || 0}</div>
        <div class="label">تم دفعها (ج.م)</div>
      </div>
    </div>

    <div class="table-container">
      <div class="table-header">
        <h2>سجل المدفوعات</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>المبلغ</th>
            <th>طريقة الدفع</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody id="payouts-table">
          <tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--text-secondary);">لا توجد مدفوعات بعد</td></tr>
        </tbody>
      </table>
    </div>
  `;

  // Load payouts
  try {
    const snap = await db.collection('payouts')
      .where('affiliateId', '==', currentUser.uid)
      .orderBy('createdAt', 'desc')
      .get();

    if (!snap.empty) {
      const tbody = document.getElementById('payouts-table');
      let html = '';
      snap.forEach(doc => {
        const data = doc.data();
        const date = data.createdAt?.toDate().toLocaleDateString('ar-EG') || '-';
        const statusClass = data.status === 'paid' ? 'status-paid' : 'status-pending';
        const statusText = data.status === 'paid' ? 'تم الدفع' : 'قيد المعالجة';

        html += `<tr>
          <td>${date}</td>
          <td>${data.amount} ج.م</td>
          <td>${data.method || 'فودافون كاش'}</td>
          <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        </tr>`;
      });
      tbody.innerHTML = html;
    }
  } catch(e) {}
}

// ===== REQUEST PAYOUT =====
async function requestPayout() {
  if (!affiliateData || affiliateData.pendingPayout < 50) {
    alert('الحد الأدنى للسحب هو 50 ج.م');
    return;
  }

  const phone = prompt('ادخل رقم فودافون كاش / فودافون كاش للسحب:');
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

    // Reset pending
    await db.collection('affiliates').doc(currentUser.uid).update({
      pendingPayout: 0
    });

    affiliateData.pendingPayout = 0;
    alert('تم طلب السحب بنجاح! هنتواصل معاك قريب.');
    loadPage('payouts');
  } catch(e) {
    alert('حدث خطأ، حاول تاني');
  }
}

// ===== SETTINGS PAGE =====
function loadSettings(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>الإعدادات</h1>
    </div>

    <div class="table-container" style="padding:2rem;">
      <h2 style="margin-bottom:1.5rem;">تعديل البيانات الشخصية</h2>
      <form id="settings-form" onsubmit="handleUpdateProfile(event)">
        <div class="form-group">
          <label>الاسم</label>
          <input type="text" id="settings-name" value="${affiliateData?.name || ''}">
        </div>
        <div class="form-group">
          <label>رقم الهاتف</label>
          <input type="tel" id="settings-phone" value="${affiliateData?.phone || ''}">
        </div>
        <div class="form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" value="${affiliateData?.email || ''}" disabled style="background:#f5f5f5;">
        </div>
        <button type="submit" class="btn btn-primary">حفظ التعديلات</button>
      </form>
    </div>

    <div class="table-container" style="padding:2rem;margin-top:1.5rem;">
      <h2 style="margin-bottom:1.5rem;">تغيير كلمة المرور</h2>
      <form id="password-form" onsubmit="handleChangePassword(event)">
        <div class="form-group">
          <label>كلمة المرور الجديدة</label>
          <input type="password" id="new-password" placeholder="6 حروف على الأقل">
        </div>
        <div class="form-group">
          <label>تأكيد كلمة المرور</label>
          <input type="password" id="confirm-new-password">
        </div>
        <button type="submit" class="btn btn-secondary">تغيير كلمة المرور</button>
      </form>
    </div>

    <div style="margin-top:2rem;">
      <button class="btn btn-primary" style="background:var(--danger);" onclick="handleLogout()">تسجيل الخروج</button>
    </div>
  `;
}

// ===== UPDATE PROFILE =====
async function handleUpdateProfile(e) {
  e.preventDefault();

  const name = document.getElementById('settings-name').value.trim();
  const phone = document.getElementById('settings-phone').value.trim();

  try {
    await db.collection('affiliates').doc(currentUser.uid).update({ name, phone });
    affiliateData.name = name;
    affiliateData.phone = phone;
    updateUserUI();
    alert('تم حفظ التعديلات بنجاح');
  } catch(e) {
    alert('حدث خطأ');
  }
}

// ===== CHANGE PASSWORD =====
async function handleChangePassword(e) {
  e.preventDefault();

  const newPass = document.getElementById('new-password').value;
  const confirmPass = document.getElementById('confirm-new-password').value;

  if (newPass.length < 6) {
    alert('كلمة المرور لازم 6 حروف على الأقل');
    return;
  }

  if (newPass !== confirmPass) {
    alert('كلمتا المرور غير متطابقتين');
    return;
  }

  try {
    await currentUser.updatePassword(newPass);
    alert('تم تغيير كلمة المرور بنجاح');
    document.getElementById('password-form').reset();
  } catch(e) {
    alert('حدث خطأ. قد تحتاج تسجيل الدخول تاني');
  }
}

// ===== LOGOUT =====
async function handleLogout() {
  await auth.signOut();
  window.location.href = 'auth.html';
}

// ===== COPY REFERRAL LINK =====
function copyReferralLink() {
  const input = document.getElementById('referral-link');
  if (input) {
    input.select();
    navigator.clipboard.writeText(input.value);
    alert('تم نسخ الرابط بنجاح!');
  }
}

// ===== SIDEBAR LOGOUT =====
document.getElementById('sidebar-logout')?.addEventListener('click', async (e) => {
  e.preventDefault();
  await handleLogout();
});
