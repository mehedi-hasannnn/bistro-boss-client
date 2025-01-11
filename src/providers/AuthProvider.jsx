import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../Firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(true); // Ensure loading is set while we process everything

            if (currentUser) {
                try {
                    // Call your API to get the token
                    const userInfo = { email: currentUser.email };
                    const response = await axiosPublic.post('/jwt', userInfo);

                    // If a token is received, store it and set the user state
                    if (response.data.token) {
                        localStorage.setItem('access-token', response.data.token);
                        setUser(currentUser);  // Only set the user after the token is saved
                    }
                } catch (error) {
                    console.error("Error fetching token:", error);
                }
            } else {
                // Remove token and set user to null if the user is logged out
                localStorage.removeItem('access-token');
                setUser(null);
            }

            setLoading(false);  // Set loading to false once processing is done
        });

        // Clean up subscription when the component unmounts
        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
