import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Admin_Page from '../Admin_Page/Admin_Page';

const Food_Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post('https://aqueous-reef-45630.herokuapp.com/foods', data)
      .then((res) => {
        console.log(res);
        if (res.data.acknowledged === true) {
          setIsLoading(false);
          setIsSuccess(true);
          reset({});
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Admin_Page pageTitle={'Add Food'}>
      {!!isSuccess && <Alert variant="success">Food Added Successfully!</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="foodName">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            type="text"
            {...register('foodName', { required: true })}
            placeholder="Enter food name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodName && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="foodPrice">
          <Form.Label>Food Price</Form.Label>
          <Form.Control
            type="text"
            {...register('foodPrice', { required: true })}
            placeholder="Food Price"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodPrice && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {isLoading ? (
          <Button variant="outline-primary" type="submit" disabled>
            Add Food
          </Button>
        ) : (
          <Button variant="outline-primary" type="submit">
            Add Food
          </Button>
        )}
      </Form>
    </Admin_Page>
  );
};

export default Food_Form;
