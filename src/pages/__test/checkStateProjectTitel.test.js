import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateProject from '../CreateProject';

test('useState upppdatera titel', () => {
  render(<CreateProject />);

  // Ta emot input
  const inputElement = screen.getByPlaceholderText('Projekt namn');

  // Byta värde på set
  userEvent.type(inputElement, 'Ny projektTitel');

  // Kolla om det uppdaterats 
  expect(inputElement.value).toBe('Ny projektTitel');
});
