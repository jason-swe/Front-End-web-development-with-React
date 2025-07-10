import { useState, useEffect } from 'react';

function useDarkMode(initial = false) {
  // Đọc darkMode từ localStorage nếu có
  const getInitial = () => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) return stored === 'true';
    return initial;
  };
  const [darkMode, setDarkMode] = useState(getInitial);
  // useState dùng để luue trạng thái dark mode true/false

  // useEffect để lưu darkMode vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  //=> mục đích là để khi bật hoặc tắt darkmode thì khi chuyển qua trang nào thì vẫn được lưu trạng thái để ko bị thay đổi liên tục từ dark qua light

  const toggleDarkMode = () => setDarkMode(m => !m); // m là true và !m là false (m là là giá trị của darkMode)
  return [darkMode, toggleDarkMode];
}

export default useDarkMode; 

// Nếu viết setDarkMode(!darkMode), giá trị mới sẽ dựa vào giá trị darkMode tại thời điểm render, có thể bị lỗi nếu cập nhật liên tiếp nhiều lần.
// Dùng hàm setDarkMode(m => !m) là cách an toàn nhất vì luôn lấy giá trị mới nhất của state, tránh bug khi cập nhật liên tục.