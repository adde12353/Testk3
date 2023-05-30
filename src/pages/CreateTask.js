import React, { useEffect, useState } from 'react';

export default function CreateTask() {
  const [projectData, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sendDone, setSendDone] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((response) => response.json())
      .then((data) => setProjectData(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = {
      projectId,
      title,
      description,
    };

    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
      .then(() => setSendDone('Du sparade tasket utan problem'))
      .catch((error) => setSendDone(`Ditt task sparades inte, felkod: ${error}`));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="createForm">
        <h3>Skapa ett task</h3>
        <select required value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">Välj projekt</option>
          {projectData.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name} id: {project.id}
            </option>
          ))}
        </select>

        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Titel"
        />
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        />

        <button type="submit">Spara</button>
        <p>{sendDone}</p>
      </form>
    </div>
  );
}
