import React from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {connect, Provider} from "react-redux";
import * as jwt_decode from "jwt-decode";
import thunk from 'redux-thunk';

function authReducer(state, action) {
    if (!state) {
        if (!localStorage.authToken) {
            return {};
        } else {
            action.type = "AUTH_LOGIN";
            action.token = localStorage.authToken;
        }
    }

    if (action.type === "AUTH_LOGIN") {
        const jwt = action.token;
        console.log(jwt);
        const data = jwt_decode(jwt);
        console.log(data);
        localStorage.setItem("authToken", jwt);

        return {jwt: jwt, data: data};
    }
    if (action.type === "AUTH_LOGOUT") {
        localStorage.setItem("authToken", "");
        return {};
    }

    return state;
}

// function registerReducer(state, action) {
//   if (!state) {
//     return {}
//   } if (action.type === "REGISTER") {
//     const data = action.payload
//     console.log(data);

//     return { data }
//   }
// }
class LoginForm extends React.Component {
    state = {
        login: "",
        password: "",
    };

    render() {
        const valid = true;

        return (
            <>
                <div>
                    <input
                        type="text"
                        placeholder="Login..."
                        value={this.state.login}
                        onChange={(e) => this.setState({login: e.target.value})}
                        style={{
                            backgroundColor: !valid ? "#f0999f" : "",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password..."
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        style={{
                            backgroundColor: !valid ? "#f0999f" : "",
                        }}
                    />
                    <button
                        onClick={() =>
                            this.props.onLogin(this.state.login, this.state.password)
                        }
                        disabled={!valid}
                    >
                        OK
                    </button>
                </div>
            </>
        );
    }
}

function promiseReducer(state, {type, key, ...action}) {
    if (!state) {
        return {};
    }
    if (type === "PROMISE") {
        return {...state, [key]: action,};
    }
    return state;
}


const reducers = combineReducers({
    //создаем функцию-обертку, которая запустит последовательно counterReducer и booleanReducer передав им ветви c и b хранилища и обновив эти же ветви в случае нового состояния.
    auth: authReducer,
    promise: promiseReducer
    //reg: registerReducer
});

const store = createStore(reducers, applyMiddleware(thunk)) //вторым параметром идет миддлварь

store.subscribe(() => console.log(store.getState()));
const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

const actionFetch = (key, promise) => {
    const actionPending = () => {
        return {status: "PENDING", payload: null, error: null, type: "PROMISE", key};
    };
    const actionResolved = (payload) => {
        return {status: "RESOLVED", payload, error: null, type: "PROMISE", key};
    };
    const actionRejected = (error) => {
        return {status: "REJECTED", payload: null, error: error, type: "PROMISE", key};
    };
    return async dispatch => { //возвращаем функцию.
        dispatch(actionPending())
        try {
            let resolved = await promise
            dispatch(actionResolved(resolved))
            return resolved
        } catch (error) {
            dispatch(actionRejected(error))
        }


    }
}

class RegistrationForm extends React.Component {
    state = {
        login: "",
        password: "",
    };

    render() {
        const valid = true;

        return (
            <>
                <div>
                    <input
                        type="login"
                        placeholder="Login"
                        value={this.state.login}
                        onChange={(e) => this.setState({login: e.target.value})}
                        style={{
                            backgroundColor: !valid ? "#f0999f" : "",
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}
                        style={{
                            backgroundColor: !valid ? "#f0999f" : "",
                        }}
                    />
                    <button
                        onClick={() =>
                            this.props.onReg(this.state.login, this.state.password)
                        }
                        disabled={!valid}
                    >
                        OK
                    </button>
                </div>
            </>
        );
    }
}


const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
    fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify({query, variables}),
    }).then((res) => res.json());

let GQL = getGQL("http://chat.fs.a-level.com.ua/graphql");

function actionLogin(login, password) {
    return (async dispatch => {


        let token = await dispatch(actionFetch("login", GQL(
            `query login($login: String, $password: String){
          login(login: $login, password: $password)
      }`,
            {login, password}
        )))

        dispatch(actionAuthLogin(token.data.login))
    })
}

function actionRegister(login, password) {
    return (async dispatch => {


        let reg = await dispatch(actionFetch("reg", GQL(
            `mutation reg($login: String, $password: String){
          UserUpsert(user: {login:$login, password: $password})
          {_id 
            login
          }
      }`,
            {login, password}
            )
        ))
        let token = await dispatch(actionFetch("login", GQL(
            `query login($login: String, $password: String){
          login(login: $login, password: $password)
      }`,
            {login, password}
        )))

        dispatch(actionAuthLogin(token.data.login))

        dispatch(actionAuthRegister(reg.data._id))
        console.log(reg)

    })
}

const mapStateToProps = (state) => ({
    login: state.auth.data && state.auth.data.sub.login,
});
const mapStateToReg = (state) => ({
    _id: state.data && state.data.sub._id,
});

const UserName = ({login}) =>
    login ? <a href="/dashboard">{login}</a> : <span>Anon</span>;

const UserNameAfterregistration = ({reg}) =>
    reg ? <a href="/dashboard">{reg}</a> : <span>Anon</span>;

const actionAuthLogin = (token) => ({type: "AUTH_LOGIN", token});
const actionAuthRegister = (reg) => ({type: "REGISTER", reg});
const actionAuthLogout = () => ({type: "AUTH_LOGOUT"});

const CLogoutButton = connect(
    (state) => ({children: "logout", disabled: !state.auth.data}),
    {
        onClick: actionAuthLogout,
    }
)("button");

const CPromiseStatus = connect(
    (state) => ({children: state.promise.status}),
    {
        onClick: () => actionFetch(delay(2000)),
    }
)("div");
const CUserName = connect(mapStateToProps)(UserName);
const CUserNemtAfterRegistration = connect(mapStateToReg)(UserNameAfterregistration)


const CLoginForm = connect(null, {onLogin: actionLogin})(LoginForm)
const CRegForm = connect(null, {onReg: actionRegister})(RegistrationForm)
const App = () => {

    return (
        <>
            <Provider store={store}>
                <div><CUserName/></div>
                <div>
                    <CUserNemtAfterRegistration/>
                </div>
                <CLoginForm/>
                <CRegForm/>
                <CLogoutButton/>
                <CPromiseStatus/>
            </Provider>
        </>
    );
};

export default App;
