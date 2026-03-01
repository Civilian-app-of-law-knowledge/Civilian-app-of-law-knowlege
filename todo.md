# Project TODO

## Core Setup
- [x] Configure brand colors in theme.config.js
- [x] Update app.config.ts with app name and logo
- [x] Add icon mappings in icon-symbol.tsx

## Screens - Legal Knowledge
- [x] Home Screen with mission statement and quick actions
- [x] Know Your Rights Screen with categories
- [x] Rights Detail Screen
- [x] Law Updates Screen with priority filters
- [x] Update Detail Screen
- [x] FAQ Screen with accordion

## Screens - Inmate Lookup
- [x] Inmate Search Screen (by name, docket, case number)
- [x] Inmate Detail Screen (facility, charges, booking info)
- [x] Case Lookup Screen (affidavit, court records)

## Screens - Family Support
- [x] Family Hub Screen (main family resources)
- [x] Phone Services Screen (GTL, Securus, ICSolutions setup)
- [x] Commissary Guide Screen (how to send money/items)
- [x] Secure Packs Screen (care package info)
- [x] Visitation Info Screen (scheduling, rules)
- [x] Mail Guidelines Screen (what's allowed, addresses)

## Screens - Facility Directory
- [x] Facility Search Screen
- [x] Facility Detail Screen (contact, hours, services)

## Screens - Resources & AI
- [x] Resources Screen with category filters
- [x] Resource Detail Screen with external links
- [x] AI Assistant Screen with chat interface

## Features - Data
- [x] Legal rights content data
- [x] Law updates data with sources
- [x] Facility directory data
- [x] Phone service provider data
- [x] Commissary and secure pack info
- [x] FAQ data

## Features - Inmate Beneficial
- [x] Bail/Bond information guide
- [x] Public Defender resources
- [x] Sentence calculator (good time credits)
- [x] Grievance filing guide
- [x] Medical request templates
- [x] Legal mail guidelines
- [x] Reentry resources (jobs, housing, ID)
- [x] Emergency hotlines

## Features - Core
- [x] Search functionality across content
- [x] AI-powered Q&A integration
- [x] External links to official sources
- [x] Legal disclaimer component

## Branding
- [x] Generate custom app logo
- [x] Update all icon assets
- [x] Configure splash screen

## Final
- [x] Test all user flows
- [x] Save checkpoint
- [x] Deliver to user


## Expungement Guide (NEW)
- [x] Create comprehensive expungement data (types, eligibility, process)
- [x] Build Expungement Guide screen with step-by-step instructions
- [x] Add state-specific expungement information
- [x] Include links to official forms and resources
- [x] Add expungement as prominent feature on home screen


## Expungement Eligibility Quiz (NEW)
- [x] Build interactive quiz screen with step-by-step questions
- [x] Add questions for offense type, time elapsed, sentence completion, state
- [x] Create personalized results with eligibility assessment
- [x] Add quiz link to expungement guide page
- [x] Include next steps and resources based on results


## Family Support Enhancements (NEW)
- [x] Add family reunification resources screen
- [x] Add parent-child reunification programs
- [x] Add family counseling services info
- [x] Add children of incarcerated parents support
- [x] Make Family Hub more friendly and welcoming

## Rehab Alternatives (NEW)
- [x] Add rehab vs jail alternatives screen
- [x] Add drug court programs info
- [x] Add diversion programs info
- [x] Add treatment alternatives to incarceration

## Community Resources (NEW)
- [x] Add food pantries screen
- [x] Add clothing assistance resources
- [x] Add housing assistance programs
- [x] Add utility assistance info

## Job Resources (NEW)
- [x] Add job search screen for people with backgrounds
- [x] Add second chance employers list
- [x] Add work release job resources
- [x] Add job training programs
- [x] Add resume help resources


## My Case Feature (NEW)
- [x] Create secure storage utilities with encryption
- [x] Build case data models (case info, court dates, contacts, documents)
- [x] Create My Case main screen with case overview
- [x] Build court dates tracker with countdown and reminders
- [x] Build document storage with file picker
- [x] Build legal contacts management (attorney, PD, PO, bondsman)
- [x] Add case timeline/history view
- [x] Add notes and to-do items for case
- [x] Add My Case to home screen quick actions
- [x] Implement data persistence with AsyncStorage


## Calendar Sync Feature (NEW)
- [x] Install expo-calendar package
- [x] Create calendar sync utility with permission handling
- [x] Add "Add to Calendar" button on court date screens
- [x] Create calendar events with title, date, time, location
- [x] Add reminder alerts (1 day and 1 hour before)
- [x] Handle iOS and Android calendar permissions


## Push Notifications Feature (NEW)
- [x] Create notification service with expo-notifications
- [x] Implement notification scheduling for court dates
- [x] Add reminders at 1 day, 1 hour, and 15 minutes before
- [x] Create notification settings screen
- [x] Add task due date notifications
- [x] Handle notification permissions
- [x] Integrate with case storage to auto-schedule notifications


## QR Code Sharing Feature (NEW)
- [x] Install QR code generation package
- [x] Create secure sharing utilities with encryption
- [x] Build share case screen with QR code display
- [x] Add selection for what details to share
- [x] Add expiration time options for security
- [x] Add share buttons to My Case screens
- [x] Create view shared case screen for recipients


## Final Polish for PWA Publishing (NEW)
- [x] Improve desktop layout with max-width containers
- [x] Add responsive grid for quick actions on larger screens
- [x] Add footer with disclaimer, contact info, and key links
- [x] Ensure all screens have proper desktop spacing


## Final Comprehensive Update (NEW)
- [x] Expand legal-content.ts with 50+ real resource links
- [x] Add all 50 state inmate lookup portals
- [x] Add comprehensive phone service provider details
- [x] Add all major commissary providers with links
- [x] Expand facilities database with real data
- [x] Add auto-refresh every 6 hours
- [x] Add inmate rights by state
- [x] Add bail bond companies directory
- [x] Add public defender offices by state
- [x] Add legal aid organizations by state
- [x] Add reentry programs database
- [x] Add victim services resources
- [x] Add mental health resources for inmates/families
- [x] Add substance abuse treatment resources
- [x] Add housing assistance programs
- [x] Add employment resources for formerly incarcerated
- [x] Update footer with comprehensive links


## Expanded Second Chance Employers (COMPLETED)
- [x] Add 55+ companies known to hire former inmates
- [x] Organize by 12 industries (retail, food service, warehouse, construction, manufacturing, transportation, tech, hospitality, staffing, food production, healthcare)
- [x] Include application tips and notes for each company
- [x] Add "Ban the Box" and "Open Hiring" badges
- [x] Include franchise and self-employment opportunities (SBA, food trucks, cleaning, landscaping)
- [x] Add 5 staffing agencies that work with formerly incarcerated
- [x] Add 8 free training programs including coding bootcamps
- [x] Add 6 job search sites
- [x] Expand employment rights section to 8 rights
- [x] Add "Show More" pagination for large employer lists


## Grievance Filing System (NEW)
- [x] Build comprehensive grievance guide with state-specific procedures
- [x] Add grievance templates and sample forms
- [x] Add grievance tracking tips
- [x] Include appeals process for denied grievances
- [x] Add PREA (Prison Rape Elimination Act) complaint info

## Work Release Petition Center (NEW)
- [x] Build work release petition guide for every county
- [x] Add sample petition templates
- [x] Include eligibility requirements by state
- [x] Add work release success stories and benefits
- [x] Include employer partnership info
- [x] Add transportation resources and jail banking info

## Inmate Education Hub (NEW)
- [x] Build education screen with GED programs
- [x] Add college courses available in facilities (Bard, Cornell, Ashland, etc.)
- [x] Add certification programs (OSHA, food handler, forklift, CDL, welding, HVAC)
- [x] Include trade school programs
- [x] Add coding/tech bootcamps (The Last Mile, freeCodeCamp, Google IT)

## Jail Banking & Finances (NEW)
- [x] Build jail banking explainer in work release screen
- [x] Add percentage breakdown (fines, savings, spending)
- [x] Add tips for saving money while incarcerated
- [x] Include release fund information

## Inmate Tablet Resources (NEW)
- [x] Build tablet resources screen (JPay, GTL, Securus, Edovo, APDS)
- [x] Add educational apps available on tablets
- [x] Add communication tools info
- [x] Include future AI-in-cell concept ideas (7 future tech concepts)

## CO Accountability Guide (NEW)
- [x] Build CO accountability and documentation screen
- [x] Add how to file complaints against COs (10 filing options)
- [x] Add incident documentation templates (10 steps)
- [x] Include rights during interactions with COs (10 rights)

## Inmate Wellness (NEW)
- [x] Add mental health resources (SAMHSA, Crisis Text Line, NAMI)
- [x] Add physical health and fitness programs
- [x] Add spiritual and religious resources
- [x] Add home screen links to all new features


## SSI & Benefits Center (NEW)
- [x] Build SSI/SSDI benefits screen for institutionalized
- [x] Add how to apply, appeal process, where to appeal
- [x] Add Medicaid, SNAP, housing assistance eligibility
- [x] Add benefit reinstatement after release guide

## Charge Reduction Hub (NEW)
- [x] Build charge reduction/dismissal programs screen
- [x] Add ARD, PTI, deferred adjudication info
- [x] Add AARP legal help and pro bono programs
- [x] Add plea bargaining guide

## Law Change Alerts (NEW)
- [x] Build law change alerts/notifications screen
- [x] Add real-time law update feed with categories
- [x] Add push notification integration for new laws

## Lawyer Directory (NEW)
- [x] Build searchable lawyer directory by county/specialty
- [x] Add ratings and reviews system
- [x] Add specialty tags (DUI, domestic, felony, etc.)
- [x] Add public defender vs private comparison

## Prosecutor's Office Info (NEW)
- [x] Build DA/prosecutor office directory by county
- [x] Add domestic violence units info
- [x] Add victim advocacy resources

## Outdoor & Hunting Laws (NEW)
- [x] Build hunting/fishing/outdoor laws screen
- [x] Add hunting seasons by state
- [x] Add firearm restrictions for felons
- [x] Add DNR contacts and license info

## Probation & Parole Guide (NEW)
- [x] Build probation/parole rules and guide screen
- [x] Add early termination request process
- [x] Add violation consequences and rights
- [x] Add travel permission info

## Warrant Check Resources (NEW)
- [x] Build warrant check and handling screen
- [x] Add how to check for warrants safely
- [x] Add how to handle outstanding warrants

## Voting Rights Restoration (NEW)
- [x] Build state-by-state voting rights restoration guide
- [x] Add registration process after restoration

## Child Support During Incarceration (NEW)
- [x] Build child support modification guide
- [x] Add how to avoid arrears while incarcerated
- [x] Add rights and obligations info

## Veterans Benefits (NEW)
- [x] Build VA benefits for incarcerated veterans screen
- [x] Add HCRV program and VJO courts info
- [x] Add veteran-specific reentry resources

## Immigration & ICE Holds (NEW)
- [x] Build immigration rights and ICE detainer screen
- [x] Add deportation defense resources
- [x] Add know your rights with ICE

## Fix Inmate Name Search (NEW)
- [x] Fix search tab with all 50 state DOC portals
- [x] Add state filter for quick access
- [x] Add court search tools for docket/case number
- [x] Add search tips and guidance
- [x] Link to VINELink, BOP, and all state portals
