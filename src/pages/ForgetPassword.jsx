import { useState } from "react";
import Login from "../assets/Images/login.jpg";
import FormComponent from "../components/Form";

export default function ForgetPassword() {
  const [email, setEmail] = useState('');

  const change = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section className="text-center">
      <h1 className="text-3xl mt-6 font-extrabold">Forgot Password</h1>

      <div className="layout-container px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 lg:mb-0">
          <img className="w-full rounded-md" src={Login} alt="Lock" />
        </div>

        <div className="md:w-[67%] lg:w-[40%] lg:ml-6">
          <form>

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
