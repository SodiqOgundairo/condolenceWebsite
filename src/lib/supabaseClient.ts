import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gthvdenwfhbvuqbipqxt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aHZkZW53ZmhidnVxYmlwcXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MTE4MTYsImV4cCI6MjA3MTA4NzgxNn0.Q9D1HAZp7kVEWaTmZWQ2heQWZluVH2szw0OhJSn5d0o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
