import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateTask from './CreateTask';

describe('CreateTask Component', () => {
  test('submits the form and displays the success message', async () => {
    // Render the CreateTask component
    const { getByText, getByPlaceholderText } = render(<CreateTask />);

    // Get the input element and type a value
    const inputElement = getByPlaceholderText('Projekt namn');
    fireEvent.change(inputElement, { target: { value: 'My Task' } });

    // Submit the form
    const submitButton = getByText('Spara');
    fireEvent.click(submitButton);

    // Verify the success message is displayed
    await waitFor(() => {
      const successMessage = getByText('Du skickade datan utan problem');
      expect(successMessage).toBeInTheDocument();
    });
  });
});
