import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { PageFlip } from 'page-flip';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import photo from './assets/mypic.jpeg';
import { education, experience, profile, projects, skills, stats } from './data.js';
import './book.css';

// A hardbound book. Page 0 is the front cover; after that pages pair up into
// spreads [1,2], [3,4], ... and the last page is the back cover.
const CHAPTERS = [
  { label: 'Contents', page: 3 },
  { label: 'About', page: 4 },
  { label: 'Experience', page: 6 },
  { label: 'Projects', page: 9 },
  { label: 'Toolkit', page: 11 },
  { label: 'Contact', page: 12 },
];

const roman = ['I', 'II', 'III', 'IV', 'V'];

function Paper({ index, head, children, className = '' }) {
  const side = index % 2 === 1 ? 'left' : 'right';
  return (
    <div className={`page paper paper--${side} ${className}`} data-density="soft">
      <div className="paper__inner">
        {head && <p className="paper__head">{head}</p>}
        <div className="paper__body">{children}</div>
        <p className="paper__folio">{index}</p>
      </div>
    </div>
  );
}

function ChapterOpen({ num, title }) {
  return (
    <header className="chapter">
      <p className="chapter__num">Chapter {num}</p>
      <h2 className="chapter__title">{title}</h2>
      <p className="chapter__orn" aria-hidden="true">
        ❦
      </p>
    </header>
  );
}

function Job({ job, opener }) {
  return (
    <article className="job">
      {opener}
      <h3 className="job__company">{job.company}</h3>
      <p className="job__role">
        {job.role} <span>· {job.period}</span>
      </p>
      <ul className="job__points">
        {job.points.map((p) => (
          <li key={p.slice(0, 30)}>{p}</li>
        ))}
      </ul>
      <p className="job__tags">{job.tags.join(' · ')}</p>
    </article>
  );
}

function Project({ p, n }) {
  return (
    <article className="proj">
      <h3 className="proj__name">
        <span className="proj__n">{n}.</span> {p.name}
      </h3>
      <p className="proj__desc">{p.description}</p>
      <p className="proj__meta">
        <span>{p.tags.join(' · ')}</span>
        {p.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
            {l.label === 'GitHub' ? 'Source' : l.label} ↗
          </a>
        ))}
      </p>
    </article>
  );
}

// Static page markup. Memoised so React never re-renders it once the
// page-flip library has taken over these DOM nodes.
const Pages = memo(function Pages() {
  const [oracle, morgan, oyo] = experience;
  return (
    <>
      {/* 0 · Front cover */}
      <div className="page cover cover--front" data-density="hard">
        <div className="cover__frame">
          <p className="cover__eyebrow">Portfolio · Volume V</p>
          <div className="cover__rule" />
          <h1 className="cover__title">Alok Awasthi</h1>
          <p className="cover__sub">Backend, Data &amp; GenAI Systems</p>
          <div className="cover__rule" />
          <p className="cover__orn" aria-hidden="true">
            ✦
          </p>
          <p className="cover__foot">Senior Software Engineer · Oracle Health</p>
          <p className="cover__hint">Scroll or drag the corner to open</p>
        </div>
      </div>

      {/* 1 · Front endpaper */}
      <div className="page endpaper paper--left" data-density="soft">
        <div className="endpaper__plate">
          <p className="endpaper__ex">Ex Libris</p>
          <p className="endpaper__name">Alok Awasthi</p>
          <p className="endpaper__small">Bangalore, India</p>
        </div>
      </div>

      {/* 2 · Title page */}
      <Paper index={2}>
        <div className="title">
          <div className="title__plate">
            <img src={photo} alt="Portrait of Alok Awasthi" />
          </div>
          <h2 className="title__name">Alok Awasthi</h2>
          <p className="title__role">{profile.role}</p>
          <p className="title__co">{profile.company}</p>
          <p className="title__orn" aria-hidden="true">
            ❧
          </p>
          <p className="title__pitch">{profile.tagline}</p>
          <p className="title__place">Bangalore · MMXXVI</p>
        </div>
      </Paper>

      {/* 3 · Contents */}
      <Paper index={3} head="Alok Awasthi">
        <h2 className="toc__title">Contents</h2>
        <ol className="toc">
          {CHAPTERS.slice(1).map((c, i) => (
            <li key={c.label}>
              <button type="button" data-goto={c.page}>
                <span className="toc__num">{roman[i]}</span>
                <span className="toc__label">{c.label}</span>
                <span className="toc__dots" aria-hidden="true" />
                <span className="toc__page">{c.page}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="toc__note">Turn the pages by scrolling, using the arrow keys, or dragging a corner.</p>
      </Paper>

      {/* 4 · Chapter I: About */}
      <Paper index={4} head="About">
        <ChapterOpen num="I" title="About" />
        <p className="dropcap">{profile.about[0]}</p>
        <p>{profile.about[1]}</p>
      </Paper>

      {/* 5 · About, continued */}
      <Paper index={5} head="Alok Awasthi">
        <p>{profile.about[2]}</p>
        <h3 className="small-head">By the numbers</h3>
        <dl className="numbers">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
        <h3 className="small-head">Education</h3>
        <p className="edu">
          <strong>{education.school}</strong>
          <br />
          {education.degree}
          <br />
          <em>
            {education.period} · {education.grade}
          </em>
        </p>
      </Paper>

      {/* 6 · Chapter II: Experience — Oracle */}
      <Paper index={6} head="Experience">
        <Job job={oracle} opener={<ChapterOpen num="II" title="Experience" />} />
      </Paper>

      {/* 7 · Morgan Stanley */}
      <Paper index={7} head="Alok Awasthi">
        <Job job={morgan} />
      </Paper>

      {/* 8 · OYO */}
      <Paper index={8} head="Experience">
        <Job job={oyo} />
        <p className="aside">
          Earlier: B.Tech in Electronics &amp; Communication at VIT, where I built a face-recognition attendance
          system, a variable traffic-light controller and an NLTK chatbot.
        </p>
      </Paper>

      {/* 9 · Chapter III: Projects */}
      <Paper index={9} head="Alok Awasthi">
        <ChapterOpen num="III" title="Projects" />
        <Project p={projects[0]} n={1} />
      </Paper>

      {/* 10 · Projects, continued */}
      <Paper index={10} head="Projects">
        {projects.slice(1).map((p, i) => (
          <Project key={p.name} p={p} n={i + 2} />
        ))}
        <p className="aside">
          More on{' '}
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub ↗
          </a>
        </p>
      </Paper>

      {/* 11 · Chapter IV: Toolkit */}
      <Paper index={11} head="Alok Awasthi">
        <ChapterOpen num="IV" title="Toolkit" />
        <dl className="kit">
          {skills.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Paper>

      {/* 12 · Chapter V: Contact */}
      <Paper index={12} head="Contact">
        <ChapterOpen num="V" title="Correspondence" />
        <p>Have a role or a problem in mind? I'd be glad to hear from you.</p>
        <ul className="letters">
          <li>
            <span>Post</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          <li>
            <span>LinkedIn</span>
            <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              alok-awasthi ↗
            </a>
          </li>
          <li>
            <span>GitHub</span>
            <a href={profile.github} target="_blank" rel="noreferrer noopener">
              alok29awasthi ↗
            </a>
          </li>
        </ul>
        <a className="seal" href={profile.resume} download>
          Download the résumé
        </a>
      </Paper>

      {/* 13 · Colophon */}
      <Paper index={13} head="Alok Awasthi">
        <div className="colophon">
          <p className="colophon__orn" aria-hidden="true">
            ❦
          </p>
          <p>
            <em>Colophon.</em> Set in EB Garamond and Cormorant Garamond. Designed and built by the author with React
            and Vite, and bound on Netlify.
          </p>
          <p className="colophon__fin">Finis</p>
        </div>
      </Paper>

      {/* 14 · Back endpaper */}
      <div className="page endpaper paper--right" data-density="soft" />

      {/* 15 · Back cover */}
      <div className="page cover cover--back" data-density="hard">
        <div className="cover__frame cover__frame--back">
          <p className="cover__blurb">
            “Systems that are measurable and boring to operate: clear data models, automated validation, solid test
            suites and deployments you can roll back.”
          </p>
          <div className="cover__rule" />
          <p className="cover__foot">portfolio-awasthi.netlify.app</p>
        </div>
      </div>
    </>
  );
});

// In a two-page spread the cover and back cover sit alone; the rest pair up.
const spreadOf = (page, last) => (page === 0 ? 0 : page === last ? Math.ceil(last / 2) : Math.ceil(page / 2));

export default function Book() {
  const bookRef = useRef(null);
  const flipRef = useRef(null);
  const busyRef = useRef(false);
  const waiterRef = useRef(null);
  const [page, setPage] = useState(0);
  const [portrait, setPortrait] = useState(false);
  const [count, setCount] = useState(16);

  useEffect(() => {
    document.documentElement.classList.add('book-mode');
    const el = bookRef.current;
    const pf = new PageFlip(el, {
      width: 480,
      height: 680,
      size: 'stretch',
      minWidth: 260,
      maxWidth: 620,
      minHeight: 368,
      maxHeight: 878,
      showCover: true,
      usePortrait: true,
      maxShadowOpacity: 0.55,
      flippingTime: 950,
      mobileScrollSupport: false,
      clickEventForward: true,
      disableFlipByClick: true,
      showPageCorners: true,
      startZIndex: 1,
    });
    pf.loadFromHTML(el.querySelectorAll('.page'));
    flipRef.current = pf;
    setCount(pf.getPageCount());
    setPortrait(pf.getOrientation() === 'portrait');
    pf.on('flip', (e) => setPage(e.data));
    pf.on('changeOrientation', (e) => setPortrait(e.data === 'portrait'));
    pf.on('changeState', (e) => {
      if (e.data !== 'read') {
        busyRef.current = true;
        return;
      }
      const waiter = waiterRef.current;
      waiterRef.current = null;
      if (waiter) waiter();
      else setTimeout(() => (busyRef.current = false), 120);
    });
    return () => {
      document.documentElement.classList.remove('book-mode');
    };
  }, []);

  // Turn page by page at speed until the target page is open.
  const goTo = useCallback((target) => {
    const pf = flipRef.current;
    if (!pf) return;
    const settings = pf.getSettings();
    const normal = 950;
    const last = pf.getPageCount() - 1;
    const isOpen = () => {
      const cur = pf.getCurrentPageIndex();
      return pf.getOrientation() === 'portrait' ? cur === target : spreadOf(cur, last) === spreadOf(target, last);
    };
    if (isOpen()) return;
    settings.flippingTime = 230;
    busyRef.current = true;
    let guard = 0;
    const finish = () => {
      settings.flippingTime = normal;
      waiterRef.current = null;
      setTimeout(() => (busyRef.current = false), 120);
    };
    const step = () => {
      if (isOpen() || guard++ > 20) return finish();
      waiterRef.current = () => setTimeout(step, 30);
      if (target > pf.getCurrentPageIndex()) pf.flipNext();
      else pf.flipPrev();
      // If the flip could not start (already at an end), stop.
      setTimeout(() => {
        if (waiterRef.current && pf.getState() === 'read') finish();
      }, 120);
    };
    step();
  }, []);

  // Scrolling (wheel / trackpad) turns one page at a time.
  useEffect(() => {
    let acc = 0;
    let quietTimer = 0;
    const onWheel = (e) => {
      if (e.ctrlKey) return; // pinch-zoom
      e.preventDefault();
      clearTimeout(quietTimer);
      quietTimer = setTimeout(() => (acc = 0), 180);
      if (busyRef.current) return;
      acc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(acc) < 50) return;
      const pf = flipRef.current;
      busyRef.current = true;
      if (acc > 0) pf.flipNext();
      else pf.flipPrev();
      acc = 0;
      // If nothing turned (first/last page), release the lock.
      setTimeout(() => {
        if (pf.getState() === 'read') busyRef.current = false;
      }, 80);
    };
    const onKey = (e) => {
      const pf = flipRef.current;
      if (!pf || busyRef.current) return;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        pf.flipNext();
      } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        pf.flipPrev();
      } else if (e.key === 'Home') goTo(0);
      else if (e.key === 'End') goTo(pf.getPageCount() - 1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [goTo]);

  // Contents entries inside the book.
  useEffect(() => {
    const onClick = (e) => {
      const b = e.target.closest('[data-goto]');
      if (!b) return;
      e.preventDefault();
      goTo(Number(b.dataset.goto));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [goTo]);

  const last = count - 1;
  const label = (() => {
    if (page === 0) return 'Front cover';
    if (page === last) return 'Back cover';
    if (portrait) return `Page ${page} of ${last - 1}`;
    const s = spreadOf(page, last);
    return `Pages ${2 * s - 1}–${2 * s} of ${last - 1}`;
  })();
  const activeChapter = [...CHAPTERS].reverse().find((c) => page >= c.page - (portrait ? 0 : 1))?.label;

  const simpleView = () => {
    try {
      sessionStorage.setItem('view', 'simple');
    } catch (e) {
      /* ignore */
    }
    window.location.reload();
  };

  return (
    <div className="desk">
      <header className="desk__bar">
        <button className="desk__brand" onClick={() => goTo(0)}>
          Alok Awasthi
        </button>
        <nav className="desk__nav" aria-label="Chapters">
          {CHAPTERS.map((c) => (
            <button key={c.label} onClick={() => goTo(c.page)} className={activeChapter === c.label ? 'is-active' : ''}>
              {c.label}
            </button>
          ))}
        </nav>
        <a className="desk__resume" href={profile.resume} download>
          Résumé
        </a>
      </header>

      <main className="desk__stage">
        <div className="book-frame">
          <div className="book" ref={bookRef}>
            <Pages />
          </div>
        </div>
      </main>

      <footer className="desk__foot">
        <button className="desk__arrow" onClick={() => flipRef.current?.flipPrev()} disabled={page === 0} aria-label="Previous page">
          <FiChevronLeft />
        </button>
        <p className="desk__count" aria-live="polite">
          {label}
        </p>
        <button className="desk__arrow" onClick={() => flipRef.current?.flipNext()} disabled={page >= last} aria-label="Next page">
          <FiChevronRight />
        </button>
        <button className="desk__simple" onClick={simpleView}>
          Simple view
        </button>
      </footer>
    </div>
  );
}
