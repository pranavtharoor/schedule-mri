import db from '../database.js';
import * as Query from '../utils/query';
import { rejectMessage } from '../utils/promise';
import k from '../constants';

function findById(id) {
  if (!id) return Promise.resolve(null);
  return db
    .selectOne(
      `
      SELECT *
        FROM appointment
       WHERE id = @id
      `,
      { id }
    )
    .catch(err =>
      err.type === k.ROW_NOT_FOUND
        ? rejectMessage('Appointment not found', k.APPOINTMENT_NOT_FOUND)
        : Promise.reject(err)
    );
}

function create(appointment) {
  const { columns, values } = Query.toColumns(appointment);
  return db
    .insert(
      `
      INSERT INTO appointment (${columns})
      VALUES (${values})
      `,
      appointment
    )
    .then(findById);
}

function selectAll() {
  return db.selectAll(
    `
    SELECT id,
           name,
           start,
           finish
      FROM appointment
    `
  );
}

function update(appointment) {
  const { id, ...change } = appointment;
  const mapping = Query.toMapping(change);
  return db
    .query(
      `
      UPDATE appointment
         SET ${mapping}
       WHERE id = @id
      `,
      appointment
    )
    .then(() => findById(id));
}

function deleteById(id) {
  return db.query(
    `
    DELETE
      FROM appointment
     WHERE id = @id
    `,
    { id }
  );
}

export default {
  findById,
  create,
  selectAll,
  update,
  deleteById
};
