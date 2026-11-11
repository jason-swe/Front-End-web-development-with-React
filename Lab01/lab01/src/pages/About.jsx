import React from 'react';

function About({ darkMode }) {
  return (
    <div className={`about-page ${darkMode ? 'about-dark' : ''}`}>
      <section className="about-card">
        <span className="about-eyebrow">ABOUT THE DEVELOPER</span>
        <h1>Hi, I&apos;m Quan Ho.</h1>
        <p className="about-lead">I&apos;m a Front-End Web Development student who enjoys turning ideas into polished, accessible React experiences.</p>
        <div className="about-grid">
          <div><strong>Focus</strong><span>React, UI design and responsive web development</span></div>
          <div><strong>Project</strong><span>Floral Haven orchid catalog and community</span></div>
          <div><strong>Goal</strong><span>Build useful products with clean, friendly interfaces</span></div>
        </div>
        <p className="about-note">This project is my Lab 5 information page and a place to practice components, APIs, routing and modern styling.</p>
      </section>
    </div>
  );
}

export default About; 