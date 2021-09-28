import './App.css';
import Drawing from './Component/Drawing';
import Login from "./Forms/Login";
import Register from "./Forms/Register"
import { HashRouter as Router, Route, Link, Switch, useHistory, Redirect } from 'react-router-dom';
import Navbar from "./Other Component/MainNavbar";
import { createContext, useEffect, useState } from 'react';
import Myflowchart from './Other Component/Myflowchart';
import axios from "axios"
import Loading from './Other Component/Loading';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const UserContext = createContext(null);
export { UserContext }
const App = () => {
  let history = useHistory();
  const [user, setuser] = useState([]);
  const [userexist,setuserexist] = useState(false);
  const [projectname,setprojectname] = useState("");
  const [projectdata,setprojectdata] = useState([]);
  const [projectId,setprojectId] = useState('');
  const [loading,setloading] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('user')){
      setuser(JSON.parse(localStorage.getItem('user')));
    }
    if(localStorage.getItem('projectId')){
      setprojectId(localStorage.getItem('projectId'));

    }
    if(localStorage.getItem('projectDetails')){
      setprojectdata(JSON.parse(localStorage.getItem('projectDetails')));
    }
    if(localStorage.getItem('projectName')){
      setprojectname(localStorage.getItem('projectName'));
    }
  },[])
  return (
    <div className="app">
      {loading===true? <Loading />:null}
      <UserContext.Provider value={{ user, setuser, setuserexist, projectname,setprojectname, projectdata , setprojectdata, loading,setloading , projectId,setprojectId}} >
        {/* {userexist===true?<Navbar />:null} */}
        {user === null? 
        <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/Register' component={Register} />
          <Route exact path='/myflowcharts' component={Login} />
          <Route exact path='/flowchart/:id' component={Login} />
        </Switch>
      </Router>
        :
        <Router>
        <Switch>
          <Route exact path='/' component={Myflowchart} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/Register' component={Register} />
          <Route exact path='/myflowcharts' component={Myflowchart} />
          <Route exact path='/flowchart/:id' component={Drawing} />
        </Switch>
      </Router>
        }
        
      </UserContext.Provider>
    </div>
  );
}

export default App;