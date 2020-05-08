import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./authReducer";
import promiseReducer from "./promiseReducer";
import thunk from "redux-thunk";
import actionCategories from "../action/actionCategories";
import basketReducer,{actionAdd} from "./basketReducer";

const reducers = combineReducers({
    //создаем функцию-обертку, которая запустит последовательно counterReducer и booleanReducer передав им ветви c и b хранилища и обновив эти же ветви в случае нового состояния.
    auth: authReducer,
    promise: promiseReducer,
   basket: basketReducer
});
const store = createStore(reducers, applyMiddleware(thunk))

store.dispatch(actionCategories())
// store.dispatch(actionAdd("aaa"))
// store.dispatch(actionAdd("aaa"))
// store.dispatch(actionAdd("aaa"))
// store.dispatch(actionAdd("bbb"))
store.subscribe(()=> {console.log(store.getState())})
export default store