import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Admin_Page from '../Admin_Page/Admin_Page';

const Edit_Food = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();
  
  const [food, setFood] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5001/foods/${id}`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .put(`http://localhost:5001/foods/${id}`, data)
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
    <Admin_Page pageTitle={'Change Food Details'}>
      {!!isSuccess && (
        <Alert variant="success">Food Updated Successfully!</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-4" controlId="foodName">
          <Form.Label className='fw-bold'>Food Name</Form.Label>
          <Form.Control
            type="text"
            {...register('foodName', { required: true })}
            defaultValue={food?.foodName}
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
            defaultValue={food?.foodPrice}
            placeholder="Price here..."
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodPrice && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {isLoading ? (
          <Button className='px-5 py-2 fw-bold rounded-pill' variant="outline-success" type="submit" disabled>
            Update Item
          </Button>
        ) : (
          <Button className='px-5 py-2 fw-bold rounded-pill' variant="outline-success" type="submit">
            Update Item
          </Button>
        )}
      </Form>
    </Admin_Page>
  );
};

export default Edit_Food;