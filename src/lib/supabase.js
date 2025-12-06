import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cklssxbykzlglfhedcxv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbHNzeGJ5a3psZ2xmaGVkY3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzE4NzQsImV4cCI6MjA4MDU0Nzg3NH0.b6nx1ZLoRhER3BHHEEjjiR6W4FXTvB5yOqrM7AcPKgI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
