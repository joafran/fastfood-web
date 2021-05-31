import React from 'react';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return ( 
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6 ">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Fast-Food 🍕</p>
                <p className="mt-3 text-gray-600 ">Manage your restaurant with the following options</p>
                <nav className="mt-10">
                    <NavLink className="p-1 text-2xl my-3 text-gray-300 block hover:bg-yellow-500 hover:text-gray-900 " activeClassName="text-yellow-500" exact to="/">
                        Orders ✏
                    </NavLink>
                    <NavLink className="p-1 text-2xl text-gray-300 block hover:bg-yellow-500 hover:text-gray-900 " activeClassName="text-yellow-500" exact to="/menu">
                        Menu 📋
                    </NavLink>
                </nav>
            </div>
        </div>
     );
}
 
export default Sidebar;