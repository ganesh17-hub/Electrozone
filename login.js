document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
    btn.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
  });
});
// Demo login logic
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    document.getElementById('loginError').textContent = "Invalid email or password.";
    return;
  }
  localStorage.setItem('loggedInUser', JSON.stringify(user));
  window.location.href = "index.html";
};