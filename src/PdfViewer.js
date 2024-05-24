import React from 'react';
import './PdfViewer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const PdfViewer = ({ location }) => {
    const { userId, imageUrl, book } = location.state;
    const { title, author, publicationDate } = book;

    const handleReturn = () => {
        window.location.href = `/listing?userId=${userId}`;
    };

    return (
        <div className="pdf-viewer">
            <button onClick={handleReturn} className="returnButton">
                <FontAwesomeIcon icon={faArrowLeft} /> Return
            </button>
            <div className="book-details">
                    <h1>{title}</h1>
                    <p>Author: {author}</p>
                    <p>Publication Date: {publicationDate}</p>
                </div>
            <div className="content">
                
                <img src={imageUrl} alt="Book Cover" className="book-image" />
                <div className="pdf-container">
                    <iframe src={book.pdfUrl} className="pdf-frame"></iframe>
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;
