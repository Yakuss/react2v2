import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './AddBook.css';

const AddBook = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    console.log(userId);

    const [book, setBook] = useState({
        title: '',
        author: '',
        publicationDate: '',
        pdfUrl: '',
        favorite: false,
        imageUrl: '',
        bookType: null,
        user: { id: userId }
    });

    const [bookTypes, setBookTypes] = useState([]);

    useEffect(() => {
        fetchBookTypes();
    }, []);

    const fetchBookTypes = async () => {
        const response = await axios.get('http://localhost:8081/bookTypes/Types');
        setBookTypes(response.data);
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
        await axios.post('http://localhost:8081/book/books', book, {
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
        <div className="card">
            <button onClick={handleReturn} className="returnButton">
                <FontAwesomeIcon icon={faArrowLeft} /> Return
            </button>
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Title:
                    <input type="text" name="title" onChange={handleChange} />
                </label>
                <label>
                    Author:
                    <input type="text" name="author" onChange={handleChange} />
                </label>
                <label>
                    Publication Date:
                    <input type="date" name="publicationDate" onChange={handleChange} />
                </label>
                <label>
                    PDF URL:
                    <input type="text" name="pdfUrl" onChange={handleChange} />
                </label>
                <label>
                    Favorite:
                    <input type="checkbox" name="favorite" onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="imageUrl" onChange={handleChange} />
                </label>
                <label>
                    Book Type:
                    <select name="bookType" onChange={handleChange}>
                        {bookTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </label>
                <input type="submit" value="Add Book" />
            </form>
        </div>
    );
};

export default AddBook;
