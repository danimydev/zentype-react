import styles from './index.module.css';

function FAButton({ action, fontawesomeClasses }) {
  return (
    <div className={styles.FAButton} onClick={action}>
      <i className={fontawesomeClasses}></i>
    </div>
  )
}

export default FAButton;