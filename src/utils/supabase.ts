// src/utils/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error("缺少 Supabase 環境變數，請檢查 .env.local 設定。");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
