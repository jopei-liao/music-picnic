"use client";
import Link from "next/link";
import { clsx } from "clsx";
import styles from "./nav.module.css";
import { Oswald } from "next/font/google";

export const oswaldFont = Oswald({
	subsets: ["latin"],
	weight: "500",
});

import { usePathname } from "next/navigation";
const NAV_ITEMS = [
	{ name: "About", href: "/about" },
	{ name: "Home", href: "/" },
	{ name: "Share", href: "/share" },
] as const;

const Nav = () => {
	const pathname = usePathname();
	return (
		<nav className={`bg-dark-gray ${styles.nav} fixed top-0 left-0 w-full pt-5 md:pt-10 pb-8 z-50 ${oswaldFont.className}`}>
			<div className="flex justify-center gap-4">
				{NAV_ITEMS.map(item => {
					const isActive = pathname === item.href;

					return (
						<Link key={item.href} href={item.href} className={clsx("relative w-15 py-2 rounded-md text-lg text-light-beige text-center", isActive && styles.active)}>
							{item.name}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Nav;
