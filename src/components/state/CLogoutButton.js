import {connect} from "react-redux";
import actionAuthLogout from "../action/actionAuthLogout";


const CLogoutButton = connect(
    (state) => ({children: "logout", disabled: !state.auth.data}),
    {
        onClick: actionAuthLogout,
    }
)("button");
export default CLogoutButton