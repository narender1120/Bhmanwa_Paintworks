'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  initNavbar(); initMobileMenu(); initScrollReveal();
  initFAQ(); initForm(); initScrollTop(); initActiveNav();
});

function initNavbar(){
  const nav=document.getElementById('navbar');
  if(!nav)return;
  const t=()=>nav.classList.toggle('scrolled',window.scrollY>60);
  window.addEventListener('scroll',t,{passive:true}); t();
}

function initMobileMenu(){
  const ham=document.getElementById('hamburger');
  const mob=document.getElementById('mobile-nav');
  if(!ham||!mob)return;
  const toggle=(close=false)=>{
    const open=close?false:!mob.classList.contains('open');
    mob.classList.toggle('open',open);
    ham.classList.toggle('open',open);
    ham.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  };
  ham.addEventListener('click',()=>toggle());
  mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggle(true)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')toggle(true);});
}

function initScrollReveal(){
  const els=document.querySelectorAll('.sr');
  if(!els.length)return;
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      const el=entry.target;
      const sibs=[...el.parentElement.querySelectorAll('.sr')];
      const idx=sibs.indexOf(el);
      const hasDelay=['d1','d2','d3','d4','d5'].some(c=>el.classList.contains(c));
      setTimeout(()=>el.classList.add('in'),hasDelay?0:Math.min(idx*90,450));
      obs.unobserve(el);
    });
  },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>obs.observe(el));
}

function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q');
    if(!q)return;
    q.addEventListener('click',()=>{
      const wasOpen=item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>{
        i.classList.remove('open');
        i.querySelector('.faq-q')?.setAttribute('aria-expanded','false');
      });
      if(!wasOpen){item.classList.add('open');q.setAttribute('aria-expanded','true');}
    });
    q.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();q.click();}});
  });
}

function initForm(){
  const form=document.getElementById('contact-form');
  if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const n=(form.querySelector('#fn')?.value||'').trim();
    const p=(form.querySelector('#fp')?.value||'').trim();
    const s=form.querySelector('#fs')?.value||'Not specified';
    const l=(form.querySelector('#fl')?.value||'').trim()||'Not specified';
    const m=(form.querySelector('#fm')?.value||'').trim()||'-';
    if(!n){form.querySelector('#fn')?.focus();return;}
    if(!p){form.querySelector('#fp')?.focus();return;}
    const txt=`Hello Bhamanwa Paintworks!\n\n👤 Name: ${n}\n📞 Phone: ${p}\n🎨 Service: ${s}\n📍 Location: ${l}\n💬 Message: ${m}`;
    window.open(`https://wa.me/918700521346?text=${encodeURIComponent(txt)}`,'_blank','noopener');
    form.style.display='none';
    const ok=document.getElementById('form-ok');
    if(ok)ok.style.display='block';
  });
}

function initScrollTop(){
  const btn=document.getElementById('scrolltop');
  if(!btn)return;
  window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>400),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

function initActiveNav(){
  const secs=document.querySelectorAll('section[id]');
  const links=document.querySelectorAll('.nav-links a[href^="#"]');
  if(!secs.length||!links.length)return;
  const u=()=>{
    let cur='';
    secs.forEach(s=>{if(window.scrollY>=s.offsetTop-160)cur=s.id;});
    links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${cur}`));
  };
  window.addEventListener('scroll',u,{passive:true}); u();
}

