import { Card, CardBody, CardFooter, Image } from '@nextui-org/react';
import React, { useState, useEffect, useRef } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import EditBookModal from '../Modal/EditBookModal';
import { deleteBook } from '../../Services/userService'; // Correct import path
import Swal from 'sweetalert2';
import { useLocation, useParams } from 'react-router-dom';

const BookCard = ({ book, activeDropdown, setActiveDropdown, onUpdateBook, onDeleteBook }) => {
    console.log('book addedby namme',book.addedBy.name)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const isDropdownOpen = activeDropdown === book._id;
    const dropdownRef = useRef(null);
    const location = useLocation();
    console.log('location',location.pathname)
    const handleDropdownToggle = () => {
        setActiveDropdown(isDropdownOpen ? null : book._id);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setActiveDropdown(null);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
        setActiveDropdown(null);
    };

    const handleUpdateBook = (updatedBook) => {
        onUpdateBook(updatedBook);
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1d4ed8', 
            cancelButtonColor: '#dc2626', 
            confirmButtonText: 'Yes, delete it!',
            background: '#1a1a1a', 
            color: '#f3f4f6',
            customClass: {
                popup: 'rounded-lg shadow-lg bg-gray-800',
                title: 'text-white text-lg font-bold',
                content: 'text-gray-300 text-base',
                confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg',
                cancelButton: 'bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteBook(book._id);
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The book has been deleted.',
                        icon: 'success',
                        background: '#1a1a1a',
                        color: '#f3f4f6',
                        customClass: {
                            popup: 'rounded-lg shadow-lg bg-gray-800',
                            title: 'text-white text-lg font-bold',
                            content: 'text-gray-300 text-base',
                        },
                    });
                    onDeleteBook(book._id);
                } catch (error) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the book. Please try again.',
                        icon: 'error',
                        background: '#1a1a1a',
                        color: '#f3f4f6',
                        customClass: {
                            popup: 'rounded-lg shadow-lg bg-gray-800',
                            title: 'text-white text-lg font-bold',
                            content: 'text-gray-300 text-base',
                        },
                    });
                    console.error('Error deleting book:', error);
                }
            }
        });
        setActiveDropdown(null);
    };
    

    return (
        <>
            <Card className="bg-gray-700 w-full sm:w-[250px] md:w-[230px] lg:w-[250px] h-auto relative overflow-visible">
                <CardBody className="overflow-visible py-2">
                    {book.image && (
                        <div className="">
                            <Image
                                alt={book.title}
                                src={book.image}
                                width={270}
                                height={180}
                                className="z-0 w-full h-full object-cover relative"
                                removeWrapper
                            />
                        </div>
                    )}
                </CardBody>
                {location.pathname != '/booklist' && 
                    <BsThreeDots
                    className="absolute top-2 right-4 text-white cursor-pointer"
                    size={24}
                    onClick={handleDropdownToggle}
                />
                }
                
                <CardFooter className="pb-0 pt-2 px-4 py-2 flex-col items-start">
                    <h4 className="font-bold text-gray-400 text-large">{book.title}</h4>
                    <p className="text-tiny uppercase font-bold">By: {book.author}</p>
                    <small className="text-default-500">Published: {book.publicationYear}</small>

                    {location.pathname == '/booklist' && 
                    <p className="text-tiny font-bold">added:{book.addedBy.name}</p>
                    }
                    
                </CardFooter>
                {isDropdownOpen && location.pathname != '/booklist' && (
                    <Dropdown
                        ref={dropdownRef}
                        className="absolute top-0 left-0 bg-gray-900 rounded-md"
                        placement="bottom-right"
                    >
                        <DropdownMenu className='text-white'>
                            <DropdownItem key="edit" onClick={handleEditClick}>Edit book</DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onClick={handleDeleteClick}
                            >
                                Delete book
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </Card>
            {isEditModalOpen && location.pathname != '/booklist'&& (
                <EditBookModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    book={book}
                    onUpdateBook={handleUpdateBook}
                />
            )}
        </>
    );
};

export default BookCard;
