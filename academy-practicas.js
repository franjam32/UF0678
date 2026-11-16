/* Atlas visual · SVA: abre dúas prácticas con vídeo real e retorno á aula. */
(function(){'use strict';
 const lessons=[
  {name:'PCR · Preparación do tubo',desc:'Vídeo, dez pasos e fotografías',url:'practicas/pcr_sva.html'},
  {name:'Vía aérea · i-gel',desc:'Supraglóticos e colocación guiada',url:'practicas/igel.html'}
 ];
 const dlg=document.createElement('dialog');dlg.className='practice-overlay';dlg.setAttribute('aria-label','Práctica audiovisual de soporte vital avanzado');
 dlg.innerHTML='<div class="practice-shell"><div class="practice-toolbar"><div class="practice-heading"><small>UF0678 · ATLAS VISUAL / SVA / PRÁCTICA AUDIOVISUAL</small><strong id="practice-current-title"></strong></div><button id="practice-return" type="button">← Volver ao atlas</button></div><iframe id="practice-frame" title="Práctica audiovisual" allow="fullscreen; autoplay" allowfullscreen loading="eager"></iframe></div>';
 const frame=dlg.querySelector('#practice-frame');
 function close(){if(dlg.open)dlg.close();}
 function openLesson(i){const a=lessons[i];dlg.querySelector('#practice-current-title').textContent=a.name;frame.src=a.url;dlg.showModal();}
 dlg.addEventListener('close',()=>{frame.src='about:blank'});
 dlg.querySelector('#practice-return').addEventListener('click',close);
 document.addEventListener('DOMContentLoaded',()=>{
  document.body.appendChild(dlg);
  const app=document.querySelector('#app');if(!app)return;
  function enhance(){
   const target=app.querySelector('.atlas-index .thumb-list');
   const isSVA=app.classList.contains('view-theory') && !!app.querySelector('[data-group="sva"][aria-pressed="true"]');
   if(!target||!isSVA)return;
   if(app.querySelector('.atlas-guided'))return;
   const block=document.createElement('div');block.className='atlas-guided';
   const title=document.createElement('span');title.className='atlas-guided-label';title.textContent='PRÁCTICAS AUDIOVISUAIS';block.appendChild(title);
   lessons.forEach((l,i)=>{
    const b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Abrir '+l.name);
    const icon=document.createElement('span');icon.className='guided-play';icon.textContent='▶';
    const copy=document.createElement('span');copy.className='guided-copy';
    const strong=document.createElement('strong');strong.textContent=l.name;const small=document.createElement('small');small.textContent=l.desc;
    copy.append(strong,small);b.append(icon,copy);b.addEventListener('click',()=>openLesson(i));block.appendChild(b);
   });
   target.after(block);
  }
  const obs=new MutationObserver(enhance);obs.observe(app,{childList:true,subtree:false});enhance();
 });
})();
