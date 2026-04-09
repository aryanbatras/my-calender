import styles from "@/styles/SpiralWhiteOverlay.module.css";

export default function SpiralWhiteOverlay() {
  return (
    <div className={styles.curveOverlayContainer}>
      <div className={styles.topLineContainer}>
        <svg className={styles.curvedLineSvg} viewBox="0 0 100 25" preserveAspectRatio="none">
          <path
            d="M 0 11 L 45 11 C 48 11 48 0 50 0 C 52 0 52 11 55 11 L 100 11"
            fill="none"
            stroke="#aeacac"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
