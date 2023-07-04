import React from 'react';

import SvgBox from './SvgBox';

function Arrow() {
  return (
    <SvgBox height="16px">
      <svg
        width="8"
        height="16"
        viewBox="0 0 8 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.999724 8.00003C0.999268 7.76638 1.08064 7.53994 1.22972 7.36003L6.22972 1.36003C6.39946 1.15581 6.64337 1.02739 6.9078 1.00301C7.17223 0.978631 7.43551 1.06029 7.63972 1.23003C7.84394 1.39977 7.97237 1.64368 7.99675 1.90811C8.02112 2.17253 7.93946 2.43581 7.76972 2.64003L3.28972 8.00003L7.60972 13.36C7.69279 13.4623 7.75482 13.58 7.79225 13.7064C7.82969 13.8327 7.84178 13.9652 7.82784 14.0962C7.8139 14.2272 7.7742 14.3542 7.71103 14.4699C7.64786 14.5855 7.56245 14.6875 7.45972 14.77C7.3569 14.8616 7.23628 14.931 7.1054 14.9738C6.97453 15.0166 6.83623 15.0319 6.69917 15.0187C6.5621 15.0056 6.42923 14.9643 6.30887 14.8974C6.18852 14.8305 6.08327 14.7395 5.99972 14.63L1.16972 8.63003C1.04421 8.44495 0.984354 8.22313 0.999724 8.00003Z"
          fill="#64616B"
        />
      </svg>
    </SvgBox>
  );
}

export default Arrow;