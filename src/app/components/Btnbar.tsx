/**
 * @author 季悠然
 * @modifiedBy Bhao
 * @date 2021-12-07
 * @lastModified 2025-04-20
 */
'use client'

import { FC, useState, useEffect } from 'react'
import { Button, Notification } from '@douyinfe/semi-ui'
import {
  IconBolt,
  IconLikeHeart,
  IconLikeThumb,
  IconTriangleUp,
  IconCheckboxTick
} from '@douyinfe/semi-icons'

interface CustomMsg {
  likeMsg: string[];
  punchMsg: string[];
  supportMsg: string[];
}

interface BtnBarProps {
  c: {
    contact: string;
    offWorkTime: number;
    customMsg: CustomMsg;
  };
  accomplished: boolean;
  show: () => void;
}

const BtnBar: FC<BtnBarProps> = ({ c, accomplished, show }) => {
  const [isAccomplished, setIsAccomplished] = useState(accomplished);

  useEffect(() => {
    setIsAccomplished(accomplished);
  }, [accomplished]);

  const sendLike = () => {
    Notification.open({
      title: c.customMsg.likeMsg[0],
      content: c.customMsg.likeMsg[1],
      duration: 3,
      icon: <IconLikeHeart style={{ color: 'red' }} />
    });
    window.location.href = `mailto:${c.contact}?subject=今天也辛苦啦&body=今天已经很努力啦，放松一下吧~`;
  };

  const punch = () => {
    Notification.info({
      title: c.customMsg.punchMsg[0],
      content: c.customMsg.punchMsg[1],
      duration: 3
    });
    window.location.href = `mailto:${c.contact}?subject=还在摸鱼？&body=今日事今日毕！快点起床！`;
  };

  const sendNotice = () => {
    Notification.open({
      title: c.customMsg.supportMsg[0],
      content: c.customMsg.supportMsg[1],
      duration: 3
    });
    window.location.href = `mailto:${c.contact}?subject=加油！&body=坚持就是胜利！`;
  };

  const renderMainButton = () => {
    const currentHour = new Date().getHours();

    if (isAccomplished) {
      return (
        <Button
          theme="solid"
          type="primary"
          size="large"
          style={{ borderRadius: '1000rem' }}
          onClick={sendLike}
          icon={<IconLikeThumb />}
        >
          表扬一下！
        </Button>
      );
    }

    if (c.offWorkTime < currentHour) {
      return (
        <Button
          theme="solid"
          type="danger"
          size="large"
          style={{ borderRadius: '1000rem' }}
          onClick={punch}
          icon={<IconBolt />}
        >
          还敢摸鱼？加班！
        </Button>
      );
    }

    return (
      <Button
        theme="solid"
        type="primary"
        size="large"
        style={{ borderRadius: '1000rem' }}
        onClick={sendNotice}
        icon={<IconTriangleUp />}
      >
        给他加加油
      </Button>
    );
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 text-center px-8 py-3 md:bottom-8 bottom-0">
      {renderMainButton()}
      <Button
        theme="solid"
        type="primary"
        size="large"
        style={{ borderRadius: '1000rem' }}
        icon={<IconCheckboxTick />}
        onClick={show}
        className="md:m-4 m-1"
      >
        都干了些啥？
      </Button>
    </div>
  );
};

export default BtnBar;
