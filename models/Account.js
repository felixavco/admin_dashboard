const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  domain: { type: String },
  verification_code: { type: String },
  email_settings:{
    userName: { type: String },
    password: { type: String },
    host: { type: String },
    port: { type: String, default: 25 },
  }
});

module.exports = Account = mongoose.model('accounts', AccountSchema);