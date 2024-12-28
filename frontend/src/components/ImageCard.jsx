import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
    border: 1px solid #ccc;
    border-radius: ${({ theme }) => theme.borderRadius};
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;

    img {
        max-width: 100%;
        height: 200px;
        object-fit: cover;
    }

    h3 {
        margin: ${({ theme }) => theme.spacing.small} 0;
    }
`;

const ImageCard = ({ image }) => (
    <Card>
        <Link to={`/image/${image.id}`}>
            <img src={`http://localhost:8000/${image.filepath}`} alt={image.title} />
            <h3>{image.title}</h3>
        </Link>
    </Card>
);

export default ImageCard;
