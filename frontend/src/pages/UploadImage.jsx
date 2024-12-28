import React, { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import TextArea from "../components/Textarea";
import { api } from "../api";

const UploadContainer = styled.div`
    max-width: 600px;
    margin: 50px auto;
    padding: ${({ theme }) => theme.spacing.large};
    border: 1px solid #ddd;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    margin-bottom: ${({ theme }) => theme.spacing.medium};
    text-align: center;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.primary};
`;

const Message = styled.p`
    margin-top: 20px;
    text-align: center;
    font-size: 16px;
    color: ${({ isError, theme }) =>
        isError ? theme.colors.error : theme.colors.success};
`;

const ImageUpload = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !file) {
            setMessage("All fields are required!");
            setIsError(true);
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", file);

        try {
            const token = localStorage.getItem("token"); // Assuming the JWT token is stored in localStorage
            const response = await api.uploadImage(formData, token);

            if (response.success) {
                setMessage("Image uploaded successfully!");
                setIsError(false);
                setTitle("");
                setDescription("");
                setFile(null);
            } else {
                setMessage(response.message || "Image upload failed!");
                setIsError(true);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setMessage("An error occurred. Please try again.");
            setIsError(true);
        }
    };

    return (
        <UploadContainer>
            <Title>Upload an Image</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Image Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="0 0 20px 0"
                />
                <TextArea
                    placeholder="Image Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="0 0 20px 0"
                    rows={5}
                />
                <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    margin="0 0 20px 0"
                />
                <Button type="submit">Upload</Button>
            </Form>
            {message && <Message isError={isError}>{message}</Message>}
        </UploadContainer>
    );
};

export default ImageUpload;
