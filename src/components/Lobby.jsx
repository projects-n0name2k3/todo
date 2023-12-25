import { React, useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { SortableItems } from "./SortableItems";
import Typed from "react-typed";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  addDoc,
  orderBy,
  deleteDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { colors, quotes, getCurrentDate } from "../utils/constants";
import { v4 as uuidv4 } from "uuid";
import { collectionsTest } from "../utils/initData";
const Lobby = () => {
  const [show, setShow] = useState(false);
  const [activeCollection, setActiveCollection] = useState("");
  const [search, setSearch] = useState("");
  const [collectionTest, setCollectionTest] = useState({});
  const [collections, setCollections] = useState([]);
  const [data, setData] = useState([]);
  const [quote, setQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)]
  );
  const [dt, setDt] = useState(new Date().toLocaleString());
  const handleDragEnd = async (e) => {
    const { active, over } = e;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      setCollections((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        const newCollectionTest = {
          collectionOrder: arrayMove(items, activeIndex, overIndex).map(
            (item) => item.id
          ),
          collections: arrayMove(items, activeIndex, overIndex),
        };
        setCollectionTest(newCollectionTest);
        updateDoc(doc(db, "collection", "userId"), {
          collection: newCollectionTest,
        });
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleUpdate = async (data) => {
    const newCollections = collections.map((collection) => {
      if (collection.id === data.id) {
        return {
          id: data.id,
          title: data.title,
          labelColor: data.color,
          percentCompleted: data.completedPercentage,
          totalTask: data.totalTask,
        };
      } else {
        return collection;
      }
    });

    updateDoc(doc(db, "collection", "userId"), {
      collection: {
        collections: newCollections,
        collectionOrder: collectionTest.collectionOrder,
      },
    });
    await updateDoc(doc(db, "boards", data.id), {
      collectionTitle: data.title,
    });
  };

  const handleDeleteItem = async (id) => {
    console.log(collectionTest);
    const newCollectionOrder = collectionTest.collectionOrder.filter(
      (item) => item !== id
    );
    const newCollections = collections.filter((item) => item.id !== id);
    const newCollectionTest = {
      collectionOrder: newCollectionOrder,
      collections: newCollections,
    };
    updateDoc(doc(db, "collection", "userId"), {
      collection: newCollectionTest,
    });
    await deleteDoc(doc(db, "boards", id));
  };

  useEffect(() => {
    let secTimer = setInterval(() => {
      let newDate = new Date();
      let seconds = newDate.getSeconds();
      let minutes = newDate.getMinutes();
      let hours = newDate.getHours();
      setDt(
        `${hours >= 10 ? hours : "0" + hours} : ${
          minutes > 10 ? minutes : "0" + minutes
        } : ${seconds > 10 ? seconds : "0" + seconds}`
      );
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);
  useEffect(() => {
    const q = query(collection(db, "collection"));
    const unsubcribe = onSnapshot(q, (querySnapshot) => {
      let collectionsArr = [];
      querySnapshot.forEach((doc) => {
        collectionsArr.push({ ...doc.data(), id: doc.id });
      });
      setCollectionTest(collectionsArr[0].collection);
      setCollections(collectionsArr[0].collection.collections);
    });
    return () => unsubcribe;
  }, []);

  const handleAddItem = async () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    const id = uuidv4();
    const newCollectionTest = {
      collectionOrder: [...collectionTest.collectionOrder, id],
      collections: [
        ...collections,
        {
          id: id,
          title: `New Collection`,
          labelColor: randomColor,
          percentCompleted: 0,
          totalTask: 1,
        },
      ],
    };

    updateDoc(doc(db, "collection", "userId"), {
      collection: newCollectionTest,
    });
    const idColumn = uuidv4();
    const idCard = uuidv4();
    await setDoc(doc(db, "boards", id), {
      collectionTitle: "New Collection",
      columnOrder: [uuidv4()],
      columns: [
        {
          id: idColumn,
          title: "Todo 1",
          cardOrder: [idCard],
          cards: [
            {
              columnId: idColumn,
              id: idCard,
              title: "Task 1",
            },
          ],
        },
      ],
    });
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
  const handleTest = async (id) => {
    const { protocol, host } = window.location;
    history.pushState(null, null, `${protocol}//${host}/${id}`);
  };

  return (
    <div className="max-w-[1440px] flex flex-col w-full text- mx-auto relative mt-12 rounded-lg min-h-[600px] text-white">
      <div className="flex flex-col absolute right-0 items-center justify-center mt-12 text-gray-700 dark:text-white">
        <span className="text-md ">{getCurrentDate()}</span>
        <span className="text-md">{dt}</span>
      </div>
      <div>
        <span className="w-1/2 flex flex-col h-[300px] items-center justify-between mx-auto text-black mt-12">
          <div>
            <img
              src="/sand-clock-dribbble-unscreen.gif"
              className="scale-125 dark:invert"
              alt=""
            />
          </div>
          <div className="text-white relative w-[700px] text-center mb-12">
            <p>
              <span className="text-2xl text-gray-700 dark:text-white">“</span>
              <Typed
                strings={[quote.quote]}
                typeSpeed={30}
                className="text-gray-700 dark:text-white"
              />
              <span className="text-2xl text-gray-700 dark:text-white">”</span>
            </p>
            <p className="absolute right-0 text-gray-700 dark:text-white">
              <span>-{quote.author}</span>
            </p>
          </div>
          <div
            className={`dark:bg-[#3f3f3f] border border-gray-400 rounded-full flex items-center px-2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => setShow(!show)}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
              <path d="M21 21l-6 -6"></path>
            </svg>
            <input
              className={`bg-transparent dark:text-white rounded-full p-2 min-w-[200px] duration-200 linear focus:min-w-[400px] outline-none focus:outline-none w-full`}
              type="text"
              placeholder="Search"
              name=""
              id=""
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </span>
      </div>
      <div className="mt-12 w-full px-12 py-6 flex flex-col">
        <div className="font-semibold text-4xl mb-4 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700 dark:text-white"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
          </svg>
          <h1 className="text-gray-700 dark:text-white">Your Board</h1>
        </div>
        <div>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(e) => {
              handleDragEnd(e);
              setActiveCollection(null);
            }}
            sensors={sensors}
          >
            <div>
              <SortableContext
                items={collections}
                strategy={rectSwappingStrategy}
              >
                <div className="flex gap-4 ">
                  <div className="w-[220px] h-[160px] grid place-items-center">
                    <button
                      onClick={handleAddItem}
                      className="w-12 h-12 rounded-full dark:bg-[#3f3f3f] border-2 border-black/80 dark:border-white shadow-xl grid place-items-center opacity-60 hover:opacity-100 z-0 text-gray-700 add-board-btn"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-700 dark:text-white"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill=""
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M12 5l0 14"></path>
                        <path d="M5 12l14 0"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-4 z-0 flex-wrap w-[1024px] relative">
                    {search !== ""
                      ? collections.map((collection) => {
                          if (
                            collection.title
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return (
                              <SortableItems
                                key={collection.id}
                                id={collection.id}
                                title={collection.title}
                                color={collection.labelColor}
                                tasks={collection.totalTask}
                                completedPercentage={
                                  collection.percentCompleted
                                }
                                collectionOrder={collectionTest.collectionOrder}
                                collections={collections}
                                handleDeleteItem={handleDeleteItem}
                                handleUpdate={handleUpdate}
                                handleTest={handleTest}
                                activeCollection={activeCollection}
                              />
                            );
                          }
                        })
                      : collections.map((collection) => (
                          <SortableItems
                            key={collection.id}
                            id={collection.id}
                            title={collection.title}
                            color={collection.labelColor}
                            tasks={collection.totalTask}
                            completedPercentage={collection.percentCompleted}
                            handleDeleteItem={handleDeleteItem}
                            handleUpdate={handleUpdate}
                            handleTest={handleTest}
                            activeCollection={activeCollection}
                            collections={collections}
                            collectionOrder={collectionTest.collectionOrder}
                          />
                        ))}
                  </div>
                </div>
              </SortableContext>
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Lobby;

{
  /* {showDelete && (
                  <div className="w-12 h-12 bg-green-300 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border rounded-lg grid place-items-center delete-box">
                    <Droppable id="trash">
                      <div>
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
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M4 7l16 0"></path>
                          <path d="M10 11l0 6"></path>
                          <path d="M14 11l0 6"></path>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                      </div>
                    </Droppable>
                  </div>
                )
                } */
}
