import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
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
            <li>
              <Link to="/login" className={styles.loginbtn}>
                회원가입/로그인
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
