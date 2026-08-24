import styles from "./loading.module.css";

const Loading = () => {
	return (
		<div className="loading fixed w-full h-full z-99999">
			<div className={`relative w-full h-full ${styles.box}`}></div>
		</div>
	);
};
export default Loading;
