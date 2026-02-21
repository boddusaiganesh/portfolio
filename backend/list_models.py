import httpx
import os
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("OPENROUTER_API_KEY", "")

r = httpx.get(
    "https://openrouter.ai/api/v1/models",
    headers={"Authorization": f"Bearer {key}"},
    timeout=15.0,
)
models = r.json().get("data", [])

free_models = [m for m in models if ":free" in m.get("id", "")]
print(f"Found {len(free_models)} free models:\n")
for m in sorted(free_models, key=lambda x: x["id"]):
    print(f"  {m['id']}")
