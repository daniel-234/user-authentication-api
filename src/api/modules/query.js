const testData = { message: 'hello' };

// Generic methods used in the generic controllers
export const controllers = {
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

export const createOne = model => (req, res, next) => {
  controllers.createOne();
};

export const updateOne = model => async (req, res, next) => {};

export const deleteOne = model => (req, res, next) => {};

export const getOne = model => (req, res, next) => {};

export const getAll = model => (req, res, next) => {};

export const findByParam = model => (req, res, next, id) => {};

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    createOne: createOne(model),
    updateOne: updateOne(model),
    deleteOne: deleteOne(model),
    getOne: getOne(model),
    getAll: getAll(model),
    findByParam: findByParam(model)
  };

  return { ...defaults, ...overrides };
};
