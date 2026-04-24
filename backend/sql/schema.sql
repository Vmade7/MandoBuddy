-- users 用户表
create table if not exists public.users (
    id uuid primary key,
    email text unique not null,
    password_hash text not null,
    display_name text not null,
    created_at timestamptz not null default now()
);

-- progress 学习进度表（每个用户一条）
create table if not exists public.progress (
    user_id uuid primary key references public.users(id) on delete cascade,
    level int not null default 1,
    lesson_completed int not null default 0,
    xp int not null default 0,
    updated_at timestamptz not null default now()
);

-- pronunciation_logs 发音评测记录表
create table if not exists public.pronunciation_logs (
    id bigint generated always as identity primary key,
    user_id uuid not null references public.users(id) on delete cascade,
    filename text,
    pitch_score numeric(5,2) not null,
    clarity_score numeric(5,2) not null,
    duration_score numeric(5,2) not null,
    total_score numeric(5,2) not null,
    feedback jsonb not null,
    created_at timestamptz not null default now()
);

create index if not exists idx_pronunciation_logs_user_id on public.pronunciation_logs(user_id);
create index if not exists idx_pronunciation_logs_created_at on public.pronunciation_logs(created_at desc);
