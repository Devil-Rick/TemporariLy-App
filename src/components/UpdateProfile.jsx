import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react'
import { FcHome } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

export default function UpdateProfile() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [editChange, setEditChange] = useState(false);
    const [formData, setFormData] = useState({
        fullName: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const { fullName, email } = formData;

    const change = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const update = async () => {
        try {
            if (auth.currentUser.displayName !== fullName) {
                await updateProfile(auth.currentUser, ({
                    displayName: fullName,
                }))

                const docRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(docRef, {
                    fullName,
                })

                toast.success('Profile details updated successfully')
            }
        } catch (error) {
            toast.error('Changes cannot be applied')
        }
    }

    const logout = () => {
        auth.signOut();
        navigate('/sign-in');
    }


    return (
        <div className="layout-container px-6 py-12 max-w-6xl mx-auto">

            <div className="md:w-[67%] lg:w-[40%] lg:ml-6">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    navigate('/create-listing')
                }}>
                    <input
                        className="form-component"
                        type="text"
                        id="fullName"
                        value={fullName}
                        placeholder="Email Address..."
                        disabled={!editChange}
                        onChange={change}
                    />

                    <div className="relative">
                        <input
                            className="form-component"
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Email Address"
                            disabled={!editChange}
                            onChange={change}
                        />
                    </div>

                    <div className="justify-between layout-container mb-6">
                        <p>Do you want to change your name?
                            <span
                                onClick={() => {
                                    editChange && update
                                    setEditChange(!editChange)
                                }}
                                className="cursor-pointer text-red-600 
                                font-semibold hover:text-red-800 transition duration-200 ease-in-out">
                                &nbsp;{editChange ? 'Apply Changes.' : 'Edit.'}
                            </span>
                        </p>

                        <p
                            onClick={logout}
                            className="cursor-pointer text-blue-700 
                            font-semibold hover:text-blue-900 transition duration-200 ease-in-out">
                            Sign Out
                        </p>

                    </div>

                    <button className="flex items-center justify-center
                        bg-blue-500 w-full text-white py-2 mb-4 
                        font-medium rounded uppercase shadow-md hover:shadow-lg transition 
                        duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-900" type="Submit">
                        <span className="mr-2 p-1 text-2xl rounded-full bg-orange-300">
                            <FcHome />
                        </span>
                        <span>sell or rent your home</span>
                    </button>

                </form>
            </div>
        </div>
    )
}
