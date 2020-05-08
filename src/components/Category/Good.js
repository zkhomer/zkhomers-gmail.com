import {Link} from "react-router-dom";
import React from "react";
import {actionAdd, actionRemove} from "../redusers/basketReducer";
import {connect} from "react-redux"
const Good = ({good, onAdd, onRemove, cart }) => <div>
    <button onClick={(event)=> onAdd(good._id)}>++</button>
    <button disabled={!cart[good._id]} onClick={(event)=> onRemove(good._id)}>XXXX</button>

    <Link to={`/good/${good._id}`}>
        {good.name}
    </Link>
</div>
export default connect ((state)=>({cart:state.basket}) ,{onAdd:actionAdd, onRemove:actionRemove})(Good)
