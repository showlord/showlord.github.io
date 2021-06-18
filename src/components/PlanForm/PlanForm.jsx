import React, { useState, useEffect, useRef } from 'react';
import ColorPicker from '../FormComponents/ColorPicker';
import Album from './Album';
import DatePIcker from './DatePicker';

export default function Plan(props) {
  const { planWindow, getPlanInfo, planDate } = props;
  const [imgList, setImgList] = useState([]);
  const titleRef = useRef();
  const timeRef = useRef();

  const closeItem = (e) => {
    if (e.target === e.currentTarget) { planWindow(false); }
  };

  const planInfo = { };
  const pickColor = (e) => {
    const color = getComputedStyle(e.target).backgroundColor;
    planInfo.color = color;
    console.log(planInfo);
  };

  const atSubmit = () => {
    const title = titleRef.current.value;
    const time = timeRef.current.value;
    if (title !== '' && time !== '') {
      planInfo.title = title;
      planInfo.time = time;
      console.log(planInfo);
    }

    if (planInfo.title && planInfo.color && planInfo.time) {
      const infoArray = [];
      infoArray.push(planInfo);
      planWindow(false);
      console.log(infoArray);
      getPlanInfo(infoArray);
    }
  };
  const handleFiles = (e) => {
    for (let i = 0; i < e.target.files.length; i += 1) {
      const img = e.target.files[i];
      const reader = new FileReader();
      reader.onload = (item) => {
        setImgList((preImg) => preImg.concat(item.target.result));
      };
      reader.readAsDataURL(img);
    }
  };

  return (
    <div className="plan">
      <div className="mask" onClick={closeItem}>
        <div className="plan-window">
          <img className="close pointer" src={require('img/close.png')} alt="close" onClick={closeItem} />
          <div className="form">
            <div className="section"> 新增計畫</div>
            <ColorPicker pickColor={pickColor} />
            <div className="scroll-content">
              <label htmlFor="plan-title">標題
                <input type="text" name="title" id="plan-title" ref={titleRef} />
              </label>
              <label htmlFor="plan-time">時間
                <input type="input" name="title" id="plan-time" ref={timeRef} defaultValue={planDate} />
              </label>
              <DatePIcker />
              <label htmlFor="plan-detail">描述
                <textarea name="detail" id="plan-detail" rows="2" />
              </label>
              <label htmlFor="plan-addTo">新增計畫至以下日曆
                <input type="input" name="title" id="plan-addTo" />
              </label>
              <label htmlFor="plan-todo-list">代辦清單
                <input type="input" name="title" id="plan-todo-list" />
              </label>
              <label htmlFor="upload-img" className="upload-img pointer">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1568 8.07835C10.7255 8.38317 10.623 8.97992 10.9278 9.41123C11.2326 9.84254 11.8294 9.94508 12.2607 9.64025L14.5627 8.01332L14.5627 17.0743C14.5627 17.6025 14.9908 18.0306 15.519 18.0306C16.0471 18.0306 16.4753 17.6025 16.4753 17.0743L16.4753 7.98837L18.8159 9.6037C19.2505 9.9037 19.8461 9.79452 20.1461 9.35983C20.4461 8.92515 20.3369 8.32958 19.9022 8.02958L16.0622 5.37937L15.5125 5L14.9671 5.38548L11.1568 8.07835ZM24.0874 19.5599C24.0874 21.2131 22.7521 22.5559 21.0989 22.5651L9.93458 22.6273C8.26832 22.6366 6.91261 21.2884 6.91261 19.6222L6.91261 16.61C6.91261 16.0818 6.48446 15.6537 5.95631 15.6537C5.42815 15.6537 5 16.0818 5 16.61L5 19.6222C5 22.3489 7.21853 24.5551 9.94524 24.5399L21.1096 24.4777C23.8149 24.4626 26 22.2653 26 19.5599L26 16.61C26 16.0818 25.5718 15.6537 25.0437 15.6537C24.5155 15.6537 24.0874 16.0818 24.0874 16.61L24.0874 19.5599Z" fill="#4C5760" />
                </svg>
                上傳圖片
                <input type="file" accept="image/*" id="upload-img" multiple onChange={handleFiles} />
              </label>
              <div className="album black">
                {imgList.map((ele) => (
                  <div className="preview pointer img-cover">
                    <img src={ele} alt="img" key={Math.random()} />
                  </div>
                ))}
              </div>
            </div>
            <button className="submit pointer" onClick={atSubmit}> 新增計畫 ＋ </button>
          </div>

        </div>
      </div>
    </div>
  );
}
