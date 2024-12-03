import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import KakaoLogin from "./kakologin";
import Header from "../header/header";

const Login = () => {
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [idAvailable, setIdAvailable] = useState(null);

  const navigate = useNavigate();

  const checkIdAvailability = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user/check-id/${loginId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIdAvailable(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setIdAvailable(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      loginId: loginId,
      password: password,
      name: nickname,
      email: email,
      nickName: nickname,
    };

    const response = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      navigate("/"); // 회원가입 성공 시 메인 페이지로 리디렉션
    } else {
      console.error("회원가입 실패");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.signupContainer}>
        <h1 className={styles.title}>회원가입</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">아이디</label>
            <div className={styles.idCheckButtonWrapper}>
              <input
                type="text"
                id="username"
                name="username"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
              <button type="button" onClick={checkIdAvailability}>
                중복체크
              </button>
            </div>
            {idAvailable === false && (
              <p style={{ color: "red" }}>이 아이디는 이미 사용 중입니다.</p>
            )}
            {idAvailable === true && (
              <p style={{ color: "green" }}>사용 가능한 아이디입니다.</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력하세요"
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
    </>
  );
};

export default Login;
