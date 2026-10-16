/** Introvert to Influencer — static LMS experience.
 * Data is bundled locally; the checkout is a visual-only demo with no real payment or enrollment.
 * Practice completion is IN MEMORY ONLY and resets on page reload.
 */
(() => {
  'use strict';
  const app = document.querySelector('.lms-shell');
  if (!app) return;
  const data = window.SHALINI_COURSES || {};
  const params = new URLSearchParams(window.location.search);
  const slug = Object.prototype.hasOwnProperty.call(data, params.get('course')) ? params.get('course') : 'speakathon';
  const course = data[slug];
  const $ = selector => document.querySelector(selector);
  const el = (tag, className, content) => {const node=document.createElement(tag);if(className)node.className=className;if(content!=null)node.textContent=content;return node;};
  const flatten = record => (record.modules || []).flatMap((m,i) => m.lessons.map((lesson,j)=>({...lesson,group:i,module:m.title,position:j})));
  const formatMoney = n => '₹' + Number(n).toLocaleString('en-IN');
  const updateUrl = (filename, id) => filename + '?course=' + encodeURIComponent(id);
  // A few course-specific, honest demo learning outcomes and bonus notes.
  const outcomeCopy = {
    speakathon:['Articulate your thoughts more clearly','Use vocal variety with intention','Communicate with clarity and calm','Handle conversations with greater ease','Leave an authentic, lasting impression'],
    'power-dressing':['Identify flattering color families','Understand outfit proportion and fit','Create intentional looks for different occasions','Plan an adaptable wardrobe','Show up with greater confidence'],
    'dining-etiquette':['Feel at ease at professional and social meals','Understand place settings and cutlery','Make introductions and join conversations comfortably','Host or attend meals with thoughtful manners'],
    'power-bundle':['Work on confident speaking habits','Develop an authentic personal style','Bring clarity to how you present yourself','Practice verbal and visual communication','Build a repeatable growth routine']
  };
  const bonusCopy = {
    speakathon:[['Personal 1:1 Coaching Session','The reference program describes an additional coaching benefit after all 21 challenges are completed. Confirm availability and conditions with the Academy.'],['25 Power Moves to Influence Anyone','Practical communication ideas to practice in conversations, meetings and presentations.'],['Blueprint for Unshakable Confidence','A framework for noticing and practicing confident communication habits.'],['Introvert2Influencer Digital Handbook','Additional learning and reflection prompts described in the reference material.']],
    'power-dressing':[['Personal style worksheet','A planning template for learning about colors, proportions and outfit choices.'],['Wardrobe audit framework','Questions to help evaluate fit, function and personal style.'],['Daily outfit formula','An approachable method for intentional styling.']],
    'dining-etiquette':[['Dining occasion checklist','A simple prompt to prepare for a professional or social meal.'],['Conversation cues','Suggestions for comfortable introductions and table conversation.'],['Hosting notes','A practical checklist for welcoming guests and planning a meal.']],
    'power-bundle':[['Two learning themes','Explore communication and image-building principles together.'],['Combined practice prompts','Bring spoken confidence and visual presentation into everyday routines.'],['Reflection framework','Review what you have tried and choose the next practical step.']]
  };

  // Catalog: real client-side category filters + text search. Accessible pressed states.
  const grid = $('#lms-catalog-grid');
  if (grid) {
    let selected = 'all';
    const search = $('#lms-course-search');
    const buttons = [...document.querySelectorAll('[data-lms-filter]')];
    const cards = [...grid.querySelectorAll('.lms-course-tile')];
    const filter = () => {
      const q = (search?.value || '').trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const categoryOK = selected === 'all' || card.dataset.category === selected;
        const textOK = !q || (card.dataset.search + ' ' + card.textContent).toLocaleLowerCase().includes(q);
        const match = categoryOK && textOK;
        card.hidden = !match;
        if(match) visible++;
      });
      const empty = $('#lms-empty'); if (empty) empty.hidden = visible !== 0;
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      selected = button.dataset.lmsFilter;
      buttons.forEach(b => {b.classList.toggle('is-selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
      filter();
    }));
    search?.addEventListener('input',filter);
    filter();
  }

  // Authentication interface: keyboard-accessible presentation only. No credentials saved or transmitted.
  const tabs = [...document.querySelectorAll('[data-lms-tab]')];
  if (tabs.length) {
    const selectTab = (tab, focus = false) => {
      tabs.forEach(t => {
        const active = t===tab;
        t.setAttribute('aria-selected',String(active));
        t.tabIndex=active?0:-1;
        const panel=document.getElementById(t.getAttribute('aria-controls'));
        if(panel)panel.hidden=!active;
      });
      if(focus)tab.focus();
    };
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>selectTab(tab));
      tab.addEventListener('keydown',event=>{
        if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
        event.preventDefault();
        const index = event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
        selectTab(tabs[index],true);
      });
    });
    if(params.get('mode')==='signup')selectTab(tabs.find(t=>t.dataset.lmsTab==='register')||tabs[0]);
    $('[data-lms-forgot]')?.addEventListener('click',()=>{
      const msg = $('#lms-login-form .lms-form-message');
      if(msg)msg.textContent='Password recovery will become available when real student accounts are implemented. No email is sent from this preview.';
    });
    document.querySelectorAll('[data-lms-password-toggle]').forEach(button=>button.addEventListener('click',()=>{
      const input=button.parentElement.querySelector('input');if(!input)return;
      input.type=input.type==='password'?'text':'password';
      const shown=input.type==='text';button.textContent=shown?'Hide':'Show';button.setAttribute('aria-label',shown?'Hide password':'Show password');
    }));
    // Only validate local form fields; never read their values except checkValidity().
    ['lms-login-form','lms-register-form'].forEach(id=>document.getElementById(id)?.addEventListener('submit',event=>{
      event.preventDefault();
      const form=event.currentTarget;
      if (!form.reportValidity())return;
      // No form data collected, persisted, posted or used to imply authentication.
      window.location.href=updateUrl('lms-learn.html',slug);
    }));
  }

  // Dedicated course pages share one template; the content is unique per selected course.
  if ($('#lms-detail-title')) {
    if(!course)return;
    document.title=course.title+' | Shalini Rathod Academy';
    $('#lms-detail-title').textContent=course.title;
    $('#lms-breadcrumb-name').textContent=slug==='speakathon'?'Communication Course':course.title;
    $('#lms-detail-summary').textContent=course.description;
    $('#lms-detail-price').textContent=formatMoney(course.price);
    const total=flatten(course).length;
    $('#lms-detail-count').textContent=(slug==='speakathon'?'21 guided challenges':total+' preview topics');
    const detailRating=$('#lms-detail-rating');
    const detailLearners=$('#lms-detail-learners');
    const detailSession=$('#lms-detail-session');
    const detailMode=$('#lms-detail-mode');
    const detailNote=$('#lms-detail-note');
    if(slug==='speakathon'){
      detailRating.replaceChildren(el('span','lms-rating-star','★'),document.createTextNode(' 4.9 Rating'));
      detailLearners.textContent='100+ learners';
      detailLearners.hidden=false;
      detailSession.textContent='Free 1:1 session included';
      detailSession.hidden=false;
      detailMode.hidden=true;
      detailNote.textContent='Course price is illustrative until confirmed.';
    }
    $('#lms-detail-category').textContent=slug==='speakathon'?'21-DAY COMMUNICATION CHALLENGE':slug==='power-dressing'?'PERSONAL IMAGE & STYLE':slug==='dining-etiquette'?'DINING ETIQUETTE':'COMMUNICATION + STYLE BUNDLE';
    const image=$('#lms-detail-photo');
    image.src=slug==='power-dressing'?'assets/services/styling-consultation.webp':(slug==='power-bundle'||slug==='dining-etiquette')?'assets/services/course-bundle.webp':'assets/services/communication-workshop.webp';
    image.alt=course.title+' course preview image';
    $('#lms-enroll-cta').href=updateUrl('lms-auth.html',slug);
    $('#lms-syllabus-player')?.setAttribute('href',updateUrl('lms-learn.html',slug));
    const checkoutDialog=$('#lms-checkout-dialog');
    const checkoutTriggers=[$('#lms-curriculum-enroll'),$('#lms-enroll-cta')].filter(Boolean);
    const checkoutPayment=checkoutDialog?.querySelector('[data-checkout-screen="payment"]');
    const checkoutSuccess=checkoutDialog?.querySelector('[data-checkout-screen="success"]');
    const checkoutPay=$('#lms-checkout-pay');
    const checkoutPreview=$('#lms-checkout-preview');
    if(checkoutDialog&&checkoutTriggers.length&&checkoutPayment&&checkoutSuccess&&checkoutPay){
      const resetCheckout=()=>{
        checkoutPayment.hidden=false;
        checkoutSuccess.hidden=true;
        checkoutDialog.setAttribute('aria-labelledby','lms-checkout-title');
      };
      checkoutTriggers.forEach(trigger=>trigger.addEventListener('click',event=>{
        event.preventDefault();
        const title=$('#lms-detail-title')?.textContent||course.title;
        const price=$('#lms-detail-price')?.textContent||formatMoney(course.price);
        $('#lms-checkout-course').textContent=title;
        $('#lms-checkout-amount').textContent=price;
        $('#lms-checkout-success-course').textContent=title;
        $('#lms-checkout-success-amount').textContent=price;
        checkoutPay.textContent='Pay '+price+' · Demo';
        if(checkoutPreview)checkoutPreview.href=updateUrl('lms-learn.html',slug);
        checkoutDialog.showModal();
      }));
      checkoutDialog.querySelectorAll('[data-checkout-close]').forEach(button=>button.addEventListener('click',()=>checkoutDialog.close()));
      checkoutDialog.addEventListener('click',event=>{if(event.target===checkoutDialog)checkoutDialog.close();});
      checkoutDialog.addEventListener('close',resetCheckout);
      checkoutPay.addEventListener('click',()=>{
        checkoutPayment.hidden=true;
        checkoutSuccess.hidden=false;
        checkoutDialog.setAttribute('aria-labelledby','lms-checkout-success-title');
        $('#lms-checkout-success-title')?.focus();
      });
    }
    if (slug === 'dining-etiquette') {
      const previewSection=$('#lms-previews');
      const previewHeading=previewSection?.querySelector('.lms-section-heading h2');
      const previewDescription=previewSection?.querySelector('.lms-section-heading p');
      const previewGrid=previewSection?.querySelector('.lms-preview-grid');
      if(previewHeading)previewHeading.textContent='A little more ease at every table.';
      if(previewDescription)previewDescription.textContent='Explore the Dining Etiquette course outline. Lesson recordings will be added as they become available.';
      if(previewGrid){
        previewGrid.replaceChildren(...course.modules[0].lessons.slice(0,2).map((lesson,i)=>{
          const card=el('article','lms-preview-card');
          const visual=el('div','lms-preview-portrait lms-topic-preview',String(i+1).padStart(2,'0'));
          visual.setAttribute('aria-hidden','true');
          const copy=el('div','lms-preview-copy');
          copy.append(el('span','lms-eyebrow','DINING ETIQUETTE · COURSE OUTLINE'),el('h3','',lesson.title.replace(' · Lesson awaiting upload','')),el('p','',lesson.summary),el('div','lms-preview-tags'));
          copy.querySelector('.lms-preview-tags').append(el('span','','Course topic'),el('span','','Self-paced'));
          card.append(visual,copy);
          return card;
        }));
      }
      const firstButton=$('.lms-buttons .lms-secondary');
      if(firstButton)firstButton.textContent='Explore course topics ↓';
      const curriculumSection=$('#lms-curriculum-section');
      const curriculumTitle=curriculumSection?.querySelector('.lms-curriculum-grid h2');
      const curriculumDescription=curriculumSection?.querySelector('.lms-curriculum-grid > div > p');
      const curriculumNumber=curriculumSection?.querySelector('.lms-curriculum-number');
      const curriculumLabel=curriculumSection?.querySelector('.lms-curriculum-aside > span');
      if(curriculumTitle)curriculumTitle.textContent='Your dining etiquette learning path.';
      if(curriculumDescription)curriculumDescription.textContent='Browse the course topics. Lesson recordings will be added as they become available.';
      if(curriculumNumber)curriculumNumber.textContent=String(total);
      if(curriculumLabel)curriculumLabel.textContent='COURSE TOPICS';
    }
    if (slug === 'speakathon') {
      const entries = [course.modules[0].lessons[0],course.modules[0].lessons[3]];
      [...document.querySelectorAll('.lms-preview-card')].slice(0,2).forEach((card,i)=>{
        const item=entries[i];
        const frame=card.querySelector('.lms-preview-portrait');
        if (frame) {
          const video=el('video','lms-preview-real-video');
          video.controls=true;video.playsInline=true;video.preload='metadata';
          video.poster='assets/lms/previews/day-0'+(i===0?'1':'4')+'-excerpt-poster.jpg';
          video.setAttribute('aria-label',i===0?'Day 1 excerpt from 00:26 to 01:05':'Day 4 excerpt from 00:05 to 00:19');
          const source=el('source');source.src='assets/lms/previews/day-0'+(i===0?'1':'4')+'-excerpt.mp4';source.type='video/mp4';
          video.append(source,document.createTextNode('Your browser does not support HTML video.'));
          frame.replaceChildren(video);
        }
        const title=card.querySelector('h3');if(title)title.textContent=i===0?'Speak Confidently in front of the Camera':'The Easiest Way to Look More Confident';
        const desc=card.querySelector('p');if(desc)desc.textContent=i===0?'Learn a simple exercise that helps you stop overthinking before speaking.':'See how a genuine smile can help you build trust, create stronger first impressions, and connect effortlessly.';
        const eyebrow=card.querySelector('.lms-eyebrow');if(eyebrow)eyebrow.textContent=i===0?'PREVIEW LESSON 1 · CHALLENGE 1':'PREVIEW LESSON 2 · CHALLENGE 4';
        const tags=card.querySelector('.lms-preview-tags');if(tags)tags.replaceChildren(...(i===0?[el('span','','3-minute lesson'),el('span','','Actionable Plan included')]:[el('span','','😊 Body language tip'),el('span','','⚡ Easy to apply')]));
        const link=el('a','lms-asset-link lms-asset-primary','View lesson '+(i===0?1:4)+' →');
        link.href=updateUrl('lms-course.html',slug)+'#course-purchase';
        card.querySelector('.lms-preview-copy')?.append(link);
      });
    }

    const ul=$('#lms-inclusions');course.includes.forEach(x=>ul.append(el('li','',x)));
    const benefits=$('#lms-outcomes');(outcomeCopy[slug]||[]).forEach(x=>benefits.append(el('div','',x)));
    const bonuses=$('#lms-bonuses');(bonusCopy[slug]||[]).forEach(([title,desc],i)=>{
      const item=el('details');if(i===0)item.open=true;
      item.addEventListener('toggle',()=>{
        if(!item.open)return;
        bonuses.querySelectorAll('details[open]').forEach(other=>{if(other!==item)other.open=false;});
      });
      item.append(el('summary','',title),el('p','',desc));bonuses.append(item);
    });
    const curr=$('#lms-curriculum');
    course.modules.forEach((m,i)=>{
      const block=el('details');block.open=i===0;
      const summary=el('summary');const text=el('span','',m.title);text.append(el('small','',m.lessons.length+' lesson'+(m.lessons.length===1?'':'s')));
      summary.append(text);block.append(summary);
      m.lessons.forEach(lesson=>{
        const line=el('div','lms-lesson-item');
        line.append(el('strong','',lesson.title),el('span','',lesson.summary?'PRACTICE':'OUTLINE'));
        block.append(line);
      });curr.append(block);
    });
    $('#lms-expand-all')?.addEventListener('click',()=>curr.querySelectorAll('details').forEach(d=>d.open=true));
    $('#lms-collapse-all')?.addEventListener('click',()=>curr.querySelectorAll('details').forEach(d=>d.open=false));
  }

  // Learning dashboard: all states live, accessible, and in-memory only (reset on reload).
  const learnTitle=$('#lms-learn-title');
  if (learnTitle && course) {
    learnTitle.textContent=course.title;
    document.title='Learning Preview · '+course.title+' | Shalini Rathod Academy';
    $('#lms-learn-detail-link').href=updateUrl('lms-course.html',slug);
    const flat=flatten(course);
    const completed=new Set();
    const requestedLesson=Number(params.get('lesson'));
    let active=Number.isInteger(requestedLesson) && requestedLesson>=1 && requestedLesson<=flat.length?requestedLesson-1:0;

    const isSpeakathon=slug==='speakathon';
    const video=$('#lms-lesson-video');
    const driveCover=$('#lms-drive-cover');
    const driveFrame=$('#lms-drive-iframe');
    const assets=$('#lms-lesson-assets');
    const resourcePanel=$('#lms-course-resources-panel');
    const resourceList=$('#lms-course-resources');
    if(isSpeakathon){
      if(video)video.hidden=true;
      if(assets)assets.hidden=false;
      if(resourcePanel&&resourceList){
        resourcePanel.hidden=false;
        (course.resources||[]).forEach(resource=>{
          if(!/^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]+\/view$/.test(resource.url))return;
          const link=el('a','lms-resource-item');link.href=resource.url;link.target='_blank';link.rel='noopener noreferrer';
          link.setAttribute('aria-label','Open '+resource.title+' in Google Drive');
          link.append(el('span','lms-resource-icon',resource.type==='video'?'▶':resource.type==='image'?'▧':'▤'));
          const content=el('span','',resource.title);
          content.append(el('small','',resource.note||'Opens in Google Drive'));
          link.append(content,el('span','','→'));
          resourceList.append(link);
        });
      }
      $('#lms-drive-play')?.addEventListener('click',()=>{
        const link=flat[active]?.videoUrl;
        const match=link?.match(/^https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)\/view$/);
        if(!match||!driveFrame)return;
        driveFrame.src='https://drive.google.com/file/d/'+match[1]+'/preview';
        driveFrame.hidden=false;if(driveCover)driveCover.hidden=true;
      });
    }else{
      if(driveCover)driveCover.hidden=true;
      if(driveFrame)driveFrame.hidden=true;
      if(assets)assets.hidden=true;
      if(resourcePanel)resourcePanel.hidden=true;
    }
    const setDriveAnchor=(id,url)=>{
      const node=$(id);if(!node)return;
      const valid=typeof url==='string' && /^https:\/\/drive\.google\.com\/file\/d\/[A-Za-z0-9_-]+\/view$/.test(url);
      node.hidden=!valid;
      if(valid)node.href=url;
      else node.removeAttribute('href');
    };
    const groupContainer=$('#lms-learning-modules');
    const buttons=[];
    let position=0;
    course.modules.forEach((group,mi)=>{
      const d=el('details');d.open=mi===0;
      const heading=el('summary','',group.title+' · '+group.lessons.length+' lessons');
      d.append(heading);
      group.lessons.forEach((lesson,li)=>{
        const index=position++;
        const btn=el('button');btn.type='button';btn.dataset.lessonIndex=String(index);
        const num=el('span','lms-module-index',String(index+1).padStart(2,'0'));
        const text=el('span','lms-module-name',lesson.title);
        const state=el('span','lms-module-status','Next');
        btn.append(num,text,state);
        btn.addEventListener('click',()=>{active=index;render();});
        buttons.push(btn);d.append(btn);
      });groupContainer.append(d);
    });
    function render(){
      const l=flat[active];
      if(!l)return;
      $('#lms-current-module').textContent=l.module;
      $('#lms-current-lesson').textContent=l.title;
      const summary=l.summary || 'Review this learning topic and try a short practice activity.';
      $('#lms-lesson-description').textContent=summary;
      $('#lms-lesson-practice').textContent=l.practice || `Reflect on the topic “${l.title}” and write down one change you can try today.`;
      const items=$('#lms-practice-points');items.replaceChildren();
      (isSpeakathon?['Watch the original challenge video','Open the corresponding PDF for instructions','Record, review and reflect on your practice']:['Watch the sample video','Explore the topic at your own pace','Write one practical takeaway']).forEach(x=>items.append(el('li','',x)));
      const action=$('#lms-mark-complete');
      action.textContent=completed.has(active)?'✓ Completed · Undo':'Mark complete ✓';
      action.setAttribute('aria-pressed',String(completed.has(active)));
      $('#lms-prev-lesson').disabled=active===0;
      $('#lms-next-lesson').disabled=active===flat.length-1;
      buttons.forEach((button,index)=>{
        const done=completed.has(index);button.classList.toggle('is-complete',done);
        button.setAttribute('aria-current',index===active?'step':'false');
        button.querySelector('.lms-module-index').textContent=done?'✓':String(index+1).padStart(2,'0');
        button.querySelector('.lms-module-status').textContent=done?'Done':index===active?'Now':'Next';
      });
      // Reveal current lesson's module without collapsing the learner's other opened modules.
      const block=buttons[active]?.closest('details');if(block)block.open=true;
      const percent=Math.round(completed.size/Math.max(1,flat.length)*100);
      $('#lms-progress-percent').textContent=percent+'%';
      $('#lms-progress-fill').style.width=percent+'%';
      $('#lms-progress-bar').setAttribute('aria-valuenow',String(percent));
      $('#lms-progress-caption').textContent=`${completed.size} of ${flat.length} lessons completed in this preview`;
      $('#lms-lesson-total').textContent=flat.length+' lessons';
      if (video && !video.paused)video.pause();
      if (video)video.currentTime=0;
      if (isSpeakathon) {
        if(driveFrame){driveFrame.removeAttribute('src');driveFrame.hidden=true;}
        if(driveCover)driveCover.hidden=false;
        const driveTitle=$('#lms-drive-title');if(driveTitle)driveTitle.textContent=l.title;
        setDriveAnchor('#lms-video-open',l.videoUrl);
        setDriveAnchor('#lms-pdf-open',l.pdfUrl);
        setDriveAnchor('#lms-solution-open',l.solutionUrl);
        const note=$('#lms-lesson-note');if(note)note.textContent='Original Shalini lesson: open the Drive video or daily PDF. Drive access depends on its sharing permissions; this frontend does not verify enrollment.';
      }

    }
    $('#lms-mark-complete')?.addEventListener('click',()=>{completed.has(active)?completed.delete(active):completed.add(active);render();});
    $('#lms-prev-lesson')?.addEventListener('click',()=>{active=Math.max(0,active-1);render();});
    $('#lms-next-lesson')?.addEventListener('click',()=>{active=Math.min(flat.length-1,active+1);render();});
    render();
  }
})();
