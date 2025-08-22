from sentence_transformers import SentenceTransformer, util
import numpy as np
import re
import torch

# Load once at startup
model = SentenceTransformer("all-mpnet-base-v2")  # or 'paraphrase-mpnet-base-v2' for potentially better paraphrase handling

def split_into_sentences(text: str) -> list[str]:
    """
    Simple sentence splitter using regex. Handles basic punctuation.
    """
    # Replace newlines with spaces and split on sentence-ending punctuation followed by space or end
    text = re.sub(r'\s+', ' ', text.strip())
    sentences = re.split(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|\!)\s', text)
    return [s.strip() for s in sentences if s.strip() and len(s) > 10]  # Filter short/noise

def get_embeddings(texts: list[str]) -> np.ndarray:
    """
    Returns embedding vectors for a list of texts.
    """
    return model.encode(texts, convert_to_numpy=True, normalize_embeddings=True)

async def score_with_embeddings(resume_text: str, job_desc: str) -> dict:
    """
    Compute semantic similarity between resume and job description by chunking into sentences.
    This provides a more granular match, focusing on covering JD requirements, and a detailed explanation.
    """
    if not job_desc.strip():
        return {"score": 0, "explanation": "No job description provided."}

    # Split into sentences
    resume_sentences = split_into_sentences(resume_text)
    jd_sentences = split_into_sentences(job_desc)

    if not jd_sentences:
        return {"score": 0, "explanation": "Job description has no parseable content."}

    if not resume_sentences:
        return {"score": 0, "explanation": "Resume has no parseable content."}

    # Get embeddings
    resume_embs = get_embeddings(resume_sentences)
    jd_embs = get_embeddings(jd_sentences)

    # For each JD sentence, find the max similarity to any resume sentence
    similarities = []
    explanations = []
    for i, jd_emb in enumerate(jd_embs):
        sims = torch.nn.functional.cosine_similarity(torch.tensor(jd_emb).unsqueeze(0),torch.tensor(resume_embs),dim=1).numpy()
        max_sim = np.max(sims)
        best_match_idx = np.argmax(sims)
        similarities.append(max_sim)
        
        # Add to explanation
        jd_sent = jd_sentences[i]
        resume_sent = resume_sentences[best_match_idx]
        explanations.append(
            f"JD part: '{jd_sent[:100]}...' matched to Resume: '{resume_sent[:100]}...' with similarity {round(max_sim * 100, 2)}%"
        )

    # Average the max similarities for overall score
    avg_similarity = np.mean(similarities)
    score = round(avg_similarity * 100, 2)

    # Build explanation
    explanation = f"Overall semantic match score: {score}%\n\nDetailed matches:\n" + "\n".join(explanations)
    
    # Suggest improvements if score is low
    if score < 50:
        low_matches = [exp for exp in explanations if float(exp.split()[-1][:-1]) < 50]
        if low_matches:
            explanation += "\n\nAreas for improvement: Focus on enhancing resume sections related to these weakly matched JD parts:\n" + "\n".join(low_matches)

    return {"score": score, "explanation": explanation}