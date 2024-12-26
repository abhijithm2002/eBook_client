import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import uploadImageToCloudinary from "../../Utils/uploadCloudinary";
import { useState } from "react";
import { editBook } from "../../Services/userService";

const EditBookModal = ({ isOpen, onClose, book, onUpdateBook }) => {
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(book.image || "");

    const formik = useFormik({
        initialValues: {
            title: book.title || "",
            author: book.author || "",
            publicationYear: book.publicationYear || "",
            isbn: book.isbn || "",
            description: book.description || "",
            image: book.image || "",
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
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await editBook(values, book._id);
                if (response.status === 200) {
                    toast.success("Book edited successfully");
                    onUpdateBook(response.data);
                } else {
                    toast.error(response?.data?.message || "Failed to edit book");
                }
            } catch (error) {
                toast.error("Error editing book");
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
                setImagePreview(data.url);
            } else {
                toast.error("Failed to upload image");
            }
        } catch (error) {
            toast.error("Error uploading image");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-white">Edit Book</ModalHeader>
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
                        helperText={formik.touched.publicationYear && formik.errors.publicationYear}
                        isInvalid={formik.touched.publicationYear && !!formik.errors.publicationYear}
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
                        helperText={formik.touched.description && formik.errors.description}
                        isInvalid={formik.touched.description && !!formik.errors.description}
                    />
                    <div className="mb-4">
                      
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button color="primary" onPress={formik.handleSubmit} isLoading={loading}>
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditBookModal;