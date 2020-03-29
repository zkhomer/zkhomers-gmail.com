import React, {useState} from "react";
import Btn from "./Btn";

const RangeInput = (props) => {
    const [password, setPassword] = useState('asd')
    const [validPassword, setValidPassword] = useState('asd')

    return (
        <form className='form_registration' >
            <input

                className='input_password'
                placeholder='password'
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={password.length < props.min || password.length > props.max ? {backgroundColor: "red"} : {backgroundColor: "green"}}
            />
            <input

                type="text"
               className='check_password'
                placeholder="password"
                value={validPassword}
                onChange={e => setValidPassword(e.target.value)}
                style={validPassword.length < props.min || validPassword.length > props.max ? {backgroundColor: "red"} : {backgroundColor: "green"}}
            />
            <Btn valueV={validPassword}  valueP={password} />
        </form>
    )
}


export default RangeInput