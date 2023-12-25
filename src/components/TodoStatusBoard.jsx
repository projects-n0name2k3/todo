import { React, useState } from "react";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { SortableTodos } from "./SortableTodos";
const TodoStatusBoard = (props) => {
  const [showTodo, setShowTodo] = useState(true);
  const [activeTodo, setActiveTodo] = useState("");
  const [todos, setTodos] = useState(props.todos);
  const handleDragEnd = async (e) => {
    const { active, over } = e;
    if (active.id !== over.id) {
      setTodos((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      activationConstraint: {
        delay: 150, //Delay write dot
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
      },
    })
  );
  return (
    <div
      className={`align-top inline-block w-[300px] min-h-[10px] ${
        props.isTransparent
          ? "bg-transparent text-white"
          : "bg-[#f1f2f4] dark:bg-[#1f1f1f]"
      } border-2 rounded-xl p-3 mx-4 select-none`}
    >
      <div className="flex items-center justify-between relative">
        <h1
          className={`font-semibold ${
            props.isTransparent ? "text-white" : "text-gray-700 dark:text-white"
          }`}
        >
          {props.title}
        </h1>
        {showTodo ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => setShowTodo(false)}
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
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => setShowTodo(true)}
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
            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"></path>
            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87"></path>
            <path d="M3 3l18 18"></path>
          </svg>
        )}
      </div>
      <div className="mt-3">
        <ul
          className={`flex flex-col gap-3 overflow-y-auto duration-300 max-h-[200px]`}
          style={{ maxHeight: `${showTodo ? "400px" : "0px"}` }}
        >
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(e) => {
              handleDragEnd(e);
              setActiveTodo(null);
            }}
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
          >
            <div>
              <SortableContext
                items={todos}
                strategy={verticalListSortingStrategy}
                modifiers={[restrictToWindowEdges]}
              >
                <div className="flex gap-4 ">
                  <div className="flex flex-col gap-4 z-10 flex-wrap w-[1024px] relative overflow-x-hidden ">
                    {todos?.map((item) => (
                      <SortableTodos
                        key={item.index}
                        id={item.id}
                        name={item.name}
                        index={item.index}
                        status={item.status}
                        isTransparent={props.isTransparent}
                      />
                    ))}
                  </div>
                </div>
              </SortableContext>
            </div>
          </DndContext>
          {/* {props.todos?.map((item) => (
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
                    props.title === "Completed"
                      ? "text-green-500 dark:text-green-300"
                      : props.title === "Failed"
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
                <span>{item.name}</span>
              </div>
            </li>
          ))} */}
        </ul>
      </div>
      <div
        className={`mt-3 flex text-sm items-center gap-2 cursor-pointer ${
          !props.isTransparent && "hover:bg-[#dadbdd] hover:dark:bg-[#2f2f2f]"
        } py-2 rounded-xl p-3`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
  );
};

export default TodoStatusBoard;
