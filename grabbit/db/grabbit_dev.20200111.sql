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
-- Name: deals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deals (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    title character varying(255) NOT NULL,
    original_value character varying(255) NOT NULL,
    current_value character varying(255) NOT NULL,
    merchant_name character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    img_url character varying(255) NOT NULL,
    description text,
    uid character varying(255) NOT NULL,
    all_img_urls jsonb NOT NULL,
    scraper character varying(255) NOT NULL
);


ALTER TABLE public.deals OWNER TO postgres;

--
-- Name: deals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.deals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.deals_id_seq OWNER TO postgres;

--
-- Name: deals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.deals_id_seq OWNED BY public.deals.id;


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
    user_id integer NOT NULL,
    active integer NOT NULL
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
    user_id integer NOT NULL,
    user_agent character varying(255)
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
    keywords jsonb NOT NULL,
    alternative_name character varying(255),
    image_url character varying(255),
    invitation_code character varying(255),
    primary_color character varying(255) NOT NULL
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
    user_id integer NOT NULL,
    icon character varying(255) NOT NULL,
    seen_at timestamp without time zone,
    route_key character varying(255),
    metadata jsonb NOT NULL,
    title character varying(255) NOT NULL
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
    created_by_user_id integer NOT NULL,
    description text
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
    qr_code_url character varying(255),
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
-- Name: scraper_stats; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.scraper_stats (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    metadata jsonb NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.scraper_stats OWNER TO postgres;

--
-- Name: scraper_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.scraper_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scraper_stats_id_seq OWNER TO postgres;

--
-- Name: scraper_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.scraper_stats_id_seq OWNED BY public.scraper_stats.id;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.settings (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    keywords jsonb NOT NULL,
    user_id integer NOT NULL,
    targeting_enabled integer NOT NULL
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.settings_id_seq OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.settings_id_seq OWNED BY public.settings.id;


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
-- Name: user_deals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_deals (
    id integer NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    deal_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.user_deals OWNER TO postgres;

--
-- Name: user_deals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_deals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_deals_id_seq OWNER TO postgres;

--
-- Name: user_deals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_deals_id_seq OWNED BY public.user_deals.id;


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
    phone character varying(255),
    secret character varying(255) NOT NULL,
    salt integer NOT NULL,
    current_session_token character varying(255) NOT NULL,
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
-- Name: deals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals ALTER COLUMN id SET DEFAULT nextval('public.deals_id_seq'::regclass);


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
-- Name: scraper_stats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scraper_stats ALTER COLUMN id SET DEFAULT nextval('public.scraper_stats_id_seq'::regclass);


--
-- Name: settings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings ALTER COLUMN id SET DEFAULT nextval('public.settings_id_seq'::regclass);


--
-- Name: transaction_tasks id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_tasks ALTER COLUMN id SET DEFAULT nextval('public.transaction_tasks_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: user_deals id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_deals ALTER COLUMN id SET DEFAULT nextval('public.user_deals_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: campaigns; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.campaigns (id, created_at, updated_at, deleted_at, name, start_date, end_date, target_user_count, target_time_active, target_user_match, merchant_id, keywords, activated_by_user_id, activated_on, cancelled_by_user_id, created_by_user_id, cancelled_on, is_cancelled) FROM stdin;
1	2020-12-13 14:18:46.301163-08	\N	\N	Another Target XYZ	2020-11-09 16:00:00-08	2021-02-06 16:00:00-08	{"max": 1000, "min": 100}	{"max": 14, "min": 7}	{"max": 0.9, "min": 0.1}	1	["fruit", "cereal", "breakfast"]	\N	\N	\N	1	\N	0
2	2020-12-13 14:19:11.775556-08	\N	\N	Another Target ABC	2020-12-09 16:00:00-08	2021-03-06 16:00:00-08	{"max": 10000, "min": 10}	{"max": 14, "min": 7}	{"max": 0.9, "min": 0.1}	1	["screws", "bolts", "nuts"]	\N	\N	\N	1	\N	0
3	2020-12-28 15:43:12.205545-08	\N	\N	12/12/2020 - Offsite Branding Experiment - H.v2	2021-01-19 16:00:00-08	2021-03-19 17:00:00-07	100000	30	0.6	3	["nike", "sports", "experiment", "campaign", "athliesure", "corporate"]	\N	\N	\N	3	\N	0
4	2020-12-28 15:59:05.229501-08	\N	\N	12/12/2020 - Offsite Branding Experiment - H.v2	2021-01-19 16:00:00-08	2021-03-19 17:00:00-07	100000	30	0.6	3	["nike", "sports", "experiment", "campaign", "athliesure", "corporate"]	\N	\N	\N	3	\N	0
5	2020-12-28 16:02:16.258435-08	\N	\N	Bucket Test - Summer Group - Branding	2021-01-19 16:00:00-08	2021-03-19 17:00:00-07	100000	30	0.6	5	["supreme", "leisure", "experiment", "campaign", "streetwear", "bottoms"]	\N	\N	\N	3	\N	0
\.


--
-- Data for Name: deals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deals (id, created_at, updated_at, deleted_at, title, original_value, current_value, merchant_name, url, img_url, description, uid, all_img_urls, scraper) FROM stdin;
122	2021-01-09 17:08:07.267683-08	\N	\N	Powerbeats Pro True Wireless In-Ear Earphones 	249.99	169.99	Target	https://www.target.com/p/powerbeats-pro-true-wireless-in-ear-earphones/-/A-78362035?preselect=54610898#lnk=sametab	https://target.scene7.com/is/image/Target/GUEST_b3bbe8f0-e28e-4796-b7c7-a01473e0a00d?wid=325&hei=325&qlt=80&fmt=pjpeg	Totally wireless high-performance earphones. Up to 9 hours of listening time (more than 24 hours with charging case). Adjustable, secure-fit earhooks for lightweight comfort and stability. Reinforced design for sweat & water resistance during tough workouts. Volume & track controls on each earbud, voice capability, and Auto Play/Pause. Powerful, balanced sound with dynamic range and noise isolation. Earbuds connect independently via Class 1 Bluetooth® for extended range and fewer dropouts. With Fast Fuel, a 5-minute charge gives 1.5 hours of playback when battery is low. Enhanced phone call performance and call handling from either earbud.	14c43e8cd5cfd8753396a054fe603ca7098d792586f942dd395be156b475cae0	{}	target
138	2021-01-09 17:56:29.21198-08	\N	\N	Turtle Beach Stealth 300 Amplified Gaming Headset For Xbox One/Series X - Black/Green 	49.99	42.99	Target	https://www.target.com/p/jbuds-air-true-wireless-signature-earbuds/-/A-79610407	https://target.scene7.com/is/image/Target/GUEST_860c9fb2-1f8a-4468-b411-70a2c1adf841?wid=325&hei=325&qlt=80&fmt=pjpeg	WORKS WITH XBOX SERIES X - This designed for Xbox One headset has ongoing compatibility with Xbox Series X.. POWERFUL AMPLIFIED AUDIO - Louder is better! Immerse yourself in your games with rechargeable battery-powered amplified sound from your Xbox One & Xbox Series X.. SURROUND SOUND READY FOR XBOX ONE - Optimized to deliver Microsoft’s immersive Windows Sonic for Headphones surround sound on Xbox to bring your games, movies, and music to life.. SUPERIOR 50MM SPEAKERS - Hear every crisp high and thundering low with these large, powerful 50mm over-ear speakers.. FLIP-UP MIC - Turtle Beach’s renowned high-sensitivity mic picks up your voice loud and clear to ensure your commands are always heard. Plus, it flips-up out of the way to Mute when not in use and blends into the headset’s design.. GLASSES FRIENDLY - Turtle Beach’s patented ProSpecs™ Glasses Relief System features dual-foam ear cushions, with softer foam in the section that rests against your glasses, alleviating pressure and allowing gamers with glasses to play in comfort.. MEMORY FOAM EAR CUSHIONS - Breathable fabric-wrapped memory foam ear cushions provide unmatched comfort.. METAL-REINFORCED HEADBAND -A metal-reinforced headband provides added durability.. VARIABLE MIC MONITORING - Say it…don't shout it, thanks to the ability to hear and adjust the volume of your own voice inside the headset to avoid shouting at teammates and other players.. AUDIO PRESETS, INCLUDING BASS BOOST - Enhance your gameplay experience with four audio EQ presets including Bass Boost, Signature Sound, Bass and Treble Boost, and Vocal Boost.. ALL-DAY BATTERY LIFE - An onboard rechargeable battery delivers over 40-hours of gaming per charge, so you'll always be ready to play.. MULTIPLATFORM COMPATIBILITY - Designed for Xbox One & Xbox Series X controllers with a 3.5mm jack, and also works great with PS4™ Pro, PS4™ & PS5™, Nintendo Switch™, PC, and mobile devices with a 3.5mm connection..	1a5b03a8d4a5d8bbff32afc1bcfbd708b4f0d85765c14b00bbd9ae470cfcf277	["https://target.scene7.com/is/image/Target/GUEST_860c9fb2-1f8a-4468-b411-70a2c1adf841?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_9aa6860f-1121-4529-9d88-d2059e6c0e14?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_a99a1152-38af-473f-938d-3d9802c6d513?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_2a2951bc-035d-474b-bbc5-b9956f696726?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_8e4a11a8-79e8-49c0-8707-8389302428e7?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_ef660f48-ef4e-4733-a94b-43839e7fca35?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_96277799-8c1d-4cad-a0d9-9d679e0d096c?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
133	2021-01-09 17:55:57.837495-08	\N	\N	Apple AirPods With Wireless Charging Case 	149.99	109.99	Target	https://www.target.com/p/samsung-galaxy-buds/-/A-79567447	https://target.scene7.com/is/image/Target/GUEST_6016b06d-e8d6-403a-9e1d-1938f45bb1f7?wid=325&hei=325&qlt=80&fmt=pjpeg	Automatically on, automatically connected. Easy setup for all your Apple devices*. Quick access to Siri by saying “Hey Siri”. Double-tap to play or skip forward. New Apple H1 headphone chip delivers faster wireless connection to your devices. Charges quickly in the case. Case can be charged either wirelessly using a Qi-compatible charging mat or using the Lightning connector. Rich, high-quality audio and voice. Seamless switching between devices. Listen and talk all day with multiple charges from the Wireless Charging Case*.	c75e1a15d57051e934f6e080ee3bc88a171ecbca24c800355450096fcebe7d19	["https://target.scene7.com/is/image/Target/GUEST_6016b06d-e8d6-403a-9e1d-1938f45bb1f7?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_b9f3a719-0500-4892-b93c-5cce77556e36?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
134	2021-01-09 17:56:09.629857-08	\N	\N	JBuds Air True Wireless Signature Earbuds 	179.99	159.99	Target	https://www.target.com/p/bose-sport-true-wireless-bluetooth-earbuds/-/A-78654351	https://target.scene7.com/is/image/Target/GUEST_418cbbb8-7a95-469f-88f9-d568f1999b30?wid=325&hei=325&qlt=80&fmt=pjpeg	24 hours of playtime: Each earbud holds 3-4-hours of battery life, and the case provides 10 extra hours.. Auto On Connect: The earbuds automatically turn on and connect to each other out of the case.. Custom EQ3 Sound: Choose between Signature, Balanced, and Bass Boost.. Everyday Proof: An IP55 sweat resistance keeps them durable through activities.. Stereo audio for phone calls. Built-in microphone on the right earbud allows you to take calls and activate smart assistants.. Bluetooth 5: Easy and simple wireless connection.	c41a8ae03a164413e3454464b411133f55a82c7e16360ab4a065d22de50b0334	["https://target.scene7.com/is/image/Target/GUEST_418cbbb8-7a95-469f-88f9-d568f1999b30?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_f190bdd1-e6d6-4416-8349-2d42a86b15ab?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_c458632e-b54f-49fe-85e5-96ce46a6a891?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_1ffe7af8-2da9-4e14-85bc-e04d5de7517b?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_6a3c92a6-1270-416e-8e97-19e860aa3132?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_8233356c-6968-4835-823d-edcb542d0268?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_9306bc0a-0c92-4297-a1be-01bcd3ebaf23?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_5ce9b161-33c4-4859-ad08-0d4d8e6898ee?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
135	2021-01-09 17:56:11.809243-08	\N	\N	Skullcandy Push Ultra True Wireless Headphones - Black 	179.99	159.99	Target	https://www.target.com/p/bose-sport-true-wireless-bluetooth-earbuds/-/A-78654351	https://target.scene7.com/is/image/Target/GUEST_1ffc789f-fe1e-4165-b05b-66eae190b25c?wid=325&hei=325&qlt=80&fmt=pjpeg	True Wireless via Bluetooth® 5. Up to 40 Hours Total Battery. Ultra-Secure and Comfortable. IP67 Sweatproof and Waterproof Earbuds. Call, Track, and Volume Control. Track and Find if Lost via Tile®.	77141ca384804f3fbdfe4d7a30485dc52f24d2b80037a72052d94c676f628cbb	["https://target.scene7.com/is/image/Target/GUEST_1ffc789f-fe1e-4165-b05b-66eae190b25c?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_4689cab7-5751-4d9c-8820-8c1af2a2e69b?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_7bfe76f5-6b9a-4dff-bbde-fae0adcf4632?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_bb5c06ca-ca14-499b-bb63-5eb8cd336b0d?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_f6134061-57bc-4966-95c5-8bf00464d53e?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_5e21c386-57e2-467f-8de8-a15583d9b20b?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
136	2021-01-09 17:56:14.533837-08	\N	\N	Beats EP Wired On-Ear Headphones 	19.99	19.89	Target	https://www.target.com/p/jlab-studio-wired-on-ear-headphones/-/A-78664460	https://target.scene7.com/is/image/Target/GUEST_e4189b3a-5fe9-4550-bc5c-f9ee0e3f08ea?wid=325&hei=325&qlt=80&fmt=pjpeg	Beats EP is made to go everywhere you do. Fine-tuned acoustics for the clarity and depth you expect from Beats. Durable, lightweight design reinforced with stainless steel. Battery-free for unlimited playback. Adjustable vertical sliders for a personalized fit. Take calls and control your music with RemoteTalk cable*.	71c76b15655514d587715dbd767b1d0f092aea6524d92eda9f007fe8209bee1a	["https://target.scene7.com/is/image/Target/GUEST_e4189b3a-5fe9-4550-bc5c-f9ee0e3f08ea?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_d9064b8e-997e-4d5e-bbb7-b0890b09c985?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_a478f91e-0c47-4411-b21f-8e45c088f2fe?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_1c0e11b0-3753-4aff-9888-3556cc45ea63?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_c21e17bd-8238-4ed5-a035-bad925c08f6b?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_46e7171c-1798-4edc-80b5-4d06d926f061?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_4288b84e-3ffb-475d-a6a4-aa877ecaae8b?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
137	2021-01-09 17:56:15.489915-08	\N	\N	Sony WH-1000XM4 Wireless Noise Canceling Overhead Headphones 	14.99	7.49	Target	https://www.target.com/p/sony-fashionable-in-ear-headphones/-/A-15258518	https://target.scene7.com/is/image/Target/GUEST_9ae17499-8634-41d0-b09a-2ef6cfe3f298?wid=325&hei=325&qlt=80&fmt=pjpeg	Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback). Touch Sensor controls to pause/play/skip tracks, control volume, activate your voice assistant, and answer phone calls. Speak-to-chat technology automatically reduces volume during conversations. Superior call quality with precise voice pickup. Wearing detection pauses playback when headphones are removed. Seamless multiple-device pairing. Adaptive Sound Control provides a personalized listening experience. Updated design relieves pressure for long-lasting comfort.	99d7657dafa44d3f3c9a4071da40ed6e853ffe831da1d37b1462444066990821	["https://target.scene7.com/is/image/Target/GUEST_9ae17499-8634-41d0-b09a-2ef6cfe3f298?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_3b648295-725e-414d-98ab-a85185813d3f?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_c09c88aa-e278-428a-91ff-dd191424214d?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_3acbfae6-aa33-413f-afc5-d2c63e818be2?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_4a064af7-2196-43b5-bb18-e6a3915e849f?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_6da3393c-7dcd-43db-9939-faf6f51c2e57?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
139	2021-01-09 17:56:39.190679-08	\N	\N	Kate Spade New York AirPods Pro Case - Hollyhock Cream 	29.99	24.99	Target	https://www.target.com/p/catalyst-airpod-case/-/A-53304337	https://target.scene7.com/is/image/Target/GUEST_5f3f0084-03e5-411d-a152-07d80b75aa64?wid=325&hei=325&qlt=80&fmt=pjpeg	Versatile protection against impacts and drops. Dressed in premium Kate Spade New York prints. Premium hardware to clip onto your belongings for easy access. Wireless charging compatible.	2ceef32bdca7f3242a6ad1e4b18507a839293249b01bab50c845bf125ddce5b7	["https://target.scene7.com/is/image/Target/GUEST_5f3f0084-03e5-411d-a152-07d80b75aa64?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_ff3ef069-32cd-4912-9971-70f211d71a74?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_560e95f4-6841-4ff2-9759-adb9eec20323?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_2b136428-f2b5-4af6-a538-5827f77404bc?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_cfad0e35-0aaf-41ca-b51f-a57465677e91?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_142a75fe-cf02-43d1-b492-04596e2b33aa?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
140	2021-01-09 17:56:52.140267-08	\N	\N	Kate Spade New York AirPods Pro Case - Ombre Glitter Sunset Pink 	29.99	19.99	Target	https://www.target.com/p/case-mate-airpods-airpods-pro-case-sheer-crystal/-/A-78857281	https://target.scene7.com/is/image/Target/GUEST_c3e36b8e-c129-42e8-ab09-d47cd66421de?wid=325&hei=325&qlt=80&fmt=pjpeg	2-piece urethane construction shields your Airpods against everyday scrapes and scratches.. Premium kate spade new york clip attaches securely and easily to keep your Airpods close and easy to access.. Wireless-charging compatible for convenience and speed.. Signature Kate Spade New York aesthetics and design..	64a6b0f91d4d926de3aa27121be92deca9172e9f2baf7c3f8818fb9029d2d4e4	["https://target.scene7.com/is/image/Target/GUEST_c3e36b8e-c129-42e8-ab09-d47cd66421de?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_39148e93-6f51-4e16-b3ee-ee87f85aaabf?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_50dede8e-b909-4fae-aba3-0b81bfd13ae6?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_15630c11-4128-47a8-8a7c-40dfb5e3d986?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_8296c5fd-a9bd-4dd5-b40f-10c3f2bbd24b?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_547ccce4-2a11-4178-b90d-362e6d67bfdf?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
141	2021-01-09 17:58:04.110507-08	\N	\N	Skullcandy Riff On-Ear Wireless Headphones 	249.99	169.99	Target	https://www.target.com/p/powerbeats-pro-true-wireless-in-ear-earphones/-/A-78362035	https://target.scene7.com/is/image/Target/GUEST_29629222-d1ea-4bf2-9161-234867635435?wid=325&hei=325&qlt=80&fmt=pjpeg	Bluetooth® Wireless Technology. Up to 12 Hours of Battery Life. Rapid Charge: 10 min=2 hr. Ultra Durable Headband. Call and Track Control. Activate Assistant.	2fc5cb738006ba32abf49e4bddae9ec3b28ff5028e42765267bdb5a730857b47	["https://target.scene7.com/is/image/Target/GUEST_29629222-d1ea-4bf2-9161-234867635435?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_49f8c311-561f-4e2b-ac68-0bdcf6c5b148?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_651de168-b373-46fd-b6b0-a6637939dda4?fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_f2d9de3a-60c1-4d5f-81a7-a08b87b77ee6?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_75fe4241-622a-453d-bb4a-f9570d5d04d7?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_9d42ca33-72ff-40c3-a933-00552b810d25?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_356ff9a1-89fa-4e8b-a111-452cc02be2bd?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_a2a7ecc9-8975-4723-8767-2b1a0e5e4048?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
142	2021-01-09 17:59:06.300499-08	\N	\N	Samsung Earphones Tuned By AKG - Grey - S10/S10e/S10s/ S9/S9+/Note 9/S8/S8+ - Bulk Packaging 	59.99	49.99	Target	https://www.target.com/p/urbeats3-earphones-with-lightning-connector/-/A-78654302	https://target.scene7.com/is/image/Target/GUEST_864a76d3-6ebc-4692-8323-61fe27931972?wid=325&hei=325&qlt=80&fmt=pjpeg	The Samsung Earphones Tuned by AKG provide an incredibly clear, authentic-sounding, and balanced output that customers have come to expect. These hybrid, canal-type earphones feature a sleek metal finish and tangle-free, fabric cable. Enjoy easy access to a range of your device's features with the earphones in-line remote. Also included is a carrying case that lets you carry your earphones safely and in style.. With 8mm and 11mm speaker units, they deliver balanced sound for bass, mids, and highs. Enjoy crisp, rich, and balanced sounds across the entire audio spectrum..	cb8c6f3eca369bd4c89a6e75c6bcacf0481292399eb1bac9840fae835fac714e	["https://target.scene7.com/is/image/Target/GUEST_864a76d3-6ebc-4692-8323-61fe27931972?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_1dff07bf-ba5a-407f-b9e8-97351985d9a6?wid=325&hei=325&qlt=80&fmt=pjpeg", "https://target.scene7.com/is/image/Target/GUEST_74ff25dd-30da-4f59-812f-c4b71f9ab81b?wid=325&hei=325&qlt=80&fmt=pjpeg"]	target
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
29	merchant	0018_rewardcode_description	2020-12-13 14:17:07.096006-08
30	merchant	0019_auto_20201225_2321	2020-12-25 15:21:23.114464-08
31	plaid_local	0007_account	2020-12-27 19:21:04.571399-08
32	user	0006_auto_20201228_2038	2020-12-28 12:38:35.728921-08
33	plaid_local	0008_delete_account	2020-12-28 12:38:36.476867-08
34	merchant	0020_remove_reward_campaign	2020-12-28 19:12:13.718937-08
35	user	0007_auto_20201229_1831	2020-12-29 10:31:39.151927-08
36	merchant	0021_auto_20201229_1831	2020-12-29 10:31:40.60807-08
37	plaid_local	0009_link_active	2020-12-29 11:48:58.760821-08
38	user	0008_auto_20201230_2129	2020-12-30 13:29:37.873531-08
39	user	0009_auto_20201230_2158	2020-12-30 13:58:46.542656-08
40	user	0010_notification_route_key	2020-12-30 15:21:02.385107-08
41	user	0011_notification_metadata	2020-12-30 15:43:28.572723-08
42	user	0012_profile	2021-01-02 16:04:47.80476-08
43	user	0013_auto_20210103_0005	2021-01-02 16:05:33.900755-08
44	user	0014_profile_targeting_enabled	2021-01-02 16:28:33.882643-08
45	user	0015_auto_20210103_0046	2021-01-02 16:46:53.344732-08
46	deals	0001_initial	2021-01-04 17:25:19.683526-08
47	deals	0002_remove_deal_user	2021-01-04 19:16:40.728567-08
48	deals	0003_auto_20210105_0328	2021-01-04 19:28:54.902598-08
49	deals	0004_deal_user	2021-01-04 19:47:36.190235-08
50	deals	0005_auto_20210105_0351	2021-01-04 19:51:40.219075-08
51	user	0016_notification_title	2021-01-07 09:42:57.291261-08
52	deals	0006_deal_all_img_urls	2021-01-09 10:59:46.334082-08
53	deals	0007_auto_20210110_0104	2021-01-09 17:05:03.030415-08
54	analytics	0001_initial	2021-01-09 18:03:07.507372-08
55	analytics	0002_scraperstats_name	2021-01-10 11:03:20.085004-08
56	user	0017_auto_20210110_2128	2021-01-10 13:28:33.397703-08
57	deals	0008_deal_scraper	2021-01-10 15:46:29.309352-08
\.


--
-- Data for Name: link_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.link_tokens (id, created_at, updated_at, deleted_at, token, user_id) FROM stdin;
1	2020-12-27 19:27:41.523359-08	\N	\N	link-sandbox-e16b35a3-a84e-4b9e-938e-477cec7fc400	1
2	2020-12-27 19:28:25.89617-08	\N	\N	link-sandbox-d7ad0e08-580b-402c-848f-1d4131d19cd2	1
3	2020-12-27 19:29:30.894974-08	\N	\N	link-sandbox-b60d4fd3-036e-4f35-994b-32fb5ad897ca	1
4	2020-12-27 19:30:14.711027-08	\N	\N	link-sandbox-18560e55-d0b2-4a8d-8397-8fd080614806	1
5	2020-12-27 19:31:10.00161-08	\N	\N	link-sandbox-0377350a-a4dc-4ec0-9e56-93e16d4189fa	1
6	2020-12-27 19:31:58.316242-08	\N	\N	link-sandbox-fc73e635-a0d8-4a9a-b827-41686017dcd8	1
7	2020-12-27 19:32:41.373177-08	\N	\N	link-sandbox-339152dc-690a-4f20-acf4-756d916803fc	1
8	2020-12-27 19:32:47.029176-08	\N	\N	link-sandbox-6fc6f1d9-1ea0-4a79-b7aa-19e6c43fd5ba	1
9	2020-12-27 19:33:11.632767-08	\N	\N	link-sandbox-c13a8044-2a16-4e5b-83bc-73c750ac6d78	1
10	2020-12-27 19:33:45.405476-08	\N	\N	link-sandbox-8b78eb88-9622-4c88-91f3-649744a078c4	1
11	2020-12-27 19:34:05.663616-08	\N	\N	link-sandbox-c796e1fc-024b-4c41-b4eb-12d0d86ed4ae	1
12	2020-12-27 19:35:17.57898-08	\N	\N	link-sandbox-7da9d599-64f2-4982-ad5e-d4ec7ff4f684	1
18	2020-12-27 19:40:14.667144-08	\N	\N	link-sandbox-d8079efc-1488-4c2c-9657-51b0b4445b34	1
19	2020-12-27 19:48:14.270351-08	\N	\N	link-sandbox-2dd984b2-6086-4180-a9f9-cbed5264bd74	1
20	2020-12-27 20:47:27.540896-08	\N	\N	link-sandbox-b35c12b0-e2d2-4d15-a4c5-b541e02f9bb4	1
21	2020-12-27 20:48:27.002093-08	\N	\N	link-sandbox-45b16600-7319-495b-b6fc-07cda2b806c8	1
22	2020-12-27 20:48:48.042867-08	\N	\N	link-sandbox-eea7e836-e7fc-48a6-898f-d5061f2c069e	1
23	2020-12-27 20:49:20.284434-08	\N	\N	link-sandbox-4f462a9e-3ac3-4414-854b-fe2b44746be6	1
24	2020-12-27 20:49:28.773051-08	\N	\N	link-sandbox-64e3800f-644b-404d-9cd3-1bb2435654a0	1
25	2020-12-27 20:49:37.384725-08	\N	\N	link-sandbox-cbb3ee30-5e18-41b8-b224-e3bf4e141330	1
26	2020-12-27 20:50:29.017761-08	\N	\N	link-sandbox-a24c074b-0b91-46c4-bdb4-db7266c30c1c	1
27	2020-12-27 20:52:15.674765-08	\N	\N	link-sandbox-f2efa675-3112-49f0-ba24-28207eba9e40	1
28	2020-12-27 20:52:56.961381-08	\N	\N	link-sandbox-ec71daf0-08de-4586-99f5-64c0f88f312c	1
29	2020-12-27 20:53:16.599957-08	\N	\N	link-sandbox-6a78d29c-570e-4fce-9bd4-63fbd1dfd1f4	1
30	2020-12-27 20:53:50.364138-08	\N	\N	link-sandbox-0bdb3fde-98b2-4707-ac46-f12348dd8d20	1
31	2020-12-27 20:54:15.378684-08	\N	\N	link-sandbox-24cd764a-42ac-4670-b54c-7789ec42cada	1
32	2020-12-27 20:54:24.771712-08	\N	\N	link-sandbox-c7bd20ff-741d-4b12-ba43-83965c1af7a8	1
33	2020-12-27 20:54:35.879771-08	\N	\N	link-sandbox-41103227-8e77-420c-b081-947e5bfc167e	1
34	2020-12-27 20:54:49.713725-08	\N	\N	link-sandbox-e28dc3bc-ffb8-4dbd-b009-b90acc85bcd4	1
35	2020-12-27 20:54:56.819175-08	\N	\N	link-sandbox-47606f90-0267-4d07-ab08-52fcfeadf828	1
36	2020-12-27 20:55:27.344804-08	\N	\N	link-sandbox-f55f0e03-b754-43ca-91b7-b28a23ea0cb0	1
37	2020-12-27 20:55:41.438471-08	\N	\N	link-sandbox-9014e774-2d7b-42a0-bed1-dd1fa3902892	1
38	2020-12-27 20:56:56.965-08	\N	\N	link-sandbox-56e83d95-e2bd-45ee-a870-292b5734fb8e	1
39	2020-12-27 20:57:47.374825-08	\N	\N	link-sandbox-185c2439-fb7c-4830-9934-eccc60d2eac6	1
40	2020-12-27 20:59:55.651367-08	\N	\N	link-sandbox-a2b524fa-e05e-4ebf-a296-e19736944ffa	1
41	2020-12-27 21:00:12.585878-08	\N	\N	link-sandbox-af9d97b0-dc42-4725-befa-cd1aa15fcf5e	1
42	2020-12-27 21:00:21.660493-08	\N	\N	link-sandbox-aee3861d-6921-4738-9532-fc183610e7e0	1
43	2020-12-27 21:00:35.890666-08	\N	\N	link-sandbox-e6e698c0-e085-41b0-8275-2806a948456a	1
44	2020-12-27 21:00:43.028888-08	\N	\N	link-sandbox-7024c07e-1b1b-470b-a730-f27651753c5c	1
45	2020-12-27 21:00:53.213114-08	\N	\N	link-sandbox-03cec4a0-5c5b-4b83-9e79-4ca6b234bd86	1
46	2020-12-27 21:00:59.624364-08	\N	\N	link-sandbox-b1e46d92-10b5-487d-a9e6-20abe96ea96a	1
47	2020-12-27 21:02:10.878962-08	\N	\N	link-sandbox-339ae70d-e897-4bb4-88f9-4e508e547c40	1
48	2020-12-27 21:02:21.124967-08	\N	\N	link-sandbox-a7863b26-c4d1-4fba-99c9-7671f6ee9582	1
49	2020-12-27 21:02:45.66978-08	\N	\N	link-sandbox-7926956a-4b2b-4119-a70d-191d45be1d64	1
50	2020-12-27 21:02:50.250772-08	\N	\N	link-sandbox-7c7703bf-1723-4e2c-8a55-f8077c21343c	1
51	2020-12-27 21:10:34.105294-08	\N	\N	link-sandbox-11f270f5-8cf5-43a1-96d6-d544224037ea	1
52	2020-12-28 12:19:29.705851-08	\N	\N	link-sandbox-2daab99c-e9fc-4dac-ae0e-698d57fd5472	1
53	2020-12-28 12:19:52.945936-08	\N	\N	link-sandbox-46781489-a21f-46e3-a2b8-5ecaa8d9bc60	1
54	2020-12-28 12:20:01.444795-08	\N	\N	link-sandbox-fab5dc74-85c6-4f79-9ed0-134b204b7220	1
55	2020-12-28 12:20:57.254065-08	\N	\N	link-sandbox-3069dc6c-6ee0-423b-a91d-6419e462dfb2	1
56	2020-12-28 12:23:45.413944-08	\N	\N	link-sandbox-badecf35-aadd-4c56-8cf7-6a47387a5d28	1
57	2020-12-28 12:25:48.057717-08	\N	\N	link-sandbox-261ac803-3273-465f-a871-2a2324daf750	1
58	2020-12-28 12:29:42.445748-08	\N	\N	link-sandbox-2bda1ca6-8015-4db7-bd4c-cbe1ca51a404	1
59	2020-12-28 12:30:08.579405-08	\N	\N	link-sandbox-5c4d89d7-372f-4f81-a2ce-d9f1ecae4eae	1
60	2020-12-28 15:06:02.33317-08	\N	\N	link-sandbox-520e72ad-af94-4404-bb0f-976055bd7c72	3
61	2020-12-28 20:45:38.008515-08	\N	\N	link-sandbox-92e1037b-0e2f-4a1a-8e78-354d4ca81cf2	3
62	2020-12-29 09:33:23.884838-08	\N	\N	link-sandbox-9804dec6-8cb8-4bb3-a347-b75acae01284	4
63	2020-12-29 09:41:01.86331-08	\N	\N	link-sandbox-d6145acd-758c-46ca-949a-0827ee09bb14	3
64	2020-12-29 09:44:28.448139-08	\N	\N	link-sandbox-632bfc68-120e-4f29-8a04-825c380aa214	3
65	2020-12-29 10:39:50.031385-08	\N	\N	link-sandbox-064ee008-a962-4ac2-a4c5-aec19aad097c	3
66	2020-12-29 10:44:43.99139-08	\N	\N	link-sandbox-d2a08d51-5b9a-4360-9b35-adda7e30f49a	3
67	2020-12-29 10:45:08.953815-08	\N	\N	link-sandbox-3e5f68eb-f9e6-42b0-bc62-f29906d3f8b2	3
68	2020-12-29 11:00:28.876313-08	\N	\N	link-sandbox-75ee8a2f-88d0-425c-afd3-dc9beaf5956a	3
69	2020-12-29 11:00:53.283775-08	\N	\N	link-sandbox-1a2cf223-032d-4988-bbeb-34d5bfdbbc88	3
70	2020-12-29 11:01:23.718051-08	\N	\N	link-sandbox-b32a331f-7a09-40b6-b695-0abe644cc10e	3
71	2020-12-29 11:01:53.616092-08	\N	\N	link-sandbox-55aaccbf-eca9-4d6b-bbba-866f285e93ee	3
72	2020-12-29 11:02:28.319881-08	\N	\N	link-sandbox-0e10e1e0-62d8-468b-932c-844c6be9892e	3
73	2020-12-29 11:03:28.512155-08	\N	\N	link-sandbox-e6463b7c-0dde-4585-bb2a-d0eecdf8649a	3
74	2020-12-29 11:03:42.332677-08	\N	\N	link-sandbox-9b45e7db-4b53-497b-a3fc-44eec9fbebb6	3
75	2020-12-29 11:08:49.830687-08	\N	\N	link-sandbox-87377d9f-4d68-461c-918f-620cc1e18874	3
76	2020-12-29 11:08:58.368976-08	\N	\N	link-sandbox-11020d3a-2e3a-4e79-b413-ad18dd5f21fe	3
77	2020-12-29 11:12:17.737794-08	\N	\N	link-sandbox-53ebdbd3-48b7-4ade-859b-8b3374f0ddec	3
78	2020-12-29 11:19:06.806338-08	\N	\N	link-sandbox-b4635dbe-f949-4874-bce5-72b0d78a963e	3
79	2020-12-29 11:20:08.01666-08	\N	\N	link-sandbox-9217e613-3a83-42c3-85a9-9f306cf101ee	3
80	2020-12-29 11:20:52.215435-08	\N	\N	link-sandbox-49ae52c0-db25-4a15-b668-c9303ebc7b34	3
81	2020-12-29 11:22:16.113988-08	\N	\N	link-sandbox-c2001537-f296-4257-a35c-360c0fa9ee68	3
14	2020-12-29 12:02:39.282449-08	\N	\N	link-sandbox-850c3b04-5032-447f-a95a-269e55ed72f8	1
15	2020-12-29 12:03:08.650352-08	\N	\N	link-sandbox-ae3bc0dc-f7e4-4e21-9d99-6fcfe6099d04	1
16	2020-12-29 12:05:16.413663-08	\N	\N	link-sandbox-91ae2a50-daea-45dd-8423-56b7af0e71ba	1
17	2020-12-29 12:06:32.778817-08	\N	\N	link-sandbox-8d8b811d-92c9-4ba6-b70a-61ee6276b300	1
82	2020-12-29 11:22:53.311549-08	\N	\N	link-sandbox-40f47e7b-f849-4582-a59b-5cc426c0a294	3
83	2020-12-29 11:24:31.16159-08	\N	\N	link-sandbox-cea23bfe-0356-491e-baaa-4c6e03a8ce86	3
84	2020-12-29 11:25:31.899924-08	\N	\N	link-sandbox-2d8e5556-5e0a-4484-8e3a-d00560c33ad0	3
85	2020-12-29 11:25:47.627643-08	\N	\N	link-sandbox-588af390-6cd5-416c-a1be-949e0cde096c	3
86	2020-12-29 11:26:00.443937-08	\N	\N	link-sandbox-798ab9e6-26b1-4c35-9012-79523820bca6	3
87	2020-12-29 11:26:07.057574-08	\N	\N	link-sandbox-3f282552-4d53-468d-a1d0-abb4497d43b4	3
88	2020-12-29 11:26:21.741757-08	\N	\N	link-sandbox-ae82cb6c-0ea9-4a8d-a238-e0ea74691f12	3
89	2020-12-29 11:26:23.538909-08	\N	\N	link-sandbox-a9a14159-02dc-4a3f-9a4e-07e8f45a6924	3
90	2020-12-29 11:26:34.575134-08	\N	\N	link-sandbox-234357a2-13df-41d1-995c-0976f5a6c4d8	3
91	2020-12-29 11:26:42.880234-08	\N	\N	link-sandbox-4bf1ae80-6de1-436d-af21-6f6648272cfc	3
92	2020-12-29 11:26:58.834681-08	\N	\N	link-sandbox-510c718d-d7df-48cf-bd4f-fcbe3e8f5248	3
93	2020-12-29 11:27:08.092927-08	\N	\N	link-sandbox-6243729f-4710-4414-86f0-550206e7ef2c	3
94	2020-12-29 11:27:16.421383-08	\N	\N	link-sandbox-ad2f0484-a568-44c9-bc09-358c89299b18	3
95	2020-12-29 11:28:34.204298-08	\N	\N	link-sandbox-60f3d7e0-5cc6-43c0-9e7a-6693ed998c30	3
96	2020-12-29 11:28:44.038426-08	\N	\N	link-sandbox-28be67cd-3a9a-469b-ad9d-052c2208738c	3
97	2020-12-29 11:28:50.890507-08	\N	\N	link-sandbox-66e56930-5bff-4ebe-afcf-eeb68ca62ce6	3
98	2020-12-29 11:28:59.619556-08	\N	\N	link-sandbox-8f0559c6-7405-4dd9-9b5d-0fb6a1c647ba	3
99	2020-12-29 11:29:13.742152-08	\N	\N	link-sandbox-dd18f0d6-ea1d-4fc6-97d7-360d764910bc	3
100	2020-12-29 11:29:17.648374-08	\N	\N	link-sandbox-8dde528c-bc55-4ef7-8acf-db3a0f16de44	3
101	2020-12-29 11:29:33.65692-08	\N	\N	link-sandbox-78508cae-7ba1-4712-b31d-191989e18bb6	3
102	2020-12-29 11:30:15.988856-08	\N	\N	link-sandbox-cb0003ed-458c-474a-816f-1f6f8656fa36	3
103	2020-12-29 11:30:27.564407-08	\N	\N	link-sandbox-3441c841-0972-46d2-9c06-60d0cd99a0f8	3
104	2020-12-29 11:30:32.470887-08	\N	\N	link-sandbox-07befb83-9384-4bad-a5ee-adebb1fb3b94	3
105	2020-12-29 11:31:17.913428-08	\N	\N	link-sandbox-04606b29-bc59-4197-becc-1f5fcefc3ce8	3
106	2020-12-29 11:31:26.315487-08	\N	\N	link-sandbox-4906a643-0fa8-45a4-8590-4053edbc0292	3
107	2020-12-29 11:31:40.609992-08	\N	\N	link-sandbox-eca558a8-501d-4910-b030-f4583717501e	3
108	2020-12-29 11:31:55.558598-08	\N	\N	link-sandbox-158b8e71-8087-4b11-b4e9-788b7dceffae	3
109	2020-12-29 11:32:05.375847-08	\N	\N	link-sandbox-822ade6f-1043-43f8-99b6-eff73129558e	3
110	2020-12-29 11:32:10.375311-08	\N	\N	link-sandbox-19d0b9bf-3e2e-489e-b2d2-2c1b849b0c40	3
111	2020-12-29 11:32:19.058696-08	\N	\N	link-sandbox-1e7527e3-7198-4982-a2bc-236273a41460	3
112	2020-12-29 11:32:43.432979-08	\N	\N	link-sandbox-2e3328bc-439a-4891-93bf-101a749a9b18	3
113	2020-12-29 11:33:00.585592-08	\N	\N	link-sandbox-20ef67c1-d68d-4366-a787-91e9f766e2c4	3
114	2020-12-29 11:33:06.483191-08	\N	\N	link-sandbox-ff338d8d-f022-44a2-8429-f6e7f6c60afc	3
115	2020-12-29 11:33:15.860153-08	\N	\N	link-sandbox-c7ba8d39-8f88-4271-821e-ffe2c9113842	3
116	2020-12-29 11:33:22.889143-08	\N	\N	link-sandbox-3563290c-0868-4b52-98d6-61e90de412e0	3
117	2020-12-29 11:33:25.515673-08	\N	\N	link-sandbox-9d9e8f89-4fc1-4a09-b4c1-4b7e66748250	3
118	2020-12-29 11:33:34.856233-08	\N	\N	link-sandbox-08c62c40-79e3-4411-a5b0-23b78deea4fa	3
119	2020-12-29 11:33:39.717024-08	\N	\N	link-sandbox-eb5e4e48-8d58-40a4-baf3-abc1c4dc623e	3
120	2020-12-29 11:34:16.187654-08	\N	\N	link-sandbox-6d8915d0-e65a-4b0d-bcca-09f200f55464	3
121	2020-12-29 11:35:18.381956-08	\N	\N	link-sandbox-599cc5ff-a279-4f75-ab01-72f9b270ba60	3
122	2020-12-29 11:35:28.365309-08	\N	\N	link-sandbox-e884a1e0-1393-47fa-8ffd-ebdab81e47c0	3
123	2020-12-29 11:36:31.97556-08	\N	\N	link-sandbox-4a3c3f0e-be78-4da2-b1b4-45acbbb16d1e	3
124	2020-12-29 11:41:48.943814-08	\N	\N	link-sandbox-efcb9867-46b0-409d-ac3c-a6b585d840c6	3
125	2020-12-29 11:42:12.074364-08	\N	\N	link-sandbox-b17408ad-bc2a-46aa-9089-5f4ff4eed72c	3
126	2020-12-29 11:42:56.875967-08	\N	\N	link-sandbox-d6747738-e447-4704-af9d-6ce700342b4e	3
127	2020-12-29 11:44:30.369641-08	\N	\N	link-sandbox-b723204f-0363-4adf-ad84-fbcfa61bfc5e	3
128	2020-12-29 11:45:23.995232-08	\N	\N	link-sandbox-5c5ff28a-b574-4c4f-8d81-adad65018eee	3
129	2020-12-29 11:45:37.585446-08	\N	\N	link-sandbox-a8edbcc8-211c-4362-a4c4-e96d806e379e	3
130	2020-12-29 11:45:41.314937-08	\N	\N	link-sandbox-18a441b9-cdad-46fc-be7a-02f8acc9d83a	3
131	2020-12-29 11:45:48.068739-08	\N	\N	link-sandbox-cc30ebb8-e34c-493d-b546-9bc51e1f02aa	3
132	2020-12-29 11:45:53.250085-08	\N	\N	link-sandbox-d1892551-b061-4011-b062-d6820ec3a9e8	3
133	2020-12-29 11:45:58.193005-08	\N	\N	link-sandbox-3afd9b11-1c23-4e5c-9dc6-17df2ce885ba	3
134	2020-12-29 11:46:09.725492-08	\N	\N	link-sandbox-fc0483c7-795c-4994-ac40-7d3d699e1d92	3
135	2020-12-29 11:46:15.723485-08	\N	\N	link-sandbox-fdc39e9b-75e3-43c8-848c-9df0216c8a30	3
136	2020-12-29 11:46:47.387154-08	\N	\N	link-sandbox-574c7a4c-d398-4cb9-b6e4-9c5f8e32f926	3
137	2020-12-29 11:47:20.417212-08	\N	\N	link-sandbox-8a6c5b5e-59d4-4581-84f1-a45a171fd5f0	3
138	2020-12-29 11:47:26.022441-08	\N	\N	link-sandbox-7a99c506-2eda-4782-b04e-1c3f5538bbee	3
139	2020-12-29 11:47:39.233603-08	\N	\N	link-sandbox-9d88862c-ee98-491f-a0f6-fca367ac3720	3
140	2020-12-29 11:47:42.124556-08	\N	\N	link-sandbox-42bc2766-7526-4542-a292-7e2585259f8c	3
141	2020-12-29 11:48:06.218846-08	\N	\N	link-sandbox-47e243f4-deae-4f02-ab6d-018ac667abdc	3
142	2020-12-29 11:48:20.147128-08	\N	\N	link-sandbox-2f016a07-ce5e-46aa-9d1e-90ab811c0954	3
143	2020-12-29 11:49:16.973839-08	\N	\N	link-sandbox-7a71840d-0273-4aa3-bc6e-2b6c825f4dfe	3
144	2020-12-29 11:49:25.386607-08	\N	\N	link-sandbox-eb9ff956-7815-472a-bf13-71a65e636a04	3
145	2020-12-29 11:49:36.707203-08	\N	\N	link-sandbox-42167913-52be-4f68-a562-edb4a7417dc2	3
146	2020-12-29 11:49:42.053853-08	\N	\N	link-sandbox-1dd4f05c-e9cf-47e0-b9fe-b7bde078bfb0	3
147	2020-12-29 11:49:53.851073-08	\N	\N	link-sandbox-04278422-67a8-4ef1-a31a-149423cef12c	3
148	2020-12-29 11:50:29.965014-08	\N	\N	link-sandbox-fc2139c3-8c87-499e-bd91-6dedccf06634	3
149	2020-12-29 11:50:35.388363-08	\N	\N	link-sandbox-0e76d556-5afa-447e-b67f-b20a71026acc	3
150	2020-12-29 11:50:48.414957-08	\N	\N	link-sandbox-59420df3-7082-4015-bb57-3cd91e09a578	3
151	2020-12-29 11:51:26.602313-08	\N	\N	link-sandbox-a3f77ec2-f568-4678-ab15-932e8b935698	3
152	2020-12-29 11:52:35.508121-08	\N	\N	link-sandbox-6d8afd1a-58a8-4ed8-b494-a13db0421906	3
153	2020-12-29 11:55:26.621022-08	\N	\N	link-sandbox-aab3289a-c341-4746-965f-c36e8b4563a4	3
154	2020-12-29 11:56:27.068051-08	\N	\N	link-sandbox-1fb4724b-5582-439b-a1dd-bfe02cb84cd8	3
155	2020-12-29 11:59:29.441521-08	\N	\N	link-sandbox-16379ad0-c60a-4f79-8f0b-6ea2d0902d10	3
156	2020-12-29 12:00:21.567998-08	\N	\N	link-sandbox-e9e0d98d-a81f-4aa0-a62d-71271679f744	3
157	2020-12-29 12:01:40.840397-08	\N	\N	link-sandbox-49ac5628-ee2a-48c5-8a23-d07d6b0dd568	3
13	2020-12-29 12:00:42.042051-08	\N	\N	link-sandbox-35a0ac5e-1dbd-433a-9498-9459ad1ea972	1
158	2020-12-29 12:02:21.990312-08	\N	\N	link-sandbox-86df50a4-3194-4a88-9c40-d0796e6150e0	3
159	2020-12-29 12:02:47.880888-08	\N	\N	link-sandbox-66227a99-b577-4a22-aa13-1cc44c551a5e	3
160	2020-12-29 12:04:58.094234-08	\N	\N	link-sandbox-c5f7ba46-adfe-4a15-8619-edf323c29ed2	3
161	2020-12-29 12:06:16.012617-08	\N	\N	link-sandbox-70147ba9-c255-489d-9a94-022686b38f8e	3
162	2020-12-29 12:08:29.288759-08	\N	\N	link-sandbox-14652133-f65b-458e-a0c6-2823fb963104	3
163	2020-12-29 12:08:39.146816-08	\N	\N	link-sandbox-ee3577af-a358-4f9b-b112-24992b200822	3
164	2020-12-29 12:09:45.296708-08	\N	\N	link-sandbox-9793231a-4d85-4727-a7d6-92de6383a586	3
165	2020-12-29 12:22:18.095794-08	\N	\N	link-sandbox-08978653-cc26-4af0-8081-14124f4fca96	3
166	2020-12-29 12:22:38.077215-08	\N	\N	link-sandbox-536a5447-df45-4b57-892e-d894c68605c6	3
167	2020-12-29 12:23:05.680651-08	\N	\N	link-sandbox-9f9aad4b-110a-46fb-bd88-a6d5360d6bc8	3
168	2020-12-29 12:23:21.637947-08	\N	\N	link-sandbox-39501268-6389-490d-bdda-87d457c17330	3
169	2020-12-29 12:23:28.803215-08	\N	\N	link-sandbox-afcd8676-b79c-4b72-870e-82be89fe3098	3
170	2020-12-29 12:23:34.054494-08	\N	\N	link-sandbox-523df634-360b-4ff5-88c5-76107b2a24a2	3
171	2020-12-29 12:23:44.367787-08	\N	\N	link-sandbox-c4861509-443c-4a49-870f-45e126c63bec	3
172	2020-12-29 12:24:30.238469-08	\N	\N	link-sandbox-3a88478e-eb0f-404a-86b9-440eac2d2510	3
173	2020-12-29 12:26:49.166488-08	\N	\N	link-sandbox-97f65939-b21e-471d-bd8b-57db3899cdb8	3
174	2020-12-29 12:32:01.005629-08	\N	\N	link-sandbox-0602c37c-5732-402f-8a43-f6a68f943da4	3
175	2020-12-29 12:32:32.473942-08	\N	\N	link-sandbox-96f06b14-6e09-4240-891e-13d196992c28	3
176	2020-12-29 12:33:11.485576-08	\N	\N	link-sandbox-855fb42b-8413-4715-9bd8-acbfbe6acc06	3
177	2020-12-29 12:34:29.006766-08	\N	\N	link-sandbox-d79a3c67-8136-4cb8-b0f8-a2c73a286b96	3
178	2020-12-29 12:35:03.352137-08	\N	\N	link-sandbox-12e48377-9daa-4c32-b780-1ea0f7ddf7bc	3
179	2020-12-29 12:35:39.164469-08	\N	\N	link-sandbox-f1aa9713-5661-4bc6-b622-7e2f49e81df4	3
180	2020-12-29 12:36:50.307683-08	\N	\N	link-sandbox-6735cc29-92f7-442b-8c6f-050d945144d0	3
181	2020-12-29 12:37:05.535802-08	\N	\N	link-sandbox-cf800ae9-dc61-4cd5-b7aa-303895d152c6	3
182	2020-12-29 12:37:50.45876-08	\N	\N	link-sandbox-82390361-c8a7-4e88-9563-1fdc6dac074a	3
183	2020-12-29 12:38:00.934836-08	\N	\N	link-sandbox-c8b71250-0bc5-41cb-bfd1-36d3eb8c0820	3
184	2020-12-29 12:38:09.813134-08	\N	\N	link-sandbox-931737d7-c73d-45a0-90b6-26ffa568b0f8	3
185	2020-12-29 12:38:19.283733-08	\N	\N	link-sandbox-53484567-91b1-4e86-90ea-32c7214951e2	3
186	2020-12-29 12:38:22.584851-08	\N	\N	link-sandbox-51b3cf84-ebfb-4f5d-b9cf-c7c9d0127234	3
187	2020-12-29 12:38:31.219359-08	\N	\N	link-sandbox-076b4e86-dcad-49e0-aa63-9adc699d4140	3
188	2020-12-29 12:38:54.335698-08	\N	\N	link-sandbox-b4955161-6074-4251-af1f-177ff8a1ff7c	3
189	2020-12-29 12:39:21.256091-08	\N	\N	link-sandbox-0817215a-4652-4749-93d9-da457e464226	3
190	2020-12-29 12:39:34.995382-08	\N	\N	link-sandbox-0fc186a4-4e73-4383-bdf1-1ff41aecb62a	3
191	2020-12-29 12:39:45.948066-08	\N	\N	link-sandbox-af3accbe-d325-4399-baea-c6e058c73d92	3
192	2020-12-29 12:39:50.608211-08	\N	\N	link-sandbox-de43fbe1-a8e5-45c0-b387-228512755e0c	3
193	2020-12-29 12:39:58.970898-08	\N	\N	link-sandbox-ae21e671-b82c-4ef2-bda4-2527ecd3ec4a	3
194	2020-12-29 12:40:11.779826-08	\N	\N	link-sandbox-0a83e9f0-bf4a-47aa-a6ff-1cf18cbaabe0	3
195	2020-12-29 12:40:23.133492-08	\N	\N	link-sandbox-e8a641fa-6b39-49a9-a68b-54486f4d3950	3
196	2020-12-29 12:40:33.681374-08	\N	\N	link-sandbox-df7aaf82-dea1-46d4-806b-4ada6bfeecd6	3
197	2020-12-29 12:40:51.025112-08	\N	\N	link-sandbox-026f5365-3791-4674-b04b-f89f8956895c	3
198	2020-12-29 12:40:58.360259-08	\N	\N	link-sandbox-fce331ee-0392-4bd0-ba98-95c764e6ba52	3
199	2020-12-29 12:41:15.786405-08	\N	\N	link-sandbox-56ac7dc3-2e2b-43ab-a564-2544a282ed6c	3
200	2020-12-29 12:41:40.600578-08	\N	\N	link-sandbox-a9cb3fba-5821-49e5-89f5-d193d1612390	3
201	2020-12-29 12:42:02.39837-08	\N	\N	link-sandbox-efebabd1-72a8-4327-b74c-8ba6c9b3138a	3
202	2020-12-29 12:42:09.269218-08	\N	\N	link-sandbox-39d30f70-f047-4fb5-994a-058d0748e1e4	3
203	2020-12-29 12:42:19.957225-08	\N	\N	link-sandbox-18d15890-2bfa-42e7-8164-899ee4915476	3
204	2020-12-29 12:42:32.054042-08	\N	\N	link-sandbox-ba57127f-93de-4e9e-b52c-f27e5f43fd4c	3
205	2020-12-29 12:43:24.82465-08	\N	\N	link-sandbox-215ad913-6118-4cc4-be77-b2e01cf6adda	3
206	2020-12-29 12:44:14.776234-08	\N	\N	link-sandbox-678cf4c1-2152-4ebb-b583-781d8f97a9c6	3
207	2020-12-29 12:46:01.888187-08	\N	\N	link-sandbox-e59f54e4-5e4b-490a-bd1c-599460b33e0c	3
208	2020-12-29 12:47:35.356878-08	\N	\N	link-sandbox-fc3b377c-8929-404f-8ba5-f5c7ce6e7bbc	3
209	2020-12-29 12:48:28.292526-08	\N	\N	link-sandbox-1a329c73-74c5-452a-a71c-9fa6b70d5c58	3
210	2020-12-29 12:49:53.879292-08	\N	\N	link-sandbox-abbe0a6e-837b-4cac-a94f-f99f40c488be	3
211	2020-12-29 12:50:09.786548-08	\N	\N	link-sandbox-c1a8089f-c007-4cf7-a95b-85cb0e6268e4	3
212	2020-12-29 12:50:36.755682-08	\N	\N	link-sandbox-20103dd7-a4f1-4aa7-b7a3-0bd6981caa38	3
213	2020-12-29 12:50:42.221665-08	\N	\N	link-sandbox-0c1a668e-76d3-4eeb-a374-78ca367f6c92	3
214	2020-12-29 12:50:46.935839-08	\N	\N	link-sandbox-fe3592c8-a8a2-44ac-8d16-3168c815a94a	3
215	2020-12-29 12:50:51.27905-08	\N	\N	link-sandbox-fb0f7412-c541-4c18-a4fb-c65a6ec4532a	3
216	2020-12-29 12:51:02.48129-08	\N	\N	link-sandbox-cbd9e13d-5bfe-4350-be61-6fd4be0b48a4	3
217	2020-12-29 12:51:40.15989-08	\N	\N	link-sandbox-06f7c0db-7ac8-4f02-a7d0-ded45fe6edd8	3
218	2020-12-29 12:51:44.208325-08	\N	\N	link-sandbox-240c1a7f-7def-46ee-baf9-e088ff27b4be	3
219	2020-12-29 12:52:10.114636-08	\N	\N	link-sandbox-2a786576-4d16-46c8-8f08-12b4455fceb6	3
220	2020-12-29 12:52:26.707904-08	\N	\N	link-sandbox-ced2292c-ecfb-45ba-a15b-c525a2013464	3
221	2020-12-29 12:52:31.537186-08	\N	\N	link-sandbox-9fe07a36-c008-41e9-b273-9372c45252dc	3
222	2020-12-29 12:52:47.286439-08	\N	\N	link-sandbox-feb75085-4439-4f71-91ce-2270c5cadf64	3
223	2020-12-29 12:52:50.414295-08	\N	\N	link-sandbox-e06d7c26-f9a6-48cb-9165-4085cd7bfeb8	3
224	2020-12-29 12:52:53.658073-08	\N	\N	link-sandbox-ff40bea2-88d0-4ef9-8cb8-758b7d05972a	3
225	2020-12-29 12:52:56.632177-08	\N	\N	link-sandbox-d7786746-86b0-4f76-ad03-62633bbe35a0	3
226	2020-12-29 12:53:08.754882-08	\N	\N	link-sandbox-eb8e23ab-e864-4012-872f-851a17383be0	3
227	2020-12-29 12:53:16.580397-08	\N	\N	link-sandbox-728e1811-ee99-4991-8217-b90d91cc2e8c	3
228	2020-12-29 12:53:26.650661-08	\N	\N	link-sandbox-1738c67f-7c02-4a9b-b4c6-34540aac6e4e	3
229	2020-12-29 12:53:36.015415-08	\N	\N	link-sandbox-5acf86c7-b116-481f-b70d-e547faa77b66	3
230	2020-12-29 12:53:49.311406-08	\N	\N	link-sandbox-54c2fa11-4358-4611-b0d5-d33a774b528e	3
231	2020-12-29 12:53:54.799866-08	\N	\N	link-sandbox-8349bd94-5f54-4fca-bad6-f8d233c8cdae	3
232	2020-12-29 12:54:04.590066-08	\N	\N	link-sandbox-83711e6c-c93c-474f-8586-5dc04ee49818	3
233	2020-12-29 12:54:12.941017-08	\N	\N	link-sandbox-8313935e-f840-412b-bb7b-a7a5bc256596	3
234	2020-12-29 12:54:22.515885-08	\N	\N	link-sandbox-86dc8fb5-2ce0-44b2-ad3c-3377fef2d214	3
235	2020-12-29 12:54:33.522975-08	\N	\N	link-sandbox-db4cedc0-bda9-4453-a627-48cbc48db44c	3
236	2020-12-29 12:54:49.898959-08	\N	\N	link-sandbox-d2e7ac7f-47ef-4d17-913f-f6f9bc96df62	3
237	2020-12-29 12:55:02.409731-08	\N	\N	link-sandbox-e9dd47aa-f355-48c2-90d3-69fab616a0dc	3
238	2020-12-29 12:55:07.591616-08	\N	\N	link-sandbox-fc32be1f-5c8f-4457-939f-0a16af127e82	3
239	2020-12-29 12:55:24.460629-08	\N	\N	link-sandbox-e0d5629b-acec-41a5-8d3f-27eb0ccd7a02	3
240	2020-12-29 12:56:56.53527-08	\N	\N	link-sandbox-4322a04e-46af-4563-b7c2-eedbba990420	3
241	2020-12-29 12:58:32.738773-08	\N	\N	link-sandbox-d7c015ba-ea7d-4b23-aa63-2be17cf9981a	3
242	2020-12-29 12:59:06.691415-08	\N	\N	link-sandbox-b6e7400e-0b0f-4d9f-a388-e6091e8ab368	3
243	2020-12-29 12:59:47.368268-08	\N	\N	link-sandbox-34ffc882-0855-4b45-b88f-1d1788e6315a	3
244	2020-12-29 13:00:05.396834-08	\N	\N	link-sandbox-271440ed-6be3-4f76-8d03-cae1f979321e	3
245	2020-12-29 13:00:25.419682-08	\N	\N	link-sandbox-bcb43c2e-55d3-4442-911d-6c66010b9d94	3
246	2020-12-29 13:00:33.320244-08	\N	\N	link-sandbox-4a9ef792-6a4b-4f15-aa41-c8b40fc258a4	3
247	2020-12-29 13:00:58.930602-08	\N	\N	link-sandbox-215c95c8-1f6e-478e-bbcc-7bbb134fca5c	3
248	2020-12-29 13:01:12.52898-08	\N	\N	link-sandbox-2516bf99-14cf-43e2-8a25-5a6e5bfb9a1a	3
249	2020-12-29 13:01:24.001162-08	\N	\N	link-sandbox-eb8920f7-94b0-4179-91d1-7c69b1524a84	3
250	2020-12-29 13:01:33.055562-08	\N	\N	link-sandbox-6bb7ef21-901c-412b-8861-bb8c0d742906	3
251	2020-12-29 13:01:40.648727-08	\N	\N	link-sandbox-2ecbc2b8-0615-412c-9ce1-dbd2f6cef57c	3
252	2020-12-29 13:01:54.697817-08	\N	\N	link-sandbox-58c86787-26c8-47d5-bea9-44130093825c	3
253	2020-12-29 13:02:01.203995-08	\N	\N	link-sandbox-6380e186-dc9a-44ee-b6e7-d196e7044532	3
254	2020-12-29 15:11:13.440792-08	\N	\N	link-sandbox-b4d24140-4712-44d5-9328-58e4ce3a1a16	3
255	2020-12-29 15:14:15.507561-08	\N	\N	link-sandbox-5d87b484-c618-4aab-8d18-1f356671712e	3
256	2020-12-29 15:14:38.347724-08	\N	\N	link-sandbox-ebceab44-7507-4620-85e6-ac59c8dd7e3e	3
257	2020-12-29 15:15:06.543028-08	\N	\N	link-sandbox-0c8b0e2c-656b-4423-96d2-06188df4947a	3
258	2020-12-29 15:15:24.559032-08	\N	\N	link-sandbox-6551cdb6-46ce-4677-82e5-bb1908d07e08	3
259	2020-12-29 15:16:47.576491-08	\N	\N	link-sandbox-bb8d3f4f-1394-4901-adf8-0d7bc2798f4c	3
260	2020-12-29 15:16:53.352278-08	\N	\N	link-sandbox-4da23709-b47e-4a0a-aaff-bb3d709098ac	3
261	2020-12-29 15:17:06.786121-08	\N	\N	link-sandbox-5da7d4ea-09b5-4a79-8c7e-9b908adc02ca	3
262	2020-12-29 15:17:32.300213-08	\N	\N	link-sandbox-cd969f9b-2f18-48fa-ba2f-9e7c7131a26c	3
263	2020-12-29 15:17:39.852747-08	\N	\N	link-sandbox-74b5f21e-6c5f-4f7c-a102-3a33552b4c18	3
264	2020-12-29 15:18:12.322963-08	\N	\N	link-sandbox-66913b1f-0779-40f0-a884-3ee5b08a1d12	3
265	2020-12-29 15:18:21.903038-08	\N	\N	link-sandbox-65cbb225-42a9-43bb-934a-51a377efa3c0	3
266	2020-12-29 15:18:28.520281-08	\N	\N	link-sandbox-61a3acb6-9463-4c0c-87f2-c4a46ca5edb6	3
267	2020-12-29 15:19:00.764573-08	\N	\N	link-sandbox-ee5076a6-79ef-4201-a399-1cf3369c7f00	3
268	2020-12-29 15:19:15.012897-08	\N	\N	link-sandbox-3579b966-a452-4427-bf46-89ea377fc246	3
269	2020-12-29 15:19:23.959864-08	\N	\N	link-sandbox-9f531967-af3e-473a-9c86-9160d4ae0832	3
270	2020-12-29 15:19:28.564451-08	\N	\N	link-sandbox-15b0d96d-f769-44e5-991c-a2f42fd636a0	3
271	2020-12-29 15:19:37.951994-08	\N	\N	link-sandbox-047e0a1e-315e-494c-8e8f-897e24906c2c	3
272	2020-12-29 15:19:44.824743-08	\N	\N	link-sandbox-13a9254f-f64e-43b5-8367-85907cb0695a	3
273	2020-12-29 15:19:49.795235-08	\N	\N	link-sandbox-b4397a07-b466-47bb-928c-27a22d0a0726	3
274	2020-12-29 15:20:19.802052-08	\N	\N	link-sandbox-d27cf7f0-79ac-43a1-a0b8-1543c21b4fbe	3
275	2020-12-29 15:21:03.720337-08	\N	\N	link-sandbox-1189a0bc-cd00-4ef7-b3c2-aeee548dd5ba	3
276	2020-12-29 15:27:13.919662-08	\N	\N	link-sandbox-14b64564-d46f-4f4e-9f35-df7a2b64aa02	3
277	2020-12-29 15:28:06.146229-08	\N	\N	link-sandbox-67a702e2-c3bb-4ca1-828a-94fb3d3179f8	3
278	2020-12-29 15:28:31.424113-08	\N	\N	link-sandbox-23f93392-bbfa-47f2-8396-fa5445c147bc	3
279	2020-12-29 15:28:50.210948-08	\N	\N	link-sandbox-e24024c3-80f7-4c33-bef0-54285948a6b4	3
280	2020-12-29 15:29:10.107564-08	\N	\N	link-sandbox-a61d657d-ccd3-4f34-85f9-9c92f10e854a	3
281	2020-12-29 15:29:29.716373-08	\N	\N	link-sandbox-f802b679-b663-4f89-9447-fd291e3eb1b2	3
282	2020-12-29 15:29:41.647102-08	\N	\N	link-sandbox-48945bfd-3a6f-41ae-bf68-3f8f554590c0	3
283	2020-12-29 15:29:48.696162-08	\N	\N	link-sandbox-d533a7de-bffc-47c4-a5f0-58cc82e2d646	3
284	2020-12-29 15:29:56.734233-08	\N	\N	link-sandbox-fb86e7fa-d51c-4cfd-a686-706a702569a4	3
285	2020-12-29 15:30:16.41144-08	\N	\N	link-sandbox-00353c7f-88dd-4589-84f4-9ac438f2c392	3
286	2020-12-29 15:33:11.041409-08	\N	\N	link-sandbox-3761f012-becb-4e5c-8073-4b94d01d4d2c	3
287	2020-12-29 15:33:28.704703-08	\N	\N	link-sandbox-fd88652f-79f6-4dbf-9e52-6abf087a15e4	3
288	2020-12-29 15:33:43.001263-08	\N	\N	link-sandbox-9015d4f4-ee42-4c71-81ce-0d010b04f5fc	3
289	2020-12-29 15:34:34.992002-08	\N	\N	link-sandbox-471f2a7f-a8ac-4a1b-926d-4a25d1abe4c6	3
290	2020-12-29 15:37:59.476906-08	\N	\N	link-sandbox-e531f8d1-8f6b-440f-be2c-543cd08651f2	3
291	2020-12-29 15:38:50.50213-08	\N	\N	link-sandbox-74a834fa-85e4-4c13-8e53-7022e1bc5a30	3
292	2020-12-29 15:39:01.181478-08	\N	\N	link-sandbox-323bdbb6-a32b-4c25-9a16-187da4516444	3
293	2020-12-29 15:39:05.403462-08	\N	\N	link-sandbox-eedc64b6-bbf1-4c6e-9e1b-aec9414f0abc	3
294	2020-12-29 15:39:13.54002-08	\N	\N	link-sandbox-10d8a354-fa12-4f57-b432-b6b9109fefac	3
295	2020-12-29 15:40:32.118376-08	\N	\N	link-sandbox-eeb1e86c-f467-4c33-a150-965fb1915eb6	3
296	2020-12-29 15:40:44.015686-08	\N	\N	link-sandbox-3e0c5902-83ea-4812-b8a5-c61e0e3eead8	3
297	2020-12-29 15:41:28.555906-08	\N	\N	link-sandbox-3ce30ddc-02c1-40ab-b8d0-8586a8503b94	3
298	2020-12-29 15:41:55.47893-08	\N	\N	link-sandbox-cc4eda73-16d3-4eb9-b80a-8322fac1e918	3
299	2020-12-29 15:42:11.672983-08	\N	\N	link-sandbox-f69949bd-3361-4723-a513-9c0c631fc9b2	3
300	2020-12-29 15:42:59.432033-08	\N	\N	link-sandbox-555ec102-ae75-4fda-8f06-9fe2550c91a2	3
301	2020-12-29 15:43:17.534391-08	\N	\N	link-sandbox-a10ed873-5e44-4e14-be18-559ed7dbbe10	3
302	2020-12-29 15:43:27.215045-08	\N	\N	link-sandbox-0bec6c5b-5d80-44a8-b643-c92e32f8fa2e	3
303	2020-12-29 15:44:05.578047-08	\N	\N	link-sandbox-adff11a0-0b25-43bb-885e-ed9425f48ee4	3
304	2020-12-29 18:14:47.747859-08	\N	\N	link-sandbox-f82e01fa-8c48-453f-96a8-9356609e1d66	3
305	2020-12-29 18:17:54.198313-08	\N	\N	link-sandbox-b55765fc-e26c-4280-8994-c4be1fd81606	3
306	2020-12-29 18:19:20.537723-08	\N	\N	link-sandbox-dca4cc86-7439-4317-bf3e-42767475e426	3
307	2020-12-29 19:11:19.844942-08	\N	\N	link-sandbox-36cb7867-22a9-4e09-af34-5be3cddf8bb0	3
308	2020-12-29 19:16:20.677453-08	\N	\N	link-sandbox-487bbb8d-5995-4fc6-b396-fad369d4bcb6	3
309	2020-12-29 19:18:05.334178-08	\N	\N	link-sandbox-4d459e5b-9122-443b-90be-644f21aa41fe	3
310	2020-12-29 19:18:14.222179-08	\N	\N	link-sandbox-38d1424a-349b-4617-8cda-3091e1563a72	3
311	2020-12-29 19:18:25.183044-08	\N	\N	link-sandbox-b3969e9e-573b-4d2e-80b2-2c21d2e60f80	3
312	2020-12-29 19:18:36.845451-08	\N	\N	link-sandbox-30d6c962-ed8c-4459-94ba-2f5d2678669e	3
313	2020-12-29 19:19:11.997126-08	\N	\N	link-sandbox-b15c9c37-ef2a-46ed-bc43-4727f15d89cc	3
314	2020-12-29 19:19:26.509283-08	\N	\N	link-sandbox-7748cd2e-20c6-4caa-8686-5d925f18027a	3
315	2020-12-29 19:20:02.709803-08	\N	\N	link-sandbox-9fb1ed37-3cd2-4115-b2ec-9026982df376	3
316	2020-12-29 19:20:10.715119-08	\N	\N	link-sandbox-7eeb0610-d50a-411a-8e24-6ae7aba9ad1a	3
317	2020-12-29 19:20:19.489644-08	\N	\N	link-sandbox-f9018a6a-98f8-4229-a24e-de3c546731f4	3
318	2020-12-29 19:20:39.418587-08	\N	\N	link-sandbox-0460636f-2ba7-4966-9c8e-0b3880bf1f0c	3
319	2020-12-29 19:20:52.162811-08	\N	\N	link-sandbox-5950ec1f-f844-4cc1-a6f4-e946967dc4c8	3
320	2020-12-29 19:20:58.199125-08	\N	\N	link-sandbox-76dad4f5-eac7-4a06-94fa-5009c3b3a262	3
321	2020-12-29 19:21:09.16232-08	\N	\N	link-sandbox-171b394c-7c0e-4335-b40b-b5b722068a08	3
322	2020-12-29 19:21:15.755277-08	\N	\N	link-sandbox-d518ff39-da53-40d9-93af-12326d8468d4	3
323	2020-12-29 19:21:18.948668-08	\N	\N	link-sandbox-37cca438-89f6-4628-a97a-7a60e8328d98	3
324	2020-12-29 19:21:29.670565-08	\N	\N	link-sandbox-4ff2d2d9-22f8-47f0-8d39-8c5e988169d4	3
325	2020-12-29 19:21:38.262749-08	\N	\N	link-sandbox-a683486d-0a6d-4476-b1a3-bdd50041959a	3
326	2020-12-29 19:21:52.074577-08	\N	\N	link-sandbox-dfa9c8bf-5846-4f5c-bfd8-b94751ade7fc	3
327	2020-12-29 19:22:00.765231-08	\N	\N	link-sandbox-acad8c65-f1a3-4135-a560-33e2c106ac78	3
328	2020-12-29 19:22:11.389165-08	\N	\N	link-sandbox-e3fb1d59-510f-4fc5-9419-454983e0f364	3
329	2020-12-29 19:22:38.307355-08	\N	\N	link-sandbox-f4bb49fd-950b-41e8-b8b2-6842d2cb8f4c	3
330	2020-12-29 19:22:42.868932-08	\N	\N	link-sandbox-cead04e0-e672-49b7-890d-8163af03f950	3
331	2020-12-29 19:22:48.766373-08	\N	\N	link-sandbox-0107f22d-f38b-4b23-bba1-0ed75e65db10	3
332	2020-12-29 19:23:10.51303-08	\N	\N	link-sandbox-70a9402b-dd66-4938-937b-033a7dc68816	3
333	2020-12-29 19:23:15.371672-08	\N	\N	link-sandbox-98e9918b-a028-4b0d-a6f4-a7c44b64c2c8	3
334	2020-12-29 19:23:35.043314-08	\N	\N	link-sandbox-fb632d34-e50f-44c5-87aa-cfde8f4e0486	3
335	2020-12-29 19:23:50.530574-08	\N	\N	link-sandbox-779a0b8c-11e5-4657-99f3-ec2fccf1ced4	3
336	2020-12-29 19:23:57.345927-08	\N	\N	link-sandbox-9100e9b0-18b6-467d-9767-a6713196a9e0	3
337	2020-12-29 19:24:04.335155-08	\N	\N	link-sandbox-114e0ac8-b906-4c8c-ba31-8ca88da67b42	3
338	2020-12-30 12:32:49.746094-08	\N	\N	link-sandbox-a3406f4c-3983-4e64-af1e-e0a7a00ecfd6	3
339	2020-12-30 12:33:42.03849-08	\N	\N	link-sandbox-628d88cf-4c76-4ecc-8087-63e168f30f14	3
340	2020-12-30 12:50:44.881091-08	\N	\N	link-sandbox-c09b7704-c6b2-4fb7-b32f-8d7cded69b8e	3
341	2020-12-30 13:36:18.639342-08	\N	\N	link-sandbox-008e3a9c-39a6-4d60-ae19-159fb21d27e6	3
342	2020-12-30 13:45:45.583981-08	\N	\N	link-sandbox-c0868973-741a-48fa-a40c-5d9bce569872	3
343	2020-12-30 13:51:06.110081-08	\N	\N	link-sandbox-a803fe28-9196-4b0d-81ba-c5a7b81e044a	3
344	2020-12-30 14:01:47.673687-08	\N	\N	link-sandbox-e186f773-493d-4e3f-b232-a1005c6aebe8	3
345	2020-12-30 14:33:56.491403-08	\N	\N	link-sandbox-5b4df7e1-a734-4585-b9a7-e97cca0b93ae	3
346	2020-12-30 14:34:29.172354-08	\N	\N	link-sandbox-b54b4731-be66-4e32-9842-14068f4610ba	3
347	2020-12-30 14:46:48.970118-08	\N	\N	link-sandbox-570d69c5-a989-4409-a97b-5dea0168e7fa	3
348	2020-12-30 14:58:35.162525-08	\N	\N	link-sandbox-6515e327-5feb-41d2-ae6d-812d52f446d2	3
349	2020-12-30 15:01:01.353801-08	\N	\N	link-sandbox-74b464dd-e679-4a51-953c-6c81d42665d6	3
350	2020-12-30 15:18:14.083571-08	\N	\N	link-sandbox-125823d0-3f66-4b51-81ce-398c727c42e6	3
351	2020-12-30 15:43:37.032304-08	\N	\N	link-sandbox-b420a08f-ccb8-461a-925f-d548a76b181a	3
352	2020-12-30 15:43:38.792992-08	\N	\N	link-sandbox-3d8db654-cefb-4db6-9e06-1e3bd4f25cb2	3
353	2020-12-30 15:45:07.371126-08	\N	\N	link-sandbox-9a7f5273-0cad-4ffc-8efc-658b0adf791a	3
354	2020-12-30 15:46:27.346087-08	\N	\N	link-sandbox-3c84f81f-c69a-4087-ad8f-d7c28e6ce434	3
355	2020-12-30 18:31:07.984325-08	\N	\N	link-sandbox-bc163509-718c-4bb0-8d4c-b15e7d865484	3
356	2020-12-30 18:55:18.690769-08	\N	\N	link-sandbox-d4f064cf-814f-4b36-a613-832f56f50892	3
357	2020-12-31 09:08:11.412748-08	\N	\N	link-sandbox-fdb63d8d-4604-4f76-add2-3125e12c2976	3
358	2020-12-31 09:18:33.455023-08	\N	\N	link-sandbox-c4222cf7-7186-4d35-8206-9c3ca9391334	3
359	2020-12-31 09:20:29.355931-08	\N	\N	link-sandbox-ab34a26e-a159-48ee-9e34-5c7e71e8d85a	3
360	2020-12-31 09:26:15.03962-08	\N	\N	link-sandbox-16ddf7f4-2ae7-4496-961e-765d27240dd6	3
361	2020-12-31 11:33:05.971461-08	\N	\N	link-sandbox-fcfcb040-3fd5-4667-9aca-efbcc297f68e	3
362	2020-12-31 11:33:56.78582-08	\N	\N	link-sandbox-03ce9155-2901-48dd-8e4d-654225b75500	3
363	2020-12-31 11:34:04.544912-08	\N	\N	link-sandbox-cab2ec45-0b57-4f2d-9b8c-7efb0f08ad7c	3
364	2020-12-31 11:34:29.715229-08	\N	\N	link-sandbox-0e1e2cf5-f280-4e5c-9e89-e2b49700aaae	3
365	2020-12-31 11:35:12.969553-08	\N	\N	link-sandbox-80f7b104-3079-40bd-b06f-2d1cb2665aa8	3
366	2020-12-31 11:36:13.283753-08	\N	\N	link-sandbox-9c994aa6-876d-4705-a0cf-83e51d904fc8	3
367	2020-12-31 11:36:21.481519-08	\N	\N	link-sandbox-980f481f-9d29-4728-a9c2-a8be0dd0bf76	3
368	2020-12-31 11:36:31.686884-08	\N	\N	link-sandbox-3a27a567-4236-4641-b72b-d01f88fb3a64	3
369	2020-12-31 11:36:45.549304-08	\N	\N	link-sandbox-995f0a39-5137-4371-9a75-781585236b8e	3
370	2020-12-31 11:36:55.860104-08	\N	\N	link-sandbox-382a8382-5cd3-442c-9b00-92058f2b2cb4	3
371	2020-12-31 11:37:08.442815-08	\N	\N	link-sandbox-c409b490-56d7-451a-a37e-c7fb4757613e	3
372	2020-12-31 11:37:41.510786-08	\N	\N	link-sandbox-15360510-6475-4a48-b42e-ddc3579997ea	3
373	2020-12-31 11:37:54.285267-08	\N	\N	link-sandbox-6a3a4fcd-6108-4a89-92d0-85d13556068a	3
374	2020-12-31 11:38:30.807366-08	\N	\N	link-sandbox-64a60095-663e-4bcf-a1d9-af8eebbd19e0	3
375	2020-12-31 11:38:38.187122-08	\N	\N	link-sandbox-2581e99d-d8e8-4110-bd7f-7d8dcccd6a12	3
376	2020-12-31 11:39:00.163082-08	\N	\N	link-sandbox-aef5ba2f-ecbc-4561-9bd6-5334eee8a7f8	3
377	2020-12-31 11:39:19.880955-08	\N	\N	link-sandbox-fe0eb955-ec0f-434a-b914-332e1e5a917e	3
378	2020-12-31 11:39:30.507303-08	\N	\N	link-sandbox-4f7f9c1f-d929-4125-92d4-8aac3ca35560	3
379	2020-12-31 11:39:56.556776-08	\N	\N	link-sandbox-ffc49ae0-fa75-4622-bb26-cbdb3afb73c0	3
380	2020-12-31 11:40:05.688639-08	\N	\N	link-sandbox-6b632540-6de3-41fb-ae79-6c156a5617a6	3
381	2020-12-31 11:40:21.395802-08	\N	\N	link-sandbox-5d881215-4a46-4c8f-8558-a6e89925e27a	3
382	2020-12-31 11:40:25.197833-08	\N	\N	link-sandbox-3761967a-7eb4-406f-b0d8-399a83c65d44	3
383	2020-12-31 11:40:29.921544-08	\N	\N	link-sandbox-f149c9e9-23fb-461d-a140-97ea44153434	3
384	2020-12-31 11:40:36.232087-08	\N	\N	link-sandbox-93ce52f0-b32d-448f-91e7-5388e9a8d940	3
385	2020-12-31 11:40:46.167318-08	\N	\N	link-sandbox-4eb75e86-48d3-4c02-869b-5665d855606c	3
386	2020-12-31 11:40:55.306371-08	\N	\N	link-sandbox-3427360e-532b-45ac-8574-c0945af3a752	3
387	2020-12-31 11:41:01.598621-08	\N	\N	link-sandbox-89df7dc2-0792-4c6a-81b9-20017ab4161a	3
388	2020-12-31 11:41:05.804624-08	\N	\N	link-sandbox-138dce41-c579-4b0e-a44c-c628813806ce	3
389	2020-12-31 11:41:11.042058-08	\N	\N	link-sandbox-d34f803e-6340-41e1-a2e9-87e2e181f264	3
390	2020-12-31 11:41:17.404438-08	\N	\N	link-sandbox-a6984e73-e2d1-474e-8dbb-0f7ca141d6e2	3
391	2020-12-31 11:41:45.665067-08	\N	\N	link-sandbox-edb4b9f5-93df-4674-a46a-f6475945b83a	3
392	2020-12-31 11:41:49.863613-08	\N	\N	link-sandbox-772e84da-66d2-405c-a2e6-659f069105f4	3
393	2020-12-31 11:41:53.330989-08	\N	\N	link-sandbox-658b2db7-e5e8-4593-9bb1-abbca1eb13f8	3
394	2020-12-31 11:43:11.042898-08	\N	\N	link-sandbox-23356a01-ae92-4e2d-9227-b9f085f7a1fe	3
395	2020-12-31 11:43:21.832237-08	\N	\N	link-sandbox-469b2a4a-6c3a-4537-8d53-192078e736f8	3
396	2020-12-31 11:43:39.161522-08	\N	\N	link-sandbox-ea23d024-460c-44a5-b6d6-61ee5274f82c	3
397	2020-12-31 11:43:42.430706-08	\N	\N	link-sandbox-adc43d1f-8818-4a21-a0f6-a6d8a682d4c4	3
398	2020-12-31 11:44:03.92317-08	\N	\N	link-sandbox-9aa6c796-ebfe-458b-8875-614ebe973036	3
399	2020-12-31 11:44:19.380718-08	\N	\N	link-sandbox-a39580a3-e231-4f00-aea6-d20dd4f662ae	3
400	2020-12-31 11:44:30.173419-08	\N	\N	link-sandbox-371d5200-3e10-461e-a85f-58caa61991bc	3
401	2020-12-31 11:44:43.628619-08	\N	\N	link-sandbox-bb4b64b4-be82-4e8e-b2cd-9bae66c55c04	3
402	2020-12-31 11:44:50.027001-08	\N	\N	link-sandbox-5e01c3b8-43ca-4dba-9c14-d2d24782bc7e	3
403	2020-12-31 11:45:01.220644-08	\N	\N	link-sandbox-daa16079-6c01-4d2b-8440-9b15942eb41a	3
404	2020-12-31 11:45:12.762541-08	\N	\N	link-sandbox-5671deb2-24b4-4c80-95cf-cc64b347e2f0	3
405	2020-12-31 11:45:21.667543-08	\N	\N	link-sandbox-3fb9173d-e463-44e1-a4a9-e91853813394	3
406	2020-12-31 11:45:28.60968-08	\N	\N	link-sandbox-1e52ae2c-e6af-40d2-99dd-7cd208f4cdc0	3
407	2020-12-31 11:45:34.205977-08	\N	\N	link-sandbox-e4604c18-ad5e-421c-ba0c-6e8156a9d08a	3
408	2020-12-31 11:45:51.210023-08	\N	\N	link-sandbox-777bbaf7-2e61-474b-8e70-786ceac0bb46	3
409	2020-12-31 11:45:54.968225-08	\N	\N	link-sandbox-21eaaefc-7b62-4101-a648-90fbace54368	3
410	2020-12-31 11:46:13.750894-08	\N	\N	link-sandbox-4436a18d-4c87-4a43-a8ad-224330467ba4	3
411	2020-12-31 11:46:21.197628-08	\N	\N	link-sandbox-33bd9a02-f3ae-4bbd-8e06-bb78bd507916	3
412	2020-12-31 11:46:35.300453-08	\N	\N	link-sandbox-c8bf330f-44b6-45c2-8ac2-f4a24d3fcb2c	3
413	2020-12-31 11:46:51.309446-08	\N	\N	link-sandbox-ce580f84-c602-4ac0-8582-ce37c2df1426	3
414	2020-12-31 11:46:57.680268-08	\N	\N	link-sandbox-79d4e68b-f94e-4eeb-a7fb-d371cb9f3b18	3
415	2020-12-31 11:47:01.722439-08	\N	\N	link-sandbox-12a7735d-b223-439c-a1b4-230d4c9180d4	3
416	2020-12-31 11:47:10.073564-08	\N	\N	link-sandbox-ba6acae3-1cbc-40c4-8025-8cb0a9fb6468	3
417	2020-12-31 11:47:15.537871-08	\N	\N	link-sandbox-94a22694-dd8a-4357-a257-70dd93edb4b8	3
418	2020-12-31 11:47:27.131631-08	\N	\N	link-sandbox-44414dd6-0007-4c8e-8d76-342ada9eeb5c	3
419	2020-12-31 11:47:38.960976-08	\N	\N	link-sandbox-72c01f1b-0214-4ecf-985f-94d998c26734	3
420	2020-12-31 11:47:41.539178-08	\N	\N	link-sandbox-eda0031b-9f5b-4343-9aa7-9ce1dd528754	3
421	2020-12-31 11:47:51.288012-08	\N	\N	link-sandbox-21986bc2-fb2d-48f0-aff6-7e230720a08e	3
422	2020-12-31 11:47:54.428474-08	\N	\N	link-sandbox-3588be3d-08b4-402e-83c6-1facd51aae56	3
423	2020-12-31 11:47:58.064655-08	\N	\N	link-sandbox-65d9313f-5805-4bea-a7ce-45360b21c07e	3
424	2020-12-31 11:48:01.209408-08	\N	\N	link-sandbox-edb89075-29ea-4939-affe-ec7cba8cce24	3
425	2020-12-31 11:48:19.509064-08	\N	\N	link-sandbox-21e3572e-6e3e-4fd7-a23f-0a9f99d4cc7e	3
426	2020-12-31 11:48:38.989719-08	\N	\N	link-sandbox-cfec2ca8-0b7d-4297-82a2-369ce847050a	3
427	2020-12-31 11:48:45.732905-08	\N	\N	link-sandbox-27ec5b18-5d86-405a-b420-6193a77c4412	3
428	2020-12-31 11:48:53.055392-08	\N	\N	link-sandbox-e224b25b-3136-41ff-adf0-bbca7d119ec2	3
429	2020-12-31 11:49:06.570673-08	\N	\N	link-sandbox-82baf023-2c43-4276-8711-ca5cf4c2fd6c	3
430	2020-12-31 11:49:10.733251-08	\N	\N	link-sandbox-61482d5d-993f-4b9b-bc84-a67e46fa96e0	3
431	2020-12-31 11:49:22.539469-08	\N	\N	link-sandbox-1b22f36f-9dfa-4391-8a26-85de2bff89e6	3
432	2020-12-31 11:49:36.319825-08	\N	\N	link-sandbox-b6e903ad-6c71-45c9-a331-afaba610df68	3
433	2020-12-31 11:50:55.947659-08	\N	\N	link-sandbox-4fb16eb9-d39c-4582-9303-7650ff2a3a56	3
434	2020-12-31 11:51:07.278935-08	\N	\N	link-sandbox-c1921da2-3195-480e-bf7d-8d1101652c1e	3
435	2020-12-31 11:51:17.595891-08	\N	\N	link-sandbox-91645d1a-0eda-48c2-ab86-ae706fcaeac8	3
436	2020-12-31 11:51:23.887221-08	\N	\N	link-sandbox-1df7f5d8-d821-4e27-bf2a-3271b5d59458	3
437	2020-12-31 11:51:30.429694-08	\N	\N	link-sandbox-beedd9fa-f804-42ee-acbf-7353c70a9bbe	3
438	2020-12-31 11:56:05.443273-08	\N	\N	link-sandbox-366d1b48-b9b3-405d-b1c0-08a1702d4ec4	3
439	2020-12-31 11:58:25.298298-08	\N	\N	link-sandbox-45416f03-d7da-4f61-a6a6-3c489424c460	3
440	2020-12-31 12:02:46.320017-08	\N	\N	link-sandbox-f7f67cbb-dba1-45e5-9244-340ad334e950	3
441	2020-12-31 12:17:28.913173-08	\N	\N	link-sandbox-fde64bb0-0f82-42f3-97a5-b3508583319c	3
442	2020-12-31 15:44:19.358119-08	\N	\N	link-sandbox-8136b477-8657-41ae-815c-2e86e652c6ae	3
443	2020-12-31 15:48:11.567835-08	\N	\N	link-sandbox-ee69e25b-6cf8-4d8f-abc8-f8365f3ea03a	3
444	2020-12-31 15:49:20.203989-08	\N	\N	link-sandbox-8307c8ae-3b8c-428d-b544-c6b90f4ecf56	3
445	2020-12-31 15:56:32.330685-08	\N	\N	link-sandbox-acdc1f47-7a02-47e7-ac34-50582b2db512	3
446	2020-12-31 16:01:23.275235-08	\N	\N	link-sandbox-7c4c6fe2-5507-4d5d-a901-165e9738daa4	3
447	2020-12-31 16:03:48.005837-08	\N	\N	link-sandbox-bcfb7f2f-65df-40eb-a73f-2f76cf517128	3
448	2020-12-31 20:32:00.940875-08	\N	\N	link-sandbox-e37ffbaf-15a0-4dbe-b99b-e0baffc86ba4	3
449	2020-12-31 20:38:04.558141-08	\N	\N	link-sandbox-d8fd25e0-444d-4fbd-91f6-7c353d7da5c8	3
450	2020-12-31 20:48:26.985892-08	\N	\N	link-sandbox-0a5fff53-2265-4cac-a4ca-073ad0718d98	3
451	2020-12-31 20:49:12.166576-08	\N	\N	link-sandbox-b09ef33e-452e-442a-b0cb-e417499e73b2	3
452	2020-12-31 20:50:04.229858-08	\N	\N	link-sandbox-afab421f-ffcd-4587-b98f-4e6066c1e820	3
453	2020-12-31 20:50:48.564458-08	\N	\N	link-sandbox-65c4b68b-803f-4a3a-8dd1-f1ea880f5e44	3
454	2021-01-01 16:24:06.162073-08	\N	\N	link-sandbox-7870c7b2-636d-4970-b14e-6cdf3d8e4b96	3
455	2021-01-01 17:09:05.181302-08	\N	\N	link-sandbox-ea7a6929-195b-43ad-9e1e-d4242639a2d2	3
456	2021-01-01 18:44:52.090939-08	\N	\N	link-sandbox-6da11b23-2916-4989-b167-63d3842e7ec4	3
457	2021-01-02 14:22:19.562973-08	\N	\N	link-sandbox-a5455bf0-261b-4d57-83d1-8bbd62ee4df8	3
458	2021-01-02 14:31:30.50315-08	\N	\N	link-sandbox-0c09e444-3a14-44ab-bc90-58a55b9f3d34	3
459	2021-01-02 15:03:17.741634-08	\N	\N	link-sandbox-c923c5a9-29a9-4516-b9b9-b462e9d4a822	3
460	2021-01-02 15:08:48.621457-08	\N	\N	link-sandbox-0f021355-bd44-4850-a205-0ef2a0a8da2e	3
461	2021-01-02 15:22:52.15467-08	\N	\N	link-sandbox-d0c14ab3-4b22-4108-9141-4b4a92dfa54a	3
462	2021-01-02 15:36:53.686552-08	\N	\N	link-sandbox-93b7d364-deab-4905-9cb8-040eb1c48e20	3
463	2021-01-02 15:47:42.575361-08	\N	\N	link-sandbox-bf1b8ac6-c6e5-45ce-ae94-dbf5c768ccf2	3
464	2021-01-02 15:51:25.388705-08	\N	\N	link-sandbox-2058ba02-733c-4454-a64a-69bbef66792c	3
465	2021-01-02 15:53:00.270039-08	\N	\N	link-sandbox-db03981a-f130-43d6-8cd9-f928d843b0ca	3
466	2021-01-02 15:53:32.758637-08	\N	\N	link-sandbox-ecdcd770-ebb5-443d-9b88-2824fac4d208	3
467	2021-01-02 15:58:22.831632-08	\N	\N	link-sandbox-2a0a6456-5c04-477f-bb58-76d8390c33e6	3
468	2021-01-02 17:00:02.619878-08	\N	\N	link-sandbox-52b4fdd1-96ad-4144-b86b-54fb53e8bd46	13
469	2021-01-02 17:00:31.020931-08	\N	\N	link-sandbox-55637919-7840-4372-a11e-ae50eb2b487a	13
470	2021-01-02 17:01:09.363822-08	\N	\N	link-sandbox-f90aa57f-0420-4c12-b509-4fab9f6e53e8	13
471	2021-01-02 17:01:13.674182-08	\N	\N	link-sandbox-8dca01c0-5e3f-425e-b232-5998300653ca	13
472	2021-01-02 17:01:25.516001-08	\N	\N	link-sandbox-714e4081-8282-4407-8ba9-fa21905de8b4	13
473	2021-01-02 17:01:31.148945-08	\N	\N	link-sandbox-5d34cc0e-f736-4e54-826b-cc839b73dc28	13
474	2021-01-02 17:01:35.642941-08	\N	\N	link-sandbox-73897c6c-a72b-404a-a1bc-cb7e1d65eb56	13
475	2021-01-02 17:01:45.832071-08	\N	\N	link-sandbox-432592d6-9cf1-483d-bcff-0161c93bf6c2	13
476	2021-01-02 17:02:02.587278-08	\N	\N	link-sandbox-8a6dd029-a7dd-495a-910a-e1424ee67bce	13
477	2021-01-02 17:02:46.002128-08	\N	\N	link-sandbox-c5fb4ca6-3427-4c76-8906-e0dcf18c07e4	13
478	2021-01-02 17:03:03.142144-08	\N	\N	link-sandbox-ba689c44-d3ec-4b68-b325-8a4de8cb764c	13
479	2021-01-02 17:03:07.423025-08	\N	\N	link-sandbox-b986481e-c7bb-4206-b344-49be1d78f1da	13
480	2021-01-02 17:03:13.936302-08	\N	\N	link-sandbox-a2c745d9-d9da-4913-a284-6311b76938be	13
481	2021-01-02 17:03:34.239144-08	\N	\N	link-sandbox-828be583-4fa3-4164-ba84-b93043aece88	13
482	2021-01-02 17:09:37.057858-08	\N	\N	link-sandbox-dc70fe8e-5cd0-4643-a03d-63433bc539ee	3
483	2021-01-02 17:11:00.371178-08	\N	\N	link-sandbox-83592e87-7c87-43ca-aa3f-8a879955c0b0	3
484	2021-01-02 17:12:58.264886-08	\N	\N	link-sandbox-bfcb4ad6-ee05-42b1-b399-e77a9d44976e	3
485	2021-01-02 17:26:12.755612-08	\N	\N	link-sandbox-78df4269-c7ee-4866-a463-3c38ff365772	3
486	2021-01-02 17:29:12.529173-08	\N	\N	link-sandbox-5198e673-5547-4c54-8f53-a0dd31f03da2	3
487	2021-01-02 17:33:15.235317-08	\N	\N	link-sandbox-44d948e4-b624-499e-8749-de780f50553e	3
488	2021-01-02 17:35:18.973196-08	\N	\N	link-sandbox-9c8e1a99-451c-4e33-8658-a027e50be6ec	3
489	2021-01-02 17:36:52.914054-08	\N	\N	link-sandbox-4e4ae9ad-33c4-4af8-8b2f-b07ce5910ce6	3
490	2021-01-02 17:40:49.083332-08	\N	\N	link-sandbox-791d19d8-3888-45dd-bb6d-0e2056eebcb8	3
491	2021-01-02 17:55:45.120375-08	\N	\N	link-sandbox-e3a65a0e-ab4d-4e18-aecb-cceff4687396	3
492	2021-01-02 17:59:45.495972-08	\N	\N	link-sandbox-1f191b1a-b8e2-4b10-8a32-a203ba139296	3
493	2021-01-02 18:00:55.046701-08	\N	\N	link-sandbox-12ee5366-dc1e-43fb-8406-238ba8135482	3
494	2021-01-02 18:02:37.217983-08	\N	\N	link-sandbox-222d3e1c-689f-454e-a325-14b46c060660	3
495	2021-01-02 18:06:34.626942-08	\N	\N	link-sandbox-f19dfaf7-babe-4309-8af7-c6a6c80a98d2	3
496	2021-01-02 18:07:41.860951-08	\N	\N	link-sandbox-44d4ef2a-d934-4984-a509-bd5ceac2eeb8	3
497	2021-01-02 18:15:49.881758-08	\N	\N	link-sandbox-e9939d4e-a8a6-4233-9096-47aacd978fea	3
498	2021-01-02 18:16:20.245318-08	\N	\N	link-sandbox-6be5f3e8-455d-4e27-8268-1d5e8ca81a1a	3
499	2021-01-02 18:17:03.475695-08	\N	\N	link-sandbox-4b55872a-dd07-4cbb-9d0b-3dff8cbb77d4	3
500	2021-01-02 18:17:39.191295-08	\N	\N	link-sandbox-7d6e5e6e-ba54-4556-bda7-811b62778254	3
501	2021-01-02 18:26:00.727609-08	\N	\N	link-sandbox-5b2baa47-9dba-4547-9a68-bd512371f0d2	14
502	2021-01-02 18:26:20.233731-08	\N	\N	link-sandbox-c3e880d7-6b84-4bae-a043-473c4bf6c5de	14
503	2021-01-02 18:29:11.9792-08	\N	\N	link-sandbox-d9c5aa34-6101-4409-a6bc-e47d2d866426	3
504	2021-01-02 18:51:45.47268-08	\N	\N	link-sandbox-25922ff8-6b4c-4f14-ab27-04a80ab1010e	16
505	2021-01-02 18:59:46.426721-08	\N	\N	link-sandbox-f7f824b3-eb80-4126-8119-b05194bb6558	16
506	2021-01-02 19:00:14.342524-08	\N	\N	link-sandbox-ddf039c6-6dc9-4d07-8553-172bafe5c8c8	16
507	2021-01-02 19:00:20.332282-08	\N	\N	link-sandbox-0376546c-a27b-40e9-abb5-10be1321c76c	16
508	2021-01-02 19:01:05.514765-08	\N	\N	link-sandbox-8f0d4acd-3683-4726-9433-6c59d12e70ba	16
509	2021-01-02 19:01:36.209172-08	\N	\N	link-sandbox-de8aef10-5841-4ef6-80fe-c9c01950fcba	16
510	2021-01-02 19:05:33.381228-08	\N	\N	link-sandbox-35b91306-d061-4c67-9246-f9fccbd52924	16
511	2021-01-03 13:10:01.053536-08	\N	\N	link-sandbox-10d97ca1-f3b9-486a-94d8-57dc6f1b05f2	3
512	2021-01-03 13:12:49.386205-08	\N	\N	link-sandbox-0f50bb22-cdbd-4367-9660-b72179d5ed28	3
513	2021-01-03 13:14:03.806736-08	\N	\N	link-sandbox-72797141-cd03-474f-8622-cbfca6228f40	17
514	2021-01-06 16:44:09.398767-08	\N	\N	link-sandbox-dfb44a07-facb-447f-8732-32bacd39b072	3
515	2021-01-06 16:44:38.850313-08	\N	\N	link-sandbox-8d291a2b-b4eb-4b90-ae54-9b9e4b80c5d6	3
516	2021-01-06 16:47:26.841696-08	\N	\N	link-sandbox-a71504f2-6b57-4afb-9427-a74b3d94e0a2	3
517	2021-01-06 16:49:04.914573-08	\N	\N	link-sandbox-42081d05-c042-4a00-b2f0-3e8f993a1f06	3
518	2021-01-06 16:54:04.680246-08	\N	\N	link-sandbox-13347881-b690-4248-89d0-59af83cdeed4	3
519	2021-01-06 16:54:39.194736-08	\N	\N	link-sandbox-e757602d-75ad-431c-b69c-4aca6b890294	3
520	2021-01-06 16:54:58.615928-08	\N	\N	link-sandbox-8d6e2494-7f97-427a-80d6-1b2be5a22be6	3
521	2021-01-06 16:56:47.053059-08	\N	\N	link-sandbox-66a69db8-67cf-47a1-8ea7-8c78a1215246	3
522	2021-01-06 16:59:25.270963-08	\N	\N	link-sandbox-28969097-2882-45d8-8b7d-8ce17460f84c	3
523	2021-01-06 17:01:33.467433-08	\N	\N	link-sandbox-0f14a4c4-ac91-452c-8b3b-a309feac8850	3
524	2021-01-06 17:01:47.076887-08	\N	\N	link-sandbox-ce74dbba-43da-4f17-91ea-37945d54d944	3
525	2021-01-06 17:02:13.518831-08	\N	\N	link-sandbox-1c7eb40d-90b7-4067-9ed1-7f6bdff15b6a	3
526	2021-01-06 17:02:37.217447-08	\N	\N	link-sandbox-f1692eba-2adc-4b26-975c-5bb3c3e03a50	3
527	2021-01-06 17:02:49.853221-08	\N	\N	link-sandbox-ae15a702-2e34-48a6-bf32-14d88c665a26	3
528	2021-01-06 17:06:19.736408-08	\N	\N	link-sandbox-70a1632d-8a08-4ee4-96a4-9b7dd8311f4e	3
529	2021-01-06 17:06:57.705935-08	\N	\N	link-sandbox-239862ae-d1e3-47ef-b517-11ea8f11674c	3
530	2021-01-06 17:07:34.75101-08	\N	\N	link-sandbox-3758fe32-dd87-40d6-aceb-2592531714dc	3
531	2021-01-06 17:08:36.245526-08	\N	\N	link-sandbox-721efc25-346b-4ea4-a71d-cf1c0a3ed95c	3
532	2021-01-06 17:09:02.666714-08	\N	\N	link-sandbox-f612772b-af8a-4f9a-96d4-99457b0a8c54	3
533	2021-01-06 17:09:32.273458-08	\N	\N	link-sandbox-9c8082d4-f7ef-436b-9259-07befd413ae4	3
534	2021-01-06 17:09:42.322627-08	\N	\N	link-sandbox-6bd925c9-51e1-4ed3-a623-79fd0e249014	3
535	2021-01-06 17:10:02.979444-08	\N	\N	link-sandbox-a5162cef-09a4-4ecf-9859-2b8ce7c2329a	3
536	2021-01-06 17:10:13.497384-08	\N	\N	link-sandbox-7ceeeb1a-7c6e-4344-8bd7-6e6116cdfbe4	3
537	2021-01-06 17:10:23.765548-08	\N	\N	link-sandbox-f1af3489-8d24-4c55-8a6e-a2066fa4d462	3
538	2021-01-06 17:10:38.679605-08	\N	\N	link-sandbox-ce33ada8-2b02-42f9-9437-a21daf350102	3
539	2021-01-06 17:10:42.954872-08	\N	\N	link-sandbox-45f5eb32-5f6a-4d35-b4b5-b69d481d3bd8	3
540	2021-01-06 17:10:51.743622-08	\N	\N	link-sandbox-91f7bccd-967e-4b00-bcad-50235b1dd372	3
541	2021-01-06 17:11:02.4569-08	\N	\N	link-sandbox-cceddec3-9e8a-4b87-8604-aba682b8eb40	3
542	2021-01-06 17:11:28.435264-08	\N	\N	link-sandbox-a5f27119-3779-4d05-aebb-b0d1da151324	3
543	2021-01-06 17:11:48.583307-08	\N	\N	link-sandbox-4a520b3e-1296-4b03-a98d-95675d52cdb4	3
544	2021-01-06 17:12:02.994671-08	\N	\N	link-sandbox-c452f37c-ae30-49cf-8726-2717092145c4	3
545	2021-01-06 17:12:24.280366-08	\N	\N	link-sandbox-43078bd0-5a7b-496f-8d9f-844ff91b67de	3
546	2021-01-06 17:12:49.286631-08	\N	\N	link-sandbox-855b57b3-bb80-4198-84b6-9a4309b45cec	3
547	2021-01-06 17:16:47.710151-08	\N	\N	link-sandbox-6eaf068f-a856-4166-b9bb-36ad652fe43e	3
548	2021-01-06 17:19:49.188811-08	\N	\N	link-sandbox-3ab2d45d-6fe9-45c1-97ef-ce2b44edc958	3
549	2021-01-06 17:20:04.109906-08	\N	\N	link-sandbox-ac03ae1a-e659-4cba-a194-a556f85c8800	3
550	2021-01-06 17:20:22.5251-08	\N	\N	link-sandbox-5b2703e1-831e-494d-979a-21c4df0c19ca	3
551	2021-01-06 17:20:34.657108-08	\N	\N	link-sandbox-e4bba19d-423e-4831-979c-b2d215495b60	3
552	2021-01-06 17:20:43.117221-08	\N	\N	link-sandbox-9fb9ce56-3335-4465-a78d-b51e535761d2	3
553	2021-01-06 17:20:47.913878-08	\N	\N	link-sandbox-508e9a5e-1298-4467-b542-cddee71b2a80	3
554	2021-01-06 17:20:53.124407-08	\N	\N	link-sandbox-61d23799-9ee6-4577-beb4-10de63d4c59e	3
555	2021-01-06 18:30:35.518018-08	\N	\N	link-sandbox-2e4cb4b4-e43c-4144-867d-aa788feb04e8	3
556	2021-01-06 18:31:22.268138-08	\N	\N	link-sandbox-04559730-7d86-43d5-9ef1-b157bfcf0cf4	3
557	2021-01-06 18:33:33.111845-08	\N	\N	link-sandbox-9780c8e3-f1bc-436c-9c6d-03fb885f5c18	3
558	2021-01-06 18:33:50.753201-08	\N	\N	link-sandbox-1ff9a555-81e2-4259-a79a-a01ec64e5d62	3
559	2021-01-06 18:35:40.881375-08	\N	\N	link-sandbox-0f5d09bc-2c27-44c4-8144-896c646ccd04	3
560	2021-01-06 18:40:06.35145-08	\N	\N	link-sandbox-50d83c2d-d5c3-43cd-a316-c9585f2883c6	3
561	2021-01-06 19:08:42.84633-08	\N	\N	link-sandbox-bbbfbe68-15a5-4d1e-92e7-c109316746ea	3
562	2021-01-06 19:12:44.983386-08	\N	\N	link-sandbox-9a9e4c66-8f91-4b01-ab15-527dc801724c	3
563	2021-01-06 19:13:11.403049-08	\N	\N	link-sandbox-246681e8-c683-4a6a-9e2b-2f0fe3ae0c76	3
564	2021-01-06 19:14:18.12792-08	\N	\N	link-sandbox-e143c626-5449-4890-b980-3caf96c077a6	3
565	2021-01-06 19:14:28.148697-08	\N	\N	link-sandbox-6760239b-7c30-4793-88f7-265599e35c1a	3
566	2021-01-06 19:14:45.170488-08	\N	\N	link-sandbox-68f3e8d8-70f4-4335-8f0d-5b871951264c	3
567	2021-01-06 19:14:54.679306-08	\N	\N	link-sandbox-4cdd7820-a4e9-47cd-a0cc-0171c47ea406	3
568	2021-01-06 19:15:03.129679-08	\N	\N	link-sandbox-2075bd3c-c87a-424f-aa8f-ba79ab68e686	3
569	2021-01-06 19:34:13.564649-08	\N	\N	link-sandbox-9880fa7c-5b52-40ef-934b-2c08991a1192	3
570	2021-01-06 21:34:34.94232-08	\N	\N	link-sandbox-05922d7f-0d8d-4cb9-b8bc-ca9fa6dccc6c	3
571	2021-01-07 09:43:27.791345-08	\N	\N	link-sandbox-d93e670d-077b-4787-9454-e07726c2fe9e	3
572	2021-01-07 09:44:30.562128-08	\N	\N	link-sandbox-2bcace19-2d1a-4ec4-94ca-b509cfc41a3a	3
573	2021-01-07 09:45:44.872533-08	\N	\N	link-sandbox-0cfea233-a8e3-4973-8d71-c40d6059bff8	3
574	2021-01-07 09:45:49.515999-08	\N	\N	link-sandbox-9ce41ed5-b2d6-4ac8-8c1c-01ebd9c59c6c	3
575	2021-01-07 13:18:10.950014-08	\N	\N	link-sandbox-05dc4457-9d1f-4f0e-9974-9e23cc64b6f2	3
576	2021-01-07 16:58:37.103789-08	\N	\N	link-sandbox-0e9ad0c5-56b8-4cab-85f9-b12f5dd4daba	3
577	2021-01-07 17:04:04.563325-08	\N	\N	link-sandbox-500bd0a6-2549-4021-8c88-da7d6ebc45cc	3
578	2021-01-07 17:04:40.649334-08	\N	\N	link-sandbox-e39e17da-0c98-41d4-b112-7182785c01b4	3
579	2021-01-07 17:06:05.121969-08	\N	\N	link-sandbox-d5b8a8c2-4a82-470b-aa8b-e3f346490356	3
580	2021-01-07 17:06:23.590149-08	\N	\N	link-sandbox-427e94a2-b4d7-453f-98aa-4c59149075da	3
581	2021-01-07 17:06:40.000611-08	\N	\N	link-sandbox-68731595-3ba7-4123-b906-b3ef3f3eb7f8	3
582	2021-01-07 17:07:17.773861-08	\N	\N	link-sandbox-1a93b23a-5eb6-4c53-bb21-f0e4d0115778	3
583	2021-01-07 17:09:05.937922-08	\N	\N	link-sandbox-372a8622-a2e0-4419-bed7-e8eef755fbb4	3
584	2021-01-07 17:10:04.18718-08	\N	\N	link-sandbox-02ee641c-3db9-49d9-8da4-1b331d7fc59c	3
585	2021-01-07 17:10:14.957181-08	\N	\N	link-sandbox-b2864753-9ca1-435c-b475-26cf0b634b58	3
586	2021-01-07 17:10:26.241976-08	\N	\N	link-sandbox-1e6d3d01-13fc-464e-9239-ea63db34bd42	3
587	2021-01-07 17:10:39.147629-08	\N	\N	link-sandbox-d4636dab-b3fa-4c34-8e8a-621f33465706	3
588	2021-01-07 17:10:59.970014-08	\N	\N	link-sandbox-e4af8477-8fde-4bec-86d0-d6ab3a80d5a4	3
589	2021-01-07 17:12:08.836512-08	\N	\N	link-sandbox-2ef3e662-c132-4d6e-ae53-90db58db618e	3
590	2021-01-07 17:12:20.536016-08	\N	\N	link-sandbox-cfda427b-dc0b-44ac-8a82-903cdee13872	3
591	2021-01-07 17:12:28.010629-08	\N	\N	link-sandbox-82d36da9-2dfa-490c-b449-d41424d83a18	3
592	2021-01-07 17:12:45.98006-08	\N	\N	link-sandbox-98a95181-ac54-4c95-ba30-d49044f24748	3
593	2021-01-07 17:12:53.140084-08	\N	\N	link-sandbox-9edc1eb8-601b-4ee3-88b4-276cee6ecb3e	3
594	2021-01-07 17:13:02.001656-08	\N	\N	link-sandbox-eebb1b53-5ab7-4618-92b7-692705e5373a	3
595	2021-01-07 17:13:24.30706-08	\N	\N	link-sandbox-a2281a95-3d25-4047-ac9e-8269978498de	3
596	2021-01-07 17:13:31.705234-08	\N	\N	link-sandbox-99722c6b-a624-40ac-8ef8-c0e1ecd3b5c4	3
597	2021-01-07 17:13:43.721732-08	\N	\N	link-sandbox-9aa50750-3599-4003-9804-0aba815054f8	3
598	2021-01-07 17:13:52.353013-08	\N	\N	link-sandbox-f328421b-2a3d-4fad-b662-7971e12dc3f6	3
599	2021-01-07 17:14:05.142375-08	\N	\N	link-sandbox-a0066380-ca00-4416-a488-39e8d690e6fe	3
600	2021-01-07 17:14:13.671988-08	\N	\N	link-sandbox-5054387b-deba-4ca1-a185-bd5a0b7758f0	3
601	2021-01-07 17:22:28.361023-08	\N	\N	link-sandbox-1d311ccb-cdbb-4f9d-a58d-4355b5d86fc6	3
602	2021-01-07 17:23:39.808551-08	\N	\N	link-sandbox-a51b12fd-d624-47cd-9eea-401f1388d07e	3
603	2021-01-07 17:24:43.02071-08	\N	\N	link-sandbox-b8ecab23-3b26-4b1e-ba79-1acdd2a79a26	3
604	2021-01-07 17:26:30.731794-08	\N	\N	link-sandbox-5abe7f60-f8d4-4dc1-a98b-58187578b7a6	3
605	2021-01-07 17:30:26.115749-08	\N	\N	link-sandbox-1d5b0984-8c84-404c-b605-2e0968eadc36	3
606	2021-01-07 17:39:09.21634-08	\N	\N	link-sandbox-352a9557-84ba-4927-aa6a-de5306787f6c	3
607	2021-01-07 19:43:12.02201-08	\N	\N	link-sandbox-300fc355-2313-4b13-bc2a-64afeaeb0520	3
608	2021-01-07 19:55:48.782235-08	\N	\N	link-sandbox-2f9ebd28-76d5-4648-9bda-c12fe291bf50	3
609	2021-01-09 10:58:23.239304-08	\N	\N	link-sandbox-2eccf24b-52c2-4964-8332-6961e8e8ece0	3
610	2021-01-09 19:39:57.496817-08	\N	\N	link-sandbox-75ac222e-b2bd-46b5-a928-e6cf55a63cf0	3
611	2021-01-09 19:42:59.504551-08	\N	\N	link-sandbox-96daa0c2-36f3-400d-8e4d-fa394223e3c0	3
612	2021-01-09 19:44:31.229116-08	\N	\N	link-sandbox-57087efd-c1b2-42cf-ae85-56cbcea0a4f8	3
613	2021-01-09 20:37:09.500968-08	\N	\N	link-sandbox-3db1f4ee-fe5e-4d2d-95c9-3cd1a2524fae	3
614	2021-01-10 13:29:34.704164-08	\N	\N	link-sandbox-1840b081-fe0f-4c32-ae72-01f266a8b35a	3
615	2021-01-10 13:29:37.654669-08	\N	\N	link-sandbox-ae9d3535-9931-4a66-bdfb-13b9b1b8eb5a	3
616	2021-01-10 13:38:41.832721-08	\N	\N	link-sandbox-76d603d3-d17b-4778-9100-c52fa403b3f2	3
617	2021-01-10 13:43:17.061045-08	\N	\N	link-sandbox-2e343d2b-8b0d-44ce-a9ce-d4b6d2d951f6	3
618	2021-01-10 13:43:20.033815-08	\N	\N	link-sandbox-cfa1c6db-4bac-4fee-9769-ad5dc1bbd6ec	3
619	2021-01-10 13:57:29.85568-08	\N	\N	link-sandbox-f1a01e62-0140-4b01-9443-62c5171bba92	3
620	2021-01-10 13:57:58.87433-08	\N	\N	link-sandbox-ce58a5c9-59e4-4142-8d51-43c73b9c9226	3
621	2021-01-10 13:58:44.957484-08	\N	\N	link-sandbox-0106490f-bd9a-421f-8c58-7b5879459b70	3
622	2021-01-10 13:59:10.3448-08	\N	\N	link-sandbox-5a126f2d-11d6-454a-8a5d-106df04e7a5a	3
623	2021-01-10 14:03:32.580786-08	\N	\N	link-sandbox-17b75f7b-1120-4c00-925b-b77b8d9aa322	3
624	2021-01-10 14:03:53.011531-08	\N	\N	link-sandbox-2024637c-60eb-49e1-9160-82274d0f332e	3
625	2021-01-10 14:04:29.6411-08	\N	\N	link-sandbox-a31743a7-bc57-413f-8801-3765dff56d66	3
626	2021-01-10 14:04:37.969942-08	\N	\N	link-sandbox-57c1320a-0da9-408b-bd89-6c1351209ea4	3
627	2021-01-10 14:05:07.798448-08	\N	\N	link-sandbox-16d9fa42-2999-4825-ac43-15a94d4e5e1e	3
628	2021-01-10 14:06:02.415254-08	\N	\N	link-sandbox-bbdc5716-2687-4821-9164-a18449740c90	3
629	2021-01-10 14:06:19.470564-08	\N	\N	link-sandbox-a28852ca-78db-4bbe-a9cb-68d2f6dc5624	3
630	2021-01-10 14:06:51.618276-08	\N	\N	link-sandbox-981f6d93-4b46-4da8-9aa3-b9d9a7124f32	3
631	2021-01-10 14:07:26.289246-08	\N	\N	link-sandbox-941dc7f2-34ff-4070-8e68-87055c4d0cd2	3
632	2021-01-10 14:07:48.781083-08	\N	\N	link-sandbox-da3811ce-5d2c-4541-b401-2f922d1130b6	3
633	2021-01-10 14:08:11.076298-08	\N	\N	link-sandbox-776faa9d-7a26-48f8-a5ee-60a910a8c1fe	3
634	2021-01-10 14:08:26.797902-08	\N	\N	link-sandbox-168cd00f-2569-4d67-b343-1403e1881652	3
635	2021-01-10 14:09:15.591756-08	\N	\N	link-sandbox-74298f9d-2e3f-41de-94ae-a6057ab5a584	3
636	2021-01-10 14:09:24.83324-08	\N	\N	link-sandbox-b92fcefe-7e04-45ed-b7b5-ed7bef1f9fa2	3
637	2021-01-10 14:09:42.871087-08	\N	\N	link-sandbox-0022475e-6954-47ef-81e8-1e90d01e4256	3
638	2021-01-10 14:09:57.065792-08	\N	\N	link-sandbox-ae1d80cf-6009-4bc2-a3cc-bd3b1fa2a1b2	3
639	2021-01-10 14:09:57.918439-08	\N	\N	link-sandbox-359a3417-812a-4620-a2b7-b18725a3f4c8	3
640	2021-01-10 14:09:58.86097-08	\N	\N	link-sandbox-9eb19363-5196-4473-beda-582d714f9bac	3
641	2021-01-10 14:15:10.134983-08	\N	\N	link-sandbox-40131903-be0d-47ca-b98c-5219ca07d548	3
642	2021-01-10 14:15:30.086388-08	\N	\N	link-sandbox-322fbc94-7989-40c0-93b5-6ad2850b1d6a	3
643	2021-01-10 14:16:00.036495-08	\N	\N	link-sandbox-287912a8-14ed-49d8-a01e-d5bbc6fede5a	3
644	2021-01-10 14:20:55.882152-08	\N	\N	link-sandbox-a7be26dc-f6de-4700-98a1-6102fea67da6	3
645	2021-01-10 14:30:08.147133-08	\N	\N	link-sandbox-77ee547d-9df6-40b0-a179-0fdb598b7878	3
646	2021-01-10 14:37:05.120113-08	\N	\N	link-sandbox-0bce60f3-a8d8-4bc3-ba90-6c31425a6796	3
647	2021-01-10 14:37:33.037422-08	\N	\N	link-sandbox-d183cba5-0e01-43d2-a901-6d9d1373865a	3
648	2021-01-10 14:38:47.832573-08	\N	\N	link-sandbox-51521d4d-63ee-4282-815e-85895af434d6	3
649	2021-01-10 14:39:11.328435-08	\N	\N	link-sandbox-743574f4-1361-4429-ab23-9b16f19d7c5a	3
650	2021-01-10 14:39:16.979426-08	\N	\N	link-sandbox-40715ef8-10bb-49af-95bc-c77e591f333e	3
651	2021-01-10 14:45:15.375853-08	\N	\N	link-sandbox-2f2453d7-6c4c-45b0-abad-c06e63321562	3
652	2021-01-10 14:45:59.512013-08	\N	\N	link-sandbox-47fdcab5-5221-4f97-ac67-de275ede0bf6	3
653	2021-01-10 14:47:37.431218-08	\N	\N	link-sandbox-e4093f31-db50-41a4-9fef-0a65b9b86198	3
654	2021-01-10 14:47:58.420627-08	\N	\N	link-sandbox-5739401d-471a-4d6c-af6a-9d373e4f7a64	3
655	2021-01-10 14:48:17.761092-08	\N	\N	link-sandbox-34a69f30-dfaf-49d8-83c0-af046f892986	3
656	2021-01-10 14:48:33.574071-08	\N	\N	link-sandbox-46c1c895-c5c1-4d1c-992e-cf1dcd5fa21a	3
657	2021-01-10 14:48:50.029292-08	\N	\N	link-sandbox-460a53ec-6835-42f4-8f76-022ebe68940a	3
658	2021-01-10 14:49:41.391525-08	\N	\N	link-sandbox-5039b969-de62-4ea1-b34c-fd83427ab9d0	3
659	2021-01-10 14:49:48.683583-08	\N	\N	link-sandbox-87cb0aaf-00d2-4d04-87f3-5fa2250ce07a	3
660	2021-01-10 14:50:24.683384-08	\N	\N	link-sandbox-b81e3a3b-f0c5-4c8c-aa28-a2e5e07a4c46	3
661	2021-01-10 14:50:37.725942-08	\N	\N	link-sandbox-c0488064-8b8a-4f12-8aa6-ea13e4113368	3
662	2021-01-10 14:50:45.260733-08	\N	\N	link-sandbox-8f1850ea-d53f-4fb9-a1d1-30aa6daa47c8	3
663	2021-01-10 14:50:49.402089-08	\N	\N	link-sandbox-fde59eba-1340-41c5-8ca2-932e298d6a6c	3
664	2021-01-10 14:51:05.441739-08	\N	\N	link-sandbox-e0f11389-dd46-4a36-8f0d-6977eb58aca4	3
665	2021-01-10 14:51:10.89279-08	\N	\N	link-sandbox-59f0fcc7-355c-41c1-83f2-8b371dd9ef32	3
666	2021-01-10 14:51:16.306118-08	\N	\N	link-sandbox-9fa7bedd-0e24-4032-96e5-a61eeb7744ce	3
667	2021-01-10 14:51:31.879624-08	\N	\N	link-sandbox-9fe4e1f5-a209-457e-90bb-fa4b4bac6e00	3
668	2021-01-10 14:51:35.949334-08	\N	\N	link-sandbox-320b4e1a-105d-473c-a89e-2406a2bdd734	3
669	2021-01-10 14:51:58.168978-08	\N	\N	link-sandbox-86889eb2-79f3-4155-ac7d-2ec4177020da	3
670	2021-01-10 14:52:10.069735-08	\N	\N	link-sandbox-225421c8-87c8-4e69-93c5-f12a1b516c7c	3
671	2021-01-10 14:52:19.759689-08	\N	\N	link-sandbox-f9df2f6f-dda5-42b8-9ce4-44382c22fc48	3
672	2021-01-10 14:52:29.125448-08	\N	\N	link-sandbox-baea06d8-6950-4c78-87ca-a15e66267f2c	3
673	2021-01-10 14:56:38.628934-08	\N	\N	link-sandbox-8317ec99-bdf2-463f-8225-1c1618aaf900	3
674	2021-01-10 14:57:00.366121-08	\N	\N	link-sandbox-a2b6cf98-17a0-4cd8-b004-9a1459738adc	3
675	2021-01-10 14:57:05.656974-08	\N	\N	link-sandbox-8288f6e5-d383-436c-8264-51816318d37e	3
676	2021-01-10 14:57:09.623188-08	\N	\N	link-sandbox-d3ef6663-4abc-450e-8890-5e8d6ccd5000	3
677	2021-01-10 14:57:16.132824-08	\N	\N	link-sandbox-7b7548d8-df3f-4e91-a8c3-cfc5557429f8	3
678	2021-01-10 14:57:57.491468-08	\N	\N	link-sandbox-5d6cbae7-d417-4f76-a74c-ea4191389d5a	3
679	2021-01-10 14:58:01.501536-08	\N	\N	link-sandbox-04649b4a-4b56-4ba2-af3f-92ceb85a03e4	3
680	2021-01-10 14:58:11.718953-08	\N	\N	link-sandbox-a05b3e76-5dde-41b3-be46-303770fe332a	3
681	2021-01-10 14:58:17.20608-08	\N	\N	link-sandbox-2adb22fd-2abd-4ba3-99eb-e213fbfd71b2	3
682	2021-01-10 14:58:49.164156-08	\N	\N	link-sandbox-75d70ae8-c53d-45a5-8707-12106464cca6	3
683	2021-01-10 14:58:53.223861-08	\N	\N	link-sandbox-ebc511e4-7c5c-4244-8bd4-21b6ca8c8ffc	3
684	2021-01-10 14:58:57.150372-08	\N	\N	link-sandbox-5ac613c5-7923-4ea2-a447-3a2ab312aa16	3
685	2021-01-10 14:59:04.041022-08	\N	\N	link-sandbox-b09d5dad-b4a9-48b9-910e-387bc4efb2de	3
686	2021-01-10 14:59:46.508228-08	\N	\N	link-sandbox-b23ebc0c-3661-4d3a-a24e-c16d8295862a	3
687	2021-01-10 15:02:09.271357-08	\N	\N	link-sandbox-b391b1e9-bdb6-4472-9e0c-d0083ee6a1ae	3
688	2021-01-10 15:02:33.513759-08	\N	\N	link-sandbox-01e72861-01ee-41b3-b03d-c76bde57235a	3
689	2021-01-10 15:02:44.919243-08	\N	\N	link-sandbox-82bee131-2e8b-4611-a5fd-2085bedaa7dc	3
690	2021-01-10 15:03:37.764392-08	\N	\N	link-sandbox-1c93b89e-8e91-4e02-8ef8-3c1ce1bd1a4e	3
691	2021-01-10 15:03:47.079086-08	\N	\N	link-sandbox-1d24a441-7e6b-44a0-930b-5f764b45079e	3
692	2021-01-10 15:04:08.702613-08	\N	\N	link-sandbox-45d35356-db19-43a3-9f1f-e42b69ddcd8c	3
693	2021-01-10 15:04:17.986784-08	\N	\N	link-sandbox-4141a4b9-95fd-4e30-8628-d0cf3927164c	3
694	2021-01-10 15:06:57.292166-08	\N	\N	link-sandbox-9fc98988-157f-481a-8405-bf4ad66a41ee	3
695	2021-01-10 15:07:03.868576-08	\N	\N	link-sandbox-558e7235-95b8-4332-948c-99f6714f2348	3
696	2021-01-10 15:07:10.820259-08	\N	\N	link-sandbox-3d1d0acc-381c-4ce9-a9d4-88a8c41475d8	3
697	2021-01-10 15:07:29.439456-08	\N	\N	link-sandbox-1da37964-b3ab-4803-9571-641fb9e25838	3
698	2021-01-10 15:07:37.926847-08	\N	\N	link-sandbox-188a3bf8-4b09-45ca-8e31-ebc7ca4c0b4a	3
699	2021-01-10 15:07:44.730961-08	\N	\N	link-sandbox-a0a5e8bf-efd1-48bc-b437-865484691bd4	3
700	2021-01-10 15:07:53.643298-08	\N	\N	link-sandbox-6b958efb-9e3a-4f53-b1d3-2e94f1fe2c84	3
701	2021-01-10 15:08:04.755651-08	\N	\N	link-sandbox-cfd7e8ef-10e3-4e2e-b445-5366b9ff52aa	3
702	2021-01-10 15:08:11.508221-08	\N	\N	link-sandbox-ffe40500-9301-4225-a51c-6357c6bd29be	3
703	2021-01-10 15:08:39.015258-08	\N	\N	link-sandbox-b25a6718-0cfe-434f-9c44-514887a8487e	3
704	2021-01-10 15:10:04.1459-08	\N	\N	link-sandbox-c9847f75-385b-427c-9ed0-44264051ad04	3
705	2021-01-10 15:13:58.125635-08	\N	\N	link-sandbox-34439c01-dde5-43a6-be18-c6c93d4d1fb0	3
706	2021-01-10 15:14:46.358676-08	\N	\N	link-sandbox-b377b596-fe04-44c4-8b3c-a70ba87c7982	3
707	2021-01-10 15:15:46.388774-08	\N	\N	link-sandbox-3e7f15bd-b504-4d35-b708-6c011f62a378	3
708	2021-01-10 16:46:20.90554-08	\N	\N	link-sandbox-53ac335a-bb6d-44db-bf52-f9765544ceec	3
709	2021-01-10 16:46:44.27193-08	\N	\N	link-sandbox-204fa392-437a-4ece-8e99-4f9018fc3b30	3
710	2021-01-10 16:50:20.464565-08	\N	\N	link-sandbox-3fd81385-a5c2-49a6-afd2-a9019f0cdbf2	3
711	2021-01-10 16:51:30.902267-08	\N	\N	link-sandbox-b748bbd2-1975-444b-aa40-b3936346873e	3
\.


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.links (id, created_at, updated_at, deleted_at, public_token, institution_name, institution_id, accounts, link_session_id, access_token, item_id, user_id, active) FROM stdin;
28	2021-01-10 15:15:00.877899-08	\N	\N	public-sandbox-6aa7c6fe-dd5c-45b5-b460-4dbe67807baf	Bank of America	ins_1	[{"id": "rMJy9J31LQu3AWgjKQQ8sDR8yrdM79ulRmv5m", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "zWmx9m7V48SkmG6VE88BUyGEzQ6mgdSobjGv6", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}]	df77241a-f4bc-4839-a491-6402eee981d4	access-sandbox-705b71d5-7421-4c2e-925d-0ac6c04a3b35	Aznbpne6lgiZQGBJzyyxSdnKeMjBXrF9jQwBr	3	1
29	2021-01-10 16:51:53.028124-08	\N	\N	public-sandbox-0f4b1f17-d2aa-4244-8aa1-8c175e236fbe	SunTrust - Online Banking	ins_16	[{"id": "6xJeEPqz55syZNPGQorPUWzpP3Nbd8cgPexve", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "XqpgWMda66sKEydkMgndU8Anz5a6EBcdvLxov", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}]	ab31db3c-d822-4c4a-b2bd-1972dcc2fa19	access-sandbox-27436c4b-7757-4237-a2d3-5a76453df057	1Kr4ExRG55cPjb8dXRk8sxp1q9wlpGcp3NEed	3	1
27	2021-01-02 19:01:30.699965-08	\N	\N	public-sandbox-37bb3d2a-9d16-4b24-855d-ef42dd3e5bb9	Wells Fargo	ins_4	[{"id": "jz8q6ZBdjeSEepdyWgBdS35XxwDXAzi1mAZLa", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "7k9MNQ7j6JI3g95XJxm5hv1NP7yNBefgypMnB", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}]	929fdaca-47df-4327-9b08-d1a797bfdea0	access-sandbox-beb708a1-646d-46ab-9084-ab558c4306bd	BX3nWlE84qUoMxAzgGBASweve4o18wu4AoRQM	16	1
20	2020-12-29 15:12:23.038254-08	\N	\N	public-sandbox-aa6558cf-09a0-44ec-9ccf-40c2d93ffa2c	Wells Fargo	ins_4	[{"id": "ylB69B74qAUlgm9QNedwCJXp4nLQk7Cy8vgP7", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "9nBoWBzPrGUdWJNMrbLPFaoPr1Kw4nSR9JKod", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}]	87c83faf-6a28-4cb8-a48a-f3edd6b6d02e	access-sandbox-49340899-ff4a-4ae7-9c4b-bf6fdda47464	3gmZVmR31QtvmBNKkAe3skLrxEGax4FZM45dz	3	0
19	2020-12-29 15:11:46.591123-08	\N	\N	public-sandbox-9f4bfccb-94b2-4e8a-8420-05640c325c83	Capital One	ins_9	[{"id": "WWZN9ZM4ZKS1DLya1P8RsPzWNk33l1ClQENz1", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "AzgNmgV9gqTzpdD3zG56sXbAKv77VyF1xPVNP", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}]	634b8f43-0ec8-434b-814c-93643bd39997	access-sandbox-a1f900f3-f00c-4f83-82db-d119354085b1	oejE7jDLjxSRP3n6Rx9lUPG1KkQlbJuok6GJA	3	1
\.


--
-- Data for Name: logins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logins (id, created_at, updated_at, deleted_at, ip_address, user_id, user_agent) FROM stdin;
1	2020-12-06 16:51:21.340858-08	\N	\N	127.0.0.1	1	\N
2	2020-12-28 13:24:44.316621-08	\N	\N	127.0.0.1	3	PostmanRuntime/7.26.8
3	2020-12-28 13:25:08.243534-08	\N	\N	127.0.0.1	3	PostmanRuntime/7.26.8
4	2020-12-28 15:04:40.206917-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
5	2020-12-28 15:05:32.905375-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
6	2020-12-28 20:45:35.61435-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
7	2020-12-28 20:59:18.087574-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
8	2020-12-28 21:00:10.182129-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
9	2020-12-28 21:00:53.595382-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
10	2020-12-29 09:33:21.82062-08	\N	\N	192.168.1.97	4	grabbit/1 CFNetwork/1206 Darwin/20.1.0
11	2020-12-29 09:34:00.349352-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
12	2020-12-29 09:35:13.384634-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
13	2020-12-29 09:37:21.086557-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
14	2020-12-29 09:41:17.469284-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
15	2020-12-29 09:42:50.509808-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
16	2020-12-29 09:44:10.013921-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
17	2020-12-29 09:44:48.224479-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
18	2020-12-29 09:48:10.018786-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
19	2020-12-29 09:49:38.766515-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
20	2020-12-29 09:52:29.330912-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
21	2020-12-29 09:54:19.526973-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
22	2020-12-29 09:54:56.642478-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
23	2020-12-29 09:55:32.17692-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
24	2020-12-29 09:57:24.090369-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
25	2020-12-29 10:30:37.031141-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
26	2020-12-29 10:34:01.559017-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
27	2020-12-29 10:38:29.348851-08	\N	\N	192.168.1.97	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
28	2021-01-01 14:33:01.94778-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
29	2021-01-01 16:18:30.886753-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
30	2021-01-01 16:20:06.676467-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
31	2021-01-01 16:23:55.295493-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
32	2021-01-01 17:09:02.076741-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
33	2021-01-01 18:44:47.249219-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
34	2021-01-02 14:21:51.945716-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
35	2021-01-02 14:22:16.916373-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
36	2021-01-02 14:30:11.646833-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
37	2021-01-02 14:31:28.548304-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
38	2021-01-02 14:39:49.153927-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
39	2021-01-02 15:01:13.487551-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
40	2021-01-02 15:03:15.164672-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
41	2021-01-02 15:18:35.590995-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
42	2021-01-02 15:32:48.548604-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
43	2021-01-02 15:36:49.193889-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
44	2021-01-02 15:39:29.14495-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
45	2021-01-02 15:40:59.286547-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
46	2021-01-02 15:46:00.390262-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
47	2021-01-02 15:47:23.862289-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
48	2021-01-02 15:49:35.466315-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
49	2021-01-02 15:51:23.004238-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
50	2021-01-02 17:29:09.87248-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
51	2021-01-02 17:29:45.357145-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
52	2021-01-02 17:33:48.150619-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
53	2021-01-02 17:35:07.067242-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
54	2021-01-02 17:36:31.012004-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
55	2021-01-02 17:36:50.528131-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
56	2021-01-02 17:37:43.628621-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
57	2021-01-02 17:38:18.418716-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
58	2021-01-02 17:39:46.07264-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
59	2021-01-02 17:39:53.939612-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
60	2021-01-02 18:07:20.439711-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
61	2021-01-02 18:08:14.439783-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
62	2021-01-02 18:10:26.807115-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
63	2021-01-02 18:14:29.152208-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
64	2021-01-02 18:15:03.990978-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
65	2021-01-02 18:29:05.602269-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
66	2021-01-02 18:54:45.66232-08	\N	\N	192.168.1.87	16	grabbit/1 CFNetwork/1206 Darwin/19.6.0
67	2021-01-02 18:56:38.49249-08	\N	\N	192.168.1.87	16	grabbit/1 CFNetwork/1206 Darwin/19.6.0
68	2021-01-02 18:56:58.71537-08	\N	\N	192.168.1.87	16	grabbit/1 CFNetwork/1206 Darwin/19.6.0
69	2021-01-02 19:05:24.919446-08	\N	\N	192.168.1.87	16	grabbit/1 CFNetwork/1206 Darwin/19.6.0
70	2021-01-03 13:02:45.728066-08	\N	\N	127.0.0.1	3	PostmanRuntime/7.26.8
71	2021-01-03 13:09:55.173193-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
72	2021-01-03 13:11:09.180417-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
73	2021-01-05 20:56:22.43439-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
74	2021-01-09 10:59:01.547801-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
75	2021-01-09 10:59:31.60669-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
76	2021-01-09 16:26:27.473882-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
77	2021-01-10 16:48:24.047185-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
78	2021-01-10 16:48:52.855068-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
79	2021-01-10 16:49:27.636535-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
80	2021-01-10 16:49:47.712004-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
81	2021-01-10 16:50:12.754932-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
82	2021-01-10 16:51:19.061384-08	\N	\N	192.168.1.99	3	grabbit/1 CFNetwork/1206 Darwin/20.1.0
83	2021-01-10 17:07:45.508469-08	\N	\N	192.168.1.87	3	grabbit/1 CFNetwork/1206 Darwin/19.6.0
\.


--
-- Data for Name: merchants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.merchants (id, created_at, updated_at, deleted_at, name, industry, keywords, alternative_name, image_url, invitation_code, primary_color) FROM stdin;
1	2020-12-06 16:22:42.279634-08	\N	\N	Ava Corporation Inc.	"Retail"	["clothing", "shopping", "retail", "ecommerce"]	\N	\N	\N	#88888
5	2020-12-28 15:57:20.133045-08	\N	\N	Supreme	["Apparel", "Clothing", "Brand", "Streetwear", "Luxury"]	["supreme", "street", "brand", "apparel", "clothing", "retail", "hip", "young"]	Vivandi Group, LLC	https://ak.picdn.net/shutterstock/videos/1032859976/thumb/10.jpg	6YQK-3E9Y	#CF0F0F
4	2020-12-28 15:25:22.437937-08	\N	\N	Nike	["Apparel", "Clothing", "Brand", "Athletics"]	["nike", "brand", "athliesure", "apparel", "clothing", "retail", "modern", "sports"]	Nike Coporation, LLC	https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg	6YQK-3E9Y	#000
3	2020-12-06 16:34:07.306478-08	\N	\N	Nike	["Apparel", "Clothing", "Brand", "Athletics"]	["nike", "brand", "athliesure", "apparel", "clothing", "retail", "modern", "sports"]	Nike Coporation, LLC	https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg	6YQK-3E9Y	#000
\.


--
-- Data for Name: merchants_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.merchants_users (id, merchant_id, user_id) FROM stdin;
1	3	1
2	1	2
3	1	1
4	4	3
5	5	3
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, created_at, updated_at, deleted_at, text, expiry, user_id, icon, seen_at, route_key, metadata, title) FROM stdin;
4	2020-12-29 09:33:13.626998-08	\N	\N	Welcome to Grabbit!	\N	4	user	\N	\N	{}	Untitled
1	2020-12-28 12:22:56.911447-08	\N	\N	Welcome to Bingo!	\N	1	user	\N	\N	{}	Untitled
59	2021-01-10 15:29:32.665754-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-11 00:47:05.745175	settings	{}	Profile Update
62	2021-01-10 15:29:35.255166-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-11 00:47:05.745175	settings	{}	Profile Update
65	2021-01-10 16:51:53.032515-08	\N	\N	Your new SunTrust - Online Banking account is now live on Grabbit!	\N	3	credit-card	2021-01-11 00:52:05.354869	plaidAccounts	{"instance": {"id": 29, "active": 1, "accounts": [{"id": "6xJeEPqz55syZNPGQorPUWzpP3Nbd8cgPexve", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "XqpgWMda66sKEydkMgndU8Anz5a6EBcdvLxov", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}], "created_at": "2021-01-11T00:51:53.028124Z", "deleted_at": null, "updated_at": null, "public_token": "public-sandbox-0f4b1f17-d2aa-4244-8aa1-8c175e236fbe", "institution_id": "ins_16", "link_session_id": "ab31db3c-d822-4c4a-b2bd-1972dcc2fa19", "institution_name": "SunTrust - Online Banking"}}	New Account Link
3	2020-12-28 12:49:15.392691-08	\N	\N	Welcome to Grabbit!	\N	3	user	2021-01-03 02:29:08.919323	\N	{}	Untitled
5	2020-12-31 11:33:33.653792-08	\N	\N	Your new Fidelity account is now live on Grabbit!	\N	3	credit-card	2021-01-03 02:29:08.919326	linkAccount	{"instance": {"id": 24, "active": 1, "accounts": [{"id": "BGvn6j5mQrhJEbvkrBWQSKkPeG1eVwCwxmyWj", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "3jL7pRvNqQIPRqzl6BwZiM95vPbvmduqV4JrE", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}], "created_at": "2020-12-31T19:33:33.651085Z", "deleted_at": null, "updated_at": null, "public_token": "public-sandbox-59339fb9-f60b-4dbd-bcd4-f4b33b9e4c88", "institution_id": "ins_12", "link_session_id": "4f7aac15-6336-41b0-95c5-138e5566cae0", "institution_name": "Fidelity"}}	Untitled
44	2021-01-07 19:47:43.041955-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
47	2021-01-10 13:38:45.642724-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
50	2021-01-10 13:38:48.228193-08	\N	\N	We've updated your Wells Fargo account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
53	2021-01-10 13:58:17.996704-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
56	2021-01-10 14:46:59.931439-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	plaidAccounts	{}	Account updated
17	2021-01-02 16:58:25.445164-08	\N	\N	Welcome to Grabbit!	\N	13	user	2021-01-03 01:03:40.436656	\N	{}	Untitled
14	2021-01-02 16:50:14.949267-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-03 02:29:08.919327	settings	{}	Untitled
15	2021-01-02 16:50:20.219234-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-03 02:29:08.919329	settings	{}	Untitled
16	2021-01-02 16:54:34.777347-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-03 02:29:08.919333	settings	{}	Untitled
19	2021-01-02 17:14:25.085688-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-03 02:29:08.919335	settings	{}	Untitled
20	2021-01-02 17:33:08.799314-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-03 02:29:08.919336	settings	{}	Untitled
60	2021-01-10 15:29:33.761623-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-11 00:47:05.745175	settings	{}	Profile Update
63	2021-01-10 16:51:32.639801-08	\N	\N	We've updated your Bank of America account	\N	3	toggle-right	2021-01-11 00:52:05.354869	plaidAccounts	{}	Account updated
66	2021-01-10 16:52:00.571339-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-11 00:52:05.354869	settings	{}	Profile Update
45	2021-01-09 20:37:11.711477-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
48	2021-01-10 13:38:46.412735-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
51	2021-01-10 13:58:02.845649-08	\N	\N	We've updated your Chase account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
54	2021-01-10 13:59:04.301555-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
57	2021-01-10 14:47:00.557794-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	plaidAccounts	{}	Account updated
61	2021-01-10 15:29:34.712857-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-11 00:47:05.745175	settings	{}	Profile Update
18	2021-01-02 17:13:53.008903-08	\N	\N	Your new Chase account is now live on Grabbit!	\N	3	credit-card	2021-01-03 02:29:08.919345	linkAccount	{"instance": {"id": 25, "active": 1, "accounts": [{"id": "qrm45LpmD9Sd7jBpxDpLHE4J31axELSdP7e4q", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "Kqe3w19edZSMo7Xwybw8U6KPqDAB6XcVkAl4B", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}], "created_at": "2021-01-03T01:13:53.004769Z", "deleted_at": null, "updated_at": null, "public_token": "public-sandbox-cf2d3b6d-3f13-474b-9c16-d4fc086d6d13", "institution_id": "ins_3", "link_session_id": "6dfd9443-c2c7-41d5-b503-62949a09e7d1", "institution_name": "Chase"}}	Untitled
64	2021-01-10 16:51:33.434125-08	\N	\N	We've updated your Bank of America account	\N	3	toggle-right	2021-01-11 00:52:05.354869	plaidAccounts	{}	Account updated
67	2021-01-10 16:52:01.4127-08	\N	\N	You've updated your profile settings	\N	3	unlock	2021-01-11 00:52:05.354869	settings	{}	Profile Update
43	2021-01-07 19:47:39.792186-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
46	2021-01-09 20:37:12.727305-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
49	2021-01-10 13:38:47.665715-08	\N	\N	We've updated your Wells Fargo account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
52	2021-01-10 13:58:03.634966-08	\N	\N	We've updated your Chase account	\N	3	toggle-right	2021-01-10 23:23:38.275244	linkAccount	{}	Account updated
55	2021-01-10 14:46:58.441224-08	\N	\N	We've updated your Capital One account	\N	3	toggle-right	2021-01-10 23:23:38.275244	plaidAccounts	{}	Account updated
58	2021-01-10 15:15:00.88389-08	\N	\N	Your new Bank of America account is now live on Grabbit!	\N	3	credit-card	2021-01-10 23:23:38.275244	plaidAccounts	{"instance": {"id": 28, "active": 1, "accounts": [{"id": "rMJy9J31LQu3AWgjKQQ8sDR8yrdM79ulRmv5m", "mask": "0000", "name": "Plaid Checking", "type": "depository", "subtype": "checking", "verification_status": ""}, {"id": "zWmx9m7V48SkmG6VE88BUyGEzQ6mgdSobjGv6", "mask": "1111", "name": "Plaid Saving", "type": "depository", "subtype": "savings", "verification_status": ""}], "created_at": "2021-01-10T23:15:00.877899Z", "deleted_at": null, "updated_at": null, "public_token": "public-sandbox-6aa7c6fe-dd5c-45b5-b460-4dbe67807baf", "institution_id": "ins_1", "link_session_id": "df77241a-f4bc-4839-a491-6402eee981d4", "institution_name": "Bank of America"}}	New Account Link
\.


--
-- Data for Name: reward_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reward_codes (id, created_at, updated_at, deleted_at, code, value, is_active, campaign_id, created_by_user_id, description) FROM stdin;
1	2020-12-28 15:45:08.492833-08	\N	\N	NIKE-XREF	"0.1"	0	3	3	10% off select purchases of White Air Force 1's Unlimited Edition
2	2020-12-28 15:45:45.808837-08	\N	\N	NIKE-AB45	"0.2"	0	3	3	20% off your next purchase of Nike SwimFit wear
3	2020-12-28 15:46:10.757611-08	\N	\N	NIKE-EFFE	"0.5"	0	3	3	50% off any item when you purchase a Nike Elite Fit Jacket or similar item
4	2020-12-28 15:59:58.413333-08	\N	\N	NIKE-XREF	"0.1"	0	4	3	10% off select purchases of White Air Force 1's Unlimited Edition
5	2020-12-28 16:00:08.39753-08	\N	\N	NIKE-AB45	"0.2"	0	4	3	20% off your next purchase of Nike SwimFit wear
6	2020-12-28 16:00:18.660018-08	\N	\N	NIKE-EFFE	"0.5"	0	4	3	50% off any item when you purchase a Nike Elite Fit Jacket or similar item
7	2020-12-28 16:02:52.686148-08	\N	\N	SUPR-XREF	"0.1"	0	5	3	10% off select purchases of Supreme Brands leggings
8	2020-12-28 16:03:11.10087-08	\N	\N	SUPR-XREF	"0.35"	0	5	3	35% off select purchases of Supreme Brands leggings with purchase of another order
9	2020-12-28 16:03:32.097289-08	\N	\N	SUPR-XXDD	"0.2"	0	5	3	20% off select purchases of Supreme Brands underwears with purchase of another order
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rewards (id, created_at, updated_at, deleted_at, code_id, expiry, is_active, qr_code_url, redeemed_at, owner_user_id) FROM stdin;
1	2020-12-28 00:00:00-08	\N	\N	1	2021-02-07 00:00:00-08	1	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	\N	3
2	2020-12-28 00:00:00-08	\N	\N	3	2021-02-07 00:00:00-08	1	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	\N	3
3	2020-12-28 00:00:00-08	\N	\N	7	2021-02-07 00:00:00-08	1	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	\N	3
4	2020-12-28 00:00:00-08	\N	\N	8	2021-02-07 00:00:00-08	1	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	\N	3
5	2020-12-28 00:00:00-08	\N	\N	2	2020-12-29 00:00:00-08	1	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	\N	3
6	2020-12-28 00:00:00-08	\N	\N	2	2020-12-12 00:00:00-08	0	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	2020-12-11 00:00:00-08	3
7	2020-12-31 00:00:00-08	\N	\N	8	2020-03-01 00:00:00-08	1	https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png	\N	3
\.


--
-- Data for Name: scraper_stats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.scraper_stats (id, created_at, updated_at, deleted_at, metadata, name) FROM stdin;
1	2021-01-10 15:52:30.181359-08	\N	\N	{"queue": 1, "max_tasks": 10, "total_tasks": 0, "failed_tasks": 0, "duplicate_tasks": 0, "successful_tasks": 0, "unsuccessful_tasks": 0}	https://target.com
\.


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.settings (id, created_at, updated_at, deleted_at, keywords, user_id, targeting_enabled) FROM stdin;
2	2021-01-02 18:51:36.561299-08	\N	\N	[]	16	1
3	2021-01-03 13:14:01.722244-08	\N	\N	[]	17	1
0	2020-12-28 16:03:32.097289-08	\N	\N	["Travel", "Athletics", "Sports", "Luxury", "Small shop"]	3	1
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
-- Data for Name: user_deals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_deals (id, created_at, updated_at, deleted_at, deal_id, user_id) FROM stdin;
7	2021-01-08 05:23:28.816849-08	\N	\N	122	3
8	2021-01-08 05:23:28.816849-08	\N	\N	133	3
9	2021-01-08 05:23:28.816849-08	\N	\N	134	3
10	2021-01-08 05:23:28.816849-08	\N	\N	135	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, created_at, updated_at, deleted_at, email, name, username, phone, secret, salt, current_session_token, qr_code_url) FROM stdin;
1	2020-12-06 16:21:33.521762-08	\N	\N	ava@gmail.com	Ava Campo	ava	+1 555-555-5555	fa0fa5b0738a6a033e146de660211331463e56f32852e92d19641bd4a74c4daf	711211	319a80a21e02e87bb4c1d983f01c6097c0de9ddbd329a1a27cfa40b94a959eb8	
2	2020-12-06 16:35:12.831301-08	\N	\N	ambie@gmail.com	Ambie Bambi	ambie	+1 555-555-5555	007448330a2330c1e5a8c2622dc598c3f295631fd0f8160bbcc726eada66d39a	340620	9fcaa0635821e7c36c3044f0df5df05a64f4f06f356c563bc4b4cab74126748b	
18	2020-01-11 12:49:15.378923-08	\N	\N	engineering@grabbithq.com	Grabbit Engineering Admin	engineering	213-222-7624	d80f8fcf8567bd11454b4e9e1ecfa13a0a42f4256c3cdd0ca097ff8c52b92189	1648	e4cb7fb537446f3736461884dbf4662a1b9556a9743a3085296aa40ae17994d1	
4	2020-12-29 09:33:13.607876-08	\N	\N	admin@grabbithq.com	Grabbit Admin	grabbit	x	a4bad49c971a1cfe243b14c5dc478367ea8ffb02c33ea85321030dc0bc84415e	16091	9341f5a97a51e43db51bf36a5f8a9cd3f90f85ef825dde25a024147c54a3a57c	
3	2020-12-28 12:49:15.378923-08	\N	\N	rashad.a.alston@gmail.com	Rashad Alston	ralston	213-222-7624	7b391456adf568ed086fad50856aa1104888a83f5f99c8195a89d6ec37237110	297529	8f710063cffbe962bcf51aec432aff687acd027e41e52589b63bda1ae9903048	
13	2021-01-02 16:58:25.441119-08	\N	\N	foo@gmail.com	James Brown	foobar	293-484-9484	46ede19b750febdd6ab6f46b5dfad9ae16854209796de65a76fa8fa7830ddd2d	679368	18b7ed5165c9a16fcedb30455394807fb6e99efb3800a24adb671f8a8d7665b3	
14	2021-01-02 18:21:23.629843-08	\N	\N	james@gmail.com	James Dean	james	393-444-4331	ad333c071dff544fcc7622a63a7efcadb2e8160beded6a28b0aba737bac4410f	445582	83d4d6bab4ed8e3e7e8c8c74de5ea2e2be97e6c62b352444e4dc7bf682ac3d30	
15	2021-01-02 18:50:47.480201-08	\N	\N	dean@gmail.com	James Dean	james	747-847-9349	5bf6f93d31fae1aec48adc906b707067a6d3c5895e6948cd6c0dad7061f1eb6e	397845	c7a9f49967ff8d47380d6b1704c8b7b1d6aa06cf79b3ac803294a7893de65d61	
16	2021-01-02 18:51:36.556749-08	\N	\N	bar@gmail.com	AJ Johnson	foo	847-848-8484	172d92af1358e6c0ed3662326e2f344ba75ee76a95c587dec16a0a69297b7b51	646293	a843ca67809d763d009487ea3f9625119db45fbf527fe6bb114619f6b77c1f27	
17	2021-01-03 13:14:01.716504-08	\N	\N	james@gmaill.com	James Dean	@jamesdean	677-948-8477	9acc4c35e5b515c523a18d865b12b8f8c71b4b46a0784aa6dbf2f4ac1081b283	832728	7e2d21fb0192983aa8f176707102072247734d3ebd69365fef822c0797dfe739	
\.


--
-- Name: campaigns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.campaigns_id_seq', 5, true);


--
-- Name: deals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.deals_id_seq', 142, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 57, true);


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.links_id_seq', 29, true);


--
-- Name: logins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logins_id_seq', 83, true);


--
-- Name: merchants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.merchants_id_seq', 5, true);


--
-- Name: merchants_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.merchants_users_id_seq', 5, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 67, true);


--
-- Name: plaid_local_linktoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plaid_local_linktoken_id_seq', 711, true);


--
-- Name: reward_codes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reward_codes_id_seq', 9, true);


--
-- Name: rewards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rewards_id_seq', 1, false);


--
-- Name: scraper_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.scraper_stats_id_seq', 1, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.settings_id_seq', 3, true);


--
-- Name: transaction_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_tasks_id_seq', 1, false);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- Name: user_deals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_deals_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 17, true);


--
-- Name: campaigns campaigns_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.campaigns
    ADD CONSTRAINT campaigns_pkey PRIMARY KEY (id);


--
-- Name: deals deals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deals
    ADD CONSTRAINT deals_pkey PRIMARY KEY (id);


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
-- Name: scraper_stats scraper_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.scraper_stats
    ADD CONSTRAINT scraper_stats_pkey PRIMARY KEY (id);


--
-- Name: settings settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


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
-- Name: user_deals user_deals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_deals
    ADD CONSTRAINT user_deals_pkey PRIMARY KEY (id);


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
-- Name: rewards_code_id_8a1c10f4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_code_id_8a1c10f4 ON public.rewards USING btree (code_id);


--
-- Name: rewards_owner_user_id_6866c826; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_owner_user_id_6866c826 ON public.rewards USING btree (owner_user_id);


--
-- Name: settings_user_id_3e68408b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX settings_user_id_3e68408b ON public.settings USING btree (user_id);


--
-- Name: transaction_tasks_user_id_bb5079ea; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transaction_tasks_user_id_bb5079ea ON public.transaction_tasks USING btree (user_id);


--
-- Name: transactions_user_id_766cc893; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX transactions_user_id_766cc893 ON public.transactions USING btree (user_id);


--
-- Name: user_deals_deal_id_36026759; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_deals_deal_id_36026759 ON public.user_deals USING btree (deal_id);


--
-- Name: user_deals_user_id_5c6331aa; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_deals_user_id_5c6331aa ON public.user_deals USING btree (user_id);


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
-- Name: settings settings_user_id_3e68408b_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.settings
    ADD CONSTRAINT settings_user_id_3e68408b_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


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
-- Name: user_deals user_deals_deal_id_36026759_fk_deals_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_deals
    ADD CONSTRAINT user_deals_deal_id_36026759_fk_deals_id FOREIGN KEY (deal_id) REFERENCES public.deals(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_deals user_deals_user_id_5c6331aa_fk_users_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_deals
    ADD CONSTRAINT user_deals_user_id_5c6331aa_fk_users_id FOREIGN KEY (user_id) REFERENCES public.users(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

