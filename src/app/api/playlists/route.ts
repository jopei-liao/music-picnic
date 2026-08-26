import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

// 1. GET: 讀取所有歌單
export async function GET() {
	try {
		const { data, error } = await supabase.from("playlists").select("*").order("created_at", { ascending: false });

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ playlists: data }, { status: 200 });
	} catch {
		return NextResponse.json({ error: "伺服器內部錯誤，無法讀取資料" }, { status: 500 });
	}
}

// 2. POST: 檢查重複並新增歌單
export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { id, playlistId, rawUrl } = body;

		// 步驟 A: 基本欄位驗證
		if (!id || !playlistId || !rawUrl) {
			return NextResponse.json({ error: "缺少必要的歌單資訊" }, { status: 400 });
		}

		// 步驟 B: 檢查資料庫是否已存在此 playlist_id
		const { data: existingPlaylist, error: checkError } = await supabase.from("playlists").select("id").eq("playlist_id", playlistId).maybeSingle(); // maybeSingle 會回傳單筆物件或 null，不會因找不到資料而拋出例外

		if (checkError) {
			return NextResponse.json({ error: checkError.message }, { status: 500 });
		}

		// 步驟 C: 若已存在，回傳 409 Conflict 錯誤
		if (existingPlaylist) {
			return NextResponse.json({ error: "這首播放清單已經有人分享過囉！" }, { status: 409 });
		}

		// 步驟 D: 若不存在，正常寫入資料庫
		const { data, error: insertError } = await supabase
			.from("playlists")
			.insert([
				{
					id: id,
					playlist_id: playlistId,
					raw_url: rawUrl,
				},
			])
			.select();

		if (insertError) {
			return NextResponse.json({ error: insertError.message }, { status: 500 });
		}

		return NextResponse.json({ message: "歌單分享成功！", playlist: data[0] }, { status: 201 });
	} catch {
		return NextResponse.json({ error: "伺服器處理請求失敗" }, { status: 500 });
	}
}
