export interface DataPoint {
  value: number;
}

export interface JobListing {
  id: number;
  title: string;
  location: string;
  department: string;
  views: number;
  applications: number;
  timeToFill: number;
  viewsData: DataPoint[];
  applicationsData: DataPoint[];
}
