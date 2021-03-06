interface OMOPVocabulary {
  omopVocabularyId: string;
  omopVocabularyName: string;
  omopVocabularyVersion: string;
  fhirCanonicalUrl: string;
}

export const omopVocabularies: OMOPVocabulary[] = [
  {
    omopVocabularyId: "ABMS",
    omopVocabularyName:
      "Provider Specialty (American Board of Medical Specialties)",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "AMT",
    omopVocabularyName: "Australian Medicines Terminology (NEHTA)",
    omopVocabularyVersion: "AMT 20160930",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "APC",
    omopVocabularyName: "Ambulatory Payment Classification (CMS)",
    omopVocabularyVersion: "2011-28-09",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "ATC",
    omopVocabularyName: "WHO Anatomic Therapeutic Chemical Classification",
    omopVocabularyVersion: "RxNorm Full 20161003",
    fhirCanonicalUrl: "http://www.whocc.no/atc",
  },
  {
    omopVocabularyId: "BDPM",
    omopVocabularyName: "Public Database of Medications (Social-Sante)",
    omopVocabularyVersion: "BDPM 20150817",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "CIEL",
    omopVocabularyName:
      "Columbia International eHealth Laboratory (Columbia University)",
    omopVocabularyVersion: "Openmrs 1.11.0 20150227",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Cohort",
    omopVocabularyName: "Legacy OMOP HOI or DOI cohort",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Cohort Type",
    omopVocabularyName: "OMOP Cohort Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Concept Class",
    omopVocabularyName: "OMOP Concept Class",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Condition Type",
    omopVocabularyName: "OMOP Condition Occurrence Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Cost Type",
    omopVocabularyName: "OMOP Cost Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "CPT4",
    omopVocabularyName: "Current Procedural Terminology version 4 (AMA)",
    omopVocabularyVersion: "2015AA",
    fhirCanonicalUrl: "http://www.ama-assn.org/go/cpt",
  },
  {
    omopVocabularyId: "Currency",
    omopVocabularyName: "International Currency Symbol (ISO 4217)",
    omopVocabularyVersion: "2008",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Death Type",
    omopVocabularyName: "OMOP Death Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Device Type",
    omopVocabularyName: "OMOP Device Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "dm+d",
    omopVocabularyName: "Dictionary of Medicines and Devices (NHS)",
    omopVocabularyVersion: "dm+d 20150817",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Domain",
    omopVocabularyName: "OMOP Domain",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "DRG",
    omopVocabularyName: "Diagnosis-related group (CMS)",
    omopVocabularyVersion: "2011-18-02",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Drug Type",
    omopVocabularyName: "OMOP Drug Exposure Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "EphMRA ATC",
    omopVocabularyName:
      "Anatomical Classification of Pharmaceutical Products (EphMRA)",
    omopVocabularyVersion: "EphMRA ATC 2016",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Ethnicity",
    omopVocabularyName: "OMOP Ethnicity",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "GCN_SEQNO",
    omopVocabularyName: "Clinical Formulation ID (FDB)",
    omopVocabularyVersion: "20151119 Release",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Gender",
    omopVocabularyName: "OMOP Gender",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "HCPCS",
    omopVocabularyName: "Healthcare Common Procedure Coding System (CMS)",
    omopVocabularyVersion: "2016 Alpha Numeric HCPCS File",
    fhirCanonicalUrl: "http://terminology.hl7.org/CodeSystem/HCPCS",
  },
  {
    omopVocabularyId: "HES Specialty",
    omopVocabularyName: "Hospital Episode Statistics Specialty (NHS)",
    omopVocabularyVersion: "Not implemented yet",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "ICD10",
    omopVocabularyName:
      "International Classification of Diseases, Tenth Revision (WHO)",
    omopVocabularyVersion: "2015 Release",
    fhirCanonicalUrl: "http://hl7.org/fhir/sid/icd-10",
  },
  {
    omopVocabularyId: "ICD10CM",
    omopVocabularyName:
      "International Classification of Diseases, Tenth Revision, Clinical Modification (NCHS)",
    omopVocabularyVersion: "ICD10CM FY2016 code descriptions",
    fhirCanonicalUrl: "http://hl7.org/fhir/sid/icd-10-cm",
  },
  {
    omopVocabularyId: "ICD10PCS",
    omopVocabularyName: "ICD-10 Procedure Coding System (CMS)",
    omopVocabularyVersion: "ICD10PCS 20160518",
    fhirCanonicalUrl: "http://www.icd10data.com/icd10pcs",
  },
  {
    omopVocabularyId: "ICD9CM",
    omopVocabularyName:
      "International Classification of Diseases, Ninth Revision, Clinical Modification, Volume 1 and 2 (NCHS)",
    omopVocabularyVersion: "ICD9CM v32 master descriptions",
    fhirCanonicalUrl: "http://hl7.org/fhir/sid/icd-9-cm",
  },
  {
    omopVocabularyId: "ICD9Proc",
    omopVocabularyName:
      "International Classification of Diseases, Ninth Revision, Clinical Modification, Volume 3 (NCHS)",
    omopVocabularyVersion: "ICD9CM v32 master descriptions",
    fhirCanonicalUrl: "http://hl7.org/fhir/sid/icd-9-cm",
  },
  {
    omopVocabularyId: "LOINC",
    omopVocabularyName:
      "Logical Observation Identifiers Names and Codes (Regenstrief Institute)",
    omopVocabularyVersion: "LOINC 2.56",
    fhirCanonicalUrl: "http://loinc.org",
  },
  {
    omopVocabularyId: "MDC",
    omopVocabularyName: "Major Diagnostic Categories (CMS)",
    omopVocabularyVersion: "2013-01-06",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Meas Type",
    omopVocabularyName: "OMOP Measurement Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "MedDRA",
    omopVocabularyName: "Medical Dictionary for Regulatory Activities (MSSO)",
    omopVocabularyVersion: "MedDRA version 19.1",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "MeSH",
    omopVocabularyName: "Medical Subject Headings (NLM)",
    omopVocabularyVersion: "2016 Release",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Multum",
    omopVocabularyName: "Cerner Multum (Cerner)",
    omopVocabularyVersion: "2013-07-10",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "NDC",
    omopVocabularyName: "National Drug Code (FDA and manufacturers)",
    omopVocabularyVersion: "dm+d 20150817",
    fhirCanonicalUrl: "http://hl7.org/fhir/sid/ndc",
  },
  {
    omopVocabularyId: "NDFRT",
    omopVocabularyName: "National Drug File - Reference Terminology (VA)",
    omopVocabularyVersion: "RxNorm Full 20161003",
    fhirCanonicalUrl: "http://hl7.org/fhir/ndfrt",
  },
  {
    omopVocabularyId: "NFC",
    omopVocabularyName: "New Form Code (EphMRA)",
    omopVocabularyVersion: "NFC 20160704",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "None",
    omopVocabularyName: "OMOP Standardized Vocabularies",
    omopVocabularyVersion: "v5.0 18-DEC-16",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Note Type",
    omopVocabularyName: "OMOP Note Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "NUCC",
    omopVocabularyName:
      "National Uniform Claim Committee Health Care Provider Taxonomy Code Set (NUCC)",
    omopVocabularyVersion: "2013-07-01",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Observation Type",
    omopVocabularyName: "OMOP Observation Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Obs Period Type",
    omopVocabularyName: "OMOP Observation Period Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "OPCS4",
    omopVocabularyName:
      "OPCS Classification of Interventions and Procedures version 4 (NHS)",
    omopVocabularyVersion: "OPCS4 nhs_dmwb_22.0.0_20161001000001",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "OXMIS",
    omopVocabularyName: "Oxford Medical Information System (OCHP)",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "PCORNet",
    omopVocabularyName:
      "National Patient-Centered Clinical Research Network (PCORI)",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Place of Service",
    omopVocabularyName: "Place of Service Codes for Professional Claims (CMS)",
    omopVocabularyVersion: "2009-01-11",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Procedure Type",
    omopVocabularyName: "OMOP Procedure Occurrence Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Race",
    omopVocabularyName: "Race and Ethnicity Code Set (USBC)",
    omopVocabularyVersion: "Version 1.0",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Relationship",
    omopVocabularyName: "OMOP Relationship",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Revenue Code",
    omopVocabularyName: "UB04/CMS1450 Revenue Codes (CMS)",
    omopVocabularyVersion: "2010 Release",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "RxNorm",
    omopVocabularyName: "RxNorm (NLM)",
    omopVocabularyVersion: "RxNorm Full 20161003",
    fhirCanonicalUrl: "http://www.nlm.nih.gov/research/umls/rxnorm",
  },
  {
    omopVocabularyId: "RxNorm Extension",
    omopVocabularyName: "RxNorm Extension (OMOP)",
    omopVocabularyVersion: "RxNorm Extension 20161212",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "SMQ",
    omopVocabularyName: "Standardised MedDRA Queries (MSSO)",
    omopVocabularyVersion: "Version 14.0",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "SNOMED",
    omopVocabularyName:
      "Systematic Nomenclature of Medicine - Clinical Terms (IHTSDO)",
    omopVocabularyVersion: "SnomedCT Release 20161005",
    fhirCanonicalUrl: "http://snomed.info/sct",
  },
  {
    omopVocabularyId: "Specialty",
    omopVocabularyName: "Medicare provider/supplier specialty codes (CMS)",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "SPL",
    omopVocabularyName: "Structured Product Labeling (FDA)",
    omopVocabularyVersion: "RxNorm Extension 20160807",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "UCUM",
    omopVocabularyName:
      "Unified Code for Units of Measure (Regenstrief Institute)",
    omopVocabularyVersion: "Version 1.8.2",
    fhirCanonicalUrl: "http://unitsofmeasure.org",
  },
  {
    omopVocabularyId: "VA Class",
    omopVocabularyName: "VA National Drug File Class (VA)",
    omopVocabularyVersion: "RxNorm Full 20161003",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "VA Product",
    omopVocabularyName: "VA National Drug File Product (VA)",
    omopVocabularyVersion: "RxNorm Full 20161003",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Visit",
    omopVocabularyName: "OMOP Visit",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Visit Type",
    omopVocabularyName: "OMOP Visit Type",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
  {
    omopVocabularyId: "Vocabulary",
    omopVocabularyName: "OMOP Vocabulary",
    omopVocabularyVersion: "",
    fhirCanonicalUrl: "",
  },
];
