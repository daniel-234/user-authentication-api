const testData = {
  message:
    'This is the instructor root end point after using controllers! Test passed!'
};
// const testData =
//   'This is the instructor root end point after using controllers! Test passed!';

/*
 * These generic methods inside the `controllers` object
 * are used in the functions below. Inside those we return 
 * these contoller methods, just in case we wanted to perform 
 * extra operations inside each one of these methods.
 * 
 * It can be seen as an overhead here, where these methods
 * are just returned, but as this is a learning experience, this
 * should be thought as a general procedure when working with more
 * complicated controllers. * 
 */

export const controllers = {
  /*
   * For now there is not a database in place yet, so each one
   * of these methods is just returning a promise which resolves
   * to the value of `testData` above.
   */
  createOne(model, body) {
    return Promise.resolve(testData);
  },

  updateOne(docToUpdate, update) {
    return Promise.resolve(testData);
  },

  deleteOne(docToDelete) {
    return Promise.resolve(testData);
  },

  getOne(docToGet) {
    return Promise.resolve(testData);
  },

  getAll(model) {
    return Promise.resolve(testData);
  },

  findByParam(model, id) {
    return Promise.resolve(testData);
  }
};

/*
 * The functions that consume the controllers are closures which
 * take the model and return another function definition. 
 * This way the model is passed to the actual controller when 
 * `generateControllers` is called inside the `instructorController`
 * module with a model as argument.
 * The controller generated this way will be able to use the model 
 * when it is called from the router where the model is outside of
 * its scope. 
 * 
 * This way we can define controllers in a more general way and make 
 * use of them for every resource without redefining them every time.
 */
export const createOne = model => (req, res, next) => {
  return controllers
    .createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};

export const updateOne = model => async (req, res, next) => {};

export const deleteOne = model => (req, res, next) => {};

export const getOne = model => (req, res, next) => {};

export const getAll = model => (req, res, next) => {
  return controllers
    .getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error));
};

export const findByParam = model => (req, res, next, id) => {};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    // These methods are going to be the controllers.
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
    getOne: getOne(model),
    getAll: getAll(model),
    findByParam: findByParam(model)
  };

  /*
   * To overcome the fact that maybe we don't need these
   * controllers to be so generic for this resource, we have 
   * the possibility to extend it with overrides, if we want. 
   * 
   * We can also override them per model. 
   */
  return { ...defaults, ...overrides };
};
