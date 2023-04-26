import { SmartOS } from "./interface";

export abstract class SmartHome implements SmartOS {
  public deviceType: string = ""; //What type of device? TV, Speaker, Light, Clock, etc.
  public deviceBrand: string = "";
  protected devicePIN: number | string = 1111;
  protected isOn: boolean = false;
  protected isConnected: boolean = false;
  protected isUnlocked: boolean = false;
  protected isTimerSet: boolean = false;
  protected deviceBatteryPercentage: number = 0;
  protected offTimerStatus: string = "Off timer not set.";
  protected onTimerStatus: string = "On timer not set.";

  deviceStatus(): void {
    console.log(this);
  } //console.log(object) to view all status/attributes

  isPinValid(enteredPin: number): boolean {
    if (this.devicePIN === enteredPin) {
      this.isUnlocked = true;
      console.log("The device is now unlocked.");
      return true;
    } else {
      console.log("Invalid PIN entered, device remains locked.");
      return false;
    } 
  }

  turnOn(): void {
    this.isOn = true;
  }

  turnOff(): void {
    this.isOn = false;
  }

  connect(): void {
    this.isConnected = true;
  }

  disconnect(): void {
    this.isConnected = false;
  }

  lock(): void {
    this.isUnlocked = false;
  }

  unlock(pin: number): void {
    this.isPinValid(pin);
  }

  setOffTimer(hour: number, minute: number): void;
  setOffTimer(hour: number, minute: number, enteredPin: number): void;
  setOffTimer(hour: number, minute: number, enteredPin?: number): void {
    if (!this.isUnlocked && (!enteredPin || !this.isPinValid(enteredPin))) {
      console.log(
        "The device is locked. Cannot set the off timer without a valid PIN."
      );
      return;
    }

    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
      this.isTimerSet = true;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      this.offTimerStatus = `${hour}:${formattedMinute}`;
      console.log(`Off timer set to: ${this.offTimerStatus}.`);
    } else {
      console.log("Invalid input");
    }
  }

  setOnTimer(hour: number, minute: number): void;
  setOnTimer(hour: number, minute: number, enteredPin: number): void;
  setOnTimer(hour: number, minute: number, enteredPin?: number): void {
    // Check if the device is locked and no valid PIN is provided
    if (!this.isUnlocked && (!enteredPin || !this.isPinValid(enteredPin))) {
      console.log(
        "The device is locked. Cannot set the on timer without a valid PIN."
      );
      return;
    }

    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
      this.isTimerSet = true;
      const formattedMinute = minute < 10 ? `0${minute}` : minute;
      this.onTimerStatus = `${hour}:${formattedMinute}`;
      console.log(`On timer set to: ${this.onTimerStatus}.`);
    } else {
      console.log("Invalid input");
    }
  }

  playMedia(media: string): void {
    console.log(`Playing media: ${media}`);
  }

  resetTimer(): void {
    this.isTimerSet = false;
    this.onTimerStatus = "On timer not set.";
    this.offTimerStatus = "Off timer not set.";
    console.log("On and off timer disabled.");
  }

  resetSettings(): void {
    this.isTimerSet = false;
  } //Sets all settings to default (resets timer, volume, etc.)
}