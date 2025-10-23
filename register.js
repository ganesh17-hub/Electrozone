// Toggle password visibility for both fields
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
  });
});

document.getElementById('registerForm').onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regConfirm').value;

  if (password !== confirm) {
    document.getElementById('registerError').textContent = "Passwords do not match!";
    return;
  }
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === email)) {
    document.getElementById('registerError').textContent = "Email already registered!";
    return;
  }
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  document.getElementById('registerError').textContent = "";
  window.location.href = "login.html"; // Redirect to login
};