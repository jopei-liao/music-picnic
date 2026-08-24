// modules/components/RouteListener.tsx
"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loading from "./loading/";

interface RouteListenerProps {
	children: React.ReactNode;
}

export default function RouteListener({ children }: RouteListenerProps) {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// First loading or pathname change done
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3500);
		return () => clearTimeout(timer);
	}, [pathname, searchParams]);

	// Listen for subsequent client-side navigation clicks
	useEffect(() => {
		const handleAnchorClick = (event: MouseEvent) => {
			// 斷言 event.target 為 HTMLElement，以便使用 closest 方法
			const target = (event.target as HTMLElement).closest("a");
			if (!target) return;

			const href = target.getAttribute("href");
			const targetAttr = target.getAttribute("target");

			// 排除外部連結、新分頁、同頁錨點（#）
			if (!href || href.startsWith("http") || href.startsWith("#") || targetAttr === "_blank") {
				return;
			}

			// 如果點擊的是目前所在的路由，就不重複跑 Loading
			if (href === window.location.pathname) return;

			// 點擊有效連結時，再次開啟 Loading
			setIsLoading(true);
		};

		document.addEventListener("click", handleAnchorClick);
		return () => document.removeEventListener("click", handleAnchorClick);
	}, []);

	return (
		<>
			{isLoading && <Loading />}

			<div className={`min-h-screen px-4 flex items-center justify-center transition-opacity duration-150 ease-[ease]`}>{children}</div>
		</>
	);
}
