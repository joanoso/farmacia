import * as React from 'react';

export interface PanelWarnProps {
  title: string;
  children?: any;
}

const PanelWarn = (props: PanelWarnProps) => {
  return (
    <div className="alert alert-warning">
      <div className="media">
        <div className="media-left">
          <i className="fa fa-arrow-circle-o-right fa-fw fa-4x" />
        </div>
        <div className="media-body">
          <h5>{props.title}</h5>
          <p className="margin-0">
            {' '}
            Seguí el &nbsp;
            <a
              href="http://www.mininterior.gov.ar/tramitesyservicios/estado-tramite-dni.php"
              target="_blank"
            >
              estado del trámite en linea
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelWarn;
