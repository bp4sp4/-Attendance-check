import React, { createContext, useState, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState({
    isLoggedIn: false,
    nickName: "",
  });
  const [loading, setLoading] = useState(true); // 로그인 상태 로딩 관리

  // 서버 세션을 통해 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/logincheck",
          {
            method: "GET",
            credentials: "include", // 세션 쿠키를 보내기 위해
          }
        );

        if (response.ok) {
          // 응답이 정상일 때만 처리
          const data = await response.json();
          if (data.isLoggedIn) {
            setLoginStatus({
              isLoggedIn: true,
              nickName: data.userName || "",
            });
          } else {
            setLoginStatus({ isLoggedIn: false, nickName: "" });
          }
        } else {
          setLoginStatus({ isLoggedIn: false, nickName: "" });
        }
      } catch (error) {
        console.error("로그인 상태 확인 실패:", error);
        setLoginStatus({ isLoggedIn: false, nickName: "" }); // 실패 시 로그인 상태 초기화
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    checkLoginStatus(); // 페이지 로드시 로그인 상태 확인
  }, []);

  return (
    <LoginContext.Provider value={{ loginStatus, setLoginStatus, loading }}>
      {children}
    </LoginContext.Provider>
  );
};
