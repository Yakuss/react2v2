import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import styles from './SearchBooks.module.css';

const SearchBooks = ({ userId }) => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userIdParam = userId;

    const searchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/book/user/${userIdParam}/books/search/${query}`);
            setBooks(response.data);
            setError(null);
        } catch (error) {
            setBooks([]);
            setError('No books found for the search query.');
        }
        setLoading(false);
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8081/book/books/${id}`);
        searchBooks();
    };

    const editBook = (id) => {
        window.location.href = `/books/${id}/edit`;
    };

    return (
        <div className={styles.container}>
            <input 
                type="text" 
                placeholder="Search for a book..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                className={styles.searchBar}
            />
            <button onClick={searchBooks} className={styles.searchButton}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={styles.cards}>
                {books.map((book) => (
                    <div key={book.id} className={styles.card}>
                        <img src={book.imageUrl} alt={book.title} className={styles.image} />
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.publicationDate}</p>
                        <p>{book.favorite ? 'Favorite: Yes' : 'Favorite: No'}</p>
                        <div className={styles.cardActions}>
                            <button onClick={() => editBook(book.id)} className={styles.iconButton}>
                                <FaEdit />
                            </button>
                            <button onClick={() => deleteBook(book.id)} className={styles.iconButton}>
                                <FaTrash />
                            </button>
                            <Link to={`/pdf/${encodeURIComponent(book.pdfUrl)}`} className={styles.pdfLink}>
                                <FaFilePdf /> Open PDF
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchBooks;
