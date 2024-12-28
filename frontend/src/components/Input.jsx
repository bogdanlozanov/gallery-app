import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: ${({ theme }) => theme.spacing.medium};
    margin: ${({ margin }) => margin || "0"};
    border: 1px solid #ccc;
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    font-size: 16px;
`;

const Input = ({ type, placeholder, value, onChange, margin }) => (
    <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        margin={margin}
    />
);

export default Input;
