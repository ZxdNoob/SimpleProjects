const fullTime = 1500; // 一个番茄计时所需的秒数，25分钟
const restTime = 300; // 休息时长总秒数，5分钟
let isWork = true; // 是否为工作模式，默认为工作模式

// 获取一些必要的 DOM 元素
const $modeButton = document.querySelector('.mode');
const $showLogButton = document.querySelector('.button.log');
const $minutes = document.getElementById('minutes');
const $seconds = document.getElementById('seconds');
const $ctrTimeButton = document.querySelector('.ctr-time-button');
const $resetButton = document.querySelector('.reset-button');
const $logContainer = document.querySelector('.log-container');
const $mask = document.getElementById('mask');

// 番茄计时器
class Timer {
  timer = null;
  myTime = fullTime;

  // 获取当前模式下最大秒数
  getFullTime() {
    const result = isWork ? fullTime : restTime;

    return result;
  }

  // 设置时间
  setTime(seconds) {
    this.myTime = seconds;
  }

  // 获取分秒数
  getTime() {
    const minutes = Math.floor(this.myTime / 60); // 获取分钟部分
    const seconds = this.myTime % 60; // 获取余下的秒数

    return {
      minutes: addZero(minutes),
      seconds: addZero(seconds),
    };
  }

  // 渲染番茄计时器容器主内容
  renderFqMainContent() {
    renderContent($minutes, this.getTime().minutes);
    renderContent($seconds, this.getTime().seconds);
  }

  // 启动计时器
  startTime() {
    this.timer && clearInterval(this.timer);

    this.timer = setInterval(() => {
      this.myTime--;

      if (this.myTime < 0) {
        this.resetStatus();
      }

      this.renderFqMainContent();
    }, 1e3);
  }

  // 暂停计时器
  stopTime() {
    clearInterval(this.timer);
  }

  // 重置状态
  resetStatus() {
    if (this.myTime === this.getFullTime()) return;

    this.stopTime();
    this.myTime = this.getFullTime();

    renderContent($ctrTimeButton, '开始');
  }

  // 重置计时器
  resetTime() {
    if (this.myTime === this.getFullTime()) return;

    this.resetStatus();
    this.renderFqMainContent();
  }
}

const fqTimer = new Timer(); // 实例化计时器

$modeButton.onclick = () => {
  isWork = !isWork;

  const finalModeButtonText = isWork ? '休息' : '工作';

  if (isWork) {
    fqTimer.setTime(restTime);
    fqTimer.resetTime();
  } else {
    fqTimer.setTime(fullTime);
    fqTimer.resetTime();
  }

  renderContent($modeButton, finalModeButtonText);
};

$showLogButton.onclick = () => {
  $logContainer.classList.add('show');
  $mask.classList.add('show');
};

$mask.onclick = () => {
  $logContainer.classList.remove('show');
  $mask.classList.remove('show');
};

$ctrTimeButton.onclick = () => {
  const nowButtonText = $ctrTimeButton.innerText;
  const isStart = nowButtonText === '开始'; // 是否为启动按钮
  const finalButtonText = isStart ? '暂停' : '开始';

  if (isStart) {
    fqTimer.startTime();
  } else {
    fqTimer.stopTime();
  }

  renderContent($ctrTimeButton, finalButtonText);
};

$resetButton.onclick = () => {
  fqTimer.resetTime();
};
