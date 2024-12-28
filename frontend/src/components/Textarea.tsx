import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    padding: ${({ theme }) => theme.spacing.medium};
    margin: ${({ $margin }) => $margin || "0"};
    border: 1px solid #ccc;
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
    font-size: 16px;
    resize: vertical;
`;

const TextArea = ({ placeholder, value, onChange, margin, rows = 4 }) => (
    <StyledTextArea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        $margin={margin} // Pass the margin as a styled-components custom prop
        rows={rows}
    />
);

export default TextArea;
