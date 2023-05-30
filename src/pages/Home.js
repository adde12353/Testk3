import {Link, Outlet} from 'react-router-dom'

export default function Home() {

  return (
<div className="Home">
        <div className='dashBoard-header'>
        <Link to="/alltasks">Alla Tasks</Link>
        <Link to="/allprojects">Alla projekt</Link>
        </div>
       
   <Outlet />
</div>
)
}
