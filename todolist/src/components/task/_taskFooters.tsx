import React, { FC, ReactElement } from 'react';
import { Switch, Box, FormControlLabel, Button } from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
export const TaskFooter: FC<ITaskFooter> = (props): ReactElement => {
	const { onStatusChange = e => console.log(e), onClick = e => console.log(e) } = props;
	return (
		<Box display='flex' justifyContent='space-between' alignItems='center' mt={4}>
			<FormControlLabel onChange={e => onStatusChange(e)} label='In progress' control={<Switch color='warning' />} />
			<Button onClick={e => onClick(e)} variant='contained' color='success' size='small' sx={{ color: '#ffffff' }}>
				MARK COMPLETE
			</Button>
		</Box>
	);
};
TaskFooter.propTypes = {
	onClick: PropTypes.func,
	onStatusChange: PropTypes.func,
};
