import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";

const Container = styled.div`
    padding: ${({ theme }) => theme.spacing.large};
`;

const ImageContainer = styled.div`
    text-align: center;

    img {
        max-width: 100%;
        border-radius: ${({ theme }) => theme.borderRadius};
    }

    h2 {
        margin-top: ${({ theme }) => theme.spacing.medium};
    }

    p {
        color: #777;
    }
`;

const CommentsSection = styled.div`
    margin-top: ${({ theme }) => theme.spacing.large};

    .comment {
        padding: ${({ theme }) => theme.spacing.medium};
        border-bottom: 1px solid #ccc;
    }

    h3 {
        margin-bottom: ${({ theme }) => theme.spacing.medium};
    }
`;

const RatingsContainer = styled.div`
    margin-top: ${({ theme }) => theme.spacing.large};
    text-align: center;

    span {
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

const CommentForm = styled.div`
    margin-top: ${({ theme }) => theme.spacing.large};
`;

const ImageDetails = () => {
    const { id } = useParams(); // Get image ID from URL params
    const [image, setImage] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState("");
    const [averageRating, setAverageRating] = useState(null);
    const [totalRatings, setTotalRatings] = useState(0);

    const fetchImageDetails = async () => {
        const gallery = await api.fetchGallery(); // Fetch all images
        const imageData = gallery.find((img) => img.id === parseInt(id));
        setImage(imageData);

        if (imageData) {
            const commentsData = await api.fetchComments(id);
            setComments(commentsData);

            const ratingData = await api.fetchRatings(id);
            setAverageRating(ratingData.average_rating);
            setTotalRatings(ratingData.total_ratings);
        }
    };

    useEffect(() => {
        fetchImageDetails();
    }, []);

    const handleCommentSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to comment.");
            return;
        }

        const response = await api.postComment(
            { image_id: id, comment_text: newComment },
            token
        );
        if (response.success) {
            setComments([
                { comment_text: newComment, username: "You", created_at: new Date() },
                ...comments,
            ]);
            setNewComment("");
        } else {
            alert(response.message);
        }
    };

    const handleRatingSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to rate.");
            return;
        }

        const response = await api.postRating({ image_id: id, rating }, token);
        if (response.success) {
            alert("Rating submitted!");
            fetchImageDetails(); // Refresh ratings
        } else {
            alert(response.message);
        }
    };

    return (
        <Container>
            {image && (
                <>
                    <ImageContainer>
                        <img
                            src={`http://localhost:8000/${image.filepath}`}
                            alt={image.title}
                        />
                        <h2>{image.title}</h2>
                        <p>{image.description}</p>
                    </ImageContainer>

                    <RatingsContainer>
                        <h3>
                            Average Rating: {averageRating || "No ratings yet"} (
                            {totalRatings} total)
                        </h3>
                        <Input
                            type="number"
                            placeholder="Rate (1-5)"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            margin="10px 0"
                        />
                        <Button onClick={handleRatingSubmit}>Submit Rating</Button>
                    </RatingsContainer>

                    <CommentsSection>
                        <h3>Comments</h3>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <strong>{comment.username}</strong>: {comment.comment_text}
                                <br />
                                <small>{new Date(comment.created_at).toLocaleString()}</small>
                            </div>
                        ))}
                    </CommentsSection>

                    <CommentForm>
                        <h3>Add a Comment</h3>
                        <Input
                            type="text"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            margin="10px 0"
                        />
                        <Button onClick={handleCommentSubmit}>Submit Comment</Button>
                    </CommentForm>
                </>
            )}
        </Container>
    );
};

export default ImageDetails;
