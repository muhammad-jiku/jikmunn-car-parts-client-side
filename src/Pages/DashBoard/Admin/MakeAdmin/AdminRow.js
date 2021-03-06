import React from 'react';
import { toast } from 'react-toastify';

const AdminRow = ({ user, idx, refetch }) => {
  const { email, role } = user;
  const makeAdmin = () => {
    fetch(`https://jikmunn-carmania.herokuapp.com/user/admin/${email}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error('Failed to make an admin');
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        if (data?.modifiedCount > 0) {
          refetch();
          toast.success(`${email} successfully included as admin`);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <tr>
      <th style={{ backgroundColor: '#F3EEEE' }}>{idx + 1}</th>

      <th style={{ backgroundColor: '#F3EEEE' }}>{email}</th>

      <th style={{ backgroundColor: '#F3EEEE', color: 'black' }}>
        {role === 'admin' ? (
          <>
            <button className="btn font-bold uppercase" disabled>
              <span className="text-black"> Admin</span>
            </button>{' '}
            {/* <button className="btn font-bold uppercase text-white ml-2">
              Remove Admin
            </button> */}
          </>
        ) : (
          <button
            className="btn font-bold uppercase text-white"
            onClick={makeAdmin}
          >
            Make Admin
          </button>
        )}
      </th>
    </tr>
  );
};

export default AdminRow;
