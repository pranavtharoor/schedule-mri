import React, { Component } from 'react';
import Calendar from 'Src/components/Calendar';
import CalendarSidebar from 'Src/components/CalendarSidebar';
import AppointmentForm from 'Src/components/AppointmentForm';
import Appointment from 'Src/components/Appointment';
import Snackbar from 'Src/components/Snackbar';
import { request } from 'Src/utils';
import { Draggable } from '@fullcalendar/interaction';
import { Route } from 'react-router-dom';
import './calendarPage.scss';

class CalendarPage extends Component {
  state = {
    unscheduled: [],
    scheduled: [],
    snackbar: { message: null, type: null }
  };

  notify = (message, type) =>
    this.setState({ snackbar: { message, type } }, () =>
      setTimeout(
        () => this.setState({ snackbar: { message: null, type: null } }),
        3000
      )
    );

  setDraggable = () => {
    document
      .querySelectorAll('.appointment:not(.draggable)')
      .forEach(appointment => {
        new Draggable(appointment, {
          eventData: {
            id: appointment.getAttribute('id'),
            title: appointment.getAttribute('title')
          }
        });
        appointment.classList.add('draggable');
      });
  };

  fetchAppointments = () => {
    request('/appointment').then(data => {
      data.data = data.data.map(appointment => ({
        id: appointment.id,
        title: appointment.name,
        start: appointment.start,
        end: appointment.finish
      }));
      if (data.success)
        this.setState(
          {
            unscheduled: data.data.filter(
              appointment => !appointment.start || !appointment.end
            ),
            scheduled: data.data.filter(
              appointment => appointment.start && appointment.end
            )
          },
          this.setDraggable
        );
      else this.notify('Unable to get unscheduled appointments', 'danger');
    });
  };

  componentDidMount() {
    this.fetchAppointments();
  }

  render() {
    return (
      <div className="calendar-page">
        <div className="sidebar-container">
          <CalendarSidebar unscheduled={this.state.unscheduled} />
        </div>
        <div className="calendar-container">
          <Route
            exact
            path={'/appointment/:id'}
            render={routeProps => (
              <Appointment
                {...routeProps}
                notify={this.notify}
                fetchAppointments={this.fetchAppointments}
              />
            )}
          />
          <Route
            exact
            path="/add-appointment"
            render={routeProps => (
              <AppointmentForm
                {...routeProps}
                notify={this.notify}
                fetchAppointments={this.fetchAppointments}
              />
            )}
          />
          <Route
            exact
            path="/update-appointment"
            render={routeProps => (
              <AppointmentForm
                {...routeProps}
                notify={this.notify}
                fetchAppointments={this.fetchAppointments}
              />
            )}
          />
          <Route
            exact
            path="/"
            render={routeProps => (
              <Calendar
                notify={this.notify}
                {...routeProps}
                scheduled={this.state.scheduled}
                fetchAppointments={this.fetchAppointments}
              />
            )}
          />
        </div>
        <Snackbar {...this.state.snackbar} />
      </div>
    );
  }
}

export default CalendarPage;
