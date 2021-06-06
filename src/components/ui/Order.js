import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';

const Order = ({order}) => {
    const [deliveryTime, setTime] = useState(0);
    const { firebase } = useContext(FirebaseContext);

    const setDeliveryTime = (id) => {
        console.log('soy ID',id);
        try {
            firebase.db.collection('orders').doc(id).update({deliveryTime});
        } catch (error) {
            console.log(error);
        }

    }
    
    return ( 
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold"></h1>
                {order.order.map( meal => (
                    <p className="text-gray-600">{meal.quantity} {meal.name}</p>
                    ))}
                <p className="text-gray-700 font-bold">Total to pay: ${order.total}</p>
                {order.deliveryTime === 0 && (
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Delivery Time
                        </label>
                        <input
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " 
                        min="1"
                        value={deliveryTime}
                        onChange={ e => setTime(parseInt(e.target.value))}
                        placeholder="20"
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            onClick={ () => setDeliveryTime(order.id)}
                        >
                            Set time
                        </button>
                    </div>
                )}
            </div>
        </div>
     );
}
 
export default Order;