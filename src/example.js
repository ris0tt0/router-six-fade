import { Transition } from '@headlessui/react';
import { useState } from 'react';

function ExampleOne() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
        Toggle
      </button>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-175"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-250"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="p-2 border rounded border-fuchsia-400 background bg-fuchsia-700">
          I will fade in and out!
        </div>
      </Transition>
    </>
  );
}

export default ExampleOne;
