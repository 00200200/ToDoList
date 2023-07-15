import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';

import { TaskArea } from '../../components/taskArea/taskArea';
import { Sidebar } from '../../components/sidebar/sidebar';
export const Dashboard: FC = (): ReactElement => {
	return (
		<Grid container minHeight='100vh'>
			<TaskArea />
			<Sidebar />
		</Grid>
	);
};
