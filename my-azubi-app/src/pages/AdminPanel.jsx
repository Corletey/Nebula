import React, { useState, useEffect } from 'react';
import { Layout, Input, Select, Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Cohort',
    dataIndex: 'cohort',
    key: 'cohort',
  },
];

const data = [
  {
    key: '1',
    name: 'Riley Davis',
    cohort: 'Spring',
  },
  {
    key: '2',
    name: 'Jamie Smith',
    cohort: 'Summer',
  },
  {
    key: '3',
    name: 'Robin White',
    cohort: 'Spring',
  },
  {
    key: '4',
    name: 'Quinn Wilson',
    cohort: 'Summer',
  },
  {
    key: '5',
    name: 'Casey Martinez',
    cohort: 'Spring',
  },
  {
    key: '6',
    name: 'Taylor Brown',
    cohort: 'Summer',
  },
  {
    key: '7',
    name: 'Alex Carter',
    cohort: 'Spring',
  },
  {
    key: '8',
    name: 'Jesse Thomas',
    cohort: 'Summer',
  },
  {
    key: '9',
    name: 'Cameron Miller',
    cohort: 'Spring',
  },
  {
    key: '10',
    name: 'Blake Anderson',
    cohort: 'Summer',
  },
  {
    key: '11',
    name: 'Jordan Green',
    cohort: 'Spring',
  },
  {
    key: '12',
    name: 'Casey Lee',
    cohort: 'Summer',
  },
  {
    key: '13',
    name: 'Alex Johnson',
    cohort: 'Spring',
  },
  {
    key: '14',
    name: 'Morgan Bailey',
    cohort: 'Summer',
  },
  {
    key: '15',
    name: 'Jordan Parker',
    cohort: 'Spring',
  },
];

const AdminPanel = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchText, setSearchText] = useState('');
  const [searchCohort, setSearchCohort] = useState('');

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        (searchText ? item.name.toLowerCase().includes(searchText.toLowerCase()) : true) &&
        (searchCohort ? item.cohort.toLowerCase().includes(searchCohort.toLowerCase()) : true)
    );
    setFilteredData(filtered);
  }, [searchText, searchCohort]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleCohortSearch = (value) => {
    setSearchCohort(value);
  };

  return (
    <Layout className="layout">
      <Header>
        <Input.Search placeholder="Search by name" onSearch={handleSearch} allowClear />
        <Select
          placeholder="Search by cohort"
          style={{ width: 200, marginLeft: 10 }}
          onChange={handleCohortSearch}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option value="Spring">Spring</Select.Option>
          <Select.Option value="Summer">Summer</Select.Option>
        </Select>
      </Header>
      <Content>
        <Table columns={columns} dataSource={filteredData} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default AdminPanel;