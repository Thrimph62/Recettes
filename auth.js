/* ══════════════════════════════════════
   auth.js — include on every protected page
   <script src="auth.js"></script>
   Place AFTER the supabase SDK script tag
══════════════════════════════════════ */
(async () => {
  const SB_URL = 'https://wcmbbgkjjlohxviwjivm.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbWJiZ2tqamxvaHh2aXdqaXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDk5NTMsImV4cCI6MjA5MjE4NTk1M30.CUf2regwchLkDtCPnQn-lkVBMR42LKkvMQs3QEUfdMs';

  // Wait for SDK
  let attempts = 0;
  while (!window.supabase && attempts < 30) {
    await new Promise(r => setTimeout(r, 100));
    attempts++;
  }
  if (!window.supabase) { redirect(); return; }

  const sb = window.supabase.createClient(SB_URL, SB_KEY);
  const { data: { session } } = await sb.auth.getSession();

  if (!session) { redirect(); return; }

  // Expose client globally so the page can reuse it
  window._sb   = sb;
  window._user = session.user;

  // Listen for sign-out from another tab
  sb.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') redirect();
  });

  function redirect() {
    const returnTo = encodeURIComponent(window.location.href);
    window.location.href = `login.html?returnTo=${returnTo}`;
  }
})();
