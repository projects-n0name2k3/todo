import React, { useState,useEffect } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import ModalPopup from "./ModalPopup";
import EditModal from "./EditModal"
import ProgressBar from "./ProcessBar";
import { useNavigate } from "react-router-dom";
export function SortableItems(props){
  const [edit, setEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [title, setTitle] = useState(props.title);
  const navigate = useNavigate()
  const {tasks,completedPercentage} = props
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

    const handleUpdate = (data) => {
      const id = props.id
      props.handleUpdate({...data,id})
      
    }
    
    const handleCloseModal = () => {
      setEdit(false)
    }

    const handelHideDelete = () => {
      setShowDelete(false)
    } 
    
    const handelDelete = () => {
      
      props.handleDeleteItem(props.id)
        setEdit(false)
    }

    const toComponentB = () => {
      navigate('/'+props.id,{ state: { id : props.id,title : title,collections:props.collections,collectionOrder: props.collectionOrder} })
    };
    return (
        <>
        <div className={`bg-${props.color}-500 shadow-[0px_0px_10px_3px_${props.color}] text-${props.color}-500 hidden`}/>
        <div ref={setNodeRef} style={...style} {...attributes} {...listeners} >
        <div className={`w-[220px] h-[160px] select-none rounded-lg text-gray-700 dark:text-white dark:bg-[#3f3f3f5b] border-2 border-gray-400 cursor-pointer hover:dark:bg-[#3f3f3f] shadow-xl flex flex-col justify-between dark group ${props.activeCollection === props.id ? 'dragging' : ""}`}>
              <div className="flex flex-col items-center justify-between px-4 py-2">
                <div className="flex items-center justify-between w-full">
                  <div>
                <span className="text-sm cursor-pointer">{props.completedPercentage}% Done</span>
                </div>
                <div className={`flex items-center text-${props.color}-500`}>
                <div onClick={() => {
                  setShowDelete(true)
                }} className="text-gray-400 group-hover:block hidden ">
                <svg xmlns="http://www.w3.org/2000/svg" 
                
                  width="15" 
                  height="15" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  fill="none" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
                </div>
                {/* <svg
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
                  <path
                    d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z"
                    strokeWidth="0"
                    fill="currentColor"
                  ></path>
                </svg> */}
                <span className={`w-2 h-2 rounded-full bg-${props.color}-500 shadow-[0px_0px_10px_3px_${props.color}] ml-4`}></span>
                </div>
                </div>            
                <ProgressBar progressPercentage={props.completedPercentage}/>              
              </div>
              <div className="h-full" onDoubleClick={toComponentB} onClick={()=>setEdit(true)}></div>
              <div className="flex flex-col px-4 py-2 whitespace-pre" onDoubleClick={toComponentB} onClick={()=>setEdit(true)}>
                <p className="text-ellipsis overflow-hidden">{props.title} </p>
                <span className="text-[12px]">{props.tasks} Tasks</span>
              </div>
            </div>
        </div>
        {showDelete && <ModalPopup handelHideDelete={handelHideDelete} handelDelete={handelDelete}/>}
         {edit && <EditModal handleCloseModal={handleCloseModal} title={props.title} color={props.color} completedPercentage={completedPercentage} tasks={tasks} handleUpdate={handleUpdate}/>}</>
    )
}
