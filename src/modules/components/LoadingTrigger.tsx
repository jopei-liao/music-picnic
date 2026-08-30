// 當畫面在瀏覽器掛載完成時，觸發 Loading 退場動態
"use client";

import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function LoadingTrigger() {
	const { finishLoading } = useLoading();

	useEffect(() => {
		// 當元件掛載到瀏覽器 DOM 時，通知全域 Context 關閉 Loading
		finishLoading();
	}, [finishLoading]);

	return null; // 不需要渲染任何可見標籤
}
