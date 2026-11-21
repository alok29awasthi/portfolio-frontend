import React, { useState } from 'react';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

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
    <section id="contact" className="sec" aria-labelledby="contact-title">
      <h2 id="contact-title" className="sec__title">
        Contact
      </h2>
      <p className="contact__big">
        Have a role or a problem in mind? <em>Let's talk.</em>
      </p>
      <a className="contact__email" href={`mailto:${profile.email}`}>
        {profile.email} <FiArrowUpRight aria-hidden="true" />
      </a>

      <form className="form" name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} noValidate>
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Leave this empty: <input name="bot-field" value={form['bot-field']} onChange={onChange} />
          </label>
        </p>
        <p className="form__intro">Or leave a note here:</p>
        <div className="form__grid">
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
        </div>
        <div className="field">
          <label htmlFor="c-message">Message</label>
          <textarea id="c-message" name="message" rows={4} value={form.message} onChange={onChange} aria-invalid={!!errors.message} />
          {errors.message && <span className="field__error">{errors.message}</span>}
        </div>
        <div className="form__foot">
          <button className="send" type="submit" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : (<>Send <FiArrowRight aria-hidden="true" /></>)}
          </button>
          <p className="form__status" role="status">
            {state === 'sent' && "Thanks, it's on its way. I'll reply soon."}
            {state === 'error' && `That didn't go through. Please email ${profile.email}.`}
          </p>
        </div>
      </form>
    </section>
  );
}
