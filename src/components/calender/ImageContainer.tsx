import styles from "@/styles/ImageContainer.module.css";

export default function ImageContainer() {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.blueElementsWrapper}>
        <div className={styles.blueLeft}></div>
        <div className={styles.blueRight}></div>
      </div>
      <div className={styles.mountainImageContainer}>
        <img className={styles.mountainImage} src="/mountianeer-wallpaper.jpg" alt="Mountain climber" />
      </div>
    </div>
  );
}
