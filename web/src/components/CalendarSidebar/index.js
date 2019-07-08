import React from 'react';
import PropTypes from 'prop-types';
import UnscheduledAppointments from 'Src/components/UnscheduledAppointments';
import { NavLink } from 'react-router-dom';
import './calendarSidebar.scss';

const CalendarSidebar = ({ unscheduled }) => (
  <div className="calendar-sidebar">
    <div className="heading">Schedule MRI</div>
    <div className="options">
      <NavLink exact activeClassName="active" to="/add-appointment">
        <div className="button">
          <div>Add Appointment</div>
          <div className="icon">+</div>
        </div>
      </NavLink>
      <NavLink exact activeClassName="active" to="/">
        <div className="button">
          <div>View Appointments</div>
        </div>
      </NavLink>
      <div className="item">
        <div>Unscheduled Appointments</div>
        <UnscheduledAppointments unscheduled={unscheduled} />
      </div>
    </div>
  </div>
);

CalendarSidebar.propTypes = {
  unscheduled: PropTypes.array
};

CalendarSidebar.defaultProps = {
  unscheduled: []
};

export default CalendarSidebar;
