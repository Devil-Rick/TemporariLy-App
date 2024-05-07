import { useState } from "react";
import Login from "../assets/Images/login.jpg";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import FormComponent from "../components/Form";
import { toast } from "react-toastify";
import { err } from "../assets/data/error";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {

  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const change = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const login = async (e) => {
    try {
      e.preventDefault();

      const auth = getAuth();
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (userCred) {
        navigate('/');
        toast.success('Login successful')
      }
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        toast.error(err[3]);
      } else {
        toast.error(err[2])
      }
      console.log(error.message);
    }
  }


  return (
    <section className="text-center">
      <h1 className="text-3xl mt-6 font-extrabold">Sign In</h1>

      <div className="layout-container px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 lg:mb-0">
          <img className="w-full rounded-md" src={Login} alt="Lock" />
        </div>

        <div className="md:w-[67%] lg:w-[40%] lg:ml-6">
          <form onSubmit={login}>
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
              page={'Sign In'}
              link={'/sign-up'}
              linkPara = {'/forgot-password'}
              text={"Don't have an account?"}
              pass={'Forgot Password ?'}
              work={'Register'}
            />

          </form>
        </div>
      </div>
    </section>
  );
}
