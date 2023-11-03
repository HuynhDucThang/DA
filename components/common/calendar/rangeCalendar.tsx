"use client";

import { useEffect, useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface IDay {
  start_day: string;
  end_day: string;
}

export default function RangeCalendar() {
  const [rangeDate, setRangeDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection123",
  });

  const [dates, setDates] = useState<Date[]>([]);

  let times: IDay[] = [
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

  useEffect(() => {
    function getDatesFromTimes() {
      const dates: any[] = [];

      times.forEach((time) => {
        const startDate = new Date(time.start_day);
        const endDate = new Date(time.end_day);

        // Iterate through the range of dates
        for (
          let date = startDate;
          date <= endDate;
          date.setDate(date.getDate() + 1)
        ) {
          dates.push(new Date(date));
        }
      });

      setDates(dates);
    }

    getDatesFromTimes();
  }, []);

  const handleSelect = (date: any) => {
    setRangeDate((pre) => ({
      ...pre,
      startDate: date.selection123.startDate,
      endDate: date.selection123.endDate,
    }));
  };

  return (
    <div>
      <DateRange
        ranges={[rangeDate]}
        months={2}
        minDate={new Date()}
        rangeColors={["#FD5B61"]}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        direction="horizontal"
        disabledDates={dates ?? []}
        onChange={handleSelect}
        // editableDateInputs={false}
        // showPreview={false}
      />
    </div>
  );
}
