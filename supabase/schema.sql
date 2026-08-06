-- Supabase schema (Supabase-only app mode)
-- Creates:
-- - public.products
-- - public.categories
-- - public.product_categories
-- plus required RLS policies for `anon` read access.

-- 1) Products
create table if not exists public.products (
  id text primary key,
  name text not null,
  description text not null,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_image_url_nonempty check (length(trim(image_url)) > 0)
);

-- 2) Categories
create table if not exists public.categories (
  slug text primary key,
  name text not null,
  tagline text not null,
  description text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) Join table: product <-> category
create table if not exists public.product_categories (
  product_id text not null references public.products(id) on delete cascade,
  category_slug text not null references public.categories(slug) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (product_id, category_slug)
);

-- Useful indexes
create index if not exists products_sort_order_idx on public.products(sort_order);
create index if not exists categories_sort_order_idx on public.categories(sort_order);
create index if not exists product_categories_product_id_idx on public.product_categories(product_id);
create index if not exists product_categories_category_slug_idx on public.product_categories(category_slug);

-- 4) RLS (read-only for anon)
alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.product_categories enable row level security;

-- Allow public read for the catalog tables.
-- If your Supabase project uses different role names, adjust `to anon` accordingly.
create policy "public_select_products"
  on public.products
  for select
  to anon
  using (true);

create policy "public_select_categories"
  on public.categories
  for select
  to anon
  using (true);

create policy "public_select_product_categories"
  on public.product_categories
  for select
  to anon
  using (true);

-- Optional: updated_at trigger (recommended)
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

