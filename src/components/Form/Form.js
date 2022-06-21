import React from "react";
import './Form.css';
import { useForm } from "react-hook-form";

const Form = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formHandler = (data) => {
    props.setUsername(data.username);
  };

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <label>User name:</label>
      <input type="text" {...register("username", { required: "Required" })} />
      {errors.username?.type === "required" && "Username is required"}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
