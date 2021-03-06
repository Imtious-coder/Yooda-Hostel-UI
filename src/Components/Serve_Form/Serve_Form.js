import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import Admin_Page from '../Admin_Page/Admin_Page';

const Serve_Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id, shift } = useParams();
  const location = useLocation();

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const onSubmit = (data) => {
    data = {
      ...data,
      studentId: id,
      date: location.search.split('=')[1],
      shift: shift,
      status: true,
    };
    setIsLoading(true);
    axios
      .post(`https://protected-castle-71547.herokuapp.com/distribution-food`, data)
      .then((res) => {
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
    <Admin_Page pageTitle={'Serve Food'}>
      {!!isSuccess && <Alert variant="success">Student Food Served!</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Food Item */}
        <Form.Group className="mb-3" controlId="foodItemList">
          <Form.Label>Enter Food Items</Form.Label>
          <Form.Control
            type="textbox"
            {...register('foodItemList', { required: true })}
            placeholder="Enter food items"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodItemList && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        {isLoading ? (
          <Button variant="outline-primary" type="submit" disabled>
            Serve Student
          </Button>
        ) : (
          <Button variant="outline-primary" type="submit">
            Serve Student
          </Button>
        )}
      </Form>
    </Admin_Page>
  );
};

export default Serve_Form;
