import React from 'react';

import './Experience.css';
import Square from '../../components/Square/Square';

import morgan_stanley from '../../assets/morgan-stanley-logo.jpeg'
import oyo_rooms from '../../assets/oyo-rooms-logo.jpeg'

const Experience = () => (
  <div className='cv__experience'>
    <div className='cv__experience-heading'>
      <Square className='cv__experience-heading_square' height={18} width={18} color={{ r: 133, g: 29, b: 252 }} />
      <h1>Experience</h1>
    </div>

    <p className='cv__experience-summary'>5+ years building backend and data systems across healthcare, financial services and travel. At Oracle Health I drive payer data platforms and GenAI features; before that I built regulatory reporting and event-processing systems at Morgan Stanley and booking data pipelines at OYO.</p>

    <div className='cv__experience-oracle cv__experience-comp'>
      <div className='cv__experience-comp_rect'></div>
      <div className='cv__experience-comp_description'>
        <h2>Oracle Health (Cerner)</h2>
        <h3>Senior Member of Technical Staff <span className='cv__experience-comp_dates'>· December 2025 – Present</span></h3>
        <ul>
          <li>Built the internal management console for the Payer Directory database in Oracle APEX with 4-tier role-based access (Read, Write, Super User, Workflow Admin) and per-workflow data isolation, so each workflow team manages its own users without developer involvement.</li>
          <li>Designed and extended a unified payer data model in Oracle DB, consolidating 5 data sources (500–2,500 payers each) from Excel, MS Access and clearinghouse feeds across eligibility, prior authorization, CRD and DTR workflows; 5 more sources in progress.</li>
          <li>Drove LLM-based entity resolution for payer deduplication using OCI Generative AI, resolving duplicates that rule-based matching misses (e.g. “BCBS” vs “Blue Cross Blue Shield”) across thousands of records, with human review of low-confidence matches.</li>
          <li>Drove delivery of a RAG pipeline that extracts prior-authorization and timely-filing rules from payer PDFs: provider-curated crawling, OCI Object Storage, parsing, chunking and vector embeddings, plus scheduled GenAI evaluators that auto-approve evidence-backed documents and route the rest to human review.</li>
          <li>Leading design of payer self-onboarding across Payer Directory and Payer Hub: OCI IAM Identity Domain provisioning, REST APIs that prefill payer profiles, and human-in-the-loop approval before reconciling into the system of record.</li>
          <li>Built Python tooling to migrate multi-step SQL ETL pipelines to Oracle DB, with automated validation (row counts, column aggregates, row-level diffs) that caught conversion errors before cutover.</li>
        </ul>
      </div>
      <div className='cv__experience-comp_img-oracle'>
        <div className='cv__experience-comp_wordmark'>
          <strong>ORACLE</strong>
          <span>Health</span>
        </div>
      </div>
    </div>

    <div className='cv__experience-ms cv__experience-comp'>
      <div className='cv__experience-ms_rect cv__experience-comp_rect'></div>
      <div className='cv__experience-comp_description'>
        <h2>Morgan Stanley</h2>
        <h3>P3 Associate (Software Developer) <span className='cv__experience-comp_dates'>· August 2022 – December 2025</span></h3>
        <ul>
          <li>Built a modular regulatory reporting framework generating regime-specific outputs with no downstream logic changes, cutting onboarding effort by 30%+ across 5+ regimes.</li>
          <li>Reduced event processing time from 2s to 1.2s by optimizing downstream calls and tripled throughput through parallel processing, clearing backlogs of 3,700+ events within SLA.</li>
          <li>Built automated test frameworks (unit, API contract, BDD-based E2E, Python automation), cutting testing cycle time by ~20% (2 days per release).</li>
          <li>Integrated Blue-Green deployments into Jenkins pipelines with environment-specific configuration, improving release stability and rollback safety; mentored junior developers on design patterns and automation.</li>
        </ul>
      </div>
      <div className='cv__experience-comp_img-ms'>
        <img src={morgan_stanley} alt="Morgan Stanley logo" />
      </div>
    </div>

    <div className='cv__experience-oyo cv__experience-comp'>
      <div className='cv__experience-oyo_rect cv__experience-comp_rect'></div>
      <div className='cv__experience-comp_description'>
        <h2>OYO Rooms</h2>
        <h3>SDE-1 (Software Developer, incl. internship) <span className='cv__experience-comp_dates'>· January 2021 – July 2022</span></h3>
        <ul>
          <li>Built a Kafka-based data pipeline for bulk reloading booking data into downstream databases, and raised unit test coverage from 19% to 72% for core API services.</li>
          <li>Load-tested APIs at 10k+ concurrent users with JMeter and optimized caching and queries for reliable performance at peak load.</li>
        </ul>
      </div>
      <div className='cv__experience-comp_img-oyo'>
        <img src={oyo_rooms} alt="OYO Rooms logo" />
      </div>
    </div>
  </div>
);

export default Experience;
