import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [nickName, setNickName] = useState(""); // 사용자 닉네임

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/logincheck",
          {
            method: "GET",
            credentials: "include", // 세션을 포함한 요청
          }
        );
        const data = await response.json();
        if (data.loggedIn) {
          setIsLoggedIn(true);
          setNickName(data.nickName); // 로그인한 사용자 정보
        } else {
          setIsLoggedIn(false);
          setNickName(""); // 로그인되지 않은 상태
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패", error);
      }
    };

    checkLoginStatus();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

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
            {/* 로그인 상태에 따른 조건부 렌더링 */}
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
