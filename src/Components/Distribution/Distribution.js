import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Admin_Page from '../Admin_Page/Admin_Page';

const Distribution = () => {
  const [filterStudent, setFilterStudent] = useState(null);
  const [students, setStudents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5001/students')
      .then((res) => {
        setStudents(res.data.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSubmit = (data) => {
    const { searchRoll, date, shift } = data;

    const filterId = students.find((st) => st.roll === searchRoll);

    if (!filterId) {
      setMsg('No matching roll found!');
      return;
    }
    data = {
      date: new Date(date).toLocaleDateString(),
      shift: shift,
      id: filterId._id,
    };
    axios
      .post('http://localhost:5001/distribution', data)
      .then((res) => {
        if (res.data) {
          let resStuId = res.data.studentId;
          let findStudent = students.find((stu) => stu._id === resStuId);
          let studentDetails = {
            id: res.data._id,
            studentId: res.data.studentId,
            fullName: findStudent.fullName,
            hall: findStudent.hall,
            shift: res.data.shift,
            date: res.data.date,
            status: res.data.status,
          };
          setFilterStudent(studentDetails);
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        setFilterStudent({
          studentId: data.id,
          fullName: filterId.fullName,
          hall: filterId.hall,
          shift: data.shift,
          date: data.date,
        });
      })
      .finally(() => {
        setIsLoading(false);
        reset({});
      });
    setMsg(null);
  };

  const { register, handleSubmit, reset } = useForm();

  return (
    <Admin_Page pageTitle={'Food Distributions'}>
      {
            isLoading && 
            // Loader...
            <div class="d-flex justify-content-center py-3">
              <div class="spinner-grow text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
        }
      <Form onSubmit={handleSubmit(onSubmit)} className="input-group mb-3">
        <input
          type="text"
          className="form-control form-control-md"
          placeholder="Enter student roll"
          {...register('searchRoll', { required: true })}
        />

        <select
          className="form-select mx-2"
          {...register('shift', { required: true })}
        >
          <option selected defaultValue="">
            Select Shift
          </option>
          <option value="morning">Morning</option>
          <option value="day">Day</option>
          <option value="night">Night</option>
        </select>

        <input
          type="date"
          className="form-control form-control-md me-2"
          {...register('date', { required: true })}
        />

        <button type="submit" className="input-group-text btn-success">
          Search
        </button>
      </Form>
      {msg && <p>{msg}</p>}
      {!!filterStudent ? (
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Hall</th>
              <th>Shift</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>{filterStudent?.fullName}</td>
              <td>{filterStudent?.hall}</td>
              <td>{filterStudent?.shift}</td>
              <td>{filterStudent?.date}</td>
              <td>
                {!!filterStudent?.status ? (
                  <span className="badge text-success me-2">Already Served!</span>
                ) : (
                  <span className="badge bg-danger me-2">Not Served</span>
                )}
              </td>
              <td>
                {!!filterStudent?.status ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm my-1"
                    disabled
                  >
                    Already Served
                  </button>
                ) : (
                  <Link
                    to={`/serve-students/${filterStudent.studentId}/${filterStudent.shift}?date=${filterStudent.date}`}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm my-1"
                    >
                      Serve
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : " "}
    </Admin_Page>
  );
};

export default Distribution;
