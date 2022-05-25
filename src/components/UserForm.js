import React, { useEffect, useState } from 'react'

const UserForm = ({handleSubmitData, btnText, selectedUser}) => {
    const [user, setuser] = useState({
        username: "",
        email: ""
    })
    const {username, email} = user;

    const handleChange = (e) => {
        const selectedfield = e.target.name;
        const selectedValue = e.target.value;

        setuser((prevState)=>{
            return {...prevState, [selectedfield]: selectedValue}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSubmitData(user);

        setuser({
            username: "",
            email: ""
        })
    }

    useEffect(()=>{
        setuser({
            username: selectedUser.username,
            email: selectedUser.email
        })
    }, [selectedUser])
  return (
    <form onSubmit={handleSubmit}>
        <div className='field-group'>
            <label htmlFor='username'>Username</label>
            <input type="text" id="username" name="username" 
            value={username} onChange={handleChange} required />
        </div>

        <div className='field-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" id="email" name="email" value={email} 
            onChange={handleChange} required />
        </div>
        <button type="submit" className='btn'>{btnText}</button>
    </form>
  )
}

UserForm.defaultProps = {
    selectedUser: {
        username: "",
        email: ""
    }
}

export default UserForm