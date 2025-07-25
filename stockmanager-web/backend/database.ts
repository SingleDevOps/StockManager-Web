import { createClient } from '@supabase/supabase-js'
import {SUPABASE_API_KEY, SUPABASE_URL} from './API_Secret';
// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);
