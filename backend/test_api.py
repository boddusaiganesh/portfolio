import httpx
import sys

print("=== Testing Backend API ===\n")

# Test 1: Health check
try:
    r = httpx.get("http://localhost:8000/")
    print(f"[1] Health Check: {r.status_code}")
    print(f"    Response: {r.json()}\n")
except Exception as e:
    print(f"[1] Health Check FAILED: {e}\n")
    sys.exit(1)

# Test 2: Resume endpoint
try:
    r = httpx.get("http://localhost:8000/api/resume")
    print(f"[2] Resume Endpoint: {r.status_code}")
    data = r.json()
    print(f"    Name: {data.get('name', 'NOT FOUND')}")
    print(f"    Title: {data.get('title', 'NOT FOUND')}")
    print(f"    Skills categories: {len(data.get('skills', {}))}")
    print(f"    Projects: {len(data.get('projects', []))}\n")
except Exception as e:
    print(f"[2] Resume Endpoint FAILED: {e}\n")

# Test 3: Chat endpoint (this tests the API key)
try:
    r = httpx.post(
        "http://localhost:8000/api/chat",
        json={"message": "What projects has Sai Ganesh built?"},
        timeout=30.0,
    )
    print(f"[3] Chat Endpoint: {r.status_code}")
    if r.status_code == 200:
        data = r.json()
        print(f"    Session ID: {data.get('session_id', 'N/A')}")
        print(f"    AI Response: {data.get('response', 'N/A')[:200]}...")
    else:
        print(f"    Error: {r.text}")
    print()
except Exception as e:
    print(f"[3] Chat Endpoint FAILED: {e}\n")

print("=== Tests Complete ===")
