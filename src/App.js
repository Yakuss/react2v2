import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BooksTable from './BooksTable';
import PdfViewer from './PdfViewer';
import AddBook from './AddBook';
import EditBook from './EditBook';
import AddBookType from './AddBookType';
import SearchPage from './SearchPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';


function App() {
    
    return (
        <Router>
            <Switch>
                <Route path="/listing" exact component={BooksTable} />
                <Route 
                    path="/pdf/:pdfUrl" 
                    render={(props) => <PdfViewer key={props.match.params.pdfUrl} {...props} />}
                />
                <Route path="/books/new" component={AddBook} />
                <Route path="/books/search" component={SearchPage} />
                <Route path="/books/:id/edit" component={EditBook} />
                <Route path="/booksType/new" component={AddBookType} />
                {/* Add the following routes */}
                <Route path="/" exact component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </Router>
    );
}

export default App;