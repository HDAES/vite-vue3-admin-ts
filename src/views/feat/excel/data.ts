/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2021-09-06 22:13:16
 */

export const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      show: true
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
      show: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
      show: true
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
      show: true
    },
    {
      title: '地址',
      dataIndex: 'address',
      show: true
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      show: true
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      show: true
    },
];

export const data = (() => {
    const arr: any[] = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: `${index} John Brown`,
        age: `${index + 10}`,
        no: `${index}98678`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;

})();