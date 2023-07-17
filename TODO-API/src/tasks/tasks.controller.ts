import { AppDataSource } from '../../index';
import { Task } from './tasks.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';

import { UpdateResult } from 'typeorm';
class TasksController {
	public async getAll(req: Request, res: Response): Promise<Response> {
		//Declare a variable to hold all tasks
		let allTasks: Task[];

		//Fetching all tasks using the repositorry
		try {
			allTasks = await AppDataSource.getRepository(Task).find({
				order: {
					date: 'ASC',
				},
			});
			allTasks = instanceToPlain(allTasks) as Task[];
			return res.json(allTasks).status(200);
		} catch (_err) {
			return res.json({ err: 'Internal server Error' }).status(500);
		}
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//Creating a new instace of the Task ;; )
		const newTask = new Task();

		// Add the required properties to the Task Object
		newTask.title = req.body.title;
		newTask.date = req.body.date;
		newTask.description = req.body.description;
		newTask.priority = req.body.priority;
		newTask.status = req.body.status;

		// Add the new task to the database

		let createdTask: Task;
		try {
			createdTask = await AppDataSource.getRepository(Task).save(newTask);

			//Conecrt the task instance to  an object

			createdTask = instanceToPlain(createdTask) as Task;

			return res.json(createdTask).status(201);
		} catch (err) {
			return res.json({ err: 'Internal server Error' }).status(500);
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		let task: Task | null;

		try {
			task = await AppDataSource.getRepository(Task).findOne({
				where: { id: req.body.id },
			});
		} catch (err) {
			return res.json({ err: 'Internal server Error' }).status(500);
		}
		if (!task) {
			return res.status(404).json({ err: 'Task not found' });
		}
		let updatedTask: UpdateResult;

		try {
			updatedTask = await AppDataSource.getRepository(Task).update(
				req.body.id,
				plainToInstance(Task, { status: req.body.status })
			);

			updatedTask = instanceToPlain(updatedTask) as UpdateResult;

			return res.json(updatedTask).status(200);
		} catch (err) {
			return res.json({ err: 'Internal server Error' }).status(500);
		}
	}
}

export const tasksController = new TasksController();
