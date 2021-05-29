import React from 'react';

const NewFood = () => {
    return ( 
        <>
            <h1 className="text-4xl font-light mb-4">Add Food</h1>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="name"
                                type="text"
                                placeholder="Food name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="price"
                                type="number"
                                placeholder="$20"
                                min="0"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                            <select 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="category"
                            >
                            <option value="">-- Select --</option>
                            <option value="food">Food</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="dinner">Dinner</option>
                            <option value="drinks">Drinks</option>
                            <option value="sweets">Sweets</option>
                            <option value="salad">Salad</option>

                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                id="image"
                                type="file"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                            <textarea 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="description"
                                placeholder="Description of the food"
                            ></textarea>
                        </div>
                        <input 
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-2 p-2 text-white uppercase font-bold cursor-pointer "
                            value="Add Food"
                        />
                    </form>
                </div>
            </div>
        </>
     );
}
 
export default NewFood;