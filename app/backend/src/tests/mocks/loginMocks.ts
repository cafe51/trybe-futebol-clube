import * as bcrypt from 'bcryptjs';

export const mock = [
  {
    id: 1,
    username: 'AAA',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  },
  {
    id: 2,
    username: 'UAAser',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
  }
];

export const signedUser =
  {
    id: 1,
    username: 'validUser',
    role: 'admin',
    email: 'validEmail@hotmail.com',
    password: bcrypt.hashSync('validPassword', 8),
  };

export const validLoginDataInput = {
  email: 'validEmail@hotmail.com',
  password: 'validPassword'
}

export const invalidEmailInput = {
  email: undefined,
  password: 'validPassword'
}

export const invalidPasswordInput = {
  email: 'validEmail@hotmail.com',
  password: undefined
}

export const wrongEmailInput = {
  email: 'wrongEmail@hotmail.com',
  password: 'validPassword'
}

export const wrongPasswordInput = {
  email: 'validEmail@hotmail.com',
  password: 'wrongPassword'
}

export const unsignedUser = {
  username: 'newUser',
  role: 'admin',
  email: 'newuser@admin.com',
  password: 'newValidPassWord'
}