import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import { api } from "../api";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.login({ login: true, ...formData });
        if (response.token) {
            localStorage.setItem("token", response.token);
            navigate("/");
        } else {
            alert(response.message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                margin="10px 0"
            />
            <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                margin="10px 0"
            />
            <Button>Login</Button>
        </Form>
    );
};

export default Login;
