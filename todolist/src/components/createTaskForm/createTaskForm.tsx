import React, { FC, ReactElement, useState, useEffect, useContext } from 'react';
import { Box, Stack, Typography, LinearProgress, Button, Alert, AlertTitle } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context/TaskStatusChangedContext/TaskStatusChangedContext';
import { TaskDateField } from './_taskDateField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskSelectField } from './_taskSelectField';
import { TaskTitleField } from './_taskTitleField';

export const CreateTaskForm: FC = (): ReactElement => {
	const [title, setTitle] = useState<string | undefined>(undefined);
	const [description, setDescription] = useState<string | undefined>(undefined);
	const [date, setDate] = useState<Date | null>(new Date());
	const [status, setStatus] = useState<string>(Status.todo);
	const [priority, setPriority] = useState<string>(Priority.normal);
	const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);

	const tasksUpdatedContext = useContext(TaskStatusChangedContext);
	const createTaskMutation = useMutation((data: ICreateTask) =>
		sendApiRequest('http://localhost:3200/tasks', 'POST', data)
	);
	function createTaskHandler() {
		if (!title || !date || !description) {
			return;
		}
		const task: ICreateTask = {
			title,
			description,
			date: date.toString(),
			status,
			priority,
		};
		createTaskMutation.mutate(task);
	}

	useEffect(() => {
		if (createTaskMutation.isSuccess) {
			setShowSuccessAlert(true);
			tasksUpdatedContext.toggle();
		}
		const successTimeout = setTimeout(() => {
			setShowSuccessAlert(false);
		}, 7000);
		return () => {
			clearTimeout(successTimeout);
		};
	}, [createTaskMutation.isSuccess, tasksUpdatedContext]);

	return (
		<Box display='flex' flexDirection='column' alignItems='flex-start' width='100%' px={4} my={6}>
			{showSuccessAlert && (
				<Alert security='success' sx={{ width: '100%', marginBottom: '16px' }}>
					<AlertTitle>Success</AlertTitle>
					The task has been created successfully
				</Alert>
			)}
			<Typography mb={2} component='h2' variant='h6'>
				Create A Task
			</Typography>

			<Stack sx={{ width: '100%' }} spacing={2}>
				<TaskTitleField
					disabled={createTaskMutation.isLoading}
					onChange={e => {
						setTitle(e.target.value);
					}}
				/>
				<TaskDescriptionField
					disabled={createTaskMutation.isLoading}
					onChange={e => {
						setDescription(e.target.value);
					}}
				/>
				<TaskDateField disabled={createTaskMutation.isLoading} value={date} onChange={date => setDate(date)} />

				<Stack sx={{ width: '100%' }} direction='row' spacing={2}>
					<TaskSelectField
						disabled={createTaskMutation.isLoading}
						value={status}
						onChange={e => {
							setStatus(e.target.value as string);
						}}
						label='Status'
						name='status'
						items={[
							{
								value: Status.todo,
								label: Status.todo.toUpperCase(),
							},
							{
								value: Status.inProgress,
								label: Status.inProgress.toUpperCase(),
							},
						]}
					/>
					<TaskSelectField
						disabled={createTaskMutation.isLoading}
						value={priority}
						onChange={e => setPriority(e.target.value as string)}
						label='Priority'
						name='priority'
						items={[
							{
								value: Priority.low,
								label: Priority.low,
							},
							{
								value: Priority.normal,
								label: Priority.normal,
							},
							{
								value: Priority.high,
								label: Priority.high,
							},
						]}
					/>
				</Stack>

				{createTaskMutation.isLoading ?? <LinearProgress />}
				<Button
					disabled={!title || !date || !description || !status || !priority}
					onClick={createTaskHandler}
					variant='contained'
					size='large'>
					Create A Task
				</Button>
			</Stack>
		</Box>
	);
};
