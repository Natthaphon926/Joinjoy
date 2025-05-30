export const statusMapping = (status) => {
  const map = {
    approve: {
      title: "ยืนยันเรียบร้อยแล้ว",
      color: "#33BF43",
    },
    pending: {
      title: "กำลังตรวจสอบ",
      color: "#FEDA49",
    },
    reject: {
      title: "ถูกปฏิเสธ",
      color: "#E22424",
    },
  };

  return map[status];
};