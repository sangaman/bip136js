# bip136js

![GitHub Actions Build](https://github.com/sangaman/bip136js/actions/workflows/main.yaml/badge.svg)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=sangaman_bip136js&metric=coverage)](https://sonarcloud.io/summary/new_code?id=sangaman_bip136js)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=sangaman_bip136js&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=sangaman_bip136js)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=sangaman_bip136js&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=sangaman_bip136js)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=sangaman_bip136js&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=sangaman_bip136js)[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=sangaman_bip136js&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=sangaman_bip136js)
[![Socket Badge](https://socket.dev/api/badge/npm/package/bip136)](https://socket.dev/npm/package/bip136)
[![License: ISC](https://img.shields.io/badge/License-ISC%202.0-brightgreen.svg)](https://opensource.org/licenses/ISC)

A javascript library for encoding and decoding [BIP 136 TxRefs](https://github.com/bitcoin/bips/blob/master/bip-0136.mediawiki). This package passes all [test cases](https://github.com/bitcoin/bips/blob/master/bip-0136.mediawiki#user-content-Test_Examples) from the spec.

This library goes beyond the spec to attempt to decode TxRefs that have had the [Human-Readable Part](https://github.com/bitcoin/bips/blob/master/bip-0136.mediawiki#user-content-HumanReadable_Part) (HRP) stripped off but are otherwise valid.

## Installation

```
npm i bip136
```

## Usage

```javascript
import * as bip136 from 'bip136';

// decodes TxRefs with separators
bip136.decode('tx1:r29u-mqjx-putt-3p0');
// { network: 'mainnet', blockHeight: 456789, txIndex: 1234 }

// decodes TxRefs without separators
bip136.decode('TX1R29UMQJXPUTT3P0');
// { network: 'mainnet', blockHeight: 456789, txIndex: 1234 }

// decodes TxRefs with invalid characters
bip136.decode('tx1!r29u/mqj*x-putt^^3p0');
// { network: 'mainnet', blockHeight: 456789, txIndex: 1234 }

// decodes TxRefs with outpoints
bip136.decode('tx1:y7ll-llll-lpqq-s4qz-hw');
// { network: 'mainnet', blockHeight: 16777215, txIndex: 32767, outpoint: 1 }

// decodes TxRefs with the HRP stripped off
bip136.decode('xz8e-kyyp-qmff-zyt');
// { network: 'testnet', blockHeight: 2470513, txIndex: 36 }

// encodes TxRefs
bip136.encode({
  blockHeight: 709635,
  txIndex: 60,
});
// 'tx1:rxq2-tpup-q0nd-lah'
```
