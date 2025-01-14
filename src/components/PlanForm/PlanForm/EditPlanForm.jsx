/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useReducer, useRef } from 'react';
import reducer from '../usePlanReducer';
import ColorPicker from '../../FormComponents/ColorPicker';
import { timeNow } from '../../Calendar/DateString';
import UploadImg from '../UploadImg/UploadImg';
import DatePicker from '../DatePicker/DatePicker';
import TimePicker from '../DatePicker/TimePicker';
// import CalendarPicker from '../CalendarPicker/CalendarPicker';
import TodoList from '../TodoList/TodoList';

export default function EditPlanForm(props) {
  const {
    planWindow, getEditPlanInfo, getImgPreview, plan, getDelPlan,
  } = props;

  const editPlanState = {
    title: plan.title,
    date: plan.date,
    time: plan.time,
    description: plan.description,
    imgList: plan.imgList,
    color: plan.color,
    todoList: plan.todoList,
    addTo: plan.addTo,
    planId: plan.planId,
    comments: plan.comments,
  };

  const [planState, dispatch] = useReducer(reducer, editPlanState);

  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();

  const timeSwitch = () => {
    if (planState.time === '') {
      dispatch({ type: 'time', value: timeNow });
      setTimePicker(true);
    } else {
      dispatch({ type: 'time', value: '' });
      setTimePicker(false);
    }
  };

  const getDateValue = (value) => {
    dispatch({ type: 'date', value });
  };

  const getTimeValue = (value) => {
    dispatch({ type: 'time', value });
  };

  const closeItem = (e) => {
    if (e.target === e.currentTarget) { planWindow(false); }
  };

  const closeIcon = () => {
    planWindow(false);
  };

  const getColor = (value) => {
    dispatch({ type: 'color', value });
  };

  const getImgList = (value) => {
    dispatch({ type: 'imgList', value });
  };

  const getTodoList = (value) => {
    dispatch({ type: 'todoList', value });
  };

  // const getPickedCalendar = (value) => {
  //   dispatch({ type: 'addTo', value });
  // };

  const atSubmit = () => {
    const title = titleRef.current.value === '' ? '未命名的標題' : titleRef.current.value;
    planState.title = title;
    planState.description = descriptionRef.current.value;
    planState.todoList = planState.todoList.filter((ele) => ele.value !== '');

    getEditPlanInfo(planState);
    planWindow(false);
  };

  const datePickerBox = (status) => {
    if (status) {
      setDatePicker(true);
    } else {
      setDatePicker(false);
    }
  };

  const datePickerRef = useRef();
  const timePickerRef = useRef();

  const closePicker = (e) => {
    if (datePicker === true && !datePickerRef.current.contains(e.target) && !timePickerRef.current.contains(e.target)) {
      setDatePicker(false);
    }
  };

  return (
    <div className="mask" onClick={closeItem}>
      <div className="plan-window" onClick={closePicker}>
        <svg className="close pointer" onClick={closeIcon} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.8434 21.8645C20.4405 22.4616 21.3993 22.4707 21.9851 21.8849C22.5709 21.2991 22.5618 20.3403 21.9647 19.7432L17.537 15.3155L22.3207 10.5319C22.8954 9.95716 22.8864 9.01637 22.3006 8.43058C21.7149 7.8448 20.7741 7.83584 20.1993 8.41057L15.4157 13.1942L10.6918 8.47029C10.0948 7.87324 9.13589 7.86411 8.55011 8.44989C7.96432 9.03568 7.97345 9.99456 8.57051 10.5916L13.2944 15.3155L8.8456 19.7643C8.27087 20.339 8.27983 21.2798 8.86561 21.8656C9.4514 22.4514 10.3922 22.4604 10.9669 21.8856L15.4157 17.4368L19.8434 21.8645Z" fill="#4C5760" fillOpacity="0.95" />
        </svg>
        <div className="form">
          <div className="section">
            <span> 編輯計畫</span>
            <svg className="del pointer" onClick={() => getDelPlan(planState.planId)} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.3104 5.46207C10.0991 5.46207 9.11725 6.44395 9.11725 7.65517L20.8138 7.65517C20.8138 6.44395 19.8319 5.46207 18.6207 5.46207H11.3104ZM11.3104 4C9.29165 4 7.65518 5.63648 7.65518 7.65517L4.9138 7.65517C4.40912 7.65517 4 8.06429 4 8.56897C4 9.07364 4.40912 9.48276 4.9138 9.48276H6.96069L8.2691 22.5668C8.41858 24.0616 9.67644 25.2 11.1787 25.2H18.7523C20.2546 25.2 21.5125 24.0617 21.6619 22.5668L22.9703 9.48276H25.0172C25.5219 9.48276 25.931 9.07364 25.931 8.56897C25.931 8.06429 25.5219 7.65517 25.0172 7.65517H22.2759C22.2759 5.63648 20.6394 4 18.6207 4H11.3104ZM12.0414 20.8138C11.6376 20.8138 11.3103 20.4802 11.3103 20.0687V12.7865C11.3103 12.375 11.6376 12.0414 12.0414 12.0414C12.4451 12.0414 12.7724 12.375 12.7724 12.7865V20.0687C12.7724 20.4802 12.4451 20.8138 12.0414 20.8138ZM14.9655 20.8138C14.5618 20.8138 14.2345 20.4802 14.2345 20.0687V12.7865C14.2345 12.375 14.5618 12.0414 14.9655 12.0414C15.3693 12.0414 15.6966 12.375 15.6966 12.7865V20.0687C15.6966 20.4802 15.3693 20.8138 14.9655 20.8138ZM17.1586 20.0687C17.1586 20.4802 17.4859 20.8138 17.8897 20.8138C18.2934 20.8138 18.6207 20.4802 18.6207 20.0687V12.7865C18.6207 12.375 18.2934 12.0414 17.8897 12.0414C17.4859 12.0414 17.1586 12.375 17.1586 12.7865V20.0687Z" fill="#4C5760" fillOpacity="0.95" />
            </svg>
          </div>
          <ColorPicker pickColor={getColor} defaultColor={planState.color} />
          <div className="scroll-content">
            <label htmlFor="plan-title">標題
              <input type="text" name="title" id="plan-title" ref={titleRef} defaultValue={planState.title} />
            </label>
            <label htmlFor="plan-time">時間
              <input className="pointer dateButton" type="button" name="title" defaultValue={`${planState.date} ${planState.time}`} onClick={datePickerBox} />
              <svg className="time-switch pointer" onClick={timeSwitch} ref={timePickerRef} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15 25.5C20.799 25.5 25.5 20.799 25.5 15C25.5 9.20101 20.799 4.5 15 4.5C9.20101 4.5 4.5 9.20101 4.5 15C4.5 20.799 9.20101 25.5 15 25.5ZM23 15C23 19.4183 19.4183 23 15 23C10.5817 23 7 19.4183 7 15C7 10.5817 10.5817 7 15 7C19.4183 7 23 10.5817 23 15ZM16 11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11V15C14 15.5523 14.4477 16 15 16H19C19.5523 16 20 15.5523 20 15C20 14.4477 19.5523 14 19 14H16V11Z" fill="#4C5760" fillOpacity="0.95" />
              </svg>
            </label>
            {datePicker
              && (
              <div className="date-picker" ref={datePickerRef}>
                <DatePicker getDateValue={getDateValue} datePickerBox={datePickerBox} dateValue={planState.date} timePicker={timePicker} />
                {timePicker && <TimePicker timeValue={planState.time} getTime={getTimeValue} />}
              </div>
              )}
            <label htmlFor="plan-detail">描述
              <textarea name="detail" id="plan-detail" rows="2" ref={descriptionRef} defaultValue={planState.description} />
            </label>
            {/* <CalendarPicker calendarList={calendarList} getPickedCalendar={getPickedCalendar} /> */}
            <TodoList getTodoList={getTodoList} defaultTodo={planState.todoList} />
            <UploadImg getImgList={getImgList} getImgPreview={getImgPreview} defaultImg={planState.imgList} />
            <div className="notify form-item">
              <span>是否通知協作者 ?</span>
              <svg className="switch pointer" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.03626 2.08094C4.28126 1.81962 4.28414 1.40957 4.03048 1.15666L3.59681 0.724283C3.34669 0.474911 2.93988 0.473779 2.6976 0.730777C0.213988 3.36532 0.0169747 5.40585 0.00134652 7.86062C-0.000917796 8.21629 0.288329 8.505 0.644 8.505H0.954545L1.30518 8.48313C1.64462 8.46196 1.90827 8.17972 1.9102 7.83962C1.92286 5.60496 2.08024 4.16724 4.03626 2.08094ZM18.3018 0.730965C18.0593 0.473903 17.6523 0.475206 17.4023 0.724855L16.9697 1.15675C16.7164 1.40968 16.7194 1.8194 16.9642 2.0806C18.9064 4.15295 19.0749 5.58819 19.0895 7.83982C19.0919 8.20335 19.3916 8.49562 19.755 8.48429L20.3761 8.46492C20.7238 8.45408 21.0009 8.16875 20.9987 7.8209C20.9834 5.40751 20.7885 3.36796 18.3018 0.730965ZM10.5 18.9C11.0911 18.9007 11.6678 18.7191 12.1499 18.3804C12.3809 18.2181 12.5846 18.0236 12.7556 17.8043C13.0286 17.454 12.7247 17.01 12.2807 17.01H8.71929C8.27525 17.01 7.97141 17.454 8.24438 17.8043C8.41536 18.0236 8.61911 18.2181 8.85008 18.3804C9.33216 18.7191 9.90885 18.9007 10.5 18.9ZM17.3727 12.0828C17.2506 11.9618 17.1818 11.797 17.1818 11.6251V7.56C17.1818 4.63116 15.246 2.14701 12.5778 1.28047C12.3858 1.21814 12.2325 1.07484 12.1267 0.903001C11.7929 0.360867 11.192 0 10.5 0C9.80799 0 9.2071 0.360854 8.87333 0.902972C8.76752 1.07483 8.61415 1.21813 8.4222 1.28045C5.75318 2.14698 3.81818 4.63114 3.81818 7.56V11.6251C3.81818 11.797 3.74944 11.9618 3.62726 12.0828L2.18877 13.5069C2.09996 13.5945 2.02953 13.6986 1.98153 13.8133C1.93353 13.9279 1.90891 14.0509 1.90909 14.175V15.12C1.90909 15.3706 2.00966 15.611 2.18867 15.7882C2.36768 15.9654 2.61048 16.065 2.86364 16.065H18.1364C18.3895 16.065 18.6323 15.9654 18.8113 15.7882C18.9903 15.611 19.0909 15.3706 19.0909 15.12V14.175C19.0911 14.0509 19.0665 13.9279 19.0185 13.8133C18.9705 13.6986 18.9 13.5945 18.8112 13.5069L17.3727 12.0828Z" fill="#B9B9B9" fillOpacity="0.95" />
              </svg>
            </div>
          </div>
          <button className="submit pointer" onClick={atSubmit}> 儲存修改 ＋ </button>
        </div>

      </div>
    </div>
  );
}
