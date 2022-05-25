import { useEffect, useState } from 'react'
import UserForm from './UserForm';

const URL = "https://rest-api-without-db.herokuapp.com/users/";

const Http = () => {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [isloading, setIsLoading] = useState(true);

    //update
    const [selectedUser, setSelectedUser] = useState({
        username: "",
        email: ""
    });
    const [updateFlag, setUpdateFlag] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState("");

    const getAllUsers = () => {
        fetch(URL)
        .then((res)=>{
            if(!res.ok){
                throw Error("Could not Fetch")
            }else{
                return res.json();
            }
        })
        .then((data)=>{
            setUsers(data.users);
        })
        .catch((err)=>{
            setError(err.message);
        })
        .finally(()=>{
            setIsLoading(false);
        })
            
    }
  
    useEffect(()=>{
        getAllUsers();
    }, [])

    // delete user

    const handleDelete = (id) => {
        fetch(URL + `/${id}`, {
            method: "DELETE"
        })
        .then((res)=>{
            if(!res.ok){
                throw Error("Could not Delete")
            }
            getAllUsers();
        })
        .catch((err)=>{
            setError(err.message);
        })
    }

    // add/create user

    const addUser = (user) => {
        fetch(URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((res)=>{
            if(res.status === 201){
                getAllUsers();
            }else{
                throw new Error("could not create new user")
            }
            
        })
        .catch((err)=>{
            setError(err.message);
        })
    }

    //update/edit data

    const handleEdit = (id) => {
       const filteredData = users.filter((user)=> user.id === id);
       setSelectedUser({
           username: filteredData[0].username,
           email: filteredData[0].email
       })
       setUpdateFlag(true);
       setSelectedUserId(id);
    }

    const handleUpdate = (user) => {
        fetch(URL + `/${selectedUserId}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error("failed to update data")
            }
            getAllUsers();
            setUpdateFlag(false);
        })
        .catch((err)=>{
            setError(err.message);
        })
    }

    return(
        <div className='http'>
            <h1>User Management App 2022</h1>
            {isloading && <h2>Loading...</h2>}
            {error && <h2>{error.message}</h2>}
            
            {updateFlag ? (
            <UserForm btnText="Update User" selectedUser={selectedUser}
            handleSubmitData={handleUpdate}/>
            ) : (
            <UserForm btnText="Add User"  handleSubmitData={addUser}/>
            )}

            <section>
            {users && users.map((user)=>{
                const {id, username, email} = user;
                return(
                    <article key={id} className="card">
                        <p>{username}</p>
                        <p>{email}</p>
                        <button className='btn' onClick={()=> handleEdit(id)}>Edit</button>
                        <button className='btn' onClick={()=> handleDelete(id)}>Delete</button>
                    </article>
                )
            })}
            </section>
        </div>
    )
}

export default Http;