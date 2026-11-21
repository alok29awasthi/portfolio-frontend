import React from 'react';

import './Resume.css';
import Square from '../../components/Square/Square';
import Button from '../../components/Button/Button';
import resume from '../../assets/resume.pdf'

function Resume() {

  return (
    <div className='cv__resume'>
      <div className='cv__resume-heading'>
        <Square className='cv__resume-heading_square' height={18} width={18} color={{ r: 133, g: 29, b: 252 }} />
        <h1>Resume</h1>
      </div>

      <div className='cv__resume-summary'>
        <div className='cv__resume-summary_heading'>
          <h2>Summary</h2>
          <a href={resume} download='Alok Awasthi Resume.pdf'>
            <Button name='DOWNLOAD CV' className='downloadCV' textColor='#ffffff' backgroundColor='#8a2be2' borderColor='#725AC1' boxShadowColor='#725AC1' hoverTextColor='#725AC1' hoverBoxShadowColor='#ffffff00'  />
          </a>
        </div>
        <div className='cv__resume-summary_description'>
          <p>Senior software engineer with 5+ years of experience in Java, Spring Boot, Python, SQL and Oracle DB, building backend and data systems across healthcare, financial services and travel. At Oracle Health, I drive payer data platforms and GenAI features: an LLM-based payer deduplication process, a RAG pipeline that extracts prior-authorization rules from payer documents, and cross-team payer self-onboarding. Proven record of 3× throughput gains, 40% faster event processing, 30%+ faster onboarding and ~20% shorter test cycles. Experienced in owning cross-team delivery and mentoring developers.</p>
        </div>
      </div>

      <div className='cv__resume-education'>
        <h2>Education</h2>
        <div className='cv__resume-education_description'>
          <div className='cv__resume-education_description-college'>
            <h3>2017 - 2021</h3>
            <div className='cv__resume-education_description-college_right'>
              <h3>Vellore Institute of Technology</h3>
              <p>B. Tech (Electronics & Communication Engineering)</p>
              <p>9.11 / 10</p>
            </div>
          </div>
          <div className='cv__resume-education_description-school'>
            <h3>2016 - 2017</h3>
            <div className='cv__resume-education_description-school_right'>
              <h3>Prabhu Dayal Public School</h3>
              <p>Higher Secondary School</p>
              <p>95.6%</p>
            </div>
          </div>
        </div>
      </div>

      <div className='cv__resume-skills_language'>
        <h2>Skillset</h2>
        <h3 className='cv__resume-skills_group'>Languages</h3>
        <ul className='cv__resume-skills_language-list'>
          <li>Java</li>
          <li>Python</li>
          <li>SQL</li>
          <li>C++</li>
        </ul>

        <h3 className='cv__resume-skills_group'>Backend</h3>
        <ul className='cv__resume-skills_language-list'>
          <li>Spring Boot</li>
          <li>Spring Data JPA</li>
          <li>REST APIs</li>
          <li>GraphQL</li>
          <li>Kafka</li>
          <li>Asynchronous Processing</li>
        </ul>

        <h3 className='cv__resume-skills_group'>AI / GenAI</h3>
        <ul className='cv__resume-skills_language-list'>
          <li>RAG Pipelines</li>
          <li>Embeddings & Vector Search</li>
          <li>LLM-based Entity Resolution</li>
          <li>LLM Evaluation (Human-in-the-Loop)</li>
          <li>OCI Generative AI</li>
        </ul>

        <h3 className='cv__resume-skills_group'>Data</h3>
        <ul className='cv__resume-skills_language-list'>
          <li>Oracle DB</li>
          <li>MongoDB</li>
          <li>Data Modeling</li>
          <li>ETL Migration & Validation</li>
          <li>Oracle APEX</li>
        </ul>

        <h3 className='cv__resume-skills_group'>Cloud & DevOps</h3>
        <ul className='cv__resume-skills_language-list'>
          <li>OCI (Object Storage, IAM Identity Domains)</li>
          <li>AWS S3</li>
          <li>Jenkins</li>
          <li>Docker</li>
          <li>Kubernetes (basic)</li>
          <li>Blue-Green Deployments</li>
        </ul>

        <h3 className='cv__resume-skills_group'>Testing</h3>
        <ul className='cv__resume-skills_language-list'>
          <li>JUnit</li>
          <li>BDD/E2E</li>
          <li>API Contract Testing</li>
          <li>JMeter Load Testing</li>
        </ul>

        <h2>Language</h2>
        <ul className='cv__resume-skills_language-list'>
          <li>Hindi (native)</li>
          <li>English</li>
        </ul>
      </div>
    </div>
)};

export default Resume;