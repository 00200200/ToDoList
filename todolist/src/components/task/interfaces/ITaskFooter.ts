import React from 'react';

export interface ITaskFooter {
	onStatusChange?: (e: React.ChangeEvent<EventTarget>) => void;
	onClick?: (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => void;
}
