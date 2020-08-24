-- **************** WARNING ***************** --
-- *** Obviously for dev use ONLY!!!!!!! *** --
DO $$
BEGIN
  CREATE ROLE postgres WITH PASSWORD '';
  EXCEPTION WHEN DUPLICATE_OBJECT THEN
  RAISE NOTICE 'Not creating role postgres -- It already exists';
END
$$;

DO $$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = 'grabbit_prod') THEN
      RAISE NOTICE 'Not creating database grabbit_prod -- It already exists';  -- optional
   ELSE
      PERFORM dblink_exec('grabbit_prod=' || current_database(), 'CREATE DATABASE grabbit_prod');
   END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE grabbit_prod TO postgres;
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
