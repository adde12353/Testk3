import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateTask from '../CreateTask';

test('submits the form and displays success message on successful task creation', () => {
  const { getByText, getByPlaceholderText, getByLabelText } = render(<CreateTask />);

  // Mock input values
  const titleInput = getByPlaceholderText('Task Titel');
  const descriptionInput = getByLabelText(/textarea/i);
  
  fireEvent.change(titleInput, { target: { value: 'Mitt Task' } });
  fireEvent.change(descriptionInput, { target: { value: 'Beskrivning av mitt task' } });

  // Find the option by value instead of label text
  const projectOption = getByLabelText('Välj projekt', { selector: 'option[value="1"]' });

  fireEvent.change(projectOption, { target: { value: '1' } });

  const submitButton = getByText('Spara');
  fireEvent.click(submitButton);

  const successMessage = getByText('Du sparade tasket utan problem');
  expect(successMessage).toBeInTheDocument();
});
