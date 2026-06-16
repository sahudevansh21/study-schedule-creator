'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyViewPage() {
  // In a real application, you'd load this from context, local storage, or an API.
  // For this example, we'll use a placeholder or assume ScheduleBuilder has set a global state/context.
  // For simplicity, we'll demonstrate a placeholder schedule.
  const [schedule, setSchedule] = useState(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  // This useEffect simulates loading a generated schedule.
  // In a real scenario, this would involve a global state management solution (e.g., Zustand, Redux, or React Context)
  // or storing the schedule in localStorage after generation.
  useEffect(() => {
    // Placeholder for a generated schedule (matching the structure from ScheduleBuilder)
    // Replace this with actual schedule retrieval if you implement global state.
    const mockSchedule = Array(7).fill(null).map(() => Array(24).fill(null));

    // Example: Assigning a few mock tasks
    mockSchedule[0][9] = { subjectId: 1, subjectName: 'Mathematics', topicName: 'Algebra', colorClass: 'subject-color-1' };
    mockSchedule[0][10] = { subjectId: 1, subjectName: 'Mathematics', topicName: 'Algebra', colorClass: 'subject-color-1' };
    mockSchedule[1][14] = { subjectId: 2, subjectName: 'Physics', topicName: 'Mechanics', colorClass: 'subject-color-2' };
    mockSchedule[1][15] = { subjectId: 2, subjectName: 'Physics', topicName: 'Mechanics', colorClass: 'subject-color-2' };
    mockSchedule[2][11] = { subjectId: 3, subjectName: 'Chemistry', topicName: 'Organic', colorClass: 'subject-color-3' };
    mockSchedule[2][12] = { subjectId: 3, subjectName: 'Chemistry', topicName: 'Organic', colorClass: 'subject-color-3' };
    mockSchedule[3][10] = { subjectId: 1, subjectName: 'Mathematics', topicName: 'Calculus', colorClass: 'subject-color-1' };
    mockSchedule[4][16] = { subjectId: 2, subjectName: 'Physics', topicName: 'Thermodynamics', colorClass: 'subject-color-2' };
    mockSchedule[5][10] = { subjectId: 4, subjectName: 'History', topicName: 'World Wars', colorClass: 'subject-color-4' };


    // In a real app, you might try to load from local storage or context:
    // const storedSchedule = localStorage.getItem('generatedSchedule');
    // if (storedSchedule) {
    //   setSchedule(JSON.parse(storedSchedule));
    // } else {
      setSchedule(mockSchedule); // Fallback to mock if nothing is stored
    // }
  }, []);

  const handleDragStart = (e, taskData) => {
    e.dataTransfer.setData('task', JSON.stringify(taskData));
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, dayIndex, hourIndex) => {
    e.preventDefault();
    const droppedTask = JSON.parse(e.dataTransfer.getData('task'));

    // This is a simplified drag-and-drop implementation.
    // In a full feature, you would:
    // 1. Find the original position of the droppedTask.
    // 2. Clear the original position.
    // 3. Place the task at the new (dayIndex, hourIndex) position.
    // 4. Update the `schedule` state.
    // For this conceptual example, we'll just log the action.

    console.log(`Task "${droppedTask.topicName}" dropped at Day ${daysOfWeek[dayIndex]}, Hour ${timeSlots[hourIndex]}`);
    alert(`Conceptual Drag-and-Drop: "${droppedTask.topicName}" moved to ${daysOfWeek[dayIndex]} at ${timeSlots[hourIndex]}. (State update not fully implemented for this example)`);

    // Example of how you would update state (conceptual):
    // const newSchedule = [...schedule.map(dayArr => [...dayArr])]; // Deep copy
    // // Logic to find and clear original slot
    // // Logic to set new slot
    // setSchedule(newSchedule);
  };


  if (!schedule) {
    return (
      <div className="main-content flex-col items-center">
        <h1 style={{ marginBottom: '2rem', background: 'var(--gradient-purple-blue-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Weekly Study Schedule
        </h1>
        <div className="glass-card text-center">
          <p>Loading schedule or no schedule generated yet.</p>
          <p>Please go to the <Link href="/schedule-builder">Schedule Builder</Link> to create your schedule.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h1 style={{ marginBottom: '2rem', background: 'var(--gradient-purple-blue-cyan)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Weekly Study Schedule
      </h1>

      <div className="glass-card" style={{ padding: '0' }}>
        <div className="schedule-grid" style={{ gridTemplateColumns: '80px repeat(7, 1fr)' }}>
          <div className="schedule-header-cell">Time</div>
          {daysOfWeek.map(day => (
            <div key={day} className="schedule-header-cell">{day}</div>
          ))}

          {timeSlots.map((time, hourIndex) => (
            <>
              <div className="schedule-time-cell">{time}</div>
              {daysOfWeek.map((day, dayIndex) => {
                const task = schedule[dayIndex][hourIndex];
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`schedule-slot ${task ? `occupied ${task.colorClass}` : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, dayIndex, hourIndex)}
                  >
                    {task ? (
                      <div
                        className="schedule-slot-content"
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        title={`Subject: ${task.subjectName}\nTopic: ${task.topicName}`}
                      >
                        <strong>{task.subjectName}</strong>
                        <br />
                        <span style={{ fontSize: '0.75em', opacity: '0.8' }}>{task.topicName}</span>
                      </div>
                    ) : (
                      <span style={{ opacity: '0.4', fontSize: '0.8em' }}>Available</span>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
        <p style={{ padding: '1.5rem', fontSize: '0.9em', color: 'var(--text-secondary)' }}>
          *Conceptual Drag-and-Drop: You can drag tasks, but state updates for re-positioning are simulated for this example.
        </p>
      </div>
    </div>
  );
}
