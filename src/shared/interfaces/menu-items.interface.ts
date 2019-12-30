export interface IMenuItems {
  plans: IMenuItem,
  history: IMenuItem,
  diary: IMenuItem,
  progress: IMenuItem,
  personal: IMenuItem,
}

export interface IMenuItem {
  id: number,
  url: string,
  name: string,
  icon: string,
  isActive: boolean,
}