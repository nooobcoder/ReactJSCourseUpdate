import { CardContainer } from "./styles";

type CardProps = {
	text: string;
	id: string;
};

export const Card = ({ text }: CardProps) => (
	<CardContainer>{text}</CardContainer>
);
