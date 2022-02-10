import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Admin_Page from '../Admin_Page/Admin_Page';

const Student_Form = () => {
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
      .post('http://localhost:5001/students', data)
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
    <Admin_Page pageTitle={'Add Student'}>
      {!!isSuccess && (
        <Alert variant="success">Great! Successfully Added Student . . . </Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-4" controlId="studentName">
          <Form.Label className='fw-bold'>Name:</Form.Label>
          <Form.Control
            type="text"
            {...register('fullName', { required: true })}
            placeholder="Full name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentRoll">
          <Form.Label className='fw-bold'>Roll:</Form.Label>
          <Form.Control
            type="number"
            {...register('roll', { required: true })}
            placeholder="Enter Roll number"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.roll && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentAge">
          <Form.Label className='fw-bold'>Age:</Form.Label>
          <Form.Control
            type="number"
            {...register('age', { required: true })}
            placeholder="How old is the student"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.age && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentClass">
          <Form.Label className='fw-bold'>Class:</Form.Label>
          <Form.Control
            type="number"
            {...register('stclass', { required: true })}
            placeholder="Please type your class"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.stclass && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentHall">
          <Form.Label className='fw-bold'>Hall:</Form.Label>
          <Form.Control
            type="text"
            {...register('hall', { required: true })}
            placeholder="Hall name here"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.hall && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Status... */}
        <Form.Group className="mb-3" controlId="studentStatus">
          <Form.Check
            type="radio"
            id="studentStatus"
            label="Active"
            value="active"
            {...register('status', { required: true })}
          />
          <Form.Check
            type="radio"
            id="studentStatus"
            label="In Active"
            value="inActive"
            {...register('status', { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.studentStatus && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Buttons... */}
        {isLoading ? (
          <Button className='px-5 py-2 fw-bold rounded-pill d-block m-auto' variant="outline-success" type="submit" disabled>
            Add Student
          </Button>
        ) : (
          <Button className='px-5 py-2 fw-bold rounded-pill d-block m-auto' variant="outline-success" type="submit">
            Add Student
          </Button>
        )}
      </Form>
    </Admin_Page>
  );
};

export default Student_Form;
