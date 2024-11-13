export interface User {
    cuid: string;
    name: string;
    email: string;
    user_role: string;
    dashboards: Dashboard[];
  }

export interface Dashboard {
  cuid: string;
  name: string;
  slides: Slide[];
  owner: User;
  userCuid: string;
  Device: Device[];
}

export interface Slide {
  cuid: string;
  index: number;
  dashboard: Dashboard;
  image: string;
  video: string;
  website: string;
  dashboardCuid: string;
  duration: number;
}

export interface Device {
  cuid: string;
  name:string;
  dashboardCuid: string;
  dashboard: Dashboard;
}
