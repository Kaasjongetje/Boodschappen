import { deleteDoc, doc, updateDoc, increment } from "firebase/firestore"

export default function Item ({ id, name, amount, db }) {
    const deleteItem = () => {
      const docRef = doc(db, 'items', id)
      deleteDoc(docRef)
    }
  
    const adjustAmount = (amount) => {
      const docRef = doc(db, 'items', id)
      updateDoc(docRef, {
        amount: increment(amount)
      })
    }
  
    return (
      <div className="item">
        <button onClick={deleteItem}>Delete</button>
        <span className="name">{name}</span>
        <span className="amount">{amount}</span>
        <button onClick={() => adjustAmount(1)}>+</button>
        <button onClick={() => adjustAmount(-1)}>-</button>
      </div>
    )
  }