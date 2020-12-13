--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: campaigns; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.campaigns (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    target_user_count jsonb NOT NULL,
    target_time_active jsonb NOT NULL,
    target_user_match jsonb NOT NULL,
    merchant_id integer NOT NULL,
    keywords jsonb NOT NULL,
    activated_by_user_id integer,
    activated_on timestamp with time zone,
    cancelled_by_user_id integer,
    created_by_user_id integer NOT NULL,
    cancelled_on timestamp with time zone,
    is_cancelled integer NOT NULL
);


ALTER TABLE public.campaigns OWNER TO postgres;

--
-- Name: campaigns_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.campaigns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.campaigns_id_seq OWNER TO postgres;

--
-- Name: campaigns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.campaigns_id_seq OWNED BY public.campaigns.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: link_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.link_tokens (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    token character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.link_tokens OWNER TO postgres;

--
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.links (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    public_token character varying(255) NOT NULL,
    institution_name character varying(255) NOT NULL,
    institution_id character varying(255) NOT NULL,
    accounts jsonb NOT NULL,
    link_session_id character varying(255) NOT NULL,
    access_token character varying(255) NOT NULL,
    item_id character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.links OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_id_seq OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: logins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logins (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    ip_address character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.logins OWNER TO postgres;

--
-- Name: logins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logins_id_seq OWNER TO postgres;

--
-- Name: logins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logins_id_seq OWNED BY public.logins.id;


--
-- Name: merchants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.merchants (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    name character varying(255) NOT NULL,
    industry jsonb NOT NULL,
    keywords jsonb NOT NULL
);


ALTER TABLE public.merchants OWNER TO postgres;

--
-- Name: merchants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.merchants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.merchants_id_seq OWNER TO postgres;

--
-- Name: merchants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.merchants_id_seq OWNED BY public.merchants.id;


--
-- Name: merchants_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.merchants_users (
    id integer NOT NULL,
    merchant_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.merchants_users OWNER TO postgres;

--
-- Name: merchants_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.merchants_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.merchants_users_id_seq OWNER TO postgres;

--
-- Name: merchants_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.merchants_users_id_seq OWNED BY public.merchants_users.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    text character varying(255) NOT NULL,
    expiry timestamp with time zone,
    seen integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: plaid_local_linktoken_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plaid_local_linktoken_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plaid_local_linktoken_id_seq OWNER TO postgres;

--
-- Name: plaid_local_linktoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plaid_local_linktoken_id_seq OWNED BY public.link_tokens.id;


--
-- Name: reward_codes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reward_codes (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    code character varying(255) NOT NULL,
    value jsonb NOT NULL,
    is_active integer NOT NULL,
    campaign_id integer NOT NULL,
    created_by_user_id integer NOT NULL
);


ALTER TABLE public.reward_codes OWNER TO postgres;

--
-- Name: reward_codes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reward_codes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reward_codes_id_seq OWNER TO postgres;

--
-- Name: reward_codes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reward_codes_id_seq OWNED BY public.reward_codes.id;


--
-- Name: rewards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rewards (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    code_id integer NOT NULL,
    expiry timestamp with time zone NOT NULL,
    is_active integer NOT NULL,
    qr_code character varying(255),
    campaign_id integer NOT NULL,
    redeemed_at timestamp with time zone,
    owner_user_id integer NOT NULL
);


ALTER TABLE public.rewards OWNER TO postgres;

--
-- Name: rewards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rewards_id_seq OWNER TO postgres;

--
-- Name: rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rewards_id_seq OWNED BY public.rewards.id;


--
-- Name: transaction_tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_tasks (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    did_complete integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.transaction_tasks OWNER TO postgres;

--
-- Name: transaction_tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_tasks_id_seq OWNER TO postgres;

--
-- Name: transaction_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_tasks_id_seq OWNED BY public.transaction_tasks.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    amount double precision NOT NULL,
    account_id character varying(255) NOT NULL,
    category jsonb NOT NULL,
    date timestamp with time zone NOT NULL,
    location jsonb NOT NULL,
    merchant_name character varying(255) NOT NULL,
    payment_channel character varying(255) NOT NULL,
    payment_meta jsonb NOT NULL,
    pending integer NOT NULL,
    transaction_id character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    email character varying(255) NOT NULL,
    name character varying(255),
    username character varying(255) NOT NULL,
    address_line1 character varying(255),
    address_line2 character varying(255),
    phone character varying(255),
    secret character varying(255) NOT NULL,
    salt integer NOT NULL,
    current_session_token character varying(255) NOT NULL,
    user_meta jsonb NOT NULL,
    user_type integer NOT NULL,
    qr_code_url character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: campaigns id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns ALTER COLUMN id SET DEFAULT nextval('public.campaigns_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: link_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.link_tokens ALTER COLUMN id SET DEFAULT nextval('public.plaid_local_linktoken_id_seq'::regclass);


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: logins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins ALTER COLUMN id SET DEFAULT nextval('public.logins_id_seq'::regclass);


--
-- Name: merchants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants ALTER COLUMN id SET DEFAULT nextval('public.merchants_id_seq'::regclass);


--
-- Name: merchants_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants_users ALTER COLUMN id SET DEFAULT nextval('public.merchants_users_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: reward_codes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reward_codes ALTER COLUMN id SET DEFAULT nextval('public.reward_codes_id_seq'::regclass);


--
-- Name: rewards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards ALTER COLUMN id SET DEFAULT nextval('public.rewards_id_seq'::regclass);


--
-- Name: transaction_tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_tasks ALTER COLUMN id SET DEFAULT nextval('public.transaction_tasks_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns (id, created_at, updated_at, deleted_at, name, start_date, end_date, target_user_count, target_time_active, target_user_match, merchant_id, keywords, activated_by_user_id, activated_on, cancelled_by_user_id, created_by_user_id, cancelled_on, is_cancelled) FROM stdin;
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	user	0001_initial	2020-12-06 16:19:21.853704-08
2	user	0002_login_notification	2020-12-06 16:19:21.866081-08
3	user	0003_auto_20201206_0002	2020-12-06 16:19:21.87382-08
4	user	0004_auto_20201206_0004	2020-12-06 16:19:21.8816-08
5	user	0005_auto_20201206_0005	2020-12-06 16:19:21.885678-08
6	plaid_local	0001_initial	2020-12-06 16:19:22.615778-08
7	plaid_local	0002_auto_20201205_0043	2020-12-06 16:19:22.629555-08
8	plaid_local	0003_link_access_token	2020-12-06 16:19:22.633301-08
9	plaid_local	0004_link_item_id	2020-12-06 16:19:22.636411-08
10	plaid_local	0005_link_user	2020-12-06 16:19:22.643224-08
11	plaid_local	0006_transaction_transactiontask	2020-12-06 16:19:22.66158-08
12	merchant	0001_initial	2020-12-06 16:19:23.406032-08
13	merchant	0002_reward_merchant	2020-12-06 16:19:23.411506-08
14	merchant	0003_reward_is_active	2020-12-06 16:19:23.41601-08
15	merchant	0004_reward_user	2020-12-06 16:19:23.425309-08
16	merchant	0005_auto_20201206_0012	2020-12-06 16:19:23.442106-08
17	merchant	0006_auto_20201206_1743	2020-12-06 16:19:23.463621-08
18	merchant	0007_campaign_is_active	2020-12-06 16:19:23.471229-08
19	merchant	0008_auto_20201206_1818	2020-12-06 16:19:23.484-08
20	merchant	0009_remove_reward_merchant	2020-12-06 16:19:23.498928-08
21	merchant	0010_auto_20201206_1913	2020-12-06 16:19:23.512148-08
22	merchant	0011_auto_20201206_1959	2020-12-06 16:19:23.555036-08
23	merchant	0012_reward_redeemed_at	2020-12-06 16:19:23.566573-08
24	merchant	0013_auto_20201206_2006	2020-12-06 16:19:23.586742-08
25	merchant	0014_auto_20201206_2012	2020-12-06 16:19:23.601628-08
26	merchant	0015_auto_20201206_2015	2020-12-06 16:19:23.633544-08
27	merchant	0016_auto_20201207_0019	2020-12-06 16:19:23.720952-08
28	merchant	0017_merchant_users	2020-12-06 16:24:17.252803-08
\.


--
-- Data for Name: link_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.link_tokens (id, created_at, updated_at, deleted_at, token, user_id) FROM stdin;
\.


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.links (id, created_at, updated_at, deleted_at, public_token, institution_name, institution_id, accounts, link_session_id, access_token, item_id, user_id) FROM stdin;
\.


--
-- Data for Name: logins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logins (id, created_at, updated_at, deleted_at, ip_address, user_id) FROM stdin;
1	2020-12-06 16:51:21.340858-08	\N	\N	127.0.0.1	1
\.


--
-- Data for Name: merchants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.merchants (id, created_at, updated_at, deleted_at, name, industry, keywords) FROM stdin;
3	2020-12-06 16:34:07.306478-08	\N	\N	Acme Corporation Inc	"Manufacturing"	["manufacturing", "heavy", "cartoon"]
1	2020-12-06 16:22:42.279634-08	\N	\N	Ava Corporation Inc.	"Retail"	["clothing", "shopping", "retail", "ecommerce"]
\.


--
-- Data for Name: merchants_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.merchants_users (id, merchant_id, user_id) FROM stdin;
1	3	1
2	1	2
3	1	1
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, created_at, updated_at, deleted_at, text, expiry, seen, user_id) FROM stdin;
1	2020-12-06 16:21:33.529396-08	\N	\N	Welcome to Bingo!	\N	0	1
2	2020-12-06 16:35:12.835303-08	\N	\N	Welcome to Bingo!	\N	0	2
\.


--
-- Data for Name: reward_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reward_codes (id, created_at, updated_at, deleted_at, code, value, is_active, campaign_id, created_by_user_id) FROM stdin;
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rewards (id, created_at, updated_at, deleted_at, code_id, expiry, is_active, qr_code, campaign_id, redeemed_at, owner_user_id) FROM stdin;
\.


--
-- Data for Name: transaction_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_tasks (id, created_at, updated_at, deleted_at, did_complete, user_id) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, created_at, updated_at, deleted_at, amount, account_id, category, date, location, merchant_name, payment_channel, payment_meta, pending, transaction_id, user_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, deleted_at, email, name, username, address_line1, address_line2, phone, secret, salt, current_session_token, user_meta, user_type, qr_code_url) FROM stdin;
1	2020-12-06 16:21:33.521762-08	\N	\N	ava@gmail.com	Ava Campo	ava	5916 Bottoms Dairy Rd	Elm City, NC 27822	+1 555-555-5555	fa0fa5b0738a6a033e146de660211331463e56f32852e92d19641bd4a74c4daf	711211	319a80a21e02e87bb4c1d983f01c6097c0de9ddbd329a1a27cfa40b94a959eb8	{}	999	
2	2020-12-06 16:35:12.831301-08	\N	\N	ambie@gmail.com	Ambie Bambi	ambie	1456 Sycamore St.	Los Angeles, CA 90014	+1 555-555-5555	007448330a2330c1e5a8c2622dc598c3f295631fd0f8160bbcc726eada66d39a	340620	9fcaa0635821e7c36c3044f0df5df05a64f4f06f356c563bc4b4cab74126748b	{}	1	
\.


--
-- Name: campaigns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_id_seq', 1, false);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 28, true);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.links_id_seq', 1, false);


--
-- Name: logins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logins_id_seq', 1, true);


--
-- Name: merchants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.merchants_id_seq', 3, true);


--
-- Name: merchants_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.merchants_users_id_seq', 3, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 2, true);


--
-- Name: plaid_local_linktoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plaid_local_linktoken_id_seq', 1, false);


--
-- Name: reward_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reward_codes_id_seq', 1, false);


--
-- Name: rewards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rewards_id_seq', 1, false);


--
-- Name: transaction_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_tasks_id_seq', 1, false);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: logins logins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins
    ADD CONSTRAINT logins_pkey PRIMARY KEY (id);


--
-- Name: merchants merchants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants
    ADD CONSTRAINT merchants_pkey PRIMARY KEY (id);


--
-- Name: merchants_users merchants_users_merchant_id_user_id_ab27f20d_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants_users
    ADD CONSTRAINT merchants_users_merchant_id_user_id_ab27f20d_uniq UNIQUE (merchant_id, user_id);


--
-- Name: merchants_users merchants_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants_users
    ADD CONSTRAINT merchants_users_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: link_tokens plaid_local_linktoken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.link_tokens
    ADD CONSTRAINT plaid_local_linktoken_pkey PRIMARY KEY (id);


--
-- Name: reward_codes reward_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reward_codes
    ADD CONSTRAINT reward_codes_pkey PRIMARY KEY (id);


--
-- Name: rewards rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);


--
-- Name: transaction_tasks transaction_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_tasks
    ADD CONSTRAINT transaction_tasks_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_salt_secret_96d5f43d_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_salt_secret_96d5f43d_uniq UNIQUE (salt, secret);


--
-- Name: campaigns_activated_by_id_e76cf42d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_activated_by_id_e76cf42d ON public.campaigns USING btree (activated_by_user_id);


--
-- Name: campaigns_cancelled_by_user_id_233c75b3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_cancelled_by_user_id_233c75b3 ON public.campaigns USING btree (cancelled_by_user_id);


--
-- Name: campaigns_created_by_user_id_13dc8eb5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_created_by_user_id_13dc8eb5 ON public.campaigns USING btree (created_by_user_id);


--
-- Name: campaigns_merchant_id_4fb89c79; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX campaigns_merchant_id_4fb89c79 ON public.campaigns USING btree (merchant_id);


--
-- Name: links_user_id_b13c4db3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX links_user_id_b13c4db3 ON public.links USING btree (user_id);


--
-- Name: logins_user_id_e09957c4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX logins_user_id_e09957c4 ON public.logins USING btree (user_id);


--
-- Name: merchants_users_merchant_id_dfbd50f7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX merchants_users_merchant_id_dfbd50f7 ON public.merchants_users USING btree (merchant_id);


--
-- Name: merchants_users_user_id_859e8945; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX merchants_users_user_id_859e8945 ON public.merchants_users USING btree (user_id);


--
-- Name: notifications_user_id_468e288d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX notifications_user_id_468e288d ON public.notifications USING btree (user_id);


--
-- Name: plaid_local_linktoken_user_id_5b4f32d5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX plaid_local_linktoken_user_id_5b4f32d5 ON public.link_tokens USING btree (user_id);


--
-- Name: reward_codes_campaign_id_edee5877; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reward_codes_campaign_id_edee5877 ON public.reward_codes USING btree (campaign_id);


--
-- Name: reward_codes_created_by_user_id_bdd2f698; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reward_codes_created_by_user_id_bdd2f698 ON public.reward_codes USING btree (created_by_user_id);


--
-- Name: rewards_campaign_id_b3615d94; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_campaign_id_b3615d94 ON public.rewards USING btree (campaign_id);


--
-- Name: rewards_code_id_8a1c10f4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_code_id_8a1c10f4 ON public.rewards USING btree (code_id);


--
-- Name: rewards_owner_user_id_6866c826; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_owner_user_id_6866c826 ON public.rewards USING btree (owner_user_id);


--
-- Name: transaction_tasks_user_id_bb5079ea; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transaction_tasks_user_id_bb5079ea ON public.transaction_tasks USING btree (user_id);


--
-- Name: transactions_user_id_766cc893; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_user_id_766cc893 ON public.transactions USING btree (user_id);


--
-- Name: users_email_0ea73cca_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_email_0ea73cca_like ON public.users USING btree (email varchar_pattern_ops);


--
-- Name: campaigns campaigns_activated_by_user_id_7a4bf1b9_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_activated_by_user_id_7a4bf1b9_fk_users_id FOREIGN KEY (activated_by_user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns campaigns_cancelled_by_user_id_233c75b3_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_cancelled_by_user_id_233c75b3_fk_users_id FOREIGN KEY (cancelled_by_user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns campaigns_created_by_user_id_13dc8eb5_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_created_by_user_id_13dc8eb5_fk_users_id FOREIGN KEY (created_by_user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: campaigns campaigns_merchant_id_4fb89c79_fk_merchants_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_merchant_id_4fb89c79_fk_merchants_id FOREIGN KEY (merchant_id) REFERENCES public.merchants(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: links links_user_id_b13c4db3_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_user_id_b13c4db3_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: logins logins_user_id_e09957c4_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logins
    ADD CONSTRAINT logins_user_id_e09957c4_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: merchants_users merchants_users_merchant_id_dfbd50f7_fk_merchants_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants_users
    ADD CONSTRAINT merchants_users_merchant_id_dfbd50f7_fk_merchants_id FOREIGN KEY (merchant_id) REFERENCES public.merchants(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: merchants_users merchants_users_user_id_859e8945_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.merchants_users
    ADD CONSTRAINT merchants_users_user_id_859e8945_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: notifications notifications_user_id_468e288d_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_468e288d_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: link_tokens plaid_local_linktoken_user_id_5b4f32d5_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.link_tokens
    ADD CONSTRAINT plaid_local_linktoken_user_id_5b4f32d5_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reward_codes reward_codes_campaign_id_edee5877_fk_campaigns_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reward_codes
    ADD CONSTRAINT reward_codes_campaign_id_edee5877_fk_campaigns_id FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: reward_codes reward_codes_created_by_user_id_bdd2f698_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reward_codes
    ADD CONSTRAINT reward_codes_created_by_user_id_bdd2f698_fk_users_id FOREIGN KEY (created_by_user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: rewards rewards_campaign_id_b3615d94_fk_campaigns_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_campaign_id_b3615d94_fk_campaigns_id FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: rewards rewards_code_id_8a1c10f4_fk_reward_codes_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_code_id_8a1c10f4_fk_reward_codes_id FOREIGN KEY (code_id) REFERENCES public.reward_codes(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: rewards rewards_owner_user_id_6866c826_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_owner_user_id_6866c826_fk_users_id FOREIGN KEY (owner_user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: transaction_tasks transaction_tasks_user_id_bb5079ea_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_tasks
    ADD CONSTRAINT transaction_tasks_user_id_bb5079ea_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: transactions transactions_user_id_766cc893_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_766cc893_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

