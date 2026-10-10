import { useSyncExternalStore } from "react";

const getKLTime = () =>
  new Intl.DateTimeFormat("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

const subscribeToClock = (onTick: () => void) => {
  const id = setInterval(onTick, 30_000);
  return () => clearInterval(id);
};

const Footer = () => {
  // Pages are pre-rendered at build time, so the clock is left empty in that
  // HTML (and while hydrating) and filled in once running in the browser.
  const time = useSyncExternalStore(subscribeToClock, getKLTime, () => "");

  return (
    <footer className="footer">
      <div className="container footer-row">
        <div>&copy; 2026 Afiq Nurhariz — All systems nominal</div>
        <div className="footer-time">
          Shah Alam · <span>{time} MYT</span>
        </div>
        <div>Designed &amp; built with curiosity</div>
      </div>
    </footer>
  );
};

export default Footer;
