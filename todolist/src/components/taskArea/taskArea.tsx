import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { Box, Grid, Alert, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context/TaskStatusChangedContext/TaskStatusChangedContext';
export const TaskArea: FC = (): ReactElement => {
	const tasksUpdatedContext = useContext(TaskStatusChangedContext);

	const { error, isLoading, data, refetch } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			return await sendApiRequest<ITaskApi[]>(
				'https://bqpsiv1pvy6hbshchp36-mysql.services.clever-cloud.com/tasks',
				'GET'
			);
		},
	});

	//update task mutattion

	const updateTaskMutation = useMutation((data: IUpdateTask) =>
		// that should be hidden i now for example in file process.env
		sendApiRequest(`https://bqpsiv1pvy6hbshchp36-mysql.services.clever-cloud.com/tasks`, 'PUT', data)
	);

	useEffect(() => {
		refetch();
	}, [tasksUpdatedContext.updated, refetch]);

	useEffect(() => {
		if (updateTaskMutation.isSuccess) {
			tasksUpdatedContext.toggle();
		}
	}, [updateTaskMutation.isSuccess, tasksUpdatedContext]);
	function onStatusChangeHandler(e: React.ChangeEvent<HTMLInputElement>, id: string) {
		updateTaskMutation.mutate({ id, status: e.target.checked ? Status.inProgress : Status.todo });
	}

	function markCompleteHandler(
		e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,
		id: string
	) {
		updateTaskMutation.mutate({ id, status: Status.completed });
	}
	return (
		<Grid item md={8} px={4}>
			<Box mb={8} px={4}>
				<h2>Status Of Your Tasks As On {format(new Date(), 'PPP')}</h2>
			</Box>
			<Grid container display='flex' justifyContent='center'>
				<Grid
					item
					display='flex'
					flexDirection='row'
					justifyContent='space-around'
					alignItems='center'
					md={10}
					xs={12}
					mb={8}>
					<TaskCounter count={data ? countTasks(data, Status.todo) : undefined} status={Status.todo} />
					<TaskCounter count={data ? countTasks(data, Status.inProgress) : undefined} status={Status.inProgress} />
					<TaskCounter count={data ? countTasks(data, Status.completed) : undefined} status={Status.completed} />
				</Grid>
				<Grid item display='flex' flexDirection='column' xs={10} md={8}>
					<>
						{error && <Alert severity='error'>Error fetching tasks</Alert>}
						{!error && Array.isArray(data) && data.length === 0 && (
							<Alert severity='warning'>You do not have any tasks created yet</Alert>
						)}
						{isLoading ? (
							<LinearProgress />
						) : (
							Array.isArray(data) &&
							data.length > 0 &&
							data.map((each, index) => {
								return each.status === Status.todo || each.status === Status.inProgress ? (
									<Task
										key={index + each.priority}
										id={each.id}
										title={each.title}
										date={new Date(each.date)}
										description={each.description}
										priority={each.priority}
										status={each.status}
										onStatusChange={onStatusChangeHandler}
										onClick={markCompleteHandler}
									/>
								) : (
									false
								);
							})
						)}
					</>
				</Grid>
			</Grid>
		</Grid>
	);
};
