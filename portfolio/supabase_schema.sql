-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text, -- Will store the icon name (Server, Zap, Users) or actual URL
  tech_stack text[],
  live_url text,
  github_url text,
  order_index int default 0,
  status text -- Active, Ongoing, etc.
);

-- Enable RLS
alter table public.projects enable row level security;

-- Allow public read access
create policy "Allow public read access"
  on public.projects
  for select
  to public
  using (true);

-- Insert initial data (from CurrentWorkSection.tsx)
insert into public.projects (title, description, image_url, status, order_index)
values
  ('Aztec Node', 'Running validator node on Aztec''s privacy-first L2', 'Server', 'Active', 1),
  ('Validator Operations', 'Maintaining infrastructure across multiple networks', 'Zap', 'Ongoing', 2),
  ('Community Building', 'Growing Manta Network''s global & Indonesia communities', 'Users', 'Active', 3);
