import { cn } from '@/utils/lib/utils';
export const ExploreIcon = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm1.956-7.905c-.193.17-.44.268-.932.465-2.31.924-3.465 1.386-4.124.938a1.5 1.5 0 0 1-.398-.398c-.448-.66.014-1.814.938-4.124.197-.493.295-.74.465-.933.043-.049.09-.095.139-.138.193-.17.44-.268.932-.465 2.31-.924 3.464-1.386 4.124-.938a1.5 1.5 0 0 1 .398.398c.448.66-.014 1.814-.938 4.124-.197.493-.295.739-.465.932-.043.05-.09.096-.139.139Z"
      clipRule="evenodd"
    />
  </svg>
);

export const GalleryIcon = ({
  width = 30,
  height = 30,
  fill = "#747372",
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    {...rest}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M21.9998 12.6978C21.9983 14.1674 21.9871 15.4165 21.9036 16.4414C21.8067 17.6308 21.6081 18.6246 21.1636 19.45C20.9676 19.814 20.7267 20.1401 20.4334 20.4334C19.601 21.2657 18.5405 21.6428 17.1966 21.8235C15.8835 22 14.2007 22 12.0534 22H11.9466C9.79929 22 8.11646 22 6.80345 21.8235C5.45951 21.6428 4.39902 21.2657 3.56664 20.4334C2.82871 19.6954 2.44763 18.777 2.24498 17.6376C2.04591 16.5184 2.00949 15.1259 2.00192 13.3967C2 12.9569 2 12.4917 2 12.0009V11.9466C1.99999 9.79929 1.99998 8.11646 2.17651 6.80345C2.3572 5.45951 2.73426 4.39902 3.56664 3.56664C4.39902 2.73426 5.45951 2.3572 6.80345 2.17651C7.97111 2.01952 9.47346 2.00215 11.302 2.00024C11.6873 1.99983 12 2.31236 12 2.69767C12 3.08299 11.6872 3.3952 11.3019 3.39561C9.44749 3.39757 8.06751 3.41446 6.98937 3.55941C5.80016 3.7193 5.08321 4.02339 4.5533 4.5533C4.02339 5.08321 3.7193 5.80016 3.55941 6.98937C3.39683 8.19866 3.39535 9.7877 3.39535 12C3.39535 12.2702 3.39535 12.5314 3.39567 12.7844L4.32696 11.9696C5.17465 11.2278 6.45225 11.2704 7.24872 12.0668L11.2392 16.0573C11.8785 16.6966 12.8848 16.7837 13.6245 16.2639L13.9019 16.0689C14.9663 15.3209 16.4064 15.4076 17.3734 16.2779L20.0064 18.6476C20.2714 18.091 20.4288 17.3597 20.5128 16.3281C20.592 15.3561 20.6029 14.1755 20.6044 12.6979C20.6048 12.3126 20.917 12 21.3023 12C21.6876 12 22.0002 12.3125 21.9998 12.6978Z"
        fill={fill}
      />{" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 11C15.3787 11 14.318 11 13.659 10.341C13 9.68198 13 8.62132 13 6.5C13 4.37868 13 3.31802 13.659 2.65901C14.318 2 15.3787 2 17.5 2C19.6213 2 20.682 2 21.341 2.65901C22 3.31802 22 4.37868 22 6.5C22 8.62132 22 9.68198 21.341 10.341C20.682 11 19.6213 11 17.5 11ZM19.7121 4.28794C20.096 4.67187 20.096 5.29434 19.7121 5.67826L19.6542 5.7361C19.5984 5.7919 19.5205 5.81718 19.4428 5.80324C19.3939 5.79447 19.3225 5.77822 19.2372 5.74864C19.0668 5.68949 18.843 5.5778 18.6326 5.36742C18.4222 5.15704 18.3105 4.93324 18.2514 4.76276C18.2218 4.67751 18.2055 4.60607 18.1968 4.55721C18.1828 4.47953 18.2081 4.40158 18.2639 4.34578L18.3217 4.28794C18.7057 3.90402 19.3281 3.90402 19.7121 4.28794ZM17.35 8.0403C17.2057 8.18459 17.1336 8.25673 17.054 8.31878C16.9602 8.39197 16.8587 8.45472 16.7512 8.50591C16.6602 8.54932 16.5634 8.58158 16.3698 8.64611L15.349 8.98639C15.2537 9.01814 15.1487 8.99335 15.0777 8.92234C15.0067 8.85134 14.9819 8.74631 15.0136 8.65104L15.3539 7.63021C15.4184 7.43662 15.4507 7.33983 15.4941 7.24876C15.5453 7.14133 15.608 7.0398 15.6812 6.94596C15.7433 6.86642 15.8154 6.79427 15.9597 6.65L17.7585 4.85116C17.802 4.80767 17.8769 4.82757 17.8971 4.88568C17.9707 5.09801 18.109 5.37421 18.3674 5.63258C18.6258 5.89095 18.902 6.02926 19.1143 6.10292C19.1724 6.12308 19.1923 6.19799 19.1488 6.24148L17.35 8.0403Z"
        fill={fill}
      />{" "}
    </g>
  </svg>
);

export const GraduatesIcon = ({
  width = 30,
  height = 30,
  fill = "#747372",
  ...rest
}) => (
  <svg
    fill={fill}
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 38.022 38.022"
    width={width}
    height={height}
    {...rest}
  >
    <g>
      <path
        d="M38.022,16.348c0,0.807-0.484,1.534-1.229,1.846l-0.771,0.322v4.43c0,0.552-0.447,1-1,1c-0.554,0-1-0.448-1-1v-3.594
       l-2.312,0.968v5.085c0,0.859-0.554,1.626-1.369,1.896l-10.188,3.386c-0.205,0.068-0.418,0.104-0.632,0.104
       c-0.192,0-0.389-0.028-0.577-0.085L7.736,27.319c-0.845-0.257-1.423-1.033-1.423-1.915v-5.085l-5.084-2.126
       C0.486,17.881,0,17.154,0,16.348c0-0.806,0.484-1.534,1.229-1.845L18.24,7.388c0.491-0.206,1.049-0.206,1.543,0l17.01,7.115
       C37.537,14.813,38.022,15.541,38.022,16.348z"
      />
    </g>
  </svg>
);
export const CheckMark = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2.5"
    stroke="currentColor"
    aria-hidden="true"
    className="w-4 h-4 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export const HomeIcon = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    height={height}
    width={width}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"
    />
    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
  </svg>
);

export const LeftArrow = ({ width = 30, height = 30, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...rest}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M4 12h10M4 12l4-4m-4 4 4 4"
    />
  </svg>
);
export const MessageIcon = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 14C18 18.4183 14.4183 22 10 22C8.76449 22 7.5944 21.7199 6.54976 21.2198C6.19071 21.0479 5.78393 20.9876 5.39939 21.0904L4.17335 21.4185C3.20701 21.677 2.32295 20.793 2.58151 19.8267L2.90955 18.6006C3.01245 18.2161 2.95209 17.8093 2.7802 17.4502C2.28008 16.4056 2 15.2355 2 14C2 9.58172 5.58172 6 10 6C14.4183 6 18 9.58172 18 14ZM6.5 15C7.05228 15 7.5 14.5523 7.5 14C7.5 13.4477 7.05228 13 6.5 13C5.94772 13 5.5 13.4477 5.5 14C5.5 14.5523 5.94772 15 6.5 15ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15ZM13.5 15C14.0523 15 14.5 14.5523 14.5 14C14.5 13.4477 14.0523 13 13.5 13C12.9477 13 12.5 13.4477 12.5 14C12.5 14.5523 12.9477 15 13.5 15Z"
      fill={fill}
    />
    <path
      opacity="0.6"
      d="M17.9842 14.5084C18.0921 14.4638 18.1986 14.4163 18.3035 14.3661C18.5952 14.2264 18.9257 14.1774 19.2381 14.261L20.2343 14.5275C21.0194 14.7376 21.7377 14.0193 21.5277 13.2342L21.2611 12.238C21.1775 11.9256 21.2266 11.595 21.3662 11.3033C21.7726 10.4545 22.0001 9.50385 22.0001 8.5C22.0001 4.91015 19.09 2 15.5001 2C12.7901 2 10.4674 3.6585 9.4917 6.0159C9.65982 6.00535 9.82936 6 10.0001 6C14.4184 6 18.0001 9.58172 18.0001 14C18.0001 14.1708 17.9948 14.3403 17.9842 14.5084Z"
      fill={fill}
    />
  </svg>
);

export const PeopleIcon = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    viewBox="0 0 24 24"
  >
    <circle cx={15} cy={6} r={3} fill={fill} opacity={0.4} />
    <ellipse cx={16} cy={17} fill={fill} opacity={0.4} rx={5} ry={3} />
    <circle cx={9.001} cy={6} r={4} fill={fill} />
    <ellipse cx={9.001} cy={17.001} fill={fill} rx={7} ry={4} />
  </svg>
);

export const SearchIcon = ({
  width = 25,
  height = 25,

  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <circle cx="11.5" cy="11.5" r="9.5" stroke="#1C274C" strokeWidth="1.5" />
    <path
      d="M18.5 18.5L22 22"
      stroke="#1C274C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const CloseIcon = ({
  width = 30,
  height = 30,
  fill = "#e83b3b",
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      {...rest}
    >
      <g fill={fill}>
        <path
          d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
          opacity={0.5}
        />
        <path d="M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 1 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 0 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 0 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z" />
      </g>
    </svg>
  );
};

export const MessageIcon2 = ({ width = 25, height = 25, fill = "#747372" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1024 1024"
    width={width}
    height={height}
    fill={fill}
  >
    <path d="M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z" />
    <path d="M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z" />
  </svg>
);

export const Tick = ({ width = 25, height = 25, fill = "#18b41b" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={width}
    height={height}
  >
    <g fill={fill}>
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
        opacity={0.4}
      />
      <path d="M10.58 15.58a.75.75 0 0 1-.53-.22l-2.83-2.83a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l2.3 2.3 5.14-5.14c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-5.67 5.67a.75.75 0 0 1-.53.22Z" />
    </g>
  </svg>
);

export const DeleteIcon = ({
  width = 30,
  height = 30,
  fill = "#e52a3a",
  ...rest
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    viewBox="0 0 24 24"
    width={width}
    height={height}
    {...rest}
  >
    <g fill={fill}>
      <path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 1.176-.965l.03-.1.115-.391c.07-.24.131-.45.217-.637.338-.739.964-1.252 1.687-1.383.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033.723.131 1.35.644 1.687 1.383.086.187.147.396.218.637l.114.391.03.1c.18.566.74.95 1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77C3.345 7.263 3 6.87 3 6.386Z" />
      <path
        fillRule="evenodd"
        d="M9.425 11.482c.413-.044.78.273.821.707l.5 5.263c.041.433-.26.82-.671.864-.412.043-.78-.273-.821-.707l-.5-5.263c-.041-.434.26-.821.671-.864ZM14.575 11.482c.412.043.713.43.671.864l-.5 5.263c-.04.434-.408.75-.82.707-.413-.044-.713-.43-.672-.864l.5-5.264c.041-.433.409-.75.82-.707Z"
        clipRule="evenodd"
      />
      <path
        d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886.904-.886.996-2.339 1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 0-2.3 0-2.753.5-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245.905.886 2.296.886 5.079.886Z"
        opacity={0.5}
      />
    </g>
  </svg>
);

export const RightArrow = ({ width = 15, height = 15 }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M20 12L4 12M20 12L14 18M20 12L14 6"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

export const UpVoteIcon = ({ className }: { className?: string }) => (
  <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16.881 16H7.119a1 1 0 0 1-.772-1.636l4.881-5.927a1 1 0 0 1 1.544 0l4.88 5.927a1 1 0 0 1-.77 1.636Z"/>
</svg>

);
export const CommentIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-5 h-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M76.83 480a25.69 25.69 0 01-25.57-25.74 29.13 29.13 0 011.2-7.63L70.88 380c.77-2.46-.1-4.94-1.23-6.9l-.22-.4c-.08-.13-.46-.66-.73-1.05s-.58-.81-.86-1.22l-.19-.27A215.66 215.66 0 0132 251.37c-.18-57.59 22.35-112 63.46-153.28C138 55.47 194.9 32 255.82 32A227.4 227.4 0 01398 81.84c39.45 31.75 66.87 76 77.21 124.68a213.5 213.5 0 014.78 45c0 58.93-22.64 114.28-63.76 155.87-41.48 42-97.18 65.06-156.83 65.06-21 0-47.87-5.36-60.77-9-15.52-4.34-30.23-10-31.85-10.6a15.12 15.12 0 00-5.37-1 14.75 14.75 0 00-5.8 1.15l-.85.33-67.48 24.38A29.44 29.44 0 0176.83 480zm-2-31.8zM87.48 380z"></path>
  </svg>
);
export const BookMarkIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-5 h-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M400 480a16 16 0 01-10.63-4L256 357.41 122.63 476A16 16 0 0196 464V96a64.07 64.07 0 0164-64h192a64.07 64.07 0 0164 64v368a16 16 0 01-16 16z"></path>
  </svg>
);

export const ShareIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-15 h-15", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <circle
      cx="128"
      cy="256"
      r="48"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ionicon-fill-none ionicon-stroke-width"
    ></circle>
    <circle
      cx="384"
      cy="112"
      r="48"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ionicon-fill-none ionicon-stroke-width"
    ></circle>
    <circle
      cx="384"
      cy="400"
      r="48"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ionicon-fill-none ionicon-stroke-width"
    ></circle>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M169.83 279.53l172.34 96.94M342.17 135.53l-172.34 96.94"
      className="ionicon-fill-none ionicon-stroke-width"
    ></path>
  </svg>
);

export const EditIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-5 h-5", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"></path>
    <path d="M386.34 193.66L264.45 315.79A41.08 41.08 0 01247.58 326l-25.9 8.67a35.92 35.92 0 01-44.33-44.33l8.67-25.9a41.08 41.08 0 0110.19-16.87l122.13-121.91a8 8 0 00-5.65-13.66H104a56 56 0 00-56 56v240a56 56 0 0056 56h240a56 56 0 0056-56V199.31a8 8 0 00-13.66-5.65z"></path>
  </svg>
);

export const OptionIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("w-8 h-8", className)}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <circle
      cx="256"
      cy="256"
      r="32"
      strokeMiterlimit="20"
      className="fill-white"
    ></circle>
    <circle
      cx="416"
      cy="256"
      r="32"
      strokeMiterlimit="20"
      className="fill-white"
    ></circle>
    <circle
      cx="96"
      cy="256"
      r="32"
      strokeMiterlimit="20"
      className="fill-white"
    ></circle>
  </svg>
);
export const SendIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 512 512"
  >
    <path
      d="M53.12 199.94l400-151.39a8 8 0 0110.33 10.33l-151.39 400a8 8 0 01-15-.34l-67.4-166.09a16 16 0 00-10.11-10.11L53.46 215a8 8 0 01-.34-15.06zM460 52L227 285"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
  </svg>
);
export const AddPerson = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 512 512"
  >
    =
    <path
      d="M376 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <path
      d="M288 304c-87 0-175.3 48-191.64 138.6-2 10.92 4.21 21.4 15.65 21.4H464c11.44 0 17.62-10.48 15.65-21.4C463.3 352 375 304 288 304z"
      fill="none"
      stroke="black"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <path
      fill="none"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M88 176v112M144 232H32"
    />
  </svg>
);
