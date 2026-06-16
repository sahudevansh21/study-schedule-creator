import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="main-content flex-col items-center">
      <div className="glass-card text-center" style={{ maxWidth: '800px' }}>
        <h1 style={{ marginBottom: '1rem', background: 'var(--gradient-purple-blue-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Personalized Study Schedule Creator
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Tired of chaotic study sessions? Our app helps you organize your learning time effectively.
        </p>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>The Problem</h2>
          <p>
            Students often struggle to organize their study time effectively across multiple subjects and topics,
            leading to inefficient learning and increased stress. Manual calculation and external tools can be cumbersome,
            making it hard to stick to a structured approach.
          </p>
        </section>

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Our Solution</h2>
          <p>
            We provide a simple yet powerful web application where you can input all your subjects, specific topics,
            estimated time required for each, and your weekly availability. The system then generates a personalized,
            color-coded study schedule tailored just for you.
            While drag-and-drop adjustments are a conceptual feature for future enhancement,
            the initial build focuses on intelligent schedule generation.
          </p>
        </section>

        <Link href="/schedule-builder" className="btn">
          Start Building Your Schedule
        </Link>
      </div>
    </div>
  );
}
