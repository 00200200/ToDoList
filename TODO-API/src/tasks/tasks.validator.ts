import { body, ValidationChain } from 'express-validator';
import { Status } from '../enums/Status';
import { Priority } from '../enums/Priority';
export const createValidator: ValidationChain[] = [
	body('title')
		.not()
		.isEmpty()
		.withMessage('The task title mandatory')
		.trim()
		.isString()
		.withMessage('Title needs to be in text format'),
	body('date')
		.not()
		.isEmpty()
		.withMessage('The task date is mandatory')
		.isString()
		.withMessage('The date needs to be a valid date format'),
	body('description').trim().isString().withMessage('The description needs to be in text format'),
	body('priority')
		.trim()
		.isIn([Priority.high, Priority.normal, Priority.low])
		.withMessage('The priority needs to be high, normal or low'),
	body('status')
		.trim()
		.isIn([Status.todo, Status.completed, Status.inProgress])
		.withMessage('The status needs to be todo or done'),
];

export const updateValidator: ValidationChain[] = [
	body('id')
		.not()
		.isEmpty()
		.withMessage('The task id is mandatory')
		.trim()
		.isString()
		.withMessage('The id needs to be in text format'),
	body('status')
		.trim()
		.isIn([Status.todo, Status.completed, Status.inProgress])
		.withMessage('The status needs to be todo or done'),
];
