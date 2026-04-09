import styles from "@/styles/SpiralBlackOverlay.module.css";

export default function SpiralBlackOverlay() {
  return (
    <div className={styles.curveOverlayContainer}>
      <div className={styles.topLineContainer}>
        <svg className={styles.curvedLineSvg} viewBox="0 0 100 25" preserveAspectRatio="none">
          <path
            d="M 0 15 L 45 15 C 48 15 48 0 50 0 C 52 0 52 15 55 15 L 100 15"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className={styles.pinOverlay}>
        <div className={styles.pinNeedle}></div>
      </div>
    </div>
  );
}
