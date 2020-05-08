import format from 'dateformat';


export class DateTime extends Date {
  format(mask: string): string {
    return format(this, mask);
  }

  dateTime(): string {
    return format(this, "dd.mm.yyyy HH:MM:ss");
  }

  longDate(): string {
    return format(this, "dd.mm.yyyy");
  }

  shortDate(): string {
    return format(this, "dd.mm");
  }

  longTime(): string {
    return format(this, "HH:MM:ss");
  }

  shortTime(): string {
    return format(this, "HH:MM");
  }
}
