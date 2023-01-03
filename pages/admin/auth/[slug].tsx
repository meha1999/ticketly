import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "public/images/logo.svg";
import googleLogo from "public/images/icons/google_logo.svg";
import authTools from "public/images/auth/admin.svg";
import { AuthService } from "services/auth.service";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { FieldValues, useForm } from "react-hook-form";

const authService = new AuthService("http://172.16.151.226:9000");

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
      router.push("/admin/dashboard");
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
        <button type="submit" className="login-btn bg-admin box-shadow-admin">
          ورود
        </button>
      </form>
      <Image src={authTools} alt="tools" className="tools-image" />
    </div>
  );
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
        <div className="auth-form">
          <Login />
        </div>
      </div>
    </div>
  );
};
export default Auth;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.query.slug !== "login") {
    ctx.res.setHeader("Location", "/admin/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
