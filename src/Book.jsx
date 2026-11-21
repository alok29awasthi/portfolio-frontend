import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { About, Experience, Hero, Nav, Projects, Skills } from './App.jsx';
import Contact from './Contact.jsx';
import { experience } from './data.js';

// Each page fills the screen. Scrolling down turns the current page to the left
// like a book; scrolling up turns it back. One screen-height of scroll = one page.
function usePages() {
  return [
    { key: 'cover', label: 'Cover', anchors: ['top'], render: () => <Hero /> },
    { key: 'about', label: 'About', anchors: ['about'], render: () => <About /> },
    {
      key: 'oracle',
      label: 'Experience',
      anchors: ['experience'],
      render: () => <Experience jobs={experience.slice(0, 1)} />,
    },
    {
      key: 'earlier',
      label: 'Experience',
      anchors: ['experience-earlier'],
      render: () => (
        <Experience
          id="experience-earlier"
          title="Before Oracle"
          kicker="Financial services and travel."
          jobs={experience.slice(1)}
          className="timeline--split"
        />
      ),
    },
    { key: 'projects', label: 'Projects', anchors: ['projects'], render: () => <Projects /> },
    { key: 'skills', label: 'Skills', anchors: ['skills'], render: () => <Skills /> },
    { key: 'contact', label: 'Contact', anchors: ['contact'], render: () => <Contact /> },
  ];
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Book() {
  const pages = usePages();
  const n = pages.length;
  const leafRefs = useRef([]);
  const shadeRefs = useRef([]);
  const animRef = useRef(0);
  const [current, setCurrent] = useState(0);

  // Snap scrolling to whole pages while the book is on screen.
  useLayoutEffect(() => {
    document.documentElement.classList.add('book-mode');
    return () => document.documentElement.classList.remove('book-mode');
  }, []);

  // Shrink a page's content slightly if it would not fit the page height.
  useLayoutEffect(() => {
    const fit = () => {
      document.querySelectorAll('.leaf__content').forEach((box) => {
        const inner = box.firstElementChild;
        inner.style.zoom = 1;
        const cs = getComputedStyle(box);
        const avail = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const need = inner.scrollHeight;
        inner.style.zoom = need > avail ? Math.max(0.68, avail / need).toFixed(3) : 1;
      });
    };
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Drive every leaf's rotation from the scroll position.
  const paint = useCallback(() => {
    const p = window.scrollY / window.innerHeight;
    for (let i = 0; i < n; i += 1) {
      const leaf = leafRefs.current[i];
      if (!leaf) continue;
      const t = i === n - 1 ? 0 : clamp(p - i, 0, 1);
      leaf.style.transform = `rotateY(${-180 * t}deg)`;
      leaf.style.visibility = t >= 0.999 ? 'hidden' : 'visible';
      leaf.style.setProperty('--lift', Math.sin(Math.PI * t).toFixed(3));
      leaf.setAttribute('aria-hidden', Math.round(p) === i ? 'false' : 'true');
      leaf.inert = Math.round(p) !== i;
      // Darken the page underneath while the one above is still mostly covering it.
      const shade = shadeRefs.current[i + 1];
      if (shade) shade.style.opacity = (0.45 * (1 - t) * (t > 0 ? 1 : 0)).toFixed(3);
    }
    setCurrent(clamp(Math.round(p), 0, n - 1));
  }, [n]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [paint]);

  // Flip quickly through the pages in between to land on the target page.
  const goTo = useCallback(
    (index) => {
      const target = clamp(index, 0, n - 1) * window.innerHeight;
      const start = window.scrollY;
      const distance = target - start;
      if (Math.abs(distance) < 2) return;
      const pagesToTurn = Math.abs(distance) / window.innerHeight;
      const duration = clamp(260 * pagesToTurn, 420, 1500);
      const root = document.documentElement;
      root.classList.add('book-flipping');
      cancelAnimationFrame(animRef.current);
      const t0 = performance.now();
      const step = (now) => {
        const k = clamp((now - t0) / duration, 0, 1);
        window.scrollTo(0, start + distance * easeInOut(k));
        if (k < 1) animRef.current = requestAnimationFrame(step);
        else root.classList.remove('book-flipping');
      };
      animRef.current = requestAnimationFrame(step);
    },
    [n]
  );

  // Any in-page link (#about, #contact, ...) flips to the page that holds it.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const index = pages.findIndex((pg) => pg.anchors.includes(id));
      if (index === -1) return;
      e.preventDefault();
      goTo(index);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [goTo, pages]);

  // Left/right arrow keys turn one page (up/down/space already scroll and snap).
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  const activeSection = pages[current].anchors[0] === 'top' ? '' : pages[current].label.toLowerCase();

  return (
    <div className="book">
      <Nav activeOverride={activeSection} />

      <div className="book__scroll" style={{ height: `${n * 100}vh` }}>
        {pages.map((pg, i) => (
          <div key={pg.key} className="book__snap" style={{ top: `${i * 100}vh` }} aria-hidden="true" />
        ))}

        <div className="book__stage">
          <div className="book__desk">
            {pages.map((pg, i) => (
              <article
                key={pg.key}
                className="leaf"
                style={{ zIndex: n - i }}
                ref={(el) => {
                  leafRefs.current[i] = el;
                }}
                aria-label={`Page ${i + 1} of ${n}: ${pg.label}`}
              >
                <div className="leaf__front">
                  <div className="leaf__content">
                    <div className="leaf__fit">{pg.render()}</div>
                  </div>
                  <span className="leaf__folio">{String(i + 1).padStart(2, '0')}</span>
                  <div
                    className="leaf__shade"
                    ref={(el) => {
                      shadeRefs.current[i] = el;
                    }}
                  />
                </div>
                <div className="leaf__back" />
              </article>
            ))}
          </div>

          <div className="book__pager">
            <button className="icon-btn" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label="Previous page">
              <FiChevronLeft />
            </button>
            <ol className="book__dots">
              {pages.map((pg, i) => (
                <li key={pg.key}>
                  <button
                    className={i === current ? 'is-active' : ''}
                    onClick={() => goTo(i)}
                    aria-label={`Go to page ${i + 1}: ${pg.label}`}
                    aria-current={i === current ? 'page' : undefined}
                  />
                </li>
              ))}
            </ol>
            <span className="book__count">
              {String(current + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </span>
            <button className="icon-btn" onClick={() => goTo(current + 1)} disabled={current === n - 1} aria-label="Next page">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
