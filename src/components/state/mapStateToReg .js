import React from "react";

const mapStateToReg = (state) => ({
    _id: state.data && state.data.sub._id,
});
export default mapStateToReg