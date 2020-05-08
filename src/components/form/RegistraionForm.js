import React from "react";

export default class RegistrationForm extends React.Component {
    state = {
        login: "",
        password: "",
    };

    render() {
        return (
            <>
                <div>
                    <input
                        type="text"
                        placeholder="Login"
                        value={this.state.login}
                        onChange={(e) => this.setState({login: e.target.value})}

                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.setState({password: e.target.value})}


                    />
                    <button
                        onClick={() =>
                            this.props.onReg(this.state.login, this.state.password)
                        }

                    >
                        RegistationNOW and Login
                    </button>
                </div>
            </>
        );
    }
}