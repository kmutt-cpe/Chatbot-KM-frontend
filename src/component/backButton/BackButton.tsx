import { Link, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface BackButtonProps {
  onClick?: () => void;
  path?: string;
}
const BackButton: React.FC<BackButtonProps> = (props: BackButtonProps) => {
  const history = useHistory();
  const onClick = props.onClick
    ? props.onClick
    : () => (props.path ? history.push(props.path) : history.goBack());

  return (
    <Typography color="secondary">
      <Link style={{ cursor: 'pointer' }} onClick={onClick}>
        back
      </Link>
    </Typography>
  );
};

export default BackButton;
