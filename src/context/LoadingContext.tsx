"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import Loading from "@/modules/components/loading";

type LoadingStatus = "loading" | "exiting" | "hidden";

interface LoadingContextType {
	loadingStatus: LoadingStatus;
	startLoading: () => void;
	finishLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 設定全域最短顯示時間（毫秒）：4 秒
const MIN_LOADING_TIME = 4000;
// 設定退場動畫持續時間（毫秒）：2.5 秒
const EXIT_ANIMATION_TIME = 2500;

export function LoadingProvider({ children }: { children: React.ReactNode }) {
	const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>("loading");

	// 始值設定為純數值 0，避免在元件渲染本體中直接呼叫 Date.now()
	const startTimeRef = useRef<number>(0);

	const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
	const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

	// 清除計時器的共用函式
	const clearTimers = useCallback(() => {
		if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
		if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
	}, []);

	// 1. 在元件初次載入 (Mount) 時記錄起跑時間
	useEffect(() => {
		startTimeRef.current = Date.now();
	}, []);

	// 2. 開啟 Loading 動畫（在事件回呼中安全更新時間）
	const startLoading = useCallback(() => {
		clearTimers();
		startTimeRef.current = Date.now(); // ✅ 在回呼函式內更新時間，符合純函式規範
		setLoadingStatus("loading");
	}, [clearTimers]);

	// 3. 結束 Loading 動畫（保證至少維持 4 秒）
	const finishLoading = useCallback(() => {
		clearTimers();

		// 如果 startTimeRef 尚未被記錄（例如極端邊界情況），以 Date.now() 為基準
		const startTime = startTimeRef.current || Date.now();
		const elapsedTime = Date.now() - startTime;
		const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

		delayTimerRef.current = setTimeout(() => {
			setLoadingStatus("exiting"); // 套用 .fade class

			exitTimerRef.current = setTimeout(() => {
				setLoadingStatus("hidden");
			}, EXIT_ANIMATION_TIME);
		}, remainingTime);
	}, [clearTimers]);

	return (
		<LoadingContext.Provider value={{ loadingStatus, startLoading, finishLoading }}>
			{loadingStatus !== "hidden" && <Loading isExiting={loadingStatus === "exiting"} />}
			{children}
		</LoadingContext.Provider>
	);
}

// 供其他元件呼叫的 Hook
export function useLoading() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error("useLoading 必須在 LoadingProvider 內部使用");
	}
	return context;
}
