import styled from "styled-components";
import "./index.css";

/* When we useit for lists, it will be rendered on a dark background, so we’ll need white color for text. When we use it for tasks, we will render it inside the Column component, which already has a light grey background, so we will want the text color to be black. */
type AddItemButtonProps = {
	dark?: boolean; //Optional
};

export const AppContainer = styled.div`
	align-items: flex-start;
	background-color: #7135e9;
	display: flex;
	flex-direction: row;
	height: 100%;
	padding: 20px;
	width: 100;
`;

export const ColumnContainer = styled.div`
	background-color: #ebecf0;
	width: 300px;
	min-height: 40px;
	margin-right: 20px;
	border-radius: 3px;
	padding: 8px 8px;
	flex-grow: 0;
`;

export const ColumnTitle = styled.div`
	padding: 6px 16px 12px;
	font-size: 25px;
	text-align: center;
	background: salmon;
	margin-bottom: 8px;
	font-weight: bold;
	font-family: Work + Sans;
`;

export const CardContainer = styled.div`
	background-color: #fff;
	cursor: pointer;
	margin-bottom: 0.5rem;
	padding: 0.5rem 1rem;
	max-width: 300px;
	border-radius: 3px;
	box-shadow: #091e4240 0px 1px 0px 0px;
`;

export const AddItemButton = styled.button<AddItemButtonProps>`
	background-color: #f3d000;
	border-radius: 3px;
	border: none;
	color: ${(props) => (props.dark ? "#000" : "#fff")};
	cursor: pointer;
	max-width: 300px;
	padding: 10px 12px;
	text-align: left;
	transition: background 85ms ease-in;
	width: 100%;
	&:hover {
		background-color: #ffffff52;
	}
`;

export const NewItemFormContainer = styled.div`
	max-width: 300px;
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: flex-start;
`;

export const NewItemButton = styled.button`
	background-color: #5aac44;
	border-radius: 3px;
	border: none;
	box-shadow: none;
	color: #fff;
	padding: 6px 12px;
	text-align: center;
`;

export const NewItemInput = styled.input`
	border-radius: 3px;
	border: none;
	box-shadow: #091e4240 0px 1px 0px 0px;
	margin-bottom: 0.5rem;
	padding: 0.5rem 1rem;
	width: 100%;
`;
