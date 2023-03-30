import React from 'react';
import Styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  function backToHome() {
    navigate('/home');
  }  

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className={Styles.container}>
        <h1 className={Styles.title}>Welcome to the dogs app</h1>
        <button onClick={backToHome} className={Styles.button}>
          Enter Home
        </button>
        <h2 className={Styles.text}>
          This is a web page made in order for you to get to know your faithful
          companion better. You will be able to see breeds, temperaments and more
          data about the dog you choose.
        </h2>
      </div>
    </>
  );
}
