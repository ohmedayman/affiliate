let currentTab = 'login';
auth.onAuthStateChanged((user) => { if (user) window.location.href = 'dashboard.html'; });

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
  document.getElementById('login-form').style.display = tab==='login'?'block':'none';
  document.getElementById('register-form').style.display = tab==='register'?'block':'none';
  document.querySelectorAll('.alert').forEach(a => a.style.display='none');
}

function showError(formId, msg) { const a = document.querySelector(`#${formId} .alert`); if(a){a.textContent=msg;a.style.display='flex';} }

function setLoading(btn, loading) {
  if (loading) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> جاري...'; }
  else { btn.disabled = false; btn.innerHTML = `<span class="btn-text">${btn.dataset.originalText||'إرسال'}</span>`; }
}

// ===== LOGIN =====
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.querySelectorAll('.alert').forEach(a => a.style.display='none');
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  if (!email || !password) { showError('login-form','من فضلك ملأ كل الحقول'); return; }
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.innerHTML; btn.dataset.originalText = 'تسجيل الدخول';
  setLoading(btn, true);
  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'dashboard.html';
  } catch(error) {
    let msg = 'حدث خطأ، حاول تاني';
    if (error.code==='auth/user-not-found') msg = 'البريد الإلكتروني غير مسجل';
    if (error.code==='auth/wrong-password') msg = 'كلمة المرور غير صحيحة';
    if (error.code==='auth/invalid-email') msg = 'البريد الإلكتروني غير صالح';
    if (error.code==='auth/too-many-requests') msg = 'تم حظر الحساب مؤقتاً';
    if (error.code==='auth/invalid-credential') msg = 'بيانات الدخول غير صحيحة';
    showError('login-form', msg);
    setLoading(btn, false);
  }
});

// ===== REGISTER =====
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.querySelectorAll('.alert').forEach(a => a.style.display='none');
  const name = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  if (!name || !phone || !email || !password) { showError('register-form','من فضلك ملأ كل الحقول'); return; }
  if (password.length < 6) { showError('register-form','كلمة المرور 6 أحرف على الأقل'); return; }
  const btn = e.target.querySelector('button[type="submit"]');
  btn.dataset.originalText = 'إنشاء حساب';
  setLoading(btn, true);
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    const refCode = name.replace(/\s+/g,'').toLowerCase() + Math.floor(Math.random()*10000);
    await db.collection('affiliates').doc(cred.user.uid).set({
      name, phone, email, referralCode: refCode,
      referralsCount: 0, totalEarnings: 0, pendingPayout: 0, paidPayout: 0,
      totalClicks: 0, sharesCount: 0, platformsCount: 0,
      status: 'active', createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    await db.collection('notifications').add({
      affiliateId: cred.user.uid,
      message: 'مرحباً بيك في برنامج ميلانو F16! 🎉 ابدأ بمشاركة رابط الإحالة',
      read: false, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    window.location.href = 'dashboard.html';
  } catch(error) {
    let msg = 'حدث خطأ، حاول تاني';
    if (error.code==='auth/email-already-in-use') msg = 'البريد الإلكتروني مسجل بالفعل';
    if (error.code==='auth/invalid-email') msg = 'البريد الإلكتروني غير صالح';
    if (error.code==='auth/weak-password') msg = 'كلمة المرور ضعيفة';
    showError('register-form', msg);
    setLoading(btn, false);
  }
});

// ===== GOOGLE LOGIN =====
async function handleGoogleLogin() {
  try {
    const result = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const user = result.user;
    const doc = await db.collection('affiliates').doc(user.uid).get();
    if (!doc.exists) {
      const refCode = (user.displayName||'user').replace(/\s+/g,'').toLowerCase() + Math.floor(Math.random()*10000);
      await db.collection('affiliates').doc(user.uid).set({
        name: user.displayName||'مستخدم', phone:'', email:user.email, referralCode:refCode,
        referralsCount:0, totalEarnings:0, pendingPayout:0, paidPayout:0,
        totalClicks:0, sharesCount:0, platformsCount:0,
        status:'active', createdAt:firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    window.location.href = 'dashboard.html';
  } catch(e) { showError('login-form','حدث خطأ في تسجيل الدخول بجوجل'); }
}
