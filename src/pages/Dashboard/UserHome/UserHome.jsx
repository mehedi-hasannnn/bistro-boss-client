import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const UserHome = () => {
  const { user } = useAuth();
  const [userReview, setUserReview] = useState(null);
  const [userReservation, setUserReservation] = useState(null);

  useEffect(() => {
    const storedReview = localStorage.getItem('userReview');
    if (storedReview) {
      setUserReview(JSON.parse(storedReview));
    }

    const storedReservation = localStorage.getItem('userReservation');
    if (storedReservation) {
      setUserReservation(JSON.parse(storedReservation));
    }
  }, []);

  const handleDeleteReview = () => {
    localStorage.removeItem('userReview');
    setUserReview(null);
  };

  const handleDeleteReservation = () => {
    localStorage.removeItem('userReservation');
    setUserReservation(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Welcome Message */}
      <h2 className="text-3xl mb-4 font-semibold text-neutral">
        Hi, Welcome {user?.displayName ? user.displayName : 'Back'}
      </h2>

      {/* User Info Section */}
      <div className="bg-white dark:bg-neutral shadow-md p-4 rounded border dark:border-gray-600 mb-6 flex items-center gap-4">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User avatar"
            className="w-16 h-16 rounded-full border object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            {user?.displayName?.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-lg font-medium">{user?.displayName || 'Unknown User'}</p>
          <p className="text-sm text-gray-500">{user?.email || 'Email not available'}</p>
        </div>
      </div>

      {/* Review Section */}
      {userReview ? (
        <div className="bg-white dark:bg-neutral shadow-md p-4 rounded border dark:border-gray-600 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-neutral">Your Latest Review</h3>
          <p><strong>Name:</strong> {userReview.name}</p>
          <p><strong>Email:</strong> {userReview.email}</p>
          <p><strong>Rating:</strong> {userReview.rating} ⭐</p>
          <p><strong>Message:</strong> {userReview.review}</p>
          <p><strong>Date:</strong> {userReview.date}</p>
          <button
            onClick={handleDeleteReview}
            className="mt-3 text-red-600 hover:underline text-sm"
          >
            Delete Review
          </button>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">You haven't submitted a review yet.</p>
      )}

      {/* Reservation Section */}
      {userReservation ? (
        <div className="bg-white dark:bg-neutral shadow-md p-4 rounded border dark:border-gray-600">
          <h3 className="text-xl font-semibold mb-2 text-neutral">Your Reservation Details</h3>
          <p><strong>Name:</strong> {userReservation.name}</p>
          <p><strong>Email:</strong> {userReservation.email}</p>
          <p><strong>Date:</strong> {userReservation.date}</p>
          <p><strong>Time:</strong> {userReservation.time}</p>
          <p><strong>Item/Location:</strong> {userReservation.item}</p>
          <p><strong>Notes:</strong> {userReservation.notes || 'None'}</p>
          <button
            onClick={handleDeleteReservation}
            className="mt-3 text-red-600 hover:underline text-sm"
          >
            Delete Reservation
          </button>
        </div>
      ) : (
        <p className="text-gray-500">You haven't made a reservation yet.</p>
      )}
    </div>
  );
};

export default UserHome;
