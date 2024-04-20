--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 16.2

-- Started on 2024-04-20 17:42:32

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
-- TOC entry 223 (class 1259 OID 81921)
-- Name: account; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.account (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL
);


ALTER TABLE public.account OWNER TO "default";

--
-- TOC entry 222 (class 1259 OID 81920)
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_id_seq OWNER TO "default";

--
-- TOC entry 2594 (class 0 OID 0)
-- Dependencies: 222
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.account.id;


--
-- TOC entry 215 (class 1259 OID 24577)
-- Name: employee; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    name character varying(255),
    pin smallint,
    profilepictureurl character varying(255),
    plannedwork interval DEFAULT '40:00:00'::interval,
    fleksitid_balance interval DEFAULT '00:00:00'::interval,
    balance interval
);


ALTER TABLE public.employee OWNER TO "default";

--
-- TOC entry 214 (class 1259 OID 24576)
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employee_id_seq OWNER TO "default";

--
-- TOC entry 2595 (class 0 OID 0)
-- Dependencies: 214
-- Name: employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;


--
-- TOC entry 221 (class 1259 OID 57349)
-- Name: fleksitidbank; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.fleksitidbank (
    id integer NOT NULL,
    employee_id integer,
    checkin timestamp with time zone,
    checkout timestamp with time zone,
    workinterval interval,
    overtimeinterval interval
);


ALTER TABLE public.fleksitidbank OWNER TO "default";

--
-- TOC entry 220 (class 1259 OID 57348)
-- Name: fleksitidbank_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.fleksitidbank_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fleksitidbank_id_seq OWNER TO "default";

--
-- TOC entry 2596 (class 0 OID 0)
-- Dependencies: 220
-- Name: fleksitidbank_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.fleksitidbank_id_seq OWNED BY public.fleksitidbank.id;


--
-- TOC entry 225 (class 1259 OID 131073)
-- Name: log; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.log (
    id integer NOT NULL,
    event_type character varying(50) NOT NULL,
    event_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    account_id integer,
    ip_address character varying(50),
    details text
);


ALTER TABLE public.log OWNER TO "default";

--
-- TOC entry 217 (class 1259 OID 32837)
-- Name: shift; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.shift (
    id integer NOT NULL,
    description character varying(255),
    start timestamp without time zone NOT NULL,
    "end" timestamp without time zone NOT NULL
);


ALTER TABLE public.shift OWNER TO "default";

--
-- TOC entry 219 (class 1259 OID 32844)
-- Name: shift_employee; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.shift_employee (
    id integer NOT NULL,
    shift_id integer NOT NULL,
    employee_id integer NOT NULL
);


ALTER TABLE public.shift_employee OWNER TO "default";

--
-- TOC entry 218 (class 1259 OID 32843)
-- Name: shift_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.shift_employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shift_employee_id_seq OWNER TO "default";

--
-- TOC entry 2597 (class 0 OID 0)
-- Dependencies: 218
-- Name: shift_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.shift_employee_id_seq OWNED BY public.shift_employee.id;


--
-- TOC entry 216 (class 1259 OID 32836)
-- Name: shift_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.shift_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shift_id_seq OWNER TO "default";

--
-- TOC entry 2598 (class 0 OID 0)
-- Dependencies: 216
-- Name: shift_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.shift_id_seq OWNED BY public.shift.id;


--
-- TOC entry 224 (class 1259 OID 131072)
-- Name: stemplingsklokke_log_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.stemplingsklokke_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.stemplingsklokke_log_id_seq OWNER TO "default";

--
-- TOC entry 2599 (class 0 OID 0)
-- Dependencies: 224
-- Name: stemplingsklokke_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.stemplingsklokke_log_id_seq OWNED BY public.log.id;


--
-- TOC entry 2424 (class 2604 OID 81924)
-- Name: account id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.account ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- TOC entry 2418 (class 2604 OID 24580)
-- Name: employee id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);


--
-- TOC entry 2423 (class 2604 OID 57352)
-- Name: fleksitidbank id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.fleksitidbank ALTER COLUMN id SET DEFAULT nextval('public.fleksitidbank_id_seq'::regclass);


--
-- TOC entry 2425 (class 2604 OID 131076)
-- Name: log id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.stemplingsklokke_log_id_seq'::regclass);


--
-- TOC entry 2421 (class 2604 OID 32840)
-- Name: shift id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.shift ALTER COLUMN id SET DEFAULT nextval('public.shift_id_seq'::regclass);


--
-- TOC entry 2422 (class 2604 OID 32847)
-- Name: shift_employee id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.shift_employee ALTER COLUMN id SET DEFAULT nextval('public.shift_employee_id_seq'::regclass);


--
-- TOC entry 2438 (class 2606 OID 81930)
-- Name: account accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- TOC entry 2440 (class 2606 OID 81928)
-- Name: account accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 2428 (class 2606 OID 24584)
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);


--
-- TOC entry 2434 (class 2606 OID 57357)
-- Name: fleksitidbank fleksitidbank_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.fleksitidbank
    ADD CONSTRAINT fleksitidbank_pkey PRIMARY KEY (id);


--
-- TOC entry 2432 (class 2606 OID 32849)
-- Name: shift_employee shift_employee_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.shift_employee
    ADD CONSTRAINT shift_employee_pkey PRIMARY KEY (id);


--
-- TOC entry 2430 (class 2606 OID 32842)
-- Name: shift shift_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.shift
    ADD CONSTRAINT shift_pkey PRIMARY KEY (id);


--
-- TOC entry 2442 (class 2606 OID 131081)
-- Name: log stemplingsklokke_log_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT stemplingsklokke_log_pkey PRIMARY KEY (id);


--
-- TOC entry 2436 (class 2606 OID 57359)
-- Name: fleksitidbank unique_checkin_checkout; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.fleksitidbank
    ADD CONSTRAINT unique_checkin_checkout UNIQUE (checkin, checkout);


--
-- TOC entry 2446 (class 2606 OID 131082)
-- Name: log fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.account(id);


--
-- TOC entry 2445 (class 2606 OID 57360)
-- Name: fleksitidbank fleksitidbank_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.fleksitidbank
    ADD CONSTRAINT fleksitidbank_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employee(id);


--
-- TOC entry 2443 (class 2606 OID 32855)
-- Name: shift_employee shift_employee_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.shift_employee
    ADD CONSTRAINT shift_employee_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employee(id) ON DELETE CASCADE;


--
-- TOC entry 2444 (class 2606 OID 32850)
-- Name: shift_employee shift_employee_shift_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.shift_employee
    ADD CONSTRAINT shift_employee_shift_id_fkey FOREIGN KEY (shift_id) REFERENCES public.shift(id) ON DELETE CASCADE;


--
-- TOC entry 2061 (class 826 OID 122881)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2060 (class 826 OID 122880)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2024-04-20 17:42:34

--
-- PostgreSQL database dump complete
--

