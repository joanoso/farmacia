import * as React from 'react';

export interface PanelMediaProps {
    title?: string;
    text?: string;
    buttons?: any;
    children?: any;
    childrenBody?: any
    iconStyle?: string
    deletePanel?: any
    faltanDatos?: boolean
}
const PanelMedia = (props: PanelMediaProps) => {
    const iconStyle = `fa ${props.iconStyle} fa-fw fa-2x text-muted`;
    const panelStyle = props.faltanDatos ? 'panel panel-default panel-border-l-danger' : 'panel panel-default';
    return (
        <div className={panelStyle}>
            <div className='panel-body p-y-2'>
                <div className='media'>
                    {props.iconStyle &&
                        <div className='media-left p-x-1 hidden-xs'>
                            <i className={iconStyle} />
                        </div>}

                    <div className='media-body media-top'>
                        <h3 className='m-t-0'>{props.title &&
                        <span> {props.title} </span>} {props.deletePanel}</h3>
                        {props.text &&
                            <p className='text-muted m-b-1'>{props.text}</p>}
                        {props.children}
                        {props.faltanDatos && <p className='text-danger m-t-0'>Faltan datos</p>}
                    </div>

                    {props.buttons && (
                        <div className='media-right'>
                            {props.buttons}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PanelMedia;
