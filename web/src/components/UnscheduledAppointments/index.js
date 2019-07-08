import React from 'react';
import PropTypes from 'prop-types';
import './unscheduledAppointments.scss';

const UnscheduledAppointments = ({ unscheduled }) => (
  <div id="unscheduled-appointments">
    {unscheduled.length ? (
      unscheduled.map((appointment, i) => (
        <div
          id={appointment.id}
          title={appointment.title}
          className="appointment"
          key={`appointment_${i}`}
        >
          {appointment.title}
        </div>
      ))
    ) : (
      <div className="message">No unscheduled appointments</div>
    )}
  </div>
);

UnscheduledAppointments.propTypes = {
  notify: PropTypes.func.isRequired,
  unscheduled: PropTypes.array
};

UnscheduledAppointments.defaultProps = {
  notify: alert.bind(window),
  unscheduled: []
};

export default UnscheduledAppointments;
