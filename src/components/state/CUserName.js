import {connect} from "react-redux";
import mapStateToProps from "./mapStateToProps";
import React from "react";
const UserName = ({login}) =>
    login ? <a href="/dashboard">Hello, {login}</a> : <span>Anon</span>;

const CUserName = connect(mapStateToProps)(UserName);
export default CUserName