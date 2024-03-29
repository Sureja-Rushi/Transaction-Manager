import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlPath = window.location.pathname;
  const pathParts = urlPath.split("/");

  const id = pathParts[pathParts.length - 1];

  const userId = localStorage.getItem("userId");

  //   const get = axios
  //     .get(`http://localhost:8080/account/${id}`)
  //     .then((response) => {
  //       account = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //     const [accountAttributes, setAccountAttributes] = useState({
  //       accountName: account.accountName,
  //       accountNumber: account.accountNumber,
  //       description: account.description,
  //       priority: account.priority,
  //     });

  const [accountAttributes, setAccountAttributes] = useState({
    accountName: "",
    description: "",
    type: "",
    priority: "",
    currentBalance: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/account/${userId}/${id}`
        );
        const accountData = response.data;
        setAccountAttributes({
          accountName: accountData.accountName,
          description: accountData.description,
          type: accountData.type,
          priority: accountData.priority,
          currentBalance: accountData.currentBalance,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  console.log(accountAttributes);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAccountAttributes({
      ...accountAttributes,
      [name]: value,
    });
  };

  const onSubmitHandler = (event) => {
    // dispatch(createnewAccount(accountAttributes));
    axios
      .put(`http://localhost:8080/account/${userId}/${id}`, accountAttributes)
      .then((response) => {
        navigate("/dashboard");
        alert("success");
        // console.log(newAccount);
      })
      .catch((error) => {
        alert(error);
      });
    event.preventDefault();
  };

  return (
    <div>
      <div className="project">
        <div className="container mx-auto py-4 pb-8 w-screen flex justify-center h-full">
          <div className="mx-4 w-[60%] ">
            <div className="col-span-2 md:col-span-1 mx-auto">
              <h5 className="text-4xl text-center">Update Wallet</h5>
              <hr className="border-t border-gray-400 my-6 w-[100%] m-auto " />
              <form onSubmit={(event) => onSubmitHandler(event)}>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 leading-tight bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Account Name"
                    name="accountName"
                    value={accountAttributes.accountName}
                    onChange={(e) => {
                      onChangeHandler(e);
                      console.log(accountAttributes.accountName);
                    }}
                  />
                </div>
                {/* <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 leading-tight bg-gray-200 border rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Account No"
                    name="accountNumber"
                    value={accountAttributes.accountNumber}
                    onChange={onChangeHandler}
                  />
                </div> */}
                <div className="mb-4">
                  <textarea
                    className="w-full px-4 py-3 leading-tight bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Description"
                    name="description"
                    value={accountAttributes.description}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <div className="text-xl flex">
                    <label>Transaction type:</label>
                    <div className="px-2">
                      <label className="">
                        <input
                          type="radio"
                          value="1"
                          name="type"
                          checked={accountAttributes.type == 1}
                          className="mx-2"
                          // onChange={onChangeHandler}
                        />
                        Transaction Record
                      </label>
                      <label className="ms-4">
                        <input
                          type="radio"
                          value="2"
                          name="type"
                          checked={accountAttributes.type == 2}
                          className="mx-2"
                          // onChange={onChangeHandler}
                        />
                        Expense Account
                      </label>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-red-600">* You cannot change the type of account after created</p>
                  </div>
                </div>

                <div className="mb-4">
                  <select
                    className="w-full  px-4 py-3 leading-tight bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
                    name="priority"
                    value={accountAttributes.priority}
                    onChange={onChangeHandler}
                  >
                    <option value="3">Display Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className=" w-fit mx-auto flex text-2xl px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                  value="Save Changes"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
