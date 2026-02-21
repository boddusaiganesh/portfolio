import httpx
import os
import time
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("OPENROUTER_API_KEY", "")

# Step 1: Get all free models
print("Fetching free models from OpenRouter...\n")
r = httpx.get("https://openrouter.ai/api/v1/models", headers={"Authorization": f"Bearer {key}"}, timeout=15.0)
models = r.json().get("data", [])
free_models = sorted([m["id"] for m in models if ":free" in m.get("id", "")])
print(f"Found {len(free_models)} free models. Testing each one...\n")
print("=" * 70)

working = []
failed = []

for i, model_id in enumerate(free_models):
    print(f"\n[{i+1}/{len(free_models)}] Testing: {model_id}", end=" ... ", flush=True)
    try:
        resp = httpx.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model_id,
                "messages": [{"role": "user", "content": "Say hi in one word."}],
                "max_tokens": 10,
            },
            timeout=15.0,  # 15s timeout — skip slow models
        )
        data = resp.json()

        if "error" in data:
            err_msg = data["error"].get("message", "Unknown error")
            code = data["error"].get("code", "?")
            print(f"❌ FAILED ({code})")
            failed.append((model_id, f"{code}: {err_msg[:60]}"))
        elif "choices" in data and len(data["choices"]) > 0:
            reply = data["choices"][0].get("message", {}).get("content", "").strip()
            print(f"✅ WORKING — \"{reply[:40]}\"")
            working.append(model_id)
        else:
            print(f"⚠️ UNKNOWN RESPONSE")
            failed.append((model_id, "Unknown response format"))
    except httpx.TimeoutException:
        print(f"⏱️ TIMEOUT (slow model, skipped)")
        failed.append((model_id, "Timeout - too slow"))
    except Exception as e:
        print(f"❌ ERROR: {str(e)[:50]}")
        failed.append((model_id, str(e)[:60]))

    time.sleep(0.3)

# Summary
print("\n\n" + "=" * 70)
print(f"\n✅ WORKING MODELS ({len(working)}):")
for m in working:
    print(f"   {m}")

print(f"\n❌ FAILED MODELS ({len(failed)}):")
for m, reason in failed:
    print(f"   {m} — {reason}")

if working:
    print(f"\n{'=' * 70}")
    print(f"🏆 RECOMMENDED: {working[0]}")
    print(f'   Put this in main.py line 18:')
    print(f'   AI_MODEL = "{working[0]}"')
