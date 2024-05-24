import React from 'react';
import SearchBooksByType from './SearchBooksByType ';
import SearchBooks from './SearchBook';
import styles from './SearchPage.module.css';
import {  useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    console.log(userId);

    const handleReturn = () => {
        window.location.href =  `/listing?userId=${userId}`;
    };

    return (
        
        <div className={styles.container}>
            <button onClick={handleReturn} className={styles.returnButton}>
                <FontAwesomeIcon icon={faArrowLeft} /> Return
            </button>
            <div className={styles.half}>
                <SearchBooks userId={userId} />
            </div>
            <div className={styles.half}>
                <SearchBooksByType userId={userId} />
            </div>
        </div>
    );
};

export default SearchPage;
