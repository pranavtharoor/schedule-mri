import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import PropTypes from 'prop-types';
import { request } from 'Src/utils';
import { withRouter } from 'react-router-dom';
import './calendar.scss';

const plugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin];

function updateEvent(event) {
  return request('/appointment/update', {
    id: event.id,
    start: event.start,
    finish:
      event.end || new Date(event.start.setHours(event.start.getHours() + 1))
  });
}

const Calendar = ({
  scheduled,
  fetchAppointments,
  notify,
  history: { push }
}) => (
  <div className="calendar">
    <FullCalendar
      defaultView="timeGridWeek"
      plugins={plugins}
      header={{
        left: 'prev,next today',
        center: 'title',
        right: 'list timeGridWeek dayGridMonth'
      }}
      allDaySlot={false}
      buttonText={{
        today: 'Today',
        month: 'Month',
        week: 'Week',
        list: 'List'
      }}
      eventReceive={({ event }) => {
        updateEvent(event).then(data => {
          if (data.success) {
            fetchAppointments();
            event.remove();
          } else {
            notify('Could not schedule appointment', 'danger');
          }
        });
      }}
      eventResize={({ event }) => {
        updateEvent(event).then(data =>
          data.success
            ? fetchAppointments()
            : notify('Could not reschedule appointment', 'danger')
        );
      }}
      eventDrop={({ event }) => {
        updateEvent(event).then(data =>
          data.success
            ? fetchAppointments()
            : notify('Could not reschedule appointment', 'danger')
        );
      }}
      eventClick={({ event }) => push(`/appointment/${event.id}`)}
      editable={true}
      nowIndicator={true}
      height="parent"
      noEventsMessage="No appointments scheduled for this day"
      droppable={true}
      events={scheduled}
    />
  </div>
);

Calendar.propTypes = {
  fetchAppointments: PropTypes.func.isRequired,
  scheduled: PropTypes.array,
  notify: PropTypes.func,
  history: PropTypes.object.isRequired
};

Calendar.defaultProps = {
  scheduled: [],
  notify: alert.bind(window)
};

export default withRouter(Calendar);
