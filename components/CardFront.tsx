import React, { useState } from 'react'
import styles from '../styles/Card.module.css'

interface CardDetails {
  cardNumber: string;
  Name: string;
  month: string;
  year: string;
  children: React.ReactNode;
}

export default function CardFront(props: CardDetails) {
  const [cardInitialNumber, setcardInitialNumber] = useState("0000 0000 0000 0000")
  
  return (
    
    <div className={styles.cardWrapper}>
      <div className={styles.cardNumber}>
      {props.cardNumber.length == 0 ? cardInitialNumber: props.cardNumber}
      </div>
      <div className={styles.userInfo}>
      {props.Name.length == 0 ? "Jane Applessed": props.Name}
        <div className={styles.cardDate}>
        {props.month.length == 0 ? "MM": props.month}
          /{props.year.length == 0 ? "YY": props.year}
        </div>
      </div>
    </div>
  )
}
