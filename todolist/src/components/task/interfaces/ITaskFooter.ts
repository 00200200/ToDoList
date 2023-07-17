import React from 'react';

export interface ITaskFooter {
	id: string;
	status?: string;
	onStatusChange?: (e: React.ChangeEvent<EventTarget>) => void;
	onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void;
}
