import { useState } from "react"
import { addDoc,  doc, updateDoc, increment } from "firebase/firestore"

export default function AddItemDialog ({ dialogRef, itemsRef, db, items }) {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(1)
    const [type, setType] = useState(0)
  
    const handleSubmit = e => {
      e.preventDefault()
  
      const itemToUpdate = items.find(item => item.name === name);
  
      if (itemToUpdate) {
        const docRef = doc(db, 'items', itemToUpdate.id)
        updateDoc(docRef, {
          amount: increment(amount),
          type
        })
      } else {
        addDoc(itemsRef, { name, amount, type })
      }
  
      setName("")
      setAmount(1)
      setType(0)
    }
  
    return (
      <dialog ref={dialogRef}>
          <button onClick={() => dialogRef.current.close()}>Close</button>
          <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value={0}>Fruit</option>
              <option value={1}>Groente</option>
            </select>
            <button type="submit">Add</button>
          </form>
        </dialog>
    )
  }