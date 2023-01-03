import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "public/images/logo.svg";
import googleLogo from "public/images/icons/google_logo.svg";
import authTools from "public/images/auth/mechanic.svg";
import { AuthService } from "services/auth.service";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { FieldValues, useForm } from "react-hook-form";

const authService = new AuthService("http://172.16.151.226:9000");

const SignUp = () => {
  return (
    <div className="sign-up">
      <form className="form">
        <div className="input-container">
          <label htmlFor="name">نام و نام خانوادگی:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="input-container">
          <label htmlFor="name">آدرس ایمیل:</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="password">
          <div className="input-container">
            <label htmlFor="password">رمز عبور:</label>
            <input type="password" name="password" id="password" />
          </div>
          <div className="input-container">
            <label htmlFor="rePassword">تکرار رمز عبور:</label>
            <input type="password" name="rePassword" id="rePassword" />
          </div>
        </div>
        <div className="login-with-google">
          <div className="line"></div>
          <span>یا ثبت نام با</span>
          <div className="line"></div>
        </div>
        <div className="google">
          <Image src={googleLogo} alt="google" />
          <span>ثبت نام با گوگل</span>
        </div>
        <button type="submit" className="sign-up-btn bg-mechanic box-shadow-mechanic">
          ثبت نام
        </button>
      </form>
      <Image src={authTools} alt="tools" className="tools-image" />
    </div>
  );
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const loginUser = async (data: FieldValues) => {
    try {
      const res = await authService.login(data);
      dispatch({
        type: REDUX_ACTION.SET_TOKEN,
        payload: res.data.key,
      });
      router.push("/mechanic/dashboard");
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  return (
    <div className="login">
      <form className="form" onSubmit={handleSubmit(loginUser)}>
        <div className="input-container">
          <label htmlFor="username">نام کاربری :</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
          />
          {errors.username && <p>username is required.</p>}
        </div>
        <div className="input-container">
          <label htmlFor="">رمز عبور:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>password is required.</p>}
        </div>
        <div className="login-with-google">
          <div className="line"></div>
          <span>یا ورود با</span>
          <div className="line"></div>
        </div>
        <div className="google">
          <Image src={googleLogo} alt="google" />
          <span>ثبت نام با گوگل</span>
        </div>
        <button type="submit" className="login-btn bg-mechanic box-shadow-mechanic">
          ورود
        </button>
      </form>
      <Image src={authTools} alt="tools" className="tools-image" />
    </div>
  );
};

const Auth = () => {
  const router = useRouter();

  const [authType, setAuthType] = useState<"login" | "signup">();

  useEffect(() => {
    (router.query.slug === "login" || router.query.slug === "signup") &&
      setAuthType(router.query.slug);
  }, [router.query.slug]);

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-tabs">
            <Link
              href="/mechanic/auth/login"
              className={authType === "login" ? "selected tab" : "tab"}
            >
              {"ورود"}
            </Link>
            <Link
              href="/mechanic/auth/signup"
              className={authType === "signup" ? "selected tab" : "tab"}
            >
              {"ثبت نام"}
            </Link>
          </div>
          <div className="logo">
            <Image src={logo} alt="logo" />
            <div className="title">
              <span>سامانه خرید و مشاوره قطعات خودرو</span>
            </div>
          </div>
        </div>
        <div className="auth-form">
          {authType === "login" ? <Login /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};
export default Auth;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.query.slug !== "login" && ctx.query.slug !== "signup") {
    ctx.res.setHeader("Location", "/mechanic/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
