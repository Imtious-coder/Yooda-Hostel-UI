import React from 'react';
import { NavLink } from 'react-router-dom';

const Side_Navigation = () => {
  return (
    <div className="col-md-3">
      <ul className="list-group sticky-top py-2">
        <NavLink as="li" className="list-group-item my-2 border border-2 rounded-pill text-center text-uppercase fw-bold" to="/">
          Foods
        </NavLink>
        <NavLink as="li" className="list-group-item my-2 border border-2 rounded-pill text-center text-uppercase fw-bold" to="/add-food">
          Add Foods
        </NavLink>
        <NavLink as="li" className="list-group-item my-2 border border-2 rounded-pill text-center text-uppercase fw-bold" to="/show-students">
          Students
        </NavLink>
        <NavLink as="li" className="list-group-item my-2 border border-2 rounded-pill text-center text-uppercase fw-bold" to="/add-students">
          Add Students
        </NavLink>
        <NavLink as="li" className="list-group-item my-2 border border-2 rounded-pill text-center text-uppercase fw-bold" to="/distribution-food">
          Distribute Foods
        </NavLink>
      </ul>
    </div>
  );
};

export default Side_Navigation;
