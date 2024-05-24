import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookTypePage.css'; // Import the CSS file
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BookTypePage = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get('userId');
    console.log(userId);


    const [bookType, setBookType] = useState({
        name: '',
        description: ''
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
        setBookType({ ...bookType, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:8081/bookTypes/', bookType, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setBookType({ name: '', description: '' }); // Reset the input fields after successful submission
        fetchBookTypes(); // Refresh the book types list
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8081/bookTypes/${id}`);
        fetchBookTypes(); // Refresh the book types list
    };

    const handleReturn = () => {
        window.location.href = `/listing?userId=${userId}`;
    };
    
    return (
        <div className="book-type-page">
             <button onClick={handleReturn} className="returnButton">
                <FontAwesomeIcon icon={faArrowLeft} /> Return
            </button>
            <div className="form-container">
                <h2>Add a New Book Type</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Book Type Name:
                        <input type="text" name="name" value={bookType.name} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" value={bookType.description} onChange={handleChange} />
                    </label>
                    <input type="submit" value="Add Book Type" />
                </form>
            </div>
            <div className="list-container">
                <h2>Existing Book Types</h2>
                {bookTypes.map((type) => (
                    <div key={type.id} className="book-type">
                        <p>{type.name}</p>
                        <button onClick={() => handleDelete(type.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookTypePage;
