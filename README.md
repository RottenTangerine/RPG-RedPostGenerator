# Tutorial

## Prequest

Create python venv

```bash
python -m venv venv
```

Install Python dependencies

```bash
pip install -r requirements.txt
```

Install React dependencies
```bash
cd frontend
npm install
```

###  Config
Add `config.json` file in your root path

`config.json`:
```json
{
  "OpenAI": {
    "endpoint": "YOUR ENDPOINT",
    "key": "YOUR API KEY",
    "model": "MODEL DEPLOYMENT NAME"
  }
}
```
## Test project

1. Run backend web service (Flask)
```bash
python backend/app.py 
```
2. Run frontend web application (React)
```bash
cd fontend
npm run dev
```

## Deploy project




# Description 

TBD