import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

export default function TimeTracker() {
  const [tasksData, setTaskData] = useState(null);
  const [interValId, setInterIdval] = useState(null);
  const [displayTime, setDIsplaytime] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((results) => results.json())
      .then((data) => {
        setTaskData(data);
      });
  }, []);

  function play(id) {
    const taskTime = {
      taskId: id,
      start: dayjs(),
      end: '',
    };

    let timeArray = [...displayTime];
    let time = 0;

    const InterId = setInterval(() => {
      let array = [...displayTime];
      const find = array.find((time) => time.id === id);

      if (find === undefined) {
        let timeObj = {
          id: id,
          time: time++,
        };
        timeArray.push(timeObj);
        setDIsplaytime(timeArray);
        localStorage.setItem('time', JSON.stringify(timeArray));
      } else {
        let time = find.time;
        time++;
        find.time = time;

        const findIndex = array.findIndex((index) => index.id === id);
        array[findIndex] = find;

        setDIsplaytime(array);
        localStorage.setItem('time', JSON.stringify(array));
      }
    }, 1000);

    setInterIdval(InterId);

    const isActive = tasksData.map((item) => {
      if (item.id === id) {
        item.active = true;
      }
      return item;
    });
    setTaskData(isActive);

    fetch('http://localhost:3000/timelogs/', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskTime),
    });
  }

  function stop(id) {
    clearInterval(interValId);

    const isActive = tasksData.map((item) => {
      if (item.id === id) {
        item.active = false;
      }
      return item;
    });
    setTaskData(isActive);

    fetch('http://localhost:3000/timelogs')
      .then((results) => results.json())
      .then((data) => {
        const test = data.filter((item) => item.end === '');

        fetch(`http://localhost:3000/timelogs/${test[0].id}`, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ end: dayjs() }),
        });

        tasksData.map((item) => {
          if (item.id === id) {
            item.active = false;
          }
        });
      });
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTaskData(tasksData.filter((task) => task.id !== id));

      const newArray = displayTime.filter((task) => task.id !== id);
      setDIsplaytime(newArray);
      localStorage.setItem('time', JSON.stringify(newArray));
    });
  };

  return (
    <div className="timeTracker">
      {tasksData &&
        tasksData.map((data) => (
          <div className="cardTime" key={data.id}>
            <p>{data.titel}</p>
            {displayTime &&
              displayTime.map((item) => {
                if (item.id === data.id) {
                  return <p key={data.id}>{item.time}</p>;
                }
              })}
            <button id="Play" disabled={data.active} onClick={() => play(data.id)}>
              Play
            </button>
            <button disabled={!data.active} onClick={() => stop(data.id)}>
              Stop
            </button>
            <button onClick={() => deleteTask(data.id)}>Delete task</button>
          </div>
        ))}
    </div>
  );
}
