import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'goravanakollakash@gmail.com',
    password: '@Akash8970'
  });
  
  if (loginError || !session) {
    console.error("Login failed:", loginError);
    return;
  }
  console.log("Logged in!");

  const payload = {
    title: 'Test HTML Mode Script',
    slug: 'test-html-mode-script',
    content: `<h1>Test H1</h1>
<p>This is a paragraph.</p>
<h2>Test H2</h2>
<h3>Test H3</h3>
<h4>Test H4</h4>
<h5>Test H5</h5>
<h6>Test H6</h6>
<strong>Bold</strong>
<em>Italic</em>
<ul>
<li>Item 1</li>
<li>Item 2</li>
</ul>
<a href="https://example.com">Example Link</a>`,
    status: 'published',
    author_id: session.user.id,
    published_at: new Date().toISOString()
  };

  const { data, error } = await supabase.from('blog_posts').insert(payload).select('id');
  
  if (error) {
    console.error("Insert failed:", error);
    return;
  }
  
  console.log("Post inserted successfully!", data);

  // Fetch it back to prove it's still raw HTML
  const { data: post } = await supabase.from('blog_posts').select('content').eq('id', data[0].id).single();
  console.log("Verified database content:", post?.content);
}

run();
