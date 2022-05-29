import React from 'react';
import { toast } from 'react-toastify';

function ConfirmDeleteOrderModal({
  refetch,
  confirmDeleteOrderModal,
  setConfirmDeleteOrderModal,
}) {
  const { _id, userName, orderName } = confirmDeleteOrderModal;

  const handleDelete = (id) => {
    console.log(confirmDeleteOrderModal);
    fetch(`https://jikmunn-carmania.herokuapp.com/order/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage?.getItem('accessToken')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.acknowledged) {
          toast.success(
            `Dear ${userName}, ${orderName} is removed from your order`
          );
          setConfirmDeleteOrderModal(null);
          refetch();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input type="checkbox" id="confirm-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-700">
            Dear ${userName}, are you sure want to remove {orderName} from your
            orders?
          </h3>
          <div className="modal-action">
            <button
              className="btn btn-error text-white font-bold"
              onClick={() => handleDelete(_id)}
            >
              Yes
            </button>
            <label htmlFor="confirm-modal" className="btn">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteOrderModal;