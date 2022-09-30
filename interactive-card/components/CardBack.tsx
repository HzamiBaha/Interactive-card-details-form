import React from 'react'
import styles from '../styles/Card.module.css'
interface CardbackDetails {
  cvc: string;
}
export default function CardBack(props: CardbackDetails) {
  return (
    <div className={styles.cardWrapperback}>
      <div className={styles.cvcBox}>   {props.cvc.length == 0 ? "XXX": props.cvc}</div>

    </div>
  )
}
