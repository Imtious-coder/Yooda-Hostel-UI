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

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  // Submit action...
  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post('https://protected-castle-71547.herokuapp.com/foods', data)
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
      {/* Success message... */}
      {!!isSuccess && <Alert variant="success">Great! Successfully Added Your Food . . .</Alert>}
      {/* Form... */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-4" controlId="foodName">
          <Form.Label className='fw-bold'>Food Name:</Form.Label>
          <Form.Control
            type="text"
            {...register('foodName', { required: true })}
            placeholder="What's your favourite food!"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodName && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="foodPrice">
          <Form.Label className='fw-bold'>Price:</Form.Label>
          <Form.Control
            type="text"
            {...register('foodPrice', { required: true })}
            placeholder="Price here..."
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodPrice && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {isLoading ? (
          <Button className='px-5 py-2 fw-bold rounded-pill' variant="outline-success" type="submit" disabled>
            Add Food
          </Button>
        ) : (
          <Button className='px-5 py-2 fw-bold rounded-pill' variant="outline-success" type="submit">
            Add Food
          </Button>
        )}
      </Form>
    </Admin_Page>
  );
};

export default Food_Form;
