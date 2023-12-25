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

export const handleDeleteCard = (data) => {
  //   const { id, cardId, title } = data;
  //   const newColumn = columns.map((column) => {
  //     if (column.id === id) {
  //       const newColumnCards = column.cards.map((card) => {
  //         if (card.id === cardId) {
  //           return {
  //             boardId: card.boardId,
  //             columnId: card.columnId,
  //             id: card.id,
  //             title: title,
  //           };
  //         } else {
  //           return card;
  //         }
  //       });
  //       console.log(newColumnCards);
  //       return {
  //         id: column.id,
  //         title: column.title,
  //         boardId: column.boardId,
  //         cardOrder: [...column.cardOrder],
  //         cards: [...newColumnCards],
  //       };
  //     } else {
  //       return column;
  //     }
  //   });

  //   updateDoc(doc(db, "boards", "board-1"), {
  //     columns: newColumn,
  //   });
  alert("hehee");
};
