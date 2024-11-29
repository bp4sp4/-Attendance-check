import React, { useEffect, useState } from "react";

const KakaoLogin = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const kakaoAppKey = process.env.REACT_APP_KAKAO_APP_KEY;

    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoAppKey);
    }

    if (window.Kakao.Auth.getAccessToken()) {
      fetchUserInfo();
    }
  }, []);

  // 사용자 정보 가져오기
  const fetchUserInfo = () => {
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function (response) {
        console.log("User Info: ", response);
        setUserInfo(response);
      },
      fail: function (error) {
        console.error(error);
      },
    });
  };

  // 카카오 로그인 함수 (동의 항목 요청 추가)
  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname", // 요청할 동의 항목들 (예: 프로필, 이메일)
      success: function (authObj) {
        // 로그인 성공 시 사용자 정보 가져오기
        fetchUserInfo();
      },
      fail: function (error) {
        console.error(error);
      },
    });
  };

  // 카카오 로그아웃 함수
  const handleKakaoLogout = () => {
    window.Kakao.Auth.logout(function () {
      console.log("로그아웃 되었습니다.");
      setUserInfo(null); // 로그아웃 후 사용자 정보 초기화
    });
  };

  return (
    <div>
      {!userInfo ? (
        <button onClick={handleKakaoLogin}>카카오로 로그인</button>
      ) : (
        <div>
          <p>환영합니다, {userInfo.kakao_account.profile.nickname}님!</p>{" "}
          {/* nickname 위치 수정 */}
          <button onClick={handleKakaoLogout}>카카오로 로그아웃</button>
        </div>
      )}
    </div>
  );
};

export default KakaoLogin;
