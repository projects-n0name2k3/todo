import { React, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Sortable_Item from "./Sortable_Item";

export default function Container(props) {
  const { id, items } = props;
  const { setNodeRef } = useDroppable({
    id,
  });
  const [show, setShow] = useState(true);
  const [showTodos, setShowTodos] = useState(true);
  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="align-top inline-block mx-3 w-[350px] h-auto shadow-xl bg-[#f1f2f4] dark:bg-[#1f1f1f] border p-3 rounded-xl select-none"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-gray-700 dark:text-white font-semibold">
            {props.title}
          </h1>
          {show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-700 dark:text-white font-semibold cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => {
                setShow(false);
                setShowTodos(false);
              }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-700 dark:text-white font-semibold cursor-pointer"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => {
                setShow(true);
                setShowTodos(true);
              }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
              <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
              <path d="M3 3l18 18"></path>
            </svg>
          )}
        </div>
        {showTodos &&
          items.map((item) => (
            <Sortable_Item
              key={item.index}
              id={item.index}
              name={item.name}
              status={item.status}
            />
          ))}
        <div className="text-gray-700 dark:text-white font-semibold flex gap-2 px-2 py-2 hover:bg-[#d0d4db] hover:dark:bg-[#3f3f3f] rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
          <span>Add a card</span>
        </div>
      </div>
    </SortableContext>
  );
}
