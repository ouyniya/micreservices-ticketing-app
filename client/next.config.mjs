// แก้ปัญหาไฟล์ไม่ auto-reload เมื่อใช้ Webpack ในบางสภาพแวดล้อม (Docker, WSL)

export default {
  webpack: (config) => {
    return {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 300,
      },
    };
  },
  allowedDevOrigins: ["ticketing.com"],
};
