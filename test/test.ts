import assert from 'node:assert';
import { describe, it } from 'node:test';
import { decode, encode } from '..';
import {
  Fixture,
  hrpStrippedTxRefs,
  invalidTxRefs,
  strangelyFormattedTxRefs,
  validTxRefs,
  validTxRefsZeroOutpoint,
} from './fixtures';

function decodeTest(fixture: Fixture) {
  it(`decodes ${fixture.txRef}`, () => {
    const decoded = decode(fixture.txRef);
    assert.strictEqual(decoded.blockHeight, fixture.blockHeight);
    assert.strictEqual(decoded.txIndex, fixture.txIndex);
    assert.strictEqual(decoded.network, fixture.network);
    if (fixture.outpoint) {
      assert.strictEqual(decoded.outpoint, fixture.outpoint);
    }
  });
}

describe('BIP 136 TxRef encoding & decoding', () => {
  describe('decodes valid TxRefs', () => {
    validTxRefs.concat(validTxRefsZeroOutpoint).forEach(decodeTest);
  });

  describe('encodes valid TxRefs', () => {
    validTxRefs.forEach(
      ({ blockHeight, txIndex, txRef, network, outpoint }) => {
        it(`encodes block height ${blockHeight}, txIndex ${txIndex}, outpoint ${outpoint} for ${network}`, () => {
          const encoded = encode({
            blockHeight,
            txIndex,
            network,
            outpoint,
          });

          assert.strictEqual(encoded, txRef);
        });
      },
    );
  });

  describe('decodes strangely formatted TxRefs', () => {
    strangelyFormattedTxRefs.forEach(decodeTest);
  });

  describe('decodes TxRefs with the HRP stripped off', () => {
    hrpStrippedTxRefs.forEach(decodeTest);
  });

  describe('fails to decode invalid TxRefs', () => {
    invalidTxRefs.forEach((invalidTxRef) => {
      it(`fails to decode ${invalidTxRef}`, () => {
        assert.throws(() => {
          decode(invalidTxRef);
        });
      });
    });
  });
});
