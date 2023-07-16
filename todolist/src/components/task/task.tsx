import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooters';
import { ITask } from './interfaces/ITask';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';
import PropTypes from 'prop-types';
import { renderPriorityBorderColor } from './helpers/renderPriorityBorderColor';
export const Task: FC<ITask> = (props): ReactElement => {
	const {
		title = 'Test Title',
		date = new Date(),
		description = 'Lorem situm ipsum ',
		priority = Priority.normal,
		onStatusChange = e => console.log(e),
		onClick = e => console.log(e),
		status = Status.completed,
	} = props;
	return (
		<Box
			display='flex'
			width='100%'
			justifyContent='flex-start'
			flexDirection='column'
			mb={4}
			p={2}
			sx={{
				width: '100%',
				backgroundColor: 'background.paper',
				border: '1px solid',
				borderRadius: '8px',
				borderColor: renderPriorityBorderColor(priority),
			}}>
			<TaskHeader title={title} date={date} />
			<TaskDescription description={description} />
			<TaskFooter onClick={onClick} onStatusChange={onStatusChange} />
		</Box>
	);
};

Task.propTypes = {
	title: PropTypes.string,
	date: PropTypes.instanceOf(Date),
	description: PropTypes.string,
	onStatusChange: PropTypes.func,
	onClick: PropTypes.func,
	priority: PropTypes.string,
	status: PropTypes.string,
};
