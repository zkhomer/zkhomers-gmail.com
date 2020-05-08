import React from "react";

const UserNameAfterregistration = ({reg}) =>
    reg ? <a href="/dashboard">{reg}</a> : <span>Anon</span>;
    export default UserNameAfterregistration