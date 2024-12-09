import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../login/LoginContext";
import styles from "./header.module.css";

const Header = () => {
  const { loginStatus } = useContext(LoginContext);
  const { isLoggedIn, nickName } = loginStatus;

  return (
    <div className={styles.header}>
      <div className={styles.header__wrap}>
        <Link to="/" className={styles.logo}>
          출석Check!
        </Link>
        <nav>
          <ul className={styles.header__list}>
            <li>
              <Link to="/record">기록보기</Link>
            </li>
            <li>
              <Link to="/ranking">랭킹</Link>
            </li>
            {!isLoggedIn ? (
              <li>
                <Link to="/login" className={styles.loginbtn}>
                  회원가입/로그인
                </Link>
              </li>
            ) : (
              <li>
                <span className={styles.userGreeting}>
                  {nickName}님, 안녕하세요! 🌟
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
