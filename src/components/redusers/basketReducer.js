import React from "react";

function basketReducer(state, {type, _id, count}) {
    if (!state) {
        return {}
    }
    if (type === 'CART_ADD') {
        return {...state, [_id]: state[_id] ? state[_id] + 1 : 1}
    }
    if (type === 'CART_CHANGE') {
        return {...state, [_id]: count}
    }
    if (type === 'CART_REMOVE') {
        let a = {...state}
        delete a[_id]
        return a
    }

    return state
}

export const actionAdd = (_id) => ({type: "CART_ADD", _id})
export const actionRemove = (_id) => ({type: "CART_REMOVE", _id})

export default basketReducer