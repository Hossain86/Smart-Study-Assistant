import re
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)

def summarize_topic(text):
    prompt = (f"""
        I want you to act as a summarizer. I will provide you with a text, and you will summarize it in a clear and concise manner.
        My Preferences for Document Summaries:
        Short & Clear – I prefer summaries that are brief yet informative, cutting out unnecessary details, avoiding fluff.
        Well-Formatted – I like structured summaries (bullets, tables, sections, or numbered points) rather than long paragraphs.
        Essential Details Only – I don’t want excessive explanations—just the main points.
        Easy-to-Read Language – I prefer summaries that are simple and straightforward, without complex wording.
        For shorter texts, provide at least 350+ words of explanation.
        For longer texts, extend the explanation to at least 500+ words, ensuring depth and clarity.      
        Here is the text to explain and summarize:
        "{text}"
    """)
    
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    
    if not response or not response.text:
        return {"error": "Failed to generate summary"}
    
    summary = response.text
    return summary

def markdown_to_plain_text(md_text: str) -> str:
    """
    Convert Markdown-styled text to plain text by removing common markdown syntax.
    """
    text = re.sub(r'#', '', md_text)
    text = re.sub(r'\*\*', '', text)
    text = re.sub(r'\*', '', text)
    text = re.sub(r'\n+', '\n', text)
    return text.strip()
