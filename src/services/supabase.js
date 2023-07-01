import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yuzdessalstocdrisoja.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1emRlc3NhbHN0b2Nkcmlzb2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY3OTcxOTMsImV4cCI6MjAwMjM3MzE5M30.hAFHNwrv2_L98b6k-mYD1WNMqKh2aHlSnohXP8ZBMfc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
