CREATE TYPE "public"."destination_kind" AS ENUM('security', 'margin_paydown', 'cash');--> statement-breakpoint
CREATE TYPE "public"."move_direction" AS ENUM('into', 'out_of');--> statement-breakpoint
CREATE TYPE "public"."move_status" AS ENUM('pending', 'done', 'skipped');--> statement-breakpoint
CREATE TYPE "public"."plan_status" AS ENUM('draft', 'candidate', 'active', 'completed', 'abandoned');--> statement-breakpoint
CREATE TABLE "destination" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"kind" "destination_kind" NOT NULL,
	"security_id" uuid,
	CONSTRAINT "destination_security_matches_kind" CHECK (("destination"."kind" = 'security') = ("destination"."security_id" is not null))
);
--> statement-breakpoint
CREATE TABLE "move" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_id" uuid NOT NULL,
	"sequence" integer NOT NULL,
	"direction" "move_direction" NOT NULL,
	"destination_id" uuid NOT NULL,
	"amount" numeric(19, 4) NOT NULL,
	"earliest_at" timestamp with time zone,
	"depends_on_move_id" uuid,
	"status" "move_status" DEFAULT 'pending' NOT NULL,
	"executed_at" timestamp with time zone,
	CONSTRAINT "move_plan_sequence_unique" UNIQUE("plan_id","sequence"),
	CONSTRAINT "move_amount_positive" CHECK ("move"."amount" > 0),
	CONSTRAINT "move_no_self_dependency" CHECK ("move"."depends_on_move_id" is null or "move"."depends_on_move_id" <> "move"."id"),
	CONSTRAINT "move_executed_when_done" CHECK (("move"."status" = 'done') = ("move"."executed_at" is not null))
);
--> statement-breakpoint
CREATE TABLE "plan" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"status" "plan_status" DEFAULT 'draft' NOT NULL,
	"accepted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "plan_active_was_accepted" CHECK ("plan"."status" <> 'active' or "plan"."accepted_at" is not null)
);
--> statement-breakpoint
CREATE TABLE "allocation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"target_id" uuid NOT NULL,
	"destination_id" uuid NOT NULL,
	"weight" numeric(12, 8) NOT NULL,
	CONSTRAINT "allocation_target_destination_unique" UNIQUE("target_id","destination_id"),
	CONSTRAINT "allocation_weight_range" CHECK ("allocation"."weight" between 0 and 1)
);
--> statement-breakpoint
CREATE TABLE "target" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plan_id" uuid NOT NULL,
	"max_ltv" numeric(12, 8),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "target_plan_unique" UNIQUE("plan_id"),
	CONSTRAINT "target_max_ltv_range" CHECK ("target"."max_ltv" between 0 and 1)
);
--> statement-breakpoint
ALTER TABLE "destination" ADD CONSTRAINT "destination_security_id_security_id_fk" FOREIGN KEY ("security_id") REFERENCES "public"."security"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move" ADD CONSTRAINT "move_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move" ADD CONSTRAINT "move_destination_id_destination_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destination"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "move" ADD CONSTRAINT "move_depends_on_move_id_move_id_fk" FOREIGN KEY ("depends_on_move_id") REFERENCES "public"."move"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_target_id_target_id_fk" FOREIGN KEY ("target_id") REFERENCES "public"."target"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_destination_id_destination_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destination"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "target" ADD CONSTRAINT "target_plan_id_plan_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plan"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "destination_security_unique" ON "destination" USING btree ("security_id");--> statement-breakpoint
CREATE UNIQUE INDEX "destination_singleton_kind_unique" ON "destination" USING btree ("kind") WHERE "destination"."kind" <> 'security';--> statement-breakpoint
CREATE UNIQUE INDEX "plan_single_active" ON "plan" USING btree ("status") WHERE "plan"."status" = 'active';