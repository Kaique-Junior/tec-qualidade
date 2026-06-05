import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://pwdmcdtjtnrnvidkfvsq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZG1jZHRqdG5ybnZpZGtmdnNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTA2MDIsImV4cCI6MjA5NjE2NjYwMn0.jq5j27yGZP6AvjZyVs61SptmZs68ou4Pl1pbfFGyFkI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);