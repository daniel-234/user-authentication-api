import merge from 'lodash.merge';

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
  createOne(model, body) {
    /*
     * Return the value of calling `Model.create` with body as argument.
     * The method call `Model.create` saves the documents passed as
     * argument to the database, triggering the `save()` middleware
     * for every call. 
     * 
     * >> See docs: https://mongoosejs.com/docs/api.html#model_Model.create
     * 
     * 
     * The method call `model.create` returns a Promise. 
     * So this function `createOne` returns that Promise, which means it can 
     * trigger other functionalities asynchronously, as it is resolved, when 
     * this function is called.
     * 
     */
    return model.create(body);
  },

  updateOne(docToUpdate, update) {
    const updatedDoc = merge(docToUpdate, update);
    /*
     * Call the document middleware function `save` on the returned object. 
     * 
     * (We could have also simply called `merge(destinationObj, sourceObj)`,
     * saving the destination object).
     * 
     */
    return updatedDoc.save();
  },

  deleteOne(docToDelete) {
    /*
     * Call the document middleware function `remove` on the document
     * we want to delete (we already have it and pass it as an argument). 
     * 
     * >> See docs: https://mongoosejs.com/docs/middleware.html
     * 
     */
    return docToDelete.remove();
  },

  getOne(docToGet) {
    /*
     * Here we are just passing the Promise object we already have.
     * 
     * This step has been introduced just to allow any manipulation on
     * the document, if needed.
     */
    return Promise.resolve(docToGet);
  },

  getAll(model) {
    return model.find({}).exec();
  },

  findByParam(model, id) {
    return model.findById(id).exec();
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
 * Now we can define controllers in a more general way and make use of
 * them for every resource without redefining them every time.
 */
export const createOne = model => (req, res, next) => {
  return controllers
    .createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => {
      next(error);
    });
};

export const updateOne = model => async (req, res, next) => {
  /*
   * You get the resource named `docFromId` that is attached 
   * to the request from the `params` function. 
   * You get the `update` from the body.
   * And then you pass it in to `controllers.updateOne` to
   * satisfy it (its signature says it takes a document to
   * update and an update and that it does nothing).
   */
  const docToUpdate = req.docFromId;
  const update = req.body;

  return controllers
    .updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};

/*
 * Delete has no payload, you just need an `id`. You 
 * basically do the same thing you did with `updateOne`.
 * That means that the `params` function is going to find
 * the document for the given resource and to attach it to
 * the request.
 * So, as I already have it, I am going to pass it to the 
 * request. 
 */
export const deleteOne = model => (req, res, next) => {
  return controllers
    .deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error));
};

export const getOne = model => (req, res, next) => {
  /*
   * What we need to update is literally already here. 
   * We are passing it to the controllers in case we need
   * to do something else with it, but this is an extra
   * operation that is not fundamental here. 
   */

  return controllers
    .getOne(rec.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error));
};

export const getAll = model => (req, res, next) => {
  return controllers
    .getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error));
};

/*
 * The fourth argument of the inner function is whatever was
 * on the parameter that you subscribed for. 
 * 
 * This function runs first and then, if we find the resource,
 * when it calls `next` it sends the control over to the next
 * thing. 
 */
export const findByParam = model => (req, res, next, id) => {
  return controllers
    .findByParam(model, id)
    .then(doc => {
      if (!doc) {
        next(new Error('Not Found Error'));
      } else {
        req.docFromId = doc;
        next();
      }
    })
    .catch(error => {
      next(error);
    });
};

/*
 * Check the resources model files to see which properties/fields
 * are needed. 
 */
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
