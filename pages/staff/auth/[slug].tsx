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
import SeoHead from "components/common/seo-head";
import errorHandler from "src/tools/error-handler";
import { BsEye, BsEyeSlash } from "react-icons/bs";

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
    "email" | "mobile_phone"
  >("email");
  const [accountId, setAccountId] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const signUpUser = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await authService.signUp(
        {
          ...data,
          mobile_phone: data.mobile_phone ? "+98" + data.mobile_phone : null,
          email: data.email ? data.email : null,
        },
        "staff"
      );
      setAccountId(+res.data.id);
      setIsValidateModalOpen(true);
    } catch (error: any) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const submitWithOtpCode = async (otp: string) => {
    const payload = {
      account_id: accountId,
      platform: signUpValidateType === "email" ? "EMAIL" : "SMS",
      code: otp,
    };
    setLoading(true);
    try {
      await authService.validate(payload);
      router.push("/staff/auth/login");
      Toaster.success(
        <ToastComponent
          title="???????????? ????????"
          description="???????? ???????? ?????????????? ???? ?????????? ???????? ????????"
        />
      );
      setIsValidateModalOpen(false);
    } catch (error: any) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      await authService.resendOtp({
        account_id: accountId,
        [signUpValidateType]: getValues(signUpValidateType),
      });
      Toaster.success(
        <ToastComponent
          title="???????????? ????????"
          description="???? ???????? ???????? ?????? ?????????? ????"
        />
      );
    } catch (error: any) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    resetField(signUpValidateType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signUpValidateType]);

  return (
    <div className="sign-up">
      <form className="form" onSubmit={handleSubmit(signUpUser)}>
        <div className="input-container">
          <label htmlFor="full_name">?????? ?? ?????? ???????????????? :</label>
          <input
            type="text"
            id="full_name"
            aria-invalid={!!errors.full_name}
            {...register("full_name", { required: true })}
          />
          {errors.full_name && <p>???????? ???????? ?????? ?? ?????? ???????????????? ???????????? ??????.</p>}
        </div>
        <div className="input-container">
          <label htmlFor="username">?????? ????????????:</label>

          <input
            type="text"
            id="username"
            aria-invalid={!!errors.username}
            {...register("username", {
              required: true,
              pattern: /[A-Za-z][A-Za-z0-9_]{4,29}$/,
            })}
          />
          {errors.username && (
            <p>???????? ?????? ???????????? ?????? ???? ???? ?????????? ???????? ????????????</p>
          )}
        </div>
        <div className="password">
          <div className="input-container" style={{ width: "45%" }}>
            <label htmlFor="password">?????? ????????:</label>
            <input
              id="password"
              aria-invalid={!!errors.password}
              type={showPassword ? "text" : "password"}
              {...register("password", { min: 8, required: true })}
            />
            {showPassword ? (
              <BsEye onClick={() => setShowPassword(false)} />
            ) : (
              <BsEyeSlash onClick={() => setShowPassword(true)} />
            )}
            {errors.password && <p>???????? ???????? ?????? ???????? ???????????? ??????.</p>}
          </div>
          <div className="input-container" style={{ width: "45%" }}>
            <label htmlFor="rePassword">?????????? ?????? ????????:</label>
            <input
              type="password"
              id="rePassword"
              {...register("rePassword", {
                min: 8,
                required: true,
                deps: ["password"],
              })}
            />
            {showPassword ? (
              <BsEye onClick={() => setShowPassword(false)} />
            ) : (
              <BsEyeSlash onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>
        <div className="login-with-google">
          <div className="line"></div>
          <span style={{ fontSize: 16 }}>????</span>
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
            ??????????
          </button>
          <button
            type="button"
            className={`item ${
              signUpValidateType === "mobile_phone" ? "active" : ""
            } `}
            onClick={() => setSignUpValidateType("mobile_phone")}
          >
            ?????????? ????????????
          </button>
        </div>
        <div className="input-container">
          {signUpValidateType === "email" ? (
            <input
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              {...register("email", { required: true })}
            />
          ) : (
            <div className="phone">
              <input
                maxLength={10}
                id="mobile_phone"
                type="mobile_phone"
                placeholder="9120000000"
                aria-invalid={!!errors.mobile_phone}
                {...register("mobile_phone", { required: true, min: 10 })}
              />
            </div>
          )}
        </div>
        <button type="submit" className="sign-up-btn bg-staff box-shadow-staff">
          {loading ? "?????????? ??????????" : "?????? ??????"}
        </button>
      </form>
      <Image src={authTools} alt="tools" className="tools-image" />
      <OtpCodeModal
        loading={loading}
        isOpen={isValidateModalOpen}
        handleReset={() => resendOtp()}
        value={getValues(signUpValidateType)}
        onClose={() => setIsValidateModalOpen(false)}
        onSubmission={(otp) => submitWithOtpCode(otp)}
        title={signUpValidateType === "email" ? "??????????" : "?????????? ????????"}
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
  const [showPassword, setShowPassword] = useState(false);

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
    } catch (error: any) {
      errorHandler(error);
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
            <label htmlFor="username">?????? ???????????? :</label>
            <input
              type="text"
              id="username"
              aria-invalid={!!errors.username}
              {...register("username", {
                required: true,
                pattern: /[A-Za-z][A-Za-z0-9_]{4,29}$/,
              })}
            />
            {errors.username && (
              <p>???????? ?????? ???????????? ?????? ???? ???? ?????????? ???????? ????????????</p>
            )}
          </div>
          <div className="input-container">
            <label htmlFor="">?????? ????????:</label>
            <input
              id="password"
              aria-invalid={!!errors.password}
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, min: 8 })}
            />
            {showPassword ? (
              <BsEye onClick={() => setShowPassword(false)} />
            ) : (
              <BsEyeSlash onClick={() => setShowPassword(true)} />
            )}
            {errors.password && <p>???????? ???????? ?????? ???????? ???????????? ??????.</p>}
          </div>
          <div className="login-with-google">
            <div className="line"></div>
            <span style={{ fontSize: 16 }}>????</span>
            <div className="line"></div>
          </div>
          <div className="google">
            <Image src={googleLogo} alt="google" />
            <span style={{ fontSize: 14 }}>???????? ???? ????????</span>
          </div>
          <button
            type="submit"
            className={`login-btn bg-staff box-shadow-staff ${
              btnLoading && "loading"
            }`}
            disabled={btnLoading}
          >
            ????????
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
    <>
      <div className="auth">
        <div className="auth-container">
          <div className="auth-header">
            <div className="auth-tabs">
              <Link
                href="/staff/auth/login"
                className={authType === "login" ? "selected tab" : "tab"}
              >
                {"????????"}
              </Link>
              <Link
                href="/staff/auth/signup"
                className={authType === "signup" ? "selected tab" : "tab"}
              >
                {"?????? ??????"}
              </Link>
            </div>
            <div className="logo">
              <Image src={logo} alt="logo" />
              <div className="title">
                <span>???????????? ???????? ?? ???????????? ?????????? ??????????</span>
              </div>
            </div>
          </div>
          <div className="auth-form">
            {authType === "login" ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
      <SeoHead
        title={router.query.slug === "login" ? "????????" : "?????? ??????"}
        description=""
      />
    </>
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
