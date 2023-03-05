import { WidgetType } from "./bindings/WidgetType";
import { Date } from "./bindings/Date";

export function widgetTitle(widgetType: WidgetType): string {
  return widgetType.split(/(?=[A-Z])/).join(" ");
}

export function cmpDate(d1: Date, d2: Date): number {
  if (d1.year == d2.year) {
    if (d1.month == d2.month) {
      return d1.day - d2.day;
    }
    return d1.month - d2.month;
  }
  return d1.year - d2.year;
}
