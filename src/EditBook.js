import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const EditBook = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    console.log(userId);

    const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        publicationDate: '',
        pdfUrl: '',
        favorite: false,
        imageUrl: '',
        bookType: null,
        user: { id: userId } // Temporarily hardcode user ID
    });

    const [bookTypes, setBookTypes] = useState([]);

    useEffect(() => {
        fetchBookTypes();
        fetchBook();
    }, []);

    const fetchBookTypes = async () => {
        const response = await axios.get('http://localhost:8081/bookTypes/Types');
        setBookTypes(response.data);
    };

    const fetchBook = async () => {
        const response = await axios.get(`http://localhost:8081/book/books/${id}`);
        setBook(response.data);
    };

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        if (event.target.name === 'bookType') {
            setBook({ ...book, bookType: { id: value } });
        } else {
            setBook({ ...book, [event.target.name]: value });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:8081/book/books/${id}`, book, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = `/listing?userId=${userId}`;
    };

    const handleReturn = () => {
        window.location.href = `/listing?userId=${userId}`;
    };

    return (
        <div className="form-container">
            <button onClick={handleReturn} className="returnButton">
                <FontAwesomeIcon icon={faArrowLeft} /> Return
            </button>
        <form onSubmit={handleSubmit} className="book-form">
            <label>
                Title:
                <input type="text" name="title" value={book.title} onChange={handleChange} />
            </label>
            <label>
                Author:
                <input type="text" name="author" value={book.author} onChange={handleChange} />
            </label>
            <label>
                Publication Date:
                <input type="date" name="publicationDate" value={book.publicationDate} onChange={handleChange} />
            </label>
            <label>
                PDF URL:
                <input type="text" name="pdfUrl" value={book.pdfUrl} onChange={handleChange} />
            </label>
            <label>
                Favorite:
                <input type="checkbox" name="favorite" checked={book.favorite} onChange={handleChange} />
            </label>
            <label>
                Image URL:
                <input type="text" name="imageUrl" value={book.imageUrl} onChange={handleChange} />
            </label>
            <label>
                Book Type:
                <select name="bookType" value={book.bookType ? book.bookType.id : ''} onChange={handleChange}>
                    {bookTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </label>
            <input type="submit" value="Update Book" />
        </form>
        </div>
    );
};

export default EditBook;
