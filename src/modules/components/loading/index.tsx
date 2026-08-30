import styles from "./loading.module.css";

interface LoadingProps {
	isExiting?: boolean; // 代表 isExiting 是可選的布林值 (true 或 false)
}
const Loading = ({ isExiting }: LoadingProps) => {
	return (
		<div className={`loading fixed w-full h-full z-99999 ${isExiting ? styles.fade : ""}`}>
			<div className={`relative w-full h-full ${styles.box}`}></div>
		</div>
	);
};
export default Loading;
