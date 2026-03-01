# Civilian Law of Knowledge - Mobile App Design Document

## Overview
A comprehensive civilian-accessible justice platform mobile app designed to educate the public on legal rights, help families locate and support incarcerated loved ones, track law changes, provide facility information, and offer AI-powered legal Q&A.

## Design Philosophy
- **Mobile Portrait (9:16)** - Optimized for one-handed usage
- **iOS HIG Compliance** - Feels like a first-party iOS app
- **Tone**: Calm, factual, authoritative
- **Accessibility**: Easy to understand for all civilians and families

---

## Screen List

### Tab 1: Home
Main dashboard with quick access to all features.

### Tab 2: Search (Inmate/Case Lookup)
Find inmates by name, docket number, or case number.

### Tab 3: Family Hub
All resources for families supporting incarcerated loved ones.

### Tab 4: Know Your Rights
Constitutional protections and legal information.

### Tab 5: Ask AI
AI-powered chat interface for legal questions.

### Nested Screens
- Rights Detail Screen
- Law Updates Screen + Detail
- Facility Directory + Detail
- Phone Services Guide
- Commissary Guide
- Visitation Info
- Mail Guidelines
- Resources Library + Detail
- FAQ Screen
- Bail/Bond Info
- Grievance Guide
- Reentry Resources

---

## Primary Content and Functionality

### Home Screen
- **Hero Section**: "Knowledge is Power" - Mission statement
- **Quick Stats**: Rights guides, facilities, resources available
- **Quick Action Cards**:
  - Find an Inmate
  - Know Your Rights
  - Family Support
  - Ask AI Assistant
- **Recent Law Updates**: Latest 3 critical/important changes
- **Emergency Hotlines**: Quick access to crisis numbers

### Search Screen (Inmate/Case Lookup)
- **Search Modes Toggle**: By Name | By Docket # | By Case #
- **Search Input**: With clear instructions
- **Results List**:
  - Inmate name
  - Facility name and location
  - Booking date
  - Current status
- **Tap Result → Inmate Detail**:
  - Full booking information
  - Charges listed
  - Facility contact info
  - Links to court records/affidavit
  - "How to Contact" button → Phone Services
  - "Send Support" button → Commissary Guide

### Family Hub Screen
- **Section Cards**:
  1. **Phone Services** - How to call your loved one
  2. **Send Money/Commissary** - Fund their account
  3. **Secure Packs/Care Packages** - Send approved items
  4. **Visitation** - Schedule and rules
  5. **Mail Guidelines** - What you can send
  6. **Facility Directory** - Find any jail/prison
- **Featured Tip**: Rotating helpful advice
- **Emergency Numbers**: Visible at bottom

### Phone Services Screen
- **Provider List** (expandable cards):
  - GTL (Global Tel Link)
  - Securus Technologies
  - ICSolutions
  - JPay
  - ConnectNetwork
- **Each Provider Card**:
  - How to create account
  - How to add funds
  - Rate information
  - Customer service number
  - Direct link to website/app
- **Search by Facility**: Find which provider your facility uses

### Commissary Guide Screen
- **What is Commissary**: Plain explanation
- **How to Send Money**:
  - Online methods
  - Phone methods
  - In-person (money order, kiosk)
- **Provider Links**: JPay, Access Corrections, Keefe, etc.
- **Tips**: Spending limits, processing times
- **Search by Facility**: Find commissary provider

### Secure Packs Screen
- **What are Secure Packs**: Explanation
- **Approved Vendors**:
  - iCare Gifts
  - Access Securepak
  - Union Supply
  - Walkenhorst's
- **What's Typically Allowed**: Food, hygiene, clothing
- **What's NOT Allowed**: Common restrictions
- **How to Order**: Step-by-step
- **Search by Facility**: Find approved vendors

### Visitation Info Screen
- **Types of Visits**: In-person, video, contact/non-contact
- **General Rules**: ID requirements, dress code, what to bring
- **How to Schedule**: General process
- **Video Visit Platforms**: GTL, Securus, JPay links
- **Search by Facility**: Get specific visitation rules

### Mail Guidelines Screen
- **What You Can Send**: Letters, photos, books
- **What's Prohibited**: Common restrictions
- **How to Address Mail**: Format template
- **Legal Mail**: Special protections explained
- **Electronic Messaging**: JPay, GTL tablets
- **Tips**: Best practices for getting mail through

### Facility Directory Screen
- **Search Bar**: By name, city, state, or zip
- **Filter Options**: County, State, Federal
- **Facility Cards**:
  - Name and type
  - Location
  - Phone number
  - Quick action buttons
- **Tap → Facility Detail**:
  - Full address
  - All phone numbers
  - Visitation hours
  - Phone service provider
  - Commissary provider
  - Secure pack vendors
  - Mail address format
  - Website link

### Know Your Rights Screen
- **Categories** (expandable sections):
  - Medical Care Access
  - Religious Rights
  - Humane Conditions
  - Grievance Procedures
  - Due Process Rights
  - Legal Mail Protections
  - Visitation Rights
  - Phone Call Rights
- **Each Right**: Title, plain explanation, legal basis, source link
- **Search Bar**: Find specific rights

### AI Assistant Screen
- **Disclaimer Banner**: Always visible at top
- **Chat Interface**: Message bubbles
- **Suggested Questions**:
  - "What are my rights if denied medical care?"
  - "How do I file a grievance?"
  - "How does good time credit work?"
  - "What is bail vs bond?"
- **Input Field**: Type questions
- **Clear Chat Button**

### Law Updates Screen
- **Filter Tabs**: All | Critical | Important | Info
- **Update Cards**:
  - Priority badge (color-coded)
  - Title and summary
  - Effective date
  - Jurisdiction affected
  - Source link
- **Pull-to-refresh**

### Resources Screen
- **Categories**:
  - Legal Aid Organizations
  - Reentry Programs
  - Mental Health Resources
  - Substance Abuse Help
  - Housing Assistance
  - Employment Help
  - ID/Document Restoration
  - Family Support Groups
- **Resource Cards**: Name, description, link button
- **Search functionality**

### FAQ Screen
- **Categories**: Rights, Process, Family, Reentry
- **Accordion List**: Tap to expand answers
- **Search**: Find specific questions

### Additional Guides (Nested Screens)
- **Bail/Bond Information**: How it works, types, what to expect
- **Public Defender Guide**: How to request, what they do
- **Sentence Calculator**: Good time credits explanation
- **Grievance Filing Guide**: Step-by-step with templates
- **Medical Request Guide**: How to request care
- **Reentry Resources**: Comprehensive release preparation

---

## Key User Flows

### Flow 1: Find a Loved One
1. Open app → Home
2. Tap "Find an Inmate" card
3. Enter name or docket number
4. View search results
5. Tap result → See facility and contact info
6. Tap "How to Contact" → Phone services for that facility

### Flow 2: Set Up Phone Calls
1. Family Hub → Phone Services
2. Search by facility name
3. See which provider (e.g., GTL)
4. Follow setup instructions
5. Tap link to create account

### Flow 3: Send Commissary Money
1. Family Hub → Commissary
2. Search by facility
3. See accepted methods
4. Follow instructions or tap provider link

### Flow 4: Know Your Rights
1. Rights tab → Browse categories
2. Tap category → See rights list
3. Tap right → Full explanation with sources

### Flow 5: Ask AI a Question
1. AI tab → See suggested questions
2. Type or tap question
3. Read AI response
4. Ask follow-ups

---

## Color Choices (Brand Identity)

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| primary | #C9A24D (Antique Gold) | #C9A24D | Accent, buttons, highlights |
| background | #F5F5F5 (Off-White) | #0B0B0D (Black) | Screen backgrounds |
| surface | #FFFFFF | #1A1A1C | Cards, elevated surfaces |
| foreground | #0B0B0D (Black) | #F5F5F5 (Off-White) | Primary text |
| muted | #687076 | #9BA1A6 | Secondary text |
| border | #E5E7EB | #334155 | Borders, dividers |
| error | #8B1E1E (Deep Red) | #B94A4A | Critical alerts, errors |
| warning | #C9A24D | #C9A24D | Important alerts |
| success | #22C55E | #4ADE80 | Success states |

---

## Navigation Structure

**Tab Bar (5 tabs):**
1. Home (house icon)
2. Search (magnifying glass icon)
3. Family (heart icon)
4. Rights (shield icon)
5. Ask AI (chat icon)

---

## Disclaimers

**General Disclaimer** (accessible from all screens):
> "Civilian Law of Knowledge is not a law firm and does not provide legal advice. This information is educational only. Always consult a qualified attorney for legal matters."

**AI Assistant Disclaimer** (always visible):
> "AI responses are for educational purposes only and do not constitute legal advice. Information may not be current. Verify all information with official sources."

**Inmate Search Disclaimer**:
> "Information is sourced from public records and may not be current. Contact the facility directly for the most accurate information."
