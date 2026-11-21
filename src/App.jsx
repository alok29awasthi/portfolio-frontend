import React, { useEffect, useState } from 'react';
import {
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiX,
} from 'react-icons/fi';

import photo from './assets/mypic.jpeg';
import { education, experience, profile, projects, skills, stats } from './data.js';
import Contact from './Contact.jsx';
import ScrollLine from './ScrollLine.jsx';

export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// Fade sections in as they scroll into view.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Highlight the nav link for the section currently on screen.
function useActiveSection() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

const THEMES = [
  { id: 'ember', label: 'Ember', bg: '#13100e', a: '#ff7a45', b: '#ffc94a' },
  { id: 'forest', label: 'Forest', bg: '#0c1310', a: '#34d399', b: '#d4f45c' },
  { id: 'rose', label: 'Rose', bg: '#150e13', a: '#ff5c9a', b: '#ffb38a' },
  { id: 'paper', label: 'Paper', bg: '#f6f1e8', a: '#c2410c', b: '#b7791f' },
  { id: 'mono', label: 'Mono', bg: '#f5f5f4', a: '#111111', b: '#e11d48' },
];

function ThemePicker() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'ember');
  const choose = (id) => {
    setTheme(id);
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem('theme', id);
    } catch (e) {
      /* storage unavailable: theme still applies for this visit */
    }
  };
  return (
    <div className="themes" role="group" aria-label="Colour theme">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          data-label={t.label}
          aria-label={`${t.label} theme`}
          aria-pressed={theme === t.id}
          onClick={() => choose(t.id)}
          style={{ '--sw-a': t.a, '--sw-b': t.b, '--sw-bg': t.bg }}
        />
      ))}
    </div>
  );
}

export function Nav({ activeOverride }) {
  const observed = useActiveSection();
  const active = activeOverride ?? observed;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark">AA</span>
          <span className="nav__name">Alok Awasthi</span>
        </a>
        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a className="btn btn--primary btn--sm nav__cta" href={profile.resume} download>
            Resume <FiDownload aria-hidden="true" />
          </a>
        </nav>
        <div className="nav__actions">
          <ThemePicker />
          <button
            className="icon-btn nav__menu"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" /> {profile.role} · {profile.company}
          </p>
          <h1>
            Hi, I'm Alok.
            <span className="gradient-text hero__tagline">{profile.tagline}</span>
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#contact">
              Get in touch
            </a>
            <a className="btn btn--ghost" href={profile.resume} download>
              <FiDownload aria-hidden="true" /> Download resume
            </a>
          </div>
          <ul className="socials" aria-label="Profiles">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
                <FiGithub />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <FiMail />
              </a>
            </li>
            <li className="socials__loc">
              <FiMapPin aria-hidden="true" /> {profile.location}
            </li>
          </ul>
        </div>
        <div className="hero__photo">
          <div className="hero__photo-ring">
            <img src={photo} alt="Portrait of Alok Awasthi" width="406" height="406" />
          </div>
        </div>
      </div>

      <div className="container">
        <dl className="stats reveal">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function SectionHeading({ index, title, kicker }) {
  return (
    <div className="section__head">
      <span className="section__index">{index}</span>
      <h2>{title}</h2>
      {kicker && <p className="section__kicker">{kicker}</p>}
    </div>
  );
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="container reveal">
        <SectionHeading index="01" title="About" />
        <div className="about">
          <div className="about__text">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <aside className="card about__edu">
            <p className="label">Education</p>
            <h3>{education.school}</h3>
            <p>{education.degree}</p>
            <p className="muted">
              {education.period} · {education.grade}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Experience({
  jobs = experience,
  id = 'experience',
  title = 'Experience',
  kicker = "Where I've worked and what I shipped.",
  className = '',
}) {
  return (
    <section className="section" id={id}>
      <div className="container reveal">
        <SectionHeading index="02" title={title} kicker={kicker} />
        <ol className={`timeline ${className}`}>
          {jobs.map((job) => (
            <li className="timeline__item" key={job.company}>
              <div className="timeline__meta">
                <p className="timeline__period">{job.period}</p>
                <p className="muted">{job.location}</p>
              </div>
              <article className="card timeline__card">
                <header>
                  <h3>{job.company}</h3>
                  <p className="timeline__role">{job.role}</p>
                </header>
                <ul className="bullets">
                  {job.points.map((pt) => (
                    <li key={pt.slice(0, 32)}>{pt}</li>
                  ))}
                </ul>
                <ul className="tags" aria-label="Technologies">
                  {job.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container reveal">
        <SectionHeading index="03" title="Projects" kicker="Things I've built outside work." />
        <div className="projects">
          {projects.map((p) => (
            <article className="card project" key={p.name}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <ul className="tags" aria-label="Technologies">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project__links">
                {p.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                    <FiGithub aria-hidden="true" /> {l.label} <FiArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
        <a className="more-link" href={profile.github} target="_blank" rel="noreferrer noopener">
          More on GitHub <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container reveal">
        <SectionHeading index="04" title="Skills" />
        <div className="skills">
          {skills.map((g) => (
            <div className="card skills__group" key={g.group}>
              <p className="label">{g.group}</p>
              <ul className="tags tags--lg">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} Alok Awasthi</p>
        <ul className="socials socials--sm" aria-label="Profiles">
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
              <FiGithub />
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <FiMail />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

function ClassicSite() {
  useReveal();
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Nav />
      <ScrollLine />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default ClassicSite;
