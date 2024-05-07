import { useState } from "react";
import Login from "../assets/Images/login.jpg";
import FormComponent from "../components/Form";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {err} from '../assets/data/error'

export default function ForgetPassword() {
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const change = (e) => {
    setEmail(e.target.value);
  };

  const resPass = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      await sendPasswordResetEmail(auth , email);
      navigate('/sign-in');
      toast.success('Reset Password has been successfully sent.');

    } catch (error) { 
      toast.error(err[2]);
      console.log(error.message);
    }

  };

  return (
    <section className="text-center">
      <h1 className="text-3xl mt-6 font-extrabold">Forgot Password</h1>

      <div className="layout-container px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 lg:mb-0">
          <img className="w-full rounded-md" src={Login} alt="Lock" />
        </div>

        <div className="md:w-[67%] lg:w-[40%] lg:ml-6">
          <form onSubmit={resPass}>

            <input
              className="form-component"
              type="email"
              id="email"
              value={email}
              placeholder="Email Address..."
              onChange={change}
              required
            />

            <FormComponent page={'Send reset email'} work={'Login'} pass={true} />

          </form>
        </div>
      </div>
    </section>
  );
}
