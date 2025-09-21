
\restrict XaOrSRYkZCagD9Bdxr5ZbgVRbc8T4uDdrrzYPqgXwPZu0Go9RqeIrcZO0Hhl7rV


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


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."ProfileType" AS ENUM (
    'GUEST',
    'USER'
);


ALTER TYPE "public"."ProfileType" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."CardOffer" (
    "id" "text" NOT NULL,
    "cardId" "text" NOT NULL,
    "userCardId" "text" NOT NULL,
    "offerId" "text" NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE "public"."CardOffer" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Offer" (
    "id" "text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "categories" "jsonb" NOT NULL,
    "region" "text",
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "baseRate" double precision,
    "bonusRate" double precision,
    "capPerMonth" integer,
    "minSpend" integer,
    "source" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "meta" "jsonb"
);


ALTER TABLE "public"."Offer" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."Profile" (
    "id" "text" NOT NULL,
    "type" "public"."ProfileType" DEFAULT 'GUEST'::"public"."ProfileType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."Profile" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."UserCard" (
    "id" "text" NOT NULL,
    "profileId" "text" NOT NULL,
    "cardId" "text" NOT NULL,
    "nickname" "text",
    "last4" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "meta" "jsonb"
);


ALTER TABLE "public"."UserCard" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";


ALTER TABLE ONLY "public"."CardOffer"
    ADD CONSTRAINT "CardOffer_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Offer"
    ADD CONSTRAINT "Offer_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."UserCard"
    ADD CONSTRAINT "UserCard_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");



CREATE INDEX "CardOffer_offerId_idx" ON "public"."CardOffer" USING "btree" ("offerId");



CREATE INDEX "CardOffer_userCardId_idx" ON "public"."CardOffer" USING "btree" ("userCardId");



CREATE UNIQUE INDEX "CardOffer_userCardId_offerId_key" ON "public"."CardOffer" USING "btree" ("userCardId", "offerId");



CREATE INDEX "UserCard_cardId_idx" ON "public"."UserCard" USING "btree" ("cardId");



CREATE INDEX "UserCard_profileId_idx" ON "public"."UserCard" USING "btree" ("profileId");



ALTER TABLE ONLY "public"."CardOffer"
    ADD CONSTRAINT "CardOffer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "public"."Offer"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."CardOffer"
    ADD CONSTRAINT "CardOffer_userCardId_fkey" FOREIGN KEY ("userCardId") REFERENCES "public"."UserCard"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."UserCard"
    ADD CONSTRAINT "UserCard_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



CREATE POLICY "Allow all operations" ON "public"."Profile" USING (true) WITH CHECK (true);



ALTER TABLE "public"."CardOffer" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Offer" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."Profile" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."UserCard" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT ALL ON SCHEMA "public" TO "prisma";








































































































































































GRANT ALL ON TABLE "public"."CardOffer" TO "anon";
GRANT ALL ON TABLE "public"."CardOffer" TO "authenticated";
GRANT ALL ON TABLE "public"."CardOffer" TO "service_role";
GRANT ALL ON TABLE "public"."CardOffer" TO "prisma";



GRANT ALL ON TABLE "public"."Offer" TO "anon";
GRANT ALL ON TABLE "public"."Offer" TO "authenticated";
GRANT ALL ON TABLE "public"."Offer" TO "service_role";
GRANT ALL ON TABLE "public"."Offer" TO "prisma";



GRANT ALL ON TABLE "public"."Profile" TO "anon";
GRANT ALL ON TABLE "public"."Profile" TO "authenticated";
GRANT ALL ON TABLE "public"."Profile" TO "service_role";
GRANT ALL ON TABLE "public"."Profile" TO "prisma";



GRANT ALL ON TABLE "public"."UserCard" TO "anon";
GRANT ALL ON TABLE "public"."UserCard" TO "authenticated";
GRANT ALL ON TABLE "public"."UserCard" TO "service_role";
GRANT ALL ON TABLE "public"."UserCard" TO "prisma";



GRANT ALL ON TABLE "public"."_prisma_migrations" TO "anon";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "authenticated";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "service_role";
GRANT ALL ON TABLE "public"."_prisma_migrations" TO "prisma";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "prisma";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "prisma";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "prisma";






























\unrestrict XaOrSRYkZCagD9Bdxr5ZbgVRbc8T4uDdrrzYPqgXwPZu0Go9RqeIrcZO0Hhl7rV

RESET ALL;
