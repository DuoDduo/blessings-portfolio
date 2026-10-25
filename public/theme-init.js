// Applies the saved theme before first paint to avoid a flash of the wrong theme.
// Loaded as an external file so the Content-Security-Policy can stay script-src 'self'.
(function () {
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  } catch { /* storage unavailable: follow the system setting */ }
})();
