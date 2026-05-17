import { useEffect, useState } from "react";

const getKLTime = () =>
  new Intl.DateTimeFormat("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

const Footer = () => {
  const [time, setTime] = useState(getKLTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getKLTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-row">
        <div>&copy; 2026 Afiq Nurhariz — All systems nominal</div>
        <div className="footer-time">
          <span className="dot" />
          Shah Alam · <span>{time} MYT</span>
        </div>
        <div>Designed &amp; built with curiosity</div>
      </div>
    </footer>
  );
};

export default Footer;
