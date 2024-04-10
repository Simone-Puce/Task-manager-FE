import { Pie } from '@ant-design/charts';
import React, { useState, useEffect } from 'react';
import { getAudit } from '../../services/BoardService';

const AuditChart: React.FC = () => {

  useEffect(() => {
    const getData = async () => {
      const auditResp = await getAudit()
      console.log(auditResp.data)
    }
    getData()
  }, [])

  const data = [
    {
      type: 'TASK',
      value: 1,
    },
    {
      type: 'board',
      value: 5,
    },
  ];
  const config = {
    forceFit: true,
    title: {
      visible: true,
      text: 'ring chart-indicator card',
    },
    description: {
      visible: true,
      text: 'The ring chart indicator card can replace the tooltip\uFF0C in the hollowed-out part of the ring chart center to display the detailed information of each category\u3002',
    },
    radius: 0.8,
    padding: 'auto',
    data,
    angleField: 'value',
    colorField: 'type',
    statistic: { visible: true },
  }

  return (
    < Pie {...config} /> )

}
export default AuditChart;  