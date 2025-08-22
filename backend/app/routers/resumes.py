from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from app.services.parsing import extract_text
from app.services import llm
import difflib
import numpy as np
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import numpy as np
import traceback

router = APIRouter(prefix="/api", tags=["resumes"])

@router.get("/health")
def health():
    return {"status": "ok"}

@router.post("/parse")
async def parse_resume(file: UploadFile = File(...)):
    try:
        chunks, ext = await extract_text(file)
        text = " ".join(chunks)  # join list of chunks into a string

        if not text.strip():
            raise ValueError("No extractable text found in the file.")

        preview = text[:2000]  # now works correctly
        return {"ok": True, "ext": ext, "chars": len(text), "preview": preview}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to parse file.")


@router.post("/summarize")
async def summarize_resume(file: UploadFile = File(...)):
    try:
        text, _ = await extract_text(file)
        result = await llm.summarize_resume(text)
        return {"ok": True, **result}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to summarize.")
    

@router.post("/score")
async def score_resume(file: UploadFile = File(...), job_desc: str = Form(...)):
    try:
        text, _ = await extract_text(file)

        if isinstance(text, list):
            text = " ".join(text)

        if not text.strip():
            raise ValueError("Empty resume text after extraction.")

        result = await llm.score_resume(text, job_desc)

        return {
            "ok": True,
            "score": float(result.get("score", 0)),
            "explanation": str(result.get("explanation", ""))
        }
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        print("Error in /score:", e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/compare")
async def compare_resume(
    resume_text: str = Form(...),
    job_description: str = Form(...)
):
    # Simple similarity score (replace later with embeddings/LLM)
    score = difflib.SequenceMatcher(None, resume_text, job_description).ratio() * 100

    explanation = f"The resume matches {score:.2f}% with the job description based on text similarity."
    
    return {"score": round(score, 2), "explanation": explanation}
