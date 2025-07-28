const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const avatars = [
  'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg',
  'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg',
  'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  'https://images.pexels.com/photos/1704489/pexels-photo-1704489.jpeg',
  'https://images.pexels.com/photos/1197132/pexels-photo-1197132.jpeg',
  'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
  'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg',
  'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg',
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  'https://images.pexels.com/photos/428341/pexels-photo-428341.jpeg',
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
  'https://images.pexels.com/photos/1130625/pexels-photo-1130625.jpeg',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  'https://images.pexels.com/photos/428339/pexels-photo-428339.jpeg',
  'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg'
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.avatar) {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    this.avatar = avatars[randomIndex];
  }
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);