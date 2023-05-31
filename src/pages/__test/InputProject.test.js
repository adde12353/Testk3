import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateProject from '../CreateProject';


  it('Uppdatera titlen', () => {
    const { getByPlaceholderText } = render(<CreateProject />);
    const input = getByPlaceholderText('Projekt namn');

    fireEvent.change(input, { target: { value: 'Ny titel' } });

    expect(input.value).toBe('Ny titel');
  });

