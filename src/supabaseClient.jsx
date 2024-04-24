// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iholojdqmdamozagajwk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlob2xvamRxbWRhbW96YWdhandrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDQ4ODYsImV4cCI6MjAyOTM4MDg4Nn0.LkAy0UWpJiCJ9LS6jnzSYSobzajhgyDAkgoEUq5t-_4';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Please define all required environment variables!');
}

  export const supabase = createClient(supabaseUrl, supabaseAnonKey);