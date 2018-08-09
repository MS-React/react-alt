const settings = {
  SERVICE: {
    baseurl: 'https://ms-labs-be.herokuapp.com/service',
  },
};

if (process.env.NODE_ENV === 'local') {
  settings.SERVICE.baseurl = 'http://localhost:3030/service';
}

export default settings;
