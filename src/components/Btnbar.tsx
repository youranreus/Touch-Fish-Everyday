/**
 * @author 季悠然
 * @modifiedBy Bhao
 * @date 2021-12-07
 * @lastModified 2025-04-20
 */
'use client'

import { FC, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {IconBolt, IconLikeThumb, IconTriangleUp, IconCheckboxTick} from "@douyinfe/semi-icons";

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
    toast(c.customMsg.likeMsg[0], {
      description: c.customMsg.likeMsg[1]
    })
    window.location.href = `mailto:${c.contact}?subject=今天也辛苦啦&body=今天已经很努力啦，放松一下吧~`;
  };

  const punch = () => {
    toast(c.customMsg.punchMsg[0], {
      description: c.customMsg.punchMsg[1]
    })
    window.location.href = `mailto:${c.contact}?subject=还在摸鱼？&body=今日事今日毕！快点起床！`;
  };

  const sendNotice = () => {
    toast(c.customMsg.supportMsg[0], {
      description: c.customMsg.supportMsg[1]
    })
    window.location.href = `mailto:${c.contact}?subject=加油！&body=坚持就是胜利！`;
  };

  const renderMainButton = () => {
    const currentHour = new Date().getHours();

    if (isAccomplished) {
      return (
        <Button
          onClick={sendLike}
          className="bg-blue-500 hover:bg-blue-600 rounded-full"
        >
          <IconLikeThumb /> 表扬一下！
        </Button>
      );
    }

    if (c.offWorkTime < currentHour) {
      return (
        <Button
          onClick={punch}
          className="bg-red-500 hover:bg-red-600 rounded-full"
        >
          <IconBolt /> 还敢摸鱼？加班！
        </Button>
      );
    }

    return (
      <Button
        onClick={sendNotice}
        className="bg-blue-500 hover:bg-blue-600 rounded-full"
      >
        <IconTriangleUp /> 给他加加油
      </Button>
    );
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 text-center px-8 py-3 md:bottom-8 bottom-0">
      {renderMainButton()}
      <Button
        onClick={show}
        className="md:m-4 m-1 bg-blue-500 hover:bg-blue-600 rounded-full"
      >
        <IconCheckboxTick /> 都干了些啥?
      </Button>
    </div>
  );
};

export default BtnBar;
