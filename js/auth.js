// ===== AUTH PAGE LOGIC =====

let currentTab = 'login';

// Check if user is already logged in
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.href = 'dashboard.html';
  }
});

// Tab switching
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  document.getElementById('login-form').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'block' : 'none';

  clearErrors();
}

// Show error
function showError(formId, message) {
  const alert = document.querySelector(`#${formId} .alert`);
  if (alert) {
    alert.textContent = message;
    alert.style.display = 'block';
  }
}

// Clear errors
function clearErrors() {
  document.querySelectorAll('.alert').forEach(a => a.style.display = 'none');
}

// ===== LOGIN =====
async function handleLogin(e) {
  e.preventDefault();
  clearErrors();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    showError('login-form', 'من فضلك ملأ كل الحقول');
    return;
  }

  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> جاري الدخول...';

  try {
    await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'dashboard.html';
  } catch (error) {
    let msg = 'حدث خطأ، حاول تاني';
    if (error.code === 'auth/user-not-found') msg = 'البريد الإلكتروني غير مسجل';
    if (error.code === 'auth/wrong-password') msg = 'كلمة المرور غير صحيحة';
    if (error.code === 'auth/invalid-email') msg = 'البريد الإلكتروني غير صالح';
    if (error.code === 'auth/too-many-requests') msg = 'تم حظر الحساب مؤقتاً، حاول بعد شوية';
    showError('login-form', msg);
  }

  btn.disabled = false;
  btn.innerHTML = 'تسجيل الدخول';
}

// ===== REGISTER =====
async function handleRegister(e) {
  e.preventDefault();
  clearErrors();

  const name = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const confirmPassword = document.getElementById('reg-confirm-password').value;

  if (!name || !phone || !email || !password) {
    showError('register-form', 'من فضلك ملأ كل الحقول');
    return;
  }

  if (password.length < 6) {
    showError('register-form', 'كلمة المرور لازم تكون 6 حروف على الأقل');
    return;
  }

  if (password !== confirmPassword) {
    showError('register-form', 'كلمتا المرور غير متطابقتين');
    return;
  }

  const btn = document.getElementById('reg-btn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> جاري التسجيل...';

  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Generate unique referral code
    const referralCode = name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000);

    // Save user data to Firestore
    await db.collection('affiliates').doc(user.uid).set({
      name: name,
      phone: phone,
      email: email,
      referralCode: referralCode,
      referralsCount: 0,
      totalEarnings: 0,
      pendingPayout: 0,
      paidPayout: 0,
      status: 'active',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Send email verification
    await user.sendEmailVerification();

    window.location.href = 'dashboard.html';
  } catch (error) {
    let msg = 'حدث خطأ، حاول تاني';
    if (error.code === 'auth/email-already-in-use') msg = 'البريد الإلكتروني مسجل بالفعل';
    if (error.code === 'auth/invalid-email') msg = 'البريد الإلكتروني غير صالح';
    if (error.code === 'auth/weak-password') msg = 'كلمة المرور ضعيفة';
    showError('register-form', msg);
  }

  btn.disabled = false;
  btn.innerHTML = 'إنشاء حساب';
}

// ===== GOOGLE LOGIN =====
async function handleGoogleLogin() {
  try {
    const result = await auth.signInWithPopup(googleProvider);
    const user = result.user;

    // Check if user doc exists
    const doc = await db.collection('affiliates').doc(user.uid).get();
    if (!doc.exists) {
      const referralCode = user.displayName
        ? user.displayName.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000)
        : 'user' + Math.floor(Math.random() * 100000);

      await db.collection('affiliates').doc(user.uid).set({
        name: user.displayName || 'مستخدم',
        phone: '',
        email: user.email,
        referralCode: referralCode,
        referralsCount: 0,
        totalEarnings: 0,
        pendingPayout: 0,
        paidPayout: 0,
        status: 'active',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    window.location.href = 'dashboard.html';
  } catch (error) {
    showError('login-form', 'حدث خطأ في تسجيل الدخول بجوجل');
  }
}

// ===== FORGOT PASSWORD =====
async function handleForgotPassword() {
  const email = prompt('ادخل البريد الإلكتروني:');
  if (!email) return;

  try {
    await auth.sendPasswordResetEmail(email);
    alert('تم إرسال رابط إعادة تعيين كلمة المرور على البريد الإلكتروني');
  } catch (error) {
    alert('البريد الإلكتروني غير مسجل');
  }
}

// Bind events
document.getElementById('login-form')?.addEventListener('submit', handleLogin);
document.getElementById('register-form')?.addEventListener('submit', handleRegister);
