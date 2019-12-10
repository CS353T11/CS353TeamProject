import React from 'react';
import avatar from '../../images/avatar.svg';
import { NavLink } from 'react-router-dom';

export default class SideBar extends React.Component {

    render() {
        //console.log(this.state)
        const { name,email } = this.props;
        return (
                <div className="user-details">
                    <div className="profile-id">
                        <img src={avatar} alt="avatar"></img><br></br>
                        <h1 className="title"></h1><h1 className="bold">{name}</h1>
                        <div><b className="bold">{email}</b></div>
                        <br/>
                        <div><NavLink to='/change_password' className="submit">Change password</NavLink></div><br/>
                        <div><NavLink to='/edit_profile'className="submit">Edit details</NavLink></div>
                    </div>
                </div>
                )}
}
