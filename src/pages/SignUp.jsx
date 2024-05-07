import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../assets/Images/login.jpg";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import FormComponent from "../components/Form";
// firebase authentication imports
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { db } from '../firebase.config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { err } from "../assets/data/error";


export default function SignUp() {

  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = formData;
  const navigate = useNavigate();

  const change = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };


  // Adding user using firebase authentication
  const addUser = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth();

      const userCreds = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCreds.user;
      const docRef = doc(db, 'users', user.uid)

      updateProfile(auth.currentUser, {
        displayName: fullName
      })

      const formDataCopy = { ...formData, timestamp: serverTimestamp() }
      delete formDataCopy.password
      await setDoc(docRef, formDataCopy)
      toast.success('Successfully added user')
      navigate('/')
    } catch (error) {

      if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        toast.error(err[0])
      } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        toast.error(err[1])
      } else {
        toast.error(err[2])
      }

    }
  }

  return (
    <section className="text-center">
      <h1 className="text-3xl mt-6 font-extrabold">Sign Up</h1>

      <div className="layout-container px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 lg:mb-0">
          <img className="w-full rounded-md" src={Login} alt="Lock" />
        </div>

        <div className="md:w-[67%] lg:w-[40%] lg:ml-6">
          <form onSubmit={addUser}>

            <input
              className="form-component"
              type="text"
              id="fullName"
              value={fullName}
              placeholder="Full Name..."
              onChange={change}
              required
            />

            <input
              className="form-component"
              type="email"
              id="email"
              value={email}
              placeholder="Email Address..."
              onChange={change}
              required
            />

            <div className="relative">
              <input
                className="form-component"
                type={showPass ? "text" : "password"}
                id="password"
                value={password}
                placeholder="Password..."
                onChange={change}
                required
              />

              {showPass ? (
                <IoIosEyeOff
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer absolute top-3 right-5 text-xl"
                />
              ) : (
                <IoIosEye
                  onClick={() => setShowPass(!showPass)}
                  className="cursor-pointer absolute top-3 right-5 text-xl"
                />
              )}
            </div>

            <FormComponent
              page={'Sign Up'}
              link={'/sign-in'}
              linkPara={'/forgot-password'}
              text={"Have an Account."}
              pass={'Forgot Password ?'}
              work={'Sign In'}
            />

          </form>
        </div>
      </div>
    </section>
  );
}
