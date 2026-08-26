// src/utils/id.ts

/**
 * 產生純數字的唯一識別碼 (UID)
 * 結合當前時間戳記與自訂位數的隨機數字，防止 ID 重複。
 *
 * @param randomDigits 隨機數字的長度（預設為 4 位）
 * @returns 純數字組成的字串 ID
 */
export function generateNumericId(randomDigits: number = 4): string {
	// 1. 取得當前時間戳記 (例如: 1771965029123)
	const timestamp = Date.now().toString();

	// 2. 產生指定位數的隨機數
	const max = Math.pow(10, randomDigits);
	const randomNum = Math.floor(Math.random() * max);

	// 3. 補齊前導零（例如 5 -> "0005"）
	const paddedRandom = randomNum.toString().padStart(randomDigits, "0");

	// 4. 合併並回傳字串格式
	return `${timestamp}${paddedRandom}`;
}
