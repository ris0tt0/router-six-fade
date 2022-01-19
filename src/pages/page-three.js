import Logger from 'js-logger';
import React from 'react';

const PageThree = () => {
  Logger.info('PageThree::');

  return (
    <div className="absolute">
      page three
      <div className="p-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Porttitor massa id
        neque aliquam vestibulum morbi blandit cursus. Gravida in fermentum et
        sollicitudin ac orci phasellus egestas tellus. Sed enim ut sem viverra
        aliquet eget. Euismod quis viverra nibh cras pulvinar. Diam in arcu
        cursus euismod quis viverra nibh. Proin sagittis nisl rhoncus mattis
        rhoncus urna neque viverra justo. Sagittis orci a scelerisque purus
        semper eget. Molestie a iaculis at erat pellentesque. Imperdiet proin
        fermentum leo vel orci. Et netus et malesuada fames ac turpis. Tellus in
        metus vulputate eu scelerisque felis imperdiet proin. Turpis massa sed
        elementum tempus egestas. Lobortis mattis aliquam faucibus purus in
        massa tempor nec feugiat. Hac habitasse platea dictumst quisque sagittis
        purus sit amet. Massa tincidunt dui ut ornare lectus sit amet. Ipsum
        dolor sit amet consectetur adipiscing elit ut aliquam purus.
      </div>
      <div className="w-20 h-20 bg-cyan-800">three</div>
    </div>
  );
};

export default PageThree;
