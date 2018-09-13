import React from 'react';
import { Tag } from "antd";

export default props => (
  <Tag color="magenta">{props.participant || 'anon'}</Tag>
);