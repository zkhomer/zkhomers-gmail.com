import React from "react";

const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))
export default delay