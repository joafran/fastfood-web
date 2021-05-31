import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader'

const NewFood = () => {
    const [success, setSuccess] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState('');


    const { firebase } = useContext(FirebaseContext)
    const history = useHistory();

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
        onSubmit: async (meal) => {
            try {
                meal.available = true;
                meal.image = imageUrl
                await firebase.db.collection('meals').add(meal);
                console.log(formik.values);
                setSuccess(true);
            } catch (error) {
                console.log(error)
            }
        }
    });

    const handleAddMoreFood = () => {
        formik.setValues(formik.initialValues);
        setSuccess(false);
    }

    // Image functions

    const handleUploadStart = () => {
        setProgress(0);
        setUploading(true);
    }

    const handleUploadError = (error) => {
        setUploading(false);
        console.log(error)
    }

    const handleUploadSuccess = async (name) => {
        setProgress(100);
        setUploading(false);
        const url = await firebase.storage.ref("meal-picture").child(name).getDownloadURL()
        console.log(url);
        setImageUrl(url);
    }

    const handleProgress = (progress) => {
        setProgress(progress);
    }


    return ( 
        <>
            <div className="min-h-screen" style={{background: `url(https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940) no-repeat center center/cover`}}>
                <h1 className="text-4xl font-bold mx-3 p-4 bg-gray-900 max-w-xs text-yellow-500 uppercase">New Meal</h1>
                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-3xl">
                        {success ? (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-5" role="dialog">
                                <p className="font-bold">Done!</p>
                                <p>The meal was added successfully 😄</p>
                                <div>
                                    <button onClick={() => history.push('/menu')} className="p-4 border rounded bg-blue-900 cursor-pointer text-indigo-100 font-semibold hover:bg-opacity-80">Go to Menu</button>
                                    <button onClick={() => handleAddMoreFood()} className="p-4 border rounded bg-green-500 cursor-pointer text-white font-semibold hover:bg-opacity-80 ">Add another food</button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={formik.handleSubmit}>
                            <div className="mb-4">
                                <label className="block bg-gray-800 w-max py-2 px-5 rounded text-white text-sm font-light mb-2" htmlFor="name">Name</label>
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
                                <label className="block bg-gray-800 w-max py-2 px-5 rounded text-white text-sm font-light mb-2" htmlFor="price">Price</label>
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
                                <label className="block bg-gray-800 w-max py-2 px-5 rounded text-white text-sm font-light mb-2" htmlFor="category">Category</label>
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
                                <label className="block bg-gray-800 w-max py-2 px-5 rounded text-white text-sm font-light mb-2" htmlFor="image">Image</label>
                                <FileUploader 
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    className="bg-white p-2 rounded w-full"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("meal-picture")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </div>
                            { uploading && (
                                <div className="h-12 relative w-full border">
                                    <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progress}%`}}>
                                        {progress}%
                                    </div>
                                </div>

                            )}

                            { imageUrl && (
                                <p className="bg-green-500 text-white p-3 text-center my-5">
                                    The image was uploaded successfully.
                                </p>
                            )

                            }

                            <div className="mb-4">
                                <label className="block bg-gray-800 w-max py-2 px-5 rounded text-white text-sm font-light mb-2" htmlFor="description">Description</label>
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

                        )
                        }
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default NewFood;