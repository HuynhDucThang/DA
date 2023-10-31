"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarCustom() {
  const [value, onChange] = useState(new Date());

  return (
    <Calendar
      minDate={new Date()}
      className={"REACT-CALENDAR p-2"}
      view="month"
      onClickDay={(date) => {
        //   setValues((prev:any) => ({...prev, date: format(date, 'yyyy-MM-dd')}))
        const isoString = new Date(date).toISOString();

        console.log(isoString);
      }}
      tileDisabled={({ activeStartDate, date, view }) => {
        let times = [
          {
            start_day: "2023-10-31T20:10:08.908000+07:00",
            end_day: "2023-10-31T20:10:08.908000+07:00",
          },
          {
            start_day: "2023-11-03T00:00:00+07:00",
            end_day: "2023-11-06T00:00:00+07:00",
          },
          {
            start_day: "2023-11-10T00:00:00+07:00",
            end_day: "2023-11-12T00:00:00+07:00",
          },
          {
            start_day: "2023-11-28T00:00:00+07:00",
            end_day: "2023-11-30T00:00:00+07:00",
          },
        ];

        const isoString = new Date(date);

        for (const time of times) {
          const startDate = new Date(time.start_day);
          const endDate = new Date(time.end_day);

          if (isoString >= startDate && isoString <= endDate) {
            return true;
          }
        }

        return false;
      }}
      // value={date}
    />
  );
}
