import React from "react";
const mapStateToProps = (state) => ({
    login: state.auth.data && state.auth.data.sub.login,
});
export default mapStateToProps