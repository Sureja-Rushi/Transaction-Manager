import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createnewAccount } from "../../actions/Actions";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();

  const [accountAttributes, setAccountAttributes] = useState({
    accountName: "",
    description: "",
    type: "",
    priority: "",
  });

  // const errors = useSelector(state => state.errors);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   setAccountAttributes(prevState => ({...prevState, errors}));
  // }, [errors]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setAccountAttributes({
      ...accountAttributes,
      [name]: value,
    });
  };

  const userId = localStorage.getItem("userId");

  const onSubmitHandler = (event) => {
    // dispatch(createnewAccount(accountAttributes));
    axios
      .post(`http://localhost:8080/account/${userId}`, accountAttributes)
      .then((response) => {
        alert("success");
        navigate("/dashboard");
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
              <h5 className="text-4xl text-center">Create Wallet</h5>
              <hr className="border-t border-gray-400 my-6 w-[100%] m-auto " />
              <form onSubmit={(event) => onSubmitHandler(event)}>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 leading-tight bg-gray-200 border rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Account Name"
                    name="accountName"
                    onChange={onChangeHandler}
                  />
                </div>
                {/* <div className="mb-4">
                  <input
                    type="text"
                    className="w-full px-4 py-3 leading-tight bg-gray-200 border rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Account No"
                    name="accountNumber"
                    onChange={onChangeHandler}
                  />
                </div> */}
                <div className="mb-4">
                  <textarea
                    className="w-full px-4 py-3 leading-tight bg-gray-200 border rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Description"
                    name="description"
                    onChange={onChangeHandler}
                  ></textarea>
                </div>
                <div className="text-xl mb-4 flex">
                  <label>Transaction type:</label>
                  <div className="px-2">
                    <label className="">
                      <input
                        type="radio"
                        value="1"
                        name="type"
                        className="mx-2"
                        onChange={onChangeHandler}
                      />
                      Transaction Record
                    </label>
                    <label className="ms-4">
                      <input
                        type="radio"
                        value="2"
                        name="type"
                        className="mx-2"
                        onChange={onChangeHandler}
                      />
                      Expense Account
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <select
                    className="w-full  px-4 py-3 leading-tight bg-gray-200 border rounded-lg focus:outline-none focus:bg-white focus:border-gray-500"
                    name="priority"
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
                  className=" w-fit ml-[45%] text-2xl px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
                  value="Create"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
