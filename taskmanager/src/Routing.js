import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./compnents/Auth/Login.js";
import TaskList from "./compnents/Tasks/TaskList.js";
import Register from "./compnents/Auth/Register.js";
import TaskForm from "./compnents/Tasks/TaskForm.js";
import TaskDetail from "./compnents/Tasks/TaskDetail.js";
import Welcome from "./compnents/Home.js";


const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskForm isEdit={false} />} />
            <Route path="/tasks/edit/:id" element={<TaskForm isEdit={true} />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
    );
};

export default Routing;