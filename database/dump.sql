--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_userid_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.checklist DROP CONSTRAINT checklist_pkey;
ALTER TABLE public.users ALTER COLUMN userid DROP DEFAULT;
ALTER TABLE public.checklist ALTER COLUMN checklistitemid DROP DEFAULT;
DROP SEQUENCE public.users_userid_seq;
DROP TABLE public.users;
DROP SEQUENCE public.checklist_checklistitemid_seq;
DROP TABLE public.checklist;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: checklist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checklist (
    userid integer,
    checklistitemid integer NOT NULL,
    checklistitem character varying(255),
    iscompleted boolean
);


--
-- Name: checklist_checklistitemid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.checklist_checklistitemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: checklist_checklistitemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.checklist_checklistitemid_seq OWNED BY public.checklist.checklistitemid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255),
    password character varying(255)
);


--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: checklist checklistitemid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist ALTER COLUMN checklistitemid SET DEFAULT nextval('public.checklist_checklistitemid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: checklist; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.checklist (userid, checklistitemid, checklistitem, iscompleted) FROM stdin;
20	59	Clean up index.js	t
20	63	Testing out the checklist on mobile.	t
22	60	Testing 	t
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (userid, firstname, lastname, email, password) FROM stdin;
19	Blake	Ros	blake.ros@gmail.com	$2b$12$QD5hUmtWRsg/8MOOkdOY8e7K3Ig43AXl3VmXGd5W6m9wYd2.4FdCS
20	Kevin	Akahoshi	kevin.akahoshi@gmail.com	$2b$12$IRnhZx7dpQBUY/cu9LVLQumZUoTNDjGM9p6fC29uGE51MsHMvKBX.
22	Dexter	Akahoshi	dexter.akahoshi@gmail.com	$2b$12$UuKgVm5LI0iM7pRpsNz2LesDYjPWVz/9d8YwfDgHMLzj0ZKgZb93a
23	Sprinna	Akahoshi	sprinna.akahoshi@gmail.com	$2b$12$v9yXCau9RqgTaVwtxuKQVOFAco7bRoDh.Gghcg3BdltY.IZBNKMyy
26	Guest	Account	guest.account@gmail.com	$2b$12$5x8LOHjSfA/NFuc6N55x3.WUyusfXqUeefJ2V/SWTdcXjDIR4Ei5S
\.


--
-- Name: checklist_checklistitemid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.checklist_checklistitemid_seq', 85, true);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_userid_seq', 31, true);


--
-- Name: checklist checklist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_pkey PRIMARY KEY (checklistitemid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: checklist checklist_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checklist
    ADD CONSTRAINT checklist_userid_fkey FOREIGN KEY (userid) REFERENCES public.users(userid);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

