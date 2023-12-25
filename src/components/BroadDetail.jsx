import { React, useEffect, useRef } from "react";
import Column from "./Column";
import { Container, Draggable } from "react-smooth-dnd";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";
import { applyDrag } from "../utils/applyDrag";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { OuterClick } from "react-outer-click";
import { useLocation } from "react-router-dom";
export default function BroadDetail() {
  const location = useLocation();
  const { id, collections, collectionOrder } = location.state;
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [isActioning, setIsActioning] = useState(false);
  const inputRef = useRef(null);
  const collectionTitle = useRef(null);
  useEffect(() => {
    if (isAdding) {
      inputRef.current?.focus();
    }
  }, [isAdding]);

  useEffect(() => {
    const q = query(collection(db, "boards"));
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
      let collectionsArr = [];
      querySnapshot.forEach((doc) => {
        collectionsArr.push({ ...doc.data(), id: doc.id });
      });
      setBoard(collectionsArr.filter((item) => item.id === id)[0]);
      setColumns(collectionsArr.filter((item) => item.id === id)[0].columns);
      setTitle(
        collectionsArr.filter((item) => item.id === id)[0].collectionTitle
      );
    });

    return () => unsubcribe;
  }, []);

  useEffect(() => {
    const totalTask = board.columns
      ?.map((item) => item.cardOrder.length)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const completedTask = board.columns?.filter(
      (item) =>
        item.title.toLowerCase() === "completed" && item.cardOrder.length
    );
    const percentCompleted = Math.floor(
      completedTask &&
        (completedTask[0]?.cards?.length == 0
          ? 0
          : completedTask[0]?.cards?.length / totalTask) * 100
    );
    const newCollections = collections.map((collection) => {
      if (collection.id === id) {
        return {
          id: collection.id,
          labelColor: collection.labelColor,
          title: collection.title,
          percentCompleted: percentCompleted >= 0 ? percentCompleted : 0,
          totalTask: totalTask >= 0 ? totalTask : 0,
        };
      } else {
        return collection;
      }
    });
    updateDoc(doc(db, "collection", "userId"), {
      collection: {
        collectionOrder: collectionOrder,
        collections: newCollections,
      },
    });
  }, [board]);

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoard);
    updateDoc(doc(db, "boards", id), {
      columnOrder: newBoard.columnOrder,
    });
    updateDoc(doc(db, "boards", id), {
      columns: newColumns,
    });
  };

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newColumns = [...columns];
      let currentColumn = newColumns.find((column) => column.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((card) => card.id);
      setColumns(newColumns);
      updateDoc(doc(db, "boards", id), {
        columns: newColumns,
      });
    }
  };

  const handleAddColumn = () => {
    const columnId = uuidv4();
    let newColumns = [
      ...columns,
      {
        id: columnId,
        cardOrder: [],
        cards: [],
        title: inputRef.current.value,
      },
    ];
    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map((column) => column.id);
    newBoard.columns = newColumns;
    updateDoc(doc(db, "boards", id), {
      columnOrder: newBoard.columnOrder,
    });
    updateDoc(doc(db, "boards", id), {
      columns: newColumns,
    });
  };

  const handleDeleteColumn = (data) => {
    const { columnId } = data;
    const newColumnOrder = board.columnOrder.filter(
      (columnOrder) => columnOrder !== columnId
    );
    const newColumns = columns.filter((column) => column.id !== columnId);
    console.log(newColumnOrder, newColumns);
    updateDoc(doc(db, "boards", id), {
      columnOrder: newColumnOrder,
    });
    updateDoc(doc(db, "boards", id), {
      columns: newColumns,
    });
  };

  const handelAddNewCard = (data) => {
    const { idColumn, title } = data;
    const newColumn = columns.map((column) => {
      if (column.id === idColumn) {
        const cardId = uuidv4();
        const newColumnCardOrder = [...column.cardOrder, cardId];
        const newColumnCards = [
          ...column.cards,
          {
            columnId: column.id,
            id: cardId,
            title: title,
          },
        ];
        return {
          id: column.id,
          title: column.title,
          cardOrder: newColumnCardOrder,
          cards: newColumnCards,
        };
      } else {
        return column;
      }
    });
    console.log(newColumn);
    updateDoc(doc(db, "boards", id), {
      columns: newColumn,
    });
  };

  const handelUpdateNameColumn = (data) => {
    const newColumn = columns.map((column) => {
      if (column.id === data.id) {
        return {
          id: column.id,
          title: data.title,
          cardOrder: [...column.cardOrder],
          cards: [...column.cards],
        };
      } else {
        return column;
      }
    });
    updateDoc(doc(db, "boards", id), {
      columns: newColumn,
    });
  };

  const handleUpdateCardTitle = (data) => {
    const { idColumn, cardId, title } = data;
    const newColumn = columns.map((column) => {
      if (column.id === idColumn) {
        const newColumnCards = column.cards.map((card) => {
          if (card.id === cardId) {
            return {
              columnId: card.columnId,
              id: card.id,
              title: title,
            };
          } else {
            return card;
          }
        });
        return {
          id: column.id,
          title: column.title,
          cardOrder: [...column.cardOrder],
          cards: [...newColumnCards],
        };
      } else {
        return column;
      }
    });

    updateDoc(doc(db, "boards", id), {
      columns: newColumn,
    });
  };

  const handleUpdateCollectionTitle = async (data) => {
    const { newTitle } = data;
    const newCollections = collections.map((collection) => {
      if (collection.id === id) {
        return {
          id: id,
          title: newTitle,
          labelColor: collection.labelColor,
          percentCompleted: percentCompleted >= 0 ? percentCompleted : 0,
          totalTask: totalTask >= 0 ? totalTask : 0,
        };
      } else {
        return collection;
      }
    });
    updateDoc(doc(db, "collection", "userId"), {
      collection: {
        collections: newCollections,
        collectionOrder: collectionOrder,
      },
    });

    await updateDoc(doc(db, "boards", id), {
      collectionTitle: newTitle,
    });
  };

  const handleDeleteCard = (data) => {
    const { idCard, columnId } = data;
    const newColumn = columns.map((column) => {
      if (column.id === columnId) {
        return {
          id: column.id,
          title: column.title,
          cardOrder: column.cardOrder.filter((item) => item !== idCard),
          cards: column.cards.filter((item) => item.id !== idCard),
        };
      } else {
        return column;
      }
    });
    updateDoc(doc(db, "boards", id), {
      columns: newColumn,
    });
  };
  const handleBlockDragColumn = (data) => {
    console.log(data);
    data ? setIsActioning(true) : setIsActioning(false);
  };
  return (
    <div
      className="pt-[56px] min-w-[1920px] w-full min-h-screen relative"
      style={{
        backgroundImage: `url("https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.15752-9/349224354_1455606065212936_4690509785123576501_n.png?stp=dst-png_s2048x2048&_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=klmyI2DY8gEAX-obp_E&_nc_ht=scontent.fsgn2-7.fna&oh=03_AdTs7jVxUzWsma6-BNel166Jg1IXS1R_uB20HZzwN9FG0Q&oe=64AD359B")`,
      }}
    >
      <div className="w-full h-12 bg-black/25 mb-4">
        <p
          className="px-4 text-2xl font-bold h-full py-2 text-white flex items-center"
          onClick={() => setIsEditing(true)}
          onBlur={() => {
            setIsEditing(false);
            handleUpdateCollectionTitle({
              newTitle:
                collectionTitle.current.innerHTML == null ||
                collectionTitle.current.innerHTML.trim() === ""
                  ? "Empty"
                  : collectionTitle.current.innerHTML,
            });
          }}
        >
          <span
            ref={collectionTitle}
            contentEditable={isEditing}
            suppressContentEditableWarning={true}
            onFocus={() => document.execCommand("selectAll", false, null)}
            className="collection-title"
          >
            {title}
          </span>
        </p>
      </div>
      <div className="flex gap-2">
        <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "column-drop-preview",
          }}
          getChildPayload={(index) => columns[index]}
          nonDragAreaSelector={
            isActioning ? ".column-drag-handle" : "noneofanything"
          }
        >
          {columns &&
            columns.length > 0 &&
            columns?.map((column) => {
              return (
                <Draggable key={column.index}>
                  <Column
                    column={column}
                    onCardDrop={onCardDrop}
                    handelAddNewCard={handelAddNewCard}
                    handelUpdateNameColumn={handelUpdateNameColumn}
                    handleUpdateCardTitle={handleUpdateCardTitle}
                    handleDeleteCard={handleDeleteCard}
                    handleDeleteColumn={handleDeleteColumn}
                    handleBlockDragColumn={handleBlockDragColumn}
                  ></Column>
                </Draggable>
              );
            })}
        </Container>
        <OuterClick
          className={`min-w-[300px] rounded-md dark:bg-black flex border-2 border-slate-600 items-center bg-white hover:dark:bg-black/60 cursor-pointer select-none`}
          style={{ maxHeight: isAdding ? "100px" : "48px" }}
          onOuterClick={() => {
            setIsAdding(false);
          }}
        >
          {isAdding ? (
            <>
              <div className="flex flex-col items-start px-3 gap-3 duration-300 dark:text-white">
                <div>
                  <input
                    type="text"
                    placeholder="Enter list title"
                    className="bg-transparent border border-slate-600 px-2 py-1 "
                    ref={inputRef}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-blue-400 text-white rounded-md"
                    onClick={handleAddColumn}
                  >
                    Add list
                  </button>
                  <span>
                    <AiOutlineClose
                      size={20}
                      onClick={() => {
                        setIsAdding(false);
                      }}
                    />
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <span
                className="px-3 flex gap-2 items-center rounded-md dark:text-white w-full h-full"
                onClick={() => setIsAdding(true)}
              >
                <AiOutlinePlus />
                Add another list
              </span>
            </>
          )}
        </OuterClick>
      </div>
    </div>
  );
}
