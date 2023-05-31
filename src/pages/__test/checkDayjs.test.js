import { render, screen } from '@testing-library/react';
import AllTasks from '../AllTasks';
import dayjs from 'dayjs';

describe('date formatering', () => {
  let data;

  beforeEach(() => {
    data = [
      {
        start: '2023-01-01',
        end: '2023-01-05',
      },
      {
        start: '2023-02-10',
        end: '2023-02-15',
      },
    ];
  });

  it('Testa värde på datumen', () => {
    data.forEach((time) => {
      const start = dayjs(time.start);
      const end = dayjs(time.end);
      time.totalTime = end.diff(start);
      time.start = start.format('DD/MM/YYYY');
      time.end = end.format('DD/MM/YYYY');
    });

    expect(data).toEqual([
      {
        start: '01/01/2023',
        end: '05/01/2023',
        totalTime: 345600000, // Mellanskilland för att se att datumen skiljer
      },
      {
        start: '10/02/2023',
        end: '15/02/2023',
        totalTime: 432000000, //Mellanskilland för att se att datumen skiljer
      },
    ]);
  });
});
