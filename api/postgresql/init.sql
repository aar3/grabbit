-- **************** WARNING ***************** --
-- *** Obviously for dev use ONLY!!!!!!! *** --
DO $$
BEGIN
  CREATE ROLE postgres WITH PASSWORD 'password';
  EXCEPTION WHEN DUPLICATE_OBJECT THEN
  RAISE NOTICE 'not creating role postgres -- it already exists';
END
$$;

DO $$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = 'css') THEN
      RAISE NOTICE 'Database already exists';  -- optional
   ELSE
      PERFORM dblink_exec('css=' || current_database(), 'CREATE DATABASE mydb');
   END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE css TO postgres;
--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;
