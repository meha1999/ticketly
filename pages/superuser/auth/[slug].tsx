import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "public/images/logo.svg";
import googleLogo from "public/images/icons/google_logo.svg";
import authTools from "public/images/auth/superuser.svg";
import { AuthService } from "services/auth.service";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { FieldValues, useForm } from "react-hook-form";
import { setCookies } from "cookies-next";
import { useState } from "react";
import { Toaster } from "components/common/toast/Toaster";
import ToastComponent from "components/common/toast/ToastComponent";

const authService = new AuthService();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const loginUser = async (data: FieldValues) => {
    try {
      setBtnLoading(true);
      const res = await authService.login(data, "superuser");
      setCookies("role", "superuser");
      setCookies("token", res.data.key);
      dispatch({
        type: REDUX_ACTION.SET_TOKEN,
        payload: res.data.key,
      });
      setBtnLoading(false);
      setLoading(true);
      const userRes = await authService.getUser();
      dispatch({
        type: REDUX_ACTION.SET_USER,
        payload: userRes.data,
      });
      setLoading(false);
      router.push("/superuser/dashboard");
    } catch (err: any) {
      Toaster.error(
        <ToastComponent title="خطایی در وارد شدن شما بروز داده است" />
      );
    } finally {
      setBtnLoading(false);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="full-page-Container">
        <span className="loading" />
      </div>
    );
  } else {
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
            {errors.username && <p>وارد کردن نام‌کاربری اجباری است.</p>}
          </div>
          <div className="input-container">
            <label htmlFor="">رمز عبور:</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && <p>وارد کردن پسورد اجباری است.</p>}
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
          <button
            type="submit"
            className={`login-btn bg-superuser box-shadow-superuser ${
              btnLoading && "loading"
            }`}
            disabled={btnLoading}
          >
            ورود
          </button>
        </form>
        <Image src={authTools} alt="tools" className="tools-image" />
      </div>
    );
  }
};

const Auth = () => {
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-header" style={{ justifyContent: "flex-end" }}>
          <div className="logo">
            <Image src={logo} alt="logo" />
            <div className="title">
              <span>سامانه خرید و مشاوره قطعات خودرو</span>
            </div>
          </div>
        </div>
        <div className="auth-form" style={{ borderRadius: "60px" }}>
          <Login />
        </div>
      </div>
    </div>
  );
};
export default Auth;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.query.slug !== "login") {
    ctx.res.setHeader("Location", "/superuser/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
