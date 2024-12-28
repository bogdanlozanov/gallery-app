import React, { useState } from "react";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { api } from "../api";

const Register = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.register({ register: true, ...formData });
        if (response.success) {
            alert("Registration successful! Please login.");
        } else {
            alert(response.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                margin="10px 0"
            />
            <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                margin="10px 0"
            />
            <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                margin="10px 0"
            />
            <Button>Register</Button>
        </Form>
    );
};

export default Register;
