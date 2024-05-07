import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const GoodCard = ({ good }) => <li data-cy="Good">{good}</li>;

const Goodlist = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);

const sortAndReverseGoods = (goods, sortField, reversed) => {
  const sortedGoods = [...goods];

  switch (sortField) {
    case 'alphabetically':
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'byLength':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');
  const [showReset, setShowReset] = useState(false);

  let visibleGoods = goodsFromServer;

  if (selectedColor) {
    visibleGoods = visibleGoods.filter(good => good.color === selectedColor);
  }

  visibleGoods = sortAndReverseGoods(visibleGoods, sortField, reversed);

  const handleReverseClick = () => {
    setReversed(!reversed);
    setShowReset(true);
  };

  const handleResetClick = () => {
    setSelectedColor('');
    setReversed(false);
    setSortField('');
    setShowReset(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => {
            setSortField('alphabetically');
            setShowReset(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== 'byLength',
          })}
          onClick={() => {
            setSortField('byLength');
            setShowReset(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className={classNames('button', 'is-danger', {
              'is-light': !showReset,
            })}
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <Goodlist goods={visibleGoods} />
    </div>
  );
};
