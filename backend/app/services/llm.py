import os
from typing import Dict
from transformers import pipeline
from dotenv import load_dotenv
from app.services.embeddings import score_with_embeddings

# load .env
load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")

# Use the environment variable correctly
os.environ["HUGGINGFACE_HUB_TOKEN"] = HF_TOKEN

# load summarization pipeline
summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

# load zero-shot classification pipeline
classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)


async def summarize_resume(text: str) -> Dict:
    """
    Summarize resume text into key bullet points.
    """
    # Hugging Face models sometimes choke on huge input → truncate
    text = text[:3000]

    summary = summarizer(
        text,
        max_length=200,
        min_length=60,
        do_sample=False
    )[0]["summary_text"]

    return {"summary": summary.split(". ")[:5]}  # return 3–5 bullets



async def score_resume(text: str, job_requirements: str = "") -> Dict:
    return await score_with_embeddings(text, job_requirements)
