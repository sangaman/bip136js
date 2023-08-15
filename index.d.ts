declare const network: readonly ["mainnet", "testnet", "regtest"];
export type Network = (typeof network)[number];
export declare function encode({ blockHeight, txIndex, outpoint, network, }: Decoded): string;
export type Decoded = {
    network: Network;
    blockHeight: number;
    txIndex: number;
    outpoint?: number;
};
/**
 * @param encoded An encoded TxRef string with or without separators
 * and with or without a human readable prefix.
 */
export declare function decode(txRef: string): Decoded;
export {};
