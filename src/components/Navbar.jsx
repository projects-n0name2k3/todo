import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-14 shadow-xl dark:bg-[#1c1c27] bg-white px-16 flex items-center justify-between fixed top-0 z-50">
        <div className="flex items-center h-full text-gray-700 dark:text-white">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18.364 19.364a9 9 0 1 0 -12.728 0"></path>
              <path d="M15.536 16.536a5 5 0 1 0 -7.072 0"></path>
              <path d="M12 13m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
            </svg>
          </div>
          <h1
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Todo App
          </h1>
        </div>

        <div className="relative">
          <span
            onClick={() => setShow(!show)}
            className="w-10 h-10 dark:bg-[#28293d] shadow-xl text-gray-700 dark:text-white rounded-full border-2 cursor-pointer grid place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=""
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            </svg>
          </span>
          {show && (
            <div className="absolute z-30 w-60 max-h-60 rounded-xl border border-gray-400 bg-white dark:bg-[#28293d] shadow-xl text-gray-700 dark:text-white top-[45px] right-0 flex flex-col justify-between">
              <div className="border-b border-gray-400 px-4 py-2 flex items-center justify-between">
                <div>
                  <span className="text-sm dark:text-gray-300">
                    Signed in as
                  </span>
                  <br />
                  <span className="font-semibold dark:text-white">
                    Username
                  </span>
                </div>
                <div
                  className={`dark-mode-switch ${
                    localStorage.getItem("theme") === true && "active"
                  }`}
                  onClick={() => {
                    props.handleToggle();
                    document
                      .querySelector(".dark-mode-switch")
                      .classList.toggle("active");
                  }}
                ></div>
              </div>
              <div
                onClick={() => setShow(false)}
                className="border-t border-gray-400 px-4 py-2 cursor-pointer text-center"
              >
                <span className="dark:text-white ">Sign out</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </>
  );
};

export default Navbar;
