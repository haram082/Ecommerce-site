import React from 'react'
import useGetData from '../custom_hooks/useGetData'

const AllUsers = () => {
    const {data: usersData, loading} = useGetData("users")
  return (
    <div>
      <h4 className='fw-bold '> Users ({usersData.length})</h4>
      <table className='table'>
      <thead>
        <tr>
          <th>Profile Pic</th>
          <th>UserName</th>
          <th>Email</th>
        </tr>
        </thead>
        <tbody>
            {
            loading? <div className="custom-loader"></div>:
            usersData?.map(item=>(
                <tr key={item.uid}>
                  <td><img src={item.photoURL} alt=""/></td>
                  <td>{item.displayName}</td>
                  <td>{item.email}</td>
                </tr>
              ))
            
            }
        </tbody>
        </table>
    </div>
  )
}

export default AllUsers
