import { useEffect } from "react"
import { useState } from "react"
import dayjs from 'dayjs'


export default function AllTasks() {
    const [data, setData] = useState()
    const [timeDataTask, setTimedataTask] = useState()
    const [reload, setReload] = useState(false)
    


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
        const results = Object.values(
            data.reduce((acc, item) => {
                acc[item.taskId] =  acc[item.taskId]
                ? {...item, totalTime: item.totalTime + acc[item.taskId].totalTime}
                :item;
                return acc
            }, {}))
    
        setTimedataTask(results)
    })
    },[])

   
   
 
    
  return (
    <div>
            {data && data.map((task) => 
                (
                    <div className="cardTask" key={task.id}>
                        <p id="title">{task.titel}</p>
                        {timeDataTask && timeDataTask.map((time) => 
                   { if(time.taskId == task.id){
                   return <div key={time.id}>
                    <p id="time">Sekunder:{time.totalTime / 1000}</p>
                </div>}}
            ) }
                    </div>
                )                        
            )}

            
          
    </div>
  )
}
