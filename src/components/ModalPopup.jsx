import React, { useState } from "react";

const ModalPopup = (props) => {
  const { handleDeleteCard, handelHideDelete } = props;
  const [deleted, setDeleted] = useState(false);
  return (
    <div className=" fixed left-[50%] w-full h-screen grid place-items-center top-[50%] translate-x-[-50%] translate-y-[-50%] bg-black/80 z-30 select-none">
      <div className=" w-[500px] h-[300px] flex flex-col rounded-xl shadow-xl border-2 dark:border-red-400 absolute top-0 bg-white  dark:bg-[#28293d] delete-box items-center justify-center">
        {!deleted && (
          <>
            <div className="flex flex-col items-center justify-center">
              <img src="/closeImg.png" alt="" />
              <span className="text-center text-gray-700 px-16 mt-4 dark:text-white cursor-pointer">
                Do you want to delete this record? This process is can't undo !
              </span>
            </div>
            <div className="flex justify-center items-center mt-6">
              <button
                className="min-w-[100px] flex items-center justify-center rounded-lg bg-gray-400 border hover:opacity-80 h-9 px-3 mr-8 py-2 text-sm  text-white"
                type="button"
                onClick={props.handelHideDelete}
              >
                Cancel
              </button>
              <button
                className="min-w-[100px] flex items-center justify-center rounded-lg bg-red-400 border hover:opacity-80 h-9 px-3 py-2 text-sm text-white"
                type="submit"
                onClick={() => {
                  props.object !== "card"
                    ? props.handelDelete()
                    : handleDeleteCard(props.data);

                  handelHideDelete();
                  props.object !== "card" && setDeleted(true);
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}
        {deleted && (
          <>
            <div>
              <div className="flex flex-col items-center justify-center relative">
                <img
                  src="/check2.gif"
                  alt=""
                  className="absolute scale-100 bottom-0"
                />
                <span className="text-center px-16 mt-32 text-gray-700 dark:text-white">
                  Deleted Successfully!
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalPopup;
