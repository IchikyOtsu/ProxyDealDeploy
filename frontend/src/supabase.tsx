import {createClient} from "@supabase/supabase-js";

export const supabaseUrl = "https://mvdefukjrtcgfodbqizy.supabase.co/";
export const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12ZGVmdWtqcnRjZ2ZvZGJxaXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEzNDk4NTgsImV4cCI6MjAwNjkyNTg1OH0.SJEQyYuoPXITTbhl_D5UM_Y-O8vfjK0ugxqQqmjncnk";

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
