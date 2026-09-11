
document.addEventListener('DOMContentLoaded',()=>{
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
  const menu=document.querySelector('.menu'), links=document.querySelector('.links');
  if(menu) menu.addEventListener('click',()=>{links.style.display=links.style.display==='flex'?'none':'flex';links.style.position='absolute';links.style.top='68px';links.style.left='0';links.style.right='0';links.style.padding='18px 5%';links.style.background='#fff';links.style.flexDirection='column';links.style.borderBottom='1px solid #e2e8f0'});
  const form=document.querySelector('#contactForm');
  if(form) form.addEventListener('submit',e=>{e.preventDefault();document.querySelector('#formMsg').textContent='Thank you. Your enquiry form is ready to be connected to the Thendra AI backend/email workflow.';form.reset()});
});
