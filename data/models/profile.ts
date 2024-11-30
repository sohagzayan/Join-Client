export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  activities?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies: string[];
}

export interface ProfileFormData {
  name: string;
  photo?: string;
  location: string;
  primaryRole: string;
  yearsOfExperience: string;
  openToRoles: string[];
  bio: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  achievements: string;
  salary?: {
    minimum: number;
    maximum: number;
    currency: string;
  };
  availability: {
    immediate: boolean;
    notice: number;
  };
  preferences: {
    remoteOnly: boolean;
    willingToRelocate: boolean;
    preferredLocations: string[];
  };
  socialLinks: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  pronouns?: string;
  genderIdentity?: string;
  ethnicity?: string[];
  displayDemographics: boolean;
}
