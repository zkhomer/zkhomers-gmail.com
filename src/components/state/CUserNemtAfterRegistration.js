import {connect} from "react-redux";
import mapStateToReg from "./mapStateToReg ";
import React from "react";
import UserNameAfterregistration from "./UserNameAfterregistration";

const CUserNameAfterRegistration = connect(mapStateToReg)(UserNameAfterregistration)
export default CUserNameAfterRegistration