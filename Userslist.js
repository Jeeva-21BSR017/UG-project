import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../components/Error";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import {deleteUser, getAllUsers} from "../actions/userActions";
export default function Userslist() {
    const dispatch = useDispatch()
    const usersstate = useSelector(state=>state.getAllUsersReducer)
    const {error , loading , users} = usersstate;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
   
      useEffect(() => {
  
          dispatch(getAllUsers())
          
      }, [])
      useEffect(() => {
        const results = users.filter((user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
      }, [searchTerm, users]);
    
      const handleSearch = (e) => {
        if (e.key === "Enter") {
          const results = users.filter((user) =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredUsers(results);
        }
      };
    return (
        <div>

            <h2>Users list</h2>
            {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
            <div className="search-container">
            <input
                type="text"
                placeholder="Search by email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearch}
                className="search-input"
            />
        </div>
       
       <table className='table table-striped table-bordered table-responsive-sm'>
           <thead className='thead-dark'>
         <tr>
             <th>User Id</th>
             <th>Name</th>
             <th>Email</th>
             <th>Delete</th>
         </tr>
           </thead>

           <tbody>
           {filteredUsers && filteredUsers.map(user => {
                   return <tr>
                       <td>{user._id}</td>
                       <td>{user.name}</td>
                       <td>{user.email}</td>
                       <td><i className='fa fa-trash'  style={{ border: '1px solid #ddd', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}  
                       onClick={()=>{dispatch(deleteUser(user._id))}}></i></td>
                   </tr>
               })}
           </tbody>

       </table>
        </div>
    )
}