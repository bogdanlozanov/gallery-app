import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 50px auto;
    padding: ${({ theme }) => theme.spacing.large};
    background: white;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = ({ children, onSubmit }) => (
    <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
);

export default Form;
