import {connect} from "react-redux";
import actionLogin from "../action/actionLogin";
import LoginForm from "../form/LoginForm";

const CLoginForm = connect(null, {onLogin: actionLogin})(LoginForm)
export default CLoginForm