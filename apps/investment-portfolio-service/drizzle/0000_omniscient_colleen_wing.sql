CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brokerage_account_id" text NOT NULL,
	"name" text NOT NULL,
	"holdings_last_synced_at" timestamp with time zone,
	"transactions_last_synced_on" date,
	CONSTRAINT "account_brokerage_account_id_key" UNIQUE("brokerage_account_id")
);
--> statement-breakpoint
CREATE TABLE "balance" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"snapshot_id" uuid NOT NULL,
	"cash" numeric(19, 4) NOT NULL,
	"margin_balance" numeric(19, 4) NOT NULL,
	"buying_power" numeric(19, 4) NOT NULL,
	"total_value" numeric(19, 4) NOT NULL,
	CONSTRAINT "balance_snapshot_id_key" UNIQUE("snapshot_id"),
	CONSTRAINT "balance_margin_balance_non_negative" CHECK ("balance"."margin_balance" >= 0)
);
--> statement-breakpoint
CREATE TABLE "holding" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"snapshot_id" uuid NOT NULL,
	"security_id" uuid NOT NULL,
	"quantity" numeric(24, 8) NOT NULL,
	"market_value" numeric(19, 4) NOT NULL,
	CONSTRAINT "holding_snapshot_security_key" UNIQUE("snapshot_id","security_id")
);
--> statement-breakpoint
CREATE TABLE "lot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"security_id" uuid NOT NULL,
	"quantity" numeric(24, 8) NOT NULL,
	"acquired_on" date NOT NULL,
	"price_per_share" numeric(19, 4) NOT NULL,
	"cost_basis" numeric(19, 4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "security" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ticker" text NOT NULL,
	"name" text NOT NULL,
	"asset_class" text,
	"distribution_yield" numeric(12, 8),
	"marginable" boolean,
	CONSTRAINT "security_ticker_key" UNIQUE("ticker")
);
--> statement-breakpoint
CREATE TABLE "snapshot" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" uuid NOT NULL,
	"captured_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "balance" ADD CONSTRAINT "balance_snapshot_id_snapshot_id_fk" FOREIGN KEY ("snapshot_id") REFERENCES "public"."snapshot"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "holding" ADD CONSTRAINT "holding_snapshot_id_snapshot_id_fk" FOREIGN KEY ("snapshot_id") REFERENCES "public"."snapshot"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "holding" ADD CONSTRAINT "holding_security_id_security_id_fk" FOREIGN KEY ("security_id") REFERENCES "public"."security"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lot" ADD CONSTRAINT "lot_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lot" ADD CONSTRAINT "lot_security_id_security_id_fk" FOREIGN KEY ("security_id") REFERENCES "public"."security"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "snapshot" ADD CONSTRAINT "snapshot_account_id_account_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lot_account_security_idx" ON "lot" USING btree ("account_id","security_id");--> statement-breakpoint
CREATE INDEX "snapshot_account_captured_at_idx" ON "snapshot" USING btree ("account_id","captured_at");