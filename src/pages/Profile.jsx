import { useState } from "react";

// Imports for Authorization and Editing functionality using firebase authentication
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";

export default function Profile() {
  const auth = getAuth();
  const [editChange, setEditChange] = useState(false);

  const [formData, setFormData] = useState({
    fullName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const navigate = useNavigate();


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
        await updateDoc(docRef,{
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
    <>
      <section className="text-center">
        <h1 className="text-3xl mt-6 font-extrabold">My Profile</h1>

        <div className="layout-container px-6 py-12 max-w-6xl mx-auto">

          <div className="md:w-[67%] lg:w-[40%] lg:ml-6">
            <form onSubmit={console.log('Submitted')}>
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
                    className="cursor-pointer text-red-600 font-semibold hover:text-red-800 transition duration-200 ease-in-out">
                    &nbsp;{editChange ? 'Apply Changes.' : 'Edit.'}
                  </span>
                </p>

                <p
                  onClick={logout}
                  className="cursor-pointer text-blue-700 font-semibold hover:text-blue-900 transition duration-200 ease-in-out">
                  Sign Out
                </p>

              </div>

              <button className="bg-blue-500 w-full text-white py-2 mb-4 
              font-medium rounded uppercase shadow-md hover:shadow-lg transition 
              duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-900" type="Submit">
                sell or rent your home
              </button>

            </form>
          </div>
        </div>
      </section>
    </>
  )
}
