#!/usr/bin/env bash
set -euo pipefail
BASE="${VERIFY_BASE_URL:-http://127.0.0.1:3100}"
RUN_ID="${VERIFY_RUN_ID:-$(date +%Y%m%d-%H%M%S)}"
OUT="${VERIFY_ARTIFACTS_DIR:-$(pwd)/.verify-artifacts}/${RUN_ID}"
mkdir -p "${OUT}"
html="$(curl -s "${BASE}/")"
echo "${html}" > "${OUT}/landing.html"
grep -q 'data-testid="landing-main"' "${OUT}/landing.html"
grep -q 'data-testid="cta-demo"' "${OUT}/landing.html"
grep -q 'data-testid="cta-create"' "${OUT}/landing.html"
echo "drive landing OK artifacts=${OUT}/landing.html"
