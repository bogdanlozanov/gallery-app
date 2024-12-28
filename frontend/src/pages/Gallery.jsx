import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import ImageCard from "../components/ImageCard";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.medium};
    padding: ${({ theme }) => theme.spacing.large};
`;

const Message = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
`;

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await api.fetchGallery();
                if (Array.isArray(data)) {
                    setImages(data);
                } else {
                    setError("Unexpected response format.");
                }
            } catch (err) {
                console.error("Error fetching images:", err);
                setError("Failed to fetch images. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading) {
        return <Message>Loading images...</Message>;
    }

    if (error) {
        return <Message>{error}</Message>;
    }

    if (images.length === 0) {
        return <Message>No images available. Be the first to upload!</Message>;
    }

    return (
        <Grid>
            {images.map((image) => (
                <ImageCard key={image.id} image={image} />
            ))}
        </Grid>
    );
};

export default Gallery;
