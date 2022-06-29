import React, { createContext, useReducer } from "react";
import { Route, Switch } from 'react-router';
import Navbar from './components/Navbar'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Search from './components/Search';
import Userprofile from './components/Userprofile';
import Editprofile from './components/Editprofile';
import ViewProfile from "./components/ViewProfile";
import { initialState, reducer } from "./reducer/UseReducer";
export const UserContext = createContext();

const Routing = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path="/userprofile" component={Userprofile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/viewprofile/:id" component={ViewProfile} />
            <Route exact path="/editprofile" component={Editprofile} />
            <Route exact path="/logout" component={Logout} />

        </Switch>
    )
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

    return (

        <>
            <UserContext.Provider value={{ state, dispatch }}>
                <Navbar />
                <Routing />
            </UserContext.Provider>
        </>
    );
}

export default App;
