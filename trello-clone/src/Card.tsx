import { CardContainer } from "./styles";

type CardProps = {
	text: String;
};

export const Card = ({ text }: CardProps) => (
	<CardContainer>{text}</CardContainer>
);
