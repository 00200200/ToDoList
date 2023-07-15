import React, { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { TextField } from '@mui/material';
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';
export const TaskDateField: FC<IDateField> = (props): ReactElement => {
	const { value = new Date(), onChange = date => console.log(date), disabled = false } = props;
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DesktopDatePicker
					label='Task Date'
					value={value}
					format='dd/MM/yyyy'
					onChange={onChange}
					disabled={disabled}
				/>
			</LocalizationProvider>
		</>
	);
};
TaskDateField.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func,
	value: PropTypes.instanceOf(Date),
};
