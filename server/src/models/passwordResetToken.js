// import mongoose from 'mongoose';

// const passwordResetTokenSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   token: { type: String, required: true },
//   expiryDate: { type: Date, required: true }
// });

// const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

// module.exports = PasswordResetToken;


import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  expiryDate: { type: Date, required: true }
});

const PasswordResetToken = mongoose.model('PasswordResetToken', passwordResetTokenSchema);

export default PasswordResetToken;
