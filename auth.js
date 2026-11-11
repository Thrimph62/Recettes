/* auth.js — à inclure dans <head> APRÈS le SDK Supabase.
   Expose window._sb (client unique) et masque la page tant qu'il n'y a pas de session. */
(() => {
  const SB_URL = 'https://wcmbbgkjjlohxviwjivm.supabase.co';
  const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjbWJiZ2tqamxvaHh2aXdqaXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2MDk5NTMsImV4cCI6MjA5MjE4NTk1M30.CUf2regwchLkDtCPnQn-lkVBMR42LKkvMQs3QEUfdMs';
  const sb = window._sb = window.supabase.createClient(SB_URL, SB_KEY);
  const root = document.documentElement;
  root.style.visibility = 'hidden';

  const redirect = () => {
    window.location.href = 'login.html?returnTo=' + encodeURIComponent(window.location.href);
  };

  window._authReady = sb.auth.getSession().catch(() => ({ data: {} })).then(({ data: { session } = {} }) => {
    if (!session) { redirect(); return new Promise(() => {}); }  // bloque la suite pendant la redirection
    window._user = session.user;
    root.style.visibility = '';
    return session;
  });

  sb.auth.onAuthStateChange(e => { if (e === 'SIGNED_OUT') redirect(); });
})();
