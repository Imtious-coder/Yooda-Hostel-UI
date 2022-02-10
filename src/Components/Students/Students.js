import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Admin_Page from '../Admin_Page/Admin_Page';


const StudentTable = (props) => {
  const { _id, fullName, roll, age, stclass, hall, status } = props.student;
  return (
    <tr className="text-center">
      <td>
        <input
          onChange={props.onCheckValues}
          className="form-check-input"
          type="checkbox"
          value={[_id, status]}
        />
      </td>
      <td>{fullName}</td>
      <td>{roll}</td>
      <td>{age}</td>
      <td>{stclass}</td>
      <td>{hall}</td>
      <td>
        {status === 'active' ? (
          <span className="badge text-success">ACTIVE</span>
        ) : (
          <span className="badge bg-danger me-2">IN ACTIVE</span>
        )}
      </td>
      <td>
        <Link to={`/show-students/${_id}`}>
          <button
            type="button"
            className="btn btn-outline-primary py-0 px-3 mx-2"
          >
            Edit
          </button>
        </Link>
        <button
          onClick={() => props.handleSingleDelete(_id)}
          type="button"
          className="btn btn-outline-danger py-0 px-3 mx-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const Students = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const size = 5;

  const [checkedStudents, setCheckedStudents] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);

  let checkedIds = [];
  if (checkedStudents.length > 0) {
    checkedStudents.forEach((st) => {
      let newArr = st.split(',');
      if (checkedIds.indexOf(newArr[0]) === -1) {
        checkedIds.push(newArr[0]);
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5001/students?page=${curPage}&&size=${size}`,
      )
      .then((res) => {
        setAllStudents(res.data.result);
        setPageCount(Math.ceil(res.data.count / size));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [curPage, deleteStatus]);

  const onCheckValues = (e) => {
    if (e.target.checked) {
      setCheckedStudents((checkedStudents) => [
        ...checkedStudents,
        e.target.value,
      ]);
    } else {
      const filterChecked = checkedStudents.filter(
        (st) => st.split(',')[1] !== e.target.value.split(',')[1],
      );
      setCheckedStudents(filterChecked);
    }
  };

  const handleMultpleDelete = () => {
    setIsLoading(true);
    axios
      .post('http://localhost:5001/multi', checkedIds)
      .then((res) => {
        if (res.status === 200) {
          setDeleteStatus(!deleteStatus);
          setIsLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setCheckedStudents([]);
        checkedIds = [];
      });
  };

  const handleSingleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`http://localhost:5001/students/${id}`)
      .then((res) => {
        if (res.data.deletedCount === 1) {
          setDeleteStatus(!deleteStatus);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleStatus = () => {
    console.log('Checked Students:', checkedStudents);
    axios
      .post('http://localhost:5001/status', checkedStudents)
      .then((res) => {
        if (res.status === 200) {
          setDeleteStatus(!deleteStatus);
          setIsLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setCheckedStudents([]);
        checkedIds = [];
      });
  };

  return (
    <Admin_Page pageTitle={'Show all students'}>
      {/* Loader... */}
      {
            isLoading && 
            // Loader...
            <div class="d-flex justify-content-center py-3">
              <div class="spinner-grow text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
        }
      {allStudents.length > 0 ? (
        <>
        {/* Table... */}
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Name</th>
                <th>Roll</th>
                <th>Age</th>
                <th>Class</th>
                <th>Hall</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student, index) => (
                <StudentTable
                  key={student._id}
                  index={index}
                  student={student}
                  onCheckValues={onCheckValues}
                  handleSingleDelete={handleSingleDelete}
                />
              ))}
            </tbody>
          </Table>

        {/* Paginations... */}
          <ul className="pagination pagination-md">
            {[...Array(pageCount).keys()].map((number) => (
              <li
                key={number}
                className={`page-item ${number === curPage && 'active'}`}
                onClick={() => setCurPage(number)}
              >
                <Link className="page-link" to="#">
                  {number + 1}
                </Link>
              </li>
            ))}
          </ul>
          {/* Buttons for bulk students... */}
          <button
            type="button"
            onClick={handleStatus}
            className={`btn btn-success py-2 px-3 rounded-pill my-3 ${
              checkedStudents.length <= 0 && 'disabled'
            }`}
          >
            Change Status
          </button>
          <button
            type="button"
            onClick={handleMultpleDelete}
            className={`btn btn-danger py-2 px-3 rounded-pill my-3 mx-2 ${
              checkedStudents.length <= 0 && 'disabled'
            }`}
          >
            Delete Selected
          </button>
        </>
      ) : " "}
    </Admin_Page>
  );
};

export default Students;
