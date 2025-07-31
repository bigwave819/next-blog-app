ALTER TABLE "sessions" DROP CONSTRAINT "sessions_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "sessions" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "sessions" ADD COLUMN "user_id" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;