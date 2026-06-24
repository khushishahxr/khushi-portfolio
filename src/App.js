import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const PU = '#7C6FF7', AM = '#E8A020', TE = '#2DD4BF';
const PK = '#E870B0', RD = '#E85050', GR = '#6DB85C';
const DK = '#0A0A0A', LT = '#F5F4EF';
const BASE = process.env.PUBLIC_URL || '';

const projects = [
  {
    n: '01', title: 'Afterglow', sub: 'AR Mobile Investigation Game', year: '2024–25', col: AM,
    cardImgs: ['linear-gradient(145deg,#3a2200,#9a6000)','linear-gradient(145deg,#2a1800,#7a4800)','linear-gradient(145deg,#1a0e00,#5a3200)'],
    desc: 'Post-apocalyptic AR mystery across 6 real indoor spaces. Gemini AI detects objects in your environment and rewrites the story in real time.',
    tags: ['Unity','AR Foundation','Gemini AI','C#','Mobile AR'],
    overlay: { role: 'Lead Designer & Developer', duration: '2024–2025', fullDesc: 'Afterglow is a post-apocalyptic AR mobile investigation game where players explore their real physical environment to uncover a mystery. The game spans 6 real indoor spaces, each containing AI-generated clues and narrative that adapts dynamically based on objects detected by the camera. No two playthroughs are the same.', highlights: ['6 real indoor spaces form the investigation map','Gemini AI detects real objects and rewrites narrative in real time','Multi-room progression with AI-driven story continuity','Post-apocalyptic world overlaid on live physical environments'], video: null, images: [] },
  },
  {
    n: '02', title: 'Eterna', sub: 'AI Digital Legacy Platform', year: '2024–25', col: PU,
    cardImgs: ['linear-gradient(145deg,#140d40,#4a38b0)','linear-gradient(145deg,#0e0930,#362888)','linear-gradient(145deg,#080620,#221860)'],
    desc: 'Hybrid 3D + web AR memorial platform. Real-time tombstone customisation, memory wall, QR role access. 11+ users, ~30% WebGL load reduction.',
    tags: ['Unity','React','Firebase','Blender','Cloudinary'],
    overlay: { role: 'Lead Designer & Developer', duration: '2024–2025', fullDesc: 'Eterna is a hybrid 3D + web platform for creating personalised digital memorials with live AR preview. Users customise tombstones in real time, leave memory wall notes, and share access through QR codes with role-based permissions. Built for a live user study with faculty evaluators.', highlights: ['11+ active users including faculty evaluators','~30% reduction in WebGL asset load','QR-based creator vs read-only role system','Real-time AR tombstone customisation and preview'], video: null, images: [] },
  },
  {
    n: '03', title: 'SomaKshetra', sub: 'Multisensory VR Environment', year: '2024', col: PK,
    cardImgs: [BASE+'/images/somakshetra/Somakshetra01.png', BASE+'/images/somakshetra/Somakshetra02.png', BASE+'/images/somakshetra/Somakshetra03.png'],
    desc: 'Immersive VR healing environment with multisensory spatial logic and adaptive C# state-based interaction across interconnected interior spaces.',
    tags: ['Unity','Blender','TwinMotion','C#','VR'],
    overlay: { role: 'Lead Designer & Developer', duration: '2024', fullDesc: 'SomaKshetra is a multisensory VR healing environment designed to promote wellbeing through spatial immersion. The experience integrates sound, light, and interactive elements across interconnected interior spaces, each designed with a distinct emotional and sensory intention. An adaptive C# state-based system guides the user through the experience based on their interactions.', highlights: ['Multisensory spatial logic across interconnected rooms','Adaptive C# state-based interaction system','Spatial immersion evaluation framework','Designed for emotional and therapeutic engagement'], video: BASE+'/images/somakshetra/SomakshetraVideo.mp4', images: [BASE+'/images/somakshetra/Somakshetra04.png', BASE+'/images/somakshetra/Somakshetra05.png', BASE+'/images/somakshetra/Somakshetra06.png', BASE+'/images/somakshetra/Somakshetra07.png'] },
  },
  {
    n: '04', title: 'Rangantar', sub: 'Holi Interactive Storytelling', year: '2023–24', col: RD,
    cardImgs: ['linear-gradient(145deg,#3a0a00,#c03000)','linear-gradient(145deg,#001a3a,#004aa0)','linear-gradient(145deg,#1a2a00,#4a7800)'],
    desc: 'Cultural storytelling prototype inspired by Holi — rooms representing Joy, Love, and Calm. Full 3D environments with audio integration for an immersive WebGL experience.',
    tags: ['Unity','Blender','Photoshop','Canva','WebGL'],
    overlay: { role: 'Lead Designer & Developer', duration: '2023–2024', fullDesc: 'Rangantar is a cultural storytelling prototype inspired by the festival of Holi. The experience takes users through interconnected rooms, each representing a distinct emotion — Joy, Love, and Calm. Full 3D environments, audio integration, and navigation logic create an immersive WebGL journey that celebrates Indian cultural identity through interactive design.', highlights: ['Rooms representing Joy, Love, and Calm','Full 3D environments with audio integration','Navigation logic and level transitions','Immersive WebGL experience'], video: null, images: [] },
  },
  {
    n: '05', title: '3D Exhibitions', sub: 'Interactive Environments & Data Viz', year: '2023–25', col: GR,
    cardImgs: ['linear-gradient(145deg,#0a1a00,#2a5a00)','linear-gradient(145deg,#001828,#004a7a)','linear-gradient(145deg,#1a1000,#5a3800)'],
    desc: 'Live-deployed exhibition stalls, real-time data dashboards, and 3D training video series for BEL Army combining animation, voiceover, and motion graphics.',
    tags: ['Unity','Keyshot','Blender','After Effects','Premiere Pro'],
    overlay: { role: '3D Designer & Technical Artist', duration: '2023–2025', fullDesc: 'A suite of live-deployed interactive 3D experiences across corporate and educational contexts. Includes interactive exhibition stalls with rotating products and animated transitions, real-time data visualisation dashboards for live exhibition spaces, and a 3D training video series for the BEL Army combining animation, voiceover, and synchronised motion graphics.', highlights: ['Live-deployed in physical exhibition spaces','Interactive rotating products and clickable panels','Real-time data dashboards for corporate clients','BEL Army training modules with voiceover and motion graphics'], video: null, images: [] },
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

function ProjectOverlay({ project, onClose }) {
  const o = project.overlay;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return createPortal(
    <div onClick={onClose} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 9999,
      background: 'rgba(0,0,0,0.88)',
      overflowY: 'auto',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#0D0D0D',
        width: '90%', maxWidth: 860,
        margin: '3rem auto 4rem',
        borderRadius: 16,
        padding: '2rem 2.5rem 3rem',
        position: 'relative',
      }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.1)', border: 'none', color: 'white', width: 38, height: 38, borderRadius: '50%', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.16em', color: project.col, marginBottom: '.5rem' }}>{o.role} · {o.duration}</p>
        <h2 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-.03em', color: 'white', lineHeight: 0.9, marginBottom: '.4rem' }}>{project.title}</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: '2rem' }}>{project.sub}</p>
        {o.video && (
          <video controls style={{ width: '100%', borderRadius: 10, marginBottom: '1.5rem', background: '#000', display: 'block' }}>
            <source src={o.video} type="video/mp4" />
          </video>
        )}
        {o.images && o.images.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '2rem' }}>
            {o.images.map((src, i) => (
              <img key={i} src={src} alt={project.title + ' ' + (i + 4)} style={{ width: '100%', borderRadius: 8, objectFit: 'cover', aspectRatio: '16/9', display: 'block' }} />
            ))}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', color: project.col, marginBottom: '.75rem' }}>ABOUT</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>{o.fullDesc}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.14em', color: project.col, marginBottom: '.75rem' }}>HIGHLIGHTS</p>
            {o.highlights.map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: '.6rem', fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: '.5rem', lineHeight: 1.5 }}>
                <span style={{ color: project.col, flexShrink: 0 }}>→</span>{h}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              {project.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 2, background: project.col + '22', color: project.col, fontWeight: 500 }}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}

function FloatShape({ type, col, size, top, left, anim, delay = 0, vis }) {
  const base = { position: 'absolute', top, left, pointerEvents: 'none', zIndex: 2, opacity: vis ? 1 : 0, '--tx': type === 'asterisk' ? '-20px' : '20px', '--ty': '-20px', animation: vis ? `shapeReveal .7s cubic-bezier(.16,1,.3,1) ${delay}s both, ${anim} ${3.5 + delay * 0.3}s ease-in-out ${delay + 0.7}s infinite` : 'none' };
  if (type === 'asterisk') return (<div style={base}><svg width={size} height={size} viewBox="0 0 40 40"><line x1="20" y1="2" x2="20" y2="38" stroke={col} strokeWidth="5" strokeLinecap="round" /><line x1="2" y1="20" x2="38" y2="20" stroke={col} strokeWidth="5" strokeLinecap="round" /><line x1="7" y1="7" x2="33" y2="33" stroke={col} strokeWidth="5" strokeLinecap="round" /><line x1="33" y1="7" x2="7" y2="33" stroke={col} strokeWidth="5" strokeLinecap="round" /></svg></div>);
  if (type === 'hex') return (<div style={base}><svg width={size} height={size} viewBox="0 0 60 60"><polygon points="30,3 55,17 55,43 30,57 5,43 5,17" fill="none" stroke={col} strokeWidth="4" /><polygon points="30,12 46,21 46,39 30,48 14,39 14,21" fill={col + '33'} stroke={col} strokeWidth="2" /></svg></div>);
  if (type === 'blob') return <div style={{ ...base, width: size, height: size, borderRadius: '60% 40% 50% 60%/50% 60% 40% 50%', background: `radial-gradient(circle at 35% 35%,${col}cc,${col}55)`, border: `2px solid ${col}88` }} />;
  if (type === 'ring') return <div style={{ ...base, width: size, height: size, borderRadius: '50%', border: `4px solid ${col}`, background: `radial-gradient(circle,${col}22,transparent)` }} />;
  return null;
}

function Avatar() {
  return (
    <div style={{ position: 'relative', width: 180, height: 220, animation: 'pendulum 3.8s ease-in-out infinite', transformOrigin: 'top center', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: -12, left: -12, right: -12, bottom: -12, borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,111,247,.18) 0%,transparent 70%)' }} />
      <div style={{ position: 'absolute', left: 28, top: 22, width: 128, height: 148, background: 'linear-gradient(160deg,#f5c5a0,#e8a070)', borderRadius: '50% 50% 45% 45%' }}>
        <div style={{ position: 'absolute', top: 48, left: 26, width: 24, height: 28, background: '#1a0a00', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 48, right: 26, width: 24, height: 28, background: '#1a0a00', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 52, left: 31, width: 6, height: 6, background: 'white', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 52, right: 31, width: 6, height: 6, background: 'white', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 96, left: '50%', transform: 'translateX(-50%)', width: 30, height: 14, borderBottom: '3px solid #c0603a', borderRadius: '0 0 50% 50%' }} />
      </div>
      <div style={{ position: 'absolute', left: 20, top: 2, width: 146, height: 76, background: '#180a00', borderRadius: '50% 50% 20% 20%' }} />
      <div style={{ position: 'absolute', left: 16, top: 34, width: 20, height: 52, background: '#180a00', borderRadius: '50% 0 0 50%' }} />
      <div style={{ position: 'absolute', right: 16, top: 34, width: 20, height: 52, background: '#180a00', borderRadius: '0 50% 50% 0' }} />
      <div style={{ position: 'absolute', left: 78, top: 162, width: 30, height: 32, background: '#e8a070' }} />
      <div style={{ position: 'absolute', left: 6, top: 188, width: 172, height: 40, background: PU, borderRadius: '50% 50% 0 0' }} />
    </div>
  );
}

export default function App() {
  const [navBg, setNavBg] = useState(false);
  const [activeProj, setActiveProj] = useState(0);
  const [typeText, setTypeText] = useState('');
  const [aboutRef, aboutVis] = useScrollReveal();
  const [openProject, setOpenProject] = useState(null);

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
            <button onClick={() => setOpenProject(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.1)', border: 'none', color: 'white', width: 38, height: 38, borderRadius: '50%', fontSize: 16, cursor: 'pointer' }}>x</button>
            <p style={{ fontSize: 11, fontWeight: 600, color: openProject.col, marginBottom: '.5rem' }}>{openProject.overlay.role} - {openProject.overlay.duration}</p>
            <h2 style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', color: 'white', lineHeight: 0.9, marginBottom: '.4rem' }}>{openProject.title}</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: '2rem' }}>{openProject.sub}</p>
            {openProject.overlay.video && <video controls style={{ width: '100%', borderRadius: 10, marginBottom: '1.5rem', display: 'block' }}><source src={openProject.overlay.video} type={"video/mp4"} /></video>}
            {openProject.overlay.images && openProject.overlay.images.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '2rem' }}>
                {openProject.overlay.images.map((src, i) => <img key={i} src={src} alt={openProject.title} style={{ width: '100%', borderRadius: 8, objectFit: 'cover', display: 'block' }} />)}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: openProject.col, marginBottom: '.75rem' }}>ABOUT</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>{openProject.overlay.fullDesc}</p>
              </div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: openProject.col, marginBottom: '.75rem' }}>HIGHLIGHTS</p>
                {openProject.overlay.highlights.map((h, i) => <div key={i} style={{ display: 'flex', gap: '.6rem', fontSize: 13, color: 'rgba(255,255,255,.45)', marginBottom: '.5rem' }}><span style={{ color: openProject.col }}>-</span>{h}</div>)}
                <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                  {openProject.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '3px 10px', borderRadius: 2, background: openProject.col + '22', color: openProject.col, fontWeight: 500 }}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 56, padding: '0 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: navBg ? 'rgba(10,10,10,0.95)' : 'transparent', backdropFilter: navBg ? 'blur(20px)' : 'none', borderBottom: navBg ? '1px solid rgba(255,255,255,0.06)' : 'none', transition: 'all .3s' }}>
        {['Home','About','Projects','Work','Contact'].map(s => (
          <span key={s} className="nlink" style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', fontWeight: 500, letterSpacing: '.04em' }} onClick={() => go(s.toLowerCase())}>{s}</span>
        ))}
      </nav>

      <section id="home" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 56 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.011) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.011) 1px,transparent 1px)', backgroundSize: '55px 55px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse,rgba(124,111,247,.06) 0%,transparent 68%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2rem' }}>
          <div style={{ width: '100%', padding: '0 5rem', textAlign: 'center', zIndex: 1, animation: 'fadeIn .9s ease .2s both', marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: 'var(--b)', fontWeight: 800, fontSize: 'clamp(2rem,7.5vw,5.2rem)', letterSpacing: '-.02em', lineHeight: 0.9, color: 'rgba(255,255,255,.93)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>HI I'M KHUSHI</div>
          </div>
          <div style={{ position: 'relative', zIndex: 2, animation: 'fadeIn .9s ease .5s both', marginTop: '-1.2rem' }}><Avatar /></div>
          <p style={{ fontSize: 'clamp(.8rem,1.6vw,.9rem)', color: 'rgba(255,255,255,.38)', margin: '.6rem 0 1.4rem', fontWeight: 300, letterSpacing: '.01em', animation: 'fadeIn 1s ease .9s both', zIndex: 3, textAlign: 'center' }}>
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
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,.45)', fontWeight: 300, marginBottom: '2.5rem' }}>MSc candidate in Media Design (Technology & AI) at MediaDesign Hochschule Berlin. I research adaptive AI guidance in wearable AR and build the systems I study — from concept through rigorous user evaluation. My work sits at the intersection of spatial computing, generative AI, and human-computer interaction.</p>
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
              <button className="btn-p" onClick={() => setOpenProject(p)} style={{ width: 44, height: 44, borderRadius: '50%', background: p.col, border: 'none', color: 'white', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>↗</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '.75rem', padding: '0 1.5rem 1.25rem' }}>
              {p.cardImgs.map((img, j) => (
                <div key={j} className="img-slot" style={{ height: 130, borderRadius: 8, overflow: 'hidden', ...(img.startsWith('linear') ? { background: img } : {}) }}>
                  {!img.startsWith('linear') && <img src={img} alt={p.title + ' ' + (j+1)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
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
          <a href="https://github.com/Khushi-099" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: 'rgba(0,0,0,.38)', textDecoration: 'none', marginBottom: '1.5rem' }}>GitHub ↗</a>
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