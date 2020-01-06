import React, { useState } from 'react';

const ColorButton = React.forwardRef((props, ref) => {
  const colors = ['blue', 'red', 'yellow'];
  const [counter, setCounter] = useState(0);

  const onClick = () => {
    if (props.bugs === true) {
      return;
    }

    if (counter < colors.length - 1) {
      setCounter(counter + 1);
    } else {
      setCounter(0);
    }
  };

  const styles = {
    padding: '20px',
    border: 'none',
    background: colors[counter],
  };
  return (
    <button ref={ref} style={styles} onClick={onClick}>
      BEER!
    </button>
  );
});

export default ColorButton;
