import React, { useState } from 'react';
import { FiArrowUpRight, FiCheck, FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';

import { profile } from './data.js';

// Submissions go to Netlify Forms (the hidden "contact" form in index.html registers the fields).
const encode = (data) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&');

const EMPTY = { name: '', email: '', message: '', 'bot-field': '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please add a valid email.';
    if (!form.message.trim()) next.message = 'Please write a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setState('sending');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...form }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setForm(EMPTY);
      setState('sent');
    } catch (err) {
      console.error('Contact form failed:', err);
      setState('error');
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container reveal">
        <div className="section__head">
          <span className="section__index">05</span>
          <h2>Let's talk</h2>
          <p className="section__kicker">
            Open to conversations about backend, data and GenAI engineering roles, or just to say hi.
          </p>
        </div>

        <div className="contact">
          <div className="contact__direct">
            <a className="card contact__link" href={`mailto:${profile.email}`}>
              <FiMail aria-hidden="true" />
              <span>
                <span className="label">Email</span>
                {profile.email}
              </span>
              <FiArrowUpRight className="contact__arrow" aria-hidden="true" />
            </a>
            <a className="card contact__link" href={profile.linkedin} target="_blank" rel="noreferrer noopener">
              <FiLinkedin aria-hidden="true" />
              <span>
                <span className="label">LinkedIn</span>
                alok-awasthi
              </span>
              <FiArrowUpRight className="contact__arrow" aria-hidden="true" />
            </a>
            <a className="card contact__link" href={profile.github} target="_blank" rel="noreferrer noopener">
              <FiGithub aria-hidden="true" />
              <span>
                <span className="label">GitHub</span>
                alok29awasthi
              </span>
              <FiArrowUpRight className="contact__arrow" aria-hidden="true" />
            </a>
          </div>

          <form className="card contact__form" name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} noValidate>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Leave this empty: <input name="bot-field" value={form['bot-field']} onChange={onChange} />
              </label>
            </p>
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" autoComplete="name" value={form.name} onChange={onChange} aria-invalid={!!errors.name} />
              {errors.name && <span className="field__error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} aria-invalid={!!errors.email} />
              {errors.email && <span className="field__error">{errors.email}</span>}
            </div>
            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" name="message" rows={5} value={form.message} onChange={onChange} aria-invalid={!!errors.message} />
              {errors.message && <span className="field__error">{errors.message}</span>}
            </div>
            <button className="btn btn--primary" type="submit" disabled={state === 'sending'}>
              {state === 'sending' ? 'Sending…' : (<>Send message <FiSend aria-hidden="true" /></>)}
            </button>
            <p className="form-status" role="status">
              {state === 'sent' && (<><FiCheck aria-hidden="true" /> Thanks! Your message is on its way. I'll reply soon.</>)}
              {state === 'error' && `Something went wrong. Please email me at ${profile.email}.`}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
