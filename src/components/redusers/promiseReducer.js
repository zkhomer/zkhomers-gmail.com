import React from "react";

export default function promiseReducer(state, { type, key, ...action }) {
    if (!state) {
        return {};
    }
    if (type === "PROMISE") {
        return { ...state, [key]: action, };
    }
    return state;
}