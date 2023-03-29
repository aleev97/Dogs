import React from 'react';
import Styles from './Paginated.module.css';

export const Paginated = ({ dogsPerPage, allDogs, paginated }) => {
  const pageNumber = []

  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage -1 ); i++) {
    pageNumber.push(i + 1)
  }

  return (
    <nav className={Styles.container} >
      <ul className={Styles.paginated} >
        { pageNumber && 
        pageNumber.map(number => (
            <li className={Styles.number} key={number} >
              <button className={Styles.buttonNumber} onClick={() => paginated(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  )
};