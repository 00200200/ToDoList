import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Task } from './src/tasks/tasks.entity';
import { tasksRouter } from './src/tasks/tasks.router';
const app: Express = express();
dotenv.config();

const port = process.env.PORT || 3200; // Use port 3200 if PORT environment variable is not set

//Parse request body
app.use(bodyParser.json());

// use cors install types as well

app.use(cors());
// create database connection
export const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DB,
	entities: [Task],
	synchronize: true,
});

AppDataSource.initialize()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
		console.log('Data Source has been initialized!');
	})
	.catch(err => {
		console.log('Data Source failed to initialize!', err);
	});

app.use('/', tasksRouter);
