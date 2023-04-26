
import { SmartHome } from "./parentClass";

export class SmartSpeaker extends SmartHome {

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
    this.deviceType = "Smart Speaker";
    this.devicePIN = "none"
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

  // You can only use this method if there are other devices so I made it a comment for now.
  // public connectDevice(device: SmartTV ): void {
  //   if (!this.isOn) {
  //     console.log("Device is off, unable to connect.");
  //   } else {
  //     console.log(`${this.deviceBrand} is connected to ${device.deviceBrand}`)
  //   }
  // }

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
    this.currentSong = this.playlist[random];
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

  public getBattery(): number | void {
    if (!this.isOn) {
      console.log("Device is off, unable to get information.");
    } else {
      return this.deviceBatteryPercentage 
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

  public resetSettings(): void {
    this.setVolume = 100;
    this.setBrightness = 30;
    this.lightColor = "white";
    this.numOfLoops = 0;

  } //Sets all settings to default by method overidding

}


const bluetooth = new SmartSpeaker("Don't Stop Believin by Journey", "JBL", 70, 65, "blue")

bluetooth.turnOn()

if (bluetooth.getBattery() === 0) {
  bluetooth.chargeDevice()
} 

console.log(bluetooth.getBattery())
bluetooth.changeVolume(50)
bluetooth.changeBrightness(40)
bluetooth.setToIdle()
bluetooth.mute()
bluetooth.setLightColor("red")
bluetooth.shufflePlaylist()
bluetooth.playMedia("Livin' on a Prayer by Bon Jovi", 70)
bluetooth.setLoop(3)
bluetooth.shufflePlaylist()
bluetooth.setLoop(4)
bluetooth.deviceStatus()
bluetooth.resetSettings()
bluetooth.deviceStatus()
bluetooth.turnOff()