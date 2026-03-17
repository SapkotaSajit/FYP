-- ============================================================
-- Supabase Migration Script for SD Enterprises FYP Project
-- Run this entire script in the Supabase SQL Editor
-- ============================================================
-- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- 2. Users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255),
    refresh_token TEXT,
    role_id INTEGER DEFAULT 2,
    reset_code INTEGER
);
-- 3. Contact
CREATE TABLE IF NOT EXISTS contact (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    phone VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- 4. Services (self-referencing)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    service_image VARCHAR(255),
    parent_id INTEGER REFERENCES services(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);
-- 5. Guides
CREATE TABLE IF NOT EXISTS guides (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);
-- 6. Guide Types
CREATE TABLE IF NOT EXISTS guide_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    "guideTypes_image" VARCHAR(255),
    guide_id INTEGER REFERENCES guides(id) ON DELETE RESTRICT ON UPDATE CASCADE
);
-- 7. Guide Steps
CREATE TABLE IF NOT EXISTS guide_steps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "guideTypes_id" INTEGER NOT NULL REFERENCES guide_types(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "guideSteps_image" VARCHAR(255)
);
-- 8. Bookings
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    service_id BIGINT NOT NULL REFERENCES services(id),
    booking_time VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    status BOOLEAN DEFAULT FALSE
);
-- 9. Booking Assigns
CREATE TABLE IF NOT EXISTS booking_assigns (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    booking_id INTEGER NOT NULL REFERENCES bookings(id),
    status VARCHAR(20) DEFAULT 'Pending' CHECK (
        status IN ('Pending', 'Accept', 'Reject', 'Completed')
    )
);
-- ============================================================
-- Seed: Default Roles
-- ============================================================
INSERT INTO roles (id, name, description)
VALUES (1, 'Admin', 'Administrator with full access'),
    (2, 'User', 'Standard user'),
    (3, 'Staff', 'Staff member') ON CONFLICT (id) DO NOTHING;