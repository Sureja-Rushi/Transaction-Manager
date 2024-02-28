import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Transactions = (props) => {

  const navigate = useNavigate();

    const transaction = props.transaction;
    console.log(transaction.account);

    const handleDelete = () => {
      if (confirm(`Are you sure to delete transaction?`)) {
        axios
          .delete(`http://localhost:8080/transaction/${transaction.account.id}/${transaction.id}`)
          .then((response) => {
            window.location.reload();
            // alert("deleted Successfully...");
          })
          .catch((error) => {
            alert(error);
          });
      }
    };

    const handleUpdate = () => {
      navigate(`/updatetransaction/${transaction.account.id}/${transaction.id}`, {state : {account : transaction.account}});
    }

  return (
    <div>
        <div className={`w-full grid grid-cols-4 p-2 text-xl my-1 ${transaction.type == 1 ? "bg-green-300" : "bg-red-300" } `}>
            <p>{transaction.transactionDate}</p>
            <p>{transaction.description}</p>
            <p>{transaction.amount}</p>
            <div className="grid grid-cols-2">
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleUpdate} >Update</button>
            </div>
        </div>
    </div>
  );
};

export default Transactions;
