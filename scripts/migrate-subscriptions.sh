#!/bin/bash
#
# Migrate subscriptions from old Blocs Stripe account to new account.
# Uses the Stripe CLI with --project-name blocs-new and --live flags.
#
# Each subscription is created with trial_end = current_period_end from the old sub,
# so the customer isn't charged until their natural billing date.
#
# Usage: bash scripts/migrate-subscriptions.sh [--dry-run]

set -euo pipefail

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "=== DRY RUN MODE — no subscriptions will be created ==="
  echo ""
fi

# Old price ID -> New price ID mapping
declare -A PRICE_MAP=(
  ["price_1QfLmMHyXnRceQpOB0P4UvLC"]="price_1TCfQKHuSirGScmMUNZJ7kmT"   # $12/yr
  ["price_1QfLkcHyXnRceQpOb4fMdxCj"]="price_1TCfRuHuSirGScmMV3oo9Pcg"   # $2/mo
  ["price_1PktRfHyXnRceQpOxWWLfKjD"]="price_1TCfQpHuSirGScmMXTVWOSPb"   # $19/yr
  ["price_1OMb1gHyXnRceQpOC64hlwPS"]="price_1TBwohHuSirGScmMB8N8628p"   # $36/yr
  ["price_1OMb3cHyXnRceQpOicKpzH3B"]="price_1TCfR7HuSirGScmM81VEOSNw"   # $24/yr
  ["price_1OLARHHyXnRceQpOvNcZVRnf"]="price_1TBwogHuSirGScmMqdOCwwoX"   # $6/mo
)

# Subscriptions to migrate: "customer_id old_price_id period_end_timestamp name"
# period_end is UTC datetime from CSV, converted to unix timestamp below
SUBS=(
  "cus_U49TeMXxnJa3k4 price_1QfLmMHyXnRceQpOB0P4UvLC 2027-03-01T03:59:00Z Kevin_Le"
  "cus_TwHkD80YCXU5RM price_1QfLmMHyXnRceQpOB0P4UvLC 2027-02-08T04:00:00Z Cassandra_Fikes"
  "cus_TYdL7rnRIEjf7d price_1QfLkcHyXnRceQpOb4fMdxCj 2026-04-01T21:39:00Z Lein"
  "cus_TXttow97WA2cvA price_1QfLkcHyXnRceQpOb4fMdxCj 2026-04-05T01:47:00Z Jacob_Dreiling"
  "cus_TVGqp5iBBD6rM0 price_1QfLmMHyXnRceQpOB0P4UvLC 2026-11-28T01:16:00Z Mohamud_Ali"
  "cus_SYQDmNZiCyUFE6 price_1QfLmMHyXnRceQpOB0P4UvLC 2026-06-23T23:01:00Z Gretchen_Melby"
  "cus_SXIQklDZcJkGD0 price_1QfLmMHyXnRceQpOB0P4UvLC 2026-06-20T22:55:00Z Lucy_Yazzolino"
  "cus_SVSXc1dCSlt0gn price_1QfLmMHyXnRceQpOB0P4UvLC 2026-06-16T01:14:00Z John_Plunkett"
  "cus_SOEPeNQTZrI3Tg price_1QfLmMHyXnRceQpOB0P4UvLC 2026-05-27T18:09:00Z Mariana_Amorim"
  "cus_SNwJmlOzJzJfwl price_1QfLmMHyXnRceQpOB0P4UvLC 2026-05-26T23:27:00Z Victoria_Yeo"
  "cus_SMlv2wunJcajHu price_1QfLmMHyXnRceQpOB0P4UvLC 2026-05-23T20:40:00Z Sondra_Price"
  "cus_SC2S3q6G7L0Cb4 price_1QfLmMHyXnRceQpOB0P4UvLC 2026-04-25T05:00:00Z Sarah_Quinn"
  "cus_RDUOGY3vf9AhZe price_1PktRfHyXnRceQpOxWWLfKjD 2026-11-14T13:48:00Z Mohammed"
  "cus_QnGUcw8hSb44x8 price_1PktRfHyXnRceQpOxWWLfKjD 2026-09-05T13:42:00Z Ayoub_Chaouachi"
  "cus_Q9z8C29IYPXwzt price_1OMb1gHyXnRceQpOC64hlwPS 2026-05-23T17:10:00Z Evan_Strand"
  "cus_Q3Peiw3ptA01lh price_1OMb3cHyXnRceQpOicKpzH3B 2026-05-06T04:06:00Z Brian_Russo"
  "cus_Pvpq0Ueajy5lR0 price_1OMb1gHyXnRceQpOC64hlwPS 2026-04-15T22:39:00Z Ahn_Ha_Eun"
  "cus_Pe0PMailkn9PAN price_1OMb1gHyXnRceQpOC64hlwPS 2027-02-28T08:22:00Z Carlos_Rodriguez"
  "cus_PH63AEecRFB3u9 price_1OMb1gHyXnRceQpOC64hlwPS 2026-12-29T04:39:00Z Matthew_Kokai"
  "cus_P9bdZ1C2l9tuak price_1OLARHHyXnRceQpOvNcZVRnf 2026-04-09T04:45:00Z Yuta_Ito"
)

SUCCESS=0
FAIL=0

for entry in "${SUBS[@]}"; do
  read -r CUS_ID OLD_PRICE PERIOD_END NAME <<< "$entry"
  NEW_PRICE="${PRICE_MAP[$OLD_PRICE]}"

  # Convert ISO date to unix timestamp
  TRIAL_END=$(date -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$PERIOD_END" "+%s" 2>/dev/null)
  if [[ -z "$TRIAL_END" ]]; then
    echo "FAIL: Could not parse date $PERIOD_END for $NAME ($CUS_ID)"
    FAIL=$((FAIL + 1))
    continue
  fi

  # Look up the customer's payment method on the new account
  PM_ID=$(stripe payment_methods list \
    --project-name blocs-new --live \
    -d "customer=$CUS_ID" -d "type=card" \
    2>/dev/null | python3 -c "
import json, sys
data = json.load(sys.stdin)
if data['data']:
    print(data['data'][0]['id'])
" 2>/dev/null)

  if [[ -z "$PM_ID" ]]; then
    echo "FAIL: No payment method found for $NAME ($CUS_ID)"
    FAIL=$((FAIL + 1))
    continue
  fi

  echo "--- $NAME ($CUS_ID) ---"
  echo "  Price: $OLD_PRICE -> $NEW_PRICE"
  echo "  Payment method: $PM_ID"
  echo "  Trial end (no charge until): $PERIOD_END (unix: $TRIAL_END)"

  if [[ "$DRY_RUN" == "true" ]]; then
    echo "  [DRY RUN] Would create subscription"
    SUCCESS=$((SUCCESS + 1))
    continue
  fi

  RESULT=$(stripe subscriptions create \
    --project-name blocs-new --live \
    -d "customer=$CUS_ID" \
    -d "items[0][price]=$NEW_PRICE" \
    -d "default_payment_method=$PM_ID" \
    -d "trial_end=$TRIAL_END" \
    -d "payment_settings[save_default_payment_method]=on_subscription" \
    -d "proration_behavior=none" \
    2>&1)

  SUB_ID=$(echo "$RESULT" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print(data.get('id', 'ERROR'))
except:
    print('ERROR')
" 2>/dev/null)

  if [[ "$SUB_ID" == "ERROR" || -z "$SUB_ID" ]]; then
    echo "  FAIL: $RESULT"
    FAIL=$((FAIL + 1))
  else
    echo "  SUCCESS: $SUB_ID"
    SUCCESS=$((SUCCESS + 1))
  fi
  echo ""
done

echo "================================"
echo "Done. Success: $SUCCESS  Failed: $FAIL"
