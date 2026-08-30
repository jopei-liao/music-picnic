import type { Metadata } from "next";
import Nav from "@/modules/components/nav";
import React, { Suspense } from "react";
import RouteListener from "@/modules/components/RouteListener";
import { LoadingProvider } from "@/context/LoadingContext";
import "./globals.css";

export const metadata: Metadata = {
	title: "Music Picnic With Me!",
	description: "go picnic with playlist",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="h-full antialiased">
			<body className="h-full">
				{/* 全域載入狀態 Provider，包裹所有需要存取 Loading 的元件 */}
				<LoadingProvider>
					<Nav />

					{/* Suspense 保護：避免 useSearchParams 在建置時報錯 */}
					<Suspense fallback={null}>
						<RouteListener>{children}</RouteListener>
					</Suspense>
				</LoadingProvider>
			</body>
		</html>
	);
}
