import React, { useState } from 'react';
import Styles from './Paginated.module.css';

export const Paginated = ({ dogsPerPage, allDogs, paginated }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPerSection = 8;

  const pageNumber = [];
  for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage - 1); i++) {
    pageNumber.push(i + 1);
  }

  const pageSections = [];
  for (let i = 0; i < pageNumber.length; i += pagesPerSection) {
    pageSections.push(pageNumber.slice(i, i + pagesPerSection));
  }

  const goToPage = (page) => {
    setCurrentPage(page);
    paginated(page);
  };

  const goToPrevSection = () => {
    setCurrentPage((prevPage) => prevPage - pagesPerSection);
  };

  const goToNextSection = () => {
    setCurrentPage((prevPage) => prevPage + pagesPerSection);
  };

  const currentSection = pageSections.find((section) =>
    section.includes(currentPage)
  );

  return (
    <nav className={Styles.container}>
      <ul className={Styles.paginated}>
        {currentSection && currentPage > pagesPerSection && (
          <li className={Styles.number}>
            <button
              className={Styles.buttonNumber}
              onClick={goToPrevSection}
            >
              {"<<"}
            </button>
          </li>
        )}
        {currentSection &&
          currentSection.map((number) => (
            <li className={Styles.number} key={number}>
              <button
                className={`${Styles.buttonNumber} ${
                  currentPage === number && Styles.active
                }`}
                onClick={() => goToPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
        {currentSection && currentSection.slice(-1)[0] < pageNumber.slice(-1)[0] && (
          <li className={Styles.number}>
            <button
              className={Styles.buttonNumber}
              onClick={goToNextSection}
            >
              {">>"}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};