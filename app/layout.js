import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Study Schedule Creator',
  description: 'Personalized study schedule builder to optimize your learning.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/schedule-builder">Schedule Builder</Link>
            </li>
            <li className="nav-item">
              <Link href="/weekly-view">Weekly View</Link>
            </li>
            <li className="nav-item">
              <Link href="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
