// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
function closeMenu(){
  nav?.classList.remove('nav--open');
  menuBtn?.setAttribute('aria-expanded', 'false');
}
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('nav--open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Theme toggle
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
function setTheme(t){
  if (t) root.setAttribute('data-theme', t);
  else root.removeAttribute('data-theme');
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) setTheme(savedTheme);

themeBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? '' : 'light';
  if (next) localStorage.setItem('theme', 'light');
  else localStorage.removeItem('theme');
  setTheme(next);
});

// Language toggle (ES/EN)
const langBtn = document.getElementById('langBtn');
const langLabel = langBtn?.querySelector('.lang');

function applyLang(lang){
  root.setAttribute('data-lang', lang);
  if (langLabel) langLabel.textContent = lang.toUpperCase();
  localStorage.setItem('lang', lang);
  // translate small UI labels via data-i18n
  const dict = {
    es:{
      skip:'Saltar al contenido',
      nav_about:'Sobre mí', nav_exp:'Experiencia', nav_proj:'Proyectos', nav_skills:'Habilidades', nav_contact:'Contacto',
      download_cv:'Descargar CV',
      cta_projects:'Ver proyectos', cta_contact:'Contactar',
      fact_location_k:'Ubicación', fact_location_v:'LATAM',
      fact_lang_k:'Idiomas', fact_lang_v:'ES (nativo) · EN (avanzado) · PT (básico)',
      contact_title:'Contacto', phone:'Tel',
      impact_sales:'Ventas', impact_claims:'Reclamos', impact_revenue:'Ingresos', impact_market:'Mercado', impact_new_market:'Nuevo',
      email_me:'Enviar email', call_me:'Llamar',
      send:'Enviar', back_top:'Volver arriba',
      ph_name:'Tu nombre', ph_email:'tu@email.com', ph_message:'Contame en qué te puedo ayudar'
    },
    en:{
      skip:'Skip to content',
      nav_about:'About', nav_exp:'Experience', nav_proj:'Projects', nav_skills:'Skills', nav_contact:'Contact',
      download_cv:'Download CV',
      cta_projects:'View projects', cta_contact:'Contact',
      fact_location_k:'Location', fact_location_v:'LATAM',
      fact_lang_k:'Languages', fact_lang_v:'ES (native) · EN (advanced) · PT (basic)',
      contact_title:'Contact', phone:'Phone',
      impact_sales:'Sales', impact_claims:'Complaints', impact_revenue:'Revenue', impact_market:'Market', impact_new_market:'New',
      email_me:'Email me', call_me:'Call',
      send:'Send', back_top:'Back to top',
      ph_name:'Your name', ph_email:'you@email.com', ph_message:'How can I help?'
    }
  };

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[lang] && dict[lang][key]) el.textContent = dict[lang][key];
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[lang] && dict[lang][key]) el.setAttribute('placeholder', dict[lang][key]);
  });
}

const savedLang = localStorage.getItem('lang');
const browserLang = (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
applyLang(savedLang || browserLang);

langBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-lang') || 'es';
  const next = current === 'es' ? 'en' : 'es';
  applyLang(next);
});
