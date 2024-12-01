import React, { useState } from "react";
import styles from "./main.module.css";

import Header from "../header/header";

const HeroSection = () => {
  const [attendanceStatus, setAttendanceStatus] = useState("");

  const handleAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/attend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123", // 실제 로그인된 사용자 ID로 대체
        }),
      });

      if (response.ok) {
        setAttendanceStatus("출석이 성공적으로 기록되었습니다!");
      } else {
        setAttendanceStatus("출석 기록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAttendanceStatus("서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.main__wrap}>
      <Header />
      <button
        className={styles.heroSectionCtaButton}
        onClick={handleAttendance}
      >
        출석하기
      </button>
      {attendanceStatus && (
        <p className={styles.heroSectionStatus}>{attendanceStatus}</p>
      )}
    </div>
  );
};

export default HeroSection;
