import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import CardBack from '../components/CardBack'
import CardFront from '../components/CardFront'
import styles from '../styles/Home.module.css'



const Home: NextPage = () => {
 
  return (
    <div className={styles.conytainer}>
      <div className={styles.cardFront}> <CardFront></CardFront></div>
      <div className={styles.cardBack}> <CardBack></CardBack></div>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}></div>
    </div>

  )

}

export default Home
