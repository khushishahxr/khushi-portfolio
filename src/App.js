import { useState, useEffect, useRef } from 'react';

const PU = '#7C6FF7', AM = '#E8A020', TE = '#2DD4BF';
const PK = '#E870B0', RD = '#E85050', GR = '#6DB85C';
const DK = '#0A0A0A', LT = '#F5F4EF';
const BASE = process.env.PUBLIC_URL || '';

const projects = [
  {
    n: '01', title: 'Afterglow', sub: 'AR Mystery Investigation Game', year: '2026', col: AM, portrait: true,
    cardImgs: [BASE+'/images/afterglow/Afterglow01.jpeg', BASE+'/images/afterglow/Afterglow02.jpeg', BASE+'/images/afterglow/Afterglow03.jpeg', BASE+'/images/afterglow/Afterglow04.jpeg'],
    desc: 'A post-apocalyptic AR mystery game for Android, built as an MSc thesis — Gemini AI dynamically generates the case narrative around real physical spaces, benchmarked against a fixed-narrative condition in a 20-participant user study.',
    tags: ['Unity','AR Foundation','Gemini API','C#','UI Toolkit','Android'],
    overlay: { role: 'Lead Designer & Developer', duration: '2025–2026', fullDesc: 'Afterglow — working title "Project Lumen" — is a post-apocalyptic AR mystery investigation game for Android, developed as an MSc thesis. Set in a fractured 2029, players investigate a hidden truth by scanning real physical spaces for AR clues and piecing together an AI-generated case narrative. The full experience is built across 7 Unity UI Toolkit screens — Home, Chapters, Teaser, Gameplay, CrimeBoard, TheoryResult, and Ending — styled in a cold blue interface aesthetic and built entirely in C#. Its core research contribution is a dynamic narrative engine powered by the Gemini API (gemini-2.5-flash), which generates and adapts case content in real time as players explore. This was evaluated against a fixed, pre-written narrative condition in a between-subjects user study with 20 participants, alongside an AR clue detection and interaction system with persistent world-state tracking.', highlights: ['Full Unity UI across 7 screens — Home, Chapters, Teaser, Gameplay, CrimeBoard, TheoryResult, Ending','Cold blue interface aesthetic, built in C# with UI Toolkit','Dynamic AI narrative generation via Gemini API (gemini-2.5-flash) vs. a fixed-narrative condition','Between-subjects user study with 20 participants comparing the two narrative conditions','AR clue detection and interaction system with persistent world-state management','Post-apocalyptic 2029 setting — research-driven MSc thesis project ("Project Lumen")'], video: null, images: [BASE+'/images/afterglow/Afterglow04.jpeg', BASE+'/images/afterglow/Afterglow05.jpeg', BASE+'/images/afterglow/Afterglow06.jpeg'] },
  },
  {
    n: '02', title: 'Eterna', sub: 'AI Digital Legacy Platform', year: '2025', col: PU,
    cardImgs: [BASE+'/images/eterna/Eterna02.png', BASE+'/images/eterna/Eterna03.png', BASE+'/images/eterna/Eterna06.png'],
    desc: 'A speculative digital memorial ecosystem reimagining how we remember the deceased. 3D tombstone customiser, shared memory wall, QR-based access, and AR viewer — mourning made portable, personal, and co-created.',
    tags: ['Unity','React','Firebase','Blender','Cloudinary','C#','AR','WebGL'],
    overlay: { role: 'Lead Designer & Developer', duration: '2025', fullDesc: 'Eterna is a speculative digital memorial ecosystem that proposes a new language for grief, legacy, and remembrance in a tech-driven world. Built with Unity WebGL, React, and Firebase, it lets users design a 3D tombstone, share a memory wall with loved ones, and view the memorial in augmented reality. Rooted in the question of what it means to leave a digital mark when we pass, Eterna proposes four alternative design values: fluidity over finality, access over isolation, customisation over conformity, and co-created memory over solitary tribute. The QR-based role system keeps memorials private while making them globally accessible — challenging the idea that remembrance must be location-bound.', highlights: ['3D tombstone customiser with shape, material, and engraving options','Shared memory wall for sticky notes, messages, and anonymous reflections','QR-based access system — portable remembrance from anywhere in the world','Built-in AR viewer bridges physical and virtual memorial space','Role-based permissions: creator control vs read-only family access','Speculative design critique of static, location-bound mourning rituals'], video: BASE+'/images/eterna/EternaVideo.mp4', images: [BASE+'/images/eterna/Eterna01.png', BASE+'/images/eterna/Eterna02.png', BASE+'/images/eterna/Eterna03.png', BASE+'/images/eterna/Eterna04.png', BASE+'/images/eterna/Eterna06.png', BASE+'/images/eterna/Eterna07.png'] },
  },
  {
    n: '03', title: 'SomaKshetra', sub: 'Multisensory VR Environment', year: '2025', col: PK,
    cardImgs: [BASE+'/images/somakshetra/Somakshetra01.png', BASE+'/images/somakshetra/Somakshetra02.png', BASE+'/images/somakshetra/Somakshetra03.png'],
    desc: 'A multimodal VR healing pod merging Ayurvedic philosophy with sensory design — sound, scent, temperature, and haptics guide users through meditation, yoga, library, and night sky zones.',
    tags: ['Unity','Blender','TwinMotion','C#','VR','Haptic Design','Ayurveda'],
    overlay: { role: 'Lead Designer & Developer', duration: '2025', fullDesc: 'Somakshetra — The Field of Serenity — is a multimodal VR healing pod that translates Indian Ayurvedic traditions into an immersive, tech-driven experience. Designed for urban professionals and wellness seekers with limited time, it places users inside a compact VR sanctuary where five sensory channels work in concert: aroma diffusers sync with meditation scenes, temperature shifts between the waterfall and candle-lit library, haptic feedback simulates mantra resonance, and spatial audio grounds each zone in cultural authenticity. The journey follows the Ayurvedic arc of Shuddhi (cleansing) to Samatva (balance) to Dhyana (awareness), moving through four zones: Meditation, Yoga and Waterfall, Library, and Night Sky. Built in Unity with Blender environments and TwinMotion texturing, it bridges ancient Indian healing philosophy with contemporary immersive design.', highlights: ['4 Ayurvedic healing zones: Meditation, Yoga and Waterfall, Library, Night Sky','Five sensory channels — sight, sound, scent, touch, and temperature — designed in harmony','Aroma diffusers, micro-fans, and haptic pads proposed for physical pod prototype','Spatial sequencing follows Ayurvedic arc: cleansing to balance to awareness','Cultural symbolism throughout — incense, mantra chants, sitar, star-lit pratyahara','Bridges traditional Indian wellness with accessible, time-efficient immersive design'], video: BASE+'/images/somakshetra/SomakshetraVideo.mp4', images: [BASE+'/images/somakshetra/Somakshetra04.png', BASE+'/images/somakshetra/Somakshetra05.png', BASE+'/images/somakshetra/Somakshetra06.png', BASE+'/images/somakshetra/Somakshetra07.png'] },
  },
  {
    n: '04', title: 'Rangantar', sub: 'Holi Interactive Storytelling', year: '2025', col: RD,
    cardImgs: [BASE+'/images/rangantar/Rangantar02.png', BASE+'/images/rangantar/Rangantar03.png', BASE+'/images/rangantar/Rangantar04.png'],
    desc: 'A multi-room interactive WebGL installation reimagining Holi through colour-coded spaces — each room maps an emotion to a cultural ritual, from Holika Dahan to Krishna reflection.',
    tags: ['Unity','Blender','Photoshop','Canva','WebGL','ElevenLabs'],
    overlay: { role: 'Lead Designer & Developer', duration: '2025', fullDesc: 'Rangantar reimagines Holi as a multi-sensory interactive installation for museums, exhibitions, and festivals. Built in Unity and deployed as a WebGL experience, it places users inside four colour-coded rooms — Red (Holika Dahan / anger release), Blue (Krishna reflection / divine calm), Yellow (joy / selfie mirror + doodle wall), and Green (renewal / silence). Each space uses 3D environments, ElevenLabs voiceovers, physics interactions, and cultural hotspots to turn a festival into a living narrative. Designed to bridge cultural heritage with modern digital engagement for diaspora audiences and curious newcomers alike.', highlights: ['4 themed rooms each mapping a Holi emotion to a cultural ritual','Red Room bonfire lets users symbolically burn negative thoughts','Blue Room lotus blooms and responds to users whispered emotion','Yellow Room includes live Snapchat Holi filter + real-time doodle wall','ElevenLabs AI voiceovers and spatial audio throughout','Built for museums, festivals, and future VR/AR extension'], video: BASE+'/images/rangantar/RangantarVideo.mp4#t=0,183', images: [BASE+'/images/rangantar/Rangantar01.png', BASE+'/images/rangantar/Rangantar02.png', BASE+'/images/rangantar/Rangantar03.png', BASE+'/images/rangantar/Rangantar04.png', BASE+'/images/rangantar/Rangantar05.png'] },
  },
  {
    n: '05', title: 'Art Gallery', sub: 'Interactive 3D Exhibition Experience', year: '2025', col: GR,
    cardImgs: [BASE+'/images/exhibitions/ArtExhibition01.png', BASE+'/images/exhibitions/ArtExhibitionVideo.mp4'],
    desc: 'A virtual 3D gallery that feels alive — proximity narration, quiz interactions, TV slideshows, clickable brochures, and live visitor analytics. Runs on laptop via WASD + mouse, no headset needed.',
    tags: ['Unity','Blender','C#','WebGL','Interactive Storytelling'],
    overlay: { role: 'Lead Designer & Developer', duration: '2025', fullDesc: 'Interactive Art Gallery is a virtual 3D exhibition space designed for learning and engagement — not just passive viewing. Built in Unity and accessible via browser (WASD + mouse), it replaces the static VR gallery model with interactive storytelling features: artworks trigger auto info panels and audio narration when approached, a quiz modal (Press Q) tests understanding without leaving the scene, a TV slideshow delivers dynamic content in-space, and a clickable brochure opens a detailed image modal. A live visitor analytics panel (Press P) tracks time spent, distance walked, idle moments, and interaction triggers — making it useful for curators and educators, not just visitors. Lightweight, shareable via link, and built for real audiences.', highlights: ['Proximity narration — auto info panel and audio trigger when approaching artworks','Quiz modal (Press Q) for in-scene learning checks without breaking immersion','TV slideshow screen delivers dynamic content inside the 3D space','Clickable brochure opens a detailed image modal for deeper exploration','Live visitor analytics (Press P) — tracks time, distance, idle, and interaction triggers','Runs on laptop via WASD + mouse — no headset, no install, shareable via link'], video: BASE+'/images/exhibitions/ArtExhibitionVideo.mp4', images: [BASE+'/images/exhibitions/ArtExhibition01.png'], liveLink: 'https://plnkr.co/edit/HqkTdeZohK2AqeVM' },
  },
];

const expRows = [
  { n: '01', role: '3D Designer & UX Consultant', co: 'FirstCut Design Studio, Berlin', period: '2023–2025', tag: 'Part-time', col: AM },
  { n: '02', role: 'UX/UI & Interaction Designer — 3D', co: 'JJJ-Itech Pvt. Ltd.', period: '2023–2025', tag: 'Full-time', col: PU },
  { n: '03', role: 'Junior Multi-Media Designer', co: 'Assist Design Automation Pvt. Ltd.', period: 'Jan–Mar 2023', tag: 'Internship', col: TE },
];

const galleryImages = [
  { src: BASE+'/images/finalrender.png', label: 'Interior Architecture' },
  { src: BASE+'/images/Image1_000.png', label: 'Architectural Render' },
  { src: BASE+'/images/render2.png', label: 'Exhibition Space' },
  { src: BASE+'/images/laptop_stand-rendered.jpeg', label: 'Product Design' },
  { src: BASE+'/images/02.png', label: 'Vehicle Simulation' },
  { src: BASE+'/images/1720851584097.jpg', label: 'Industrial Design' },
];

function useScrollReveal() {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Gallery() {
  const track = [...galleryImages, ...galleryImages];
  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{ display: 'flex', gap: 16, width: 'max-content', animation: 'marquee 28s linear infinite' }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>
        {track.map((img, i) => (
          <div key={i}
            style={{ position: 'relative', flexShrink: 0, width: 320, height: 210, borderRadius: 12, overflow: 'hidden', transition: 'transform .3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.querySelector('.ov').style.opacity = 1; e.currentTarget.querySelector('.lb').style.opacity = 1; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.querySelector('.ov').style.opacity = 0; e.currentTarget.querySelector('.lb').style.opacity = 0; }}>
            <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div className="ov" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top,rgba(0,0,0,.7) 0%,transparent 55%)', opacity: 0, transition: 'opacity .3s' }} />
            <span className="lb" style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: 'var(--i)', fontSize: 12, color: 'white', fontWeight: 500, opacity: 0, transition: 'opacity .3s' }}>{img.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatShape({ type, col, size, top, left, anim, delay = 0, vis }) {
  const base = { position: 'absolute', top, left, pointerEvents: 'none', zIndex: 2, opacity: vis ? 1 : 0, '--tx': type === 'asterisk' ? '-20px' : '20px', '--ty': '-20px', animation: vis ? `shapeReveal .7s cubic-bezier(.16,1,.3,1) ${delay}s both, ${anim} ${3.5 + delay * 0.3}s ease-in-out ${delay + 0.7}s infinite` : 'none' };
  if (type === 'asterisk') return (<div style={base}><svg width={size} height={size} viewBox="0 0 40 40"><line x1="20" y1="2" x2="20" y2="38" stroke={col} strokeWidth="5" strokeLinecap="round" /><line x1="2" y1="20" x2="38" y2="20" stroke={col} strokeWidth="5" strokeLinecap="round" /><line x1="7" y1="7" x2="33" y2="33" stroke={col} strokeWidth="5" strokeLinecap="round" /><line x1="33" y1="7" x2="7" y2="33" stroke={col} strokeWidth="5" strokeLinecap="round" /></svg></div>);
  if (type === 'hex') return (<div style={base}><svg width={size} height={size} viewBox="0 0 60 60"><polygon points="30,3 55,17 55,43 30,57 5,43 5,17" fill="none" stroke={col} strokeWidth="4" /><polygon points="30,12 46,21 46,39 30,48 14,39 14,21" fill={col + '33'} stroke={col} strokeWidth="2" /></svg></div>);
  if (type === 'blob') return <div style={{ ...base, width: size, height: size, borderRadius: '60% 40% 50% 60%/50% 60% 40% 50%', background: `radial-gradient(circle at 35% 35%,${col}cc,${col}55)`, border: `2px solid ${col}88` }} />;
  if (type === 'ring') return <div style={{ ...base, width: size, height: size, borderRadius: '50%', border: `4px solid ${col}`, background: `radial-gradient(circle,${col}22,transparent)` }} />;
  return null;
}

export default function App() {
  const [navBg, setNavBg] = useState(false);
  const [activeProj, setActiveProj] = useState(0);
  const [typeText, setTypeText] = useState('');
  const [aboutRef, aboutVis] = useScrollReveal();
  const [openProject, setOpenProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const onScroll = () => setNavBg(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const full = 'XR Developer & AI Experience Designer';
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        if (i <= full.length) { setTypeText(full.slice(0, i)); i++; } else { clearInterval(iv); }
      }, 50);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const p = projects[activeProj];

  return (
    <div style={{ background: DK, fontFamily: 'var(--i)', color: '#F0EFF5', minHeight: '100vh' }}>

      <div style={{ display: openProject ? 'block' : 'none', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.92)', overflowY: 'auto' }} onClick={() => setOpenProject(null)}>
        {openProject && (
          <div onClick={e => e.stopPropagation()} style={{ background: '#0D0D0D', width: '90%', maxWidth: 860, margin: '3rem auto 4rem', borderRadius: 16, padding: '2rem 2.5rem 3rem', position: 'relative' }}>
            <button onClick={() => setOpenProject(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.1)', border: 'none', color: 'white', width: 38, height: 38, borderRadius: '50%', fontSize: 16, cursor: 'pointer' }}>✕</button>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.16em', color: openProject.col, marginBottom: '.5rem' }}>{openProject.overlay.role} · {openProject.overlay.duration}</p>
            <h2 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', color: 'white', lineHeight: 0.9, marginBottom: '.4rem' }}>{openProject.title}</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: '2rem' }}>{openProject.sub}</p>
            {openProject.overlay.video && <video controls style={{ width: '100%', borderRadius: 10, marginBottom: '1.5rem', display: 'block' }}><source src={openProject.overlay.video} type="video/mp4" /></video>}
            {openProject.overlay.images && openProject.overlay.images.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: openProject.portrait ? 'repeat(auto-fill, minmax(140px, 1fr))' : (openProject.overlay.images.length === 1 ? '1fr' : '1fr 1fr'), gap: 10, marginBottom: '1.5rem' }}>
                {openProject.overlay.images.map((src, i) => (
                  <img key={i} src={src} alt={openProject.title} onClick={e => { e.stopPropagation(); setLightbox(src); }} style={openProject.portrait
                    ? { width: '100%', maxHeight: 420, borderRadius: 8, objectFit: 'contain', background: '#000', display: 'block', margin: '0 auto', cursor: 'pointer' }
                    : { width: '100%', borderRadius: 8, objectFit: 'cover', display: 'block', cursor: 'pointer' }} />
                ))}
              </div>
            )}
            {openProject.overlay.liveLink && (
              <a href={openProject.overlay.liveLink} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '10px 22px', background: openProject.col, color: 'white', borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: 'none', marginBottom: '2rem' }}>Experience it Live →</a>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', color: openProject.col, marginBottom: '.75rem' }}>ABOUT</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>{openProject.overlay.fullDesc}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', color: openProject.col, marginBottom: '.75rem' }}>HIGHLIGHTS</p>
                {openProject.overlay.highlights.map((h, i) => <div key={i} style={{ display: 'flex', gap: '.6rem', fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: '.5rem', lineHeight: 1.5 }}><span style={{ color: openProject.col, flexShrink: 0 }}>→</span>{h}</div>)}
                <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                  {openProject.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 2, background: openProject.col + '22', color: openProject.col, fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: lightbox ? 'flex' : 'none', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10001, background: 'rgba(0,0,0,0.96)', alignItems: 'center', justifyContent: 'center', padding: '3rem' }} onClick={() => setLightbox(null)}>
        <button onClick={() => setLightbox(null)} style={{ position: 'fixed', top: 16, right: 16, background: 'rgba(255,255,255,.1)', border: 'none', color: 'white', width: 38, height: 38, borderRadius: '50%', fontSize: 16, cursor: 'pointer', zIndex: 10002 }}>✕</button>
        {lightbox && <img src={lightbox} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8, display: 'block' }} />}
      </div>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 56, padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: navBg ? 'rgba(10,10,10,0.95)' : 'transparent', backdropFilter: navBg ? 'blur(20px)' : 'none', borderBottom: navBg ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all .3s' }}>
        {['Home','About','Projects','Work','Contact'].map(s => (
          <span key={s} className="nlink" style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', fontWeight: 500, letterSpacing: '.04em' }} onClick={() => go(s.toLowerCase())}>{s}</span>
        ))}
      </nav>

      <section id="home" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 56 }}>
        
        
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.5rem' }}>
          <div style={{ width: '100%', padding: '0 5rem', textAlign: 'center', zIndex: 3, position: 'relative', animation: 'fadeIn .9s ease .2s both', marginBottom: '-2rem' }}>
            <div style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2rem,7.5vw,5.2rem)', letterSpacing: '-.02em', lineHeight: 0.9, color: 'rgba(255,255,255,.93)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>HI I'M KHUSHI</div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, animation: 'fadeIn .9s ease .5s both', marginTop: '-1rem' }}>
            <video autoPlay loop muted playsInline src={BASE+'/images/emoji.mp4'} style={{ width: 420, height: 460, objectFit: 'contain', display: 'block', background: '#0A0A0A' }} />
          </div>
          <p style={{ fontSize: 'clamp(.8rem,1.6vw,.9rem)', color: 'rgba(255,255,255,.38)', margin: '0 0 .8rem', fontWeight: 300, letterSpacing: '.01em', animation: 'fadeIn 1s ease .9s both', zIndex: 3, textAlign: 'center' }}>
            {typeText}<span style={{ display: 'inline-block', width: 2, height: '1em', background: PU, marginLeft: 2, verticalAlign: 'middle', animation: 'blink 1s infinite' }} />
          </p>
          <div style={{ display: 'flex', gap: '.8rem', zIndex: 3, animation: 'fadeUp .8s ease 1s both' }}>
            <button className="btn-p" onClick={() => go('projects')} style={{ padding: '11px 26px', background: PU, color: 'white', border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>View Work</button>
            <button className="btn-p" onClick={() => go('contact')} style={{ padding: '11px 26px', background: 'transparent', color: 'rgba(255,255,255,.4)', border: '1px solid rgba(255,255,255,.13)', borderRadius: 4, fontSize: 13, cursor: 'pointer', fontWeight: 400 }}>Contact</button>
          </div>
        </div>
      </section>

      <section id="about" ref={aboutRef} style={{ background: '#0C0C0C', padding: '7rem 2.5rem', position: 'relative', overflow: 'hidden', minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <FloatShape type="asterisk" col="#5B8FFF" size={44} top="12%" left="4%"  anim="float1" delay={0}    vis={aboutVis} />
        <FloatShape type="hex"      col={PU}       size={52} top="8%"  left="80%" anim="float2" delay={0.15} vis={aboutVis} />
        <FloatShape type="blob"     col={PK}       size={40} top="68%" left="87%" anim="float3" delay={0.3}  vis={aboutVis} />
        <FloatShape type="ring"     col={AM}       size={36} top="72%" left="3%"  anim="float4" delay={0.45} vis={aboutVis} />
        <FloatShape type="asterisk" col={TE}       size={28} top="42%" left="91%" anim="float1" delay={0.6}  vis={aboutVis} />
        <FloatShape type="blob"     col="#5B8FFF"  size={24} top="22%" left="52%" anim="float2" delay={0.75} vis={aboutVis} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, opacity: aboutVis ? 1 : 0, transform: aboutVis ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease .1s, transform .8s ease .1s' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.18em', color: PU, marginBottom: '1rem' }}>WHO I AM</p>
          <h2 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(3rem,8vw,5rem)', letterSpacing: '-.04em', lineHeight: 0.9, marginBottom: '2rem' }}>ABOUT ME</h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,.45)', fontWeight: 300, marginBottom: '2.5rem' }}>Creative technologist and MSc candidate in Media Design (Technology & AI) at MediaDesign Hochschule, Berlin specializing in human–AI collaboration, immersive systems, and real-time 3D interaction. Experienced in architecting AI-assisted prototypes and deploying interactive spatial systems across web, AR, and VR environments.</p>
          <button className="btn-p" onClick={() => go('contact')} style={{ padding: '11px 26px', background: 'transparent', border: `1px solid ${PU}`, color: PU, borderRadius: 4, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Let's Talk →</button>
        </div>
      </section>

      <section id="projects" style={{ background: '#0A0A0A', padding: '7rem 2.5rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.18em', color: PU }}>SELECTED WORK</p>
            <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'flex-end', paddingBottom: 2 }}>
              {projects.map((pr, i) => (
                <div key={i} className="ptab" onClick={() => setActiveProj(i)} style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-.01em', color: i === activeProj ? p.col : 'rgba(255,255,255,.2)', borderBottom: i === activeProj ? `2px solid ${p.col}` : '2px solid transparent', paddingBottom: 5, lineHeight: 1, transition: 'all .22s ease' }}>{pr.n}</div>
              ))}
            </div>
          </div>
          <div key={activeProj} style={{ background: '#111', borderRadius: 14, border: '1px solid rgba(255,255,255,.07)', borderTop: `2px solid ${p.col}` }}>
            <div onClick={() => setOpenProject(p)} style={{ padding: '1.5rem 1.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' }}>
              <div>
                <div style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: '3.5rem', color: 'rgba(255,255,255,.05)', lineHeight: 1, userSelect: 'none', letterSpacing: '-.02em' }}>{p.n}</div>
                <h3 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: '1.9rem', letterSpacing: '-.03em', color: p.col, lineHeight: 1, marginTop: '-.4rem' }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', marginTop: '.35rem', fontWeight: 400 }}>{p.sub} · {p.year}</p>
              </div>
              <button className="btn-p" onClick={e => { e.stopPropagation(); setOpenProject(p); }} style={{ width: 44, height: 44, borderRadius: '50%', background: p.col, border: 'none', color: 'white', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>↗</button>
            </div>
            <div style={p.portrait
              ? { display: 'flex', justifyContent: 'center', gap: '.6rem', padding: '0 1.5rem 1.25rem' }
              : { display: 'grid', gridTemplateColumns: p.cardImgs.length === 2 ? '1fr 1fr' : '1fr 1fr 1fr', gap: '.75rem', padding: '0 1.5rem 1.25rem' }}>
              {p.cardImgs.map((img, j) => (
                <div key={j} className="img-slot" style={{ height: 130, borderRadius: 8, overflow: 'hidden', flexShrink: 0, ...(p.portrait ? { aspectRatio: '876/1400', border: '1px solid rgba(255,255,255,.1)' } : {}), ...(img.startsWith('linear') ? { background: img } : {}) }}>
                  {img.endsWith('.mp4') && <video src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} muted />}
                  {!img.startsWith('linear') && !img.endsWith('.mp4') && <img src={img} alt={p.title + ' ' + (j+1)} onClick={e => { e.stopPropagation(); setLightbox(img); }} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }} />}
                </div>
              ))}
            </div>
            <div style={{ padding: '.75rem 1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,.05)' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.75, fontWeight: 300, marginBottom: '.75rem' }}>{p.desc}</p>
              <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap' }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 2, background: `${p.col}18`, color: p.col, fontWeight: 500, letterSpacing: '.04em' }}>{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#0D0D0D', padding: '5rem 0', overflow: 'hidden' }}>
        <div style={{ padding: '0 2.5rem', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.18em', color: PU, marginBottom: '.5rem' }}>3D ARTWORK</p>
          <h2 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-.03em', color: 'white', lineHeight: 0.9 }}>Environment Renders</h2>
        </div>
        <Gallery />
        <p style={{ fontFamily: 'var(--i)', fontSize: 11, color: 'rgba(255,255,255,.2)', textAlign: 'center', marginTop: '1.5rem', letterSpacing: '.06em' }}>HOVER TO PAUSE</p>
      </section>

      <section id="work" style={{ background: LT, padding: '7rem 0' }}>
        <div style={{ padding: '0 2.5rem', maxWidth: 900, margin: '0 auto 2rem' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.18em', color: PU, marginBottom: '.4rem' }}>PROFESSIONAL HISTORY</p>
        </div>
        {expRows.map((e, i) => (
          <div key={i} className="exp-row" style={{ padding: '1.4rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all .28s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <span className="exp-num" style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: '2.2rem', color: 'rgba(0,0,0,.1)', letterSpacing: '-.02em', lineHeight: 1, minWidth: 48, transition: 'color .28s' }}>{e.n}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--b)', fontWeight: 700, fontSize: '1.5rem', color: DK, letterSpacing: '-.02em', lineHeight: 1 }}>{e.role}</h3>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,.4)', marginTop: 4, fontWeight: 400 }}>{e.co} · {e.period}</p>
              </div>
            </div>
            <span style={{ fontSize: 11, background: `${e.col}22`, color: e.col, padding: '5px 12px', borderRadius: 3, fontWeight: 600, letterSpacing: '.04em', flexShrink: 0 }}>{e.tag}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #E0DDD5' }} />
      </section>

      <section id="contact" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 360 }}>
        <div style={{ background: LT, padding: '5rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.18em', color: PU, marginBottom: '1rem' }}>AVAILABLE · BERLIN</p>
          <h2 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2.2rem,5.5vw,3.5rem)', letterSpacing: '-.03em', lineHeight: 0.88, color: DK, marginBottom: '1.5rem' }}>Let's<br />Get<br /><span style={{ color: PU }}>In Touch</span></h2>
          <a href="mailto:khushi.workspace@gmail.com" style={{ fontSize: 13, color: DK, fontWeight: 600, textDecoration: 'none', marginBottom: '.4rem' }}>khushi.workspace@gmail.com</a>
          <a href="https://www.linkedin.com/in/khushi-shah-a51070206/" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'rgba(0,0,0,.38)', textDecoration: 'none', marginBottom: '.4rem' }}>LinkedIn ↗</a>
          <a href="https://github.com/Khushi-099" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'rgba(0,0,0,.38)', textDecoration: 'none', marginBottom: '1rem' }}>GitHub ↗</a>
          <a href={BASE+'/resume.pdf'} download="Khushi_Shah_Resume.pdf" style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '10px 20px', background: PU, color: 'white', borderRadius: 4, fontSize: 12, fontWeight: 600, textDecoration: 'none', marginBottom: '1.5rem', alignSelf: 'flex-start' }}>↓ Download Resume</a>
          <button className="btn-p" onClick={() => window.location.href = 'mailto:khushi.workspace@gmail.com'} style={{ padding: '11px 26px', background: DK, color: 'white', border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>Send Message →</button>
        </div>
        <div style={{ background: DK, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 160, height: 160 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 78, height: 78, background: PU, borderRadius: '50%', animation: 'float1 3.2s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: 62, height: 62, background: AM, borderRadius: 8, animation: 'float2 3.8s ease-in-out infinite', animationDelay: '.5s' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 48, height: 48, background: TE, borderRadius: '50%', animation: 'float3 4.2s ease-in-out infinite', animationDelay: '1s' }} />
          </div>
        </div>
      </section>

      <div style={{ background: DK, borderTop: '1px solid rgba(255,255,255,.05)', padding: '1.4rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-.01em', color: 'rgba(255,255,255,.85)', textTransform: 'uppercase' }}>KHUSHI SHAH</span>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {[{c:PU,s:26,r:15,rd:true},{c:AM,s:20,r:0,rd:false},{c:TE,s:24,r:-20,rd:false},{c:PK,s:18,r:10,rd:true},{c:'#5B8FFF',s:16,r:30,rd:false},{c:RD,s:22,r:-10,rd:true},{c:GR,s:18,r:20,rd:false}].map((sh, i) => (
            <div key={i} style={{ width: sh.s, height: sh.s, background: sh.c, borderRadius: sh.rd ? '50%' : 4, transform: `rotate(${sh.r}deg)`, flexShrink: 0 }} />
          ))}
        </div>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,.18)' }}>© 2025</span>
      </div>
    </div>
  );
}