import { useState, useRef, useEffect } from "react";
import "./styles.css";

const numOfDigits = 5;

export default function App() {
  const [otp, setOtp] = useState(Array(numOfDigits).fill(""));
  const inputRef = useRef([]);

  const handleOnchange = (e, idx) => {
    let value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[idx] = value;
      return newOtp;
    });
    if (idx !== otp.length - 1) {
      inputRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (!e.target.Value && e.key === "Backspace" && idx != 0) {
      inputRef.current[idx - 1].focus();
    }
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Verify OTP</h1>
      <div style={styles.otpWrapper}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            maxLength={1}
            style={styles.otpInput}
            ref={(el) => (inputRef.current[index] = el)}
            onChange={(e) => handleOnchange(e, index)}
            onKeyUp={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
    fontFamily: "sans-serif",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  otpWrapper: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  otpInput: {
    width: "30px",
    height: "30px",
    textAlign: "center",
    fontSize: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s",
  },
};
