interface SmartUse {
  turnOff(): void;
  turnOn(): void;
  setBrightness(brightness: number): void;
  setTemperature(temperature: number): void;
  setColor(color: string): void;
  locked(): void;
  unlocked(): void;
  connect(): void;
  disconnect(): void;
  isLocked(): void;
}

abstract class SmartHome implements SmartUse {
  protected isConnected: boolean = false;
  protected isDeviceOn: boolean = false;
  protected isDeviceLocked: boolean = false;

  abstract turnOff(): void;
  abstract turnOn(): void;
  abstract setBrightness(brightness: number): void;
  abstract setTemperature(temperature: number): void;
  abstract setColor(color: string): void;
  abstract isLocked(): void;

  public locked(): void {
    this.isDeviceOn = true;
  }

  public unlocked(): void {
    this.isDeviceOn = false;
  }

  public connect(): void {
    this.isConnected = true;
  }

  public disconnect(): void {
    this.isConnected = false;
  }

}
class SmartTV extends SmartHome {
  private _currentChannel: string;
  private _currentBrightness: number;
  private _currentColor: string;
  private _currentVolume: number;

  constructor(currentChannel: string, currentBrightness: number, currentColor: string, currentVolume: number) {
    super()
    this._currentChannel = currentChannel;
    this._currentBrightness = currentBrightness;
    this._currentColor = currentColor;
    this._currentVolume = currentVolume;
  }

  public turnOff(): void {
    this.isDeviceOn = false;
    console.log(`The SmartTV is off.`)
  }

  public turnOn(): void {
    this.isDeviceOn = true;
    console.log(`The SmartTV is on.`);
  }

  public setBrightness(brightness: number): void {
    this._currentBrightness = brightness;
    console.log(`The current brightness of the SmartTV is ${this._currentBrightness}`)
  }

  public setColor(color: string): void {
    this._currentColor = color;
    console.log(`The current color of the SmartTV is ${this._currentColor}`);
  }

  public setChannel(channel: string): void {
    this._currentChannel = channel;
  }

  public getChannel(): void {
    console.log(`The current channel is ${this._currentChannel}`);
  }

  public setVolume(volume: number): void {
    this._currentVolume = volume;
  }

  public getVolume(): void {
    console.log(`The current volume is ${this._currentVolume}`)
  }

}

class SmartLight extends SmartHome {
  private currentBrightness: number = 50;
  private currentColor: string = 'white';

  public turnOn(): void {
    this.isDeviceOn = true;
    console.log('Smart light is on');
  }

  public turnOff(): void {
    this.isDeviceOn = false;
    console.log('Smart light is off');
  }

  public setBrightness(value: number): void {
    this.currentBrightness = value;
    console.log(`Smart light brightness set to ${value}`);
  }

  public setColor(color: string): void {
    this.currentColor = color;
    console.log(`Smart light color set to ${color}`);
  }

  public getCurrentBrightness(): number {
    return this.currentBrightness;
  }

  public getCurrentColor(): string {
    return this.currentColor;
  }

}