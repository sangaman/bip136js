import { Network } from '..';

export type Fixture = {
  txRef: string;
  blockHeight: number;
  txIndex: number;
  network: Network;
  outpoint?: number;
};

export const validTxRefs: Fixture[] = [
  {
    txRef: 'tx1:rqqq-qqqq-qwtv-vjr',
    blockHeight: 0,
    txIndex: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:rqqq-qqll-lj68-7n2',
    blockHeight: 0,
    txIndex: 0x7fff,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:r7ll-llqq-qats-vx9',
    blockHeight: 0xffffff,
    txIndex: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:r7ll-llll-lp6m-78v',
    blockHeight: 0xffffff,
    txIndex: 0x7fff,
    network: 'mainnet',
  },
  {
    txRef: 'txtest1:xqqq-qqqq-qrrd-ksa',
    blockHeight: 0,
    txIndex: 0,
    network: 'testnet',
  },
  {
    txRef: 'txtest1:xqqq-qqll-lljx-y35',
    blockHeight: 0,
    txIndex: 0x7fff,
    network: 'testnet',
  },
  {
    txRef: 'txtest1:x7ll-llqq-qsr3-kym',
    blockHeight: 0xffffff,
    txIndex: 0,
    network: 'testnet',
  },
  {
    txRef: 'txtest1:x7ll-llll-lvj6-y9j',
    blockHeight: 0xffffff,
    txIndex: 0x7fff,
    network: 'testnet',
  },
  {
    txRef: 'tx1:rqqq-qqqq-qwtv-vjr',
    blockHeight: 0,
    txIndex: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:rqqq-qqll-lj68-7n2',
    blockHeight: 0,
    txIndex: 0x7fff,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:r7ll-llqq-qats-vx9',
    blockHeight: 0xffffff,
    txIndex: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:r7ll-llll-lp6m-78v',
    blockHeight: 0xffffff,
    txIndex: 0x7fff,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:yqqq-qqll-lpqq-m3w3-kv',
    blockHeight: 0,
    txIndex: 0x7fff,
    outpoint: 1,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:y7ll-llqq-qpqq-22ml-hz',
    blockHeight: 0xffffff,
    txIndex: 0,
    outpoint: 1,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:y7ll-llll-lpqq-s4qz-hw',
    blockHeight: 0xffffff,
    txIndex: 0x7fff,
    outpoint: 1,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:y29u-mqjx-ppqq-sfp2-tt',
    blockHeight: 456789,
    txIndex: 1234,
    outpoint: 1,
    network: 'mainnet',
  },
];

export const validTxRefsZeroOutpoint: Fixture[] = [
  {
    txRef: 'tx1:yqqq-qqqq-qqqq-rvum-0c',
    blockHeight: 0,
    txIndex: 0,
    outpoint: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:yqqq-qqll-lqqq-en8x-05',
    blockHeight: 0,
    txIndex: 0x7fff,
    outpoint: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:y7ll-llqq-qqqq-ggjg-w6',
    blockHeight: 0xffffff,
    txIndex: 0,
    outpoint: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:y7ll-llll-lqqq-jhf4-wk',
    blockHeight: 0xffffff,
    txIndex: 0x7fff,
    outpoint: 0,
    network: 'mainnet',
  },
  {
    txRef: 'tx1:yqqq-qqqq-qpqq-pw4v-kq',
    blockHeight: 0,
    txIndex: 0,
    outpoint: 0,
    network: 'mainnet',
  },
];

export const strangelyFormattedTxRefs: Fixture[] = [
  {
    txRef: 'tx1:r29u-mqjx-putt-3p0',
    blockHeight: 456789,
    txIndex: 1234,
    network: 'mainnet',
  },
  {
    txRef: 'TX1R29UMQJXPUTT3P0',
    blockHeight: 456789,
    txIndex: 1234,
    network: 'mainnet',
  },
  {
    txRef: 'tx1 r29u mqjx putt 3p0',
    blockHeight: 456789,
    txIndex: 1234,
    network: 'mainnet',
  },
  {
    txRef: 'tx1!r29u/mqj*x-putt^^3p0',
    blockHeight: 456789,
    txIndex: 1234,
    network: 'mainnet',
  },
  // tests without the HRP
  {
    txRef: 'y29u-mqjx-ppqq-sfp2-tt',
    blockHeight: 456789,
    txIndex: 1234,
    outpoint: 1,
    network: 'mainnet',
  },
  {
    txRef: 'xz8e-kyyp-qmff-zyt',
    blockHeight: 2470513,
    txIndex: 36,
    network: 'testnet',
  },
];

export const invalidTxRefs = [
  'tx1:t7ll-llll-lcq3-aj4',
  'tx1:rlll-llll-lu9m-00x',
  'tx1:r7ll-llll-lqfu-gss2',
  'tx1:r7ll-llll-rt5h-wz',
  'tx1:r7ll-LLLL-lp6m-78v',
];
