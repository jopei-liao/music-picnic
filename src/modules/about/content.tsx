//  Entry point for the page, used to place the content of each page
import LoadingTrigger from "@/modules/components/LoadingTrigger";
import { Noto_Sans_TC, Roboto } from "next/font/google";

export const notoFont = Noto_Sans_TC({
	subsets: ["latin"],
	weight: ["400", "700"],
});

export const robotoFont = Roboto({
	subsets: ["latin"],
});

const Content = () => {
	return (
		<>
			{/* 當本頁載入與渲染完成時，觸發 Loading 退場 */}
			<LoadingTrigger />
			<div className="about px-5 md:px-10 pt-30 md:pt-40 pb-[15vh] text-center">
				<div className="mb-10">
					<p className={`text-dark-beige text-[.875em] md:text-sm leading-8 ${notoFont.className}`}>
						老實說，做這個網站，純粹是因為我歌荒了！
						<br />
						Music Picnic 是一個極簡的播放清單公佈欄
						<br />
						（其實就是我懶得寫互動功能😜）
						<br />
						這個小天地沒有複雜的社交功能，
						<br className="md:hidden" />
						只有一場純粹的音樂野餐 <br />
						帶上你最私藏的 Spotify 播放清單
						<br />
						（對，目前只有Spotify，因為我是Spotify的訂閱者！）
						<br />
						像帶一盒特製三明治一樣丟進來吧
						<br />
						祝野餐愉快，希望你能在這裡挖到寶！
					</p>
				</div>
				{/* <div>
					<p className={`text-dark-beige text-md md:text-base leading-8 ${robotoFont.className}`}>
						To be completely honest, I built this website purely because I&apos;ve run out of things to listen to!
						<br />
						Music Picnic is a playlist billboard. <br />
						There are no complicated social features here—just a pure, simple musical picnic. <br />
						Bring along your ultimate, secret-stash Spotify playlists <br />
						（yup, because I&apos;m a Spotify subscriber!😜） <br />
						and toss them in like a box of custom-made sandwiches!
						<br />
						Happy picnicking, and I hope you find some hidden gems here!
					</p>
				</div> */}
			</div>
		</>
	);
};
export default Content;
