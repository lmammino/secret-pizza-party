import React from 'react'
import useInvite from './hooks/useInvite'
import PizzaImage from './images/Pizza'
import ErrorImage from './images/Error'
import styles from './Home.module.css'

export default function Home () {
  const [invite, error] = useInvite()

  if (error) {
    return <div className={styles.error}>
      <p><ErrorImage width={200}/></p>
      <p>{error}</p>
    </div>
  }

  if (!invite) {
    return <PizzaImage className="spin" width={200}/>
  }

  return (
    <>
      <PizzaImage width={200}/>
      <h1 className={styles.title}>Secret Pizza Party!</h1>
      <h2 className={styles.subtitle}>Dec 31st 2022 - 122 and 1/8th, New York City</h2>

      <div className={styles.card} style={{ borderColor: invite.favouriteColor }}>
        <h3>Hello, <strong>{invite.name}</strong>!</h3>
        <p>You have been invited to the most awesome secret pizza party of the year!</p>
        <fieldset className={styles.fieldset} onChange={(e) => console.log((e.target as HTMLInputElement).value, invite.code)}>
          <legend>Are you coming?</legend>

          <label htmlFor="yes">
            <input type="radio" id="yes" name="coming" value="yes"/>
            Cowabunga! (yes)
          </label>

          <label htmlFor="no">
            <input type="radio" id="no" name="coming" value="no"/>
            Nitwits! (no)
          </label>
        </fieldset>
        <p>
          <small>
            <strong>P.S.</strong> You don&apos;t need to bring your <strong>{invite.weapon}</strong>, <em>Shredder</em> is not invited!
          </small>
        </p>
      </div>
    </>
  )
}
