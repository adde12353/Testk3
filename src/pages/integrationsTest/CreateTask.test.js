import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CreateTask from '../CreateTask';

// Mock the fetch function
global.fetch = jest.fn();

test('Skapa ett task utan problem', async () => {
  // Mock the fetch response for fetching projects
  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
  ];
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(projects),
  });

  // Mock the fetch response for creating a task
  const task = {
    projectId: 1,
    title: 'Test Task',
    description: 'Test Description',
  };
  global.fetch.mockResolvedValueOnce({
    ok: true,
  });

  render(<CreateTask />);

  // Wait for the initial fetch request and projects rendering
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  await waitFor(() => screen.getByText('Project 1 id: 1'));
  await waitFor(() => screen.getByText('Project 2 id: 2'));

  // Fill in the form inputs
  fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
  fireEvent.change(screen.getByPlaceholderText('Task Titel'), {
    target: { value: 'Test Task' },
  });
  fireEvent.change(screen.getByPlaceholderText('Task Description', { name: 'Task Description' }), {
    target: { value: 'Test Description' },
  });

  // Submit the form
  fireEvent.click(screen.getByText('Spara'));

  // Wait for the create task request and check the success message
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  await waitFor(() =>
    screen.getByText('Du sparade tasket utan problem')
  );
});

