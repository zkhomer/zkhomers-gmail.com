import {connect} from "react-redux";
import actionFetch from "../action/actionFetch";
import delay from "./delay";


const CPromiseStatus = connect(
    (state) => ({children: state.promise.status}),
    {
        onClick: () => actionFetch(delay(2000)),
    }
)("div");
export default CPromiseStatus