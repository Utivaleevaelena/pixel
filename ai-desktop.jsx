/* ─── THE AI DESKTOP — full windowing system ─── */
(function(){
const { useState, useEffect, useRef, useCallback } = React;
const TEAL='rgb(73,160,169)', TEAL_D='rgb(56,128,136)', AMBER='rgb(229,158,55)', INDIGO='#4f6fb5';
const SYS = "'Tahoma','Geneva','Verdana',sans-serif";
const PIXEL = "'Jersey 25',sans-serif";
const BODY = "'Archivo',sans-serif";
const ENDPOINT = 'https://formsubmit.co/ajax/elena@pixelexpertsteam.com';

function useIsMobile(bp=760){
  const [m,setM]=useState(typeof window!=='undefined'?window.innerWidth<=bp:false);
  useEffect(()=>{ const on=()=>setM(window.innerWidth<=bp); window.addEventListener('resize',on); on(); return ()=>window.removeEventListener('resize',on); },[bp]);
  return m;
}

/* ── icon glyphs ── */
function Glyph({ k, color, size=30 }){
  const s={ width:size, height:size, viewBox:'0 0 28 28', fill:'none', stroke:color, strokeWidth:2, strokeLinecap:'round', strokeLinejoin:'round' };
  const P={
    strategy:<g><circle cx="14" cy="14" r="10"/><circle cx="14" cy="14" r="5.5"/><circle cx="14" cy="14" r="1.4" fill={color} stroke="none"/></g>,
    assessment:<g><line x1="4" y1="24" x2="24" y2="24"/><rect x="6" y="14" width="4" height="8"/><rect x="12" y="9" width="4" height="13"/><rect x="18" y="5" width="4" height="17"/></g>,
    workforce:<g><circle cx="10" cy="10" r="3.2"/><path d="M4.5 22c0-3.4 2.5-5.5 5.5-5.5s5.5 2.1 5.5 5.5"/><circle cx="19.5" cy="11" r="2.6"/><path d="M17 22c0-2.4 1.2-4.4 3-5"/></g>,
    automation:<g><circle cx="14" cy="14" r="4"/><path d="M14 3.5v3M14 21.5v3M3.5 14h3M21.5 14h3M6.5 6.5l2.1 2.1M19.4 19.4l2.1 2.1M21.5 6.5l-2.1 2.1M6.5 21.5l2.1-2.1"/></g>,
    visibility:<g><path d="M2.5 14C6 8 10 6 14 6s8 2 11.5 8C22 20 18 22 14 22S6 20 2.5 14Z"/><circle cx="14" cy="14" r="3"/></g>,
    websites:<g><circle cx="14" cy="14" r="10"/><ellipse cx="14" cy="14" rx="4.2" ry="10"/><line x1="4" y1="14" x2="24" y2="14"/><line x1="6" y1="8.5" x2="22" y2="8.5"/><line x1="6" y1="19.5" x2="22" y2="19.5"/></g>,
    creative:<g><path d="M20 5l3 3-9.5 9.5-4 1 1-4L20 5Z"/><path d="M6 20c0 2 1.5 3.2 3 3.2 2.2 0 3-1.8 3-3.4"/></g>,
    products:<g><path d="M14 4l9 5v10l-9 5-9-5V9l9-5Z"/><path d="M5 9l9 5 9-5M14 14v10"/></g>,
    training:<g><path d="M14 5l11 5-11 5L3 10l11-5Z"/><path d="M8 12v5.5c0 1.7 2.7 3 6 3s6-1.3 6-3V12"/><line x1="25" y1="10" x2="25" y2="16"/></g>,
  };
  return <svg {...s} aria-hidden="true">{P[k]}</svg>;
}

/* ── service content data ── */
const SERVICES=[
 { id:'strategy', color:TEAL, label:'AI Strategy', exe:'AI_Strategy.exe', title:'AI Strategy', service:'AI Strategy',
   tagline:'Create a clear roadmap before investing in AI.',
   intro:'Many businesses know they should use AI, but they do not know where to begin. We help define a practical AI strategy based on your business goals, current processes, resources and growth plans.',
   status:'Strategy system ready', cta:'Book a Free Strategy Session',
   blocks:[
     { type:'list', h:'What we provide', items:['Business discovery','Leadership and team interviews','Current technology review','AI roadmap development','Priority planning','Implementation recommendations','ROI and feasibility considerations'] },
     { type:'text', h:'Why it matters', p:'A clear strategy prevents random tool adoption and helps your company invest in AI solutions that produce measurable business value.' },
     { type:'list', h:'Benefits', items:['Reduce uncertainty','Prioritise high-value opportunities','Avoid unnecessary technology costs','Create a realistic implementation plan','Align leadership and employees'] },
     { type:'steps', h:'Our approach', steps:['Discover','Analyse','Prioritise','Plan','Implement'] },
   ] },
 { id:'assessment', color:INDIGO, label:'AI Assessment', exe:'AI_Assessment.exe', title:'AI Opportunity Assessment', service:'AI Opportunity Assessment',
   tagline:'Discover where AI can save time, reduce costs and create new revenue opportunities.',
   intro:'We analyse your business processes, customer journey and existing technology to identify the most valuable opportunities for AI and automation.',
   status:'Business scan available', cta:'Request a Free AI Assessment',
   blocks:[
     { type:'list', h:'Business discovery', items:['Interview business owners and employees','Map current processes','Identify repetitive tasks','Analyse the customer journey','Review existing technology','Identify workflow bottlenecks'] },
     { type:'text', h:'Your AI Opportunity Map', p:'You receive a practical overview of recommended AI solutions, priorities and potential business impact.' },
     { type:'list', h:'Example opportunities', items:['Customer support chatbot','Automated appointment scheduling','Sales follow-up agent','Marketing content workflows','Document processing','Internal knowledge assistant','Reporting automation','Data analysis'] },
     { type:'list', h:'Benefits', items:['Understand where AI creates real value','Identify quick wins','Compare opportunities by impact and complexity','Make informed investment decisions'] },
   ] },
 { id:'workforce', color:AMBER, label:'AI Workforce', exe:'AI_Workforce.exe', title:'AI Workforce Solutions', service:'AI Workforce Solutions',
   tagline:'Deploy AI agents that work alongside your team.',
   intro:'We create specialised AI agents that handle repetitive work, support employees and help your business operate more efficiently.',
   status:'AI workforce online', cta:'Build Your AI Workforce',
   blocks:[
     { type:'agents', h:'Available AI agents', agents:[
       { name:'Sales Agent', items:['Reads incoming enquiries','Qualifies leads','Creates CRM entries','Sends follow-up messages','Routes opportunities to the right employee'] },
       { name:'Operations Agent', items:['Monitors tasks','Creates reports','Detects delays','Escalates important issues','Supports everyday operations'] },
       { name:'Knowledge Agent', items:['Learns from company documents','Answers employee questions','Retrieves internal information','Supports onboarding and training'] },
       { name:'Customer Agent', items:['Website chat','WhatsApp','Telegram','Email'] },
     ] },
     { type:'list', h:'Benefits', items:['Available around the clock','Faster response times','Less repetitive work','Consistent service quality','Scalable support'] },
   ] },
 { id:'automation', color:TEAL, label:'AI Automation', exe:'AI_Automation.exe', title:'AI Agents & Automation', service:'AI Agents & Automation',
   tagline:'Automate repetitive work across your business.',
   intro:'We connect AI with your existing tools to reduce manual work, improve speed and create reliable automated workflows.',
   status:'Automation engine ready', cta:'Automate My Business',
   blocks:[
     { type:'list', h:'What we can automate', items:['Lead processing','CRM updates','Email responses','Document classification','Invoice processing','Appointment scheduling','Internal approvals','Reporting','Data entry','Customer notifications'] },
     { type:'steps', h:'How it works', steps:['Analyse the current workflow','Identify repetitive steps','Design the automation','Connect your tools','Test and launch','Monitor and improve'] },
     { type:'list', h:'Benefits', items:['Save employee time','Reduce human error','Improve process consistency','Respond faster','Scale without increasing repetitive workload'] },
   ] },
 { id:'visibility', color:INDIGO, label:'AI Visibility', exe:'AI_Visibility.exe', title:'AI Search Visibility', service:'AI Search Visibility', supLabel:'AEO / GEO Optimization',
   tagline:'Help customers find your business through ChatGPT, Claude, Gemini and Perplexity.',
   intro:'Search behaviour is changing. Customers increasingly ask AI systems for recommendations instead of reviewing traditional lists of search results. AI platforms synthesise answers, which creates a new visibility challenge for brands.',
   status:'AI search scan ready', cta:'Improve My AI Visibility',
   blocks:[
     { type:'compare', a:{ h:'Traditional search', q:'“Best restaurants near me”' }, b:{ h:'AI search', q:'“Where should I take my wife for a romantic dinner in San Diego?”' } },
     { type:'list', h:'Our services', items:['AI visibility audit','AEO optimisation','GEO optimisation','Website restructuring','Structured data','Brand authority improvements','FAQ optimisation','AI-readable content','Review strategy'] },
     { type:'text', h:'The goal', p:'Make your business easier for AI systems to understand, trust and recommend.' },
     { type:'list', h:'Benefits', items:['Improve visibility in AI-generated answers','Build digital authority','Future-proof your search strategy','Attract more relevant customers'] },
   ] },
 { id:'websites', color:AMBER, label:'AI Websites', exe:'AI_Websites.exe', title:'AI-Ready Digital Experiences', service:'AI-Ready Digital Experiences',
   tagline:'We build websites and applications designed for humans and AI agents.',
   intro:'A modern digital product should not only look good. It should support business processes, provide personalised experiences and integrate intelligent tools.',
   status:'Digital experience builder ready', cta:'Build My AI-Ready Website',
   blocks:[
     { type:'list', h:'What we build', items:['Modern business websites','AI-powered websites','Custom web applications','Mobile applications','AI chat assistants','Booking systems','Customer portals','Personalised user experiences','Analytics dashboards','Internal business platforms'] },
     { type:'text', h:'Our approach', p:'We combine business analysis, UX strategy, visual design, development and AI integration in one product process.' },
     { type:'list', h:'Benefits', items:['Better customer experience','Higher conversion potential','Smarter lead generation','Scalable digital infrastructure','Custom functionality'] },
   ] },
 { id:'creative', color:TEAL, label:'Creative Studio', exe:'Creative_Studio.exe', title:'AI Enhanced Creative Studio', service:'AI Enhanced Creative Studio',
   tagline:'Human storytelling, professional production and AI acceleration.',
   intro:'We combine authentic visual communication with AI-supported production to create high-quality brands and marketing campaigns.',
   status:'Creative engine active', cta:'Start a Creative Project',
   blocks:[
     { type:'list', h:'Brand Foundation', items:['Brand strategy','Brand book','Logo','Visual identity','Messaging','Communication direction'] },
     { type:'list', h:'Content Production', items:['Professional photography','Video production','Product storytelling','Social media campaigns','Advertising assets','Website content'] },
     { type:'list', h:'AI Enhancement', items:['Advertising variations','Copy generation','Creative concept development','Audience testing','Content adaptation','Campaign optimisation'] },
     { type:'list', h:'Benefits', items:['Authentic human-centred communication','Faster creative production','Consistent brand identity','More campaign variations','Better testing opportunities'] },
   ] },
 { id:'products', color:INDIGO, label:'Our Products', exe:'Our_Products.exe', title:'Our AI Products', service:'Our AI Products',
   tagline:'AI solutions designed and developed by our own team.',
   intro:'In addition to client projects, we build proprietary AI products that solve practical problems and explore new digital business models.',
   status:'Product laboratory online', cta:'Talk About Our Products',
   secondary:'Interested in product development or partnership opportunities?',
   blocks:[
     { type:'featured', name:'StyleUS', sub:'AI Personal Fashion Assistant', desc:'StyleUS analyses the user’s style, colour type, fashion archetype and wardrobe. It communicates with the user, recommends personalised outfits and can suggest missing items from partner stores.', items:['Personal style onboarding','Fashion archetype analysis','Colour type analysis','Digital wardrobe','AI stylist conversations','Outfit planning','Product recommendations','Partner-store integrations'] },
     { type:'list', h:'Future solutions', items:['AI Life Coach','AI Marketing Assistant','AI Medical Assistant','AI Caregiver Assistant'] },
     { type:'note', p:'Future products are currently concepts or solutions in development. Their final scope may change.' },
   ] },
 { id:'training', color:AMBER, label:'AI Training', exe:'AI_Training.exe', title:'AI Training & Adoption Workshops', service:'AI Training & Adoption Workshops',
   tagline:'Help your employees use AI confidently, safely and productively.',
   intro:'Many companies purchase AI tools but fail to achieve meaningful results because employees do not know how to integrate them into their daily work. Technology alone does not transform an organisation. People do.',
   status:'Training programme available', cta:'Schedule an AI Workshop',
   blocks:[
     { type:'list', h:'Training options', items:['Executive AI strategy sessions','Employee AI workshops','Prompt engineering','AI productivity training','AI safety and governance','Department-specific AI workflows','Practical implementation sessions'] },
     { type:'list', h:'Training can be adapted for', items:['Leadership','Marketing','Sales','Customer support','Human resources','Operations','Administration'] },
     { type:'list', h:'Expected outcomes', items:['Higher employee confidence','Faster AI adoption','Safer AI use','Better prompts and outputs','Practical workflows employees can use immediately','Clear internal AI guidelines'] },
   ] },
];
const SVC_MAP = Object.fromEntries(SERVICES.map(s=>[s.id,s]));

/* ── shared consultation form ── */
function ConsultForm({ service, source, color, heading, text, cta, note }){
  const [val,setVal]=useState('');
  const [err,setErr]=useState('');
  const [state,setState]=useState('idle'); // idle | sending | done | error
  const cD = color||TEAL, cDark='rgb(56,128,136)';
  const submit=async(e)=>{
    e && e.preventDefault();
    const v=val.trim();
    const isEmail=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
    const isPhone=/^[+\d][\d\s()\-]{6,}$/.test(v);
    if(!isEmail&&!isPhone){ setErr('Please enter a valid email or phone number.'); return; }
    setErr(''); setState('sending');
    try{
      const r=await fetch(ENDPOINT,{ method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({ contact:v, source, service, page_url:(typeof location!=='undefined'?location.href:''), _subject:'AI Desktop lead — '+service }) });
      if(!r.ok) throw new Error('bad');
      setState('done');
    }catch(_){ setState('error'); }
  };
  if(state==='done') return (
    <div style={{ textAlign:'center', padding:'6px 0' }}>
      <div style={{ width:50, height:50, borderRadius:'50%', margin:'0 auto 14px', background:'linear-gradient(180deg,'+cD+','+cDark+')', color:'#fff', fontSize:26, display:'flex', alignItems:'center', justifyContent:'center' }}>✓</div>
      <div style={{ fontFamily:SYS, fontSize:17, fontWeight:700, color:'#22324a', marginBottom:7 }}>Request received</div>
      <p style={{ fontFamily:SYS, fontSize:13.5, color:'#4a5f7d', lineHeight:1.5 }}>Thank you. Our team will contact you shortly to arrange your free consultation.</p>
    </div>
  );
  const btnP={ background:'linear-gradient(180deg,'+cD+','+cDark+')', color:'#fff', border:'1px solid rgb(48,110,118)', borderRadius:6, padding:'11px 18px', fontFamily:SYS, fontSize:13.5, fontWeight:700, cursor:'pointer', boxShadow:'0 1px 0 rgba(255,255,255,.4) inset', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:9 };
  return (
    <form onSubmit={submit} noValidate>
      {heading && <div style={{ fontFamily:SYS, fontSize:15, fontWeight:700, color:'#22324a', marginBottom:6 }}>{heading}</div>}
      {text && <p style={{ fontFamily:SYS, fontSize:13, color:'#33465f', lineHeight:1.5, marginBottom:12 }}>{text}</p>}
      <label htmlFor={'cf-'+service} style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)' }}>Email or phone number</label>
      <input id={'cf-'+service} value={val} onChange={e=>{ setVal(e.target.value); if(err)setErr(''); if(state==='error')setState('idle'); }} placeholder="Email or phone number" inputMode="email" autoComplete="email"
        style={{ width:'100%', padding:'11px 13px', border:'1px solid '+(err?'#d5503a':'#9fb0c6'), borderRadius:6, fontFamily:SYS, fontSize:14, background:'#fff', color:'#22324a', outline:'none', boxShadow:'inset 0 1px 2px rgba(0,0,0,.06)' }} />
      {err && <div role="alert" style={{ fontFamily:SYS, fontSize:12, color:'#d5503a', marginTop:6 }}>{err}</div>}
      {state==='error' && <div role="alert" style={{ fontFamily:SYS, fontSize:12.5, color:'#d5503a', marginTop:8 }}>Something went wrong. Please try again or use the main contact form.</div>}
      <button type="submit" disabled={state==='sending'} style={{ ...btnP, marginTop:12, opacity:state==='sending'?.7:1 }}>
        {state==='sending' && <span style={{ width:15, height:15, border:'2px solid rgba(255,255,255,.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'dtSpin .7s linear infinite', display:'inline-block' }} />}
        {state==='sending'?'Sending...':(cta||'Book Free Consultation')}
      </button>
      <p style={{ fontFamily:SYS, fontSize:11, color:'#7285a0', textAlign:'center', marginTop:10, lineHeight:1.4 }}>{note||'No spam. No obligation. We will only use your details to contact you about your request.'}</p>
    </form>
  );
}

/* ── content block renderer ── */
function Blocks({ svc }){
  const c=svc.color;
  const H=({children})=> <h3 style={{ fontFamily:BODY, fontSize:15, fontWeight:700, color:'#1d3050', margin:'0 0 9px', letterSpacing:'.01em' }}>{children}</h3>;
  const sep={ height:1, background:'repeating-linear-gradient(90deg,#c3cede 0 5px,transparent 5px 9px)', margin:'20px 0' };
  const li=(t,i)=>(
    <li key={i} style={{ display:'flex', gap:9, alignItems:'flex-start', fontFamily:BODY, fontSize:13.5, color:'#33465f', lineHeight:1.45 }}>
      <span style={{ flexShrink:0, width:6, height:6, marginTop:6, borderRadius:2, background:c }} />{t}
    </li>
  );
  return (
    <div>
      <p style={{ fontFamily:BODY, fontSize:14.5, fontWeight:600, color:c, lineHeight:1.45, margin:'0 0 10px' }}>{svc.tagline}</p>
      {svc.supLabel && <div style={{ display:'inline-block', fontFamily:SYS, fontSize:11, fontWeight:700, color:'#fff', background:c, borderRadius:5, padding:'3px 9px', marginBottom:10 }}>{svc.supLabel}</div>}
      <p style={{ fontFamily:BODY, fontSize:13.5, color:'#3a4d67', lineHeight:1.55 }}>{svc.intro}</p>
      {svc.blocks.map((b,bi)=>(
        <div key={bi}>
          <div style={sep} />
          {b.type==='text' && (<div><H>{b.h}</H><p style={{ fontFamily:BODY, fontSize:13.5, color:'#3a4d67', lineHeight:1.55 }}>{b.p}</p></div>)}
          {b.type==='list' && (<div><H>{b.h}</H><ul style={{ display:'grid', gridTemplateColumns:b.items.length>5?'1fr 1fr':'1fr', gap:'7px 20px', listStyle:'none' }}>{b.items.map(li)}</ul></div>)}
          {b.type==='steps' && (<div><H>{b.h}</H><div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>{b.steps.map((s,i)=>(
            <span key={i} style={{ display:'flex', alignItems:'center', gap:7, fontFamily:BODY, fontSize:13, fontWeight:600, color:'#22324a', background:'#fff', border:'1px solid #cdd8e6', borderRadius:7, padding:'7px 12px', boxShadow:'0 1px 2px rgba(40,70,110,.08)' }}>
              <span style={{ fontFamily:PIXEL, fontSize:13, color:c }}>{i+1}</span>{s}
            </span>))}</div></div>)}
          {b.type==='agents' && (<div><H>{b.h}</H><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>{b.agents.map((a,i)=>(
            <div key={i} style={{ background:'#fff', border:'1px solid #cdd8e6', borderRadius:8, padding:'12px 13px', boxShadow:'0 1px 3px rgba(40,70,110,.1)' }}>
              <div style={{ fontFamily:SYS, fontSize:13.5, fontWeight:700, color:c, marginBottom:8 }}>{a.name}</div>
              <ul style={{ listStyle:'none', display:'grid', gap:5 }}>{a.items.map(li)}</ul>
            </div>))}</div></div>)}
          {b.type==='compare' && (<div><div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>{[b.a,b.b].map((x,i)=>(
            <div key={i} style={{ background:i?c:'#eef2f8', color:i?'#fff':'#22324a', border:'1px solid '+(i?c:'#cdd8e6'), borderRadius:8, padding:'13px 14px' }}>
              <div style={{ fontFamily:SYS, fontSize:12, fontWeight:700, opacity:.85, marginBottom:8, textTransform:'uppercase', letterSpacing:'.05em' }}>{x.h}</div>
              <div style={{ fontFamily:BODY, fontSize:14, fontStyle:'italic', lineHeight:1.4 }}>{x.q}</div>
            </div>))}</div></div>)}
          {b.type==='featured' && (<div><div style={{ background:'linear-gradient(160deg,#1b2a44,#25406e)', borderRadius:10, padding:'16px 18px', color:'#fff' }}>
            <div style={{ display:'flex', alignItems:'baseline', gap:10, marginBottom:4 }}><span style={{ fontFamily:PIXEL, fontSize:26, color:AMBER }}>{b.name}</span><span style={{ fontFamily:SYS, fontSize:12.5, color:'#c7d6ee' }}>{b.sub}</span></div>
            <p style={{ fontFamily:BODY, fontSize:13, color:'#dbe6f6', lineHeight:1.55, margin:'6px 0 12px' }}>{b.desc}</p>
            <ul style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 18px', listStyle:'none' }}>{b.items.map((t,i)=>(
              <li key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontFamily:BODY, fontSize:12.5, color:'#e8eefa', lineHeight:1.4 }}><span style={{ flexShrink:0, width:6, height:6, marginTop:5, borderRadius:2, background:AMBER }} />{t}</li>))}</ul>
          </div></div>)}
          {b.type==='note' && (<p style={{ fontFamily:BODY, fontSize:12, fontStyle:'italic', color:'#7285a0', lineHeight:1.5, background:'#eef2f8', border:'1px dashed #c3cede', borderRadius:7, padding:'10px 12px' }}>{b.p}</p>)}
        </div>
      ))}
      {svc.secondary && <p style={{ fontFamily:BODY, fontSize:13.5, fontWeight:600, color:'#22324a', margin:'18px 0 0' }}>{svc.secondary}</p>}
    </div>
  );
}

/* ── title-bar buttons ── */
function WinBtns({ onMin, onMax, onClose, maxed }){
  const b={ width:22, height:19, marginLeft:4, border:'1px solid rgba(255,255,255,.55)', borderRadius:4, background:'linear-gradient(180deg,#7ea9e4,#4d7fc9)', color:'#fff', fontSize:11, lineHeight:'15px', cursor:'pointer', fontFamily:SYS, display:'flex', alignItems:'center', justifyContent:'center', padding:0 };
  return (<div style={{ display:'flex' }}>
    {onMin && <button aria-label="Minimise" onClick={onMin} style={b}>–</button>}
    {onMax && <button aria-label={maxed?'Restore':'Maximise'} onClick={onMax} style={b}>{maxed?'❐':'▢'}</button>}
    <button aria-label="Close" onClick={onClose} style={{ ...b, background:'linear-gradient(180deg,#e97b6a,#d5503a)' }}>✕</button>
  </div>);
}

/* ── one service window ── */
function ServiceWindow({ svc, win, isMobile, onFocus, onMin, onMax, onClose, onDragStart, closing }){
  const maxed=win.max;
  const shell={ position:isMobile?'relative':'absolute', display:'flex', flexDirection:'column',
    background:'#f3f5f9', border:'1px solid #2b5aa5', borderRadius:isMobile?10:8,
    boxShadow:'0 22px 60px rgba(20,40,80,.42), 0 2px 0 rgba(255,255,255,.6) inset', overflow:'hidden',
    zIndex:win.z, animation:(closing?'dtWinOut':'dtPop')+' .24s ease' };
  const geo=isMobile
    ? { width:'100%', maxWidth:520, margin:'0 auto 18px', maxHeight:'none' }
    : maxed
      ? { left:14, top:14, right:14, width:'auto', height:'calc(100% - 72px)' }
      : { left:win.x, top:win.y, width:win.w, maxHeight:'80vh' };
  return (
    <section role="dialog" aria-label={svc.title} onMouseDown={()=>onFocus(win.id)} style={{ ...shell, ...geo }}>
      <div onMouseDown={e=>{ if(!isMobile&&!maxed) onDragStart(e,win.id); }} onDoubleClick={()=>!isMobile&&onMax(win.id)}
        style={{ display:'flex', alignItems:'center', gap:8, height:32, padding:'0 6px 0 10px', cursor:isMobile||maxed?'default':'move',
          background:'linear-gradient(180deg,'+svc.color+', rgba(0,0,0,.28))', backgroundColor:svc.color, color:'#fff', flexShrink:0 }}>
        <span style={{ width:18, height:18, borderRadius:4, background:'rgba(255,255,255,.9)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Glyph k={svc.id} color={svc.color} size={13} /></span>
        <span style={{ flex:1, fontFamily:SYS, fontSize:12.5, fontWeight:700, textShadow:'0 1px 1px rgba(0,0,0,.4)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{svc.exe}</span>
        <WinBtns onMin={()=>onMin(win.id)} onMax={isMobile?null:()=>onMax(win.id)} onClose={()=>onClose(win.id)} maxed={maxed} />
      </div>
      <div style={{ overflowY:'auto', padding:isMobile?'16px 16px 20px':'18px 22px 22px', WebkitOverflowScrolling:'touch' }}>
        <h2 style={{ fontFamily:BODY, fontSize:isMobile?21:23, fontWeight:900, color:'#16233a', margin:'0 0 12px', letterSpacing:'-.01em' }}>{svc.title}</h2>
        <Blocks svc={svc} />
        <div style={{ marginTop:22, background:'#eaeff6', border:'1px solid #cdd8e6', borderRadius:9, padding:'16px 16px 14px' }}>
          <ConsultForm service={svc.service} source="AI Desktop" color={svc.color}
            heading="Ready to explore this solution?"
            text="Leave your email address or phone number and we will contact you to arrange a free consultation."
            cta={svc.cta} />
        </div>
      </div>
      <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:8, height:24, padding:'0 12px', background:'#dde5f0', borderTop:'1px solid #c3cede', fontFamily:SYS, fontSize:11.5, color:'#4a5f7d' }}>
        <span style={{ width:8, height:8, borderRadius:'50%', background:svc.color, boxShadow:'0 0 5px '+svc.color }} />
        Status: {svc.status}
      </div>
    </section>
  );
}

/* ── main ── */
function AIDesktopFull(){
  const isMobile=useIsMobile();
  const [wins,setWins]=useState([]); // {id,state:'open'|'min',x,y,w,z,max}
  const [closing,setClosing]=useState(null);
  const zRef=useRef(30);
  const openCountRef=useRef(0);
  const [sys,setSys]=useState('open');     // system notification: open|min|closed
  const [consult,setConsult]=useState('closed'); // free consult dialog
  const [clock,setClock]=useState('');
  const [reduced,setReduced]=useState(false);
  const dragRef=useRef(null);

  useEffect(()=>{ const t=()=>setClock(new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})); t(); const i=setInterval(t,15000); return ()=>clearInterval(i); },[]);
  useEffect(()=>{ const m=window.matchMedia('(prefers-reduced-motion: reduce)'); setReduced(m.matches); const on=()=>setReduced(m.matches); m.addEventListener('change',on); return ()=>m.removeEventListener('change',on); },[]);

  const focus=useCallback((id)=>{ setWins(ws=>ws.map(w=>w.id===id?{...w,z:++zRef.current}:w)); },[]);
  const openService=useCallback((id)=>{
    setWins(ws=>{
      const ex=ws.find(w=>w.id===id);
      if(ex) return ws.map(w=>w.id===id?{...w,state:'open',z:++zRef.current}:w);
      const n=openCountRef.current++;
      const w=Math.min(840, window.innerWidth-40);
      const x=Math.max(20, (window.innerWidth-w)/2 + (n%4)*26 - 40);
      const y=Math.max(84, 96 + (n%4)*24);
      return [...ws,{ id, state:'open', x, y, w, z:++zRef.current, max:false }];
    });
  },[]);
  const closeWin=useCallback((id)=>{ setClosing(id); setTimeout(()=>{ setWins(ws=>ws.filter(w=>w.id!==id)); setClosing(null); }, reduced?0:220); },[reduced]);
  const minWin=useCallback((id)=>{ setWins(ws=>ws.map(w=>w.id===id?{...w,state:'min'}:w)); },[]);
  const restoreWin=useCallback((id)=>{ setWins(ws=>ws.map(w=>w.id===id?{...w,state:'open',z:++zRef.current}:w)); },[]);
  const maxWin=useCallback((id)=>{ setWins(ws=>ws.map(w=>w.id===id?{...w,max:!w.max,z:++zRef.current}:w)); },[]);

  /* drag */
  const onDragStart=useCallback((e,id)=>{
    focus(id);
    const win=wins.find(w=>w.id===id); if(!win) return;
    dragRef.current={ id, dx:e.clientX-win.x, dy:e.clientY-win.y };
    const move=(ev)=>{
      const d=dragRef.current; if(!d) return;
      let nx=ev.clientX-d.dx, ny=ev.clientY-d.dy;
      nx=Math.max(6, Math.min(nx, window.innerWidth-120));
      ny=Math.max(70, Math.min(ny, window.innerHeight-80));
      setWins(ws=>ws.map(w=>w.id===d.id?{...w,x:nx,y:ny}:w));
    };
    const up=()=>{ dragRef.current=null; window.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
    window.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
  },[wins,focus]);

  /* escape closes top-most open window/dialog */
  useEffect(()=>{
    const onKey=(e)=>{ if(e.key!=='Escape') return;
      if(consult==='open'){ setConsult('closed'); return; }
      const open=wins.filter(w=>w.state==='open');
      if(open.length){ const top=open.reduce((a,b)=>b.z>a.z?b:a); closeWin(top.id); return; }
      if(sys==='open'){ setSys('min'); }
    };
    window.addEventListener('keydown',onKey); return ()=>window.removeEventListener('keydown',onKey);
  },[wins,consult,sys,closeWin]);

  const [sel,setSel]=useState(null);
  const [launch,setLaunch]=useState(null);
  const activate=(id)=>{ setLaunch(id); setTimeout(()=>{ setLaunch(null); openService(id); }, reduced?0:260); };

  const winShell={ background:'#f3f5f9', border:'1px solid #2b5aa5', borderRadius:8, boxShadow:'0 18px 50px rgba(20,40,80,.4), 0 2px 0 rgba(255,255,255,.6) inset', overflow:'hidden' };
  const btnPrimary={ background:'linear-gradient(180deg,'+TEAL+','+TEAL_D+')', color:'#fff', border:'1px solid rgb(48,110,118)', borderRadius:6, padding:'9px 18px', fontFamily:SYS, fontSize:13, fontWeight:700, cursor:'pointer', boxShadow:'0 1px 0 rgba(255,255,255,.4) inset' };
  const btnNeutral={ background:'linear-gradient(180deg,#fdfdfd,#dfe3ea)', color:'#22324a', border:'1px solid #9aa6b8', borderRadius:6, padding:'9px 18px', fontFamily:SYS, fontSize:13, fontWeight:700, cursor:'pointer' };
  const taskItem=(active)=>({ display:'flex', alignItems:'center', gap:7, maxWidth:190, padding:'7px 13px', borderRadius:6, border:'1px solid rgba(255,255,255,.25)', background:active?'linear-gradient(180deg,#2c5aa0,#254e8c)':'linear-gradient(180deg,#5a8bd0,#3f74c4)', color:'#fff', fontFamily:SYS, fontSize:12.5, fontWeight:600, cursor:'pointer', boxShadow:active?'inset 0 2px 4px rgba(0,0,0,.3)':'inset 0 1px 0 rgba(255,255,255,.3)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' });

  const sysNote=(pos)=>(
    <div style={{ ...winShell, ...pos, animation:reduced?'none':'dtWinInTR .3s ease' }}>
      <div style={{ display:'flex', alignItems:'center', height:30, padding:'0 5px 0 9px', background:'linear-gradient(180deg,#5a92dd,#356bbd)', color:'#fff' }}>
        <span style={{ flex:1, fontFamily:SYS, fontSize:13, fontWeight:700, textShadow:'0 1px 1px rgba(0,0,0,.35)' }}>System Notification</span>
        <WinBtns onMin={()=>setSys('min')} onClose={()=>setSys('min')} />
      </div>
      <div style={{ padding:'18px 20px 20px' }}>
        <div style={{ display:'flex', gap:13, marginBottom:15 }}>
          <div style={{ flexShrink:0, width:38, height:38, borderRadius:'50%', background:'linear-gradient(180deg,#5a92dd,#356bbd)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:SYS, fontSize:22, fontWeight:700 }}>i</div>
          <p style={{ fontFamily:SYS, fontSize:13.5, color:'#22324a', lineHeight:1.5 }}>Your business is ready for an AI upgrade.<br/><br/>Would you like to update your system?</p>
        </div>
        <div style={{ display:'flex', gap:10, justifyContent:'flex-end' }}>
          <button onClick={()=>{ setSys('closed'); setConsult('open'); }} style={btnPrimary}>YES</button>
          <button onClick={()=>setSys('min')} style={btnNeutral}>NO</button>
        </div>
      </div>
    </div>
  );

  return (
    <section aria-label="The AI Desktop" style={{ position:'relative', minHeight:'100vh', width:'100%', overflow:'hidden', paddingTop:isMobile?76:0,
      background:'radial-gradient(120% 90% at 50% 0%, #d7e2ee 0%, #c0cee0 45%, #a7b8cf 78%, #93a6be 100%)' }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 3px)', opacity:.5 }} />
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', boxShadow:'inset 0 0 200px rgba(40,60,90,.35)' }} />

      <div style={{ position:'relative', textAlign:'center', padding:isMobile?'0 20px 6px':'96px 20px 4px' }}>
        <h2 style={{ fontFamily:PIXEL, textTransform:'uppercase', color:'#20344f', fontSize:isMobile?32:46, letterSpacing:'.02em', textShadow:'0 1px 0 rgba(255,255,255,.5)' }}>The AI Desktop</h2>
        <p style={{ fontFamily:BODY, color:'#37506e', fontSize:isMobile?14:16, marginTop:6 }}>Click a shortcut to open a service.</p>
      </div>

      {isMobile && sys==='open' && sysNote({ position:'relative', margin:'0 auto 20px', width:'min(92vw,360px)' })}

      {/* icon grid */}
      <div onClick={()=>setSel(null)} style={{ position:'relative', display:'grid', gridTemplateColumns:isMobile?'repeat(3,1fr)':'repeat(3,118px)', gap:isMobile?16:'22px 40px', justifyContent:'center', maxWidth:640, margin:'0 auto', padding:isMobile?'8px 18px 130px':'26px 48px 150px' }}>
        {SERVICES.map((sc,i)=>(
          <div key={sc.id} className={'dt-icon'+(launch===sc.id?' launch':'')} role="button" tabIndex={0} aria-label={'Open '+sc.label}
            onClick={(e)=>{ e.stopPropagation(); setSel(sc.id); activate(sc.id); }}
            onDoubleClick={(e)=>{ e.stopPropagation(); if(!isMobile) activate(sc.id); }}
            onKeyDown={(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); activate(sc.id); } }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, padding:'12px 6px', borderRadius:8, cursor:'pointer',
              background:sel===sc.id?'rgba(60,110,180,.28)':'transparent', outline:sel===sc.id?'1px dotted rgba(255,255,255,.85)':'none',
              animation:reduced?'none':`dtIconIn .45s ease ${i*0.06}s both` }}>
            <div className="dt-tile" style={{ width:66, height:66, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(145deg,#ffffff,#e4edf6)', border:'1px solid rgba(255,255,255,.9)', boxShadow:'0 8px 16px rgba(40,70,110,.28), inset 0 1px 0 #fff, inset 0 -6px 12px rgba(80,110,150,.12)' }}>
              <Glyph k={sc.id} color={sc.color} />
            </div>
            <span style={{ fontFamily:BODY, fontSize:13.5, fontWeight:600, color:'#1d3050', textAlign:'center', lineHeight:1.2, textShadow:'0 1px 2px rgba(255,255,255,.6)' }}>{sc.label}</span>
          </div>
        ))}
      </div>

      {!isMobile && sys==='open' && sysNote({ position:'absolute', top:96, right:40, width:322, zIndex:20 })}

      {/* service windows */}
      <div style={{ position:isMobile?'relative':'static', padding:isMobile?'0 14px 130px':0 }}>
        {wins.filter(w=>w.state==='open').map(w=>(
          <ServiceWindow key={w.id} svc={SVC_MAP[w.id]} win={w} isMobile={isMobile} closing={closing===w.id}
            onFocus={focus} onMin={minWin} onMax={maxWin} onClose={closeWin} onDragStart={onDragStart} />
        ))}
      </div>

      {/* free consultation dialog */}
      {consult==='open' && (
        <div style={{ ...winShell, position:isMobile?'relative':'fixed', ...(isMobile?{margin:'0 auto 24px', width:'min(92vw,380px)'}:{ top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:398 }), zIndex:9000, animation:reduced?'none':(isMobile?'dtWinInTR .3s ease':'dtWinIn .3s ease') }}>
          <div style={{ display:'flex', alignItems:'center', height:30, padding:'0 5px 0 9px', background:'linear-gradient(180deg,'+TEAL+','+TEAL_D+')', color:'#fff' }}>
            <span style={{ flex:1, fontFamily:SYS, fontSize:13, fontWeight:700, textShadow:'0 1px 1px rgba(0,0,0,.35)' }}>Free AI Consultation</span>
            <WinBtns onMin={()=>setConsult('min')} onClose={()=>setConsult('closed')} />
          </div>
          <div style={{ padding:'20px 22px 22px' }}>
            <ConsultForm service="General AI Consultation" source="AI Desktop System Update" color={TEAL}
              text="Let’s discuss how AI can help your business save time, reduce costs and create new opportunities."
              cta="Request Free Consultation" />
          </div>
        </div>
      )}

      {/* taskbar */}
      <div style={{ position:'absolute', left:0, right:0, bottom:0, minHeight:46, display:'flex', alignItems:'center', gap:7, padding:'6px 10px', flexWrap:'wrap',
        background:'linear-gradient(180deg,#3f74c4 0%,#2f60ab 8%,#2b5aa5 100%)', borderTop:'1px solid #6f9ce0', boxShadow:'0 -2px 10px rgba(20,40,80,.3)', zIndex:8000 }}>
        <button aria-label="Pixel Start" style={{ display:'flex', alignItems:'center', gap:7, padding:'6px 15px 6px 12px', borderRadius:7, border:'none', background:'linear-gradient(180deg,#63b054,#3f8a34)', color:'#fff', fontFamily:SYS, fontSize:14, fontWeight:700, cursor:'pointer', boxShadow:'inset 0 1px 0 rgba(255,255,255,.4)' }}>
          <span style={{ fontFamily:PIXEL, fontSize:16 }}>Pixel</span>
        </button>
        {sys==='min' && <button onClick={()=>setSys('open')} style={taskItem(false)}>System Notification</button>}
        {consult==='min' && <button onClick={()=>setConsult('open')} style={taskItem(false)}>Free AI Consultation</button>}
        {wins.map(w=>{ const s=SVC_MAP[w.id]; const active=w.state==='open';
          return <button key={w.id} onClick={()=>w.state==='min'?restoreWin(w.id):(active?minWin(w.id):restoreWin(w.id))} style={taskItem(active)}>
            <span style={{ width:14, height:14, borderRadius:3, background:'rgba(255,255,255,.9)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Glyph k={s.id} color={s.color} size={10} /></span>
            {s.exe}
          </button>; })}
        <div style={{ flex:1, minWidth:20 }} />
        <div style={{ display:'flex', alignItems:'center', gap:6, fontFamily:SYS, fontSize:11.5, fontWeight:700, color:'#d6ffd0', padding:'5px 10px', borderRadius:6, background:'rgba(0,0,0,.16)' }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#6fe86a', boxShadow:'0 0 6px #6fe86a' }} />AI SYSTEM: ONLINE
        </div>
        <div style={{ fontFamily:SYS, fontSize:13, color:'#eaf1fb', padding:'5px 14px', borderRadius:6, background:'rgba(0,0,0,.14)', boxShadow:'inset 0 1px 2px rgba(0,0,0,.2)', marginRight:isMobile?0:82 }}>{clock}</div>
      </div>
    </section>
  );
}

window.AIDesktopFull = AIDesktopFull;
window.DTGlyphShared = Glyph;
})();
