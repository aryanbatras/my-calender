import styles from "@/styles/SpiralBinding.module.css";

export default function SpiralBinding() {
  return (
   <div className={styles.spiralContainer}>
    <div className={styles.spiralLeft}>
      <img src="/spiral-binding-vector-vertical.png" alt="Spiral Left" />
      <div className={styles.greyBoxContainer}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div className={styles.midCurve}></div>
    <div className={styles.spiralRight}>
      <img src="/spiral-binding-vector-vertical.png" alt="Spiral Right" />
      <div className={styles.greyBoxContainer}>
       <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
   </div>
  );
}
