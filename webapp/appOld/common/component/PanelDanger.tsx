import * as React from 'react';

export interface PanelDangerProps {
  title: string;
  children?: any;
  iconStyle?: string;
}

const PanelDanger = (props: PanelDangerProps) => {

  const iconStyle = `fa ${props.iconStyle} fa-fw fa-2x m-t-1`;
  return (
    <div className='alert alert-danger '>
      <div className='media'>
        <div className='media-left'>
          <i className={iconStyle}></i>
        </div>
        <div className='media-body'>
          <h5>{props.title}</h5>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PanelDanger;
