export const AI_PROMPT = `
Generate detailed, structured content on the topic **{topic}** in the **{style}** style, specifically formatted for **Editor.js**

**Output Requirements**:
- Provide content in JSON format for Editor.js blocks.
- Organize content hierarchically with headers and sections, ensuring a logical flow.
- Use blocks like **header**, **paragraph**, **list**, **table**, **checklist**, and **quote**.
- Specify properties for each block, including **id**, **type**, and **data**.
- Use the following format and structure as a guide:
**Example Output Format**: (it should be in json format)
     {
   "time": 1731340966601,
   "blocks": [
      {
         "id": "header1",
         "type": "header",
         "data": {
            "text": "The Future of AI in Healthcare",
            "level": 2
         }
      },
      {
         "id": "intro",
         "type": "header",
         "data": {
            "text": "1. Introduction",
            "level": 2
         }
      },
      {
         "id": "introP",
         "type": "paragraph",
         "data": {
            "text": "Artificial intelligence (AI) is transforming healthcare. This report explores its current trends, challenges, and future."
         }
      },
      {
         "id": "trends",
         "type": "header",
         "data": {
            "text": "2. Current Trends",
            "level": 2
         }
      },
      {
         "id": "trendsList",
         "type": "list",
         "data": {
            "style": "ordered",
            "items": [
               "AI-powered diagnostics",
               "Personalized medicine",
               "Drug discovery",
               "Remote patient monitoring"
            ]
         }
      },
      {
         "id": "trendsTable",
         "type": "table",
         "data": {
            "withHeadings": true,
            "stretched": false,
            "content": [
               ["Application", "Example", "Benefit"],
               ["Diagnostics", "Detecting diseases", "Improved accuracy"],
               ["Personalized Medicine", "Tailoring treatments", "Increased efficacy"],
               ["Drug Discovery", "Identifying candidates", "Reduced time & cost"]
            ]
         }
      },
      {
         "id": "challenges",
         "type": "header",
         "data": {
            "text": "3. Key Challenges",
            "level": 2
         }
      },
      {
         "id": "challengesChecklist",
         "type": "checklist",
         "data": {
            "items": [
               {"text": "Data privacy", "checked": true},
               {"text": "Algorithmic bias", "checked": true},
               {"text": "Regulation", "checked": false},
               {"text": "Integration", "checked": false}
            ]
         }
      },
      {
         "id": "future",
         "type": "header",
         "data": {
            "text": "4. Future Developments",
            "level": 2
         }
      },
      {
         "id": "futureList",
         "type": "list",
         "data": {
            "style": "unordered",
            "items": [
               "Precision surgery",
               "Predictive analytics",
               "Generalizable AI",
               "Human-AI collaboration"
            ]
         }
      },
      {
         "id": "futureQuote",
         "type": "quote",
         "data": {
            "text": "The future of medicine is AI.",
            "caption": "Expert",
            "alignment": "left"
         }
      }
   ],
   "version": "2.30.6"
}

**Key Requirements**:
   - Structure each output according to the platform's needs .
   - Ensure clarity, precision, and a professional tone.
`;
