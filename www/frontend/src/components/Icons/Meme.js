// @flow
import * as React from 'react';
import svg from './svg';

const MemeIcon = (props: any) =>
  svg({ viewBox: '0 0 128 128', ...props })(
    <React.Fragment>
      <circle fill="#f8dc25" cx="64" cy="64" r="58" />
      <path
        d="M53 107a71.65 71.65 0 0 1-36.75-10.09A58 58 0 0 0 121.56 57 72 72 0 0 1 53 107z"
        fill="#f2bc0f"
        opacity=".7"
      />
      <path
        fill="#f8dc25"
        d="M113.1 92a12.52 12.52 0 0 1 0-12l.15-.29A20.47 20.47 0 0 0 95.5 49h-.58C82 49 56 64 56 64v41c9-9 17 18 38.84 18h.66a20.47 20.47 0 0 0 18.08-30.12z"
      />
      <path
        d="M73.42 103.77a22 22 0 0 1 3-11l.16-.31a13.48 13.48 0 0 0 0-12.89l-.53-1a22 22 0 0 1 .81-22.13"
        opacity=".5"
        stroke="#f2bc0f"
        strokeLinejoin="round"
        fill="none"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M109.59 93.9a16.51 16.51 0 0 1 0-15.8 16.5 16.5 0 1 0-28.17 0 16.51 16.51 0 0 1 0 15.8 16.5 16.5 0 1 0 28.17 0z"
        fill="#393c54"
      />
      <circle fill="#fff" cx="47" cy="41" r="13" />
      <circle fill="#515570" cx="44" cy="44" r="5" />
      <circle fill="#fff" cx="88" cy="35" r="13" />
      <circle fill="#515570" cx="92.5" cy="30.5" r="5" />
      <path d="M107.32 58a16.47 16.47 0 0 0-23.64 0zm-24.55 55a16.5 16.5 0 0 0 25.46 0z" fill="#ff8475" />
      <path
        fill="#fff"
        d="M80.07 63.7A4 4 0 0 0 83 65h20a4 4 0 0 0 4-4v-3H83.68a16.49 16.49 0 0 0-3.61 5.7zM103 106H83a4 4 0 0 0-3.19 1.6 16.47 16.47 0 0 0 3 5.4H107v-3a4 4 0 0 0-4-4z"
      />
      <path
        d="M83 102.5a16.4 16.4 0 0 1 2.41-8.56 16.51 16.51 0 0 0 0-15.8A16.46 16.46 0 0 1 97.5 53.13 16.41 16.41 0 0 0 79 69.5a16.4 16.4 0 0 0 2.41 8.56 16.51 16.51 0 0 1 0 15.8A16.47 16.47 0 0 0 95.5 119a16.59 16.59 0 0 0 2-.13A16.49 16.49 0 0 1 83 102.5z"
        opacity=".3"
        fill="#515570"
      />
      <path
        d="M53 74s10-3 14-10M52 89s10 3 14 10"
        opacity=".4"
        stroke="#f2bc0f"
        strokeLinejoin="round"
        fill="none"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M27 32s4-10 18-10m58.16-1.33S96 12.61 82.84 17.33"
        stroke="#393c54"
        strokeMiterlimit="10"
        fill="none"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </React.Fragment>
  );

export default MemeIcon;
