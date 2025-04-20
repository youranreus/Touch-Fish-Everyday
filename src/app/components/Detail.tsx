/**
 * @author 季悠然
 * @modifiedBy Bhao
 * @date 2021-12-06
 * @lastModified 2025-04-20
 */

'use client'

import { FC, useEffect, useRef } from 'react'
import { Collapsible, Card, Row, Col } from '@douyinfe/semi-ui'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import jsonp from 'jsonp'

echarts.use([TitleComponent, TooltipComponent, PieChart, CanvasRenderer]);

interface ChartDataItem {
  name: string;
  percent: number;
  value?: number; // filled in later
}

interface ApiData {
  data: ChartDataItem[];
}

interface DetailProps {
  languageApi: string;
  editorApi: string;
  isOpen: boolean;
}

const Detail: FC<DetailProps> = ({ languageApi, editorApi, isOpen }) => {
  const languageChartRef = useRef<HTMLDivElement | null>(null);
  const editorChartRef = useRef<HTMLDivElement | null>(null);

  const initChart = (dom: HTMLDivElement, title: string, api: string) => {
    const chart = echarts.init(dom);
    jsonp(api, undefined, (err, data: ApiData) => {
      if (err) {
        console.error(`Failed to fetch ${title} data:`, err);
        return;
      }
      data.data.forEach(item => {
        item.value = item.percent;
      });
      chart.setOption({
        title: {
          text: title,
          left: 'auto',
          top: 'auto',
          textStyle: {
            fontSize: '0.875rem'
          }
        },
        series: [
          {
            type: 'pie',
            avoidLabelOverlap: false,
            radius: ['60%', '80%'],
            label: {
              show: false,
              position: 'center',
              emphasis: {
                show: true
              }
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 30,
                fontWeight: 'bold'
              }
            },
            data: data.data
          }
        ]
      });
      chart.resize({ height: 150 });
    });
  };

  useEffect(() => {
    if (languageChartRef.current) {
      initChart(languageChartRef.current, '写的啥', languageApi);
    }
    if (editorChartRef.current) {
      initChart(editorChartRef.current, '用的啥', editorApi);
    }
  }, [languageApi, editorApi]);

  return (
    <div className="Detail">
      <Collapsible isOpen={isOpen} keepDOM>
        <Row style={{ marginTop: '1rem' }}>
          <Col span={12}>
            <Card style={{ margin: '1rem' }}>
              <div
                ref={languageChartRef}
                style={{ width: '100%', height: '150px' }}
              ></div>
            </Card>
          </Col>
          <Col span={12}>
            <Card style={{ margin: '1rem' }}>
              <div
                ref={editorChartRef}
                style={{ width: '100%', height: '150px' }}
              ></div>
            </Card>
          </Col>
        </Row>
      </Collapsible>
    </div>
  );
};

export default Detail;
