const { successHandler, errorHandler } = require('./responseHandler');
const { message } = require('./libs')

const patchTodo = (data) => {
  const { req, res, todos } = data;
  let body = "";

  req.on('data', chunk => {
      body += chunk;
  });

  req.on('end', () => {
    const { noData, wrongColumn } = message
    try {
        const { title } = JSON.parse(body);

        if ( title ) {
          const id = req.url.split('/').pop();
          const index = todos.findIndex((todo) => todo.id === id);

          if ( index !== -1 ) {
            todos[index].title = title;
            successHandler(res, todos);
          } else {
            errorHandler(res, 400, noData);
          }
        } else {
            errorHandler(res, 400, wrongColumn);
        }
    } catch(err) {
      errorHandler(res, 400, err.message);
    }
  });
};

module.exports = patchTodo;