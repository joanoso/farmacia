import * as React from 'react';

export interface PanelErrorProps {
  title?: string;
  children?: any;
  iconStyle?: string;
}

const PanelError = (props: PanelErrorProps) => {
  const iconStyle = `fa ${props.iconStyle} fa-fw fa-2x m-t-1`;
  return (
    <div className="alert alert-danger">
      <div className="media">
        <div className="media-left">
          <i className={iconStyle} />
        </div>
        <div className="media-body">
          <h5>{props.title}</h5>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PanelError;
