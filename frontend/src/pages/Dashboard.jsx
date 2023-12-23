import { getFirestore, collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState, useRef } from "react";

import Item from "../elements/Item.jsx"
import AddItemDialog from "../elements/AddItemDialog.jsx";

export default function Dashboard() {
    const db = getFirestore()
    const itemsRef = collection(db, "items")

    const [items, setItems] = useState([])

    const dialogRef = useRef(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(itemsRef, (snapshot) => {
        const newItems = []
    
        snapshot.forEach(doc => {
            const id = doc.id
            const data = doc.data()

            const item = {id, ...data}
            newItems.push(item)
        })
    
        newItems.sort((itemA, itemB) => {
            if (itemA.type < itemB.type) {
            return -1
            } else if (itemA.type > itemB.type) {
            return 1
            } else {
            return 0
            }
        })

        setItems(newItems)
        })

        return unsubscribe
    }, [])

    return (
        <>
            <div className="itemsList">
                {items.map(item => <Item key={item.id} id={item.id} name={item.name} amount={item.amount} db={db} />)}
            </div>
            <button onClick={() => dialogRef.current.showModal()}>Add</button>
            <AddItemDialog dialogRef={dialogRef} itemsRef={itemsRef} db={db} items={items} />
        </>
    )
}