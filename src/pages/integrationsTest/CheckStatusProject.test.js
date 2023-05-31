import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateProject from '../CreateProject';

it('Visa felmeddelande när skapandet av en uppgift misslyckas.', async () => {
    // Mock the fetch request to return an error response
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Request failed'));

    const { getByText, getByPlaceholderText } = render(<CreateProject />);

    const titleInput = getByPlaceholderText('Projekt namn');
    fireEvent.change(titleInput, { target: { value: 'Andreas projekt' } });

    const submitButton = getByText('Spara');
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText('Det gick inte att spara, försök igen');
      expect(errorMessage).toBeInTheDocument();
    });

    // Restore the original fetch implementation
    global.fetch.mockRestore();
  });

