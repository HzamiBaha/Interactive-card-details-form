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
  const [success, setsuccess] = useState(false)
  const [cvcError, setcvcError] = useState("")
  const [monthError, setmonthError] = useState("")
  const [yearError, setyearError] = useState("")
  const [cardError, setcardError] = useState("")
  useEffect(() => {
    const cardInput = (document.getElementById("card") as HTMLInputElement);
    const yearInput = (document.getElementById("year") as HTMLInputElement);
    const monthInput = (document.getElementById("month") as HTMLInputElement);
    const cvcInput = (document.getElementById("cvc") as HTMLInputElement);
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
    if (yearInput != null) {
      yearInput.addEventListener("keydown", function (e) {
        const txt = this.value;
        if ((txt.length == 2 || e.which == 32) && e.which !== 8) e.preventDefault();
      });
    }
    if (monthInput != null) {
      monthInput.addEventListener("keydown", function (e) {
        const txt = this.value;
        if ((txt.length == 2 || e.which == 32) && e.which !== 8) e.preventDefault();
      });
    }
    if (cvcInput != null) {
      cvcInput.addEventListener("keydown", function (e) {
        const txt = this.value;
        if ((txt.length == 3 || e.which == 32) && e.which !== 8) e.preventDefault();
      });
    }
  }, [])


  const cvcErrorHandler = (cvc: string) => {

    if (cvc.length <= 2) {
      setcvcError("Cvc should contain 3 digts")
    }
    else if (!(Number(cvc))) {
      setcvcError("please enter a valid CVC")
    }
    else {
      setcvcError("")
    }
  }
  const monthErrorHandler = (month: string) => {
    if (!(Number(month)) || (Number(month) >= 13 || Number(month) == 0 || month.length <= 1)) {
      setmonthError("Please enter a valid month")
    }
    else {
      setmonthError("")
    }
  }
  const cardErrorHandler = (card: string) => {
    if (!(Number(card.replace(/\s/g, ''))) || (card.replace(/\s/g, '').length < 16)) {
      setcardError("Please enter a valid card Number")
    }
    else {
      setcardError("")
    }
  }
  const yearErrorHandler = (year: string) => {
    const current = new Date().getFullYear()
    console.log(current.toString().slice(2, 4))
    console.log(year)
    if (!(Number(year)) || year.length <= 1) {
      setyearError("Please enter a valid year")
    }
    else if (Number(year) <= Number(current.toString().slice(2, 3))) {
      console.log("bingo")
      setyearError("your card was expired")
    }
    else {
      setyearError("")
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    cvcErrorHandler(values.cvc)
    monthErrorHandler(values.month)
    yearErrorHandler(values.year)
    cardErrorHandler(values.number)

    event.preventDefault();

  }
  useEffect(() => {
    if ((yearError === "") && (monthError === "") && (cvcError === "") && (cardError === "")) {
      setsuccess(true)

    }
  }, [yearError, monthError, cvcError, cardError])

  return (
    <div className={styles.container}>
      <div className={styles.cardFront}> <CardFront cardNumber={values.number} Name={values.name} month={values.month} year={values.year}> </CardFront></div>
      <div className={styles.cardBack}> <CardBack cvc={values.cvc}></CardBack></div>
      <div className={styles.leftSide}></div>
      <div className={styles.rightSide}>

        {success ? <> <div className={styles.form}>
          <div className={styles.check}>
            <div className={styles.icon}></div>
          </div>
          <div className={styles.Success}> Thank you !</div>
          <div className={styles.labelSuc}>We’ve added your card details</div>
          <button className={styles.button} onClick={() => { setsuccess(false) }}> Confirm</button>

        </div></> : <>
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
                value={values.number || ""}
                onChange={handleChange}
              />
              <span className={styles.error}>{cardError}</span>
            </div>
            <div className={styles.formwrapper}>
              <div className={styles.formContol} style={{ width: "50%" }}>
                <label className={styles.label} >exp. date (mm/YY) </label>
                <div className={styles.formContolDate}>
                  <div>
                    <input
                      id='month'
                      className={styles.formInput}
                      placeholder="MM"
                      type="text"
                      name="month"
                      value={values.month || ""}
                      onChange={handleChange}
                    />
                    <span className={styles.error}>{monthError}</span>
                  </div>
                  <div>
                    <input
                      id='year'
                      className={styles.formInput}
                      placeholder="YY"
                      type="text"
                      name="year"
                      value={values.year || ""}
                      onChange={handleChange}
                    />
                    <span className={styles.error}>{yearError}</span>
                  </div>

                </div>
              </div>
              <div className={styles.formContol} style={{ width: "50%" }}>
                <label className={styles.label} >CVC</label>
                <input
                  id='cvc'
                  className={styles.formInput}
                  type="text"
                  name="cvc"
                  value={values.cvc || ""}
                  onChange={handleChange}
                />
                <span className={styles.error}>{cvcError}</span>
              </div>
            </div>

            <input className={styles.button} type="submit" value="Confirm" />
          </form> </>}


      </div>

    </div>


  )

}

export default Home
