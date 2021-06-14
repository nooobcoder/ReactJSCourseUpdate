import styled from "styled-components/macro";

const Inner = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: ${({ direction }) => direction};
	max-width: 1100px;
	margin: auto;
	width: 100%;
	@media (max-width: 1000px) {
		flex-direction: column;
	}
`;

const Pane = styled.div`
	width: 50%;
	@media (max-width: 1000px) {
		width: 100%;
		padding: 0 45px;
		text-align: center;
	}
`;

const Title = styled.h1`
	font-size: 50px;
	line-height: 1.1;
	margin-bottom: 8px;
	@media (max-width: 600px) {
		font-size: 35px;
	}
`;

const SubTitle = styled.h2`
	font-size: 26px;
	font-weight: normal;
	line-height: normal;
	@media (max-width: 600px) {
		font-size: 18px;
	}
`;

const Image = styled.img`
	max-width: 100%;
	height: auto;
`;

const Item = styled.div`
	display: flex;
	border-bottom: 8px solid #222;
	padding: 50px 5%;
	color: white;
	overflow: hidden;
`;

const Container = styled.div`
	@media (max-width: 1000px) {
		${Item}:last-of-type h2 {
			margin-bottom: 50px;
		}
	}
`;

export { Inner, Pane, Title, SubTitle, Image, Item, Container };
