import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Header';
import BookCard from '../Components/Cards/BookCard';
import { getAllBooks, searchBooks } from '../Services/userService';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getAllBooks();
                setBooks(response.data);
                setFilteredBooks(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        const search = async () => {
            if (searchQuery.trim() === '') {
                setFilteredBooks(books);
                return;
            }
            try {
                const results = await searchBooks(searchQuery);
                console.log('results of searching', results);
                setFilteredBooks(results);
            } catch (error) {
                console.error(error);
            }
        };
        search();
    }, [searchQuery, books]);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#110c1e] flex items-center flex-col text-white">
                <h1 className="text-3xl font-bold mt-8">Book List</h1>
                <div className="w-full max-w-md mt-4">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {filteredBooks.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default BookList;
