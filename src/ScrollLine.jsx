import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// A single glowing line that draws itself as you scroll. It runs down the left
// gutter, wraps a box around each section as that section comes into view,
// lets the box go as you move on, and carries on to the next section.
// Its position is tied directly to the scroll position: stop scrolling and it stops.

const SECTION_IDS = ['about', 'experience', 'projects', 'skills', 'contact'];
const R = 18; // corner radius

// Distance from the top of the document, ignoring transforms (reveal animation).
function docTop(el) {
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
}
function docLeft(el) {
  let x = 0;
  for (let n = el; n; n = n.offsetParent) x += n.offsetLeft;
  return x;
}

const lerp = (a, b, t) => a + (b - a) * t;

export default function ScrollLine() {
  const pathRef = useRef(null);
  const probeRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const keysRef = useRef([]); // [{ y, head, tail }]
  const totalRef = useRef(0);
  const [geo, setGeo] = useState(null); // { d, w, h, cmds, marks }

  // 1. Measure the sections and build the path.
  const layout = useCallback(() => {
    const boxes = SECTION_IDS.map((id) => {
      const sec = document.getElementById(id);
      const box = sec && sec.querySelector('.container');
      if (!box) return null;
      const left = docLeft(box);
      const narrow = window.innerWidth < 640;
      return {
        x1: left + (narrow ? 4 : 2),
        x2: left + box.offsetWidth - (narrow ? 4 : 2),
        y1: docTop(box) - (narrow ? 22 : 34),
        y2: docTop(box) + box.offsetHeight + (narrow ? 22 : 34),
      };
    }).filter(Boolean);
    if (!boxes.length) return;

    const stats = document.querySelector('.stats');
    const startY = stats ? docTop(stats) + stats.offsetHeight + 36 : boxes[0].y1 - 240;
    const g = boxes[0].x1; // the gutter the line travels down

    // Commands are kept separately so we can measure the length up to any mark.
    const cmds = [`M ${g} ${startY}`];
    const marks = []; // per box: { enter, closed, exit } as command counts
    boxes.forEach((b, i) => {
      const x1 = g;
      const { x2, y1, y2 } = b;
      cmds.push(`L ${x1} ${y1 + R}`); // down the gutter to the box
      const enter = cmds.length;
      cmds.push(`A ${R} ${R} 0 0 1 ${x1 + R} ${y1}`);
      cmds.push(`L ${x2 - R} ${y1}`); // top edge
      cmds.push(`A ${R} ${R} 0 0 1 ${x2} ${y1 + R}`);
      cmds.push(`L ${x2} ${y2 - R}`); // right edge
      cmds.push(`A ${R} ${R} 0 0 1 ${x2 - R} ${y2}`);
      cmds.push(`L ${x1 + R} ${y2}`); // bottom edge
      cmds.push(`A ${R} ${R} 0 0 1 ${x1} ${y2 - R}`);
      cmds.push(`L ${x1} ${y1 + R}`); // left edge, closing the box
      const closed = cmds.length;
      cmds.push(`L ${x1} ${y2 - R}`); // slide back down the left edge
      const exit = cmds.length;
      marks.push({ enter, closed, exit, b, last: i === boxes.length - 1 });
    });

    const h = document.documentElement.scrollHeight;
    setGeo({ d: cmds.join(' '), w: document.documentElement.clientWidth, h, cmds, marks, startY });
  }, []);

  // 2. Once the path is in the DOM, measure lengths and build scroll keyframes.
  useLayoutEffect(() => {
    if (!geo) return;
    const probe = probeRef.current;
    const lenAt = (count) => {
      probe.setAttribute('d', geo.cmds.slice(0, count).join(' '));
      return probe.getTotalLength();
    };
    const total = pathRef.current.getTotalLength();
    totalRef.current = total;
    const vh = window.innerHeight;
    const maxMarker = geo.h - vh + vh * 0.55;

    const keys = [{ y: geo.startY - vh * 0.1, head: 0, tail: 0 }];
    let prevClosed = 0;
    geo.marks.forEach((m) => {
      const enter = lenAt(m.enter);
      const closed = lenAt(m.closed);
      const exit = lenAt(m.exit);
      const height = m.b.y2 - m.b.y1;
      // Arrive at the box: the line has come down the gutter.
      keys.push({ y: m.b.y1 - 60, head: enter, tail: prevClosed });
      // Box drawn all the way round while the section fills the screen.
      const drawnAt = m.b.y1 + Math.min(height * 0.5, vh * 0.45);
      keys.push({ y: drawnAt, head: closed, tail: enter });
      if (!m.last) {
        // Hold the finished box while the section is being read...
        keys.push({ y: Math.max(drawnAt + 1, m.b.y2 - vh * 0.35), head: closed, tail: enter });
        // ...then it unwinds as you leave, and the line carries on down.
        keys.push({ y: m.b.y2 + 80, head: exit, tail: closed });
      }
      prevClosed = closed;
    });
    const last = keys[keys.length - 1];
    keys.push({ y: Math.max(maxMarker, last.y + 1), head: last.head, tail: last.tail });

    // Keyframes must move forward down the page.
    for (let i = 1; i < keys.length; i += 1) if (keys[i].y <= keys[i - 1].y) keys[i].y = keys[i - 1].y + 1;
    keysRef.current = keys;
    paint();
  }, [geo]); // eslint-disable-line react-hooks/exhaustive-deps

  // 3. Every scroll: work out how much of the line to show.
  const paint = useCallback(() => {
    const keys = keysRef.current;
    const path = pathRef.current;
    if (!keys.length || !path) return;
    const marker = window.scrollY + window.innerHeight * 0.55;
    let head = keys[0].head;
    let tail = keys[0].tail;
    if (marker >= keys[keys.length - 1].y) {
      ({ head, tail } = keys[keys.length - 1]);
    } else if (marker > keys[0].y) {
      for (let i = 1; i < keys.length; i += 1) {
        if (marker <= keys[i].y) {
          const a = keys[i - 1];
          const b = keys[i];
          const t = (marker - a.y) / (b.y - a.y);
          head = lerp(a.head, b.head, t);
          tail = lerp(a.tail, b.tail, t);
          break;
        }
      }
    }
    const total = totalRef.current;
    const len = Math.max(0, head - tail);
    for (const el of [path, glowRef.current]) {
      el.style.strokeDasharray = `${len} ${total + 100}`;
      el.style.strokeDashoffset = `${-tail}`;
    }
    const dot = dotRef.current;
    if (len > 0.5) {
      const p = path.getPointAtLength(head);
      dot.setAttribute('cx', p.x);
      dot.setAttribute('cy', p.y);
      dot.style.opacity = 1;
    } else {
      dot.style.opacity = 0;
    }
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };
    let relayoutTimer = 0;
    const relayout = () => {
      clearTimeout(relayoutTimer);
      relayoutTimer = setTimeout(layout, 120);
    };
    layout();
    document.fonts?.ready.then(layout);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', relayout);
    const ro = new ResizeObserver(relayout);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(relayoutTimer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', relayout);
      ro.disconnect();
    };
  }, [layout, paint]);

  return (
    <svg
      className="scroll-line"
      width={geo?.w || 0}
      height={geo?.h || 0}
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="sl-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={geo?.h || 1000}>
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="0.5" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <path ref={probeRef} d="" fill="none" stroke="none" />
      <path ref={glowRef} className="scroll-line__glow" d={geo?.d || ''} />
      <path ref={pathRef} className="scroll-line__path" d={geo?.d || ''} />
      <circle ref={dotRef} className="scroll-line__dot" r="5" cx="0" cy="0" />
    </svg>
  );
}
