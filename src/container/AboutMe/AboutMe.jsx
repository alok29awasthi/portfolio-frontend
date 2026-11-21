import React from 'react';
import { Link } from 'react-router-dom';

import './AboutMe.css';
import mypic from '../../assets/mypic.jpeg'

import {images} from '../../constants'
import Button from '../../components/Button/Button';
import { FaGithub } from 'react-icons/fa';

const AboutMe = () => (
  <div className='cv__aboutme'>
    <div className='cv__aboutme-placeholder_rect'></div>
    <div className='cv__aboutme-placeholder'>
      <div className='cv__aboutme-placeholder_about'>
        <div className='cv__aboutme-placeholder_about-header'>
          <img src={mypic} alt="my-pic" />
          <h1>Alok</h1>
          <h1>Awasthi</h1>
          <div className='cv__aboutme-placeholder_about-line'></div>
          <p>SENIOR SOFTWARE ENGINEER</p>
        </div>
        <div className='cv__aboutme-placeholder_about-footer'>
          <ul className='cv__aboutme-placeholder_about-footer_social'>
            <li><a href='https://www.facebook.com/Aunny.12345/' target="_blank" rel="noreferrer noopener"><img src={images.facebook} alt="fb" className='social-media'/></a></li>
            <li><a href='https://twitter.com/Aunny_Awasthi' target="_blank" rel="noreferrer noopener"><img src={images.twitter} alt="tw" className='social-media'/></a></li>
            <li><a href='https://github.com/alok29awasthi' target="_blank" rel="noreferrer noopener" aria-label="GitHub"><FaGithub className='social-media' size={30} color='#181717' /></a></li>
            <li><a href='https://www.linkedin.com/in/alok-awasthi-93a862160/' target="_blank" rel="noreferrer noopener"><img src={images.linkedin} alt="li" className='social-media'/></a></li>
            <li><a href='https://www.instagram.com/alok_awasthi/' target="_blank" rel="noreferrer noopener"><img src={images.instagram} alt="in" className='social-media'/></a></li>
          </ul>
        </div>
      </div>
    </div>

    <div className='cv__aboutme-description'>
      <h1>Hello</h1>
      <h3>Here's who I am & what I do</h3>
      <div className='cv__aboutme-description_buttons'>
        <Link to='/resume'><Button name='RESUME' className='resume' textColor='#ffffff' backgroundColor='#8a2be2' borderColor='#725AC1' boxShadowColor='#725AC1' hoverTextColor='#725AC1' hoverBoxShadowColor='#ffffff'  /></Link>
        <Link to='/experience'><Button name='EXPERIENCE' className='experience' textColor='#725AC1' borderColor='#725AC1' boxShadowColor='#725AC1' hoverTextColor='#FFFFFF' hoverBoxShadowColor='#8a2be2'  /></Link>
      </div>
      <p>I'm a Senior Member of Technical Staff at Oracle Health with 5+ years of experience in Java, Spring Boot, Python, SQL and Oracle DB. I build backend and data systems across healthcare, financial services and travel, and right now I'm driving payer data platforms and GenAI features: LLM-based payer deduplication, a RAG pipeline that reads prior-authorization rules out of payer documents, and cross-team payer self-onboarding. Previously at Morgan Stanley and OYO Rooms.</p>
    </div>
  </div>
);

export default AboutMe;
