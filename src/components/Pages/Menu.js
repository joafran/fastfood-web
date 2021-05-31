import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Meal from '../ui/Meal';

const Menu = () => {
    const { firebase } = useContext(FirebaseContext);
    const [meals, setMeals] = useState([]);

    const handleSnapshot = (snapshot) => {
        const mealsInfo = snapshot.docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        setMeals(mealsInfo)
    }
    
    useEffect(() => {
        const getMeals =  () => {
            firebase.db.collection('meals').onSnapshot(handleSnapshot);
        }
        console.log(meals)
        getMeals();
    }, [])

    return ( 
        <div className="bg-gray-200 p-3">
            <h1 className="bg-gray-900 text-white rounded p-2 text-3xl font-semibold mb-4 text-center">Menu 📋</h1>
            <Link to="/new-food" className="bg-blue-600 rounded hover:bg-blue-400 w-3/12 mt-2 p-3 text-white uppercase font-bold cursor-pointer ">
                Add Food +
            </Link>
            {meals.map( meal => (
                <Meal 
                    key={meal.id}
                    meal={meal}
                />
            ))}
        </div>
     );
}
 
export default Menu;