
export class Logger {
  constructor(
    private name: string) {
  }

  info(...objects: unknown[]): void {
    console.info(...[`[${this.name}]`, ...objects]);
  }
}
