import Image from "next/image";
import Link from "next/link";
import styles from "./Login.module.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../src/authSlice";
import axios from "axios";

const Logo = (props) => {
  return <Image src='/logo.png' alt="Lima Logo" width="59.25px" height="50px" />;
};

const Farm = (props) => {
  return <Image src="/farm.png" alt="Farming" priority />;
};
function Login() {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.authStore.authenticated);

  useEffect(() => {
    const token = localStorage.getItem("LimaToken");
    if (authenticated || token) {
      router.push("/");
    }
  }, [authenticated]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function submitLogin(email, password) {
    axios
      .post(`${process.env.custom_API}/auth/token`, {
        email,
        password,
      })
      .then(async (response) => {
        localStorage.setItem("LimaToken", response.data.access_token);
        dispatch(login());
      })
      .catch((error) => {
        alert("Unable to login, wrong email or password");
      });
  }

  return (
    <div className={styles.loginpage}>
      <div className={styles.loginText}>
        <div className={styles.loginTextMargin}>
          <div className={styles.welcomeDiv}>
            <div className={styles.logo}>
              <Logo />
            </div>
            <h1 className={`${styles.readexPro} ${styles.welcome}`}>
              Welcome back
            </h1>
          </div>
          <p
            className={`${styles.readexPro} ${styles.login} ${styles.loginInputDiv}`}
          >
            Login
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitLogin(info.email, info.password);
            }}
          >
            <div className={styles.loginInputDiv}>
              <label htmlFor="email" className={styles.beVietnamPro}>
                E-Mail Address:{" "}
              </label>
              <div className={styles.inputFieldIcon}>
                <i aria-hidden className={`far fa-envelope ${styles.icon}`}></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="user@email.com"
                  pattern=".+@.+\..+"
                  autoComplete="on"
                  required
                  className={`${styles.beVietnamPro} ${styles.loginInputIndent} ${styles.inputFormSize} ${styles.input}`}
                  value={info.email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className={styles.loginInputDiv}>
              <label htmlFor="password" className={styles.beVietnamPro}>
                Password:{" "}
              </label>
              <div className={styles.inputFieldIcon}>
                <i aria-hidden className={`fas fa-lock ${styles.icon}`}></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="at least 8 characters"
                  minLength="8"
                  autoComplete="on"
                  required
                  className={`${styles.beVietnamPro} ${styles.loginInputIndent} ${styles.inputFormSize}`}
                  value={info.password}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <label className={`${styles.loginInputDiv} ${styles.checkbox}`}>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <span className={styles.beVietnamPro}>Remember Me</span>
            </label>
            <input
              type="submit"
              className={`${styles.beVietnamPro} ${styles.inputFormSize} ${styles.loginInputDiv} ${styles.loginButton}`}
              value="Login"
            />

            <p className={`${styles.beVietnamPro16}`}>
              Don’t have an account?{" "}
              <Link href="/signup">
                <a>Sign up</a>
              </Link>
            </p>
            <br></br>
            <p className={`${styles.beVietnamPro16}`}>
              Forgot your password?{" "}
              <Link href="/forgot-password">
                <a>Reset Password</a>
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className={`${styles.imageContainer}`}>
        <Image
          src="/farm.png"
          alt="Farming"
          layout="fill"
          className={styles.image}
          priority
        />
      </div>
      <style jsx>
        {`
          ::placeholder {
            color: rgba(154, 165, 177, 1);
          }
          input {
            border: solid rgba(154, 165, 177, 1);
            border-radius: 4px;
          }
          input[type="checkbox"] {
            margin-right: 0.5vw;
            width: 0.9vw;
            height: 0.9vw;
          }
          a {
            color: rgba(0, 168, 150, 1);
            text-decoration: underline;
          }
          button:active {
            background-color: rgb(1, 138, 125);
          }
        `}
      </style>
    </div>
  );
}

export default Login;
