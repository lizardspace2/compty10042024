// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bscoegkiicgugshmmjbj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzY29lZ2tpaWNndWdzaG1tamJqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ1MzUyMywiZXhwIjoyMDc2MDI5NTIzfQ.fBR4UHGuOa5YHN9VefuH2TJNoMbroI7xJVa7LYj1NgQ';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Please define all required environment variables!');
}

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);