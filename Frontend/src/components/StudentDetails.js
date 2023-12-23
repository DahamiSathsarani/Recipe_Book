import React, { useState, useEffect } from 'react';
import { getUsers } from '../API/User_API';;

function StudentDetails() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function fetchStudents() {
        const userData = await getUsers();
        setUsers(userData);
      }
  
      fetchStudents();
    }, []);
  
    return (
        <div>
          <h2>Student List</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>NIC</th>
                <th>Age</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
                
              {users.map((student) => (
                <tr key={student._id}>
                  <td>{student.user_id}</td>
                  <td>{student.user_name}</td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.nic}</td>
                  <td>{student.age}</td>
                  <td>{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }

export default StudentDetails;