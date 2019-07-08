import { Appointment } from '../models';
import { dataHandler, errorHandler } from '../utils/handlers';

function findById(req, res) {
  Appointment.findById(req.params.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function list(req, res) {
  Appointment.selectAll()
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function create(req, res) {
  Appointment.create(req.body)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function update(req, res) {
  Appointment.update(req.body)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

function deleteById(req, res) {
  Appointment.deleteById(req.params.id)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default { findById, list, create, update, deleteById };
