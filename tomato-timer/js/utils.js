// 如果一个数小于10，就给它前头加个前缀“0”
const addZero = (n) => {
  if (n > 9) return `${n}`;

  return `0${n}`;
};

// 渲染 DOM 元素的内容
const renderContent = ($dom, text) => {
  $dom && ($dom.innerText = text);
};
