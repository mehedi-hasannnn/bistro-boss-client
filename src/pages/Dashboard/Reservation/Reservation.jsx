import React, { useState } from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const Reservation = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    item: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.email || !form.date || !form.time) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing information',
        text: 'Please fill out all required fields.',
      });
      return;
    }

    // Format the date for display
    const formattedDate = format(new Date(form.date), 'PP');

    // Prepare data to store
    const reservationData = {
      ...form,
      date: formattedDate
    };

    // Save to localStorage
    localStorage.setItem('userReservation', JSON.stringify(reservationData));

    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Reservation Confirmed!',
      text: `Your reservation for ${formattedDate} at ${form.time} has been saved.`,
      timer: 2000,
      showConfirmButton: false,
    });

    // Reset form
    setForm({
      name: '',
      email: '',
      date: '',
      time: '',
      item: '',
      notes: '',
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Make a Reservation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"
            required
          />
        </div>
        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"
              required
            />
          </div>
        </div>
        {/* Item / Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Item / Location</label>
          <input
            type="text"
            name="item"
            value={form.item}
            onChange={handleChange}
            placeholder="What are you reserving?"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"
          />
        </div>
        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-1">Additional Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Any special requests?"
            className="w-full px-4 py-2 border rounded focus:ring focus:ring-indigo-200"
          />
        </div>
        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Reserve Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reservation;
