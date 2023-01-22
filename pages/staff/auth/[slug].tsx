import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "public/images/logo.svg";
import googleLogo from "public/images/icons/google_logo.svg";
import authTools from "public/images/auth/staff.svg";
import { AuthService } from "services/auth.service";
import { useDispatch } from "react-redux";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import { FieldValues, useForm } from "react-hook-form";
import { setCookies } from "cookies-next";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import OtpCodeModal from "components/common/modal/OtpCodeModal";

const authService = new AuthService();

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isValidateModalOpen, setIsValidateModalOpen] = useState(false);
  const [signUpValidateType, setSignUpValidateType] = useState<
    "email" | "mobile"
  >("email");

  const signUpUser = async (data: FieldValues) => {
    setLoading(true);
    try {
      await authService.signUp(data, "staff");
      router.push("/staff/auth/login");
      Toaster.success(
        <ToastComponent
          title="موفقیت امیز"
          description="لطفا برای استفاده از سیستم وارد شوید"
        />
      );
    } catch (err) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    } finally {
      setLoading(false);
    }
  };

  const submitWithOtpCode = (otp: string) => {
    console.log(otp);
  };

  useEffect(() => {
    resetField(signUpValidateType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpValidateType]);

  return (
    <div className="sign-up">
      <form className="form" onSubmit={handleSubmit(signUpUser)}>
        <div className="input-container">
          <label htmlFor="full_name">نام و نام خانوادگی :</label>
          <input
            type="text"
            id="full_name"
            {...register("full_name", { required: true })}
          />
          {errors.full_name && <p>وارد کردن نام و نام خانوادگی اجباری است.</p>}
        </div>
        <div className="input-container">
          <label htmlFor="username">نام کاربری:</label>

          <input
            type="text"
            id="username"
            {...register("username", { required: true })}
          />
          {errors.username && <p>وارد کردن نام‌کاربری اجباری است.</p>}
        </div>
        <div className="password">
          <div className="input-container">
            <label htmlFor="password">رمز عبور:</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && <p>وارد کردن پسورد اجباری است.</p>}
          </div>
          <div className="input-container">
            <label htmlFor="rePassword">تکرار رمز عبور:</label>
            <input
              type="password"
              id="rePassword"
              {...register("rePassword", { required: true })}
            />
          </div>
        </div>
        <div className="login-with-google">
          <div className="line"></div>
          <span>یا</span>
          <div className="line"></div>
        </div>
        <div className="type-change">
          <button
            type="button"
            className={`item ${
              signUpValidateType === "email" ? "active" : ""
            } `}
            onClick={() => setSignUpValidateType("email")}
          >
            ایمیل
          </button>
          <button
            type="button"
            className={`item ${
              signUpValidateType === "mobile" ? "active" : ""
            } `}
            onClick={() => setSignUpValidateType("mobile")}
          >
            شماره موبایل
          </button>
        </div>
        <div className="input-container">
          {signUpValidateType === "email" ? (
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
          ) : (
            <input
              id="mobile"
              type="mobile"
              maxLength={11}
              {...register("mobile", { required: true })}
            />
          )}
        </div>
        <button
          // type="submit"
          onClick={() => setIsValidateModalOpen(true)}
          className="sign-up-btn bg-staff box-shadow-staff"
        >
          {loading ? "درحال انجام" : "ثبت نام"}
        </button>
      </form>
      <Image src={authTools} alt="tools" className="tools-image" />
      <OtpCodeModal
        isOpen={isValidateModalOpen}
        value={getValues(signUpValidateType)}
        onClose={() => setIsValidateModalOpen(false)}
        onSubmission={(otp) => submitWithOtpCode(otp)}
        title={signUpValidateType === "email" ? "ایمیل" : "شماره تلفن"}
        onChangeValue={(newValue) => setValue(signUpValidateType, newValue)}
      />
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
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const loginUser = async (data: FieldValues) => {
    try {
      setBtnLoading(true);
      const res = await authService.login(data, "staff");
      setCookies("role", "staff");
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
      router.push("/staff/dashboard");
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
            <span>یا</span>
            <div className="line"></div>
          </div>
          <div className="google">
            <Image src={googleLogo} alt="google" />
            <span>ورود با گوگل</span>
          </div>
          <button
            type="submit"
            className={`login-btn bg-staff box-shadow-staff ${
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
              href="/staff/auth/login"
              className={authType === "login" ? "selected tab" : "tab"}
            >
              {"ورود"}
            </Link>
            <Link
              href="/staff/auth/signup"
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
    ctx.res.setHeader("Location", "/staff/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
