import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import Header from "../Components/Header/Header";
import { createBook } from "../Services/userService";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import uploadImageToCloudinary from "../Utils/uploadCloudinary";
import BookCard from "../Components/Cards/BookCard";
import { getMyBooks } from "../Services/userService";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function AddBooks() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const user = useSelector((state) => state.auth.user);
    const [books, setBooks] = useState([]);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMyBooks = async () => {
            setLoading(true);
            try {
                const response = await getMyBooks(user._id);
                if (response.status === 200) {
                    setBooks(response.data.books);
                }
            } catch (error) {
                toast.error("Failed to fetch books");
            } finally {
                setLoading(false);
            }
        };
        fetchMyBooks();
    }, [user._id]);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            publicationYear: "",
            isbn: "",
            description: "",
            image: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            author: Yup.string().required("Author is required"),
            publicationYear: Yup.number()
                .typeError("Publication Year must be a number")
                .required("Publication Year is required"),
            isbn: Yup.string().required("ISBN is required"),
            description: Yup.string().required("Description is required"),
            image: Yup.string().required("Image is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);
                const response = await createBook(values, user._id);
                if (response.status === 200) {
                    toast.success("Book added successfully");
                    setBooks((prevBooks) => [response.data, ...prevBooks]);
                    onOpenChange(false);
                    resetForm();
                } else {
                    toast.error(response?.data?.message || "Failed to add book");
                }
            } catch (error) {
                toast.error("Error adding book");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        try {
            const data = await uploadImageToCloudinary(file);
            if (data.url) {
                formik.setFieldValue("image", data.url);
            } else {
                toast.error("Failed to upload image");
            }
        } catch (error) {
            toast.error("Error uploading image");
        }
    };

    const handleUpdateBook = (updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book._id === updatedBook._id ? updatedBook : book))
        );
    };

    const handleDeleteBook = (bookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    }

    return (
        <>
            <Header />
            <div className="min-h-screen bg-[#110c1e] flex items-center flex-col text-white">
                <div className="flex items-center justify-center w-[300px] mt-3">
                    <h1 className="text-gray-700 font-extrabold font-sans">
                        Click Here To Add The Book
                    </h1>
                </div>

                <div className="mt-5">
                    <Button color="danger" variant="shadow" onPress={onOpen}>
                        Add Book
                    </Button>
                </div>

                <Modal
                    isOpen={isOpen}
                    placement="top-center"
                    backdrop="opaque"
                    motionProps={{
                        variants: {
                            enter: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: 0.3,
                                    ease: "easeOut",
                                },
                            },
                            exit: {
                                y: -20,
                                opacity: 0,
                                transition: {
                                    duration: 0.2,
                                    ease: "easeIn",
                                },
                            },
                        },
                    }}
                    classNames={{
                        body: "py-6",
                        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                        header: "border-b-[1px] border-[#292f46]",
                        footer: "border-t-[1px] border-[#292f46]",
                        closeButton: "hover:bg-white/5 active:bg-white/10",
                    }}
                    onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-white">
                                    Add Book
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Title"
                                        placeholder="Enter the Title"
                                        variant="bordered"
                                        color="primary"
                                        className="text-white"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.title && formik.errors.title}
                                        isInvalid={formik.touched.title && !!formik.errors.title}
                                    />
                                    <Input
                                        label="Author"
                                        placeholder="Enter the author name"
                                        variant="bordered"
                                        color="primary"
                                        className="text-white"
                                        name="author"
                                        value={formik.values.author}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.author && formik.errors.author}
                                        isInvalid={formik.touched.author && !!formik.errors.author}
                                    />
                                    <Input
                                        label="Publication Year"
                                        placeholder="Enter the Publication Year"
                                        variant="bordered"
                                        color="primary"
                                        className="text-white"
                                        name="publicationYear"
                                        value={formik.values.publicationYear}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.publicationYear &&
                                            formik.errors.publicationYear
                                        }
                                        isInvalid={
                                            formik.touched.publicationYear &&
                                            !!formik.errors.publicationYear
                                        }
                                    />
                                    <Input
                                        label="ISBN"
                                        placeholder="Enter the ISBN"
                                        variant="bordered"
                                        color="primary"
                                        className="text-white"
                                        name="isbn"
                                        value={formik.values.isbn}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={formik.touched.isbn && formik.errors.isbn}
                                        isInvalid={formik.touched.isbn && !!formik.errors.isbn}
                                    />
                                    <Input
                                        label="Description"
                                        placeholder="Enter the description"
                                        variant="bordered"
                                        color="primary"
                                        className="text-white"
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        helperText={
                                            formik.touched.description && formik.errors.description
                                        }
                                        isInvalid={
                                            formik.touched.description && !!formik.errors.description
                                        }
                                    />
                                    <Input
                                        type="file"
                                        label="Upload Image"
                                        variant="bordered"
                                        color="primary"
                                        className="text-white"
                                        id="customFile"
                                        onChange={handleFileInputChange}
                                        accept=".jpg, .png"
                                        helperText={formik.touched.image && formik.errors.image}
                                        isInvalid={formik.touched.image && !!formik.errors.image}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onPress={formik.handleSubmit}>
                                        Add Book
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <div className="w-full mt-10 px-2 pl-12 flex items-center flex-col">
                    <h1 className="text-2xl font-bold text-gray-600 mb-5">My Books</h1>
                    {loading ? (
                        <div className="flex justify-center items-center mt-10">
                            <Spinner size="lg" color="primary" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {books.length > 0 ? (
                                books.map((book, index) => (
                                    <div key={book?._id || index}>
                                        {book ? (
                                            <BookCard
                                                key={book._id}
                                                book={book}
                                                activeDropdown={activeDropdown}
                                                setActiveDropdown={setActiveDropdown}
                                                onUpdateBook={handleUpdateBook}
                                                onDeleteBook={handleDeleteBook}
                                            />
                                        ) : (
                                            <p>Invalid book data</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No books available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}