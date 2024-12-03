import React, { useState, useEffect, useRef } from "react";
import styles from "./main.module.css";
import Header from "../header/header";

const Main = () => {
  const [attendanceStatus, setAttendanceStatus] = useState("");
  const [grass, setGrass] = useState(Array(30).fill(false)); // 잔디 상태
  const [visibleSections, setVisibleSections] = useState(Array(3).fill(false)); // 3개의 섹션을 초기화
  const [loginStatus, setLoginStatus] = useState({
    loggedIn: false,
    nickName: "",
  }); // 로그인 상태
  const sectionsRef = useRef([]);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/logincheck"
        );
        if (response.ok) {
          const data = await response.json();
          setLoginStatus(data);
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionsRef.current.indexOf(entry.target);
            setVisibleSections((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // 출석하기 처리 함수
  const handleAttendance = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/attend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loginStatus.nickName || "user123", // 로그인된 사용자 ID로 대체
        }),
      });

      if (response.ok) {
        setGrass((prev) => {
          const updated = prev.map((g, idx) =>
            idx === prev.findIndex((g) => !g) ? true : g
          );
          return updated;
        });
        setAttendanceStatus("🌱 출석이 성공적으로 기록되었습니다!");
      } else {
        setAttendanceStatus("❌ 출석 기록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      setAttendanceStatus("⚠️ 서버와 통신 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.main__wrap}>
      <Header />
      {/* 큰 출석하기 섹션 */}
      <section className={styles.videoSection}>
        <div className={styles.textContainer}>
          <h2>잔디를 매일매일 심어보세요~ 🌱</h2>
          <p>출석을 통해 하루하루 잔디를 채워가며 성실함을 기록하세요.</p>
        </div>
        <video autoPlay loop muted className={styles.video}>
          <source src="/video/grass.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* 출석 섹션 */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className={`${styles.largeSection} ${
          visibleSections[0] ? styles.visible : ""
        }`}
      >
        <h1>출석으로 잔디를 심으세요! 🌱</h1>
        <button
          className={styles.heroSectionCtaButton}
          onClick={handleAttendance}
        >
          출석하기
        </button>
        {attendanceStatus && (
          <p className={styles.heroSectionStatus}>{attendanceStatus}</p>
        )}
        <div className={styles.grassContainer}>
          {grass.map((isGreen, index) => (
            <div
              key={index}
              className={`${styles.grass} ${isGreen ? styles.grassActive : ""}`}
            >
              {isGreen ? "🌿" : "🟫"}
            </div>
          ))}
        </div>
      </section>

      {/* 나의 출석 기록 섹션 */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className={`${styles.section} ${
          visibleSections[1] ? styles.visible : ""
        }`}
      >
        <h2>나의 출석 기록 📅</h2>
        <p>출석 날짜와 시간을 한눈에 확인하세요.</p>
      </section>

      {/* 포트폴리오 섹션 */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className={`${styles.section} ${
          visibleSections[2] ? styles.visible : ""
        }`}
      >
        <h2>포트폴리오로 증명하세요 💼</h2>
        <p>출석으로 증명된 당신의 성실함, 포트폴리오에 추가하세요!</p>
      </section>
    </div>
  );
};

export default Main;
