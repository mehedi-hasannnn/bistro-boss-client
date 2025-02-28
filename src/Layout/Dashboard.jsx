import React from 'react';
import { FaBook, FaCalendar, FaHome, FaList, FaShoppingCart, FaUser, FaUsers, FaUtensils } from 'react-icons/fa';
import { MdOutlineReviews } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { MdContactEmergency } from "react-icons/md";
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    return (
        <div className='flex'>
            <div className="w-64 min-h-screen bg-yellow-600">
                <ul className="menu p-4">
                    {
                        isAdmin ? <>

                    <li><NavLink to="/dashboard/adminHome"> <FaHome></FaHome> Admin Home</NavLink> </li>
                    
                    <li><NavLink to="/dashboard/addItems"> <FaUtensils></FaUtensils> Add Items </NavLink> </li>

                    <li><NavLink to="/dashboard/manageItems">  <FaList></FaList>  Manage Items</NavLink> </li>

                    <li><NavLink to="/dashboard/bookings">  <FaBook></FaBook>  Manage Bookings</NavLink> </li>
                    
                    <li><NavLink to="/dashboard/users">  <FaUsers></FaUsers> All Users</NavLink> </li>
                        
                        </>
                        :
                        <>
                        <li><NavLink to="/dashboard/userHome"> <FaHome></FaHome> User Home</NavLink> </li>
                    
                    <li><NavLink to="/dashboard/reservation"> <FaCalendar></FaCalendar> Reservation</NavLink> </li>

                    <li><NavLink to="/dashboard/cart">  <FaShoppingCart></FaShoppingCart>  My Cart ({cart.length}) </NavLink> </li>

                    <li><NavLink to="/dashboard/review">  <MdOutlineReviews />  Add Review</NavLink> </li>
                    
                    <li><NavLink to="/dashboard/paymentHistory">  <FaList></FaList>  Payment History</NavLink> </li>
                        </>
                    }

                    {/* Shared Navlinks */}
                    <div className="divider"></div>

                    <li><NavLink to="/"> <FaHome></FaHome> Home</NavLink> </li>
                    <li><NavLink to="/order/salad"> <MdRestaurantMenu /> Menu </NavLink> </li>
                    <li><NavLink to="/order/contact"> <MdContactEmergency /> Contact </NavLink> </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className='flex-1 p-8'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;