exports.handleCustomErrors = (err, request, response, next) => {
    if (err.status && err.msg) {
      response.status(err.status).send(err)
    } else next(err)
  }