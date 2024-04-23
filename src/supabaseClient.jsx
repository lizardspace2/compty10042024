// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nqzmunvkbmdvsfzhrdmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xem11bnZrYm1kdnNmemhyZG11Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzkwMTI0MCwiZXhwIjoyMDI5NDc3MjQwfQ.BC7Cw0xPhplgOy3IFSP3EIpSjItQd6W-oeeIeQbSoRc';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Please define all required environment variables!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
