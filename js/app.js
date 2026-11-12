(function(){
document.getElementById('ano').textContent=new Date().getFullYear();
var riel=document.getElementById('riel'),ant=document.getElementById('ant'),sig=document.getElementById('sig');
function paso(){var c=riel.querySelector('.juego');return c?c.offsetWidth+18:320;}
function bordes(){ant.disabled=riel.scrollLeft<=4;sig.disabled=riel.scrollLeft>=riel.scrollWidth-riel.clientWidth-4;}
ant.addEventListener('click',function(){riel.scrollBy({left:-paso(),behavior:'smooth'});});
sig.addEventListener('click',function(){riel.scrollBy({left:paso(),behavior:'smooth'});});
riel.addEventListener('scroll',bordes,{passive:true});
bordes();
if('IntersectionObserver' in window){
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.2,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.tiempo li').forEach(function(li){obs.observe(li);});
}else{document.querySelectorAll('.tiempo li').forEach(function(li){li.classList.add('visible');});}
var EMAIL='daaniel.ruedaa@gmail.com';
var btnCopiar=document.getElementById('copiarEmail');
btnCopiar.addEventListener('click',function(){
var done=function(){
btnCopiar.textContent='Copiado';
btnCopiar.classList.add('copiado');
aviso('Email copiado');
setTimeout(function(){btnCopiar.textContent='Copiar email';btnCopiar.classList.remove('copiado');},1800);
};
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(EMAIL).then(done).catch(function(){aviso(EMAIL);done();});}
else{aviso(EMAIL);done();}
});
function aviso(m){var d=document.createElement('div');d.textContent=m;d.style.cssText='position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:#F5B83D;color:#141A2E;font-weight:700;padding:12px 20px;border-radius:12px;z-index:99';document.body.appendChild(d);setTimeout(function(){d.remove();},2200);}
var f=document.getElementById('formContacto'),e=document.getElementById('falta');
f.addEventListener('submit',function(ev){
ev.preventDefault();
var okN=f.nombre.value.trim().length>1;
var okE=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim());
var okM=f.mensaje.value.trim().length>5;
f.nombre.style.borderColor=okN?'':'#D92D20';f.email.style.borderColor=okE?'':'#D92D20';f.mensaje.style.borderColor=okM?'':'#D92D20';
e.hidden=okN&&okE&&okM;
if(!(okN&&okE&&okM))return;
var s=encodeURIComponent('Contacto portfolio, '+f.nombre.value.trim());
var b=encodeURIComponent('Hola Alex,\n\nSoy '+f.nombre.value.trim()+' ('+f.email.value.trim()+').\n\n'+f.mensaje.value.trim());
window.location.href='mailto:'+EMAIL+'?subject='+s+'&body='+b;
aviso('Abriendo tu email con el mensaje listo');
f.reset();
});
})();