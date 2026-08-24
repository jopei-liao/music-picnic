import Content from "@/modules/share/content";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const Share = async () => {
	await delay(300);
	return (
		<div>
			<Content />
		</div>
	);
};

export default Share;
