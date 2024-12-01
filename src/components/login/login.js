import React from "react";
import styles from "./login.module.css";
import KakaoLogin from "../login/kakologin";

const Login = () => {
  return (
    <div className={styles.signupContainer}>
      <h1 className={styles.title}>회원가입</h1>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          회원가입
        </button>
      </form>

      <div className={styles.divider}>
        <span>또는</span>
      </div>

      <KakaoLogin />
    </div>
  );
};

export default Login;
