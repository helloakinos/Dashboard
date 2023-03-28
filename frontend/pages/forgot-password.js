import Image from "next/image";
import Link from "next/link";
import styles from "./Login.module.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Logo = (props) => {
  return <Image src="/logo.png" alt="Lima Logo" width="59.25px" height="50px" />;
};

const Farm = (props) => {
  return <Image src="/farm.png" alt="Farming" priority />;
};

function Forgot_Password() {
  const [email, setEmail] = useState("");

  const router = useRouter();
  const authenticated = useSelector((state) => state.authStore.authenticated);

  useEffect(() => {
    const token = localStorage.getItem("LimaToken");
    if (authenticated || token) {
      router.push("/");
    }
  }, [authenticated]);

  function handleChange(e) {
    setEmail(e.target.value);
  }

  async function submitVerify(email) {
    axios
      .post(`${process.env.custom_API}/auth/verify`, {
        email,
      })
      .then((res) => {
        let name = res.data.name;
        let email = res.data.email;
        if (res.status == 200) {
          axios.post("/api/forgotpassword", {
            name,
            email,
          });
        } else {
          alert(`There is no email connected to this account`);
          setEmail("");
        }
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
            <h2 className={`${styles.readexPro} ${styles.welcome}`}>Welcome</h2>
          </div>
          <p
            className={`${styles.readexPro} ${styles.login} ${styles.loginInputDiv}`}
          >
            Reset your password
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitVerify(email);
            }}
          >
            <div className={styles.loginInputDiv}>
              <label htmlFor="email" className={styles.beVietnamPro}>
                Receive a reset link in your inbox:{" "}
              </label>
              <br></br>
              <br></br>
              <div className={styles.inputFieldIcon}>
                <input
                  type="email"
                  id="email-reset"
                  name="email-reset"
                  placeholder="submit your registered email address"
                  autoComplete="on"
                  required
                  className={`${styles.beVietnamPro} ${styles.forgetPasswordInputIndent} ${styles.inputFormSize}`}
                  value={email}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <input
              type="submit"
              className={`${styles.beVietnamPro} ${styles.inputFormSize} ${styles.loginInputDiv} ${styles.loginButton}`}
              value="Submit"
            />
            <p className={`${styles.beVietnamPro16}`}>
              Take me back to{" "}
              <Link href="/login">
                <a>login</a>
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

export default Forgot_Password;
