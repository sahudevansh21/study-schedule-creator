'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [defaultSlotDuration, setDefaultSlotDuration] = useState(60); // minutes
  const [themePreference, setThemePreference] = useState('dark'); // 'dark', 'light' (conceptual, only dark implemented)

  const handleSaveSettings = () => {
    alert('Settings saved! (Conceptual)');
    // In a real app, you would save these to local storage or a backend.
    console.log({ notificationEnabled, defaultSlotDuration, themePreference });
  };

  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem', background: 'var(--gradient-purple-blue-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Settings
      </h1>

      <div className="glass-card flex-col" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>General Preferences</h2>

        <div className="form-group">
          <label htmlFor="notifications" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="notifications"
              checked={notificationEnabled}
              onChange={(e) => setNotificationEnabled(e.target.checked)}
              style={{ width: 'auto', marginBottom: '0' }}
            />
            Enable Study Reminders (Conceptual)
          </label>
          <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginLeft: '25px', marginTop: '5px' }}>
            Receive push notifications for upcoming study sessions.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="slot-duration">Default Study Slot Duration (minutes)</label>
          <input
            type="number"
            id="slot-duration"
            value={defaultSlotDuration}
            onChange={(e) => setDefaultSlotDuration(parseInt(e.target.value))}
            min="15"
            max="180"
            step="15"
          />
          <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
            This will be the default length for generated study blocks.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="theme-preference">Theme Preference</label>
          <select
            id="theme-preference"
            value={themePreference}
            onChange={(e) => setThemePreference(e.target.value)}
            className="input"
            style={{width: '100%', padding: '0.8rem 1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)'}}
          >
            <option value="dark">Dark Theme (Current)</option>
            <option value="light" disabled>Light Theme (Coming Soon)</option>
          </select>
          <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>
            Choose your preferred visual theme for the application.
          </p>
        </div>

        <button onClick={handleSaveSettings} className="btn" style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
          Save Settings
        </button>
      </div>
    </div>
  );
}
