import type { Metadata } from "next";
import Nav from "@/modules/components/nav";
import React, { Suspense } from "react";
import RouteListener from "@/modules/components/RouteListener";
import "./globals.css";

export const metadata: Metadata = {
	title: "Music Picnic With Me!",
	description: "go picnic with playlist",
};

// 定義 Layout Props 型別
interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className="h-full antialiased">
			{/* Place the content into children according to the URL path */}
			<body className="h-full">
				<Nav />
				<Suspense fallback={null}>
					<RouteListener>{children}</RouteListener>
				</Suspense>
			</body>
		</html>
	);
}
