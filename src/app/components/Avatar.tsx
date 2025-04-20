/**
 * @author 季悠然
 * @modifiedBy Bhao
 * @date 2021-12-06
 * @lastModified 2025-04-20
 */

'use client'

import { FC } from 'react'
import { Avatar } from '@douyinfe/semi-ui'

interface CuAvatarProps {
  c: {
    avatar: string;
    name: string;
  };
}

const CuAvatar: FC<CuAvatarProps> = ({ c }) => {
  const { avatar, name } = c;
  const fallbackName = name ? name.charAt(0) : '?';

  return avatar
    ? <Avatar size="large" src={avatar} />
    : <Avatar size="large">{fallbackName}</Avatar>;
};

export default CuAvatar;