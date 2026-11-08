/* ===================== JAVASCRIPT = WHAT THE SITE DOES =====================
   It runs in the browser after the page loads. Three small jobs: */

/* Grab the Menu button and the menu list so we can control them */
const burger=document.getElementById('burger'),menu=document.getElementById('menu');

/* JOB 1: clicking the Menu button opens/closes the menu on phones
   (toggle adds the class "open" if missing, removes it if present) */
burger.addEventListener('click',()=>{
  const o=menu.classList.toggle('open');
  burger.setAttribute('aria-expanded',o); // tells screen readers if it's open
});

/* JOB 2: smooth scrolling. When a menu link is clicked, slide to its section
   instead of jumping, then close the phone menu. */
const links=[...menu.querySelectorAll('a')]; // all the menu links
links.forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href')); // find the section, e.g. #about
  if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}
  menu.classList.remove('open');burger.setAttribute('aria-expanded',false);
}));

/* JOB 3: highlight the menu link for the section you are looking at.
   IntersectionObserver watches sections and tells us which is in the middle of the screen. */
const io=new IntersectionObserver(es=>es.forEach(en=>{
  if(en.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id));
}),{rootMargin:'-45% 0px -50% 0px'}); // only counts a section when it crosses the middle of the screen
document.querySelectorAll('section[id]').forEach(s=>io.observe(s)); // watch every section that has an id
