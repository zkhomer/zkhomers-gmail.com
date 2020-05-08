import {connect} from "react-redux";
import actionRegister from "../action/actionRegister";
import RegistrationForm from "../form/RegistraionForm";

const CRegForm = connect(null, {onReg: actionRegister})(RegistrationForm)
export default CRegForm