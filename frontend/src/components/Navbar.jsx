import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    background: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => theme.spacing.medium};
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
        color: white;
        margin: 0 ${({ theme }) => theme.spacing.medium};
        font-weight: bold;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("You have been logged out.");
        navigate("/login");
    };

    return (
        <Nav>
            <Link to="/">Gallery</Link>
            <div>
                {token ? (
                    <>
                        <Link to="/upload">Upload</Link>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "white",
                                fontWeight: "bold",
                                cursor: "pointer",
                                margin: "0 ${({ theme }) => theme.spacing.medium}",
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </Nav>
    );
};

export default Navbar;
