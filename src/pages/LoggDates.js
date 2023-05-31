import { useEffect } from "react"
import { useState } from "react"
import dayjs from 'dayjs'


export default function AllTasks() {
    const [data, setData] = useState()
    const [timeData, setTimedata] = useState()
    const [dropDown, setDropdown] = useState()
    const [filterDate, setFilterData] = useState()
    const [test, settest] = useState(false)


    useEffect(() => {
        fetch("http://localhost:3000/tasks")
        .then((results) => results.json())
        .then((data) => setData(data))

        fetch("http://localhost:3000/timelogs")
        .then((results) => results.json())
        .then((data) => {

        data.forEach(time => {
        const start = dayjs(time.start)
        const end = dayjs(time.end)
        time.totalTime = end.diff(start)
        time.start = dayjs(start).format('DD/MM/YYYY')
        time.end = dayjs(start).format('DD/MM/YYYY')
        });
        
        const titelReduce = [...data.reduce((map, obj) =>map.set(obj.start, obj)
        ,new Map()).values()]

        setDropdown(titelReduce)
        
        setTimedata(data)
        setFilterData(data)
    })},[test])

    const filterData = (e) => {
        const filter = timeData.filter(date => date.start === e)
        setFilterData(filter)}
    
    const deleteTime = (id,taskid) => {
        fetch(`http://localhost:3000/timelogs/${id}`, {
            method: 'DELETE'
    }).then(settest(!test))

    let oldObject = JSON.parse(localStorage.getItem('time'))
    const index = oldObject.findIndex(item => item.id === taskid)
    oldObject[index].time = 0
    localStorage.setItem('time', JSON.stringify(oldObject))
}

  return (
    <div className="loggDiv">
             <select onChange={(e) => filterData(e.target.value)}>
                {dropDown && dropDown.map((date) => (
                    <option key={date.id} value={date.start}>{date.start}</option>
                ))}
            </select>
            {filterDate && filterDate.map((time) => (
                <div className="loggCard" key={time.id}>
                    <p>{time.start}</p> 
                    <p>id: {time.id}sekunder: {time.totalTime/ 1000}s</p>
                    <button onClick={() => deleteTime(time.id, time.taskId)}>delete time</button>
                </div>
            )) }   
    </div>
  )
}
