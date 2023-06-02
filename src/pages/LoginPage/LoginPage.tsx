import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./LoginPage.scss";
import { Login } from "../../types/interface";
import { EnvelopeSimple, EyeSlash, LockKey } from "@phosphor-icons/react";
import { useState } from "react";

const LoginPage = () => {
  const [invisible, setInvisible] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Login>();

  const toggle = () => {
    setInvisible((prev: boolean) => (prev = !invisible));
  };

  const onSubmit: SubmitHandler<Login> = (data: Login) => {
    console.log(data);
  };

  return (
    <div className="LoginPage">
      <div className="wrapper">
        <h1>Welcome Back!!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text">Enter your login details below</p>
          <div className="formController">
            <label htmlFor="">Email*</label>
            <input
              type="email"
              placeholder="Your Email"
              className={`${errors.email && "invalid"}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Enter a valid Email Address",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
            />

            <span className={`icone ${errors.email && "error"}`}>
              {" "}
              <EnvelopeSimple weight="bold" />
            </span>

            {errors.email && <small>{errors.email.message}</small>}
          </div>

          <div className="formController">
            <label htmlFor="">password*</label>

            <input
              type={invisible ? "password" : "text"}
              placeholder="Your password"
              {...register("password", {
                required: "password is required",
                pattern: {
                  value: /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message:
                    "password should be 8-20 characters include # to last character !",
                },
              })}
              onKeyUp={() => {
                trigger("email");
              }}
              className={`${errors.password && "invalid"}`}
            />

            <span className={`icone ${errors.password && "error"}`}>
              <LockKey weight="bold" />
            </span>

            <span className="cash-eye" role="button" onClick={() => toggle()}>
              <EyeSlash weight="fill" />
            </span>
            {errors.password && <small>{errors.password.message}</small>}
          </div>

          <div className="forgot">
            <Link to={"/forgotpassword"}>
              <span>forgot password?</span>
            </Link>
          </div>
          <div className="btn-container">
            <button
              disabled={!isValid}
              className={`${isValid && "submit"}`}
              type="submit"
            >
              {isSubmitting ? "loading..." : "sign in"}
            </button>
          </div>

          <p>
            Don't have account yet?{" "}
            <strong>
              <Link to="/register">Sign Up</Link>
            </strong>
          </p>

          <pre>{JSON.stringify(watch())}</pre>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
