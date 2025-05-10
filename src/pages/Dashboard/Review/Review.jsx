import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Review = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      name: user?.displayName || 'Anonymous',
      email: user?.email || 'N/A',
      rating,
      review,
      date: new Date().toLocaleString(),
    };

    // Save review to localStorage
    localStorage.setItem('userReview', JSON.stringify(reviewData));

    // Reset form
    setRating(0);
    setReview('');

    // Show success alert
    Swal.fire({
      icon: 'success',
      title: 'Review Submitted!',
      text: 'Thank you for your feedback!',
      confirmButtonColor: '#6366f1',
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-neutral">Add Your Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name and Email (Read-only) */}
        <input
          type="text"
          value={user?.displayName || ''}
          readOnly
          className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          className="block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded"
        />

        {/* Rating Stars */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Review Textarea */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          required
          className="block w-full px-3 py-2 border border-gray-300 rounded"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-neutral text-white px-6 py-2 rounded hover:bg-neutral-focus transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default Review;
