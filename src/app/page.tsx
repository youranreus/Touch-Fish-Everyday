'use client';

import { useEffect, useState } from 'react';
import config from '@/app/config/config.json';
import CuAvatar from '@/app/components/Avatar';
import BtnBar from '@/app/components/Btnbar';
import Detail from '@/app/components/Detail';
import { Descriptions } from '@douyinfe/semi-ui';
import jsonp from 'jsonp';

type WorkDataItem = {
  key: string;
  value: string;
};

export default function Home() {
  const c = {
    name: process.env.NEXT_PUBLIC_NAME || '季悠然',
    avatar: process.env.NEXT_PUBLIC_AVATAR || 'https://sdn.geekzu.org/avatar/87e0f8d2f0f70987061cec6376cb7f97?s=200&r=G&d=',
    contact: process.env.NEXT_PUBLIC_CONTACT || 'youranreus@qq.com',
    blog: process.env.NEXT_PUBLIC_BLOG || 'https://blog.mitsuha.space',
    wakatimeApi: process.env.NEXT_PUBLIC_WAKATIME_API || 'https://wakatime.com/share/@29eb13fc-3734-4961-8f0a-28fa9f0eace4/c2bbca16-afb1-4f71-aef7-b6594e408cde.json',
    wakatimeLanguage: process.env.NEXT_PUBLIC_WAKATIME_LANG || 'https://wakatime.com/share/@29eb13fc-3734-4961-8f0a-28fa9f0eace4/9d6dbbb8-83de-42f2-89fb-a59127db4901.json',
    wakatimeEditor: process.env.NEXT_PUBLIC_WAKATIME_EDITOR || 'https://wakatime.com/share/@29eb13fc-3734-4961-8f0a-28fa9f0eace4/8c376126-7aa9-4bf5-83ef-9ea45887966a.json',
    goal: parseFloat(process.env.NEXT_PUBLIC_GOAL || '6'),
    offWorkTime: parseInt(process.env.NEXT_PUBLIC_OFFWORK_TIME || '19', 10),
    customMsg: config.customMsg
  };

  const [workingData, setWorkingData] = useState<WorkDataItem[]>([
    { key: '今日代码时长', value: 'loading' },
    { key: '目标时长', value: `${c.goal}hrs` },
    { key: '完成度', value: 'loading' },
    { key: '总结', value: 'loading' }
  ]);

  const [accomplished, setAccomplished] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => setShowDetail(prev => !prev);

  useEffect(() => {
    document.title = `今天${c.name}摸鱼了吗`;

    jsonp(c.wakatimeApi, undefined, (error, data) => {
      if (error) {
        console.error(error);
        return;
      }

      const total = data.data[6].grand_total;
      const completion = (total.total_seconds / (c.goal * 3600)) * 100;
      const currentHour = new Date().getHours();

      const summary =
        c.goal > total.hours
          ? currentHour > c.offWorkTime
            ? <span style={{ color: '#DD4A68' }}>摸鱼了</span>
            : '还在奋斗'
          : '好耶！';

      setWorkingData([
        { key: '今日代码时长', value: total.text },
        { key: '目标时长', value: `${c.goal}hrs` },
        { key: '完成度', value: `${completion.toFixed(2)}%` },
        { key: '总结', value: summary }
      ]);

      setAccomplished(total.hours >= c.goal);
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-[800px] p-8 rounded-2xl bg-[#FAFAFA] shadow-xl box-border max-w-[95%]">
        <header>
          <h2 className="md:text-5xl text-3xl leading-[1.7] mt-0 mb-4">
            <CuAvatar c={c} />
            <br />
            今天{c.name}摸鱼了吗？
          </h2>

          <Descriptions data={workingData} row style={{ textAlign: 'right' }} />

          <Detail
            isOpen={showDetail}
            languageApi={c.wakatimeLanguage}
            editorApi={c.wakatimeEditor}
          />

          <BtnBar c={c} accomplished={accomplished} show={toggleDetail} />
        </header>
      </div>
    </div>
  );
}
