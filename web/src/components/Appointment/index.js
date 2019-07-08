import React, { Component } from 'react';
import { request } from 'Src/utils';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import './appointment.scss';

class Appointment extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    fetchAppointments: PropTypes.func.isRequired,
    notify: PropTypes.func
  };

  static defaultProps = {
    notify: alert.bind(window)
  };

  state = {
    name: '',
    age: '',
    sex: '',
    height: '',
    weight: '',
    hospitalId: '',
    mriExamination: '',
    suspectedPathology: '',
    referringPhysician: '',
    tel: '',
    email: '',
    address: '',
    start: null,
    finish: null
  };

  componentDidMount() {
    request(`/appointment/${this.props.match.params.id}`).then(data => {
      if (data.success) {
        this.setState(data.data);
      } else {
        this.props.notify('Could not find appointment', 'danger');
        this.props.history.push('/');
      }
    });
  }

  deleteEvent() {
    request(`/appointment/${this.props.match.params.id}/delete`).then(data => {
      if (data.success) {
        this.props.notify('Appointment deleted', 'success');
        this.props.history.push('/');
        this.props.fetchAppointments();
      } else {
        this.props.notify('Could not delete appointment', 'danger');
      }
    });
  }

  render() {
    return (
      <div className="appointment">
        <div className="heading">Appointment Details</div>
        <div className="list-item">
          <div>Start</div>
          <div>
            {this.state.start && new Date(this.state.start).toTimeString()}
          </div>
        </div>
        <div className="list-item">
          <div>End</div>
          <div>
            {this.state.finish && new Date(this.state.finish).toTimeString()}
          </div>
        </div>
        <div className="list-item">
          <div>Name</div>
          <div>{this.state.name}</div>
        </div>
        <div className="list-item">
          <div>Age</div>
          <div>{this.state.age}</div>
        </div>
        <div className="list-item">
          <div>Gender</div>
          <div>{this.state.sex}</div>
        </div>
        <div className="list-item">
          <div>Height</div>
          <div>{this.state.height}</div>
        </div>
        <div className="list-item">
          <div>Weight</div>
          <div>{this.state.weight}</div>
        </div>
        <div className="list-item">
          <div>Hospital ID</div>
          <div>{this.state.hospitalId}</div>
        </div>
        <div className="list-item">
          <div>MRI Examination</div>
          <div>{this.state.mriExamination}</div>
        </div>
        <div className="list-item">
          <div>Suspected Pathology</div>
          <div>{this.state.suspectedPathology}</div>
        </div>
        <div className="list-item">
          <div>Referring Physician</div>
          <div>{this.state.referringPhysician}</div>
        </div>
        <div className="list-item">
          <div>Phone Number</div>
          <div>{this.state.tel}</div>
        </div>
        <div className="list-item">
          <div>Email</div>
          <div>{this.state.email}</div>
        </div>
        <div className="list-item">
          <div>Address</div>
          <div>{this.state.address}</div>
        </div>
        <div className="buttons">
          <Link
            to={{
              pathname: '/update-appointment',
              state: {
                ...this.state,
                id: this.props.match.params.id
              }
            }}
          >
            Update Appointment
          </Link>
          <div onClick={() => this.deleteEvent()}>Delete Appointment</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Appointment);
