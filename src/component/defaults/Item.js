import React, { forwardRef } from 'react';
import { IonItem } from '@ionic/react';

const CustomItem = forwardRef(({ className, ...rest }, ref) => {
  return <IonItem ref={ref} className={className} {...rest} />;
});

CustomItem.displayName = 'CustomItem';

export default CustomItem;
