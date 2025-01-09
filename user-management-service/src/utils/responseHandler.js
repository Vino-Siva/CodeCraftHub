const successResponse = (res, data, message = "Success") => {
  res.status(200).json({ message, data });
};

const errorResponse = (res, error, statusCode = 400) => {
  res.status(statusCode).json({ error });
};

module.exports = { successResponse, errorResponse };
