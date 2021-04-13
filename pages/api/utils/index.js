function handleError(res, err) {
  console.log('*************************');
  console.log(err);
  console.log('*************************');
  res.status(500).send({
    status: 500,
    message: `${err.code} - ${err.message}`,
  });
  res.end();
}
export default handleError;
