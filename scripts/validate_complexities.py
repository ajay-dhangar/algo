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
        if not isinstance(metadata, dict):
            raise ValueError(f"Metadata for {algorithm} must be a JSON object.")

        missing = REQUIRED_FIELDS - metadata.keys()

        if missing:
            raise ValueError(f"{algorithm} is missing fields: {sorted(missing)}")

        for field in ["category", "best", "average", "worst", "space"]:
            if not isinstance(metadata.get(field), str):
                raise ValueError(f"Field '{field}' in {algorithm} must be a string.")

        for field in ["stable", "inPlace"]:
            value = metadata.get(field)

            if value is not None and not isinstance(value, bool):
                raise ValueError(
                    f"Field '{field}' in {algorithm} must be boolean or null."
                )

    print(f"Validated {len(data)} algorithm complexity entries successfully.")


if __name__ == "__main__":
    main()
