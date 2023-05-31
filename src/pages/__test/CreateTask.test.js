import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import CreateTask from '../CreateTask';


  it('Testa byta titel för att skapa task', () => {
    const { getByPlaceholderText } = render(<CreateTask />);
    const input = getByPlaceholderText('Task Titel');

    fireEvent.change(input, { target: { value: 'New Title' } });

    expect(input.value).toBe('New Title');
  });

