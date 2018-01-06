import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '../env';

const User = mongoose.model('users', {
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  password: {
    type: String,
    set: val => bcrypt.hashSync(val, SALT_ROUNDS),
  },
  avatar: String,
  city: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

export default User;
