import { useEffect, useRef, useState } from "react";

interface LoaderProps {
  onDone: () => void;
}

const Loader = ({ onDone }: LoaderProps) => {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    const duration = 1800;
    const steps = 100;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(timer);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(() => {
              setHidden(true);
              setTimeout(onDone, 700);
            }, 200);
          }
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div className={`loader${hidden ? " hidden" : ""}`} aria-hidden="true">
      <div className="loader-inner">
        <div className="loader-pct">{String(count).padStart(3, "0")}</div>
        <div className="loader-label">Booting neural engine</div>
      </div>
    </div>
  );
};

export default Loader;
