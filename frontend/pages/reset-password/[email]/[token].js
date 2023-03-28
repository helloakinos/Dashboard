import Image from "next/image";
import Link from "next/link";
import styles from "../../Login.module.css";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import axios from "axios";

const Logo = (props) => {
  return <Image src="/logo.png" alt="Lima Logo" width="59.25px" height="50px" />;
};

const Farm = (props) => {
  return <Image src="/farm.png" alt="Farming" priority />;
};

function Reset_Password() {
  const [newpassword, setNewpassword] = useState({
    newpassword1: "",
    newpassword2: "",
  });

  const router = useRouter();
  const { email, token } = router.query;

  const secret = process.env.JWT_SECRET + email;

  function handleChange(e) {
    const { name, value } = e.target;
    setNewpassword((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function submitNewPassword(newpassword) {
    if (newpassword.newpassword1 == newpassword.newpassword2) {
      axios
        .put(`${process.env.custom_API}/auth/newpassword`, {
          email,
          password: newpassword.newpassword1,
        })
        .then((res) => {
          if (res.status == 201) {
            router.push("/login");
          }
        });
    } else {
      alert("Please make sure you type the same password 2x");
    }
  }

  try {
    const payload = jwt.verify(token, secret);
    return (
      <div className={styles.loginpage}>
        <div className={styles.loginText}>
          <div className={styles.loginTextMargin}>
            <div className={styles.welcomeDiv}>
              <div className={styles.logo}>
                <Logo />
              </div>
              <h2 className={`${styles.readexPro} ${styles.welcome}`}>
                Welcome
              </h2>
            </div>
            <p
              className={`${styles.readexPro} ${styles.login} ${styles.loginInputDiv}`}
            >
              Create a new password
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitNewPassword(newpassword);
              }}
            >
              <div className={styles.loginInputDiv}>
                <label htmlFor="newpassword" className={styles.beVietnamPro}>
                  Create a new password (must be at least 8 characters long):{" "}
                </label>
                <div className={styles.inputFieldIcon}>
                  <i aria-hidden className={`fas fa-lock ${styles.icon}`}></i>
                  <input
                    type="password"
                    id="newpassword1"
                    name="newpassword1"
                    placeholder="enter your new password here"
                    minLength="8"
                    autoComplete="on"
                    required
                    className={`${styles.beVietnamPro} ${styles.loginInputIndent} ${styles.inputFormSize}`}
                    value={newpassword.newpassword1}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.inputFieldIcon}>
                  <i aria-hidden className={`fas fa-lock ${styles.icon}`}></i>
                  <input
                    type="password"
                    id="newpassword2"
                    name="newpassword2"
                    placeholder="Re-enter your new password here"
                    minLength="8"
                    autoComplete="on"
                    required
                    className={`${styles.beVietnamPro} ${styles.loginInputIndent} ${styles.inputFormSize}`}
                    value={newpassword.newpassword2}
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
  } catch (error) {
    return (
      <div className={styles.loginpage}>
        <div className={styles.loginText}>
          <div className={styles.loginTextMargin}>
            <div className={styles.welcomeDiv}>
              <div className={styles.logo}>
                <Logo />
              </div>
              <h2 className={`${styles.readexPro} ${styles.welcome}`}>
                Welcome
              </h2>
            </div>
            <p
              className={`${styles.readexPro} ${styles.login} ${styles.loginInputDiv}`}
            >
              Password-Reset Link Expired
            </p>
            <form>
              <p className={`${styles.beVietnamPro16}`}>
                Go back to{" "}
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
}

export default Reset_Password;
