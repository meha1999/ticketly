import { FC } from "react";

interface SettingsProps {
  color: string;
}

const Settings: FC<SettingsProps> = ({ color }) => {
  return (
    <svg
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.2788 0.152241C10.9085 0 10.439 0 9.5 0C8.56102 0 8.09153 0 7.72119 0.152241C7.2274 0.355229 6.83509 0.744577 6.63056 1.23463C6.53719 1.45834 6.50065 1.7185 6.48635 2.09799C6.46534 2.65568 6.17716 3.17189 5.69017 3.45093C5.20318 3.72996 4.60864 3.71954 4.11149 3.45876C3.77318 3.2813 3.52789 3.18262 3.28599 3.15102C2.75609 3.08178 2.22018 3.22429 1.79616 3.5472C1.47814 3.78938 1.24339 4.1929 0.773903 4.99993C0.304414 5.80697 0.069669 6.21048 0.017347 6.60491C-0.0524154 7.1308 0.0911811 7.66266 0.416547 8.08348C0.565055 8.27556 0.773773 8.43703 1.0977 8.63902C1.57391 8.93598 1.88032 9.44186 1.88029 10C1.88026 10.5581 1.57386 11.0639 1.0977 11.3608C0.773716 11.5629 0.564971 11.7244 0.416448 11.9165C0.0910824 12.3373 -0.0525141 12.8691 0.0172484 13.395C0.0695703 13.7894 0.304315 14.193 0.773804 15C1.24329 15.807 1.47804 16.2106 1.79606 16.4527C2.22008 16.7756 2.75599 16.9181 3.28589 16.8489C3.52778 16.8173 3.77305 16.7186 4.11133 16.5412C4.60852 16.2804 5.2031 16.27 5.69012 16.549C6.17714 16.8281 6.46533 17.3443 6.48635 17.9021C6.50065 18.2815 6.53719 18.5417 6.63056 18.7654C6.83509 19.2554 7.2274 19.6448 7.72119 19.8478C8.09153 20 8.56102 20 9.5 20C10.439 20 10.9085 20 11.2788 19.8478C11.7726 19.6448 12.1649 19.2554 12.3694 18.7654C12.4628 18.5417 12.4994 18.2815 12.5137 17.902C12.5347 17.3443 12.8228 16.8281 13.3098 16.549C13.7968 16.2699 14.3914 16.2804 14.8886 16.5412C15.2269 16.7186 15.4721 16.8172 15.714 16.8488C16.2439 16.9181 16.7798 16.7756 17.2038 16.4527C17.5219 16.2105 17.7566 15.807 18.2261 14.9999C18.6956 14.1929 18.9303 13.7894 18.9827 13.395C19.0524 12.8691 18.9088 12.3372 18.5835 11.9164C18.4349 11.7243 18.2262 11.5628 17.9022 11.3608C17.4261 11.0639 17.1197 10.558 17.1197 9.99991C17.1197 9.44185 17.4261 8.93608 17.9022 8.63919C18.2263 8.43715 18.435 8.27566 18.5836 8.08355C18.9089 7.66273 19.0525 7.13087 18.9828 6.60497C18.9304 6.21055 18.6957 5.80703 18.2262 5C17.7567 4.19297 17.522 3.78945 17.2039 3.54727C16.7799 3.22436 16.244 3.08185 15.7141 3.15109C15.4722 3.18269 15.2269 3.28136 14.8887 3.4588C14.3915 3.71959 13.7969 3.73002 13.3099 3.45096C12.8229 3.17191 12.5347 2.65566 12.5136 2.09794C12.4993 1.71848 12.4628 1.45833 12.3694 1.23463C12.1649 0.744577 11.7726 0.355229 11.2788 0.152241ZM9.5 13C11.1695 13 12.5228 11.6569 12.5228 10C12.5228 8.34315 11.1695 7 9.5 7C7.83053 7 6.47716 8.34315 6.47716 10C6.47716 11.6569 7.83053 13 9.5 13Z"
        fill={color}
      />
    </svg>
  );
};

export default Settings;
