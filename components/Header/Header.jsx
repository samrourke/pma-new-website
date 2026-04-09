import styles from "./Header.module.css";

export default function Header({
  title,
  textColor,
  align,
  paddingT,
  textAlign,
  children,
}) {
  return (
    <div
      className={styles.header}
      style={{ alignItems: align, paddingTop: paddingT }}
    >
      <h2
        className={styles.title}
        style={{ color: textColor, textAlign: textAlign }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
