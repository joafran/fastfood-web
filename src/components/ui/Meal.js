import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';

const Meal = ({ meal }) => {
    
    const { firebase } = useContext(FirebaseContext); 
    
    const availableRef = useRef(meal.available);
    const { id, name, price, category, available, image, description } = meal;
    
    const updateAvailability = () => {
        const isAvailable = (availableRef.current.value === "true");
        try {
         firebase.db.collection('meals').doc(id).update({available: isAvailable})   
        } catch (error) {
            console.log(error);
        }
        console.log(isAvailable)
    }



    return ( 
        <div className="w-full px-3 my-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12 ">
                        <img src={image} alt="meal image" className="h-52 w-full rounded" />
                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2 font-semibold">Available</span>
                                <select className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus: outline-none focus:shadow-outline"
                                value={available}
                                ref={availableRef}
                                onChange={() => updateAvailability()}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
                        <p className=" text-gray-600 mb-4">Category: {' '}
                            <span className="text-gray-700 font-bold">{category.toUpperCase()}</span>
                        </p>
                        <p className=" text-gray-600 mb-4">{description}</p>
                        <p className=" text-gray-600 mb-4">Price: {' '}
                            <span className="text-gray-700 font-bold">${price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Meal;