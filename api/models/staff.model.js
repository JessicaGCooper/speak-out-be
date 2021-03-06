const db = require('../../database/db-config');

const returning = [
  's.id as staff_id',
  'u.name',
  'u.short_name',
  'u.username',
  's.cpr',
  's.mobile_number',
  'u.email',
  's.accent',
  's.gender',
  's.birthdate',
  's.teaching_rate',
  'u.user_type',
  's.active',
  's.created_at as staff_created_at',
  's.updated_at as staff_updated_at',
  'u.created_at as user_created_at',
  'u.updated_at as user_updated_at',
  's.user_id'
];
const find = (queries) => {
  // let limit = queries.limit || 15;
  // let offset = 0;
  // const { page } = queries;
  // if (page) {
  //   if (!offset) {
  //     offset++;
  //   }
  //   offset = page * limit - limit;
  // }

  return db('staff as s')
    .select(returning)
    .join('user as u', 's.user_id', 'u.user_id')
    .orderBy('staff_id', 'desc')
    // .offset(offset)
    // .limit(limit);
};

const findAll = () => {
  return db('staff as s')
    .select(['s.id', 'u.name'])
    .join('user as u', 's.user_id', 'u.user_id')
    .orderBy('s.id', 'desc');
};

const findByID = id => {
  return db('staff as s')
    .select(returning)
    .where('s.id', '=', id)
    .join('user as u', 's.user_id', 'u.user_id')
    .first();
};

const findByCPR = cpr => {
  return db('staff as s')
    .select(returning)
    .where('s.cpr', '=', cpr)
    .join('user as u', 's.user_id', 'u.user_id')
    .first();
};

const create = async (userBody, staffBody) => {
  /// TRANSACTIONS ARE SO THAT IT EITHER DOES BOTH THINGS OR IT DOES NONE --> IN CASE THERE IS AN ERROR SAVING THE STAFF INFO, WE DONT WANT THE USER TO BE SAVED. ETC
  return db.transaction(trx => {
    return db('user')
      .transacting(trx)
      .insert(userBody)
      .returning('user_id')
      .then(res => {
        return db('staff')
          .transacting(trx)
          .insert({ ...staffBody, user_id: res[0] })
          .returning('id');
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

const edit = async (staffID, userBody, staffBody) => {
  return db.transaction(trx => {
    return db('staff')
      .transacting(trx)
      .update(staffBody)
      .where({ id: staffID })
      .returning('user_id')
      .then(res => {
        return db('user')
          .transacting(trx)
          .update(userBody)
          .where({ user_id: res[0] })
          .returning('user_id')
          .then(res => {
            return db('staff as s')
              .select(returning)
              .where('s.user_id', '=', res[0])
              .join('user as u', 's.user_id', 'u.user_id')
              .first();
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

const remove = id => {
  return db.transaction(trx => {
    return db('staff')
      .transacting(trx)
      .del()
      .where({ id })
      .returning('user_id')
      .then(res => {
        return db('user')
          .transacting(trx)
          .del()
          .where({ user_id: res[0] });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

module.exports = {
  findByID,
  findByCPR,
  create,
  find,
  findAll,
  edit,
  remove
};
