import React, { useState } from 'react';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            date: '2025-05-10',
            status: 'Pending'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            date: '2025-05-12',
            status: 'Approved'
        }
    ]);

    const [newBooking, setNewBooking] = useState({
        name: '',
        email: '',
        date: '',
        status: 'Pending'
    });

    const handleStatusChange = (id, newStatus) => {
        const updated = bookings.map(booking =>
            booking.id === id ? { ...booking, status: newStatus } : booking
        );
        setBookings(updated);
    };

    const handleDelete = id => {
        const filtered = bookings.filter(booking => booking.id !== id);
        setBookings(filtered);
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setNewBooking(prev => ({ ...prev, [name]: value }));
    };

    const handleAddBooking = e => {
        e.preventDefault();
        const newEntry = { ...newBooking, id: Date.now() };
        setBookings([...bookings, newEntry]);
        setNewBooking({ name: '', email: '', date: '', status: 'Pending' });
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

            <form onSubmit={handleAddBooking} className="mb-6 p-4 border rounded bg-gray-50">
                <h3 className="text-lg font-semibold mb-2">Add New Booking</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={newBooking.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={newBooking.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        className="input input-bordered w-full"
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={newBooking.date}
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                    />
                    <select
                        name="status"
                        value={newBooking.status}
                        onChange={handleInputChange}
                        className="select select-bordered w-full"
                    >
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Cancelled</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Add Booking</button>
            </form>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking.id}>
                                <th>{index + 1}</th>
                                <td>{booking.name}</td>
                                <td>{booking.email}</td>
                                <td>{booking.date}</td>
                                <td>
    <select
        className={`select select-bordered select-sm
            ${booking.status === 'Approved' ? 'bg-green-400' :
              booking.status === 'Pending' ? 'bg-yellow-400' :
              booking.status === 'Cancelled' ? 'bg-red-400' : ''
            }`}
        value={booking.status}
        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
    >
        <option>Pending</option>
        <option>Approved</option>
        <option>Cancelled</option>
    </select>
</td>

                                <td>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-4">No bookings found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
