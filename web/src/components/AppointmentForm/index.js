import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { request } from 'Src/utils';
import { withRouter } from 'react-router-dom';
import './appointmentForm.scss';

class AppointmentForm extends Component {
  state = {
    update: false,
    formData: {
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
      address: ''
    }
  };

  static propTypes = {
    notify: PropTypes.func.isRequired,
    fetchAppointments: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  static defaultProps = {
    notify: alert.bind(window)
  };

  componentDidMount() {
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.id
    )
      this.setState({
        update: true,
        formData: { ...this.state.formData, ...this.props.location.state }
      });
  }

  resetForm = () =>
    this.setState({
      update: false,
      formData: {
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
        address: ''
      }
    });

  handleChange = event =>
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });

  handleSubmit = event => {
    event.preventDefault();
    const update = this.state.update;
    request(`/appointment/${update ? 'update' : 'create'}`, this.state.formData)
      .then(data => {
        if (data.success) {
          this.resetForm();
          this.props.notify(
            `Appointment ${update ? 'updated' : 'added'}`,
            'success'
          );
          this.props.fetchAppointments();
          this.props.history.push('/');
        } else {
          this.props.notify(
            `Unable to ${update ? 'update' : 'add'} appointment`,
            'danger'
          );
        }
      })
      .catch(console.err);
  };

  render() {
    const { formData } = this.state;
    return (
      <form className="appointment-form" onSubmit={this.handleSubmit}>
        <div className="heading">
          {this.state.update ? 'Update' : 'Add'} Appointment
        </div>
        <label>
          <div className="input-label">Name</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={this.handleChange}
          />
        </label>
        <div className="columns-4">
          <label>
            <div className="input-label">Age</div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Gender</div>
            <input
              type="text"
              name="sex"
              value={formData.gender}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Height</div>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Weight</div>
            <input
              type="text"
              name="weight"
              value={formData.weight}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div className="columns-2">
          <label>
            <div className="input-label">Hospital ID</div>
            <input
              type="text"
              name="hospitalId"
              value={formData.hospitalId}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">MRI Examination</div>
            <input
              type="text"
              name="mriExamination"
              value={formData.mriExamination}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Suspected Pathology</div>
            <input
              type="text"
              name="suspectedPathology"
              value={formData.suspectedPathology}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Referring Physician</div>
            <input
              type="text"
              name="referringPhysician"
              value={formData.referringPhysician}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Phone number</div>
            <input
              type="text"
              name="tel"
              value={formData.tel}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <div className="input-label">Email</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <label>
          <div className="input-label">Address</div>
          <textarea
            name="address"
            value={formData.address}
            onChange={this.handleChange}
          />
        </label>
        <div className="add-button-container">
          <button type="submit">{this.state.update ? 'Update' : 'Add'}</button>
        </div>
      </form>
    );
  }
}

export default withRouter(AppointmentForm);
