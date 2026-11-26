#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${GCP_PROJECT_ID:-gen-lang-client-0745866958}"
REGION="${GCP_REGION:-europe-central2}"
SERVICE_NAME="${CLOUD_RUN_SERVICE:-chronos-vault}"

echo "=== Chronos Vault + TaskKill Studio — Google Cloud Run Deploy ==="
echo "Project: $PROJECT_ID | Region: $REGION | Service: $SERVICE_NAME"

if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
  echo ""
  echo "[!] Nie jesteś zalogowany do Google Cloud CLI."
  echo "    Uruchom najpierw: gcloud auth login"
  exit 1
fi

gcloud config set project "$PROJECT_ID"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

ENV_ARGS="NODE_ENV=production"
if [ -n "${GEMINI_API_KEY:-}" ]; then
  ENV_ARGS="${ENV_ARGS},GEMINI_API_KEY=${GEMINI_API_KEY}"
fi
if [ -n "${APP_URL:-}" ]; then
  ENV_ARGS="${ENV_ARGS},APP_URL=${APP_URL}"
fi

gcloud run deploy "$SERVICE_NAME" \
  --source . \
  --region "$REGION" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --set-env-vars "$ENV_ARGS"

SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region "$REGION" --format="value(status.url)")
echo ""
echo "=================================================================="
echo "[+] Wdrożono pomyślnie!"
echo "    Adres usługi: $SERVICE_URL"
echo ""
echo "    Krok końcowy dla logowania Google Workspace (Firebase Auth):"
echo "    Dodaj domenę $(echo "$SERVICE_URL" | sed 's|https://||') (oraz bmclinic.co)"
echo "    w Firebase Console -> Authentication -> Settings -> Authorized domains"
echo "=================================================================="
