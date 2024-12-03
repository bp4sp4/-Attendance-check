import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

const LoginPage = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { loginId, password };

    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      navigate("/"); // 로그인 성공 시 메인 페이지로 리디렉션
    } else {
      setError("아이디나 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>로그인</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="loginId">아이디</label>
            <input
              type="text"
              id="loginId"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submitButton}>
            로그인
          </button>
        </form>

        <div className={styles.links}>
          <button onClick={() => navigate("/signup")}>회원가입</button>
          <button onClick={() => navigate("/find-id")}>아이디 찾기</button>
          <button onClick={() => navigate("/find-password")}>
            비밀번호 찾기
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
