export interface User {
    cuid: string;
    name: string;
    email: string;
    role: string;
    dashboards: Dashboard[];
  }

export interface Dashboard {
  cuid: string;
  slides: Slide[];
  owner: User;
}

export interface Slide {
  index: string;
  dashboard: Dashboard;
  image: string;
  video: string;
  website: string;
}

export interface Device {
  cuid: string;
  name:string;
}
