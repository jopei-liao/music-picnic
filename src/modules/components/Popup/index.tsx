"use client";

export interface PopupProps {
	isOpen: boolean;
	status: "success" | "error";
	message: string;
	onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, status, message, onClose }) => {
	if (!isOpen) return null;

	const isSuccess = status === "success";

	return (
		<div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60  backdrop-blur-sm animate-fade-in" onClick={onClose}>
			{/* 彈窗卡片本體 */}
			<div className="w-full max-w-xs rounded-xl bg-dark-gray p-6 text-center text-light-beige border border-light-beige/20 shadow-2xl animate-fade-up" onClick={e => e.stopPropagation()}>
				{/* 圖示區域 */}
				<div className="mb-4 flex justify-center">
					{isSuccess ? (
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-2xl">✓</div>
					) : (
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-2xl">✕</div>
					)}
				</div>

				{/* 標題 */}
				<h3 className="mb-2 text-xl font-bold">{isSuccess ? "登愣！" : "逼逼！"}</h3>

				{/* 提示訊息 */}
				<p className="mb-6 text-sm text-light-beige/70 leading-relaxed">{message}</p>

				{/* 關閉按鈕 */}
				<button
					onClick={onClose}
					className={`w-full cursor-pointer rounded-lg px-4 py-3 font-bold transition-all duration-200 active:scale-[0.98] ${
						isSuccess ? "bg-light-beige text-dark-gray hover:bg-dark-beige hover:text-light-beige" : "bg-rose-500 text-white hover:bg-rose-600"
					}`}
				>
					{isSuccess ? "太棒了" : "我知道了"}
				</button>
			</div>
		</div>
	);
};
export default Popup;
