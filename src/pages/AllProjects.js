import { useContext,useState } from "react"
import {contextApp} from '../App'

export default function AllTasks() {
  const value = useContext(contextApp);
  
  const [data, setData] = useState(value)


    const deleteProject = (id) => {
      
    fetch(`http://localhost:3000/projects/${id}`, {
    method: 'DELETE'
    }).then(setData(value.filter(projekt => projekt.id !== id)))
    }

    
  return (
    <div>
            {data && data.map((project) => 
                (
                    <div className="cardTask" key={project.id}>
                        <p>{project.name}</p>
                        <button onClick={() => {deleteProject(project.id)}}>Delete Project</button>
                        
                    </div>
                )                        
            )}
    </div>
  )
}
