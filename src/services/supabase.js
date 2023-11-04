import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://amkrkgrexshfpmnanhhv.supabase.co"
// const supabaseKey = process.env.SUPABASE_KEY
console.log(process.env.SUPABASE_ACCESS_KEY);
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFta3JrZ3JleHNoZnBtbmFuaGh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2ODQyODYsImV4cCI6MjAxNDI2MDI4Nn0.s191Sd5P34SUUtVATBMDJl7jK7FmhuaelT3kmPtXNWs"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
