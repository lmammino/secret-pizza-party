import React, { ChangeEvent } from 'react'
import useInvite from './hooks/useInvite'
import PizzaImage from './images/Pizza'
import ErrorImage from './images/Error'
import styles from './Home.module.css'

export default function Home () {
  const { inviteResponse, error, updating, updateRsvp } = useInvite()

  if (error) {
    return <div className={styles.error}>
      <p><ErrorImage width={200}/></p>
      <p>{error}</p>
    </div>
  }

  if (!inviteResponse) {
    return <PizzaImage className="spin" width={200}/>
  }

  function onRsvpChange (e: ChangeEvent<HTMLInputElement>) {
    const coming = e.target.value === 'yes'
    updateRsvp(coming)
  }

  return (
    <>
      <PizzaImage width={200}/>
      <h1 className={styles.title}>{inviteResponse.messages.title}</h1>
      <h2 className={styles.subtitle}>{inviteResponse.messages.date_and_place}</h2>

      <div className={styles.card} style={{ borderColor: inviteResponse.invite.favouriteColor }}>
        <h3>Hello, <strong>{inviteResponse.invite.name}</strong>!</h3>
        <p>{inviteResponse.messages.invitation}</p>
        <fieldset className={styles.fieldset} disabled={updating}>
          <legend>{inviteResponse.messages.question}</legend>

          <label htmlFor="yes">
            <input type="radio" id="yes" name="coming" value="yes" onChange={onRsvpChange} checked={inviteResponse.invite.coming === true}/>
            Cowabunga! (yes)
          </label>

          <label htmlFor="no">
            <input type="radio" id="no" name="coming" value="no" onChange={onRsvpChange} checked={inviteResponse.invite.coming === false}/>
            Nitwits! (no)
          </label>
        </fieldset>
        <p>
          <small>
            <strong>P.S.</strong> You don&apos;t need to bring your <strong>{inviteResponse.invite.weapon}</strong>, <em>{inviteResponse.messages.secret_person}</em> is not invited!
          </small>
        </p>
      </div>
    </>
  )
}
