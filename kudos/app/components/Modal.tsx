import { useNavigate } from "@remix-run/react";
import { Portal } from "~/components/Portal";

interface props {
	children: React.ReactNode;
	isOpen: boolean;
	ariaLabel?: string;
	className?: string;
}

const Modal: React.FC<props> = ({ children, isOpen, ariaLabel, className }) => {
	const navigate = useNavigate();
	if (!isOpen) return null;

	return (
		<Portal wrapperId="modal">
			<div
				className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80 shadow-xl"
				aria-labelledby={ariaLabel ?? "modal-title"}
				role="dialog"
				aria-modal="true"
				onClick={() => navigate("/home")}
			></div>
			<div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scroll">
				<div
					className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl`}
				>
					{children}
				</div>
			</div>
		</Portal>
	);
};

export { Modal };
