import React, { SVGProps, useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { useSession } from 'next-auth/react';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';

interface Props {
  iconColor: string;
  title: string;
  Icon: React.FC<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  fileUpload?: boolean;
  refProp?: React.LegacyRef<HTMLInputElement> | undefined;
  fileUploadOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputboxModalButton = ({
  iconColor,
  title,
  Icon,
  onClick,
  fileUpload,
  refProp,
  fileUploadOnChange,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { data: session } = useSession();
  return (
    <div
      onClick={onClick}
      className={`inputIcon ${!theme ? '' : 'hover:bg-blue-500 '} ${
        session ? ' ' : ' hover:bg-transparent cursor-default'
      }`}>
      <Icon className={`h-7 ${iconColor}  `} />
      <p
        className={`text-xs sm:text-sm xl:text-base ${
          !theme ? 'themeLight bg-transparent' : 'themeDark bg-transparent'
        }`}>
        {title}
      </p>
      {fileUpload && (
        <input type='file' ref={refProp} onChange={fileUploadOnChange} hidden />
      )}
    </div>
  );
};
