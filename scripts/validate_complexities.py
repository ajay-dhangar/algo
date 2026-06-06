import json
from pathlib import Path

DATA_FILE = Path("src/data/algorithm-complexities.json")

REQUIRED_FIELDS = {
    "category",
    "best",
    "average",
    "worst",
    "space",
    "stable",
    "inPlace",
}

def main():
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))

    if not isinstance(data, dict) or not data:
        raise ValueError("Complexity data must be a non-empty JSON object.")

    for algorithm, metadata in data.items():
        missing = REQUIRED_FIELDS - metadata.keys()
        if missing:
            raise ValueError(f"{algorithm} is missing fields: {sorted(missing)}")

    print(f"Validated {len(data)} algorithm complexity entries successfully.")

if __name__ == "__main__":
    main()
