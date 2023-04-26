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
  public deviceType: string = ""; //What type of device? TV, Speaker, Light, Clock, etc.
  public deviceBrand: string = "";
  protected devicePIN: number = 1111;
  protected isOn: boolean = false;
  protected isConnected: boolean = false;
  protected isUnlocked: boolean = false;
  protected isTimerSet: boolean = false;
  protected devicePowerSource: string =  "";
  protected deviceBatteryPercentage: number = 100;
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

class SmartSpeaker extends SmartHome {

  private playlist: string[] = [
    "Bohemian Rhapsody by Queen",
    "Stairway to Heaven by Led Zeppelin",
    "Imagine by John Lennon",
    "Awitin Mo, Isasayaw Ko by VST & Co.",
    "Tuloy Pa Rin by Neocolours",
    "Magasin by Eraserheads",
    "I Will Always Love You by Whitney Houston",
    "Billie Jean by Michael Jackson",
    "Smells Like Teen Spirit by Nirvana",
    "Like a Rolling Stone by Bob Dylan",
    "Hotel California by The Eagles",
    "Hey Jude by The Beatles",
    "Sweet Child O' Mine by Guns N' Roses",
    "Pare Ko by Eraserheads",
    "Narda by Kamikazee",
    "Himala by Rivermaya"
  ]

  private currentSong: string;
  private setVolume: number | undefined;
  private setBrightness: number;
  private lightColor: string;
  protected isOn: boolean = false;
  protected isConnected: boolean = false;
  private numOfLoops: number = 0;

  constructor(
    currentSong: string,
    deviceBrand: string,
    setVolume: number,
    setBrightness: number,
    lightColor: string
  ) {

    super(); 
    this.currentSong = currentSong
    this.deviceBrand = deviceBrand;
    this.setVolume = setVolume;
    this.setBrightness = setBrightness;
    this.lightColor = lightColor;
  }

  public changeVolume(volume: number): void {
    if (!this.isOn) {
      console.log("Device is off, unable to change volume.");
    } else {
      this.setVolume = volume;
      console.log(`Smart Speaker volume set to ${this.setVolume}.`);
    }
  }

  public changeBrightness(brightness: number): void {
    if (!this.isOn) {
      console.log("Device is off, unable to change brightness.");
    } else {
      this.setBrightness = brightness;
      console.log(`Smart Speaker brightness set to ${this.setBrightness}.`);

      if (brightness > 50) {
        this.deviceBatteryPercentage -= 20;
      } else {
        this.deviceBatteryPercentage -= 10;
      }
    }
  }

  public setToIdle(): void {
    if (!this.isOn) {
      console.log("Device is off, unable to set it to idle.");
    } else {
      this.setBrightness = 10;
      this.setVolume = 0;
      console.log(`Smart Speaker is in idle mode.`);
    }
  }

  public mute() {
    if (!this.isOn) {
      console.log("Device is off, unable to mute.");
    } else {
      this.setVolume = 0;
      console.log("Smart Speaker is muted.");
    }
  }

  public connectDevice(device: SmartTV ): void {
    if (!this.isOn) {
      console.log("Device is off, unable to connect.");
    } else {
      console.log(`${this.deviceBrand} is connected to ${device.deviceBrand}`)
    }
  }

  public setLightColor(color: string): void {
    if (!this.isOn) {
      console.log("Device is off, unable to change the color of the lights.");
    } else {
    this.lightColor = color;
    console.log(`The LED lights have been changed to ${this.lightColor}`)
    }
  }

  public shufflePlaylist(): void {
    if (!this.isOn) {
      console.log("Device is off, unable to shuffle.");
    } else {
      for(let i = 0; i < this.playlist.length; i++) {
    let random: number = Math.floor(Math.random() * this.playlist.length)
    console.log(this.playlist[random])
      }
  
    this.deviceBatteryPercentage -= 15
    }
  }

  //Method overloading by playing a new song and changing the volume
  public playMedia(song: string, volume?: number): void{
    if (!this.isOn) {
      console.log("Device is off, unable to play.");
    } else {
      this.setVolume = volume
      this.currentSong = song
      console.log(`${song} is being played`)
    }
  }

  public setLoop(loops: number): void {
    if (!this.isOn) {
      console.log("Device is off, unable to loop.");
    } else {
      this.numOfLoops = loops;
      if (this.numOfLoops != 0) {
        this.isTimerSet = true;
        for (let i = 0; i <= this.numOfLoops; i++) {
          console.log(`${this.currentSong} is being played`)
        }
      }
      
      if (loops > 20) {
        this.deviceBatteryPercentage -= 10
      } else {
        this.deviceBatteryPercentage -= 5
      }
    }
  }

  public getBattery(): void {
    if (!this.isOn) {
      console.log("Device is off, unable to get information.");
    } else {
      console.log(`Your battery life is at ${this.deviceBatteryPercentage}%`)
    }
  }

  public chargeDevice(): void {
    this.deviceBatteryPercentage = 100;
  }

  // Method overriding by changing by make it so that it won't share information if device is off
  public deviceStatus(): void {
    if (!this.isOn) {
      console.log("Device is off") 
    } else {
      console.log(this)
    }
  } //console.log(SmartSpeaker) to view all status/attributes

}

const samsungTV = new SmartTV("samsungTV", 1, 50, 50);

//test methods:
samsungTV.turnOn()
samsungTV.mute();
samsungTV.setOnTimer(8, 0);
console.log(samsungTV.isOn);
console.log(samsungTV.isUnlocked);
samsungTV.unlock(2);

const bluetooth = new SmartSpeaker("Don't Stop Believin by Journey", "JBL", 70, 65, "blue")

bluetooth.turnOn()
bluetooth.chargeDevice()
bluetooth.changeVolume(50)
bluetooth.changeBrightness(40)
bluetooth.setToIdle()
bluetooth.mute()
bluetooth.connectDevice(samsungTV)
bluetooth.setLightColor("red")
bluetooth.shufflePlaylist()
bluetooth.playMedia("Livin' on a Prayer by Bon Jovi", 70)
bluetooth.setLoop(3)
bluetooth.getBattery()
bluetooth.deviceStatus()
bluetooth.turnOff()
