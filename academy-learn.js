(() => {
  'use strict';
  const data=window.SHALINI_COURSES||{};
  const params=new URLSearchParams(location.search);
  const slug=data[params.get('course')]?params.get('course'):'speakathon';
  const course=data[slug];if(!course)return;
  const $=id=>document.getElementById(id);
  const mediaUrl=path=>{
    if(location.hostname!=='jayantc1011.github.io')return path;
    const filename=String(path).split('/').pop();
    return 'https://github.com/jayantc1011/sr/releases/download/lms-media-2026-10-14/'+encodeURIComponent(filename);
  };
  const lessons=(course.modules||[]).flatMap((module,week)=>module.lessons.map((lesson)=>({...lesson,week,weekTitle:module.title})));
  const video=$('lesson-media'),stage=$('video-stage');
  const status=$('completion-note'),completeBtn=$('complete-and-next'),skipBtn=$('skip-video-next');
  const completed=new Set();
  const watched=new Set();
  let current=0,limit=0,mediaMode='lesson',extraKind=null,isMissing=false;
  const storeKey='shalini-study-v4:'+slug;
  // v3 used identical saved flags for genuine playback and the removed TEST ONLY skip.
  try{localStorage.removeItem('shalini-study-v3:'+slug);}catch(_){}
  try{
    const saved=JSON.parse(localStorage.getItem(storeKey)||'{}');
    (saved.done||[]).filter(n=>Number.isInteger(n)&&n>=0&&n<lessons.length).forEach(n=>completed.add(n));
    (saved.watched||[]).filter(n=>Number.isInteger(n)&&n>=0&&n<lessons.length).forEach(n=>watched.add(n));
    if(Number.isInteger(saved.active))current=saved.active;
  }catch(_){}
  const unavailable=n=>lessons[n]?.videoAvailable===false;
  // A recording marked unavailable can never count toward genuine watched progress.
  lessons.forEach((_,n)=>{if(unavailable(n)){completed.delete(n);watched.delete(n);}});
  // Missing course media stays incomplete but does not lock later available days.
  const unlocked=n=>n===0||Array.from({length:n},(_,i)=>completed.has(i)||unavailable(i)).every(Boolean);
  const save=()=>{try{localStorage.setItem(storeKey,JSON.stringify({done:[...completed],watched:[...watched],active:current}));}catch(_){}};
  const time=n=>{if(!Number.isFinite(n))return '0:00';n=Math.max(0,Math.floor(n));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');};
  const setStatus=(message,ready=false)=>{status.textContent=message;status.classList.toggle('is-ready',ready);};
  const setProgress=()=>{
    const percent=Math.round(completed.size/Math.max(1,lessons.length)*100);
    $('overall-count').textContent=completed.size+' of '+lessons.length+' complete';
    $('overall-meter').setAttribute('aria-valuenow',String(percent));
    $('overall-fill').style.width=percent+'%';
    $('roadmap-done').textContent=completed.size+' / '+lessons.length;
    $('roadmap-fill').style.width=percent+'%';
  };
  const setWatchProgress=()=>{
    const duration=Number.isFinite(video.duration)?video.duration:0;
    const percent=duration?Math.round(video.currentTime/duration*100):0;
    $('elapsed').textContent=time(video.currentTime);
    $('duration').textContent=time(duration);
    $('watch-fill').style.width=percent+'%';
    $('watch-meter').setAttribute('aria-valuenow',String(percent));
  };
  const updatePlayLabel=()=>{
    const playing=!video.paused&&!video.ended;
    $('toggle-play').setAttribute('aria-label',playing?'Pause video':'Play video');
    $('toggle-play').setAttribute('title',playing?'Pause video':'Play video');
    $('play-icon').setAttribute('d',playing?'M7 5h4v14H7zm6 0h4v14h-4z':'M8 4.6a1 1 0 0 1 1.52-.85l10 7.4a1 1 0 0 1 0 1.7l-10 7.4A1 1 0 0 1 8 19.4Z');
    $('large-play').hidden=playing||isMissing||video.ended;
  };
  const updateCompletion=()=>{
    const done=completed.has(current),seen=watched.has(current),last=current===lessons.length-1;
    completeBtn.disabled=!(done||seen)||isMissing;
    if(isMissing){setStatus('Recording awaiting upload.');$('complete-label').textContent='Video required';}
    else if(done){setStatus('Day completed ✓',true);$('complete-label').textContent=last?'Course completed ✓':'Continue to Day '+(current+2);}
    else if(seen){setStatus('Video watched — ready to continue.',true);$('complete-label').textContent=last?'Mark course complete':'Mark complete & continue';}
    else{setStatus('Watch the full video to continue.');$('complete-label').textContent='Finish video to continue';}
    $('next-hint').textContent=last?'Final challenge':'Up next: Day '+(current+2);
    $('previous-day').disabled=current===0;
  };
  const updateOutline=()=>{
    document.querySelectorAll('.learn-day-btn').forEach(button=>{
      const n=Number(button.dataset.day),missing=unavailable(n),done=completed.has(n)&&!missing;
      button.disabled=!unlocked(n);
      button.classList.toggle('is-completed',done);
      button.classList.toggle('is-missing-video',missing);
      button.setAttribute('aria-label',`Day ${n+1}: ${lessons[n].title.replace(/^Day\s*\d+\s*[·:–-]\s*/i,'')}${missing?' — video not uploaded':''}${done?' — completed':''}`);
      button.setAttribute('aria-current',n===current?'step':'false');
      button.querySelector('.learn-day-bullet').textContent=done?'✓':missing?'!':String(n+1).padStart(2,'0');
      button.querySelector('.learn-day-lock').textContent=missing?'No video':unlocked(n)?'':'⌁';
    });
  };
  const showMissing=()=>{
    isMissing=true;video.pause();video.hidden=true;
    $('large-play').hidden=true;$('video-missing').hidden=false;
    $('video-stage').classList.add('is-missing-video');
    $('toggle-play').disabled=true;setWatchProgress();updateCompletion();
  };
  const openVideo=(path,mode)=>{
    mediaMode=mode;limit=0;isMissing=false;video.pause();
    video.removeAttribute('src');video.load();
    video.hidden=false;$('video-missing').hidden=true;
    $('video-stage').classList.remove('is-missing-video');
    $('toggle-play').disabled=false;
    video.src=mediaUrl(path);video.defaultPlaybackRate=1;video.playbackRate=1;
    video.load();setWatchProgress();updatePlayLabel();
  };
  const select=(n,allowSkipped=false)=>{
    if(n<0||n>=lessons.length||(!allowSkipped&&!unlocked(n)))return;
    extraKind=null;
    skipBtn.hidden=n===lessons.length-1&&!closingResource;
    document.querySelector('.learn')?.classList.remove('is-extra-video');
    $('lesson-practice').closest('.learn-practice').hidden=false;
    completeBtn.closest('.learn-complete').hidden=false;
    $('previous-day').closest('.learn-next-link').hidden=false;
    document.querySelectorAll('.learn-extra-btn').forEach(b=>b.setAttribute('aria-current','false'));
    $('week-tag').hidden=false;
    $('open-worksheet').hidden=false;
    current=n;const lesson=lessons[n];
    const lessonDay=Number(String(lesson.id).split('-').pop());
    const dayPad=String(n+1).padStart(2,'0');
    const expectedVideo='assets/lms/videos/day-'+dayPad+'.mp4';
    const expectedPdf='assets/lms/pdfs/day-'+dayPad+'.pdf';
    if(lessonDay!==n+1||lesson.videoUrl!==expectedVideo||lesson.pdfUrl!==expectedPdf){
      console.error('Lesson data mismatch: refusing wrong video/worksheet for day '+(n+1),lesson);
      $('lesson-title').textContent='Lesson materials need review';
      $('lesson-practice').textContent='Lesson '+(n+1)+' contains mismatched media; do not use another day’s video.';
      $('video-stage').dataset.lessonDay=dayPad;
      showMissing();
      return;
    }
    $('video-stage').dataset.lessonDay=dayPad;
    $('challenge-day').textContent=dayPad;
    $('worksheet-link-label').textContent='View Day '+dayPad+' worksheet';
    document.title='Day '+(n+1)+' · Speakathon Learning | Shalini Rathod';
    $('day-number').textContent='DAY '+String(n+1).padStart(2,'0')+' / '+lessons.length;
    $('week-tag').textContent='WEEK '+(lesson.week+1);
    $('lesson-title').textContent=lesson.title.replace(/^Day\s*\d+\s*[·:–-]\s*/i,'');
    $('lesson-summary').textContent=lesson.summary||'Your next speaking challenge.';
    $('lesson-practice').textContent=lesson.practice||'Watch the video and practise with purpose.';
    $('watch-example').hidden=!lesson.solutionUrl;
    $('watch-example').querySelector('span:nth-child(2)').textContent='Watch example video';
    if(unavailable(n))showMissing();
    else openVideo(lesson.videoUrl,'lesson');
    updateCompletion();updateOutline();setProgress();
    const currentButton=document.querySelector('.learn-day-btn[data-day="'+n+'"]');
    if(currentButton && window.innerWidth>1000) {
      currentButton.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
    }
    const url=new URL(location.href);
    url.searchParams.set('course',slug);url.searchParams.set('lesson',String(n+1));
    history.replaceState(null,'',url.pathname+url.search+url.hash);
    save();
    // Return focus to the immediate action area without forcing long page scrolling.
    if(window.innerWidth<=690)window.scrollTo({top:0,behavior:'instant'});
  };
  const togglePlayback=()=>{
    if(isMissing)return;
    if(video.paused){video.play().catch(()=>{});}else video.pause();
  };
  video.addEventListener('keydown',event=>{
    if((event.code==='Space'||event.key===' ')&&!event.repeat&&!event.ctrlKey&&!event.metaKey&&!event.altKey){
      if(event.target.isContentEditable)return;
      event.preventDefault();togglePlayback();
    }
  });
  $('toggle-play').addEventListener('click',togglePlayback);
  $('large-play').addEventListener('click',togglePlayback);
  video.addEventListener('click',()=>{video.focus({preventScroll:true});togglePlayback();});
  video.addEventListener('play',updatePlayLabel);
  video.addEventListener('pause',updatePlayLabel);
  video.addEventListener('loadedmetadata',()=>{limit=0;setWatchProgress();updatePlayLabel();});
  video.addEventListener('timeupdate',()=>{
    if(!video.seeking && video.currentTime<=limit+1.2)limit=Math.max(limit,video.currentTime);
    setWatchProgress();
  });
  video.addEventListener('seeking',()=>{
    // Non-interactive watch bar + prevent programmatic forward seeking.
    if(video.currentTime>limit+0.9)video.currentTime=Math.max(0,limit-.05);
  });
  video.addEventListener('ratechange',()=>{
    if(video.playbackRate!==1)video.playbackRate=1;
  });
  video.addEventListener('ended',()=>{
    if(mediaMode==='lesson' && Number.isFinite(video.duration) && limit>=video.duration-1.7){
      watched.add(current);save();updateCompletion();
    }
    updatePlayLabel();
  });
  video.addEventListener('error',()=>{showMissing();});
  const fullscreenBtn=$('full-screen'),volumeBtn=$('volume-toggle');
  const syncFullscreen=()=>{
    const active=document.fullscreenElement===stage || document.webkitFullscreenElement===stage;
    fullscreenBtn.setAttribute('aria-label',active?'Exit full screen':'Full screen');
    fullscreenBtn.setAttribute('title',active?'Exit full screen':'Full screen');
    fullscreenBtn.innerHTML=active
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 9h6V3M21 9h-6V3M3 15h6v6M21 15h-6v6"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/></svg>';
  };
  fullscreenBtn.addEventListener('click',async()=>{
    try{
      if(document.fullscreenElement)await document.exitFullscreen();
      else if(stage.requestFullscreen)await stage.requestFullscreen();
      else if(stage.webkitRequestFullscreen)stage.webkitRequestFullscreen();
      else if(video.webkitEnterFullscreen){
        // Safari iOS cannot fullscreen generic containers. Native controls remain usable there.
        video.controls=true;
        video.webkitEnterFullscreen();
      }
    }catch(e){console.warn('Full-screen operation unavailable',e);}
    syncFullscreen();
  });
  document.addEventListener('fullscreenchange',syncFullscreen);
  document.addEventListener('webkitfullscreenchange',syncFullscreen);
  video.addEventListener('webkitendfullscreen',()=>{video.controls=false;syncFullscreen();});
  const syncMute=()=>{
    const mute=video.muted||video.volume===0;
    volumeBtn.setAttribute('aria-label',mute?'Unmute video':'Mute video');
    volumeBtn.setAttribute('title',mute?'Unmute video':'Mute video');
    volumeBtn.innerHTML=mute
      ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5ZM16 9l5 6m0-6-5 6"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5ZM15.5 8a5 5 0 0 1 0 8"/></svg>';
  };
  volumeBtn.addEventListener('click',()=>{video.muted=!video.muted;syncMute();});
  video.addEventListener('volumechange',syncMute);
  syncMute();
  completeBtn.addEventListener('click',()=>{
    if(isMissing||(!watched.has(current)&&!completed.has(current)))return;
    completed.add(current);save();setProgress();updateOutline();
    if(current<lessons.length-1)select(current+1);
    else updateCompletion();
  });
  $('previous-day').addEventListener('click',()=>select(current-1));
  skipBtn.addEventListener('click',()=>{
    video.pause();
    if(mediaMode==='extra'){
      if(extraKind==='intro')select(0,true);
      return;
    }
    if(current<lessons.length-1){select(current+1,true);return;}
    const closingButton=document.querySelector('.learn-closing-block .learn-extra-btn');
    if(closingButton)closingButton.click();
  });
  const outline=$('outline-list');
  const videoResources=(course.resources||[]).filter(item=>item.type==='video'&&item.url&&item.url.startsWith('assets/lms/videos/'));
  const playExtra=(item,button,which)=>{
    extraKind=which;skipBtn.hidden=which==='end';
    document.querySelectorAll('.learn-extra-btn').forEach(b=>b.setAttribute('aria-current','false'));
    button.setAttribute('aria-current','true');
    document.querySelectorAll('.learn-day-btn').forEach(b=>b.setAttribute('aria-current','false'));
    document.querySelector('.learn')?.classList.add('is-extra-video');
    $('day-number').textContent=which==='intro'?'WELCOME':'COURSE FINISH';
    $('week-tag').hidden=true;
    $('lesson-title').textContent=item.title;
    $('lesson-summary').textContent=item.note||'Course video';
    $('lesson-practice').textContent='';
    $('lesson-practice').closest('.learn-practice').hidden=true;
    completeBtn.closest('.learn-complete').hidden=true;
    $('previous-day').closest('.learn-next-link').hidden=true;
    $('open-worksheet').hidden=true;
    $('watch-example').hidden=true;
    openVideo(item.url,'extra');
    status.textContent=item.note||item.title;
    document.title=item.title+' · Speakathon Learning | Shalini Rathod';
    if(which==='intro'){
      const url=new URL(location.href);
      url.searchParams.set('course',slug);url.searchParams.delete('lesson');
      history.replaceState(null,'',url.pathname+url.search+url.hash);
    }
  };
  const introResource=videoResources.find(item=>/introduction/i.test(item.title));
  const closingResource=videoResources.find(item=>/closing|end/i.test(item.title));
  if(introResource){
    const group=document.createElement('div');group.className='learn-week-block learn-extra-block learn-intro-block';
    const head=document.createElement('div');head.className='learn-week-name';
    const label=document.createElement('span');label.textContent='START HERE';
    head.append(label);group.append(head);
    const button=document.createElement('button');button.className='learn-extra-btn';button.type='button';button.textContent=introResource.title;
    button.addEventListener('click',()=>playExtra(introResource,button,'intro'));
    group.append(button);outline.append(group);
  }
  course.modules.forEach((module,week)=>{
    const group=document.createElement('div');group.className='learn-week-block';
    const head=document.createElement('div');head.className='learn-week-name';
    const text=document.createElement('span');text.textContent=module.title;
    const count=document.createElement('span');count.textContent=module.lessons.length+' days';
    head.append(text,count);group.append(head);
    lessons.forEach((lesson,n)=>{
      if(lesson.week!==week)return;
      const button=document.createElement('button');button.className='learn-day-btn';
      button.type='button';button.dataset.day=n;
      const bullet=document.createElement('span');bullet.className='learn-day-bullet';bullet.textContent=String(n+1).padStart(2,'0');
      const title=document.createElement('span');title.className='learn-day-title';title.textContent=lesson.title.replace(/^Day \d+\s*[·:–-]\s*/i,'');
      const lock=document.createElement('span');lock.className='learn-day-lock';lock.setAttribute('aria-hidden','true');
      button.append(bullet,title,lock);
      button.addEventListener('click',()=>select(n));group.append(button);
    });
    outline.append(group);
  });
  if(closingResource){
    const group=document.createElement('div');group.className='learn-week-block learn-extra-block learn-closing-block';
    const head=document.createElement('div');head.className='learn-week-name';
    const label=document.createElement('span');label.textContent='AFTER DAY 21';
    head.append(label);group.append(head);
    const button=document.createElement('button');button.className='learn-extra-btn';button.type='button';button.textContent=closingResource.title;
    button.addEventListener('click',()=>playExtra(closingResource,button,'end'));
    group.append(button);outline.append(group);
  }
  const dialog=$('worksheet-dialog'),pdf=$('worksheet-frame');
  $('open-worksheet').addEventListener('click',()=>{
    const lesson=lessons[current];
    $('worksheet-tag').textContent='WORKSHEET · DAY '+String(current+1).padStart(2,'0');
    $('worksheet-title').textContent=lesson.title.replace(/^Day \d+\s*[·:–-]\s*/i,'');
    pdf.hidden=false;$('worksheet-error').hidden=true;
    pdf.src=mediaUrl(lesson.pdfUrl)+'#toolbar=1';
    dialog.showModal();
  });
  const closePdf=()=>{dialog.close();pdf.removeAttribute('src');};
  $('close-worksheet').addEventListener('click',closePdf);
  dialog.addEventListener('click',event=>{if(event.target===dialog)closePdf();});
  $('watch-example').addEventListener('click',()=>{
    const lesson=lessons[current];
    if(!lesson.solutionUrl)return;
    if(mediaMode==='example'){select(current);return;}
    openVideo(lesson.solutionUrl,'example');
    setStatus('Example video — return to the main lesson to complete the day.');
    $('watch-example').querySelector('span:nth-child(2)').textContent='Return to main lesson';
  });
  const requested=params.has('lesson')?Number(params.get('lesson')):null;
  const welcomeOnLanding=requested===null&&Boolean(introResource);
  if(Number.isInteger(requested)&&requested>=1&&requested<=lessons.length&&unlocked(requested-1))current=requested-1;
  if(!unlocked(current))current=lessons.findIndex((_,n)=>!completed.has(n));
  if(current<0)current=0;
  if(welcomeOnLanding){
    current=0;
    updateOutline();setProgress();
    const welcomeButton=document.querySelector('.learn-intro-block .learn-extra-btn');
    playExtra(introResource,welcomeButton,'intro');
  }else select(current);
})();
