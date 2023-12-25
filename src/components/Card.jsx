import React, { useEffect, useRef, useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";

const Card = (props) => {
  const { handelDeleteCard, handleUpdateCardTitle, columnId } = props;
  const [isEditing, setIsEditing] = useState(false);
  const cardTitle = useRef(null);
  useEffect(() => {
    isEditing && cardTitle.current.focus();
  }, [isEditing]);
  return (
    <>
      <div className=" dark:bg-[#22272b] w-[300px] bg-white border shadow-lg hover:bg-[#f1f2f4] hover:dark:bg-[#282E33] dark:text-white rounded-md my-1 flex items-center justify-between card-box">
        <p
          className="min-h-[40px] w-[250px] px-2 py-2"
          onBlur={() => {
            setIsEditing(false);
            props.handleBlockDragCard(false);
            handleUpdateCardTitle({
              idColumn: columnId,
              cardId: props.card.id,
              title:
                cardTitle.current.innerHTML == null ||
                cardTitle.current.innerHTML.trim() === ""
                  ? "Empty"
                  : cardTitle.current.innerHTML,
            });
          }}
        >
          <span
            ref={cardTitle}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onFocus={() => document.execCommand("selectAll", false, null)}
          >
            {props.card.title}
          </span>
        </p>
        <div className="gap-3 w-[50px] mr-3 card-features">
          <BsPencil
            onClick={() => {
              setIsEditing(true);
              props.handleBlockDragCard(true);
            }}
          />
          <BsTrash
            onClick={() => {
              handelDeleteCard({ idCard: props.card.id, columnId: columnId });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
