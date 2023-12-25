import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Item(props) {
  const { id } = props;
  return (
    <div className="h-10 bg-white dark:bg-[#2f2f2f] flex dark:text-white items-center gap-4 p-3 my-3 rounded-xl shadow-xl hover:bg-[#f1f2f4] hover:dark:bg-[#3f3f3f]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          props.status === "Completed"
            ? "text-green-500 dark:text-green-400"
            : props.status === "Failed"
            ? "text-red-500 dark:text-red-400"
            : null
        }`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M9 12l2 2l4 -4"></path>
      </svg>
      <span>{props.name}</span>
    </div>
  );
}

export default function Sortable_Item(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={...style} {...attributes} {...listeners}>
      <Item id={props.id} name={props.name} status={props.status} />
    </div>
  );
}
