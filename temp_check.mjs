import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split(/\r?\n/);
let supabaseUrl = '';
let supabaseKey = '';
for (const line of lines) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) supabaseKey = line.split('=')[1].trim();
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('content')
    .eq('slug', 'complete-guide-to-outstation-cab-booking-in-bangalore')
    .single();

  if (error) {
    console.error('Error fetching:', error);
    return;
  }

  console.log('--- RAW DB VALUE ---');
  console.log(data.content);
  console.log('--- END RAW DB VALUE ---');
}

check();
