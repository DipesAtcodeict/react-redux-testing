export default ({ dispatch }) => (next) => (action) => {
  // check to see if the action has a promise on its payload property
  //if it does then wait for it to resolve
  //if it doesnt, then send the action to the next middleware

  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  action.payload.then(function (response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
