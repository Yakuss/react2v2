import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import styles from './BooksTable.module.css';

const BooksTable = () => {
    const [books, setBooks] = useState([]);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');

    useEffect(() => {
        fetchBooks();
    }, []);

   /* useEffect(() => {
        const handlePdfLinkClick = () => {
            window.location.reload();
        };
        document.addEventListener('click', handlePdfLinkClick);
        return () => {
            document.removeEventListener('click', handlePdfLinkClick);
        };
    }, []);*/

    useEffect(() => {
        const handlePdfLinkClick = (event) => {
            if (event.target.getAttribute('data-pdf-link') === 'true') {
                window.location.reload();
            }
        };
    
        document.addEventListener('click', handlePdfLinkClick);
        return () => {
            document.removeEventListener('click', handlePdfLinkClick);
        };
    }, []);
    
    

    const fetchBooks = async () => {
        const response = await axios.get(`http://localhost:8081/book/user/${userId}/books`);
        console.log(response.data);
        setBooks(response.data);
    };

    const deleteBook = async (id) => {
        await axios.delete(`http://localhost:8081/book/books/${id}`);
        fetchBooks();
    };

    const editBook = (id) => {
        window.location.href = `/books/${id}/edit?userId=${userId}`;
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <button className={styles.button} onClick={() => window.location.href = `/books/new?userId=${userId}`}>Add New Book</button>
                <button className={styles.button} onClick={() => window.location.href = `/books/search?userId=${userId}`}>Search Books</button>
                <button className={styles.button} onClick={() => window.location.href = `/booksType/new?userId=${userId}`}>Add Book Type</button>
            </nav>
            <h1>All Books</h1>
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
                            <Link
                            to={{
                                pathname: `/pdf/${encodeURIComponent(book.pdfUrl)}`,
                                state: { userId, imageUrl: book.imageUrl, book }
                            }}
                            className={styles.pdf_link}
                            data-pdf-link="true" // Add this attribute
                        >
                            <FaFilePdf /> Open PDF
                        </Link>

                        </div>
                    </div>
                ))}
            </div>
            <footer className={styles.footer}>
                <p>© 2024 My Book Library</p>
            </footer>
        </div>
    );
};

export default BooksTable;
