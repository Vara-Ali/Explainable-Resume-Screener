from typing import List, Tuple
from fastapi import UploadFile
from pypdf import PdfReader
from docx import Document
import io
import re

SUPPORTED_EXTS = {".pdf", ".docx", ".txt"}

def _ext(filename: str) -> str:
    filename = filename.lower()
    for ext in SUPPORTED_EXTS:
        if filename.endswith(ext):
            return ext
    return ""

def clean_and_chunk_text(text: str, chunk_size: int = 500) -> List[str]:
    """
    Cleans text and splits it into chunks of ~chunk_size words.
    """
    # Normalize spaces
    text = re.sub(r"\s+", " ", text).strip()

    words = text.split(" ")
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i+chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks

async def extract_text(file: UploadFile) -> Tuple[List[str], str]:
    """
    Returns (chunks, ext). Raises ValueError if unsupported.
    """
    ext = _ext(file.filename or "")
    if not ext:
        raise ValueError("Unsupported file type. Upload a PDF, DOCX, or TXT.")

    if ext == ".pdf":
        data = await file.read()
        pdf = PdfReader(io.BytesIO(data))
        pages = []
        for page in pdf.pages:
            try:
                pages.append(page.extract_text() or "")
            except Exception:
                pages.append("")
        text = "\n".join(pages)
        return clean_and_chunk_text(text), ext

    if ext == ".docx":
        data = await file.read()
        doc = Document(io.BytesIO(data))
        text = "\n".join([p.text for p in doc.paragraphs])
        return clean_and_chunk_text(text), ext

    if ext == ".txt":
        data = await file.read()
        text = data.decode("utf-8", errors="ignore")
        return clean_and_chunk_text(text), ext

    raise ValueError("Unsupported file type.")
