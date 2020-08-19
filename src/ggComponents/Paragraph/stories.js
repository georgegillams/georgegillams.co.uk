import React from 'react';
import { storiesOf } from '@storybook/react';

import { Paragraph } from './index';

storiesOf('Paragraph', module)
  .add('Single', () => (
    <Paragraph>{`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Consectetur a erat nam at lectus urna duis convallis convallis. Commodo ullamcorper a lacus vestibulum sed. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. Viverra justo nec ultrices dui sapien eget. Blandit aliquam etiam erat velit scelerisque. Consequat mauris nunc congue nisi vitae. Aenean pharetra magna ac placerat vestibulum lectus mauris. Viverra justo nec ultrices dui sapien eget. In nulla posuere sollicitudin aliquam. Viverra suspendisse potenti nullam ac tortor vitae purus. Eu consequat ac felis donec. Fringilla est ullamcorper eget nulla facilisi. Convallis convallis tellus id interdum. Enim tortor at auctor urna nunc id cursus metus.

Laoreet id donec ultrices tincidunt arcu non sodales neque. Mauris ultrices eros in cursus turpis massa tincidunt. Amet est placerat in egestas. Tincidunt eget nullam non nisi est sit. Senectus et netus et malesuada fames ac turpis egestas. Sapien faucibus et molestie ac. Enim tortor at auctor urna. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Sit amet venenatis urna cursus eget. Orci eu lobortis elementum nibh. Arcu vitae elementum curabitur vitae nunc sed velit. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Enim lobortis scelerisque fermentum dui faucibus. Id interdum velit laoreet id donec ultrices tincidunt arcu. Erat pellentesque adipiscing commodo elit. Platea dictumst quisque sagittis purus sit amet volutpat consequat.

Scelerisque in dictum non consectetur a erat. Tortor pretium viverra suspendisse potenti. Et pharetra pharetra massa massa ultricies. Cras fermentum odio eu feugiat pretium nibh ipsum consequat. In fermentum posuere urna nec tincidunt praesent semper feugiat. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. Velit laoreet id donec ultrices tincidunt arcu non sodales. Pellentesque habitant morbi tristique senectus et netus et. Diam quis enim lobortis scelerisque fermentum dui faucibus in. Libero volutpat sed cras ornare arcu dui. Purus non enim praesent elementum facilisis leo vel. Rutrum quisque non tellus orci.

Mattis pellentesque id nibh tortor id aliquet lectus proin. Nisl tincidunt eget nullam non nisi est sit. Eu volutpat odio facilisis mauris sit amet massa vitae. Vestibulum morbi blandit cursus risus at ultrices. Fames ac turpis egestas maecenas pharetra convallis posuere. Etiam sit amet nisl purus in mollis nunc sed. Vitae suscipit tellus mauris a. Leo vel orci porta non. Felis donec et odio pellentesque diam volutpat commodo sed. Faucibus turpis in eu mi bibendum neque egestas. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque. Molestie at elementum eu facilisis sed odio morbi quis. Ut tortor pretium viverra suspendisse. Sit amet porttitor eget dolor morbi non arcu risus quis. Diam donec adipiscing tristique risus. Sapien pellentesque habitant morbi tristique senectus et netus et. Risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Consectetur purus ut faucibus pulvinar. Lectus mauris ultrices eros in.

Nisi scelerisque eu ultrices vitae auctor eu augue ut. Mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing. Morbi tristique senectus et netus et malesuada. Bibendum arcu vitae elementum curabitur vitae nunc sed velit. Scelerisque eu ultrices vitae auctor eu augue ut. Nisl purus in mollis nunc. Cras sed felis eget velit aliquet sagittis id. Dignissim convallis aenean et tortor. Eu nisl nunc mi ipsum faucibus. Suspendisse faucibus interdum posuere lorem ipsum dolor. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Nisi est sit amet facilisis magna etiam. Aliquam ultrices sagittis orci a scelerisque purus semper eget. In vitae turpis massa sed elementum tempus egestas sed. Imperdiet massa tincidunt nunc pulvinar sapien. Magna sit amet purus gravida quis blandit.`}</Paragraph>
  ))
  .add('Multiple', () => (
    <div>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Consectetur a erat nam at lectus urna
        duis convallis convallis. Commodo ullamcorper a lacus vestibulum sed. Sed egestas egestas fringilla phasellus
        faucibus scelerisque eleifend donec. Viverra justo nec ultrices dui sapien eget. Blandit aliquam etiam erat
        velit scelerisque. Consequat mauris nunc congue nisi vitae. Aenean pharetra magna ac placerat vestibulum lectus
        mauris. Viverra justo nec ultrices dui sapien eget. In nulla posuere sollicitudin aliquam. Viverra suspendisse
        potenti nullam ac tortor vitae purus. Eu consequat ac felis donec. Fringilla est ullamcorper eget nulla
        facilisi. Convallis convallis tellus id interdum. Enim tortor at auctor urna nunc id cursus metus.
      </Paragraph>
      <Paragraph>
        {' '}
        {`Laoreet id donec ultrices tincidunt arcu non sodales neque. Mauris ultrices eros in cursus turpis massa tincidunt. Amet est placerat in egestas. Tincidunt eget nullam non nisi est sit. Senectus et netus et malesuada fames ac turpis egestas. Sapien faucibus et molestie ac. Enim tortor at auctor urna. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Sit amet venenatis urna cursus eget. Orci eu lobortis elementum nibh. Arcu vitae elementum curabitur vitae nunc sed velit. Quam nulla porttitor massa id neque aliquam vestibulum morbi. Enim lobortis scelerisque fermentum dui faucibus. Id interdum velit laoreet id donec ultrices tincidunt arcu. Erat pellentesque adipiscing commodo elit. Platea dictumst quisque sagittis purus sit amet volutpat consequat.`}
      </Paragraph>
    </div>
  ));
