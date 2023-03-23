import './App.css';
import Drawing from './Component/Drawing';
import Login from "./Forms/Login";
import Register from "./Forms/Register"
import { createContext, useEffect, useState } from 'react';
import Myflowchart from './Other Component/Myflowchart';
import axios from "axios"
import Loading from './Other Component/Loading';
import Homepage from './Pages/Homepage';
import Simulator from './Pages/Simulator';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const UserContext = createContext(null);
export { UserContext }
const App = () => {
  let history = useHistory();
  const [user, setuser] = useState([]);
  const [userexist, setuserexist] = useState(false);
  const [projectname, setprojectname] = useState("");
  const [projectdata, setprojectdata] = useState([]);
  const [projectId, setprojectId] = useState('');
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('userexist') === "true") {
      setuserexist(true);
    }
    if (localStorage.getItem('user') !== "null") {
      setuser(JSON.parse(localStorage.getItem('user')));
    }
    if (localStorage.getItem('projectId') !== "null") {
      setprojectId(localStorage.getItem('projectId'));

    }
    if (localStorage.getItem('projectDetails') !== "null") {
      setprojectdata(JSON.parse(localStorage.getItem('projectDetails')));
    }
    if (localStorage.getItem('projectName') !== "null") {
      setprojectname(localStorage.getItem('projectName'));
    }
    localStorage.getItem('userexist')
  }, [userexist])
  return (
    <div className="app">
      {loading === true ? <Loading /> : null}
      <UserContext.Provider value={{ user, setuser, userexist, setuserexist, projectname, setprojectname, projectdata, setprojectdata, loading, setloading, projectId, setprojectId }} >
        {userexist === true ?
          <Router>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/simulator' component={Simulator} />
              <Route exact path='/Register' component={Register} />
              <Route exact path='/myflowcharts' component={Myflowchart} />
              <Route exact path='/flowchart/:id' component={Drawing} />
              <Route exact path='/login' component={Login} />
              <Route path='*' component={Homepage} />
            </Switch>
          </Router>
          :
          <Router>
            <Switch>
              <Route exact path='/' component={Homepage} />
              <Route exact path='/simulator' component={Simulator} />
              <Route exact path='/Register' component={Register} />
              <Route exact path='/myflowcharts' component={Homepage} />
              <Route exact path='/flowchart/:id' component={Homepage} />
              <Route exact path='/login' component={Login} />
              <Route path='*' component={Homepage} />
            </Switch>
          </Router>
        }

      </UserContext.Provider>
    </div>
  );
}

export default App;