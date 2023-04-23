interface SmartOS {
  turnOff(): void;
  turnOn(): void;
  connect(): void;
  disconnect(): void;
  lock(): void;
  unlock(pin: number): void;
  setOffTimer(hour: number, minute: number): void;
  setOnTimer(hour: number, minute: number): void;
  resetTimer(): void;
  resetSettings(): void; //Sets all settings to default (resets timer, volume, etc.)
  deviceStatus(): void; //console.log(object) to view all status/attributes
}

abstract class SmartHome implements SmartOS {
  public deviceType: string; //What type of device? TV, Speaker, Light, Clock, etc.
  public deviceBrand: string;
  protected devicePIN: number = 1111;
  protected isOn: boolean;
  protected isConnected: boolean;
  protected isUnlocked: boolean;
  protected isTimerSet: boolean;
  protected devicePowerSource: string;
  protected deviceBatteryPercentage: number;
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

class SmartTV extends SmartHome {
  setChannel: number;
  setVolume: number;
  setBrightness: number;
  isOn: boolean = false;
  isConnected: boolean = false;
  isUnlocked: boolean = false;
  isTimerSet: boolean = false;

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
  changeChannel(channel: number) {
    if (!this.isOn) {
      console.log("Device is off, unable to change channel.");
    } else {
      this.setChannel = channel;
      console.log(`Smart TV channel set to ${this.setChannel}.`);
    }
  }

  changeVolume(volume: number) {
    if (!this.isOn) {
      console.log("Device is off, unable to change volume.");
    } else {
      this.setVolume = volume;
      console.log(`Smart TV volume set to ${this.setVolume}.`);
    }
  }

  changeBrightness(brightness: number) {
    if (!this.isOn) {
      console.log("Device is off, unable to change brightness.");
    } else {
      this.setBrightness = brightness;
      console.log(`Smart TV brightness set to ${this.setBrightness}.`);
    }
  }

  setToIdle() {
    if (!this.isOn) {
      console.log("Device is off, unable to set it to idle.");
    } else {
      this.setBrightness = 10;
      this.setVolume = 0;
      console.log(`Smart TV is in idle mode.`);
    }
  }

  mute() {
    if (!this.isOn) {
      console.log("Device is off, unable to mute.");
    } else {
      this.setVolume = 0;
      console.log("Smart TV muted.");
    }
  }
}

const samsungTV = new SmartTV("samsungTV", 1, 50, 50);

//test methods:
samsungTV.mute();
samsungTV.setOnTimer(8, 0);
console.log(samsungTV.isOn);
console.log(samsungTV.isUnlocked);
samsungTV.unlock(2);
