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
        <>
            <h1 className="text-3xl font-light mb-4">Menu</h1>
            <Link to="/new-food" className="bg-blue-800 hover:bg-blue-700 w-3/12 mt-2 p-2 text-white uppercase font-bold cursor-pointer ">
                Add Food
            </Link>
            {meals.map( meal => (
                <Meal 
                    key={meal.id}
                    meal={meal}
                />
            ))}
        </>
     );
}
 
export default Menu;