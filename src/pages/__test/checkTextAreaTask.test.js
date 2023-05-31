import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateTask from '../CreateTask';

test('Usestate uppdatera desc', () => {
  render(<CreateTask />);

  // Ta emot textområdets text
  const textareaElement = screen.getByPlaceholderText('Task Description');

  // Ändra värde
  userEvent.type(textareaElement, 'Ny beskrivning');

  // Kolla om det uppdaterats (Klart)
  expect(textareaElement.value).toBe('Ny beskrivning');
});
