import React from "react";
import {Provider} from "react-redux";
import {Link, Route, Router} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
import CLogoutButton from "./components/state/CLogoutButton";
import CPromiseStatus from "./components/state/CPromiseStatus";
import CUserName from "./components/state/CUserName";
import CCategoriesList from "./components/Category/CategoriesList";
import CLoginForm from "./components/state/CLoginForm";
import CRegForm from "./components/state/CRegForm";
import CCategoryPage from "./components/state/CCategoryPage";
import store from "./components/redusers";
import Good from "./components/Category/Good";

const App = () => {
    return (
        <Provider store={store}>
            <Router history={createHistory()}>
                <div><CUserName/></div>
                <CLoginForm/>
                <CRegForm/>
                <CLogoutButton/>
                <Route path="/category/:_id" component={CCategoryPage}/>
                {/*<Route path="/good/:_id" component={CGoodPage}/>*/}
                <Route path="/category" component={CCategoriesList}/>
                <Link to={"/category"}>
                    <button>GO to category</button>
                </Link>

                {/*<CUserNameAfterRegistration/>*/}


                <CPromiseStatus/>
            </Router>
        </Provider>
    );
};

export default App;
