import React from 'react'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { useTranslation } from 'react-i18next';

type IconBtnProps = {
    Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
    title: string
    onClick: any
    styles?: any
    className?: string
}

const IconBtn = ({
    Icon,
    title,
    onClick,
    styles = {},
    className = ''
}: IconBtnProps) => {
    const { t } = useTranslation()
  return (
    <Tooltip title={t(`btns.${title}`)}>
      <IconButton onClick={onClick}>
        <Icon style={styles} className={className}/>
      </IconButton>
    </Tooltip>
  )
}

export default IconBtn