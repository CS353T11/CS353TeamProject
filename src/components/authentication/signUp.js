import React from 'react'

export default class signUp extends React.Component {
    render() {
        return (
        <div className="signUp">
            <form>
                <label>Username </label>
                <input type="text" name="username" />
                <br/>
                <label>Password</label>
                <input type="text" name="password" />
            </form>
        </div>
        )
    }
}