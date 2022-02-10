import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Admin_Page from '../Admin_Page/Admin_Page';

// Food table...
const FoodTable = (props) => {
  const { foodName, foodPrice } = props.food;
  return (
    <tr>
      <td>{foodName}</td>
      <td>{foodPrice}</td>
    </tr>
  );
};

const Foods = () => {
    // States...
  const [allFoods, setAllFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const size = 5;

//   Fetching data...
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://aqueous-reef-45630.herokuapp.com/foods?page=${curPage}&&size=${size}`,
      )
      .then((res) => {
        setAllFoods(res.data.result);
        setPageCount(Math.ceil(res.data.count / size));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [curPage]);

  return (
    <Admin_Page pageTitle={'Show all Foods'}>
        {
            isLoading && 
            // Loader...
            <div class="d-flex justify-content-center py-3">
                            <div class="spinner-grow text-info" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
        }
      {allFoods.length > 0 ? (
        <>
        {/* UI */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {allFoods.map((food, index) => (
                <FoodTable key={food._id} index={index} food={food} />
              ))}
            </tbody>
          </Table>

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
        </>
      ) : ""}
    </Admin_Page>
  );
};

export default Foods;
