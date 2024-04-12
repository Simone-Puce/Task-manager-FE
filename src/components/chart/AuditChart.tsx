import React, { useState, useEffect } from 'react';
import { getAudit } from '../../services/BoardService';
import Chart from 'react-google-charts';

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

const dataAudit = [
  ["BOARDS", "TASKS"],
  ["Boards", boards],
  ["Tasks", tasks]
]


 return(
  <div className='chart-style'>
    <Chart
      chartType="PieChart"
      data={dataAudit}
      width={"100%"}
      height={"500px"}
    />
  </div>
 )

}
export default AuditChart;  