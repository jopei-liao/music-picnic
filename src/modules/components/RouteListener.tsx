"use client";

import React, { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

interface RouteListenerProps {
	children: React.ReactNode;
}

export default function RouteListener({ children }: RouteListenerProps) {
	const { startLoading } = useLoading();

	useEffect(() => {
		const handleAnchorClick = (event: MouseEvent) => {
			const target = (event.target as HTMLElement).closest("a");
			if (!target) return;

			const href = target.getAttribute("href");
			const targetAttr = target.getAttribute("target");

			// 排除外部連結、新分頁、同頁錨點（#）
			if (!href || href.startsWith("http") || href.startsWith("#") || targetAttr === "_blank") {
				return;
			}

			// 點擊當前相同頁面不重複觸發
			if (href === window.location.pathname) return;

			// 點擊有效連結時啟動 Loading
			startLoading();
		};

		document.addEventListener("click", handleAnchorClick);
		return () => document.removeEventListener("click", handleAnchorClick);
	}, [startLoading]);

	return <div className="min-h-screen px-4 flex items-center justify-center transition-opacity duration-150">{children}</div>;
}
