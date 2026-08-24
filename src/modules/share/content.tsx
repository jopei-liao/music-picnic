"use client";
import { useState } from "react";
import Popup from "@/modules/components/Popup";
import { generateNumericId } from "@/app/utils/id"; // <-- 引入共用函式

//  Entry point for the page, used to place the content of each page
const Content = () => {
	// 定義輸入框的狀態 (TypeScript 會自動推導 url 為 string 型別)
	const [url, setUrl] = useState<string>("");
	// 新增一個狀態來儲存錯誤訊息，預設為空字串
	const [errorMessage, setErrorMessage] = useState("");
	// 控制 Popup 的狀態
	const [popupState, setPopupState] = useState({
		isOpen: false,
		status: "success" as "success" | "error", // 加上 as 確保 status 不會被誤認為一般的 string
		message: "",
	});

	const handleClosePopup = () => {
		setPopupState(prev => ({ ...prev, isOpen: false }));
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Spotify Regex 解析驗證
		const spotifyRegex = /spotify\.com\/playlist\/([a-zA-Z0-9]{22})/;
		const match = url.match(spotifyRegex);

		if (!match) {
			setErrorMessage("請輸入有效的 Spotify 播放清單連結！");
			// 觸發失敗 Popup
			setPopupState({
				isOpen: true,
				status: "error",
				message: "格式不對唷，請確認連結為Spotify歌單",
			});
			return;
		}

		// 3. 驗證成功，擷取 ID
		const playlistId = match[1];

		// 4. 模擬組裝我們要存進資料庫的資料物件
		const newPlaylistData = {
			id: generateNumericId(), // 產生隨機 ID
			playlistId: playlistId,
			rawUrl: url,
			createdAt: new Date().toISOString(),
		};

		console.log("🎉 成功擷取歌單資料，準備寫入：", newPlaylistData);

		// 5. 清除輸入框與錯誤訊息，並跳出成功 Popup
		setErrorMessage("");
		setUrl("");
		setPopupState({
			isOpen: true,
			status: "success",
			message: "感謝你的分享！",
		});
	};
	return (
		<>
			<h1 className="text-light-beige text-3xl md:text-4xl font-bold text-center mb-2 leading-12">
				送出你的私藏歌單，
				<br />
				救救那些鬧歌荒的人吧！
			</h1>
			<p className="text-dark-beige text-[.875em] md:text-base leading-8 text-center mb-15">（但是目前只支援Spotify喔）</p>
			<form onSubmit={handleSubmit} className="space-y-6 size-[90%] md:size-[50%] min-w-xs max-w-md mx-auto">
				<div className="space-y-2">
					<input
						id="spotify-url"
						placeholder="這邊貼上！"
						type="text"
						value={url}
						onChange={e => {
							setUrl(e.target.value);
							// 當使用者重新打字時，自動把錯誤訊息洗掉
							if (errorMessage) setErrorMessage("");
						}}
						className={`w-full rounded-lg px-4 py-3 mb-1 text-[.875em] md:text-base text-light-beige placeholder-light-beige/30 focus:outline-none transition-all duration-200 border ${
							errorMessage
								? "border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
								: "border-light-beige/30 focus:border-light-beige focus:ring-1 focus:ring-light-beige"
						}`}
					/>
					{errorMessage && <p className="text-[.875em] font-medium text-rose-400 mt-1 animate-fade-in">⚠️ {errorMessage}</p>}
				</div>

				<button
					type="submit"
					className="w-full cursor-pointer rounded-lg bg-light-beige px-4 py-3 font-bold text-[.875em] md:text-base text-dark-gray hover:bg-dark-beige hover:text-light-beige active:scale-[0.98] transition-all duration-200 shadow-lg"
				>
					送出
				</button>
			</form>
			<Popup isOpen={popupState.isOpen} status={popupState.status} message={popupState.message} onClose={handleClosePopup} />
		</>
	);
};
export default Content;
