import React, { useState } from 'react';

import './Contact.css';
import Square from '../../components/Square/Square';
import Button from '../../components/Button/Button';

// Submissions go to Netlify Forms (see the hidden "contact" form in public/index.html).
const encode = (data) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  'bot-field': '',
};

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [errorData, setErrorData] = useState({ firstName: false, lastName: false, email: false });
  const [status, setStatus] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !isValidEmail(formData.email.trim()),
    };
    setErrorData(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setStatus('Please fill in your name and a valid email.');
      return;
    }
    setStatus('Sending...');
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...formData }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setFormData(emptyForm);
      setStatus("Thanks! Your message has been sent. I'll get back to you soon.");
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Something went wrong. Please email me directly at alok29awasthi@gmail.com.');
    }
  };

  return (
    <div className='cv__contact'>
      <div className='cv__contact-heading'>
        <Square className='cv__contact-heading_square' height={18} width={18} color={{ r: 133, g: 29, b: 252 }} />
        <h1>Let's talk</h1>
      </div>

      <p className='cv__contact-direct'>
        Email <a href='mailto:alok29awasthi@gmail.com'>alok29awasthi@gmail.com</a>, find me on{' '}
        <a href='https://www.linkedin.com/in/alok-awasthi-93a862160' target='_blank' rel='noreferrer noopener'>LinkedIn</a> and{' '}
        <a href='https://github.com/alok29awasthi' target='_blank' rel='noreferrer noopener'>GitHub</a>, or send a message below.
      </p>

      <div className='cv__contact-form'>
        <form name='contact' data-netlify='true' netlify-honeypot='bot-field' onSubmit={handleSubmit}>
          <input type='hidden' name='form-name' value='contact' />
          <p hidden>
            <label>Don't fill this out: <input name='bot-field' value={formData['bot-field']} onChange={handleInputChange} /></label>
          </p>
          <div className='cv__contact-row_1'>
            <div className='cv__contact-row_1-form_row cv__contact-form_row'>
              <label htmlFor="first-name" className={errorData.firstName ? 'error' : 'normal'}>First Name <span>*</span></label>
              <input type="text" name="firstName" id="first-name" value={formData.firstName} onChange={handleInputChange} />
            </div>
            <div className='cv__contact-row_1-form_row cv__contact-form_row'>
              <label htmlFor="last-name" className={errorData.lastName ? 'error' : 'normal'}>Last Name <span>*</span></label>
              <input type="text" name="lastName" id="last-name" value={formData.lastName} onChange={handleInputChange} />
            </div>
          </div>
          <div className='cv__contact-form_row'>
            <label htmlFor="email" className={errorData.email ? 'error' : 'normal'}>Email <span>*</span></label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className='cv__contact-form_row'>
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleInputChange} />
          </div>
          <div className='cv__contact-form_row'>
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleInputChange} />
          </div>
          <Button name='SEND' className='send' textColor='#ffffff' backgroundColor='#8a2be2' borderColor='#725AC1' boxShadowColor='#725AC1' hoverTextColor='#725AC1' hoverBoxShadowColor='#ffffff'  />
        </form>
        {status && <p className='cv__contact-form_sent'>{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
