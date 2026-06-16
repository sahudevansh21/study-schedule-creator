'use client';

import { useState } from 'react';

export default function ScheduleBuilderPage() {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicTime, setNewTopicTime] = useState('');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [weeklyAvailability, setWeeklyAvailability] = useState(Array(7 * 24).fill(0)); // 7 days, 24 hours per day, 0=unavailable, 1=available (placeholder for simplicity)
  const [generatedSchedule, setGeneratedSchedule] = useState(null); // Will store the generated schedule

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`); // 00:00 to 23:00

  const addSubject = () => {
    if (newSubjectName.trim() === '') return;
    const newId = (subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) : 0) + 1;
    setSubjects([...subjects, { id: newId, name: newSubjectName, topics: [] }]);
    setNewSubjectName('');
  };

  const addTopic = () => {
    if (selectedSubjectId === '' || newTopicName.trim() === '' || !newTopicTime) return;
    
    setSubjects(subjects.map(subject =>
      subject.id === parseInt(selectedSubjectId)
        ? {
            ...subject,
            topics: [
              ...subject.topics,
              {
                id: (subject.topics.length > 0 ? Math.max(...subject.topics.map(t => t.id)) : 0) + 1,
                name: newTopicName,
                time: parseInt(newTopicTime)
              }
            ]
          }
        : subject
    ));
    setNewTopicName('');
    setNewTopicTime('');
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    if (selectedSubjectId === String(id)) {
      setSelectedSubjectId('');
    }
  };

  const removeTopic = (subjectId, topicId) => {
    setSubjects(subjects.map(subject =>
      subject.id === subjectId
        ? { ...subject, topics: subject.topics.filter(topic => topic.id !== topicId) }
        : subject
    ));
  };

  const handleAvailabilityChange = (index, value) => {
    const updatedAvailability = [...weeklyAvailability];
    updatedAvailability[index] = value;
    setWeeklyAvailability(updatedAvailability);
  };

  const generateSchedule = () => {
    // This is a simplified simulation of schedule generation.
    // In a real app, this would involve complex algorithms to optimize time.
    // For this example, we'll just distribute topics linearly across available time.
    const schedule = Array(7).fill(null).map(() => Array(24).fill(null)); // Day x Hour

    let currentTopicIndex = 0;
    let currentSubjectIndex = 0;
    let currentTopicRemainingTime = 0; // In hours

    const subjectColors = ['subject-color-1', 'subject-color-2', 'subject-color-3', 'subject-color-4', 'subject-color-5', 'subject-color-6'];
    const assignedSubjectColors = new Map(); // subjectId -> class name

    let colorCounter = 0;
    subjects.forEach(sub => {
      assignedSubjectColors.set(sub.id, subjectColors[colorCounter % subjectColors.length]);
      colorCounter++;
    });

    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const availabilityIndex = day * 24 + hour;
        if (weeklyAvailability[availabilityIndex] > 0) { // If slot is available
          if (currentTopicRemainingTime <= 0) {
            // Move to next topic/subject
            if (subjects[currentSubjectIndex]) {
              const currentSubject = subjects[currentSubjectIndex];
              if (currentSubject.topics[currentTopicIndex]) {
                currentTopicRemainingTime = currentSubject.topics[currentTopicIndex].time;
              } else {
                // No more topics in current subject, move to next subject
                currentTopicIndex = 0;
                currentSubjectIndex++;
                if (subjects[currentSubjectIndex]) {
                  currentTopicRemainingTime = subjects[currentSubjectIndex].topics[currentTopicIndex]?.time || 0;
                } else {
                  // All subjects/topics processed
                  setGeneratedSchedule(schedule);
                  return;
                }
              }
            } else {
              // All subjects processed
              setGeneratedSchedule(schedule);
              return;
            }
          }

          if (currentTopicRemainingTime > 0) {
            const subject = subjects[currentSubjectIndex];
            const topic = subject.topics[currentTopicIndex];
            schedule[day][hour] = {
              subjectId: subject.id,
              subjectName: subject.name,
              topicName: topic.name,
              colorClass: assignedSubjectColors.get(subject.id)
            };
            currentTopicRemainingTime--;

            if (currentTopicRemainingTime <= 0) {
              currentTopicIndex++;
            }
          }
        }
      }
    }
    setGeneratedSchedule(schedule);
  };


  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem', background: 'var(--gradient-purple-blue-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Schedule Builder
      </h1>

      <div className="grid-cols-2">
        {/* Subject & Topic Input */}
        <div className="glass-card flex-col">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Manage Subjects & Topics</h2>

          {/* Add Subject */}
          <div className="form-group">
            <label htmlFor="new-subject-name">New Subject Name</label>
            <div className="input-group">
              <input
                type="text"
                id="new-subject-name"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="e.g., Mathematics"
              />
              <button onClick={addSubject} className="btn">Add Subject</button>
            </div>
          </div>

          {/* Add Topic */}
          <div className="form-group">
            <label htmlFor="select-subject">Select Subject for Topic</label>
            <select
              id="select-subject"
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="input"
              style={{width: '100%', padding: '0.8rem 1rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-primary)'}}
            >
              <option value="">-- Select a Subject --</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {selectedSubjectId && (
              <>
                <label htmlFor="new-topic-name">New Topic Name</label>
                <input
                  type="text"
                  id="new-topic-name"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="e.g., Algebra Basics"
                />
                <label htmlFor="new-topic-time">Estimated Time (hours)</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="new-topic-time"
                    value={newTopicTime}
                    onChange={(e) => setNewTopicTime(e.target.value)}
                    min="1"
                    placeholder="e.g., 5"
                  />
                  <button onClick={addTopic} className="btn">Add Topic</button>
                </div>
              </>
            )}
          </div>

          {/* Subject & Topic List */}
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Your Subjects & Topics</h3>
            {subjects.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No subjects added yet.</p>}
            {subjects.map(subject => (
              <div key={subject.id} className="list-item flex-col items-start">
                <div className="flex-row justify-between items-center" style={{ width: '100%' }}>
                  <h4 style={{ background: 'var(--gradient-purple-blue-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {subject.name}
                  </h4>
                  <button onClick={() => removeSubject(subject.id)} className="remove-btn">✕</button>
                </div>
                <div style={{ width: '100%', paddingLeft: '1rem', borderLeft: '2px solid var(--card-border)', marginTop: '0.5rem' }}>
                  {subject.topics.length === 0 && <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)' }}>No topics for this subject.</p>}
                  {subject.topics.map(topic => (
                    <div key={topic.id} className="flex-row justify-between items-center" style={{ marginBottom: '0.4rem' }}>
                      <p>- {topic.name} ({topic.time} hrs)</p>
                      <button onClick={() => removeTopic(subject.id, topic.id)} className="remove-btn" style={{ fontSize: '0.9rem' }}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Availability */}
        <div className="glass-card flex-col">
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Set Weekly Availability</h2>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
            Click on time slots to mark them as available for study. (Currently, any value &gt; 0 means available for a conceptual schedule generation)
          </p>
          <div className="schedule-grid" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
            <div className="schedule-header-cell">Time</div>
            {daysOfWeek.map(day => (
              <div key={day} className="schedule-header-cell">{day}</div>
            ))}

            {timeSlots.map((time, hourIndex) => (
              <>
                <div className="schedule-time-cell">{time}</div>
                {daysOfWeek.map((day, dayIndex) => {
                  const availabilityIndex = dayIndex * 24 + hourIndex;
                  const isAvailable = weeklyAvailability[availabilityIndex] > 0;
                  return (
                    <div
                      key={`${day}-${time}`}
                      className={`schedule-slot ${isAvailable ? 'occupied' : ''}`}
                      onClick={() => handleAvailabilityChange(availabilityIndex, isAvailable ? 0 : 1)}
                      title={isAvailable ? "Click to mark as unavailable" : "Click to mark as available"}
                      style={{ cursor: 'pointer', background: isAvailable ? 'rgba(0, 206, 209, 0.2)' : 'var(--card-background)' }}
                    >
                      {isAvailable ? '✅' : ''}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
          <button onClick={generateSchedule} className="btn" style={{ marginTop: '2rem' }}>
            Generate My Study Schedule
          </button>
          {generatedSchedule && (
            <p style={{ marginTop: '1rem', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Schedule Generated! Head to "Weekly View" to see it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
