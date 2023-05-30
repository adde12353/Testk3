import dayjs from 'dayjs'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export default function TimeTracker() {
  
    const[tasksData, setTaskData] = useState(null)
    const [interValId, setInterIdval] = useState()
    const [displayTime, setDIsplaytime] = useState(JSON.parse(localStorage.getItem('time')))
    

useEffect(() => {
  fetch("http://localhost:3000/tasks")
  .then((results) => results.json())
  .then((data) => {
    setTaskData(data)})
},[])

function play(id) {
  const taskTime = {
      taskId: id,
      start: dayjs(),
      end: "",
  }
  
   let time = 0
   let timeArray= []
   const InterId = setInterval(() => {

    let array = JSON.parse(localStorage.getItem('time'))
      if(array === null ) {
        let timeObj = {
          id: id,
          time: time++
        }
        timeArray.push(timeObj)
        console.log(timeArray)
        setDIsplaytime(timeArray)
        localStorage.setItem('time', JSON.stringify(timeArray))
        } else {
          
          let find = array.find(time => time.id === id)
          if(find === undefined){
            let timeObj = {
              id: id,
              time: time++,
              interValId: InterId
            }
            array.push(timeObj)
            localStorage.setItem('time', JSON.stringify(array))
          } else {
            let time = find.time
            time++
            find.id = id
            find.time = time
            find.interValId = InterId
            console.log(find)
            
            const findIndex = array.findIndex(index => index.id === id)

            array[findIndex] = find
  
            localStorage.setItem('time', JSON.stringify(array))
            setDIsplaytime(array)
          }
        }}, 1000)
    setInterIdval(InterId)  

  const isActive = tasksData.map((item) => {
    if(item.id === id) {
      item.active = true
    }
    return item
  })
  setTaskData(isActive)

  fetch(`http://localhost:3000/timelogs/`, {
            method: 'post',
            headers: {'Accept' : 'application/json',
            'Content-Type' : 'application/json'},
            body:JSON.stringify(taskTime)
          }) 
}

function stop(id) { 
  let abortInterval = JSON.parse(localStorage.getItem('time')).find(item => item.id === id)
  abortInterval = abortInterval.interValId
  clearInterval(abortInterval)

  const isActive = tasksData.map((item) => {
    if(item.id === id) {
      item.active = false
    }
    return item
  })
  setTaskData(isActive)

  fetch("http://localhost:3000/timelogs")
  .then((results) => results.json())
  .then((data) => {
    const test = data.filter(item => item.end === "")
    
    fetch(`http://localhost:3000/timelogs/${test[0].id}`, {
      method: 'PATCH',
      headers: {'Accept' : 'application/json',
      'Content-Type' : 'application/json'},
      body:JSON.stringify({end: dayjs()})
    })

    tasksData.map(item => {
      if(item.id === id){
       item.active = false
      }
    })
  }) 
}


const deleteTask = (id) => {
  console.log(id)
  fetch(`http://localhost:3000/tasks/${id}`, {
  method: 'DELETE'})
  .then(setTaskData(tasksData.filter(task => task.id !== id)))

  console.log(tasksData)
  const oldTimeArray = JSON.parse(localStorage.getItem('time'))

  const newArray = oldTimeArray.filter(task => task.id !== id) // change this one 
  localStorage.setItem('time', JSON.stringify(newArray))
}


return (
<div className="timeTracker">
    { tasksData &&
      tasksData.map((data) => (
        <div className='cardTime' key={data.id}>
          <p>{data.titel}</p>
          {displayTime && displayTime.map((item) => {
              if(item.id === data.id){
                return <p key={data.id}>{item.time}</p>}
            })}
          <button disabled={data.active} onClick={() => {play(data.id)}}>Play</button>
          <button 
         disabled={!data.active}
          onClick={() => {stop(data.id)}}>Stop</button>
        
          <button onClick={() => {deleteTask(data.id)}}>Delete task</button>
        </div>
        ))}      
</div>  
  )
}
