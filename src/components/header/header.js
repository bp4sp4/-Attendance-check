import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__wrap}>
        <a href="{() => false}">
          <Link to="/">출석Check!</Link>
        </a>
        <nav>
          <ul className={styles.header__list}>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
