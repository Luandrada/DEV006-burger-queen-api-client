export class ToastModel {
    public visible: boolean;

    public title: string;
    public message: string;
    public position: ToastPosition;
    public type: ToastType;

    constructor(visible: boolean) {
        this.visible = visible;

        this.type = ToastType.Info;
        this.position = ToastPosition.TopRight;
    }
}


export enum ToastPosition {
  TopRight = 'position-top-right',
  TopLeft = 'position-top-left',
  Center = 'position-center',
}

export enum ToastType {
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
  None = 'none',
}
