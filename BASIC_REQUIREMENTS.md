# AI Face Verification Website - Basic Requirements

Problem statement: SIH 26188 - AI based fake identity detection and verification.

## Goal

Build a simple verification portal where a user uploads:

- A live selfie or selfie image
- A government ID card image

The system should analyze both inputs and return:

- Verification verdict: `VERIFIED`, `REVIEW`, or `FRAUD DETECTED`
- Trust score from 0 to 100
- Checklist of detected risks and passed checks
- Short explanation for each check

## MVP Scope

The first version should focus on a working end-to-end flow, not perfect AI accuracy.

Required MVP features:

- Upload two images: selfie and ID card
- Validate file type and size
- Show loading steps during analysis
- Return structured result JSON from backend
- Display trust score and checklist on frontend
- Include at least three test cases:
  - Clean real pair
  - Obvious tampered ID
  - Identity mismatch pair

## Detection Modules

Start with simple modules and add stronger AI modules later.

Phase 1 modules:

- Metadata/EXIF inspection
- Error Level Analysis for tampering hints
- Basic face match placeholder or simple comparison
- Trust score aggregator

Phase 2 modules:

- Real face matching using embeddings
- OCR from ID card
- ID text consistency checks
- Liveness detection through camera/video
- Better forged-document detection

## Suggested Tech Stack

Frontend:

- React or Next.js
- Drag-and-drop upload UI
- Results dashboard

Backend:

- Python
- FastAPI
- Pillow
- OpenCV
- python-multipart

AI/Computer Vision:

- EXIF metadata parser
- ELA script
- Face recognition model or DeepFace
- OCR library such as Tesseract, EasyOCR, or PaddleOCR

## API Requirement

Endpoint:

```text
POST /api/v1/verify-identity
```

Input:

- `selfie`: uploaded image file
- `id_card`: uploaded image file

Example response:

```json
{
  "verdict": "REVIEW",
  "trust_score": 68,
  "checks": [
    {
      "name": "Metadata Inspection",
      "status": "passed",
      "message": "No editing software found in metadata."
    },
    {
      "name": "Error Level Analysis",
      "status": "warning",
      "message": "Compression inconsistency found near the ID photo area."
    },
    {
      "name": "Face Match",
      "status": "passed",
      "message": "Selfie and ID face appear to match."
    }
  ]
}
```

## Frontend Screens

Minimum screens:

- Upload screen with two upload boxes
- Loading state with analysis steps
- Result screen with verdict, trust score, and checklist

Result colors:

- Green: `VERIFIED`
- Yellow: `REVIEW`
- Red: `FRAUD DETECTED`

## 6 Member Team Split

Member 1 - Backend Lead:

- Set up FastAPI project
- Create upload endpoint
- Handle file validation and errors
- Return final structured JSON

Member 2 - AI/Computer Vision:

- Build metadata inspection
- Build Error Level Analysis
- Test tampered image detection

Member 3 - Face Verification:

- Research face matching options
- Implement face comparison
- Tune match threshold
- Test identity mismatch case

Member 4 - Frontend:

- Build upload UI
- Add loading state
- Build result dashboard
- Connect to backend API

Member 5 - Testing/Data:

- Collect clean, tampered, and mismatch test samples
- Maintain test cases
- Record accuracy and failure cases
- Prepare demo dataset safely

Member 6 - Documentation/Presentation:

- Maintain project report
- Prepare architecture diagram
- Create SIH presentation slides
- Coordinate demo flow and speaking points

## Sequential Execution Plan

Day 1:

- Finalize scope and team roles
- Create backend walking skeleton
- Test upload endpoint with Swagger
- Create basic frontend mock UI

Day 2:

- Add metadata inspection
- Add Error Level Analysis
- Collect sample test pairs
- Connect frontend to backend

Day 3:

- Add face matching
- Add trust score formula
- Improve result dashboard
- Start presentation and architecture diagram

Day 4:

- Add OCR or liveness if time allows
- Test edge cases
- Polish UI and demo flow
- Finalize slides and report

## Success Criteria

The MVP is successful if:

- A user can upload a selfie and ID card
- The backend returns a result without crashing
- The result contains a trust score and checklist
- Tampered or mismatched samples produce lower trust scores
- The team can clearly explain how each detection module contributes to the final score
