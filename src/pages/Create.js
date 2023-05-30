
import {Link, Outlet} from 'react-router-dom'



export default function Home() {
  
  return (
<div className="Home">
        <div className='dashBoard-header'>
        <Link to="/create/createtask">Skapa task</Link>
        <Link to="/create/createproject">Skapa projekt</Link>
        </div>
       
   <Outlet />
</div>




    
  )
}
