import React from 'react';
import avatar from '../../images/profile.svg';
import { NavLink } from 'react-router-dom';

export default class SideBar extends React.Component {

    handleButtons = () => {
        if(this.props.path === "/edit-profile"){
            return (
                <div>
                    <NavLink className="edit-dets btn-login" to='/profile'>Cancel</NavLink>
                    <NavLink className="edit-pwd" to='/edit-pwd'>Change Password</NavLink>
                </div>
            )
        }else if(this.props.path === "/edit-pwd"){
            return (
                <div>
                    <NavLink className="edit-dets btn-login" to='/edit-profile'>Edit details</NavLink>
                    <NavLink className="edit-pwd" to='/profile'>Cancel</NavLink>
                </div>
            )
        }else {
            return (
                <div>
                    <NavLink className="edit-dets btn-login" to='/edit-profile'>Edit details</NavLink>
                    <NavLink className="edit-pwd" to='/edit-pwd'>Change Password</NavLink>
                </div>
            )
        }
    }

    render() {
        //console.log(this.state)
        const { name,email } = this.props;
        return (
                <div className="profile-sidebar">
                    <img src={avatar} alt="avatar"></img>
                    <h4 className="name">{name}</h4>
                    <span className="email">{email}</span>

                    {this.handleButtons()}
                </div>
                )}
}
