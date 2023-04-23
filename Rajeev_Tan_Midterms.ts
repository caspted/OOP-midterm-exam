interface SmartUse {
  turnOff(): void;
  turnOn(): void;
  connect(): void;
  disconnect(): void;
  getEnergyLeft(): number;
  autoCharge(): void;
  setTimer(timer: number): void;
  mute(): void;
  unmute(): void;
  adjustVolume(volume: number): void;

}

abstract class SmartHome implements SmartUse {
  protected isConnected: boolean = false;
  protected isDeviceOn: boolean = false;
  protected currentEnergy: number = 100
  protected currentVolume: number = 65;
  protected currentTimerSet: number = 0;

  abstract turnOff(): void;

  abstract turnOn(): void;

  connect(): void {
    this.isConnected = true;
  }

  disconnect(): void {
    this.isConnected = false;
  }

  setTimer(timer: number): void {
    this.currentTimerSet = timer;
  }

  mute(): void {
    this.currentVolume = 0;
  }

  unmute(): void {
    this.currentVolume = 65;
  }

  autoCharge(): void {
    this.currentEnergy = 100;
  }

  getEnergyLeft(): number {
    return this.currentEnergy
   }

  adjustVolume(volume: number): void {
    if (volume >= 0 && volume <= 100) {
      this.currentVolume = volume;
  }
}
}

class SmartTV extends SmartHome {

  constructor (currentTimerSet: number, currentVolume: number) {
    super()
    this.currentTimerSet = currentTimerSet;
    this.currentVolume = currentVolume;
  }

  public turnOn(): void {
    console.log('Smart TV is on');
  }

  public turnOff(): void {
    console.log('Smart TV is off');
  }

  public connect(): void {
    super.connect();
    console.log(`Smart TV is connected`)
  }

  public disconnect(): void {
    super.disconnect();
    console.log(`Smart TV is disconnected`)
  }

  public setTimer(timer: number): void {
      super.setTimer(timer);
  }

  public mute(): void {
    super.mute();
    console.log(`Smart TV has been muted`)
  }

  public unmute(): void {
    super.unmute();
    console.log("Smart TV has been unmuted")
  }

  public autoCharge(): void {
    super.autoCharge();
    console.log("Smart TV has successfully charged")
  }

  public getEnergyLeft(): number {
    return super.getEnergyLeft();
  }

  public adjustVolume(volume: number): void {
    super.adjustVolume(volume);
    console.log(`Current Volume is at ${this.currentVolume}`)
  }

}

class SmartSpeaker extends SmartHome {
  constructor (currentTimerSet: number, currentVolume: number) {
    super()
    this.currentTimerSet = currentTimerSet;
    this.currentVolume = currentVolume;
  }

  public turnOn(): void {
    console.log('Smart speaker is on');
  }

  public turnOff(): void {
    console.log('Smart speaker is off');
  }

  public connect(): void {
    super.connect();
    console.log(`Smart speaker is connected`)
  }

  public disconnect(): void {
    super.disconnect();
    console.log(`Smart speaker is disconnected`)
  }

  public setTimer(timer: number): void {
      super.setTimer(timer);
  }

  public mute(): void {
    super.mute();
    console.log(`Smart speaker has been muted`)
  }

  public unmute(): void {
    super.unmute();
    console.log("Smart speaker has been unmuted")
  }

  public autoCharge(): void {
    super.autoCharge();
    console.log("Smart speaker has successfully charged")
  }
  public getEnergyLeft(): number {
    return super.getEnergyLeft();
  }
  public adjustVolume(volume: number): void {
    super.adjustVolume(volume);
    console.log(`Current Volume is at ${this.currentVolume}`)
  }
}

// Test SmartTV
const smartTV = new SmartTV(30, 50); // Initialize SmartTV with a timer of 30 and volume of 50
smartTV.turnOn(); //"Smart TV is on"
smartTV.connect(); //"Smart TV is connected"
smartTV.setTimer(45); // Set timer to 45
smartTV.adjustVolume(80); //"Current Volume is at 80"
smartTV.mute(); //"Smart TV has been muted"
console.log(smartTV.getEnergyLeft()); //100
smartTV.autoCharge(); //"Smart TV has successfully charged"
smartTV.disconnect(); //"Smart TV is disconnected"
smartTV.turnOff(); //"Smart TV is off"

// Test SmartSpeaker
const smartSpeaker = new SmartSpeaker(60, 75); // Initialize SmartSpeaker with a timer of 60 and volume of 75
smartSpeaker.turnOn(); //"Smart speaker is on"
smartSpeaker.connect(); // "Smart speaker is connected"
smartSpeaker.setTimer(90); // Set timer to 90
smartSpeaker.adjustVolume(40); // "Current Volume is at 40"
smartSpeaker.mute(); //"Smart speaker has been muted"
console.log(smartSpeaker.getEnergyLeft()); // 100
smartSpeaker.autoCharge(); // "Smart speaker has successfully charged"
smartSpeaker.disconnect(); // "Smart speaker is disconnected"
smartSpeaker.turnOff(); // "Smart speaker is off"
