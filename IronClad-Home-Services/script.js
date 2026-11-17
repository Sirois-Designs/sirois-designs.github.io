'use strict';
(() => {
  const header = document.getElementById('site-header');
  const menuButton = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-nav');
  const setSticky = () => header?.classList.toggle('stuck', window.scrollY > 44);
  setSticky(); window.addEventListener('scroll', setSticky, {passive:true});
  if (menuButton && nav) {
    const closeMenu = () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open menu'); };
    menuButton.addEventListener('click', () => {const open = !nav.classList.contains('open');nav.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
    window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMenu();});
  }
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:0.09,rootMargin:'0px 0px -14px 0px'});
    revealElements.forEach(el=>observer.observe(el));
  } else revealElements.forEach(el=>el.classList.add('visible'));
  const select = document.querySelector('select[name="service"]');
  document.querySelectorAll('[data-service]').forEach(a => a.addEventListener('click',()=>{if(select)select.value=a.dataset.service;}));
  document.querySelectorAll('[data-mailto-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    const d=Object.fromEntries(new FormData(form).entries());
    const lines=[`IronClad Home Services — Service Inquiry`,``,`Name: ${d.first} ${d.last}`,`Email: ${d.email}`,`Phone: ${d.phone||'Not provided'}`,`Service: ${d.service}`,``,`Request details:`,d.message,``,`Submitted via the website preview; please reply to arrange next steps.`];
    const subject=`IronClad Home Services Inquiry — ${d.service}`;
    const mailto=`mailto:admin@icladcontracting.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    const feedback=form.querySelector('.form-feedback');
    if(feedback){feedback.hidden=false;feedback.textContent='Your email app should open with the request prepared. Review it and press Send in your email app to contact IronClad. If nothing opens, email admin@icladcontracting.com directly.';}
    window.location.href=mailto;
  }));
})();
