import React, { useEffect, useState } from 'react';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMoon, FiSun } from 'react-icons/fi';

import photo from './assets/mypic.jpeg';
import { education, experience, profile, projects, skills, stats } from './data.js';
import Contact from './Contact.jsx';

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// Highlight the nav entry for the section currently on screen.
function useActiveSection() {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* storage unavailable: the theme still applies for this visit */
    }
  };
  return (
    <button className="theme" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}

function Sidebar() {
  const active = useActiveSection();
  return (
    <header className="side">
      <div className="side__top">
        <img className="side__photo" src={photo} alt="Portrait of Alok Awasthi" width="406" height="406" />
        <h1 className="side__name">Alok Awasthi</h1>
        <p className="side__role">
          {profile.role} at <span className="nowrap">{profile.company}</span>
        </p>
        <p className="side__pitch">
          I build backend, data and <em>GenAI</em> systems that hold up in production.
        </p>

        <nav className="side__nav" aria-label="Sections">
          <ol>
            {SECTIONS.map(({ id, label }, i) => (
              <li key={id}>
                <a href={`#${id}`} className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
                  <span className="side__nav-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="side__nav-line" aria-hidden="true" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="side__bottom">
        <a className="side__resume" href={profile.resume} download>
          Download résumé <FiArrowUpRight aria-hidden="true" />
        </a>
        <div className="side__row">
          <ul className="side__social" aria-label="Profiles">
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="sec" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="sec__title">
        {title}
      </h2>
      {children}
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About">
      <div className="prose">
        {profile.about.map((p, i) => (
          <p key={p.slice(0, 24)} className={i === 0 ? 'lede' : ''}>
            {p}
          </p>
        ))}
      </div>

      <dl className="impact">
        {stats.map((s) => (
          <div key={s.label}>
            <dt>{s.value}</dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="rows">
        {experience.map((job) => (
          <li className="row" key={job.company}>
            <p className="row__date">{job.period}</p>
            <div className="row__body">
              <h3 className="row__title">
                {job.company}
                <span className="row__sub">{job.role}</span>
              </h3>
              <ul className="row__points">
                {job.points.map((pt) => (
                  <li key={pt.slice(0, 32)}>{pt}</li>
                ))}
              </ul>
              <p className="row__stack">{job.tags.join(' · ')}</p>
            </div>
          </li>
        ))}
        <li className="row">
          <p className="row__date">{education.period}</p>
          <div className="row__body">
            <h3 className="row__title">
              {education.school}
              <span className="row__sub">{education.degree}</span>
            </h3>
            <p className="row__stack">{education.grade}</p>
          </div>
        </li>
      </ol>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Selected projects">
      <ol className="work">
        {projects.map((p, i) => (
          <li key={p.name} className="work__item">
            <a className="work__link" href={p.links[0].href} target="_blank" rel="noreferrer noopener">
              <span className="work__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="work__name">{p.name}</span>
              <FiArrowUpRight className="work__arrow" aria-hidden="true" />
            </a>
            <p className="work__desc">{p.description}</p>
            <p className="work__meta">
              <span>{p.tags.join(' · ')}</span>
              {p.links.length > 1 && (
                <span className="work__extra">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                      {l.label}
                    </a>
                  ))}
                </span>
              )}
            </p>
          </li>
        ))}
      </ol>
      <a className="more" href={profile.github} target="_blank" rel="noreferrer noopener">
        Everything else is on GitHub <FiArrowUpRight aria-hidden="true" />
      </a>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Toolkit">
      <dl className="kit">
        {skills.map((g) => (
          <div key={g.group}>
            <dt>{g.group}</dt>
            <dd>{g.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export default function App() {
  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Sidebar />
      <main id="main" className="main">
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
        <footer className="foot">
          <p>
            Designed and built by Alok Awasthi in Bangalore. Set in Instrument Serif and Geist.
          </p>
          <p>© {new Date().getFullYear()}</p>
        </footer>
      </main>
    </div>
  );
}
