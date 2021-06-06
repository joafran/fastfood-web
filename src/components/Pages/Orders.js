import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import Order from '../ui/Order';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    const handleSnapshot = (snapshot) => {
        const ordersFirebase = snapshot.docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        setOrders(ordersFirebase);
    }

    useEffect(() => {
        const getOrders = () => {
            firebase.db.collection('orders').where('isDone','==', false).onSnapshot(handleSnapshot)
        }
        getOrders()
    }, [])
    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Orders</h1>
            <div className="sm:flex sm:flex-wrap mx-3">
                {orders.map( order => (
                    <Order 
                    key={order.id}
                    order={order}
                    />
                ))}
            </div>
        </>
     );
}
 
export default Orders;