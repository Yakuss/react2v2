import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import styles from './SearchBooksByType.module.css';

const SearchBooksByType = ({ userId }) => {
    const [bookTypeId, setBookTypeId] = useState('');
    const [books, setBooks] = useState([]);
    const [bookTypes, setBookTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookTypes();
    }, []);

    const fetchBookTypes = async () => {
        const response = await axios.get(`http://localhost:8081/bookTypes/Types`);
        setBookTypes(response.data);
    };

    const searchBooksByType = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/book/user/${userId}/books/searchByType/${bookTypeId}`);
            setBooks(response.data);
            setError(null);
        } catch (error) {
            setBooks([]);
            setError('No books found for the selected type.');
        }
        setLoading(false);
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8081/book/books/${id}`);
        searchBooksByType();
    };

    const editBook = (id) => {
        window.location.href = `/books/${id}/edit`;
    };

    return (
        <div className={styles.container}>
            <select
                value={bookTypeId}
                onChange={(e) => setBookTypeId(e.target.value)}
                className={styles.select}
            >
                {bookTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                ))}
            </select>
            <button onClick={searchBooksByType} className={styles.searchButton}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={styles.cards}>
                {books.map((book) => (
                    <div key={book.id} className={styles.card}>
                        <img src={book.imageUrl} alt={book.title} className={styles.image} />
                        <div className={styles.card_content}>
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>{book.publicationDate}</p>
                            <p>{book.favorite ? 'Favorite: Yes' : 'Favorite: No'}</p>
                        </div>
                        <div className={styles.card_actions}>
                            <button onClick={() => editBook(book.id)} className={styles.icon_button}>
                                <FaEdit />
                            </button>
                            <button onClick={() => deleteBook(book.id)} className={styles.icon_button}>
                                <FaTrash />
                            </button>
                            <Link to={`/pdf/${encodeURIComponent(book.pdfUrl)}`} className={styles.pdf_link}>
                                <FaFilePdf /> Open PDF
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBooksByType;
