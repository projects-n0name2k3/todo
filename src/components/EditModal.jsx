import React, { useState } from "react";
import { OuterClick } from "react-outer-click";
const EditModal = (props) => {
  const [title, setTitle] = useState(props.title);
  const [showColor, setShowColor] = useState(false);
  const [color, setColor] = useState(props.color);
  const { tasks, completedPercentage } = props;

  return (
    <>
      <OuterClick
        onOuterClick={props.handleCloseModal}
        className="min-w-[600px] select-none min-h-[60px] dark:bg-[#1f1f1f] shadow-lg bg-white dark:text-white text-gray-700 fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] border rounded-lg z-100"
      >
        <div className="flex justify-between items-center px-6 my-6">
          <div className="flex gap-4  items-center">
            <h3>Title</h3>
            <input
              type="text"
              className="outline-none focus:outline-none rounded-lg px-4 py-2 bg-transparent border invalid:border-red-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-center justify-between gap-4">
            <button
              onClick={() => setShowColor(!showColor)}
              className={`w-5 h-5 block rounded-full bg-${color}-500`}
            ></button>
            {showColor && (
              <div className="flex gap-3 border rounded-full px-2 py-1">
                <button
                  onClick={() => setColor("green")}
                  className="w-5 h-5 block rounded-full bg-green-500"
                ></button>
                <button
                  onClick={() => setColor("red")}
                  className="w-5 h-5 block rounded-full bg-red-500"
                ></button>
                <button
                  onClick={() => setColor("blue")}
                  className="w-5 h-5 block rounded-full bg-blue-500"
                ></button>
                <button
                  onClick={() => setColor("cyan")}
                  className="w-5 h-5 block rounded-full bg-cyan-500"
                ></button>
                <button
                  onClick={() => setColor("purple")}
                  className="w-5 h-5 block rounded-full bg-purple-500"
                ></button>
                <button
                  onClick={() => setColor("pink")}
                  className="w-5 h-5 block rounded-full bg-pink-500"
                ></button>
                <button
                  onClick={() => setColor("yellow")}
                  className="w-5 h-5 block rounded-full bg-yellow-500"
                ></button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={props.handleCloseModal}
            className="min-w-[90px]  dark:bg-[#3f3f3f] bg-red-400 px-4 py-2 rounded-lg border hover:opacity-60"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              props.handleUpdate({
                color: color,
                title: title
                  .trim()
                  .split(" ")
                  .filter((item) => item != "")
                  .join(" "),
                completedPercentage: completedPercentage,
                totalTask: tasks,
              })
            }
            className="min-w-[90px] dark:bg-purple-400 bg-green-400 px-4 py-2 rounded-lg border hover:opacity-60"
          >
            Save
          </button>
        </div>
      </OuterClick>
    </>
  );
};

export default EditModal;
