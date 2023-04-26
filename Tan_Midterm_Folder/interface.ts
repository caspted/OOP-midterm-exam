export interface SmartOS {
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
