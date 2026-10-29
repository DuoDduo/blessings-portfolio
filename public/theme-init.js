// Applies the theme before first paint to avoid a flash of the wrong theme.
// Dark is the default; light only when the visitor chose it.
// Loaded as an external file so the Content-Security-Policy can stay script-src 'self'.
(function () {
  var theme = 'dark';
  try {
    if (localStorage.getItem('theme') === 'light') theme = 'light';
  } catch { /* storage unavailable: use the default */ }
  document.documentElement.setAttribute('data-theme', theme);
})();
