import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    padding: ${({ theme }) => theme.spacing.medium};
    margin: ${({ margin }) => margin || "0"};
    background-color: ${({ theme, color }) => color || theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    font-weight: bold;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const Button = ({ children, onClick, color, margin, disabled }) => (
    <StyledButton onClick={onClick} color={color} margin={margin} disabled={disabled}>
        {children}
    </StyledButton>
);

export default Button;
