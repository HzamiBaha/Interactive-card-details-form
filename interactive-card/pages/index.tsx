import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CardBack from '../components/CardBack'
import CardFront from '../components/CardFront'
import styles from '../styles/Home.module.css'


type Values = {
  name: string,
  number: string,
  month: string,
  year: string,
  cvc: string,
}
const Home: NextPage = () => {
  const [values, setValues] = useState<Values>({
    name: "",
    number: "",
    month: "",
    year: "",
    cvc: "",
  });

  useEffect(() => {
    const cardInput = (document.getElementById("card") as HTMLInputElement);
    if (cardInput != null) {
      cardInput.addEventListener("keydown", function (e) {
        const txt = this.value;
        // prevent more than 12 characters, ignore the spacebar, allow the backspace
        if ((txt.length == 19 || e.which == 32) && e.which !== 8) e.preventDefault();
        // add spaces after 3 & 7 characters, allow the backspace
        if ((txt.length == 4 || txt.length == 9 || txt.length == 14) && e.which !== 8)
          this.value = this.value + " ";
      });
    }
  }, [])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(values)
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardFront}> <CardFront cardNumber={values.number} Name={values.name} month={values.month} year={values.year}> </CardFront></div>
      <div className={styles.cardBack}> <CardBack cvc={values.cvc}></CardBack></div>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formContol}>
            <label className={styles.label}>CARDHOLDER Name</label>
            <input
              className={styles.formInput}
              placeholder="e.g.Jane Applessed"
              type="text"
              name="name"
              value={values.name || ""}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formContol}>
            <label className={styles.label} >CARD NUMBER</label>
            <input
              id='card'
              className={styles.formInput}
              placeholder="e.g.0000 0000 0000 0000"
              type="pattern"
              name="number"
              pattern='[\d]{4} [\d]{4} [\d]{4} [\d]{4}'
              value={values.number || ""}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formwrapper}>
            <div className={styles.formContol} style={{ width: "50%" }}>
              <label className={styles.label} >exp. date (mm/YY) </label>
              <div className={styles.formContolDate}>
                <input
                  className={styles.formInput}
                  placeholder="MM"
                  type="text"
                  name="month"
                  value={values.month || ""}
                  onChange={handleChange}
                />
                <input
                  className={styles.formInput}
                  placeholder="YY"
                  type="text"
                  name="year"
                  value={values.year || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formContol} style={{ width: "50%" }}>
              <label className={styles.label} >CVC</label>
              <input
                className={styles.formInput}
                type="text"
                name="cvc"
                value={values.cvc || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <input className={styles.button} type="submit" value="Confirm" />
        </form>
      </div>

    </div>


  )

}

export default Home
