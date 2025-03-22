import re
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
client=genai.Client(api_key=API_KEY)
def assignment_gen(text):
    prompt = (f"""
        Generate a detailed lab report on: "{text}". The report should include:
        
        1. Report Name: Use the content of the `text` variable as the title of the lab report.
            Title: {text}
        
        2. Introduction: Write a minimum of 150 words and maximum 200 words explaining the related theory and background about the topic "{text}". 
            Include any relevant principles, concepts, or foundational knowledge.
        
        3. Procedure/Code[depending on the topic]: Provide the code[if it's code related report and code should be in c++ language] or experiment procedure[if it's a expreimental report], depending on the context of the topic "{text}". 
        
        4. Results: Present the output or findings from the code execution or experiment based on the topic "{text}". 
            Include tables or summaries if applicable.
        
        5. Result Analysis and Discussion: Analyze the results obtained and discuss any patterns or anomalies[minimum of 150 words and maximum 200 words]. 
            Highlight how the results align (or don't align) with the expected outcome based on the topic "{text}".

        6. Conclusion: Summarize the key points of the lab report, highlighting the main insights gained and the implications of the results[minimum of 150 words and maximum 200 words].
        """
      )
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt
    )
    if not response or not response.text:
      return {"error ":"Failed to generate Lab Report"}
    lab_report = response.text
    return lab_report
  
  
