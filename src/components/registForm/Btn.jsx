import React from "react";

const Btn = (props) => {
    return (
        <button
            className='btn_form'
            onClick={() => (props.valueP) === (props.valueV) ? alert("Пароли Совпали ") : alert('Пароли не совпали!')}
        >
            send
        </button>
    )
}

export default Btn