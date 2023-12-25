import React, { useEffect, useState, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import ModalPopup from "./ModalPopup";
import Card from "./Card";
import { Container, Draggable } from "react-smooth-dnd";
import { OuterClick } from "react-outer-click";
const Column = (props) => {
  const {
    column,
    onCardDrop,
    handelUpdateNameColumn,
    handleUpdateCardTitle,
    handleDeleteCard,
    handleDeleteColumn,
  } = props;
  const cards = column.cards;
  const [isActioning, setIsActioning] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [cardData, setCardData] = useState({});
  const inputRef = useRef(null);
  const titleRef = useRef(null);
  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  const handelDeleteCard = (data) => {
    setCardData(data);
    setIsDeleting(true);
  };
  const handelHideDelete = () => {
    setIsDeleting(false);
  };

  const handleBlockDragCard = (data) => {
    data ? setIsEditingCard(true) : setIsEditingCard(false);
  };

  useEffect(() => {
    isActioning || isAdding
      ? props.handleBlockDragColumn(true)
      : props.handleBlockDragColumn(false);
  }, [isActioning, isAdding]);

  return (
    <>
      <div className="min-w-[300px] column-drag-handle rounded-2xl dark:bg-black bg-[#f1f2f4] border-2 border-slate-600 min-h-[100px] p-3 cursor-pointer select-none mx-1 dark:text-white">
        <div className="flex items-center justify-between px-2">
          <header
            className="font-semibold"
            contentEditable={true}
            suppressContentEditableWarning={true}
            ref={titleRef}
            onBlur={() =>
              handelUpdateNameColumn({
                id: column.id,
                title: titleRef.current.innerHTML,
              })
            }
          >
            {column.title}
          </header>

          <OuterClick
            onOuterClick={() => {
              setIsActioning(false);
            }}
            onClick={() => {
              isActioning ? setIsActioning(false) : setIsActioning(true);
            }}
            className="p-2 hover:dark:bg-[#333c43] hover:bg-[#d0d4db] rounded-md relative"
          >
            <BsThreeDots />
            {isActioning && (
              <div className="w-[300px] h-auto rounded-md dark:bg-black bg-white border border-slate-600 absolute z-30 top-8">
                <div className="text-center py-1 border-b border-b-slate-600">
                  <span className="text-sm text-gray-700 dark:text-white">
                    List Actions
                  </span>
                </div>
                <div className="flex flex-col py-1">
                  <div className="w-full hover:dark:bg-[#15191c] hover:bg-[#d0d4db]  h-8 flex items-center">
                    <span
                      className="text-sm px-2"
                      onClick={() => {
                        handleDeleteColumn({
                          columnId: column.id,
                        });
                      }}
                    >
                      Delete Column
                    </span>
                  </div>
                </div>
              </div>
            )}
          </OuterClick>
        </div>
        <div className="flex flex-col gap-2 mt-2 max-h-[700px] overflow-y-auto">
          <Container
            groupName="col"
            onDragStart={(e) => {}}
            onDragEnd={(e) => {}}
            onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
            getChildPayload={(index) => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            onDragEnter={() => {}}
            onDragLeave={() => {}}
            onDropReady={(p) => {}}
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: "card-drop-preview",
            }}
            dropPlaceholderAnimationDuration={200}
            nonDragAreaSelector={isEditingCard ? ".card-box" : "noneofanything"}
          >
            {column.cards.map((card) => {
              return (
                <Draggable key={card.id}>
                  <Card
                    card={card}
                    handelDeleteCard={handelDeleteCard}
                    handleUpdateCardTitle={handleUpdateCardTitle}
                    columnId={column.id}
                    handleBlockDragCard={handleBlockDragCard}
                  />
                </Draggable>
              );
            })}
          </Container>
        </div>
        {isAdding ? (
          <div className="flex flex-col gap-2 dark:text-white">
            <div
              className="flex items-center gap-3 mt-2 px-3 rounded-md"
              onClick={() => setIsAdding(true)}
            >
              <input
                type="text"
                placeholder="Enter title for this card..."
                className="px-2 py-1 dark:bg-[#22272b] w-full border border-slate-600 rounded-md"
                ref={inputRef}
              />
            </div>
            <div className="flex items-center gap-2 px-3">
              <button
                className="px-2 py-1 bg-blue-400 text-white rounded-md"
                onClick={() => {
                  props.handelAddNewCard({
                    idColumn: column.id,
                    title:
                      inputRef.current.value.length == 0
                        ? "New Card"
                        : inputRef.current.value,
                  });
                  inputRef.current.value = "";
                  setIsAdding(false);
                }}
              >
                Add card
              </button>
              <span onClick={() => setIsAdding(false)}>
                <AiOutlineClose size={20} />
              </span>
            </div>
          </div>
        ) : (
          <>
            <div
              className="flex items-center gap-3 mt-2 hover:dark:bg-[#282E33] hover:bg-[#d0d4db] px-2 py-2 rounded-md"
              onClick={() => setIsAdding(true)}
            >
              <AiOutlinePlus />
              <span>Add a card</span>
            </div>
          </>
        )}
      </div>
      {isDeleting && (
        <ModalPopup
          handelHideDelete={handelHideDelete}
          handleDeleteCard={handleDeleteCard}
          data={cardData}
          object={"card"}
        />
      )}
    </>
  );
};

export default Column;
