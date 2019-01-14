import { generateControllers } from '../../modules/query';
import { Instructor } from './instructorModel';

function createInstructor(req) {
  let instructor = new Instructor();
  instructor.firstname = req.body.firstname;
  instructor.lastname = req.body.lastname;
  instructor.company = req.body.company;
  return Instructor.create(instructor);
}

let createOne = () => (req, res, next) => {
  return createInstructor(req)
    .then(instructor => res.status(201))
    .catch(error => {
      next(error);
    });
};

export default generateControllers(Instructor);
