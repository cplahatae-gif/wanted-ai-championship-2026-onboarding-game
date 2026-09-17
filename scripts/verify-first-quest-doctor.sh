#!/usr/bin/env bash
set -euo pipefail
BASE="${VERIFY_BASE_URL:-http://127.0.0.1:3100}"
echo "doctor base=${BASE}"
for path in / /demo /create; do
  code="$(curl -s -o /dev/null -w '%{http_code}' "${BASE}${path}")"
  echo "GET ${path} -> ${code}"
  if [[ "${code}" != "200" ]]; then
    echo "doctor FAIL ${path}" >&2
    exit 1
  fi
done
echo "doctor OK"
