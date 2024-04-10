import { Pie } from '@ant-design/charts';
import React, { useState, useEffect } from 'react';
import { getAudit } from '../../services/BoardService';

const AuditChart: React.FC = () => {
  const [tasks, setTasks] = useState<number>()
  const [boards, setBoards] = useState<number>()

  useEffect(() => {
    const getData = async () => {
      const auditResp = await getAudit()
      console.log(auditResp.data)
      setTasks(auditResp.data.tasks)
      setBoards(auditResp.data.boards)
    }
    getData()
  }, [])

  const data = [
    {
      type: 'TASKS',
      value: tasks,
    },
    {
      type: 'BOARDS',
      value: boards,
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