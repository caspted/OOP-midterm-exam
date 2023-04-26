import { SmartHome } from "./parentClass";

export class SmartTV extends SmartHome {
  public isOn: boolean = false;
  public isConnected: boolean = false;
  public isUnlocked: boolean = false;
  public isTimerSet: boolean = false;
  private setChannel: number;
  private setVolume: number;
  private setBrightness: number;

  constructor(
    deviceBrand: string,
    setChannel: number,
    setVolume: number,
    setBrightness: number
  ) {
    super();
    this.deviceBrand = deviceBrand;
    this.setChannel = setChannel;
    this.setVolume = setVolume;
    this.setBrightness = setBrightness;
  }

  //methods
  public changeChannel(channel: number): void {
    if (!this.isOn) {
      console.log("Device is off, unable to change channel.");
    } else {
      this.setChannel = channel;
      console.log(`Smart TV channel set to ${this.setChannel}.`);
    }
  }

  public changeVolume(volume: number): void {
    if (!this.isOn) {
      console.log("Device is off, unable to change volume.");
    } else {
      this.setVolume = volume;
      console.log(`Smart TV volume set to ${this.setVolume}.`);
    }
  }

  public changeBrightness(brightness: number): void {
    if (!this.isOn) {
      console.log("Device is off, unable to change brightness.");
    } else {
      this.setBrightness = brightness;
      console.log(`Smart TV brightness set to ${this.setBrightness}.`);
    }
  }

  public setToIdle(): void {
    if (!this.isOn) {
      console.log("Device is off, unable to set it to idle.");
    } else {
      this.setBrightness = 10;
      this.setVolume = 0;
      console.log(`Smart TV is in idle mode.`);
    }
  }

  public mute(): void {
    if (!this.isOn) {
      console.log("Device is off, unable to mute.");
    } else {
      this.setVolume = 0;
      console.log("Smart TV muted.");
    }
  }

  // Method overriding by changing by make it so that it won't share information if device is off
  public deviceStatus(): void {
    if (!this.isOn) {
      console.log("Device is off");
    } else {
      console.log(this);
    }
  } //console.log(SmartTV) to view all status/attributes
}
