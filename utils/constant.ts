export const ratings: Record<number, string> = {
  1: "Quá Tệ",
  2: "Trung bình",
  3: "Bình thường",
  4: "Rất tốt",
  5: "Tuyệt vời",
};

// var ketQua = ketQuaMap[Math.floor(diem)];

export const DATA_HOUSE_ROLE = [
  {
    key: "Nhận phòng trả phòng",
    subItems: [
      {
        icon: "/amenities/clock.svg",
        subKey: "Nhận phòng sau 14:00",
      },
      {
        icon: "/amenities/clock.svg",
        subKey: "Nhận phòng sau 14:00",
      },
    ],
  },
  {
    key: "Trong thời gian ở",
    subItems: [
      {
        icon: "/amenities/more_people.svg",
        subKey: "Tối đa 3 khách",
      },
      {
        icon: "/amenities/no_smoke.svg",
        subKey: "Cho phép hút thuốc",
      },
      {
        icon: "/amenities/moon.svg",
        subKey: "Khung giờ cần giữ yên lặng : 22:00 - 07:00",
      },
      {
        icon: "/amenities/no_smoke.svg",
        subKey: "Cho phép hút thuốc",
      },
    ],
  },
];

export const DATA_SAFETY_AND_ACCOMMONDATION = [
  {
    key: "Vấn đề cần cân nhắc về an toàn",
    subItems: [
      {
        icon: "/filter/pool.svg",
        subKey: "Cẩn thận ",
      },
      {
        icon: "/filter/lake.svg",
        subKey: "Hồ, sông, nguồn nước khác gần đó",
      },
    ],
  },
  {
    key: "Thiết bị an toàn",
    subItems: [
      {
        icon: "/amenities/cammera.svg",
        subKey: "Có lắp đặt cammera an ninh xung quanh",
      },
    ],
  },
];

export const DATA_CANCEL_POLICY = [
  {
    key: "Hủy muộn nhất vào ngày",
    subItems: [
      {
        icon: "/amenities/clock.svg",
        subKey: "Không hoàn tiền trước 2 ngày đã đặt",
      },
    ],
  },
];
