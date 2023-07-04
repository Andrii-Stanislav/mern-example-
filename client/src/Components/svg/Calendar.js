import React from 'react';

import SvgBox from './SvgBox';

export default function Calendar({ onClick }) {
  return (
    <SvgBox onClick={onClick} height="20px">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.4375 3.75H15V1.5625H13.75V3.75H6.25V1.5625H5V3.75H1.5625C1.31395 3.75029 1.07566 3.84915 0.899907 4.02491C0.724154 4.20066 0.625289 4.43895 0.625 4.6875V17.8125C0.625289 18.0611 0.724154 18.2993 0.899907 18.4751C1.07566 18.6508 1.31395 18.7497 1.5625 18.75H18.4375C18.6861 18.7497 18.9243 18.6508 19.1001 18.4751C19.2758 18.2993 19.3747 18.0611 19.375 17.8125V4.6875C19.3747 4.43895 19.2758 4.20066 19.1001 4.02491C18.9243 3.84915 18.6861 3.75029 18.4375 3.75ZM18.125 17.5H1.875V5H5V6.5625H6.25V5H13.75V6.5625H15V5H18.125V17.5Z"
          fill="#252020"
        />
        <path d="M4.375 8.75H5.625V10H4.375V8.75Z" fill="#252020" />
        <path d="M7.8125 8.75H9.0625V10H7.8125V8.75Z" fill="#252020" />
        <path d="M10.9375 8.75H12.1875V10H10.9375V8.75Z" fill="#252020" />
        <path d="M14.375 8.75H15.625V10H14.375V8.75Z" fill="#252020" />
        <path d="M4.375 11.5625H5.625V12.8125H4.375V11.5625Z" fill="#252020" />
        <path
          d="M7.8125 11.5625H9.0625V12.8125H7.8125V11.5625Z"
          fill="#252020"
        />
        <path
          d="M10.9375 11.5625H12.1875V12.8125H10.9375V11.5625Z"
          fill="#252020"
        />
        <path
          d="M14.375 11.5625H15.625V12.8125H14.375V11.5625Z"
          fill="#252020"
        />
        <path d="M4.375 14.375H5.625V15.625H4.375V14.375Z" fill="#252020" />
        <path d="M7.8125 14.375H9.0625V15.625H7.8125V14.375Z" fill="#252020" />
        <path
          d="M10.9375 14.375H12.1875V15.625H10.9375V14.375Z"
          fill="#252020"
        />
        <path d="M14.375 14.375H15.625V15.625H14.375V14.375Z" fill="#252020" />
      </svg>
    </SvgBox>
  );
}
