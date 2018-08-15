export default function login({ username = '', password = '' }) {
  if (username === 'username' && password === 'password') {
    const user = {
      name: 'John',
      email: 'john@gmail.com',
      phone: '1234',
      skypeId: 'johndoe',
    };

    return new Promise(((resolve) => {
      setTimeout(resolve, Math.random() * 200, user);
    }));
  }

  return new Promise(((resolve, reject) => {
    setTimeout(reject, Math.random() * 200, {
      code: 400,
      message: 'Invalid credentials.',
    });
  }));
}
