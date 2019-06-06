require('dotenv').config();const mongoose = require('mongoose');
const User = require('../../lib/models/User');
const { untokenize } = require('../../lib/utils/token');

describe('User model tests', () => {

  it('has a password virtual', () => {
    const user = new User({
      name: 'Bonnie',
      handle: 'mcnadams',
      password: 'theruns'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Bonnie',
      handle: 'mcnadams',
    });
    expect(user._tempPassword).toEqual('theruns');
  });

  it('has a saved hash password', () => {
    const user = new User({
      name: 'Bonnie',
      handle: 'mcnadams',
      passwordHash: 'xyz'
    });
    expect(user.passwordHash).toEqual('xyz');    
  });

  it('compares a correct password to the saved hash', () => {
    const user = new User({
      name: 'Bonnie',
      handle: 'mcnadams',
      password: 'leland',
      passwordHash: '$2b$10$ABCDEFGHIABCDEFGHI123uAVZROaIfLowzKSc4PW0gQLe8SwHwNHK'
    });
    return user.compare('leland')
      .then(result => {
        expect(result).toBeTruthy();
      });
  });

  it('compares an incorrect password to the saved hash', () => {
    const user = new User({
      name: 'Bonnie',
      handle: 'mcnadams',
      password: 'leland',
      passwordHash: '$2b$10$ABCDEFGHIABCDEFGHI123uAVZROaIfLowzKSc4PW0gQLe8SwHwNHK'
    });
    return user.compare('banana')
      .then(result => {
        expect(result).toBeFalsy();
      });
  });

  it('creates an auth token', () => {
    const user = new User({
      name: 'Bonnie',
      handle: 'mcnadams',
      password: 'leland',
      passwordHash: '$2b$10$ABCDEFGHIABCDEFGHI123uAVZROaIfLowzKSc4PW0gQLe8SwHwNHK'
    });
    const token = user.authToken();
    expect(token).toEqual(expect.any(String));
    const payload = untokenize(token);
    expect(payload).toEqual({
      _id: expect.any(String),
      name: 'Bonnie',
      handle: 'mcnadams',
    });
  });

});
