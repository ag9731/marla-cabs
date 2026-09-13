import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Fetching post...");
  const { data, error } = await supabase
    .from('blog_posts')
    .select('content')
    .eq('slug', 'complete-guide-to-outstation-cab-booking-in-bangalore')
    .single();

  if (error) {
    console.error("Error:", error.message);
    return;
  }

  console.log("========== RAW DATABASE CONTENT ==========");
  console.log(data.content);
  console.log("==========================================");
}

main();
