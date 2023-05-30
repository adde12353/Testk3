import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {createContext, useState, useEffect} from "react"
import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import CreateProject from './pages/CreateProject'
import LoggDates from './pages/LoggDates'
import './App.css'
import Footer from "./component/Footer";
import AllTasks from "./pages/AllTasks";
/* import AllProjects from "./pages/AllProjects"; */
import TimeTracker from './pages/timeTracker'
import Create from './pages/Create'

export const contextApp = createContext()


function App() {
  const [dataN, setData] = useState()
    
    useEffect(() => {
    fetch("http://localhost:3000/projects")
    .then((results) => results.json())
    .then((data) => {
    setData(data)
    })
    },[])
    console.log(dataN)

  return (
    
    
   <contextApp.Provider value={dataN}>
<BrowserRouter>
    <main>
    <Routes>
      <Route path="/" element={<Home/>}>
      <Route path="/alltasks" element={<AllTasks/>} />
{/*       <Route path="/allprojects" element={<AllProjects/>} />
 */}      </Route>
      <Route path="/create" element={<Create/>}>
      <Route path="/create/createtask" element={<CreateTask/>} />
      <Route path="/create/createproject" element={<CreateProject/>} />
      </Route>
      <Route path="/timetracker" element={<TimeTracker/>} />
      <Route path="/logg" element={<LoggDates/>} />
    </Routes>
    </main>
    <Footer/>
    </BrowserRouter>
   </contextApp.Provider>
   
  )
}

export default App
