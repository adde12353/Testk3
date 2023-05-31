import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import CreateProject from '../CreateProject';

describe('CreateTask', () => {
  it('Skapa projekt och visa ett meddelande om det gick igenom', async () => {
    // Mock the fetch request to return a successful response
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
    });

    const { getByText, getByPlaceholderText } = render(<CreateProject />);

    const titleInput = getByPlaceholderText('Projekt namn');
    fireEvent.change(titleInput, { target: { value: 'andreas projekt' } });

    const submitButton = getByText('Spara');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = getByText('Du skickade datan utan problem');
      expect(successMessage).toBeInTheDocument();
    });

    // Restore the original fetch implementation
    global.fetch.mockRestore();
  });
})