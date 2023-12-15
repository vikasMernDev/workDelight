import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './style.css'

const UserList = () => {
    const [list, setlist] = useState([])
    const [loading, setLoading] = useState(false)
    const getList = async () => {
        setLoading(true)
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'app-id': '657b290e16f83b328fe7c052',
            },
        };

        try {
            const response = await fetch('https://dummyapi.io/data/v1/user', requestOptions);

            if (response.ok) {
                const data = await response.json();
                setlist(data.data)
                setLoading(false)
                console.log("List of users:", data.data); // Access the list of users here
                return data.data; // Return the list of users if needed elsewhere in your code
            } else {
                console.error('Failed to fetch users:', response.status, response.statusText);
                return []; // Return an empty array or handle error case as needed
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            return []; // Return an empty array or handle error case as needed
        }
    };


    useEffect(() => {
        getList()
    }, [])
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    
        if (confirmDelete) {
          try {
            const requestOptions = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                'app-id': '657b290e16f83b328fe7c052',
              },
            };
    
            const response = await fetch(`https://dummyapi.io/data/v1/user/${id}`, requestOptions);
    
            if (response.ok) {
                alert('User Deleted successfully')
                getList()
              // Handle successful deletion, for example, navigate to a different page
            } else {
              console.error('Failed to delete user:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        }
      };
    return (
        <div className='container'>
            <div className='createButton'>
                <NavLink to="/private/create-user" className="navLinkButton">
                    <Button variant="contained" color="primary">
                        Create User
                    </Button>
                </NavLink>
                <NavLink to="/" className="navLinkButton">
                    <Button variant="contained" color="primary" onClick={()=>localStorage.setItem('email','')}>
                        Logout
                    </Button>
                </NavLink>
            </div>
            <div className='table-body'>
                {

                    loading ? <p>....loading</p> :
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row) => (
                            <tr key={row.id}>
                                <td>{row.title}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>
                                    <NavLink to={`/private/edit-user/${row.id}`} className="navLinkButton"  style={{marginRight:'10px'}}>
                                        <Button variant="contained" color="primary">
                                            Edit
                                        </Button>
                                    </NavLink>
                               
                                    <Button variant="contained" color="secondary" onClick={()=>handleDelete(row.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                }
            </div>
        </div>
    )
}

export default UserList
