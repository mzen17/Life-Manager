install:
	python -m venv venv
	venv/bin/pip install -r requirements.txt

run:
	venv/bin/uvicorn main:app --reload