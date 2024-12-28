const BASE_URL = "http://localhost:8000/api";

export const api = {
    login: (data) => fetch(`${BASE_URL}/users.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data),
    }).then((res) => res.json()),

    register: (data) => fetch(`${BASE_URL}/users.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data),
    }).then((res) => res.json()),

    fetchGallery: () => fetch(`${BASE_URL}/images.php`).then((res) => res.json()),

    fetchComments: (imageId) =>
        fetch(`${BASE_URL}/comments.php?image_id=${imageId}`).then((res) => res.json()),

    fetchRatings: (imageId) =>
        fetch(`${BASE_URL}/ratings.php?image_id=${imageId}`).then((res) => res.json()),

    postComment: (data, token) => fetch(`${BASE_URL}/comments.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams(data),
    }).then((res) => res.json()),

    postRating: (data, token) => fetch(`${BASE_URL}/ratings.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams(data),
    }).then((res) => res.json()),

    uploadImage: (formData, token) => fetch(`${BASE_URL}/images.php`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    }).then((res) => res.json()),
};
