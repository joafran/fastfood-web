import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';

const NewFood = () => {

    const { firebase } = useContext(FirebaseContext)

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            category: '',
            image: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(5,'The name must be at least 5 characters long.').required('Name is required'),
            price: Yup.number().min(1, 'Price should be at least 1').required('Price is required'),
            category: Yup.string().required('Category is required'),
            description: Yup.string().min(10,'The description must be longer').required('Description is required')
        }),
        onSubmit: meal => {
            try {
                meal.available = true;
                firebase.db.collection('productos').add(meal);
            } catch (error) {
                console.log(error)
            }
        }
    })

    return ( 
        <>
            <div className="min-h-full" style={{background: `url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940) no-repeat center center/cover`}}>
                <h1 className="text-4xl font-bold mx-3 p-4 bg-gray-900 max-w-xs text-yellow-500 uppercase">New Meal</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-3xl">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="name"
                                    type="text"
                                    placeholder="Food name"
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            {(formik.touched.name && formik.errors.name) ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="font-bold">Error:</p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null
                            }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Price</label>
                                <input 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="price"
                                    type="number"
                                    placeholder="$20"
                                    min="0"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                            </div>
                            {(formik.touched.price && formik.errors.price) ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="font-bold">Error:</p>
                                    <p>{formik.errors.price}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
                                <select 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="category"
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                            {(formik.touched.category && formik.errors.category) ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="font-bold">Error:</p>
                                    <p>{formik.errors.category}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                                <input 
                                    className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                    />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                                <textarea 
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                    id="description"
                                    placeholder="Description of the food"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                    ></textarea>
                            </div>
                            {(formik.touched.description && formik.errors.description) ? (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="font-bold">Error:</p>
                                    <p>{formik.errors.description}</p>
                                </div>
                            ) : null
                            }

                            <input 
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 w-full mt-2 p-2 text-white uppercase font-bold cursor-pointer "
                                value="Add Meal"
                                />
                        </form>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default NewFood;