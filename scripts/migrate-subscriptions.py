"""
Migrate subscriptions from old Blocs Stripe account to new account.

Uses the Stripe API directly with the new account's secret key.
Each subscription is created with trial_end = current_period_end from the old sub,
so the customer isn't charged until their natural billing date.

Usage:
  python3 scripts/migrate-subscriptions.py --dry-run   # preview only
  python3 scripts/migrate-subscriptions.py              # create subscriptions for real
"""

import json
import os
import sys
import urllib.request
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path

DRY_RUN = "--dry-run" in sys.argv

# Load secret key from .env
env_path = Path(__file__).resolve().parent.parent / ".env"
STRIPE_KEY = None
for line in env_path.read_text().splitlines():
    if line.startswith("STRIPE_SECRET_KEY="):
        STRIPE_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")
        break

if not STRIPE_KEY:
    print("ERROR: STRIPE_SECRET_KEY not found in .env")
    sys.exit(1)

print(f"Using key: {STRIPE_KEY[:12]}...{STRIPE_KEY[-4:]}")

PRICE_MAP = {
    "price_1QfLmMHyXnRceQpOB0P4UvLC": "price_1TCfQKHuSirGScmMUNZJ7kmT",  # $12/yr
    "price_1QfLkcHyXnRceQpOb4fMdxCj": "price_1TCfRuHuSirGScmMV3oo9Pcg",  # $2/mo
    "price_1PktRfHyXnRceQpOxWWLfKjD": "price_1TCfQpHuSirGScmMXTVWOSPb",  # $19/yr
    "price_1OMb1gHyXnRceQpOC64hlwPS": "price_1TBwohHuSirGScmMB8N8628p",  # $36/yr
    "price_1OMb3cHyXnRceQpOicKpzH3B": "price_1TCfR7HuSirGScmM81VEOSNw",  # $24/yr
    "price_1OLARHHyXnRceQpOvNcZVRnf": "price_1TBwogHuSirGScmMqdOCwwoX",  # $6/mo
}

SUBS = [
    ("cus_U49TeMXxnJa3k4", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2027-03-01 03:59", "Kevin Le"),
    ("cus_TwHkD80YCXU5RM", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2027-02-08 04:00", "Cassandra Fikes"),
    ("cus_TYdL7rnRIEjf7d", "price_1QfLkcHyXnRceQpOb4fMdxCj", "2026-04-01 21:39", "Lein (Elena)"),
    ("cus_TXttow97WA2cvA", "price_1QfLkcHyXnRceQpOb4fMdxCj", "2026-04-05 01:47", "Jacob Dreiling"),
    ("cus_TVGqp5iBBD6rM0", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-11-28 01:16", "Mohamud Ali"),
    ("cus_SYQDmNZiCyUFE6", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-06-23 23:01", "Gretchen Melby"),
    ("cus_SXIQklDZcJkGD0", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-06-20 22:55", "Lucy Yazzolino"),
    ("cus_SVSXc1dCSlt0gn", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-06-16 01:14", "John Plunkett"),
    ("cus_SOEPeNQTZrI3Tg", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-05-27 18:09", "Mariana Amorim"),
    ("cus_SNwJmlOzJzJfwl", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-05-26 23:27", "Victoria Yeo"),
    ("cus_SMlv2wunJcajHu", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-05-23 20:40", "Sondra Price"),
    ("cus_SC2S3q6G7L0Cb4", "price_1QfLmMHyXnRceQpOB0P4UvLC", "2026-04-25 05:00", "Sarah Quinn"),
    ("cus_RDUOGY3vf9AhZe", "price_1PktRfHyXnRceQpOxWWLfKjD", "2026-11-14 13:48", "Mohammed"),
    ("cus_QnGUcw8hSb44x8", "price_1PktRfHyXnRceQpOxWWLfKjD", "2026-09-05 13:42", "Ayoub Chaouachi"),
    ("cus_Q9z8C29IYPXwzt", "price_1OMb1gHyXnRceQpOC64hlwPS", "2026-05-23 17:10", "Evan Strand"),
    ("cus_Q3Peiw3ptA01lh", "price_1OMb3cHyXnRceQpOicKpzH3B", "2026-05-06 04:06", "Brian Russo"),
    ("cus_Pvpq0Ueajy5lR0", "price_1OMb1gHyXnRceQpOC64hlwPS", "2026-04-15 22:39", "Ahn Ha Eun"),
    ("cus_Pe0PMailkn9PAN", "price_1OMb1gHyXnRceQpOC64hlwPS", "2027-02-28 08:22", "Carlos Rodriguez"),
    ("cus_PH63AEecRFB3u9", "price_1OMb1gHyXnRceQpOC64hlwPS", "2026-12-29 04:39", "Matthew Kokai"),
    ("cus_P9bdZ1C2l9tuak", "price_1OLARHHyXnRceQpOvNcZVRnf", "2026-04-09 04:45", "Yuta Ito"),
]


def stripe_api(method: str, endpoint: str, data: dict = None) -> dict:
    url = f"https://api.stripe.com/v1/{endpoint}"
    encoded = urllib.parse.urlencode(data, doseq=True).encode() if data else None
    req = urllib.request.Request(url, data=encoded, method=method)
    req.add_header("Authorization", f"Bearer {STRIPE_KEY}")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        return json.loads(e.read())


def get_payment_method(customer_id: str) -> str | None:
    data = stripe_api("GET", f"payment_methods?customer={customer_id}&type=card")
    if data.get("data"):
        return data["data"][0]["id"]
    return None


def to_unix(dt_str: str) -> int:
    dt = datetime.strptime(dt_str, "%Y-%m-%d %H:%M").replace(tzinfo=timezone.utc)
    return int(dt.timestamp())


def main():
    if DRY_RUN:
        print("=== DRY RUN MODE === (no subscriptions will be created)\n")

    success = 0
    fail = 0

    for cus_id, old_price, period_end, name in SUBS:
        new_price = PRICE_MAP[old_price]
        trial_end = to_unix(period_end)

        pm_id = get_payment_method(cus_id)
        if not pm_id:
            print(f"FAIL: {name} ({cus_id}) — no payment method found")
            fail += 1
            continue

        print(f"--- {name} ({cus_id}) ---")
        print(f"  Price: {old_price} -> {new_price}")
        print(f"  Payment method: {pm_id}")
        print(f"  Trial end (first charge): {period_end} UTC (unix: {trial_end})")

        if DRY_RUN:
            print("  [DRY RUN] Would create subscription\n")
            success += 1
            continue

        result = stripe_api("POST", "subscriptions", {
            "customer": cus_id,
            "items[0][price]": new_price,
            "default_payment_method": pm_id,
            "trial_end": str(trial_end),
            "payment_settings[save_default_payment_method]": "on_subscription",
            "proration_behavior": "none",
        })

        sub_id = result.get("id", "")
        if sub_id.startswith("sub_"):
            print(f"  SUCCESS: {sub_id}\n")
            success += 1
        else:
            error_msg = result.get("error", {}).get("message", json.dumps(result))
            print(f"  FAIL: {error_msg}\n")
            fail += 1

    print("=" * 40)
    print(f"Done. Success: {success}  Failed: {fail}")


if __name__ == "__main__":
    main()
