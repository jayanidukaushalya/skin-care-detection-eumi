export enum PAGES {
  ROOT = "/",
  LOGIN = "/auth/login",
  REGISTER_SELECT = "/auth/register",
  REGISTER_PATIENT = "/auth/register/patient",
  REGISTER_DOCTOR = "/auth/register/doctor",
  PATIENT_DASHBOARD = "/patient",
  DOCTOR_DASHBOARD = "/doctor",
  QUIZ = "/predict",
  DOCTORS = "patient/doctors",
}

export enum GENDER_TYPE {
  MALE = "Male",
  FEMALE = "Female",
}

export enum PROVINCE {
  WESTERN = "Western",
  CENTRAL = "Central",
  SOUTHERN = "Southern",
  NORTHERN = "Northern",
  EASTERN = "Eastern",
  NORTH_WESTERN = "North Western",
  NORTH_CENTRAL = "North Central",
  UVA = "Uva",
  SABARAGAMUWA = "Sabaragamuwa",
}

export enum DOCTOR_SPECIALIZATION {
  OPHTHALMOLOGIST = "Ophthalmologist (General)",
  CATARACT_SPECIALIST = "Cataract Specialist",
  RETINAL_SURGEON = "Retinal Surgeon",
  CORNEAL_SPECIALIST = "Corneal Specialist",
  ANTERIOR_SEGMENT_SURGEON = "Anterior Segment Surgeon",
  VISION_REHABILITATION_SPECIALIST = "Vision Rehabilitation Specialist",
  OCULOPLASTIC_SURGEON = "Oculoplastic Surgeon",
}

export enum DOCTORS_AVAILABILITY {
  ALL = "ALL",
  UNAVAILABLE = "UNAVAILABLE",
  AVAILABLE = "AVAILABLE",
}

export const PRICE_REGEX = /^\d+(\.\d{0,2})?$/

export enum ENTITY_SORT {
  ASC = "asc",
  DESC = "desc",
}

export enum SORT_BY {
  NAME = "name",
  CREATED_AT = "createdAt",
}

export enum Role {
  DOCTOR = "DOCTOR",
  PATIENT = "PATIENT",
}
