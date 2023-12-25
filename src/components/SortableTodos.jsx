import React, {  } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useEffect } from "react";
export function SortableTodos(props){
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    }  = useSortable({id:props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }
    return (
        <>
        <div ref={setNodeRef} style={...style} {...attributes} {...listeners} >
        <li
              className={`w-full min-h-[30px] shadow-xl border ${
                props.isTransparent
                  ? "bg-transparent"
                  : `dark:bg-[#3f3f3f] bg-white hover:bg-[#dadbdd] hover:dark:bg-[#2f2f2f]`
              } rounded-md flex items-center cursor-pointer `}
            >
              <div className="flex gap-3 px-4 py-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className={`${
                    props.status === "Completed"
                      ? "text-green-500 dark:text-green-300"
                      : props.status === "Failed"
                      ? "text-red-500 dark:text-red-300"
                      : null
                  }`}
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                  <path d="M9 12l2 2l4 -4"></path>
                </svg>
                <span>{props.name}</span>
              </div>
            </li>
        </div>
        </>
    )
}
