import React from 'react';
import { storiesOf } from '@storybook/react';

import { ColourPalletteItem } from './index';

storiesOf('Design', module).add('ColourPalletteItem', () => <ColourPalletteItem colourName="Red" colour="red" />);
